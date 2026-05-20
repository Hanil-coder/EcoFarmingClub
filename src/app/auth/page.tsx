"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Leaf, Mail, Lock, ArrowRight, Github } from 'lucide-react';

const AuthPage = () => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  return (
    <div className="bg-brand-beige min-h-[calc(100-64px)] flex items-center justify-center p-4 py-20">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden border border-stone-100">
        <div className="p-8 md:p-12">
          <div className="flex justify-center mb-8">
            <div className="h-16 w-16 rounded-3xl bg-brand-green-light flex items-center justify-center">
              <Leaf className="h-8 w-8 text-brand-green" />
            </div>
          </div>
          
          <div className="text-center mb-10">
            <h1 className="text-2xl font-bold text-brand-brown mb-2">
              {mode === 'login' ? '다시 오셨군요!' : '환영합니다!'}
            </h1>
            <p className="text-stone-500 text-sm">
              {mode === 'login' 
                ? '로그인하고 나만의 텃밭 관리를 이어가세요.' 
                : '에코파밍클럽과 함께 건강한 도시 농부 생활을 시작하세요.'}
            </p>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-400" />
              <input 
                type="email" 
                placeholder="이메일 주소" 
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-stone-50 border-none focus:ring-2 focus:ring-brand-green text-sm transition-all"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-400" />
              <input 
                type="password" 
                placeholder="비밀번호" 
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-stone-50 border-none focus:ring-2 focus:ring-brand-green text-sm transition-all"
              />
            </div>

            {mode === 'signup' && (
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-400" />
                <input 
                  type="password" 
                  placeholder="비밀번호 확인" 
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-stone-50 border-none focus:ring-2 focus:ring-brand-green text-sm transition-all"
                />
              </div>
            )}

            <button className="w-full py-4 rounded-2xl bg-brand-green text-white font-bold shadow-lg shadow-emerald-100 hover:bg-emerald-600 transition-all hover:scale-[1.02] active:scale-[0.98] mt-4">
              {mode === 'login' ? '로그인' : '가입하기'}
            </button>
          </form>

          <div className="mt-8 relative text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-stone-100"></div>
            </div>
            <span className="relative px-4 bg-white text-xs text-stone-400 uppercase tracking-widest">또는</span>
          </div>

          <div className="mt-8 space-y-3">
             <button className="w-full flex items-center justify-center gap-3 py-3 rounded-2xl border border-stone-200 text-stone-600 font-semibold text-sm hover:bg-stone-50 transition-colors">
                <img src="https://www.google.com/favicon.ico" alt="google" className="h-4 w-4 grayscale opacity-70" />
                <span>Google로 계속하기</span>
             </button>
             <button className="w-full flex items-center justify-center gap-3 py-3 rounded-2xl border border-stone-200 text-stone-600 font-semibold text-sm hover:bg-stone-50 transition-colors">
                <Github className="h-4 w-4 text-stone-600" />
                <span>GitHub로 계속하기</span>
             </button>
          </div>
        </div>

        <div className="bg-stone-50 p-6 text-center border-t border-stone-100">
           <p className="text-sm text-stone-500">
             {mode === 'login' ? '아직 회원이 아니신가요?' : '이미 계정이 있으신가요?'}
             <button 
               onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
               className="ml-2 text-brand-green font-bold hover:underline"
             >
               {mode === 'login' ? '가입하기' : '로그인'}
             </button>
           </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
