import React from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { BookOpen, ArrowRight, Droplets, Sun, Wind, Shovel } from 'lucide-react';

export const revalidate = 3600;

async function getTechniques() {
  const { data, error } = await supabase
    .from('guides')
    .select('*')
    .eq('type', 'Organic')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching techniques:', error);
    return [];
  }
  return data;
}

const TechniquesPage = async () => {
  const techniques = await getTechniques();

  const iconMap: Record<string, React.ReactNode> = {
    'Watering': <Droplets className="h-6 w-6" />,
    'Soil': <Shovel className="h-6 w-6" />,
    'Sunlight': <Sun className="h-6 w-6" />,
    'Ventilation': <Wind className="h-6 w-6" />,
  };

  return (
    <div className="bg-brand-beige min-h-screen pb-20">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-brand-brown mb-4">재배 기술</h1>
          <p className="text-stone-600 max-w-2xl mx-auto">
            건강한 유기농 작물을 키우기 위한 핵심 기술들을 모았습니다. 
            기초부터 심화 과정까지 차근차근 익혀보세요.
          </p>
        </div>

        {techniques.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {techniques.map((tech) => (
              <div key={tech.id} className="bg-white rounded-3xl p-8 shadow-sm border border-stone-100 transition-all hover:shadow-md">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-green-light text-brand-green">
                   <BookOpen className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-brand-brown mb-3">{tech.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed mb-6 line-clamp-3">
                  {tech.content.replace(/[#*`]/g, '').substring(0, 150)}...
                </p>
                <Link href={`/techniques/${tech.slug}`} className="flex items-center gap-2 text-brand-green font-bold text-sm hover:underline">
                  자세히 읽기 <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl p-8 border border-stone-100">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-green-light text-brand-green">
                <Shovel className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-brand-brown mb-2">좋은 흙 만들기</h3>
              <p className="text-stone-500 text-sm mb-4">작물이 자라기 가장 좋은 토양 조건과 배합법을 알아봅니다.</p>
              <span className="text-xs font-semibold text-stone-400 bg-stone-50 px-3 py-1 rounded-full">준비 중</span>
            </div>
            <div className="bg-white rounded-3xl p-8 border border-stone-100">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-green-light text-brand-green">
                <Droplets className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-brand-brown mb-2">올바른 물주기</h3>
              <p className="text-stone-500 text-sm mb-4">과습을 방지하고 작물에 수분을 효과적으로 공급하는 방법입니다.</p>
              <span className="text-xs font-semibold text-stone-400 bg-stone-50 px-3 py-1 rounded-full">준비 중</span>
            </div>
          </div>
        )}
        
        <div className="mt-20 rounded-3xl bg-brand-brown p-8 md:p-12 text-white relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl font-bold mb-6">전문가 영상 가이드</h2>
            <p className="text-stone-300 mb-8 leading-relaxed">
              글로만 배우기 어려운 기술들을 전문가의 시연 영상으로 직접 확인하세요. 
              에코파밍클럽 교육 섹션에서 더 많은 영상을 볼 수 있습니다.
            </p>
            <Link href="/education" className="inline-flex items-center gap-2 rounded-full bg-brand-green px-8 py-4 font-bold transition-all hover:bg-emerald-600">
              영상 보러가기 <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
          <div className="absolute -bottom-10 -right-10 opacity-10">
            <BookOpen className="h-64 w-64" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechniquesPage;
