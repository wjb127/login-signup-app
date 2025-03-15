# Next.js Supabase 인증 시스템

이 프로젝트는 Next.js와 Supabase를 사용하여 구현된 인증 시스템입니다.

## 기능

- 이메일/비밀번호 회원가입 및 로그인
- Google 소셜 로그인
- 사용자 프로필 페이지
- 인증 상태에 따른 접근 제어

## 설치 및 실행

1. 저장소 클론:
   ```bash
   git clone https://github.com/your-username/your-repository-name.git
   cd your-repository-name
   ```

2. 의존성 설치:
   ```bash
   npm install
   ```

3. 환경 변수 설정:
   `.env.example` 파일을 `.env.local`로 복사하고 Supabase 프로젝트의 URL과 anon key를 입력합니다.

4. 개발 서버 실행:
   ```bash
   npm run dev
   ```

5. 브라우저에서 `http://localhost:3000` 접속

## 기술 스택

- Next.js 14
- Supabase (인증 및 데이터베이스)
- TypeScript
- Tailwind CSS