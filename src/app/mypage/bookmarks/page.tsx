import React from 'react';
import Link from 'next/link';
import { Bookmark, Search, ArrowRight } from 'lucide-react';

export default function BookmarksPage() {
  return (
    <div className="bg-brand-beige min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center gap-3 mb-10">
          <div className="p-3 bg-brand-green rounded-2xl text-white shadow-sm">
            <Bookmark className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-bold text-stone-900">저장한 콘텐츠</h1>
        </div>

        <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-stone-100">
          <div className="mx-auto w-24 h-24 bg-stone-50 rounded-full flex items-center justify-center mb-6">
            <Search className="h-10 w-10 text-stone-300" />
          </div>
          <h2 className="text-xl font-bold text-stone-800 mb-2">아직 저장된 콘텐츠가 없습니다.</h2>
          <p className="text-stone-500 mb-8 max-w-md mx-auto">
            나에게 필요한 작물 가이드나 재배 기술을 북마크하여 나중에 한눈에 모아보세요.
          </p>
          <Link 
            href="/crops" 
            className="inline-flex items-center gap-2 rounded-full bg-brand-green px-8 py-3 text-white font-semibold transition-all hover:bg-emerald-600"
          >
            추천 작물 보러가기 <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
