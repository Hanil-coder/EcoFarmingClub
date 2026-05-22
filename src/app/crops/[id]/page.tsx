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

  // Fallback tips for common crops if DB is empty
  const getFallbackTip = (name: string, currentTip: string | null) => {
    if (currentTip && currentTip.trim().length > 10) return currentTip;
    
    const fallbackTips: Record<string, string> = {
      '당근': '당근은 흙이 부드러워야 뿌리가 곧게 뻗습니다. 돌이 많은 흙은 피하고, 파종 후 싹이 나오면 간격을 5~10cm 정도로 솎아주는 것이 중요합니다. 겉흙이 마르면 물을 충분히 주되, 수확 한 달 전부터는 물주기를 줄여야 당근이 갈라지는 것을 방지할 수 있습니다.',
      '상추': '상추는 서늘한 기후를 좋아합니다. 25도 이상의 고온에서는 꽃대가 빨리 올라오므로 여름철에는 차광막을 설치해주는 것이 좋습니다. 겉흙이 마르기 전에 수시로 물을 주어 잎을 연하게 키우세요.',
      '방울토마토': '첫 꽃이 피면 제거해주어야 나무가 튼튼하게 자랍니다. 곁순을 수시로 제거해주고, 지주대를 세워 줄기가 꺾이지 않게 고정해주세요. 성숙기에는 물을 조금 줄여야 당도가 높아집니다.'
    };
    return fallbackTips[name.trim()] || '이 작물을 위한 특별한 팁이 아직 등록되지 않았습니다. 커뮤니티에 질문을 남겨보세요!';
  };

  const cultivationTip = getFallbackTip(crop.name, crop.cultivation_tip);

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
