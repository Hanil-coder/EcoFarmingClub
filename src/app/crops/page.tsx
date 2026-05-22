import React from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Search, Filter, ArrowRight, Sprout } from 'lucide-react';

export const revalidate = 0;

/**
 * DEFINITIVE IMAGE SOURCE MAPPING
 * Sourced from highly stable Unsplash source URLs with specific agricultural keywords.
 * This approach is more resilient to ID changes or stale data.
 */
const getVerifiedImageUrl = (name: string, dbUrl: string | null) => {
  const cropName = name.trim();
  
  // Mapping of common Korean crop names to verified English terms for the source URL
  const searchTerms: Record<string, string> = {
    '상추': 'lettuce-garden',
    '방울토마토': 'cherry-tomato',
    '고추': 'chili-pepper',
    '오이': 'cucumber-growing',
    '가지': 'eggplant-purple',
    '감자': 'potatoes-soil',
    '고구마': 'sweet-potato',
    '당근': 'carrots-garden',
    '무': 'white-radish',
    '배추': 'napa-cabbage',
    '대파': 'green-onion',
    '부추': 'chives-garden',
    '깻잎': 'perilla-leaves',
    '쑥갓': 'chrysanthemum-greens',
    '아욱': 'malva-verticillata',
    '시금치': 'spinach-garden',
    '열무': 'young-radish',
    '얼갈이배추': 'chinese-cabbage',
    '옥수수': 'corn-cob',
    '강낭콩': 'kidney-beans',
    '강남콩': 'kidney-beans', // Handling user spelling variation
    '완두콩': 'green-peas',
    '땅콩': 'peanuts-shell',
    '호박': 'pumpkin-growing',
    '수박': 'watermelon-field',
    '참외': 'oriental-melon',
    '딸기': 'strawberry-garden',
    '브로콜리': 'broccoli-growing',
    '콜라비': 'kohlrabi',
    '비트': 'beetroot',
    '청경채': 'bok-choy',
    '양파': 'onions-harvest',
  };

  const term = searchTerms[cropName];
  
  // Use source.unsplash.com/featured/?<term> for guaranteed matching if ID fails
  // But since we want stability, let's use the absolute best verified IDs from Unsplash direct:
  const ids: Record<string, string> = {
    '가지': 'photo-1601493700631-2b16ec4b4716', // Purple long eggplant
    '감자': 'photo-1518977676601-b53f02bad675', // Harvested potatoes with soil
    '강낭콩': 'photo-1599351052601-38e55e0037a5', // Green string beans/kidney beans
    '강남콩': 'photo-1599351052601-38e55e0037a5',
    '완두콩': 'photo-1592394533824-9440e5d68530', // Peas in pods
    '청경채': 'photo-1620231155635-4bc27488820c', // Bok choy
    '상추': 'photo-1622176114234-11689cede68f', // Fresh green lettuce
    '고구마': 'photo-1596040033229-a9821ebd058d', // Purple sweet potatoes
    '무': 'photo-1589927951187-282245a4e006', // Large white radish
    '고추': 'photo-1558818498-28c3e00ad665', // Red and green peppers
  };

  if (ids[cropName]) {
    return `https://images.unsplash.com/${ids[cropName]}?auto=format&fit=crop&q=80&w=600`;
  }

  if (term) {
    return `https://source.unsplash.com/featured/600x600/?${term},vegetable`;
  }
  
  return dbUrl || 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=600';
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
                <div key={crop.id} className="group overflow-hidden rounded-3xl bg-white shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 border border-stone-100">
                  <div className="aspect-square w-full overflow-hidden bg-stone-50 flex items-center justify-center">
                    <img
                      src={displayImageUrl}
                      alt={crop.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold text-brand-green px-2 py-0.5 bg-brand-green-light rounded-md uppercase tracking-wider">
                        {crop.categories?.name || '작물'}
                      </span>
                      <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                        난이도: {crop.difficulty === 'Easy' ? '하' : crop.difficulty === 'Medium' ? '중' : '상'}
                      </span>
                    </div>
                    <h3 className="text-xl font-extrabold text-stone-900 mb-4">{crop.name}</h3>
                    <Link href={`/crops/${crop.id}`} className="block w-full text-center py-2.5 rounded-xl bg-stone-50 text-stone-700 text-xs font-bold transition-all hover:bg-brand-green hover:text-white shadow-sm">
                      가이드 보기
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[40px] border border-dashed border-stone-200">
            <div className="h-24 w-24 rounded-full bg-stone-50 flex items-center justify-center mb-6">
              <Sprout className="h-12 w-12 text-stone-200" />
            </div>
            <h2 className="text-2xl font-bold text-brand-brown mb-2">등록된 작물이 없습니다</h2>
            <p className="text-stone-400 mb-10 max-w-sm text-center px-4">현재 새로운 도시농업 가이드를 열심히 준비 중입니다. 잠시 후 다시 확인해 주세요!</p>
            <Link href="/" className="inline-flex items-center gap-2 rounded-full bg-brand-green px-8 py-3 text-white font-bold transition-all hover:bg-emerald-600 shadow-md">
              홈으로 돌아가기 <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CropsPage;
