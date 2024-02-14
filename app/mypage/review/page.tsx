'use client';
import React, { useState, useEffect } from 'react';
import TabMenu from '@/components/common/TabMenu';
import ToggleMenu from '@/components/mypage/ToggleMenu';
import { BsPencil } from 'react-icons/bs';
import CardOrder from '@/components/common/CardOrder';

const tabData1 = {
  left: { id: 'deliveryAndTogo', name: '배달/포장' },
  right: { id: 'yomart', name: '요마트' },
};
const tabData2 = {
  left: { id: 'writable', name: '작성 가능한 리뷰' },
  right: { id: 'written', name: '작성한 리뷰' },
};

const Review = () => {
  const [tab1, setTab1] = useState('left');
  const [tab2, setTab2] = useState('left');

  const handleGetTab2 = (selectedTab: string) => {
    setTab2(selectedTab);
    //if(isInitialLoad) setIsInitialLoad(false)
    console.log('tab2 change');
  };

  const handleGetTab1 = (selectedTab: string) => {
    setTab1(selectedTab);
    //if(isInitialLoad) setIsInitialLoad(false)
    console.log('tab1 change');
  };

  return (
    <div className="bg-grey1">
      <TabMenu
        //isInitialLoad={isInitialLoad}
        tabData={tabData1}
        selectedTab={tab1}
        handleGetSelected={handleGetTab1}
      ></TabMenu>
      <div className="p-4 bg-white">
        <ToggleMenu
          //isInitialLoad={isInitialLoad}
          tabData={tabData2}
          selectedTab={tab2}
          handleGetSelected={handleGetTab2}
        ></ToggleMenu>
      </div>
      <div className="p-4 flex">
        <p className="mt-1 pr-1">
          <BsPencil />
        </p>
        <p className="font-sm font-semibold">
          포토리뷰 작성시 <span className="text-pink1">100 포인트</span>를 드려요.
        </p>
      </div>
      {tab2 === 'left' ? <CardOrder type={0} /> : <CardOrder type={1} />}
    </div>
  );
};

export default Review;
