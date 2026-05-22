import React from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { HelpCircle, ChevronDown, ArrowRight, MessageCircle } from 'lucide-react';

export const revalidate = 0;

async function getFAQs() {
  const { data, error } = await supabase
    .from('guides')
    .select('*')
    .filter('title', 'ilike', '%?%') // Flexible filter for FAQ-like titles
    .order('created_at', { ascending: true });
  
  if (error) {
    console.error('Error fetching FAQs:', error);
    return [];
  }
  return data;
}

const FAQPage = async () => {
  const dbFaqs = await getFAQs();
  
  // Hard-coded fallback for immediate display and reliability
  const fallbackFaqs = [
    {
      id: 'f1',
      title: '베란다에서 농사를 시작하려면 햇빛이 얼마나 필요할까요?',
      content: '대부분의 채소는 하루 최소 4~6시간 이상의 직사광선이 필요합니다. 햇빛이 부족한 남향이 아닌 베란다라면 상추, 청경채, 쑥갓 같은 반그늘에서도 잘 자라는 잎채소류부터 시작하시는 것을 추천드립니다.'
    },
    {
      id: 'f2',
      title: '비료는 언제, 얼마나 주어야 하나요?',
      content: '초기 배양토에는 영양분이 충분하므로, 심은 후 약 1개월 뒤부터 주기 시작합니다. 알갱이 형태의 완효성 비료는 한 달에 한 번, 액체 비료는 1~2주에 한 번 물에 희석하여 주는 것이 적당합니다. 과한 비료는 오히려 작물을 죽게 할 수 있으니 주의하세요.'
    },
    {
      id: 'f3',
      title: '여행을 갈 때 물주기는 어떻게 해야 하나요?',
      content: '2~3일 정도라면 물을 충분히 준 뒤 그늘로 옮겨두는 것만으로도 충분합니다. 장기 여행 시에는 페트병 자동 급수기(저면관수 장치)를 활용하거나, 큰 대야에 물을 받아 화분을 담가두는 방식을 추천합니다.'
    }
  ];

  const faqs = dbFaqs.length > 0 ? dbFaqs : fallbackFaqs;

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
