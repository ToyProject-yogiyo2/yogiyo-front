'use client'
import React from 'react';
import 'lib/styles.css';
import { GoX } from 'react-icons/go';
import InputBox from '../../../components/common/InputBox';
import { useRouter } from 'next/navigation';

const EmailLogin = () => {
  const router = useRouter();

  const handleEmailJoin = () => {
    router.push('/login/emailJoin')
  }

  return (
    <div>
      <div className="flex p-2">
        <GoX className="text-[2rem]" />
      </div>
      <div className="p-4">
        <InputBox placeholder="이메일 주소 입력" type="text" style="pb-4" />
        <InputBox placeholder="비밀번호 입력" type="password" />

        <div className="w-full mt-8 p-3.5 rounded-xl bg-yogrey2">
          <p className="font-semibold w-full text-center text-white">로그인</p>
        </div>

        <div className="pt-5 text-center text-sm text-yogrey5">
          <span onClick={handleEmailJoin}>이메일 회원가입</span>
          <span className='p-2'>|</span>
          <span>이메일 찾기</span>
          <span className='p-2'>|</span>
          <span>비밀번호 찾기</span>
        </div>
      </div>
    </div>
  );
};

export default EmailLogin;
