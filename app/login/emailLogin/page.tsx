'use client'
import React from 'react';
import 'lib/styles.css';
import { GoX } from 'react-icons/go';
import InputBox from '../../../components/common/InputBox';
import { useRouter } from 'next/navigation';
import PrevPageX from '@/components/common/PrevPageX';
import { emailLogin } from '@/services/loginAPI';
import { useState } from 'react';

const EmailLogin = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [usetData, setUserData] = useState()

  const handleEmailJoin = () => {
    router.push('/login/emailJoin')
  }
  const handleEmailLogin = () => {
    const emailLoginRes = emailLogin(email, password);
    console.log(emailLoginRes)
  }

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.id=="email"){
      setEmail(e.target.value);
    }else if(e.target.id=="password"){
      setPassword(e.target.value);
    }
  }

  return (
    <div>
      <div className="flex p-2">
        <PrevPageX />
      </div>
      <div className="p-4">
        <InputBox id="email" placeholder="이메일 주소 입력" type="text" style="pb-4" value={email} onChange={handleChange}/>
        <InputBox id="password" placeholder="비밀번호 입력" type="password" value={password} onChange={handleChange}/>

        <div className="w-full mt-8 p-3.5 rounded-xl bg-yogrey2">
          <p className="font-semibold w-full text-center text-white" onClick={handleEmailLogin}>로그인</p>
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
