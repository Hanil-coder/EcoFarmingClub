"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Leaf, User, Search, Bookmark } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: '시작하기', href: '/getting-started' },
    { name: '작물가이드', href: '/crops' },
    { name: '재배기술', href: '/techniques' },
    { name: '병해충', href: '/pests' },
    { name: '커뮤니티', href: '/community' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-stone-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Leaf className="h-6 w-6 text-brand-green" />
          <span className="text-xl font-bold tracking-tight text-brand-brown">에코파밍클럽</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-stone-600 transition-colors hover:text-brand-green"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-4 md:flex">
          <button className="rounded-full p-2 text-stone-500 hover:bg-stone-100 hover:text-brand-green">
            <Search className="h-5 w-5" />
          </button>
          <Link href="/mypage/bookmarks" className="rounded-full p-2 text-stone-500 hover:bg-stone-100 hover:text-brand-green">
            <Bookmark className="h-5 w-5" />
          </Link>
          <Link href="/auth" className="flex items-center gap-2 rounded-full bg-brand-green px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-emerald-600 shadow-sm">
            <User className="h-4 w-4" />
            <span>로그인</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="inline-flex items-center justify-center rounded-md p-2 text-stone-500 hover:bg-stone-100 hover:text-brand-green"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3 border-t border-stone-100 bg-white">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block rounded-md px-3 py-2 text-base font-medium text-stone-600 hover:bg-stone-50 hover:text-brand-green"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="mt-4 flex items-center gap-4 px-3 py-2">
               <Link href="/auth" className="w-full text-center rounded-full bg-brand-green py-3 text-sm font-semibold text-white hover:bg-emerald-600">
                로그인 / 회원가입
               </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
