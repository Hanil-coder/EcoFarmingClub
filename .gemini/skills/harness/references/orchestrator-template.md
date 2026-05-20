# 오케스트레이터 스킬 템플릿 (Gemini CLI)

오케스트레이터는 팀 전체를 조율하는 상위 스킬이다. 실행 모드별로 2가지 템플릿을 제공한다:

- **템플릿 A: 서브 에이전트 모드 (기본)** — 단일 또는 복수 에이전트가 결과를 오케스트레이터에 반환
- **템플릿 B: 하이브리드 모드** — Phase마다 병렬/순차를 섞어 구성

> **참고:** Gemini CLI는 `TeamCreate`, `SendMessage`, `TaskCreate` 같은 에이전트 팀 API를 지원하지 않는다. 모든 조율은 오케스트레이터가 파일 기반 + 반환값 기반으로 처리한다.

---

## 템플릿 A: 서브 에이전트 모드 (기본)

`Agent` 도구로 서브 에이전트를 직접 호출하고 반환값 또는 파일로 결과를 수집한다.

```markdown
---
name: {domain}-orchestrator
description: "{도메인} 에이전트를 조율하는 오케스트레이터. {초기 실행 키워드}. 후속 작업: {도메인} 결과 수정, 부분 재실행, 업데이트, 보완, 다시 실행, 이전 결과 개선 요청 시에도 반드시 이 스킬을 사용."
---

# {Domain} Orchestrator

{도메인}의 에이전트를 조율하여 {최종 산출물}을 생성하는 통합 스킬.

## 실행 모드: 서브 에이전트

## 에이전트 구성

| 에이전트 | 정의 파일 | 역할 | 스킬 | 출력 |
|---------|----------|------|------|------|
| {agent-1} | `.gemini/agents/{agent-1}.md` | {역할} | {skill} | `_workspace/{phase}_{agent-1}_{artifact}.md` |
| {agent-2} | `.gemini/agents/{agent-2}.md` | {역할} | {skill} | `_workspace/{phase}_{agent-2}_{artifact}.md` |

## 워크플로우

### Phase 0: 컨텍스트 확인 (후속 작업 지원)

기존 산출물 존재 여부를 확인하여 실행 모드를 결정한다:

1. `_workspace/` 디렉토리 존재 여부 확인
2. 실행 모드 결정:
   - **`_workspace/` 미존재** → 초기 실행. Phase 1로 진행
   - **`_workspace/` 존재 + 사용자가 부분 수정 요청** → 부분 재실행. 해당 에이전트만 재호출하고, 기존 산출물 중 수정 대상만 덮어쓴다
   - **`_workspace/` 존재 + 새 입력 제공** → 새 실행. 기존 `_workspace/`를 `_workspace_{YYYYMMDD_HHMMSS}/`로 이동한 뒤 Phase 1 진행
3. 부분 재실행 시: 이전 산출물 경로를 에이전트 프롬프트에 포함하여, 에이전트가 기존 결과를 읽고 피드백을 반영하도록 지시

### Phase 1: 준비
1. 사용자 입력 분석 — {무엇을 파악하는지}
2. 작업 디렉토리에 `_workspace/` 생성
   - **초기 실행**: 새 `_workspace/` 생성
   - **새 실행**: 기존 `_workspace/`를 `_workspace_{YYYYMMDD_HHMMSS}/`로 이동한 직후 새 `_workspace/` 재생성
3. 입력 데이터를 `_workspace/00_input/`에 저장

### Phase 2: 병렬 실행

단일 메시지에서 N개 Agent 도구를 동시 호출:

```
Agent(
  prompt: "{에이전트 역할 + 작업 지시. 스킬 경로: .gemini/skills/{skill}/SKILL.md}",
  model: "gemini-2.5-pro",
  run_in_background: true
)
```

| 에이전트 | 입력 | 출력 경로 | run_in_background |
|---------|------|---------|-------------------|
| {agent-1} | {소스} | `_workspace/02_{agent-1}_{artifact}.md` | true |
| {agent-2} | {소스} | `_workspace/02_{agent-2}_{artifact}.md` | true |

> **주의:** 에이전트 프롬프트에 에이전트 정의 파일 경로(`.gemini/agents/{name}.md`)와 스킬 경로를 포함하여, 에이전트가 시작 시 Read하도록 지시한다.

### Phase 3: 통합
1. 각 에이전트의 반환값 수집
2. 파일 기반 산출물은 Read로 수집
3. 통합 로직 적용 → 최종 산출물 생성: `{output-path}/{filename}`

### Phase 4: 정리
1. `_workspace/` 보존 (중간 산출물은 삭제하지 않음 — 사후 검증·감사 추적용)
2. 사용자에게 결과 요약 보고

## 데이터 흐름

```
[오케스트레이터]
    ├── Agent(agent-1, background=true) → _workspace/02_agent-1_artifact.md
    ├── Agent(agent-2, background=true) → _workspace/02_agent-2_artifact.md
    │
    └── Read(_workspace/02_*.md) → 통합 → 최종 산출물
```

## 에러 핸들링

| 상황 | 전략 |
|------|------|
| 에이전트 1개 실패 | 1회 재시도. 재실패 시 누락 명시하고 진행 |
| 과반 실패 | 사용자에게 알리고 진행 여부 확인 |
| 타임아웃 | 현재까지 수집된 부분 결과 사용 |
| 데이터 충돌 | 출처 명시 후 병기, 삭제하지 않음 |

## 테스트 시나리오

### 정상 흐름
1. 사용자가 {입력}을 제공
2. Phase 0에서 초기 실행 판별
3. Phase 1에서 {분석 결과} 도출
4. Phase 2에서 {N}개 에이전트 병렬 실행
5. Phase 3에서 산출물 통합하여 최종 결과 생성
6. 예상 결과: `{output-path}/{filename}` 생성

### 에러 흐름
1. Phase 2에서 {agent-2}가 에러로 실패
2. 1회 재시도 실행
3. 재실패 시 {agent-2} 영역을 "미수집"으로 표시하고 나머지 결과로 진행
4. 최종 보고서에 "{agent-2} 영역 일부 미수집" 명시
```

---

## 템플릿 B: 하이브리드 모드

Phase마다 다른 실행 패턴을 사용한다. 각 Phase 상단에 `**실행 모드:** {병렬 서브 에이전트 | 순차 | 단일 에이전트}`를 명시한다.

```markdown
---
name: {domain}-orchestrator
description: "{도메인} 오케스트레이터 (하이브리드). {키워드}. 후속 작업 키워드 포함."
---

## 실행 모드: 하이브리드

| Phase | 모드 | 이유 |
|-------|------|------|
| Phase 2 (병렬 수집) | 병렬 서브 에이전트 | 독립 자료 수집, 각자 진행 가능 |
| Phase 3 (통합) | 오케스트레이터 직접 처리 | 수집 결과를 오케스트레이터가 종합 |
| Phase 4 (검증) | 단일 서브 에이전트 | QA 에이전트 1명이 객관 검증 |

## 워크플로우

### Phase 2: 병렬 자료 수집
**실행 모드:** 병렬 서브 에이전트

단일 메시지에서 Agent 도구로 N개 에이전트 병렬 호출 (`run_in_background: true`).
각 결과는 `_workspace/02_{agent}_raw.md`에 저장.

```
Agent(prompt: "...", model: "gemini-2.5-pro", run_in_background: true)  ← 에이전트 1
Agent(prompt: "...", model: "gemini-2.5-pro", run_in_background: true)  ← 에이전트 2
Agent(prompt: "...", model: "gemini-2.5-pro", run_in_background: true)  ← 에이전트 3
```

### Phase 3: 통합
**실행 모드:** 오케스트레이터 직접 처리

1. `_workspace/02_*.md` 파일들을 Read로 수집
2. 상충 데이터 처리: 출처를 명시하여 병기
3. 통합본 `_workspace/03_integrated.md` 생성

### Phase 4: 독립 검증
**실행 모드:** 단일 서브 에이전트

단일 QA 서브 에이전트가 `_workspace/03_integrated.md`를 입력으로 받아 검증 보고서 생성.

```
Agent(
  prompt: ".gemini/agents/qa-agent.md를 읽고, _workspace/03_integrated.md를 검증하라...",
  model: "gemini-2.5-pro"
)
```
```

---

## 작성 원칙

1. **실행 모드를 먼저 명시** — 오케스트레이터 상단에 "서브 에이전트" / "하이브리드" 중 하나 명시. 하이브리드면 Phase별 모드 표 필수
2. **Agent 도구 파라미터를 완전히 명시** — prompt, model, run_in_background
3. **에이전트 프롬프트에 에이전트 정의 파일 경로 포함** — 에이전트가 자신의 역할 정의를 Read하도록 `.gemini/agents/{name}.md` 경로 전달
4. **파일 경로는 명확하게** — `_workspace/` 기준 명확한 경로
5. **Phase 간 의존성 명시** — 어떤 Phase가 어떤 Phase의 결과에 의존하는지
6. **에러 핸들링은 현실적으로** — "모든 것이 성공한다"고 가정하지 않음
7. **테스트 시나리오 필수** — 정상 1 + 에러 1 이상

## description 작성 시 후속 작업 키워드

오케스트레이터 description은 초기 실행 키워드만으로는 부족하다. 다음 후속 작업 표현을 반드시 포함하라:

- 재실행/다시 실행/업데이트/수정/보완
- "{도메인}의 {부분}만 다시"
- "이전 결과 기반으로", "결과 개선"
- 도메인 관련 일상적 요청

후속 키워드가 없으면 첫 실행 후 하네스가 사실상 죽은 코드가 된다.

## 실제 오케스트레이터 참고

팬아웃/팬인 패턴의 오케스트레이터 기본 구조:
준비 → Phase 0(컨텍스트 확인) → N개 Agent 병렬 호출 (run_in_background=true) → Read + 통합 → 정리.
`references/team-examples.md`의 리서치 팀 예시를 참조.
