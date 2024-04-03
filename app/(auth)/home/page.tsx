'use client'
import GridIconMenu from '@/components/home/GridIconMenu';
import MyOrderedEateries from '@/components/home/MyOrderedEateries';
import NewEateries from '@/components/home/NewEateries';
import SearchBarLink from '@/components/home/SearchBarLink';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userInfoAtom } from '@/recoil/state';
import { getUserInfo } from '@/services/loginAPI';
import { useEffect } from 'react';
import { currentCoord, currentRegionCode, thisAddressId } from '@/recoil/address';

const HomePage = () => {
  const [user, setUser] = useRecoilState(userInfoAtom);
  const regiCode = useRecoilValue(currentRegionCode);
  const coord = useRecoilValue(currentCoord);
  const addressid = useRecoilValue(thisAddressId);
  
  const handleGetUserInfo = async () => {
    try{
      const res = await getUserInfo();
      const loginUser = {
        email: res.email,
        nickname: res.nickname,
        isLogin: true,
        phone: '',
      }
      console.log(loginUser)
      setUser({...user, ...loginUser});
      console.log(user)
    }catch(e){
      console.error(e)
    }
  } 

  useEffect(()=>{
    console.log("====home====")
    console.log(user)
    console.log(regiCode)
    console.log(coord)
    console.log(addressid)
    console.log("============")
    handleGetUserInfo();
  },[])
  
  return (
    <div className="flex flex-col w-full">
      <SearchBarLink />
      <GridIconMenu />
      <div className="p-1.5 bg-slate-100" />
      <MyOrderedEateries />
      <div className="p-1.5 bg-slate-100" />
      <NewEateries />
    </div>
  );
};

export default HomePage;
