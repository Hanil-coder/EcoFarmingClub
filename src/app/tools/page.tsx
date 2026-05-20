import React from 'react';
import Link from 'next/link';
import { Shovel, Package, ShoppingCart, ArrowRight, ShieldCheck } from 'lucide-react';

export default function ToolsPage() {
  const tools = [
    { title: '모종삽', desc: '가장 기본적인 도구로 흙을 파고 모종을 심을 때 사용합니다.', icon: <Shovel className="h-6 w-6" />, category: '필수' },
    { title: '플랜터(화분)', desc: '베란다 크기에 맞는 다양한 사이즈의 화분 선택 가이드.', icon: <Package className="h-6 w-6" />, category: '준비물' },
    { title: '분무기/물조개', desc: '작물에 물을 줄 때 필요한 도구들입니다.', icon: <ShoppingCart className="h-6 w-6" />, category: '필수' },
    { title: '원예용 장갑', desc: '손을 보호하고 위생적인 작업을 도와줍니다.', icon: <ShieldCheck className="h-6 w-6" />, category: '안전' },
  ];

  return (
    <div className="bg-brand-beige min-h-screen pb-20">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <h1 className="text-4xl font-bold text-brand-brown mb-4">농업 자재 & 도구</h1>
        <p className="text-stone-600 mb-12">초보 도시농부에게 꼭 필요한 준비물을 소개합니다.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tools.map((tool, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-8 shadow-sm border border-stone-100 transition-all hover:shadow-md">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-green-light text-brand-green">
                 {tool.icon}
              </div>
              <span className="text-[10px] font-bold text-brand-green px-2 py-0.5 bg-brand-green-light rounded-md mb-2 inline-block uppercase tracking-wider">{tool.category}</span>
              <h3 className="text-lg font-bold text-brand-brown mb-2">{tool.title}</h3>
              <p className="text-stone-500 text-sm leading-relaxed mb-6">{tool.desc}</p>
              <button className="text-sm font-bold text-stone-400 hover:text-brand-green flex items-center gap-1 transition-colors">
                 구매 가이드 보기 <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
