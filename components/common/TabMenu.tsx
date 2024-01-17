'use client';
import React, { useState, useEffect } from 'react';
import '/lib/animations.css';
import { Tab } from '@/types/types';

const TabMenu = (props: Tab) => {
  //const [initialLoad, setInitialLoad] = useState(true);
  //const [selectedTab, setSelectedTab] = useState(tabs[0].id);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    //console.log();
    console.log(`selectedTab: ${props.selectedTab}`);
    console.log(`isInitialLoad: ${props.isInitialLoad}`);
  }, [props]);

  const handleTabChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedTab = e.target.value;
    props.handleGetSelected(selectedTab);
    setIsInitialLoad(false);
  };

  const tabAnimation = props.isInitialLoad
    ? 'ml-0'
    : props.selectedTab === 'left'
    ? 'underline-animation-to-left'
    : 'underline-animation-to-right';

  return (
    <div className="bg-yogrey">
      <div className="flex bg-white pl-4 pr-4">
        <div className="w-[50%]">
          <input
            type="radio"
            id={props.tabData.left.id}
            value="left"
            style={{ display: 'none' }}
            checked={props.selectedTab === 'left'}
            onChange={handleTabChange}
          />
          <label htmlFor={props.tabData.left.id}>
            <p className={`text-center p-3 ${props.selectedTab === 'left' ? 'font-bold' : ''}`}>
              {props.tabData.left.name}
            </p>
          </label>
        </div>
        <div className="w-[50%]">
          <input
            type="radio"
            id={props.tabData.right.id}
            value="right"
            style={{ display: 'none' }}
            checked={props.selectedTab === 'right'}
            onChange={handleTabChange}
          />
          <label htmlFor="yomart">
            <p className={`text-center p-3 ${props.selectedTab === 'right' ? 'font-bold' : ''}`}>
              {props.tabData.right.name}
            </p>
          </label>
        </div>
      </div>
      <div className="pl-4 pr-4 border-b-2 border-slate-200">
        <div className={`${tabAnimation} bg-black h-[3px] w-1/2`}></div>
      </div>
    </div>
  );
};

export default TabMenu;
