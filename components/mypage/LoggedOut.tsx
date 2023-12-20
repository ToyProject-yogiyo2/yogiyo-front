import React from 'react';
import { useRouter } from 'next/navigation';

const LoggedOut = () => {
  const router = useRouter();
  const handleLinkToLogin = () => {
    router.push('/login');
  };

  return (
    <div className="">
      <div className="w-full h-full text-center p-5">
        <p className="leading-10 font-bold text-xl">요기요에 오신 것을 환영합니다.</p>
        <p className="text-sm text-slate-600">로그인 후 매일 새로운 할인을 만나보세요.</p>
        <p className="text-sm text-slate-600">지금 가입하면 특별 추가 혜택까지!</p>
        <div className="flex justify-center mt-3 pb-5">
          <button
            className="w-1/2 pt-4 pb-4 rounded-xl bg-yopink text-white"
            onClick={handleLinkToLogin}
          >
            로그인/회원가입
          </button>
        </div>
      </div>
      <div className="w-full h-[100px] bg-yogrey">광고</div>
    </div>
  );
};

export default LoggedOut;
