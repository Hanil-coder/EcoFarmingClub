import React from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Clock, User } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default async function TechniqueDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  
  const { data: guide } = await supabase
    .from('guides')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!guide) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <h1 className="text-2xl font-bold text-stone-900">가이드를 찾을 수 없습니다.</h1>
        <Link href="/techniques" className="mt-4 text-brand-green hover:underline">목록으로 돌아가기</Link>
      </div>
    );
  }

  return (
    <div className="bg-brand-beige min-h-screen pb-20">
      <div className="mx-auto max-w-4xl px-4 pt-10">
        <Link href="/techniques" className="inline-flex items-center gap-2 text-stone-500 hover:text-brand-green mb-8">
          <ArrowLeft className="h-4 w-4" />
          <span>목록으로</span>
        </Link>

        <article className="bg-white rounded-3xl overflow-hidden shadow-sm p-8 md:p-12">
          <header className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-stone-900 mb-6">{guide.title}</h1>
            <div className="flex flex-wrap items-center gap-6 text-sm text-stone-400">
               <div className="flex items-center gap-1.5">
                  <User className="h-4 w-4" />
                  <span>에코파밍 전문가</span>
               </div>
               <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  <span>{new Date(guide.created_at).toLocaleDateString('ko-KR')}</span>
               </div>
            </div>
          </header>

          {guide.image_url && (
            <div className="mb-10 rounded-2xl overflow-hidden">
               <img src={guide.image_url} alt={guide.title} className="w-full h-auto" />
            </div>
          )}

          <div className="prose prose-stone max-w-none text-stone-600 leading-relaxed whitespace-pre-wrap">
            {guide.content}
          </div>
        </article>
      </div>
    </div>
  );
}
