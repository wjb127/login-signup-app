'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import LogoutButton from '@/components/LogoutButton';

export default function Profile() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>로딩 중...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">프로필</h2>
        </div>
        
        <div className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">이메일</p>
              <p className="text-lg font-medium">{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">사용자 ID</p>
              <p className="text-lg font-medium">{user.id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">마지막 로그인</p>
              <p className="text-lg font-medium">
                {new Date(user.last_sign_in_at || '').toLocaleString('ko-KR')}
              </p>
            </div>
          </div>

          <div className="flex justify-between">
            <LogoutButton />
            <button
              onClick={() => router.push('/')}
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            >
              홈으로
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 