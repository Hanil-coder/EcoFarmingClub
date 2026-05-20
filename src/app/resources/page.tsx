import React from 'react';
import Link from 'next/link';
import { FileText, Download, CheckCircle2, Map, ArrowRight } from 'lucide-react';

export default function ResourcesPage() {
  const resources = [
    { title: '도시농업 초보 가이드 PDF', type: 'PDF', size: '2.4MB' },
    { title: '작물별 재배 요약표', type: 'Excel', size: '1.1MB' },
    { title: '병해충 자가 진단 차트', type: 'JPG', size: '3.8MB' },
    { title: '월별 농사 캘린더 (출력용)', type: 'PDF', size: '4.2MB' },
  ];

  return (
    <div className="bg-brand-beige min-h-screen pb-20">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <h1 className="text-4xl font-bold text-brand-brown mb-4">자료실</h1>
        <p className="text-stone-600 mb-12">도시농업에 필요한 각종 문서와 가이드 자료를 다운로드하세요.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resources.map((res, idx) => (
            <div key={idx} className="flex items-center justify-between p-6 bg-white rounded-3xl shadow-sm border border-stone-100 hover:shadow-md transition-all">
              <div className="flex items-center gap-4">
                 <div className="h-12 w-12 rounded-2xl bg-stone-50 flex items-center justify-center text-stone-400">
                    <FileText className="h-6 w-6" />
                 </div>
                 <div>
                    <h3 className="font-bold text-stone-900">{res.title}</h3>
                    <p className="text-xs text-stone-400">{res.type} · {res.size}</p>
                 </div>
              </div>
              <button className="p-3 rounded-full bg-brand-green-light text-brand-green hover:bg-brand-green hover:text-white transition-all shadow-sm">
                 <Download className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
           <div className="bg-emerald-600 rounded-3xl p-8 text-white relative overflow-hidden group cursor-pointer">
              <h3 className="text-xl font-bold mb-2 relative z-10">필수 준비물 체크리스트</h3>
              <p className="text-emerald-100 text-sm mb-6 relative z-10">잊은 물건은 없는지 확인해보세요.</p>
              <ArrowRight className="h-6 w-6 relative z-10 transition-transform group-hover:translate-x-2" />
              <CheckCircle2 className="absolute -bottom-4 -right-4 h-32 w-32 opacity-10" />
           </div>
           <div className="bg-stone-800 rounded-3xl p-8 text-white relative overflow-hidden group cursor-pointer">
              <h3 className="text-xl font-bold mb-2 relative z-10">내 주변 주말농장 찾기</h3>
              <p className="text-stone-400 text-sm mb-6 relative z-10">지자체 분양 정보를 확인하세요.</p>
              <ArrowRight className="h-6 w-6 relative z-10 transition-transform group-hover:translate-x-2" />
              <Map className="absolute -bottom-4 -right-4 h-32 w-32 opacity-10" />
           </div>
        </div>
      </div>
    </div>
  );
}
