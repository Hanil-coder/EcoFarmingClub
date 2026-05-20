import React from 'react';
import Link from 'next/link';
import { Video, Play, ArrowRight, Star } from 'lucide-react';

export default function EducationPage() {
  const courses = [
    { title: '베란다 채소밭 시작하기', instructor: '김농부 명인', level: '초급', duration: '15분', thumbnail: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=400' },
    { title: '유기농 비료의 비밀', instructor: '이흙 박사', level: '중급', duration: '20분', thumbnail: 'https://images.unsplash.com/photo-1599351052601-38e55e0037a5?auto=format&fit=crop&q=80&w=400' },
    { title: '겨울철 실내 수경재배', instructor: '박수경 강사', level: '초급', duration: '12분', thumbnail: 'https://images.unsplash.com/photo-1558449195-21d1d32049e3?auto=format&fit=crop&q=80&w=400' },
  ];

  return (
    <div className="bg-brand-beige min-h-screen pb-20">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 text-center md:text-left">
          <div>
            <h1 className="text-4xl font-bold text-brand-brown mb-4">교육 & 강좌</h1>
            <p className="text-stone-600">전문가들의 생생한 노하우를 영상으로 만나보세요.</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-stone-200 shadow-sm self-center">
             <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
             <span className="text-sm font-bold text-stone-700">이달의 인기 강좌</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, idx) => (
            <div key={idx} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all">
              <div className="relative aspect-video overflow-hidden">
                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <div className="w-16 h-16 rounded-full bg-brand-green/90 text-white flex items-center justify-center shadow-xl backdrop-blur-sm">
                      <Play className="h-8 w-8 fill-white ml-1" />
                   </div>
                </div>
                <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-2 py-1 rounded-md backdrop-blur-md font-bold">
                   {course.duration}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                   <span className="text-[10px] font-bold uppercase tracking-wider text-brand-green px-2 py-0.5 bg-brand-green-light rounded-md">{course.level}</span>
                </div>
                <h3 className="text-lg font-bold text-stone-900 mb-2 line-clamp-1">{course.title}</h3>
                <p className="text-stone-400 text-sm mb-6">{course.instructor}</p>
                <button className="flex items-center justify-between w-full p-4 rounded-2xl bg-stone-50 text-stone-600 font-bold text-sm hover:bg-brand-green hover:text-white transition-all">
                   수강하기
                   <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
