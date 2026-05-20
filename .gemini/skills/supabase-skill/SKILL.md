---
name: supabase-skill
description: "Supabase DB 설계, RLS 정책 수립, SQL 스키마 작성을 담당하는 스킬. DB 구조 설계나 Supabase 연동 요청 시 반드시 이 스킬을 사용할 것."
---

# Supabase Development Skill

이 스킬은 Supabase를 활용한 데이터 계층 구축 가이드를 제공합니다.

## 핵심 가이드라인

### 1. DB 스키마 설계
- **Naming Convention**: 테이블명과 컬럼명은 `snake_case`를 사용한다.
- **Primary Keys**: 모든 테이블은 `id` (uuid 또는 bigserial)를 PK로 가진다.
- **Timestamps**: `created_at` 및 `updated_at` 컬럼을 포함한다.

### 2. RLS (Row Level Security) 정책
- 기본적으로 모든 테이블의 RLS를 활성화한다 (`ALTER TABLE name ENABLE ROW LEVEL SECURITY`).
- `anon`, `authenticated`, `service_role` 역할을 구분하여 정책을 수립한다.
- `auth.uid()`를 활용하여 사용자 소유 데이터를 보호한다.

### 3. SQL 산출물 작성
- `_workspace/02_supabase_schema.sql`에 모든 DDL을 기록한다.
- 테이블 생성 -> 인덱스 생성 -> RLS 활성화 -> 정책 생성 순서로 작성한다.

## 작업 절차
1. 요구사항 분석 및 ERD 초안 작성.
2. SQL 스키마 구현.
3. 프론트엔드 연동을 위한 TypeScript 타입 정의 지원.
