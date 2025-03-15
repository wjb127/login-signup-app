import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // 인증이 필요한 페이지에 접근하려고 할 때 로그인 페이지로 리디렉션
  if (!session && (req.nextUrl.pathname === '/profile')) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = '/login';
    redirectUrl.searchParams.set('message', '로그인이 필요합니다.');
    return NextResponse.redirect(redirectUrl);
  }

  // 이미 로그인한 사용자가 로그인 또는 회원가입 페이지에 접근하려고 하면 홈페이지로 리디렉션
  if (session && (req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/signup')) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return res;
}

export const config = {
  matcher: ['/profile', '/login', '/signup'],
}; 