import React from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { HelpCircle, ChevronDown, ArrowRight, MessageCircle } from 'lucide-react';

export const revalidate = 0;

async function getFAQs() {
  const { data, error } = await supabase
    .from('guides')
    .select('*')
    .eq('type', 'FAQ')
    .order('created_at', { ascending: true });
  
  if (error) {
    console.error('Error fetching FAQs:', error);
    return [];
  }
  return data;
}

const FAQPage = async () => {
  const faqs = await getFAQs();

  return (
    <div className="bg-brand-beige min-h-screen pb-20">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-brand-green-light text-brand-green rounded-2xl mb-4">
            <HelpCircle className="h-8 w-8" />
          </div>
          <h1 className="text-4xl font-bold text-brand-brown mb-4">자주 묻는 질문</h1>
          <p className="text-stone-600 max-w-lg mx-auto">
            도시농업을 시작하며 궁금해하시는 내용들을 모았습니다. 
            더 궁금한 점은 커뮤니티에 남겨주세요!
          </p>
        </div>

        <div className="space-y-4">
          {faqs.length > 0 ? (
            faqs.map((faq) => (
              <div key={faq.id} className="bg-white rounded-3xl overflow-hidden border border-stone-100 shadow-sm transition-all hover:shadow-md">
                <details className="group">
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                    <h3 className="text-lg font-bold text-stone-900 group-open:text-brand-green transition-colors flex gap-3 items-start">
                      <span className="text-brand-green font-extrabold">Q.</span>
                      {faq.title}
                    </h3>
                    <ChevronDown className="h-5 w-5 text-stone-400 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="px-6 pb-8 text-stone-600 text-sm leading-relaxed border-t border-stone-50 pt-6">
                    <div className="flex gap-3">
                      <span className="text-amber-500 font-extrabold">A.</span>
                      <div className="whitespace-pre-wrap">{faq.content}</div>
                    </div>
                  </div>
                </details>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-stone-200">
              <p className="text-stone-400">등록된 FAQ가 없습니다.</p>
            </div>
          )}
        </div>

        <div className="mt-16 bg-white rounded-3xl p-8 md:p-10 border border-stone-100 shadow-sm text-center">
           <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-green/10 text-brand-green">
              <MessageCircle className="h-8 w-8" />
           </div>
           <h2 className="text-2xl font-bold text-brand-brown mb-2">원하는 답변을 찾지 못하셨나요?</h2>
           <p className="text-stone-500 mb-8 text-sm">에코파밍클럽 커뮤니티에서 다른 도시 농부들에게 직접 질문하고 노하우를 공유받으세요.</p>
           <Link href="/community" className="inline-flex items-center gap-2 rounded-full bg-brand-green px-8 py-3.5 text-white font-bold transition-all hover:bg-emerald-600 shadow-md">
              커뮤니티 질문하기 <ArrowRight className="h-4 w-4" />
           </Link>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
