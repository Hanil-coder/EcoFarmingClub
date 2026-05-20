import React from 'react';
import Link from 'next/link';
import { ArrowLeft, MessageSquare, User, Heart, Share2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default async function PostDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  
  const { data: post } = await supabase
    .from('posts')
    .select('*, profiles(nickname, avatar_url)')
    .eq('id', id)
    .single();

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <h1 className="text-2xl font-bold text-stone-900">게시글을 찾을 수 없습니다.</h1>
        <Link href="/community" className="mt-4 text-brand-green hover:underline">목록으로 돌아가기</Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="mx-auto max-w-3xl px-4 pt-10">
        <Link href="/community" className="inline-flex items-center gap-2 text-stone-500 hover:text-brand-green mb-8">
          <ArrowLeft className="h-4 w-4" />
          <span>목록으로</span>
        </Link>

        <article>
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-stone-900 mb-6">{post.title}</h1>
            <div className="flex items-center justify-between py-4 border-y border-stone-100">
               <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-stone-100 flex items-center justify-center overflow-hidden">
                     {post.profiles?.avatar_url ? (
                       <img src={post.profiles.avatar_url} alt={post.profiles.nickname} className="h-full w-full object-cover" />
                     ) : (
                       <User className="h-5 w-5 text-stone-400" />
                     )}
                  </div>
                  <div>
                     <p className="font-bold text-stone-900 text-sm">{post.profiles?.nickname || '익명 농부'}</p>
                     <p className="text-xs text-stone-400">{new Date(post.created_at).toLocaleDateString('ko-KR')}</p>
                  </div>
               </div>
               <div className="flex items-center gap-2">
                  <button className="p-2 text-stone-400 hover:text-brand-green"><Share2 className="h-5 w-5" /></button>
               </div>
            </div>
          </header>

          <div className="text-stone-700 leading-relaxed whitespace-pre-wrap mb-12">
            {post.content}
          </div>

          {post.image_url && (
            <div className="mb-12 rounded-2xl overflow-hidden">
               <img src={post.image_url} alt="post content" className="w-full h-auto" />
            </div>
          )}

          <div className="flex items-center gap-6 py-6 border-t border-stone-100">
             <button className="flex items-center gap-2 text-stone-500 font-medium">
                <Heart className="h-5 w-5" />
                <span>좋아요</span>
             </button>
             <button className="flex items-center gap-2 text-stone-500 font-medium">
                <MessageSquare className="h-5 w-5" />
                <span>댓글 0</span>
             </button>
          </div>
        </article>
      </div>
    </div>
  );
}
