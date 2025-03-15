'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import LogoutButton from '@/components/LogoutButton';
import { useAuth } from '@/context/AuthContext';

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-neutral-800 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12">
      <div className="w-full max-w-md">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900 mb-2">미니멀 인증</h1>
          <p className="text-neutral-500">심플하고 안전한 인증 시스템</p>
        </div>

        {user ? (
          <div className="space-y-6">
            <div className="overflow-hidden rounded-xl bg-white p-8 shadow-sm ring-1 ring-neutral-200">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500">
                  {user.email?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-medium">{user.email}</p>
                  <p className="text-sm text-neutral-500">로그인 됨</p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Link 
                href="/profile" 
                className="flex-1 rounded-lg bg-white px-4 py-3 text-center font-medium text-neutral-900 shadow-sm ring-1 ring-neutral-200 hover:bg-neutral-50 transition-colors"
              >
                프로필
              </Link>
              <LogoutButton className="flex-1 rounded-lg bg-neutral-900 px-4 py-3 text-center font-medium text-white hover:bg-neutral-800 transition-colors" />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="overflow-hidden rounded-xl bg-white p-8 shadow-sm ring-1 ring-neutral-200">
              <h2 className="text-xl font-semibold mb-2">시작하기</h2>
              <p className="text-neutral-500 mb-6">계정을 만들거나 로그인하여 시작하세요.</p>
              
              <div className="flex flex-col gap-3">
                <Link
                  href="/login"
                  className="w-full rounded-lg bg-neutral-900 px-4 py-3 text-center font-medium text-white hover:bg-neutral-800 transition-colors"
                >
                  로그인
                </Link>
                <Link
                  href="/signup"
                  className="w-full rounded-lg bg-white px-4 py-3 text-center font-medium text-neutral-900 shadow-sm ring-1 ring-neutral-200 hover:bg-neutral-50 transition-colors"
                >
                  회원가입
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
