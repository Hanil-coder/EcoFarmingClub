import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "에코파밍클럽 - 시민을 위한 도시농업 가이드",
  description: "시민 모두가 쉽게 도시농업을 시작하는 곳, 에코파밍클럽입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <Header />
        <main>{children}</main>
        <footer className="border-t border-stone-200 bg-stone-50 py-12">
          <div className="mx-auto max-w-7xl px-4 text-center text-sm text-stone-500 sm:px-6 lg:px-8">
            <p>© 2025 에코파밍클럽. 모든 권리 보유.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
