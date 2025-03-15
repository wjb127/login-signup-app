'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import LogoutButton from '@/components/LogoutButton';
import { Profile, ProfileFormData } from '@/types';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>({
    full_name: '',
    website: '',
    bio: '',
  });
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    // 인증 상태가 로드되었고 사용자가 없으면 로그인 페이지로 리디렉션
    if (!authLoading && !user) {
      router.push('/login?message=로그인이 필요합니다.');
      return;
    }

    const getProfileData = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        
        // 프로필 데이터 가져오기
        const { data: profileData, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (error && error.code !== 'PGRST116') {
          console.error('프로필 데이터 가져오기 오류:', error);
        }
        
        if (profileData) {
          setProfile(profileData);
          setFormData({
            full_name: profileData.full_name || '',
            website: profileData.website || '',
            bio: profileData.bio || '',
          });
        }
      } catch (error) {
        console.error('사용자 데이터 가져오기 오류:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      getProfileData();
    }
  }, [user, authLoading, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    try {
      setSaving(true);
      setMessage(null);
      
      const updates = {
        id: user.id,
        full_name: formData.full_name,
        website: formData.website,
        bio: formData.bio,
        updated_at: new Date().toISOString(),
      };
      
      const { error } = await supabase
        .from('profiles')
        .upsert(updates, { onConflict: 'id' });
      
      if (error) {
        throw error;
      }
      
      setMessage({ type: 'success', text: '프로필이 성공적으로 저장되었습니다.' });
    } catch (error: any) {
      console.error('프로필 저장 오류:', error);
      setMessage({ type: 'error', text: '프로필 저장 중 오류가 발생했습니다.' });
    } finally {
      setSaving(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-neutral-800 border-t-transparent"></div>
      </div>
    );
  }

  if (!user) {
    return null; // 미들웨어나 useEffect에서 리디렉션 처리
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900">프로필</h2>
          <p className="mt-2 text-neutral-500">사용자 정보 관리</p>
        </div>
        
        <div className="overflow-hidden rounded-xl bg-white p-8 shadow-sm ring-1 ring-neutral-200 mb-6">
          <div className="flex flex-col items-center mb-6">
            <div className="h-20 w-20 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 text-2xl mb-4">
              {user.email?.charAt(0).toUpperCase()}
            </div>
            <h3 className="text-xl font-semibold">{user.email}</h3>
            <p className="text-neutral-500 text-sm mt-1">가입일: {new Date(user.created_at).toLocaleDateString()}</p>
          </div>
          
          <div className="space-y-4 mb-6">
            <div className="rounded-lg bg-neutral-50 p-4">
              <p className="text-sm font-medium text-neutral-500">사용자 ID</p>
              <p className="mt-1 text-neutral-900 break-all">{user.id}</p>
            </div>
            
            <div className="rounded-lg bg-neutral-50 p-4">
              <p className="text-sm font-medium text-neutral-500">이메일</p>
              <p className="mt-1 text-neutral-900">{user.email}</p>
            </div>
            
            <div className="rounded-lg bg-neutral-50 p-4">
              <p className="text-sm font-medium text-neutral-500">인증 방법</p>
              <p className="mt-1 text-neutral-900">
                {user.app_metadata?.provider || '이메일/비밀번호'}
              </p>
            </div>
          </div>
          
          {message && (
            <div className={`mb-6 rounded-lg p-4 text-sm ${
              message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
            }`}>
              {message.text}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <h4 className="text-lg font-medium text-neutral-900">추가 정보</h4>
            
            <div>
              <label htmlFor="full_name" className="block text-sm font-medium text-neutral-700 mb-1">
                이름
              </label>
              <input
                id="full_name"
                name="full_name"
                type="text"
                className="block w-full rounded-lg border-0 py-3 px-4 text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-200 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-neutral-900"
                placeholder="이름을 입력하세요"
                value={formData.full_name}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <label htmlFor="website" className="block text-sm font-medium text-neutral-700 mb-1">
                웹사이트
              </label>
              <input
                id="website"
                name="website"
                type="url"
                className="block w-full rounded-lg border-0 py-3 px-4 text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-200 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-neutral-900"
                placeholder="https://example.com"
                value={formData.website}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-neutral-700 mb-1">
                자기소개
              </label>
              <textarea
                id="bio"
                name="bio"
                rows={4}
                className="block w-full rounded-lg border-0 py-3 px-4 text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-200 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-neutral-900"
                placeholder="자기소개를 입력하세요"
                value={formData.bio}
                onChange={handleChange}
              />
            </div>
            
            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-lg bg-neutral-900 px-4 py-3 text-center font-medium text-white hover:bg-neutral-800 transition-colors"
            >
              {saving ? '저장 중...' : '프로필 저장'}
            </button>
          </form>
        </div>
        
        <div className="flex gap-4">
          <Link 
            href="/" 
            className="flex-1 rounded-lg bg-white px-4 py-3 text-center font-medium text-neutral-900 shadow-sm ring-1 ring-neutral-200 hover:bg-neutral-50 transition-colors"
          >
            홈으로
          </Link>
          <LogoutButton className="flex-1 rounded-lg bg-neutral-900 px-4 py-3 text-center font-medium text-white hover:bg-neutral-800 transition-colors" />
        </div>
      </div>
    </div>
  );
} 