// Next.js 글로벌 스타일시트 임포트
import './globals.css';
// Next.js 메타데이터 타입 임포트
import type { Metadata } from 'next';
// Google 폰트 (Inter) 임포트
import { Inter } from 'next/font/google';
// 인증 컨텍스트 프로바이더 임포트
import { AuthProvider } from '@/context/AuthContext';

// Inter 폰트 설정 (라틴 문자 서브셋 사용)
const inter = Inter({ subsets: ['latin'] });

// 애플리케이션 메타데이터 설정 (SEO 및 브라우저 탭에 표시)
export const metadata: Metadata = {
  title: '미니멀 인증 시스템',
  description: 'Next.js와 Supabase로 구현한 미니멀 인증 시스템',
};

// 루트 레이아웃 컴포넌트 - 모든 페이지의 공통 레이아웃 정의
export default function RootLayout({
  children, // 자식 컴포넌트 (페이지 내용)
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body 
        // 하이드레이션 경고 무시 (클라이언트/서버 렌더링 차이 방지)
        suppressHydrationWarning 
        // 기본 스타일 적용 (Inter 폰트, 배경색, 텍스트 색상, 최소 높이)
        className={`${inter.className} bg-neutral-50 text-neutral-900 min-h-screen`}
      >
        {/* 인증 상태 관리를 위한 AuthProvider로 전체 앱 래핑 */}
        <AuthProvider>
          {/* 최대 너비 제한 및 반응형 패딩 적용 */}
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children} {/* 페이지 내용 렌더링 */}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
