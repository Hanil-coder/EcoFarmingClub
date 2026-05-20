# Agent Team Examples (Gemini CLI)

Gemini CLI는 `TeamCreate`/`SendMessage` 대신 `Agent` 도구(서브 에이전트)를 사용한다. 모든 예시는 서브 에이전트 모드로 구현한다.

---

## 예시 1: 리서치 팀 (팬아웃/팬인 — 서브 에이전트 모드)

### 팀 아키텍처: 팬아웃/팬인
### 실행 모드: 병렬 서브 에이전트

```
[오케스트레이터]
    ├── Agent(official-researcher, background=true)
    ├── Agent(media-researcher, background=true)
    ├── Agent(community-researcher, background=true)
    └── Agent(background-researcher, background=true)
              ↓ (모두 완료 후)
    └── Read + 통합 보고서 생성
```

### 에이전트 구성

| 에이전트 | 정의 파일 | 역할 | 출력 |
|---------|----------|------|------|
| official-researcher | `.gemini/agents/official-researcher.md` | 공식 문서/블로그 | `_workspace/02_official_research.md` |
| media-researcher | `.gemini/agents/media-researcher.md` | 미디어/투자 | `_workspace/02_media_research.md` |
| community-researcher | `.gemini/agents/community-researcher.md` | 커뮤니티/SNS | `_workspace/02_community_research.md` |
| background-researcher | `.gemini/agents/background-researcher.md` | 배경/경쟁/학술 | `_workspace/02_background_research.md` |

### 오케스트레이터 워크플로우

```
Phase 0: 컨텍스트 확인
  - _workspace/ 존재 여부 확인 → 초기/부분/새 실행 판별

Phase 1: 준비
  - 사용자 입력 분석 (주제, 조사 모드 파악)
  - _workspace/ 생성

Phase 2: 병렬 조사 (run_in_background: true)
  - 단일 메시지에서 4개 Agent 도구 동시 호출:
    Agent(prompt: ".gemini/agents/official-researcher.md를 읽고, {주제}를 공식 채널에서 조사...",
          model: "gemini-2.5-pro", run_in_background: true)
    Agent(prompt: ".gemini/agents/media-researcher.md를 읽고, {주제}를 미디어/투자 관점에서 조사...",
          model: "gemini-2.5-pro", run_in_background: true)
    Agent(prompt: ".gemini/agents/community-researcher.md를 읽고, {주제}를 커뮤니티에서 조사...",
          model: "gemini-2.5-pro", run_in_background: true)
    Agent(prompt: ".gemini/agents/background-researcher.md를 읽고, {주제}를 배경/학술 관점에서 조사...",
          model: "gemini-2.5-pro", run_in_background: true)

Phase 3: 통합
  - 4개 산출물 Read
  - 종합 보고서 생성
  - 상충 정보는 출처 병기

Phase 4: 정리
  - _workspace/ 보존
  - 결과 요약 보고
```

### 에이전트 파일 예시: `.gemini/agents/official-researcher.md`

```markdown
---
name: official-researcher
description: "공식 채널(공식 웹사이트, 기술 블로그, 프레스 릴리즈, 공식 문서)을 조사하는 리서처."
---

# Official Researcher — 공식 채널 조사 전문가

당신은 공식 채널을 통한 정보 수집 전문가입니다.

## 핵심 역할
1. 공식 웹사이트, 기술 블로그, 프레스 릴리즈 조사
2. 공식 문서, API 레퍼런스, 릴리즈 노트 분석
3. 공식 발표와 로드맵 정보 수집

## 작업 원칙
- 1차 출처(공식 채널)만 사용, 3차 요약 기사 지양
- 날짜 기준 최신 정보 우선
- 출처 URL과 날짜를 반드시 기록

## 입력/출력 프로토콜
- 입력: 오케스트레이터 프롬프트의 조사 주제 및 지시사항
- 출력: `_workspace/02_official_research.md`
- 형식: 마크다운. 섹션별 (주요 발표 / 공식 입장 / 출처 목록)

## 에러 핸들링
- 공식 사이트 접근 불가 시 웹 캐시 활용
- 정보 부족 시 "공식 정보 미확인" 명시 후 완료

## 협업
- 독립적으로 조사 수행, 결과를 파일로 저장
- 오케스트레이터가 수집 후 다른 에이전트 결과와 통합
```

---

## 예시 2: SF 소설 집필 팀 (파이프라인 + 팬아웃 — 하이브리드 모드)

### 팀 아키텍처: 파이프라인 + 팬아웃
### 실행 모드: 하이브리드 (Phase별 병렬/순차 조합)

```
Phase 1 (병렬): worldbuilder + character-designer + plot-architect
  → 각자 독립적으로 세계관/캐릭터/플롯 생성 → 파일 저장
Phase 2 (순차): prose-stylist
  → Phase 1의 3개 파일을 Read하여 집필
Phase 3 (병렬): science-consultant + continuity-manager
  → 각자 독립적으로 초안 검토 → 검토 보고서 저장
Phase 4 (순차): prose-stylist
  → Phase 3 검토 결과 반영하여 최종 수정
```

### 에이전트 구성

| 에이전트 | 정의 파일 | 역할 | 스킬 |
|---------|----------|------|------|
| worldbuilder | `.gemini/agents/worldbuilder.md` | 세계관 구축 | world-setting |
| character-designer | `.gemini/agents/character-designer.md` | 캐릭터 설계 | character-profile |
| plot-architect | `.gemini/agents/plot-architect.md` | 플롯 구조 | outline |
| prose-stylist | `.gemini/agents/prose-stylist.md` | 집필 + 수정 | write-scene |
| science-consultant | `.gemini/agents/science-consultant.md` | 과학 검증 | science-check |
| continuity-manager | `.gemini/agents/continuity-manager.md` | 일관성 검증 | consistency-check |

### 오케스트레이터 워크플로우 상세

```
Phase 1: 병렬 세계관/캐릭터/플롯 구축
  실행 모드: 병렬 서브 에이전트

  단일 메시지에서 3개 에이전트 동시 호출:
  Agent(prompt: ".gemini/agents/worldbuilder.md를 읽고 세계관 구축...",
        model: "gemini-2.5-pro", run_in_background: true)
  Agent(prompt: ".gemini/agents/character-designer.md를 읽고 캐릭터 설계...",
        model: "gemini-2.5-pro", run_in_background: true)
  Agent(prompt: ".gemini/agents/plot-architect.md를 읽고 플롯 구조 설계...",
        model: "gemini-2.5-pro", run_in_background: true)

  산출물:
  - _workspace/01_worldbuilder_setting.md
  - _workspace/01_character_profiles.md
  - _workspace/01_plot_outline.md

Phase 2: 집필 (순차)
  실행 모드: 단일 서브 에이전트

  Agent(prompt: ".gemini/agents/prose-stylist.md를 읽고,
                 _workspace/01_worldbuilder_setting.md,
                 _workspace/01_character_profiles.md,
                 _workspace/01_plot_outline.md를 읽은 후 집필...",
        model: "gemini-2.5-pro")

  산출물: _workspace/02_prose_draft.md

Phase 3: 병렬 검토
  실행 모드: 병렬 서브 에이전트

  Agent(prompt: ".gemini/agents/science-consultant.md를 읽고,
                 _workspace/02_prose_draft.md를 과학적 관점에서 검토...",
        model: "gemini-2.5-pro", run_in_background: true)
  Agent(prompt: ".gemini/agents/continuity-manager.md를 읽고,
                 _workspace/02_prose_draft.md의 일관성을 검증...",
        model: "gemini-2.5-pro", run_in_background: true)

  산출물:
  - _workspace/03_science_review.md
  - _workspace/03_continuity_review.md

Phase 4: 최종 수정 (순차)
  실행 모드: 단일 서브 에이전트

  Agent(prompt: ".gemini/agents/prose-stylist.md를 읽고,
                 _workspace/03_science_review.md 와
                 _workspace/03_continuity_review.md의 피드백을 반영하여 수정...",
        model: "gemini-2.5-pro")
```

### 에이전트 파일 예시: `.gemini/agents/worldbuilder.md`

```markdown
---
name: worldbuilder
description: "SF 소설의 세계관을 구축하는 전문가. 물리 법칙, 사회 구조, 기술 수준, 역사를 설계한다."
---

# Worldbuilder — SF 세계관 설계 전문가

당신은 SF 소설의 세계관 설계 전문가입니다.

## 핵심 역할
1. 세계의 물리 법칙과 기술 수준 정의
2. 사회 구조, 정치 체계, 경제 시스템 설계
3. 역사적 맥락과 현재 갈등 구조 수립

## 작업 원칙
- 내적 일관성 최우선 — 설정 간 모순이 없어야 한다
- "만약 이 기술이 있다면?" 연쇄 질문으로 세계의 파급 효과를 추론
- 이야기에 봉사하는 세계관 — 과도한 설정은 지양

## 입력/출력 프로토콜
- 입력: 오케스트레이터 프롬프트의 세계관 컨셉
- 출력: `_workspace/01_worldbuilder_setting.md`
- 형식: 마크다운. 섹션별 (물리/사회/기술/역사/장소)

## 에러 핸들링
- 컨셉이 모호하면 3가지 방향을 제안하고 선택 요청
- 과학적 오류 발견 시 대안을 함께 제시

## 협업
- 독립적으로 작업 수행, 결과를 파일로 저장
- character-designer와 plot-architect는 별도로 병렬 실행 중이므로 직접 통신 없음
- 오케스트레이터가 세 파일을 통합하여 다음 단계로 전달
```

---

## 예시 3: 웹툰 제작 팀 (생성-검증 — 서브 에이전트 모드)

### 팀 아키텍처: 생성-검증
### 실행 모드: 순차 서브 에이전트

> 생성-검증 패턴에서 에이전트가 2개이고, 검증 결과를 생성 에이전트에 피드백하는 구조이므로 순차 실행이 적합.

```
Phase 1: Agent(webtoon-artist) → 패널 생성
Phase 2: Agent(webtoon-reviewer) → 검수 → 결과 파일 저장
Phase 3: Agent(webtoon-artist) → 문제 패널 재생성 (최대 2회)
```

### 에이전트 구성

| 에이전트 | 정의 파일 | 역할 | 스킬 |
|---------|----------|------|------|
| webtoon-artist | `.gemini/agents/webtoon-artist.md` | 패널 이미지 생성 | generate-webtoon |
| webtoon-reviewer | `.gemini/agents/webtoon-reviewer.md` | 품질 검수 | review-webtoon |

### 오케스트레이터 워크플로우

```
Phase 1: 패널 생성
  Agent(prompt: ".gemini/agents/webtoon-artist.md를 읽고 패널 생성...",
        model: "gemini-2.5-pro")
  산출물: _workspace/panels/

Phase 2: 검수
  Agent(prompt: ".gemini/agents/webtoon-reviewer.md를 읽고,
                 _workspace/panels/의 패널들을 검수...",
        model: "gemini-2.5-pro")
  산출물: _workspace/review_report.md

Phase 3: 재생성 루프 (최대 2회)
  review_report.md의 REDO 항목이 있으면:
  Agent(prompt: ".gemini/agents/webtoon-artist.md를 읽고,
                 _workspace/review_report.md의 REDO 지시를 반영하여 재생성...",
        model: "gemini-2.5-pro")
  
  재생성 후 다시 검수 (최대 2회 반복)
```

### 에이전트 파일 예시: `.gemini/agents/webtoon-reviewer.md`

```markdown
---
name: webtoon-reviewer
description: "웹툰 패널의 품질을 검수하는 전문가. 구도, 캐릭터 일관성, 텍스트 가독성, 연출을 평가한다."
---

# Webtoon Reviewer — 웹툰 품질 검수 전문가

당신은 웹툰 패널의 품질을 검수하는 전문가입니다.

## 핵심 역할
1. 각 패널의 구도와 시각적 완성도 평가
2. 캐릭터 외형의 패널 간 일관성 검증
3. 말풍선 텍스트의 가독성과 배치 평가
4. 전체 에피소드의 연출 흐름 검토

## 작업 원칙
- PASS/FIX/REDO 3단계로 명확히 판정
- 주관적 취향이 아닌 객관적 기준(일관성, 가독성, 구도)으로 판단

## 입력/출력 프로토콜
- 입력: `_workspace/panels/` 디렉토리의 패널들
- 출력: `_workspace/review_report.md`
- 형식:
  ```
  ## Panel {N}
  - 판정: PASS | FIX | REDO
  - 사유: [구체적 이유]
  - 수정 지시: [FIX/REDO인 경우 구체적 수정 방향]
  ```

## 에러 핸들링
- 이미지 로드 실패 시 해당 패널을 REDO로 판정
- 2회 재생성 후에도 REDO인 패널은 경고와 함께 PASS 처리

## 협업
- 독립적으로 검수 수행, 결과를 파일로 저장
- 오케스트레이터가 결과를 읽어 재생성 여부 결정
```

---

## 예시 4: 코드 리뷰 팀 (팬아웃/팬인 — 서브 에이전트 모드)

### 팀 아키텍처: 팬아웃/팬인
### 실행 모드: 병렬 서브 에이전트

> 각 리뷰어가 독립적 관점에서 병렬로 검토 후 오케스트레이터가 통합.

```
[오케스트레이터]
    ├── Agent(security-reviewer, background=true)
    ├── Agent(performance-reviewer, background=true)
    └── Agent(test-reviewer, background=true)
              ↓
    └── Read + 통합 리뷰 보고서
```

### 에이전트 구성

| 에이전트 | 역할 | 출력 |
|---------|------|------|
| security-reviewer | 보안 취약점 점검 | `_workspace/02_security_review.md` |
| performance-reviewer | 성능 영향 분석 | `_workspace/02_performance_review.md` |
| test-reviewer | 테스트 커버리지 검증 | `_workspace/02_test_review.md` |

### 통합 전략

각 리뷰어가 독립적으로 검토하므로 교차 영역 이슈(예: 보안 취약점이 성능에도 영향)는 오케스트레이터가 통합 단계에서 연결한다:

```
Phase 3: 통합
  - 3개 리뷰 파일 Read
  - 교차 영역 이슈 식별 (예: "security_review의 SQL 주입 취약점은
    performance_review의 N+1 쿼리 섹션과 연관")
  - 우선순위별 통합 보고서 생성
```

---

## 예시 5: 감독자 패턴 — 코드 마이그레이션 (서브 에이전트 모드)

### 팀 아키텍처: 감독자
### 실행 모드: 배치별 병렬 서브 에이전트

```
[오케스트레이터/감독자]
    1. 전체 파일 목록 분석 → 배치 분할
    2. Batch A: Agent(migrator, background=true) × N
    3. 완료 후 다음 배치 실행
    4. 전체 완료 후 통합 테스트
```

### 감독자의 동적 분배 로직

```
1. 전체 대상 파일 목록 수집
2. 복잡도 추정 (파일 크기, import 수, 의존성)
3. 배치 단위로 분할 (_workspace/batches.json에 저장)

배치 실행 루프:
  While 미완료 배치 있음:
    현재 배치 파일들에 대해 병렬 Agent 호출 (run_in_background: true)
    완료 후 _workspace/migration_status.json 업데이트
    실패 파일은 다음 배치에 재포함

4. 모든 배치 완료 후 통합 테스트 실행
```

**팬아웃과의 차이:** 전체 작업 목록을 미리 고정하지 않고, 배치 단위로 진행 상황을 확인하며 **동적으로 다음 배치를 결정**한다. 실패한 파일을 감지하고 재할당하는 것도 오케스트레이터가 담당한다.

---

## 산출물 패턴 요약

### 에이전트 정의 파일
위치: `프로젝트/.gemini/agents/{agent-name}.md`
필수 섹션: 핵심 역할, 작업 원칙, 입력/출력 프로토콜, 에러 핸들링, 협업

### 스킬 파일 구조
위치: `프로젝트/.gemini/skills/{skill-name}/SKILL.md` (프로젝트 레벨)
또는: `~/.gemini/skills/{skill-name}/SKILL.md` (글로벌 레벨)

### 통합 스킬 (오케스트레이터)
팀 전체를 조율하는 상위 스킬. 에이전트 구성과 워크플로우를 정의.
템플릿: `references/orchestrator-template.md` 참조.
**실행 모드를 반드시 명시** — 서브 에이전트 또는 하이브리드.
