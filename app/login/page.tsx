'use client';
import React, { useState } from 'react';
import 'lib/styles.css';
import PrevPageX from '@/components/common/PrevPageX';
import EmailJoin from '@/components/login/emailJoin';
import EmailLogin from '@/components/login/emailLogin';
import { getNaverAuth, getKakaoAuth } from '@/services/loginAPI';

const Login = () => {
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
    }
  };

  return view === 0 ? (
    <div className="w-full h-screen p-2 flex flex-col">
      <PrevPageX />
      <div className="w-full h-[50px] mt-10" style={yogiyoLogo} />
      <p className="pt-3 text-center">로그인하고 다양한 혜택을 받아보세요!</p>
      <div className="w-full p-4 mt-10 rounded-xl bg-kakao" onClick={handleAuth} id="kakao">
        <p className="font-semibold text-center">카카오로 로그인</p>
      </div>
      <div className="w-full p-4 mt-3 rounded-xl bg-naver" onClick={handleAuth} id="naver">
        <p className="font-semibold text-white text-center">네이버로 로그인</p>
      </div>
      <div className="w-full p-4 mt-3 rounded-xl bg-slate-200">
        <p className="font-semibold text-center">이메일로 로그인</p>
      </div>
      <div className="w-full p-4 rounded-xl border border-slate-300 mt-auto">
        <p className="font-semibold text-center">이메일로 회원가입</p>
      </div>
    </div>
  ) : view === 1 ? (
    <EmailJoin />
  ) : (
    <EmailLogin />
  );
};

export default Login;
