'use client'

import PickMarketDetailList from '@/components/pick/PickMarketDetailList';
import { likeApi } from '@/services/likeApi';
import { useState, useEffect } from 'react';
import Footer from '@/components/common/Footer';

const Pick = () => {
  const [pickList, setPickList] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await likeApi.getLikeList(0, 0);
        console.log(result)
        setPickList(result);
      } catch (error) {
        console.error('컴포넌트 내부 에러', error);
      }
    };
  
    fetchData();
  },[])

  return (
    <div className="flex flex-col w-full bg-slate-200">
      <h2 className="fixed gap-2 top-0 left-0 w-full h-[50px] flex justify-center items-center bg-white z-50 text-[1.25rem] font-bold">
        찜
      </h2>
      <div className="h-[50px]" />
      <div className="px-[20px] pt-[30px] pb-[20px] flex gap-3 items-end">
        <span className="text-[1.2rem] font-bold">찜한 맛집</span>
        <span>{pickList.length}개</span>
      </div>
      <PickMarketDetailList pickList={pickList} />
      <div className="px-[20px] pt-[30px] pb-[20px] flex gap-3 items-end">
        <span className="text-[1.2rem] font-bold">최근 본 맛집</span>
        <span>{0}개</span>
      </div>
      <PickMarketDetailList />
      <div className="h-[70px]" />
      <Footer />
    </div>
  );
};
export default Pick;
