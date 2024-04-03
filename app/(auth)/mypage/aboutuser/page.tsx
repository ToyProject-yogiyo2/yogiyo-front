'use client';
import React from 'react';
import Link from 'next/link';

import { useRecoilState } from 'recoil';
import { userInfoAtom } from '@/recoil/state';
import { useRouter } from 'next/navigation';

import { logout } from '@/services/loginAPI';

const AboutUser = () => {
  const router = useRouter();
  const [user, setUser] = useRecoilState(userInfoAtom);

  const kakaoIcon = {
    backgroundImage: `url(/img/kakaoLogoEdge.svg)`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  };

  const doLogout = async () => {
    const res = await logout(user.userId);
    if(res.status >= 200 && res.status < 300){
      const defaultUser = {
        userId: 999999,
        nickname: 'unknown',
        email: 'unknown',
        phone: '01000000000',
        isLogin: false,
      }
      setUser(defaultUser);
      router.push('/')
    }else{
      console.log(`${user.nickname}(${user.userId}) 로그아웃 실패`);
    }
  }

  return (
    <div className="">
      <div className="flex pl-5 pr-5 pt-3 pb-3 border-b">
        <div className="h-auto w-5/6">
          <p className="text-sm text-slate-400">이메일 아이디</p>
          <p className="pt-1 text-slate-700 font-semibold">{user.email}</p>
        </div>
        <div className="w-1/6 flex relative">
          <div className="absolute top-1/2 transform -translate-y-1/2 right-0 w-7 h-7">
            <i className="w-full h-full block rounded-[50%]" style={kakaoIcon} />
          </div>
        </div>
      </div>

      <div className="flex pl-5 pr-5 pt-3 pb-3 border-b">
        <div className="h-auto w-5/6">
          <p className="text-sm text-slate-400">비밀번호</p>
          <p className="pt-1 text-slate-700 font-semibold">SNS 계정에서 변경하실 수 있습니다.</p>
        </div>
        <div className="w-1/6 flex relative">
          <div className="absolute top-1/2 transform -translate-y-1/2 right-0 "></div>
        </div>
      </div>

      <div className="flex pl-5 pr-5 pt-3 pb-3 border-b">
        <div className="h-auto w-5/6">
          <p className="text-sm text-slate-400">휴대 전화 번호 (2023.04.27 인증됨)</p>
          <p className="pt-1 text-slate-700 font-semibold">{user.phone}</p>
        </div>
        <div className="w-1/6 flex relative">
          <div className="absolute top-1/2 transform -translate-y-1/2 right-0 ">
            <Link href="/mypage">
              <p className="pt-1 pb-1 pl-3 pr-3 border border-slate-300 text-sm">변경</p>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex pl-5 pr-5 pt-3 pb-3 border-b">
        <div className="h-auto w-5/6">
          <p className="text-sm text-slate-400">닉네임</p>
          <p className="pt-1 text-slate-700 font-semibold">{user.nickname}</p>
        </div>
        <div className="w-1/6 flex relative">
          <div className="absolute top-1/2 transform -translate-y-1/2 right-0 ">
            <Link href="/mypage">
              <p className="pt-1 pb-1 pl-3 pr-3 border border-slate-300 text-sm">변경</p>
            </Link>
          </div>
        </div>
      </div>
      <div className="p-4 flex justify-end text-grey4">
        <span onClick={doLogout}>로그아웃</span>
        <span className="pr-2 pl-2 text-sm">|</span>
        <span>회원탈퇴</span>
      </div>
    </div>
  );
};

export default AboutUser;
