'use client';
import React, { useState, useEffect } from 'react';
import '/lib/styles.css';
import '/lib/animations.css';
import { Tab } from '@/types/types';

const ToggleMenu = (props: Tab) => {
  const [tabIndex, setTabIndex] = useState('default')

  const handleTabChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedTab = e.target.value;
    props.handleGetSelected(selectedTab);
    setTabIndex(e.target.value);
  };

  const tabAnimation = () => {
    console.log(tabIndex)
    if(tabIndex==='default'){
      return 'absolute bg-white w-1/2 h-full rounded-xl border border-slate-300 top-0'
    }else if(tabIndex==='left'){
      return 'right-to-left absolute bg-white w-1/2 h-full rounded-xl border border-slate-300 top-0'
    }else{
      return 'left-to-right absolute bg-white w-1/2 h-full rounded-xl border border-slate-300 top-0'
    }
  }

  return (
    <div className="w-full h-12 overflow-hidden relative">
      <div className="bg-slate-200 w-full h-full rounded-xl border border-slate-300 flex text-center">
        <input
          type="radio"
          id="toggleLeft"
          value="left"
          style={{ display: 'none' }}
          checked={props.selectedTab === 'left'}
          onChange={handleTabChange}
        />
        <label htmlFor="toggleLeft" className="w-1/2 z-10 h-full relative">
          <p className="absolute transform-center w-full">작성 가능한 리뷰(0)</p>
        </label>
        <input
          type="radio"
          id="toggleRight"
          value="right"
          style={{ display: 'none' }}
          checked={props.selectedTab === 'right'}
          onChange={handleTabChange}
        />
        <label htmlFor="toggleRight" className="w-1/2 z-10 h-full relative">
          <p className="absolute transform-center w-full">작성한 리뷰(0)</p>
        </label>
      </div>
      <div className={tabAnimation()}></div>
    </div>
  );
};

export default ToggleMenu;
