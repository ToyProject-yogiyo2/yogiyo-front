'use client'
import React from 'react';
import 'lib/styles.css';
import { GoX } from 'react-icons/go';
import InputBox from '../../../components/common/InputBox';
import { useState } from 'react';
import { emailJoin } from '@/services/loginAPI';

const EmailJoin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nickname, setNickname] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.id=='email'){
      setEmail(e.target.value);
    }else if(e.target.id=='password'){
      setPassword(e.target.value);
    }else if(e.target.id=='nickname'){
      setNickname(e.target.value);
    }
  }

  const handleEmailJoin = () => {
    emailJoin(email, password, nickname)
    console.log(`${email}, ${password}, ${nickname}`)
  }

  return (
    <div>
      <div className="flex p-2 border-b border-grey2">
        <GoX className="text-[2.5rem]" />
        <div className="relative flex-1">
          <p className="absolute transform-center font-semibold">회원가입</p>
        </div>
        <div className="w-[2.5rem] h-[2.5rem]"></div>
      </div>

      <div className="p-4">
        <InputBox 
          id="email"
          title="이메일 주소" 
          placeholder="이메일 주소 입력" 
          type="text" 
          style="pb-6" 
          value={email}
          onChange={handleChange}  
        />
        <InputBox
          id="password"
          title="비밀번호"
          placeholder="영문,숫자,특수문자 포함 8자리 이상"
          type="password"
          style="pb-6"
          value={password}
          onChange={handleChange}
        />
        <InputBox 
          id="nickname"
          title="닉네임" 
          placeholder="닉네임" 
          type="text" 
          style="pb-6" 
          value={nickname} 
          onChange={handleChange}
        />
        <div className="w-full mt-5 p-3.5 rounded-xl bg-grey2">
          <p className="font-semibold w-full text-center text-white" onClick={handleEmailJoin}>다음</p>
        </div>
      </div>
    </div>
  );
};

export default EmailJoin;
