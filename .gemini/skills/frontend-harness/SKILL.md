---
name: frontend-harness
description: "웹 프론트엔드 개발 전체 과정을 조율하는 오케스트레이터. 설계, 구현, 리뷰를 자동화함. '프론트엔드', '웹 UI', 'React 개발' 관련 요청 시 실행."
---

# Frontend Development Orchestrator

이 스킬은 프론트엔드 에이전트 팀을 조율하여 고품질의 웹 애플리케이션을 구축합니다.

## 실행 모드: 하이브리드

| Phase | 모드 | 역할 |
|-------|------|------|
| Phase 1: 설계 | 단일 서브 에이전트 | Architect가 설계서 작성 |
| Phase 2: 구현 | 단일 서브 에이전트 | Coder가 소스 코드 및 테스트 구현 |
| Phase 3: 리뷰 | 단일 서브 에이전트 | Reviewer가 코드 및 UX 검토 |
| Phase 4: 통합 | 오케스트레이터 직접 처리 | 최종 결과 정리 및 보고 |

## 워크플로우

### Phase 0: 컨텍스트 확인
- `_workspace/` 폴더 존재 여부 및 기존 산출물 확인.
- 이전 작업의 연장선인지, 새로운 프로젝트인지 판별.

### Phase 1: 아키텍처 설계
**에이전트:** `frontend-architect`
1. 사용자 요구사항을 바탕으로 `_workspace/01_architect_design.md` 생성.
2. 컴포넌트 구조, 데이터 흐름, 스타일 가이드 정의.

### Phase 2: 구현 및 스타일링
**에이전트:** `frontend-coder`
1. 설계서를 바탕으로 프로젝트 스캐폴딩 및 소스 코드 작성.
2. Vanilla CSS를 활용한 고품질 UI 구현.
3. `_workspace/02_coder_report.md` 작성.

### Phase 3: 품질 리뷰 및 QA
**에이전트:** `frontend-reviewer`
1. 소스 코드를 분석하여 품질 및 UX 검토.
2. `_workspace/03_reviewer_feedback.md` 생성.

### Phase 4: 최종 보고 및 가이드
1. 전체 산출물 요약.
2. 애플리케이션 실행 방법 안내.

## 데이터 흐름
- `Phase 1` -> `Phase 2` -> `Phase 3` -> `Phase 4` 로 순차적 데이터 전달.
- 중간 결과물은 `_workspace/` 하위에 보존.

## 에러 핸들링
- 각 단계 실패 시 최대 1회 재시도.
- 중대한 오류 발생 시 사용자에게 개입 요청.
