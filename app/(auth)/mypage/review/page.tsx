'use client';
import React, { useState, useEffect } from 'react';
import TabMenu from '@/components/common/TabMenu';
import ToggleMenu from '@/components/common/ToggleMenu';
import { BsPencil } from 'react-icons/bs';
import CardOrder from '@/components/common/CardOrder';

const tabData1 = {
  left: '배달/포장',
  right: '요마트',
};
const tabData2 = {
  left: '작성 가능한 리뷰',
  right: '작성한 리뷰',
};

const Review = () => {
  const [tab1, setTab1] = useState('left');
  const [tab2, setTab2] = useState('left');

  const handleGetTab1 = (selectedTab: string) => {
    setTab1(selectedTab);
    console.log('tab1 change');
  };

  const handleGetTab2 = (selectedTab: string) => {
    setTab2(selectedTab);
    console.log('tab2 change');
  };
  return (
    <div className="bg-grey1">
     
      <TabMenu
        tabData={tabData1}
        selectedTab={tab1}
        handleGetSelected={handleGetTab1}
      ></TabMenu>
      <div className="p-4 bg-white">
        <ToggleMenu
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
