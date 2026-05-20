import React from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { MessageSquare, Heart, Eye, User, PenSquare, ArrowRight, Image as ImageIcon } from 'lucide-react';

export const revalidate = 60; // frequent updates for community

async function getCommunityPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      profiles(nickname, avatar_url),
      categories(name)
    `)
    .eq('type', 'Community')
    .eq('is_published', true)
    .order('created_at', { ascending: false })
    .limit(10);
  
  if (error) {
    console.error('Error fetching community posts:', error);
    return [];
  }
  return data;
}

const CommunityPage = async () => {
  const posts = await getCommunityPosts();

  return (
    <div className="bg-brand-beige min-h-screen pb-20">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold text-brand-brown mb-4">커뮤니티</h1>
            <p className="text-stone-600">도시 농부들과 소중한 경험을 나누고 궁금한 점을 해결해보세요.</p>
          </div>
          
          <Link href="/community/new" className="inline-flex items-center gap-2 rounded-full bg-brand-green px-6 py-3 text-white font-bold transition-all hover:bg-emerald-600 shadow-md">
            <PenSquare className="h-5 w-5" />
            <span>글쓰기</span>
          </Link>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden">
          {posts.length > 0 ? (
            <div className="divide-y divide-stone-100">
              {posts.map((post) => (
                <Link 
                  key={post.id}
                  href={`/community/${post.id}`}
                  className="block p-6 hover:bg-stone-50 transition-colors group"
                >
                  <div className="flex gap-4">
                    <div className="flex-grow">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold text-brand-green px-2 py-0.5 bg-brand-green-light rounded-full">
                           {post.categories?.name || '자유게시판'}
                        </span>
                        <span className="text-xs text-stone-400">
                          {new Date(post.created_at).toLocaleDateString('ko-KR')}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-brand-brown mb-2 group-hover:text-brand-green transition-colors line-clamp-1">
                        {post.title}
                      </h3>
                      <p className="text-stone-500 text-sm mb-4 line-clamp-2 leading-relaxed">
                        {post.content.substring(0, 150)}...
                      </p>
                      <div className="flex items-center justify-between">
                         <div className="flex items-center gap-2">
                            <div className="h-6 w-6 rounded-full bg-stone-100 overflow-hidden flex items-center justify-center">
                               {post.profiles?.avatar_url ? (
                                 <img src={post.profiles.avatar_url} alt={post.profiles.nickname} className="h-full w-full object-cover" />
                               ) : (
                                 <User className="h-3 w-3 text-stone-400" />
                               )}
                            </div>
                            <span className="text-xs font-medium text-stone-600">{post.profiles?.nickname || '익명 농부'}</span>
                         </div>
                         <div className="flex items-center gap-4 text-stone-400">
                            <div className="flex items-center gap-1 text-xs">
                               <Eye className="h-3.5 w-3.5" />
                               <span>{post.view_count || 0}</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs">
                               <MessageSquare className="h-3.5 w-3.5" />
                               <span>0</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs">
                               <Heart className="h-3.5 w-3.5" />
                               <span>0</span>
                            </div>
                         </div>
                      </div>
                    </div>
                    {post.image_url && (
                      <div className="hidden sm:block w-24 h-24 flex-shrink-0 rounded-2xl overflow-hidden bg-stone-100">
                         <img src={post.image_url} alt="post thumbnail" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-20 flex flex-col items-center justify-center text-center px-4">
              <div className="h-20 w-20 rounded-full bg-stone-50 flex items-center justify-center mb-6">
                 <MessageSquare className="h-10 w-10 text-stone-200" />
              </div>
              <h2 className="text-xl font-bold text-brand-brown mb-2">커뮤니티의 첫 번째 주인공이 되어보세요!</h2>
              <p className="text-stone-500 mb-8 max-w-sm">
                아직 게시물이 없습니다. 궁금한 점이나 여러분의 텃밭 이야기를 가장 먼저 들려주세요.
              </p>
              <Link href="/community/new" className="inline-flex items-center gap-2 rounded-full bg-brand-green px-8 py-4 text-white font-bold transition-all hover:bg-emerald-600 shadow-md">
                <PenSquare className="h-5 w-5" />
                <span>첫 글 남기기</span>
              </Link>
            </div>
          )}
        </div>
        
        <div className="mt-8 flex justify-center">
           <button className="text-sm font-bold text-stone-400 hover:text-brand-green transition-colors">
              이전 게시물 더 보기
           </button>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
