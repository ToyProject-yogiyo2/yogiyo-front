'use client'
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { userInfoAtom } from '@/recoil/state';
import { useRouter } from 'next/navigation';
import Footer from '@/components/common/Footer';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const user = useRecoilValue(userInfoAtom);
  const router = useRouter();

  useEffect(()=>{
    if(!user.isLogin){
      router.push('/login')
    }
  },[])

  return (
    <div>
      {user.isLogin ? 
        <>
          <div>{children}</div>
          <div className="pb-[70px]"></div>
          <Footer />
        </> :
        <></>
      }
    </div>
  );
}

export default RootLayout;
