'use client';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getCookie } from '@/services/loginAPI';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userInfoAtom } from '@/recoil/state';

interface Props {
  params: {
    provider: string
  }
}

const Loading = ({ params }: Props) => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  const router = useRouter();

  const queryString = useSearchParams();
  const code = queryString.get('code');
  //const state = queryString.get('state');

  useEffect(() => {
    asyncfunction();
  },[])

  const reqAuth = {
    email: null,
    password: null,
    authCode: code as string,
    providerType: params.provider.toUpperCase(),
  };

  const asyncfunction = async () => {
    try{
      const resLogin = await getCookie(reqAuth);
      if(resLogin){
        setUserInfo({...userInfo, userId: resLogin.userId, isLogin: true});
        router.push('/');
      }else{
        throw new Error('200');
      }
    }catch{
      console.error('error')
    };
  }

  return (
    <div className="w-screen h-screen bg-pink1">
      <div>{`${params.provider} auth loading...`}</div>
    </div>
  );
};

export default Loading;
