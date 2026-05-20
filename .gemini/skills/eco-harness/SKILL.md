---
name: eco-harness
description: "에코파밍클럽 프로젝트의 전체 개발 워크플로우를 조율하는 오케스트레이터 스킬. '에코파밍클럽 구축', '전체 프로세스 실행' 요청 시 이 스킬을 사용한다."
---

# Eco Farming Club Development Harness

이 스킬은 에코파밍클럽 포털 사이트 구축을 위한 멀티 에이전트 워크플로우를 관리합니다.

## 실행 모드: 하이브리드

| Phase | 모드 | 역할 |
|-------|------|------|
| Phase 1: DB & 인프라 | 서브 에이전트 (병렬) | Supabase 스키마 설계 및 GitHub 초기화 |
| Phase 2: UI/UX 설계 | 서브 에이전트 | Frontend Architect가 UI 구조 설계 |
| Phase 3: 구현 | 서브 에이전트 | Frontend Coder가 Next.js 코드 작성 |
| Phase 4: 배포 & 검증 | 서브 에이전트 | Vercel 배포 및 최종 QA |

## 워크플로우

### Phase 0: 컨텍스트 확인
- `GEMINI.md`의 요구사항을 읽고 현재 진행 상황을 판별한다.
- `_workspace/` 폴더의 기존 산출물을 확인하여 초기 실행인지 후속 작업인지 결정한다.

### Phase 1: 데이터베이스 및 기본 인프라 구축
**에이전트:** `supabase-agent`, `vercel-devops`
- `supabase-agent`: `_workspace/02_supabase_schema.sql` 생성.
- `vercel-devops`: GitHub 레포지토리 생성 및 초기 푸시.

### Phase 2: 프론트엔드 설계
**에이전트:** `frontend-architect`
- `_workspace/01_frontend_design.md` 생성.

### Phase 3: 프론트엔드 구현
**에이전트:** `frontend-coder`
- 설계서와 SQL 스키마를 바탕으로 Next.js 코드 구현.
- `_workspace/03_frontend_report.md` 작성.

### Phase 4: 배포 및 최종 통합
**에이전트:** `vercel-devops`
- Vercel 배포 및 환경 변수 설정.
- 최종 URL 확인 및 `_workspace/04_devops_report.md` 작성.

## 데이터 전달
- 모든 중간 산출물은 `_workspace/` 하위에 저장한다.
- 각 에이전트는 이전 Phase의 결과물을 읽고 작업을 수행한다.

## 에러 핸들링
- 각 단계 실패 시 로그 분석 후 1회 재시도.
- 해결 불가능한 오류 발생 시 상태를 기록하고 사용자에게 보고한다.
