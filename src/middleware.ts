import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // 프로필 페이지에 접근하려고 할 때 로그인되어 있지 않으면 로그인 페이지로 리디렉션
  if (req.nextUrl.pathname.startsWith('/profile') && !session) {
    const redirectUrl = new URL('/login', req.url);
    return NextResponse.redirect(redirectUrl);
  }

  // 이미 로그인한 사용자가 로그인 또는 회원가입 페이지에 접근하려고 하면 홈페이지로 리디렉션
  if ((req.nextUrl.pathname.startsWith('/login') || req.nextUrl.pathname.startsWith('/signup')) && session) {
    const redirectUrl = new URL('/', req.url);
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

export const config = {
  matcher: ['/profile/:path*', '/login', '/signup'],
}; 