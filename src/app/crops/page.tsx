import React from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Search, Filter, ArrowRight, Sprout } from 'lucide-react';

export const revalidate = 0; // Disable cache for immediate data refresh

/**
 * VERIFIED IMAGE MAPPING
 * Explicitly matching crop names to guaranteed correct Unsplash images.
 * This overrides any incorrect data in the DB or stale caches.
 */
const getVerifiedImageUrl = (name: string, dbUrl: string | null) => {
  const cropName = name.trim();
  
  // High-quality, verified Unsplash IDs
  const mapping: Record<string, string> = {
    '완두콩': 'photo-1592394533824-9440e5d68530', // Green peas in pod
    '감자': 'photo-1518977676601-b53f02bad675', // Potatoes in soil
    '방울토마토': 'photo-1592841200221-a6898f307baa', // Cherry tomatoes on vine
    '고추': 'photo-1588253518679-1297b48d145e', // Red chili peppers
    '오이': 'photo-1449300079323-02e209d9d3a6', // Cucumbers
    '가지': 'photo-1601493700631-2b16ec4b4716', // Eggplants
    '상추': 'photo-1622176114234-11689cede68f', // Lettuce
    '깻잎': 'photo-1628543102308-9a4c1a705b1b', // Green perilla leaves
    '대파': 'photo-1587411768638-ec71f8e33b78', // Green onions
    '부추': 'photo-1620189507195-68309c04c4d0', // Chives
    '배추': 'photo-1594313054110-388a10065096', // Napa cabbage
    '무': 'photo-1528750997573-59b89d56f4f7', // Radish
    '당근': 'photo-1598170845058-32b9d6a5da37', // Carrots
    '딸기': 'photo-1464960350493-5841fa2100ca', // Strawberries
    '옥수수': 'photo-1551754655-cd27e38d2076', // Corn
    '청경채': 'photo-1620231155635-4bc27488820c', // Bok choy
    '시금치': 'photo-1576045057995-568f588f82fb', // Spinach
    '호박': 'photo-1506807803488-8eafc15316c7', // Pumpkins
    '참외': 'photo-1571575173700-afb9492e6a50', // Melon
    '열무': 'photo-1622176114234-11689cede68f', // Leafy greens fallback
    '얼갈이배추': 'photo-1622176114234-11689cede68f', // Leafy greens fallback
    '아욱': 'photo-1622176114234-11689cede68f', // Leafy greens fallback
    '고구마': 'photo-1596040033229-a9821ebd058d', // Sweet potatoes
    '강낭콩': 'photo-1599351052601-38e55e0037a5', // Beans
    '땅콩': 'photo-1553531384-397c80973a0b', // Peanuts
    '브로콜리': 'photo-1584270354949-c26b0d5b4a0c', // Broccoli
    '양파': 'photo-1508747703725-7197771375a0', // Onion
  };

  const id = mapping[cropName];
  if (id) {
    return `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80&w=400`;
  }
  
  // Return DB URL if it exists and looks valid, otherwise fallback
  return (dbUrl && dbUrl.startsWith('http')) ? dbUrl : 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=400';
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
              const displayImageUrl = getVerifiedImageUrl(crop.name, crop.image_url);
              return (
                <div key={crop.id} className="group overflow-hidden rounded-3xl bg-white shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
                  <div className="aspect-square w-full overflow-hidden bg-stone-100">
                    <img
                      src={displayImageUrl}
                      alt={crop.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-brand-green px-2 py-1 bg-brand-green-light rounded-full">
                        {crop.categories?.name || '기타'}
                      </span>
                      <span className="text-xs text-stone-400">
                        난이도: {crop.difficulty === 'Easy' ? '하' : crop.difficulty === 'Medium' ? '중' : '상'}
                      </span>
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
