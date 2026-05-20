import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Thermometer, Droplets, Sun, Calendar, Info } from 'lucide-react';
import { supabase } from '@/lib/supabase';

// This is a Server Component. In a real app, we'd fetch based on the ID.
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

        <div className="bg-white rounded-3xl overflow-hidden shadow-sm">
          <div className="aspect-video w-full relative overflow-hidden">
            <img 
              src={crop.image_url || 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=800'} 
              alt={crop.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-6 left-6">
              <span className="bg-brand-green text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
                {crop.categories?.name || '작물'}
              </span>
            </div>
          </div>

          <div className="p-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold text-stone-900 mb-1">{crop.name}</h1>
                <p className="text-stone-400 italic text-sm">{crop.scientific_name}</p>
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

            <p className="text-stone-600 leading-relaxed mb-10 whitespace-pre-wrap">
              {crop.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-brand-green-light/30 border border-brand-green/10">
                <Sun className="h-6 w-6 text-brand-green shrink-0" />
                <div>
                  <h3 className="font-bold text-stone-800 text-sm mb-1">햇빛</h3>
                  <p className="text-stone-600 text-sm">{crop.sun_requirement || '정보 없음'}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-blue-50 border border-blue-100">
                <Droplets className="h-6 w-6 text-blue-500 shrink-0" />
                <div>
                  <h3 className="font-bold text-stone-800 text-sm mb-1">물 주기</h3>
                  <p className="text-stone-600 text-sm">{crop.water_requirement || '정보 없음'}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-orange-50 border border-orange-100">
                <Thermometer className="h-6 w-6 text-orange-500 shrink-0" />
                <div>
                  <h3 className="font-bold text-stone-800 text-sm mb-1">적정 온도</h3>
                  <p className="text-stone-600 text-sm">{crop.temp_requirement || '15~25°C'}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-purple-50 border border-purple-100">
                <Calendar className="h-6 w-6 text-purple-500 shrink-0" />
                <div>
                  <h3 className="font-bold text-stone-800 text-sm mb-1">재배 시기</h3>
                  <p className="text-stone-600 text-sm">파종: {crop.sowing_season || '정보 없음'}</p>
                </div>
              </div>
            </div>

            <div className="border-t border-stone-100 pt-8">
              <h2 className="text-xl font-bold text-stone-900 mb-4 flex items-center gap-2">
                <Info className="h-5 w-5 text-brand-green" />
                재배 꿀팁
              </h2>
              <div className="bg-stone-50 p-6 rounded-2xl text-stone-600 text-sm leading-relaxed">
                {crop.cultivation_tip || '이 작물을 위한 특별한 팁이 아직 등록되지 않았습니다.'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
