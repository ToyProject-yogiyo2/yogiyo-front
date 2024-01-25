'use client'
import React from 'react';
import 'lib/styles.css';
import { GoX } from 'react-icons/go';
import InputBox from '../../../components/common/InputBox';

const EmailJoin = () => {
  return (
    <div>
      <div className="flex p-2 border-b border-yogrey2">
        <GoX className="text-[2.5rem]" />
        <div className="relative flex-1">
          <p className="absolute transform-center font-semibold">회원가입</p>
        </div>
        <div className="w-[2.5rem] h-[2.5rem]"></div>
      </div>

      <div className="p-4">
        <InputBox title="이메일 주소" placeholder="이메일 주소 입력" type="text" style="pb-6" />
        <InputBox
          title="비밀번호"
          placeholder="영문,숫자,특수문자 포함 8자리 이상"
          type="password"
          style="pb-6"
        />
        <InputBox title="닉네임" placeholder="닉네임" type="text" style="pb-6" />

        <div className="w-full mt-5 p-3.5 rounded-xl bg-yogrey2">
          <p className="font-semibold w-full text-center text-white">다음</p>
        </div>
      </div>
    </div>
  );
};

export default EmailJoin;
