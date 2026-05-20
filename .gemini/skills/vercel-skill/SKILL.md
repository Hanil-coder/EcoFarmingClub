---
name: vercel-skill
description: "Vercel 배포, GitHub 연동, CI/CD 구성, 환경 변수 관리를 담당하는 스킬. 배포나 클라우드 인프라 설정 요청 시 반드시 이 스킬을 사용할 것."
---

# Vercel & DevOps Skill

이 스킬은 Vercel과 GitHub을 활용한 인프라 구축 및 배포 자동화 가이드를 제공합니다.

## 핵심 가이드라인

### 1. GitHub 연동
- `gh repo create`를 사용하여 레포지토리를 생성한다.
- `main` 브랜치를 기본 배포 브랜치로 설정한다.

### 2. Vercel 배포 설정
- `vercel link` 및 `vercel deploy`를 사용하여 프로젝트를 구성한다.
- 필요한 환경 변수(`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` 등)를 Vercel 대시보드 또는 CLI를 통해 등록한다.

### 3. CI/CD 파이프라인
- PR 생성 시 Preview Deployment가 활성화되도록 설정한다.
- 빌드 스크립트 및 린트 검사가 통과해야 머지가 가능하도록 관리한다.

## 작업 절차
1. GitHub 레포지토리 초기화 및 푸시.
2. Vercel 프로젝트 생성 및 Supabase 정보 연동.
3. 최종 배포 확인 및 프로덕션 URL 공유.
