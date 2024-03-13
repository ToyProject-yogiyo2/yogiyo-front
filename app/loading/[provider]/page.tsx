'use client';
import { use, useEffect, useState } from 'react';
import { DynamicRoute } from '@/types/types';
import { useSearchParams, useRouter } from 'next/navigation';
import { getCookie } from '@/services/loginAPI';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userInfoAtom } from '@/recoil/state';

const Loading = ({ params }: DynamicRoute) => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  const router = useRouter();

  const queryString = useSearchParams();
  const code = queryString.get('code');
  const state = queryString.get('state');
  const providerType = params.provider;

  useEffect(() => {
    const reqAuth = {
      email: null,
      password: null,
      authCode: code as string,
      providerType: providerType.toUpperCase(),
    };
    const asyncfunction = async () => {
      try{
        const resLogin = await getCookie(reqAuth);
        if(resLogin){
          console.log("!!userInfo from login api(getCookie)")
          console.log(resLogin);
          setUserInfo(resLogin);
          router.push('/home');
        }else{
          throw new Error('200');
        }
      }catch{

      };
    }
    const res = asyncfunction();
  },[])

  return (
    <div className="w-screen h-screen bg-pink1">
      <div>{`${params.provider} auth loading...`}</div>
    </div>
  );
};

export default Loading;
