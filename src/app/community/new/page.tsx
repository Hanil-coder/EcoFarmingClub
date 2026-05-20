import React from 'react';
import Link from 'next/link';
import { ArrowLeft, PenSquare, Image, Send } from 'lucide-react';

export default function NewPostPage() {
  return (
    <div className="bg-brand-beige min-h-screen py-12 px-4">
      <div className="mx-auto max-w-2xl">
        <Link href="/community" className="inline-flex items-center gap-2 text-stone-500 hover:text-brand-green mb-8">
          <ArrowLeft className="h-4 w-4" />
          <span>취소하기</span>
        </Link>

        <div className="bg-white rounded-3xl shadow-sm p-8 md:p-10">
          <div className="flex items-center gap-3 mb-8">
            <PenSquare className="h-6 w-6 text-brand-green" />
            <h1 className="text-2xl font-bold text-stone-900">새 글 작성</h1>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-stone-700 mb-2">카테고리</label>
              <select className="w-full p-4 rounded-2xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-brand-green appearance-none bg-stone-50">
                <option>자유게시판</option>
                <option>질문/답변</option>
                <option>재배 일지</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-stone-700 mb-2">제목</label>
              <input 
                type="text" 
                placeholder="제목을 입력하세요" 
                className="w-full p-4 rounded-2xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-brand-green bg-stone-50"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-stone-700 mb-2">내용</label>
              <textarea 
                rows={10}
                placeholder="도시 농부들과 나누고 싶은 이야기를 적어주세요." 
                className="w-full p-4 rounded-2xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-brand-green bg-stone-50 resize-none"
              ></textarea>
            </div>

            <button className="flex items-center justify-center gap-2 w-full p-4 rounded-full border-2 border-dashed border-stone-200 text-stone-400 hover:border-brand-green hover:text-brand-green transition-colors">
              <Image className="h-5 w-5" />
              <span>사진 추가하기</span>
            </button>

            <button className="flex items-center justify-center gap-2 w-full p-4 rounded-full bg-brand-green text-white font-bold text-lg hover:bg-emerald-600 transition-all shadow-md">
              <Send className="h-5 w-5" />
              <span>등록하기</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
