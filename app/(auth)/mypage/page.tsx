'use client';
import React, {useEffect, useState} from 'react';
import LoggedOut from '@/components/mypage/LoggedOut';
import LoggedIn from '@/components/mypage/LoggedIn';
import { userInfoAtom } from '@/recoil/state';
import { useRecoilValue } from 'recoil';
import Footer from '@/components/common/Footer';
import { getUserInfo } from '@/services/loginAPI';

const Mypage = () => {
  //const accessToken = typeof window !== 'undefined' ? sessionStorage.getItem('accessToken') : null;
  const userInfo = useRecoilValue(userInfoAtom);

  console.log(`=====================================`);
  console.log(`[test] mypage 진입, 현재 userinfo atom : `);
  console.log(userInfo);
  console.log(`=====================================`);
  //문제(240118):
  //로그인 후, 페이지를 오랫동안 방치한 후에 mypage로 접근 시 logout 상태인 것으로 인식하여
  //LoggedOut 컴포넌트를 렌더링, 로그인 폼이 표출되는데 거기서 로그인을 하면 에러 발생
  //페이지를 새로고침하여 다시 로그인 폼으로 접근하면 로그인 정상작동

  return (
    <div className="w-screen relative">
      <div className="w-full">{!userInfo.isLogin ? <LoggedOut /> : <LoggedIn />}</div>
      <div className="pt-5">
        <Menu text="요기요 매거진(베타)"></Menu>
        <MenuLine />
        <MenuTitle text="요기요 혜택 안내"></MenuTitle>
        <Menu text="요기서 1초결제 관리"></Menu>
        <Menu text="요기요 제휴카드"></Menu>
        <Menu text="이벤트 및 공지사항"></Menu>
        <MenuLine />
        <MenuTitle text="고객만족센터"></MenuTitle>
        <Menu text="자주묻는질문"></Menu>
        <Menu text="카카오톡 1:1 문의"></Menu>
        <Menu text="요기요 안내"></Menu>
        <Menu text="서비스 약관"></Menu>
      </div>
      <Footer />
    </div>
  );
};

interface MenuItem {
  text: string;
}

const Menu = (item: MenuItem) => {
  return (
    <div className="w-full h-10 leading-10 pr-5 pl-5">
      <p>{item.text}</p>
    </div>
  );
};

const MenuTitle = (item: MenuItem) => {
  return (
    <div className="w-full h-10 leading-10 pr-5 pl-5 text-slate-500 text-sm">
      <p>{item.text}</p>
    </div>
  );
};

const MenuLine = () => {
  return (
    <div className="w-full h-10 leading-10 pr-5 pl-5">
      <div className="w-full h-1/2 border-b-2"></div>
    </div>
  );
};

export default Mypage;
