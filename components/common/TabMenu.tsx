'use client';
import React, { useState, useEffect } from 'react';
import '/lib/animations.css';
import { Tab } from '@/types/types';

const TabMenu = (props: Tab) => {
  const [tabIndex, setTabIndex] = useState('default')

  useEffect(() => {
    console.log(`selectedTab: ${props.selectedTab}`);
  }, [props]);

  const handleTabChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedTab = e.target.value;
    props.handleGetSelected(selectedTab);
    setTabIndex(e.target.value);
  };

  const tabAnimation = () => {
    if(tabIndex==='default'){
      return 'bg-black h-[3px] w-1/2'
    }else if(tabIndex==='left'){
      return 'underline-animation-to-left bg-black h-[3px] w-1/2'
    }else{
      return 'underline-animation-to-right bg-black h-[3px] w-1/2'
    }
  }

  return (
    <div className="bg-grey1">
      <div className="flex bg-white pl-4 pr-4">
        <div className="w-[50%]">
          <input
            type="radio"
            id='left'
            value="left"
            style={{ display: 'none' }}
            checked={props.selectedTab === 'left'}
            onChange={handleTabChange}
          />
          <label htmlFor='left'>
            <p className={`text-center p-3 ${props.selectedTab === 'left' ? 'font-bold' : ''}`}>
              {props.tabData.left}
            </p>
          </label>
        </div>
        <div className="w-[50%]">
          <input
            type="radio"
            id='right'
            value="right"
            style={{ display: 'none' }}
            checked={props.selectedTab === 'right'}
            onChange={handleTabChange}
          />
          <label htmlFor="right">
            <p className={`text-center p-3 ${props.selectedTab === 'right' ? 'font-bold' : ''}`}>
              {props.tabData.right}
            </p>
          </label>
        </div>
      </div>
      <div className="pl-4 pr-4 border-b-2 border-slate-200">
        <div className={tabAnimation()}></div>
      </div>
    </div>
  );
};

export default TabMenu;
