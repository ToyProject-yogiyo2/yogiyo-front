'use client';
import ListSwiper from './ListSwiper';
import { nanum_Gothic } from '@/lib/font';
import { useRecoilValue } from 'recoil';
import { thisAddressId } from '@/recoil/address';
import { useState, useEffect, useRef } from 'react';
import type { Shop } from '@/types/types';

const NewEateries = () => {
  const thisAddress = useRecoilValue(thisAddressId);
  const [shopListData, setShopListData] = useState<Shop[]>([]);

  return (
    <div className="p-4">
      <h2 className={`text-xl font-black py-4 tracking-wide ${nanum_Gothic.className}`}>
        새로 입점한 맛집
      </h2>
      <ListSwiper
        thisAddress={thisAddress}
        // shopListData={shopListData}
        // setShopListData={setShopListData}
        kind={'newEateries'}
      />
    </div>
  );
};

export default NewEateries;
