import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Thermometer, Droplets, Sun, Calendar, Info } from 'lucide-react';
import { supabase } from '@/lib/supabase';

// Force real-time data from Supabase
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function CropDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  
  const { data: crop } = await supabase
    .from('crops')
    .select('*, categories(name)')
    .eq('id', id)
    .single();

  if (!crop) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <h1 className="text-2xl font-bold text-stone-900">작물을 찾을 수 없습니다.</h1>
        <Link href="/crops" className="mt-4 text-brand-green hover:underline">목록으로 돌아가기</Link>
      </div>
    );
  }

  return (
    <div className="bg-brand-beige min-h-screen pb-20">
      <div className="mx-auto max-w-4xl px-4 pt-10">
        <Link href="/crops" className="inline-flex items-center gap-2 text-stone-500 hover:text-brand-green mb-8">
          <ArrowLeft className="h-4 w-4" />
          <span>목록으로</span>
        </Link>

        <div className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-stone-100">
          <div className="aspect-video w-full relative overflow-hidden bg-stone-100 flex items-center justify-center">
            {crop.image_url ? (
              <img 
                src={crop.image_url} 
                alt={crop.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-stone-300 flex flex-col items-center gap-2">
                <Sun className="h-12 w-12" />
                <span className="text-xs font-bold uppercase tracking-widest">No Image Found</span>
              </div>
            )}
            <div className="absolute top-6 left-6">
              <span className="bg-brand-green text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
                {crop.categories?.name || '작물'}
              </span>
            </div>
          </div>

          <div className="p-8 md:p-12">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-4xl font-bold text-stone-900 mb-1">{crop.name}</h1>
                <p className="text-stone-400 italic text-sm">{crop.scientific_name || 'Urban Farming Club'}</p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-stone-50 rounded-2xl border border-stone-100">
                <span className="text-sm text-stone-500 font-medium">난이도:</span>
                <span className={`text-sm font-bold ${
                  crop.difficulty === 'Easy' ? 'text-emerald-500' : 
                  crop.difficulty === 'Medium' ? 'text-orange-500' : 'text-red-500'
                }`}>
                  {crop.difficulty === 'Easy' ? '쉬움' : crop.difficulty === 'Medium' ? '보통' : '어려움'}
                </span>
              </div>
            </div>

            <p className="text-stone-600 leading-relaxed mb-12 whitespace-pre-wrap text-lg">
              {crop.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="flex items-start gap-4 p-6 rounded-3xl bg-emerald-50/50 border border-emerald-100">
                <Sun className="h-6 w-6 text-brand-green shrink-0" />
                <div>
                  <h3 className="font-bold text-stone-800 text-sm mb-1">햇빛</h3>
                  <p className="text-stone-600 text-sm">{crop.sun_requirement || '정보 없음'}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 rounded-3xl bg-blue-50/50 border border-blue-100">
                <Droplets className="h-6 w-6 text-blue-500 shrink-0" />
                <div>
                  <h3 className="font-bold text-stone-800 text-sm mb-1">물 주기</h3>
                  <p className="text-stone-600 text-sm">{crop.water_requirement || '정보 없음'}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 rounded-3xl bg-orange-50/50 border border-orange-100">
                <Thermometer className="h-6 w-6 text-orange-500 shrink-0" />
                <div>
                  <h3 className="font-bold text-stone-800 text-sm mb-1">적정 온도</h3>
                  <p className="text-stone-600 text-sm">{crop.temp_requirement || '15~25°C'}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 rounded-3xl bg-purple-50/50 border border-purple-100">
                <Calendar className="h-6 w-6 text-purple-500 shrink-0" />
                <div>
                  <h3 className="font-bold text-stone-800 text-sm mb-1">재배 시기</h3>
                  <p className="text-stone-600 text-sm">파종: {crop.sowing_season || '정보 없음'}</p>
                </div>
              </div>
            </div>

            <div className="border-t border-stone-100 pt-10">
              <h2 className="text-2xl font-bold text-stone-900 mb-6 flex items-center gap-2">
                <Info className="h-6 w-6 text-brand-green" />
                재배 꿀팁
              </h2>
              <div className="bg-brand-green-light/30 p-8 rounded-[32px] text-stone-700 text-base leading-relaxed border border-brand-green/10 shadow-inner">
                {crop.cultivation_tip || '이 작물을 위한 특별한 팁이 아직 등록되지 않았습니다. 커뮤니티에 질문을 남겨보세요!'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
