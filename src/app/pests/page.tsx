import React from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { ShieldAlert, ArrowRight, ShieldCheck, Bug, BugOff, HelpCircle } from 'lucide-react';

export const revalidate = 3600;

async function getPestGuides() {
  const { data, error } = await supabase
    .from('guides')
    .select('*')
    .eq('type', 'Pest')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching pest guides:', error);
    return [];
  }
  return data;
}

const PestsPage = async () => {
  const guides = await getPestGuides();

  return (
    <div className="bg-brand-beige min-h-screen pb-20">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-brand-brown mb-4">병해충 관리</h1>
          <p className="text-stone-600 max-w-2xl mx-auto">
            화학 농약 없이도 작물을 건강하게 지킬 수 있습니다. 
            친환경적인 병해충 예방 및 치료법을 확인해보세요.
          </p>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-stone-100">
             <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                <Bug className="h-6 w-6" />
             </div>
             <h3 className="text-lg font-bold text-brand-brown mb-2">해충 식별하기</h3>
             <p className="text-stone-500 text-sm leading-relaxed">
               내 작물을 괴롭히는 범인이 누구인지 사진과 특징으로 정확하게 파악해보세요.
             </p>
          </div>
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-stone-100">
             <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-brand-green">
                <ShieldCheck className="h-6 w-6" />
             </div>
             <h3 className="text-lg font-bold text-brand-brown mb-2">천연 살충제 만들기</h3>
             <p className="text-stone-500 text-sm leading-relaxed">
               난황유, 마늘액 등 주변에서 쉽게 구할 수 있는 재료로 만드는 친환경 방제법입니다.
             </p>
          </div>
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-stone-100">
             <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-stone-50 text-stone-600">
                <BugOff className="h-6 w-6" />
             </div>
             <h3 className="text-lg font-bold text-brand-brown mb-2">예방이 최선입니다</h3>
             <p className="text-stone-500 text-sm leading-relaxed">
               적절한 간격 유지와 통풍, 건강한 흙 관리를 통해 병해충 발생을 미리 차단하세요.
             </p>
          </div>
        </section>

        <div className="mb-12 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-brand-brown">최신 병해충 가이드</h2>
          <span className="text-sm text-stone-500">{guides.length}개의 가이드</span>
        </div>

        {guides.length > 0 ? (
          <div className="space-y-6">
            {guides.map((guide) => (
              <Link 
                key={guide.id}
                href={`/pests/${guide.slug}`}
                className="block bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-stone-100 transition-all hover:shadow-md group"
              >
                <div className="flex flex-col md:flex-row gap-6 md:items-center">
                  {guide.image_url && (
                    <div className="md:w-32 md:h-32 flex-shrink-0 overflow-hidden rounded-2xl bg-stone-100">
                      <img src={guide.image_url} alt={guide.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                    </div>
                  )}
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-brand-brown mb-2 group-hover:text-brand-green transition-colors">{guide.title}</h3>
                    <p className="text-stone-500 text-sm mb-4 line-clamp-2">{guide.content.replace(/[#*`]/g, '').substring(0, 200)}...</p>
                    <div className="flex items-center gap-2 text-brand-green font-semibold text-sm">
                      자세히 보기 <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-stone-200">
            <div className="h-16 w-16 rounded-full bg-stone-50 flex items-center justify-center mx-auto mb-6">
              <ShieldAlert className="h-8 w-8 text-stone-300" />
            </div>
            <h3 className="text-lg font-bold text-brand-brown mb-2">아직 등록된 가이드가 없습니다</h3>
            <p className="text-stone-500 mb-8">곧 유용한 병해충 관리 정보를 업데이트할 예정입니다.</p>
          </div>
        )}

        <div className="mt-20 bg-emerald-50 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
           <div className="bg-white p-4 rounded-full shadow-sm">
              <HelpCircle className="h-12 w-12 text-brand-green" />
           </div>
           <div className="flex-grow text-center md:text-left">
              <h2 className="text-2xl font-bold text-brand-brown mb-2">직접 물어보세요!</h2>
              <p className="text-stone-600">가이드에서 답을 찾지 못했다면 커뮤니티에 질문을 남겨보세요. 전문가와 숙련된 농부들이 답변해드립니다.</p>
           </div>
           <Link href="/community" className="inline-flex items-center gap-2 rounded-full bg-brand-green px-8 py-4 text-white font-bold transition-all hover:bg-emerald-600 whitespace-nowrap shadow-sm">
              질문하러 가기 <ArrowRight className="h-5 w-5" />
           </Link>
        </div>
      </div>
    </div>
  );
};

export default PestsPage;
