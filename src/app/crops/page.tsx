import React from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Search, Filter, ArrowRight, Sprout } from 'lucide-react';

export const revalidate = 0; // Disable cache for immediate data refresh

// Helper to ensure correct images are used (frontend-level override)
const getCorrectImageUrl = (cropName: string, dbUrl: string | null) => {
  const overrides: Record<string, string> = {
    '완두콩': 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&q=80&w=800',
    '감자': 'https://images.unsplash.com/photo-1518977676601-b53f02bad675?auto=format&fit=crop&q=80&w=800',
    '배추': 'https://images.unsplash.com/photo-1594313054110-388a10065096?auto=format&fit=crop&q=80&w=800',
    '무': 'https://images.unsplash.com/photo-1528750997573-59b89d56f4f7?auto=format&fit=crop&q=80&w=800',
    '깻잎': 'https://images.unsplash.com/photo-1628543102308-9a4c1a705b1b?auto=format&fit=crop&q=80&w=800',
    '고추': 'https://images.unsplash.com/photo-1588253518679-1297b48d145e?auto=format&fit=crop&q=80&w=800',
    '오이': 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?auto=format&fit=crop&q=80&w=800',
    '가지': 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&q=80&w=800',
    '부추': 'https://images.unsplash.com/photo-1620189507195-68309c04c4d0?auto=format&fit=crop&q=80&w=800',
    '대파': 'https://images.unsplash.com/photo-1587411768638-ec71f8e33b78?auto=format&fit=crop&q=80&w=800',
    '청경채': 'https://images.unsplash.com/photo-1620231155635-4bc27488820c?auto=format&fit=crop&q=80&w=800',
  };
  return overrides[cropName] || dbUrl;
};

async function getCrops() {
  const { data, error } = await supabase
    .from('crops')
    .select('*, categories(name)')
    .order('name');
  
  if (error) {
    console.error('Error fetching crops:', error);
    return [];
  }
  return data;
}

const CropsPage = async () => {
  const crops = await getCrops();

  return (
    <div className="bg-brand-beige min-h-screen pb-20">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold text-brand-brown mb-4">작물 가이드</h1>
            <p className="text-stone-600">도시에서 키우기 좋은 다양한 작물들의 재배 노하우를 확인하세요.</p>
          </div>
          
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
              <input 
                type="text" 
                placeholder="작물 검색..." 
                className="pl-10 pr-4 py-2 rounded-full border border-stone-200 focus:outline-none focus:ring-2 focus:ring-brand-green bg-white text-sm w-full md:w-64"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-stone-200 bg-white text-stone-600 text-sm hover:bg-stone-50 transition-colors">
              <Filter className="h-4 w-4" />
              <span>필터</span>
            </button>
          </div>
        </div>

        {crops.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 sm:gap-8">
            {crops.map((crop) => {
              const displayImageUrl = getCorrectImageUrl(crop.name, crop.image_url);
              return (
                <div key={crop.id} className="group overflow-hidden rounded-3xl bg-white shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
                  <div className="aspect-square w-full overflow-hidden bg-stone-100">
                    {displayImageUrl ? (
                      <img
                        src={displayImageUrl}
                        alt={crop.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-stone-300">
                        <Sprout className="h-12 w-12" />
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-brand-green px-2 py-1 bg-brand-green-light rounded-full">
                        {crop.categories?.name || '기타'}
                      </span>
                      <span className="text-xs text-stone-400">난이도: {crop.difficulty === 'Easy' ? '하' : crop.difficulty === 'Medium' ? '중' : '상'}</span>
                    </div>
                    <h3 className="text-xl font-bold text-stone-900 mb-4">{crop.name}</h3>
                    <Link href={`/crops/${crop.id}`} className="block w-full text-center py-2 rounded-xl bg-stone-50 text-stone-600 text-sm font-medium transition-colors hover:bg-stone-100">
                      가이드 보기
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-stone-200">
            <div className="h-20 w-20 rounded-full bg-stone-50 flex items-center justify-center mb-6">
              <Sprout className="h-10 w-10 text-stone-200" />
            </div>
            <h2 className="text-xl font-bold text-brand-brown mb-2">등록된 작물이 없습니다</h2>
            <p className="text-stone-500 mb-8">새로운 작물 가이드를 준비 중입니다. 잠시만 기다려 주세요!</p>
            <Link href="/" className="text-brand-green font-bold flex items-center gap-1 hover:underline">
              홈으로 돌아가기 <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CropsPage;
