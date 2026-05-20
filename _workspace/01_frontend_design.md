# Eco Farming Club Frontend Design Specification

## 1. Overview
The Eco Farming Club portal is designed to lower the barrier for urban residents to start farming. The UI/UX architecture prioritizes ease of use, visual clarity (illustrations), and a natural aesthetic to reduce the "complexity" often associated with agriculture.

## 2. Site Map & Page Hierarchy
- **Home (/)**: Catchphrase, Quick Start, Seasonal Recommendations, Recent Updates.
- **Getting Started (/getting-started)**: Intro to Urban Farming, FAQ, Checklist, Pro-tips.
- **Crop Guide (/crops)**:
    - `index`: Grid view of crop categories (Leafy, Fruiting, Herb, Root).
    - `[slug]`: Detailed cultivation guide (Difficulty, Sun/Water/Temp, Sowing/Harvesting).
- **Techniques (/techniques)**: Organic principles, Soil making, Fertilizers, Watering.
- **Pest Management (/pests)**: Eco-friendly prevention, Diagnosis with photos, Solutions.
- **Tools (/tools)**: Essential tools, Pot/Planter comparisons, Purchase guide.
- **Education (/education)**: Online/Offline courses, Practice videos, Local programs.
- **Calendar (/calendar)**: Monthly sowing/harvesting schedule, Seasonal tasks.
- **Community (/community)**: Q&A, Journal sharing, Interviews, Local groups.
- **Library (/resources)**: PDF Guides, Checklists, Summaries.
- **My Page (/mypage)**:
    - `/dashboard`: Personal cultivation journal and calendar.
    - `/bookmarks`: Saved crops and guides.
- **Auth (/auth)**: Sign-in / Sign-up.

## 3. Design System (Tailwind CSS)

### 3.1 Color Palette
- **Primary (Growth & Nature)**: 
  - `brand-green`: `#10b981` (Emerald 600)
  - `brand-green-light`: `#ecfdf5` (Emerald 50)
- **Secondary (Soil & Earth)**:
  - `brand-beige`: `#f9f8f6` (Custom Stone 50)
  - `brand-brown`: `#44403c` (Stone 800)
- **Neutral**:
  - `text-main`: `#1c1917` (Stone 900)
  - `text-sub`: `#78716c` (Stone 500)

### 3.2 Typography
- **Headings**: Serif-style for a "natural" feel or Clean Sans-serif (Pretendard).
- **Body**: High readability sans-serif, optimized for easy sentences.

### 3.3 Visual Style
- **Iconography**: Rounded, friendly line icons or flat illustrations.
- **Buttons**: Rounded-full, high contrast for CTAs.
- **Shadows**: Soft, subtle shadows (sm/md) to maintain a minimal look.

## 4. Component Architecture
Using **Atomic Design** principles to ensure consistency.

- **Atoms**: 
  - `Button`, `Input`, `Badge`, `Icon`, `Avatar`.
- **Molecules**: 
  - `CardCrop`, `CardCourse`, `FormField`, `SearchBar`, `Breadcrumb`.
- **Organisms**: 
  - `NavigationHeader`, `MainFooter`, `CropGrid`, `CommunityFeed`, `CalendarWidget`.
- **Templates**: 
  - `MainLayout`, `DashboardLayout`, `ArticleLayout`.

## 5. Data Flow & State Management

### 5.1 Supabase Integration
- **Auth**: `supabase.auth` for session management and RLS.
- **Database**: `supabase.from()` for fetching relational data.
- **Storage**: `supabase.storage` for user-uploaded journal images.

### 5.2 Server State
- **TanStack Query (React Query)**:
  - Caching crop data and community posts.
  - Optimistic updates for bookmarks and comments.
  - Prefetching for seamless transitions.

### 5.3 Global UI State
- **Zustand**: Lightweight state for UI toggles (sidebar, modals, notifications).

## 6. Development Guidelines
- **Responsive Design**: Mobile-first approach, mimicking the "App-like" feel of Daangn Market.
- **Performance**: Use Next.js Image optimization for crop photos and illustrations.
- **Accessibility**: ARIA labels for all interactive elements, maintaining high color contrast for senior users.
