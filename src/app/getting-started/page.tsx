import React from 'react';
import Link from 'next/link';
import { CheckCircle2, Sprout, Info, ArrowRight, HelpCircle } from 'lucide-react';

const GettingStartedPage = () => {
  const steps = [
    {
      title: '나만의 공간 찾기',
      desc: '햇빛이 하루 4~6시간 이상 드는 곳을 찾아보세요. 베란다, 옥상, 창가 모두 훌륭한 텃밭이 될 수 있습니다.',
      icon: <Info className="h-6 w-6 text-brand-green" />
    },
    {
      title: '작물 선택하기',
      desc: '처음이라면 상추, 바질, 토마토처럼 키우기 쉬운 작물부터 시작하는 것을 추천합니다.',
      icon: <Sprout className="h-6 w-6 text-brand-green" />
    },
    {
      title: '필수 도구 준비',
      desc: '화분, 상토, 모종(또는 씨앗), 물조개만 있으면 바로 시작할 수 있습니다.',
      icon: <CheckCircle2 className="h-6 w-6 text-brand-green" />
    }
  ];

  return (
    <div className="bg-brand-beige min-h-screen">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-brand-brown mb-4">도시농업 시작하기</h1>
          <p className="text-stone-600 text-lg">복잡한 준비 없이 바로 시작하는 나만의 작은 농원</p>
        </div>

        <section className="bg-white rounded-3xl p-8 shadow-sm mb-12">
          <h2 className="text-2xl font-bold text-brand-brown mb-8 flex items-center gap-2">
            <Sprout className="h-6 w-6 text-brand-green" />
            성공적인 시작을 위한 3단계
          </h2>
          <div className="space-y-8">
            {steps.map((step, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex-shrink-0 h-12 w-12 rounded-2xl bg-brand-green-light flex items-center justify-center">
                  {step.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-brand-brown mb-1">{step.title}</h3>
                  <p className="text-stone-500 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-emerald-600 rounded-3xl p-8 text-white shadow-lg">
            <h2 className="text-xl font-bold mb-4">초보자를 위한 팁</h2>
            <ul className="space-y-3 opacity-90 text-sm">
              <li className="flex items-start gap-2">
                <div className="mt-1 flex-shrink-0 h-1.5 w-1.5 rounded-full bg-white"></div>
                <span>물은 겉흙이 말랐을 때 듬뿍 주세요.</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="mt-1 flex-shrink-0 h-1.5 w-1.5 rounded-full bg-white"></div>
                <span>통풍은 햇빛만큼 중요합니다. 자주 환기시켜 주세요.</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="mt-1 flex-shrink-0 h-1.5 w-1.5 rounded-full bg-white"></div>
                <span>배수가 잘 되는지 꼭 확인하세요.</span>
              </li>
            </ul>
          </div>
          <div className="bg-white rounded-3xl p-8 border border-stone-200 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold text-brand-brown mb-4 flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-brand-green" />
                궁금한 점이 있나요?
              </h2>
              <p className="text-stone-500 text-sm mb-6">
                자주 묻는 질문(FAQ) 섹션에서 다른 초보 농부들이 가장 많이 물어본 질문들을 확인해보세요.
              </p>
            </div>
            <Link href="/faq" className="flex items-center gap-2 text-brand-green font-bold hover:underline">
              FAQ 보러가기 <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <div className="text-center">
          <Link
            href="/crops"
            className="inline-flex items-center gap-2 rounded-full bg-brand-brown px-8 py-4 text-white font-bold transition-all hover:bg-stone-800 hover:scale-105 active:scale-95 shadow-md"
          >
            첫 작물 고르러 가기 <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GettingStartedPage;
