'use client';
import React, { useState, useEffect } from 'react';
import '/lib/styles.css';
import '/lib/animations.css';
import { Tab } from '@/types/types';

const ToggleMenu = (props: Tab) => {
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const handleTabChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedTab = e.target.value;
    props.handleGetSelected(selectedTab);
    setIsInitialLoad(false);
  };

  //상태 잘 변하는지 테스트용
  useEffect(() => {
    console.log('tab2 change!');
  }, [props]);

  const tabAnimation = props.isInitialLoad
    ? 'left-0'
    : props.selectedTab === 'left'
    ? 'right-to-left'
    : 'left-to-right';

  return (
    <div className="w-full h-12 overflow-hidden relative">
      <div className="bg-slate-200 w-full h-full rounded-xl border border-slate-300 flex text-center">
        <input
          type="radio"
          id={props.tabData.left.id}
          value="left"
          style={{ display: 'none' }}
          checked={props.selectedTab === 'left'}
          onChange={handleTabChange}
        />
        <label htmlFor="writable" className="w-1/2 z-10 h-full relative">
          <p className="absolute transform-center w-full">작성 가능한 리뷰(0)</p>
        </label>
        <input
          type="radio"
          id={props.tabData.right.id}
          value="right"
          style={{ display: 'none' }}
          checked={props.selectedTab === 'right'}
          onChange={handleTabChange}
        />
        <label htmlFor="written" className="w-1/2 z-10 h-full relative">
          <p className="absolute transform-center w-full">작성한 리뷰(0)</p>
        </label>
      </div>
      <div
        className={`absolute bg-white w-1/2 h-full rounded-xl border border-slate-300 top-0
      ${tabAnimation}`}
      ></div>
    </div>
  );
};

export default ToggleMenu;
