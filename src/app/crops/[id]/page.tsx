import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Thermometer, Droplets, Sun, Calendar, Info } from 'lucide-react';
import { supabase } from '@/lib/supabase';

// Force real-time data to prevent stale cache
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function CropDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  
  // Robust ID parsing
  const numericId = parseInt(id, 10);
  
  if (isNaN(numericId)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 bg-brand-beige">
        <h1 className="text-2xl font-bold text-stone-900">잘못된 접근입니다.</h1>
        <Link href="/crops" className="mt-4 text-brand-green hover:underline font-bold">목록으로 돌아가기</Link>
      </div>
    );
  }

  const { data: crop, error } = await supabase
    .from('crops')
    .select('*, categories(name)')
    .eq('id', numericId)
    .single();

  if (error || !crop) {
    console.error('Fetch Error:', error);
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 bg-brand-beige text-center">
        <h1 className="text-3xl font-bold text-brand-brown mb-2">작물을 찾을 수 없습니다.</h1>
        <p className="text-stone-500 mb-8 max-w-xs">요청하신 작물 정보가 데이터베이스에 없거나 연결에 문제가 발생했습니다.</p>
        <Link href="/crops" className="inline-flex items-center gap-2 rounded-full bg-brand-green px-8 py-3 text-white font-bold transition-all hover:bg-emerald-600 shadow-md">
          가이드 목록 보기
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-brand-beige min-h-screen pb-20">
      <div className="mx-auto max-w-4xl px-4 pt-10">
        <Link href="/crops" className="inline-flex items-center gap-2 text-stone-500 hover:text-brand-green mb-8 group transition-colors">
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span className="font-medium">작물 가이드 목록</span>
        </Link>

        <div className="bg-white rounded-[40px] overflow-hidden shadow-sm border border-stone-100">
          <div className="aspect-video w-full relative overflow-hidden bg-stone-100 flex items-center justify-center">
            {crop.image_url ? (
              <img 
                src={crop.image_url} 
                alt={crop.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-stone-300 flex flex-col items-center gap-2">
                <Sun className="h-16 w-16" />
                <span className="text-xs font-bold uppercase tracking-widest">No Image Found</span>
              </div>
            )}
            <div className="absolute top-8 left-8">
              <span className="bg-brand-green text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-xl backdrop-blur-sm">
                {crop.categories?.name || '작물'}
              </span>
            </div>
          </div>

          <div className="p-8 md:p-14">
            <div className="flex flex-wrap items-center justify-between gap-6 mb-10">
              <div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-stone-900 mb-2">{crop.name}</h1>
                <p className="text-stone-400 italic text-base">{crop.scientific_name || 'Eco Farming Variety'}</p>
              </div>
              <div className="flex items-center gap-3 px-5 py-2.5 bg-stone-50 rounded-2xl border border-stone-100 shadow-inner">
                <span className="text-sm text-stone-500 font-bold uppercase tracking-wider">난이도</span>
                <span className={`text-lg font-black ${
                  crop.difficulty === 'Easy' ? 'text-emerald-500' : 
                  crop.difficulty === 'Medium' ? 'text-orange-500' : 'text-red-500'
                }`}>
                  {crop.difficulty === 'Easy' ? '쉬움' : crop.difficulty === 'Medium' ? '보통' : '어려움'}
                </span>
              </div>
            </div>

            <p className="text-stone-600 leading-relaxed mb-14 text-xl font-medium">
              {crop.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              <div className="flex items-start gap-5 p-7 rounded-[32px] bg-emerald-50/50 border border-emerald-100 transition-colors hover:bg-emerald-50">
                <Sun className="h-7 w-7 text-brand-green shrink-0" />
                <div>
                  <h3 className="font-bold text-brand-brown text-sm mb-1 uppercase tracking-wider">햇빛 요구량</h3>
                  <p className="text-stone-700 text-base">{crop.sun_requirement || '정보 없음'}</p>
                </div>
              </div>
              <div className="flex items-start gap-5 p-7 rounded-[32px] bg-blue-50/50 border border-blue-100 transition-colors hover:bg-blue-50">
                <Droplets className="h-7 w-7 text-blue-500 shrink-0" />
                <div>
                  <h3 className="font-bold text-stone-800 text-sm mb-1 uppercase tracking-wider">물 주기</h3>
                  <p className="text-stone-700 text-base">{crop.water_requirement || '정보 없음'}</p>
                </div>
              </div>
              <div className="flex items-start gap-5 p-7 rounded-[32px] bg-orange-50/50 border border-orange-100 transition-colors hover:bg-orange-50">
                <Thermometer className="h-7 w-7 text-orange-500 shrink-0" />
                <div>
                  <h3 className="font-bold text-stone-800 text-sm mb-1 uppercase tracking-wider">적정 온도</h3>
                  <p className="text-stone-700 text-base">{crop.temp_requirement || '15~25°C'}</p>
                </div>
              </div>
              <div className="flex items-start gap-5 p-7 rounded-[32px] bg-purple-50/50 border border-purple-100 transition-colors hover:bg-purple-50">
                <Calendar className="h-7 w-7 text-purple-500 shrink-0" />
                <div>
                  <h3 className="font-bold text-stone-800 text-sm mb-1 uppercase tracking-wider">재배/수확 시기</h3>
                  <p className="text-stone-700 text-base">{crop.sowing_season || '정보 없음'} (수확: {crop.harvest_season || '-'})</p>
                </div>
              </div>
            </div>

            <div className="border-t border-stone-100 pt-12">
              <h2 className="text-3xl font-bold text-stone-900 mb-8 flex items-center gap-3">
                <div className="p-2 bg-brand-green rounded-xl text-white shadow-lg">
                  <Info className="h-6 w-6" />
                </div>
                재배 꿀팁
              </h2>
              <div className="bg-brand-green-light/30 p-10 rounded-[40px] text-stone-800 text-lg leading-relaxed border border-brand-green/10 shadow-inner">
                {crop.cultivation_tip || '이 작물을 위한 특별한 팁이 아직 등록되지 않았습니다. 커뮤니티에 질문을 남겨보세요!'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
