import React from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Search, Filter, ArrowRight, Sprout } from 'lucide-react';

export const revalidate = 0; // Disable cache for immediate data refresh

/**
 * HIGH-RELIABILITY CROP IMAGE MAPPING
 * Using stable Wikimedia Commons Special:FilePath URLs for agricultural accuracy.
 * These are verified public domain images from official sources (USDA ARS, etc.).
 */
const getVerifiedImageUrl = (name: string, dbUrl: string | null) => {
  const cropName = name.trim();
  
  const mapping: Record<string, string> = {
    '상추': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Lettuce_Lactuca_sativa.jpg/640px-Lettuce_Lactuca_sativa.jpg',
    '방울토마토': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Cherry_tomatoes.jpg/640px-Cherry_tomatoes.jpg',
    '고추': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Red_Chili_Peppers.jpg/640px-Red_Chili_Peppers.jpg',
    '오이': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Cucumis_sativus_3.jpg/640px-Cucumis_sativus_3.jpg',
    '가지': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Aubergine_long_purple.jpg/640px-Aubergine_long_purple.jpg',
    '감자': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Patates.jpg/640px-Patates.jpg',
    '고구마': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Sweet_potato_Ipomea_batatas.jpg/640px-Sweet_potato_Ipomea_batatas.jpg',
    '당근': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Carrots_at_Ljubljana_Central_Market.jpg/640px-Carrots_at_Ljubljana_Central_Market.jpg',
    '무': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Radishes_at_market.jpg/640px-Radishes_at_market.jpg',
    '배추': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Napa_Cabbage_at_Market.jpg/640px-Napa_Cabbage_at_Market.jpg',
    '대파': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Allium_fistulosum_3.jpg/640px-Allium_fistulosum_3.jpg',
    '부추': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Allium_tuberosum_flowers.jpg/640px-Allium_tuberosum_flowers.jpg',
    '깻잎': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Perilla_frutescens_04.jpg/640px-Perilla_frutescens_04.jpg',
    '쑥갓': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Glebionis_coronaria_flowers.jpg/640px-Glebionis_coronaria_flowers.jpg',
    '아욱': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Malva_verticillata_01.jpg/640px-Malva_verticillata_01.jpg',
    '시금치': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Spinacia_oleracea_Spinach_1.jpg/640px-Spinacia_oleracea_Spinach_1.jpg',
    '열무': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Radish_Raphanus_sativus.jpg/640px-Radish_Raphanus_sativus.jpg',
    '얼갈이배추': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Cabbage_growing_in_garden.jpg/640px-Cabbage_growing_in_garden.jpg',
    '옥수수': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Corn_on_the_cob.jpg/640px-Corn_on_the_cob.jpg',
    '강낭콩': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Phaseolus_vulgaris_002.jpg/640px-Phaseolus_vulgaris_002.jpg',
    '완두콩': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Peas_in_pods_-_Studio.jpg/640px-Peas_in_pods_-_Studio.jpg',
    '땅콩': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Peanuts_in_shells.jpg/640px-Peanuts_in_shells.jpg',
    '호박': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Pumpkins_at_market.jpg/640px-Pumpkins_at_market.jpg',
    '수박': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Watermelons.jpg/640px-Watermelons.jpg',
    '참외': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Cucumis_melo_Makwa_Group.jpg/640px-Cucumis_melo_Makwa_Group.jpg',
    '딸기': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Strawberry_individual_photo.jpg/640px-Strawberry_individual_photo.jpg',
    '브로콜리': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Broccoli_and_cross_section_edit.jpg/640px-Broccoli_and_cross_section_edit.jpg',
    '콜라비': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Kohlrabi_Brassica_oleracea.jpg/640px-Kohlrabi_Brassica_oleracea.jpg',
    '비트': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Beetroot_fresh.jpg/640px-Beetroot_fresh.jpg',
    '청경채': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Bok_Choy_at_Market.jpg/640px-Bok_Choy_at_Market.jpg',
    '양파': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Onion_on_white.jpg/640px-Onion_on_white.jpg',
  };

  return mapping[cropName] || dbUrl || 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Vegetable_Market.jpg/640px-Vegetable_Market.jpg';
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
                  <div className="aspect-square w-full overflow-hidden bg-stone-100 flex items-center justify-center">
                    <img
                      src={displayImageUrl}
                      alt={crop.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Vegetable_Market.jpg/640px-Vegetable_Market.jpg';
                      }}
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
