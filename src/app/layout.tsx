import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/context/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '미니멀 인증 시스템',
  description: 'Next.js와 Supabase로 구현한 미니멀 인증 시스템',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body 
        suppressHydrationWarning 
        className={`${inter.className} bg-neutral-50 text-neutral-900 min-h-screen`}
      >
        <AuthProvider>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
