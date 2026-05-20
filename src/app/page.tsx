import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sprout, BookOpen, ShieldCheck, Video, Heart, MessageSquare } from 'lucide-react';
import { supabase } from '@/lib/supabase';

// Revalidate at most every hour
export const revalidate = 3600;

async function getSeasonalCrops() {
  const { data, error } = await supabase
    .from('crops')
    .select('*, categories(name)')
    .limit(4);
  
  if (error) {
    console.error('Error fetching seasonal crops:', error);
    return [];
  }
  return data;
}

async function getRecentNews() {
  const { data, error } = await supabase
    .from('posts')
    .select('*, profiles(nickname), categories(name)')
    .eq('type', 'News')
    .limit(3);
  
  if (error) return [];
  return data;
}

export default async function HomePage() {
  const crops = await getSeasonalCrops();
  const news = await getRecentNews();

  const quickStartSteps = [
    { title: '도구 준비하기', icon: <ShieldCheck className="h-6 w-6" />, desc: '도시농업에 꼭 필요한 필수 도구 리스트', href: '/tools' },
    { title: '작물 선택하기', icon: <Sprout className="h-6 w-6" />, desc: '내 환경에 맞는 첫 작물 추천받기', href: '/crops' },
    { title: '재배 기술 익히기', icon: <BookOpen className="h-6 w-6" />, desc: '흙 만들기부터 수확까지 단계별 가이드', href: '/techniques' },
    { title: '영상으로 배우기', icon: <Video className="h-6 w-6" />, desc: '전문가가 알려주는 생생한 노하우', href: '/education' },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="hero-gradient relative overflow-hidden py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-stone-900 sm:text-6xl mb-6">
              시민 모두가 쉽게<br />
              <span className="text-brand-green underline decoration-brand-green-light decoration-8 underline-offset-4">도시농업</span>을 시작하는 곳
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-stone-600">
              베란다 텃밭부터 옥상 농원까지, 에코파밍클럽이 여러분의 건강한 도시 농부 생활을 돕습니다.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/getting-started"
                className="rounded-full bg-brand-green px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-emerald-600 hover:scale-105 active:scale-95"
              >
                지금 시작하기
              </Link>
              <Link href="/crops" className="text-sm font-semibold leading-6 text-stone-900 flex items-center gap-1 hover:text-brand-green">
                전체 작물 보기 <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
        
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-emerald-50 opacity-50 blur-3xl"></div>
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-emerald-50 opacity-50 blur-3xl"></div>
      </section>

      {/* Quick Start Cards */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-brand-brown tracking-tight">처음이신가요?</h2>
            <p className="mt-4 text-stone-600">성공적인 첫 수확을 위한 4단계 퀵 가이드</p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {quickStartSteps.map((step, idx) => (
              <Link key={idx} href={step.href} className="relative flex flex-col items-center p-8 rounded-3xl border border-stone-100 bg-brand-beige transition-all hover:shadow-md hover:-translate-y-1">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-brand-green shadow-sm">
                  {step.icon}
                </div>
                <h3 className="text-lg font-bold text-brand-brown">{step.title}</h3>
                <p className="mt-2 text-center text-sm text-stone-500 leading-relaxed">{step.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal Crops Preview */}
      <section className="py-20 bg-brand-beige">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-brand-brown tracking-tight">이달의 추천 작물</h2>
              <p className="mt-4 text-stone-600">지금 심으면 딱 좋은 계절 작물들을 확인해보세요.</p>
            </div>
            <Link href="/crops" className="hidden sm:flex items-center gap-1 text-sm font-semibold text-brand-green hover:underline">
              더 보기 <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-8">
            {crops.map((crop) => (
              <div key={crop.id} className="group overflow-hidden rounded-3xl bg-white shadow-sm transition-all hover:shadow-xl">
                <div className="aspect-square w-full overflow-hidden">
                  <img
                    src={crop.image_url || 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=400'}
                    alt={crop.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-brand-green px-2 py-1 bg-brand-green-light rounded-full">{crop.categories?.name || '작물'}</span>
                    <span className="text-xs text-stone-400">{crop.difficulty === 'Easy' ? '쉬움' : '보통'}</span>
                  </div>
                  <h3 className="text-xl font-bold text-stone-900 mb-4">{crop.name}</h3>
                  <Link href={`/crops/${crop.id}`} className="block w-full text-center py-2 rounded-xl bg-stone-50 text-stone-600 text-sm font-medium transition-colors hover:bg-stone-100">
                    가이드 보기
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-brand-brown text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-6">나만의 텃밭 일기를 써보세요</h2>
          <p className="max-w-2xl mx-auto text-stone-300 mb-10 leading-relaxed">
            내가 키운 작물들의 성장 과정을 기록하고 다른 농부들과 정보를 나누세요. 
            에코파밍클럽 커뮤니티가 여러분을 기다립니다.
          </p>
          <Link href="/auth" className="inline-block rounded-full bg-brand-green px-8 py-4 text-lg font-semibold transition-all hover:bg-emerald-600">
            커뮤니티 가입하기
          </Link>
        </div>
      </section>
    </div>
  );
}
