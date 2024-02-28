'use client';
import React, { useState } from 'react';
import 'lib/styles.css';
import EmailLogin from '@/app/login/emailLogin/page';
import { getNaverAuth, getKakaoAuth } from '@/services/loginAPI';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const router = useRouter();
  const [view, setView] = useState(0);

  const yogiyoLogo = {
    backgroundImage: `url(/img/yogiyo_new_logo.svg)`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  };

  const handleAuth = (e: React.MouseEvent<HTMLDivElement>) => {
    const provider = e.currentTarget.id;

    const reqAuth = {
      naver: {
        code: 'code',
        client_id: '0o_XScx3lU6SBOFvKmsc',
        redirect_uri: process.env.NEXT_PUBLIC_NAVER_LOGIN_REDIRECT_URI as string,
        state: 'abc',
      },
      kakao: {
        code: 'code',
        client_id: '3ee478d16825909aed28e31c171446ba',
        redirect_uri: process.env.NEXT_PUBLIC_KAKAO_LOGIN_REDIRECT_URI as string,
      },
    };

    if (provider === 'naver') {
      getNaverAuth(reqAuth.naver);
      console.log('--getnaverauth--');
    } else if (provider === 'kakao') {
      getKakaoAuth(reqAuth.kakao);
      console.log('--getkakaoauth--');
    }
  };

  const handleEmailJoin = () => {
    router.push('/login/emailJoin');
    console.log("goto emailJoin")
  }
  const handleEmailLogin = () => {
    router.push('/login/emailLogin');
    console.log("goto emailLogin")
  }

  return(
    <div className="w-full h-screen pt-[100px] pb-[20px] px-6 flex flex-col gap-[10px]">
      <div className="w-full h-[50px]" style={yogiyoLogo} />
      <p className="pt-3 text-center">로그인하고 다양한 혜택을 받아보세요!</p>
      <div className="w-full p-4 rounded-xl bg-kakao" onClick={handleAuth} id="kakao">
        <p className="font-semibold text-center">카카오로 로그인</p>
      </div>
      <div className="w-full p-4 rounded-xl bg-naver" onClick={handleAuth} id="naver">
        <p className="font-semibold text-white text-center">네이버로 로그인</p>
      </div>
      <div className="w-full p-4 rounded-xl bg-slate-200" onClick={handleEmailLogin}>
        <p className="font-semibold text-center">이메일로 로그인</p>
      </div>
      <div className="w-full p-4 rounded-xl border border-slate-300 mt-auto" onClick={handleEmailJoin}>
        <p className="font-semibold text-center">이메일로 회원가입</p>
      </div>
    </div>
  )
};

export default LoginPage;