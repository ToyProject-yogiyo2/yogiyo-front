'use client';
import PrevPageX from '@/components/common/PrevPageX';
import { getOrderDetail } from '@/services/orderAPI';
import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { userInfoAtom } from '@/recoil/state';

const OrderDetail = () => {
  //const orderStateMap = ['주문확인','조리중','배달중','배달완료'];
  //const order = '' // api 결과로 가져온 데이터
  const user = useRecoilValue(userInfoAtom);
  const token = user.accessToken;
  //const token = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtaW50b2xiQG5hdmVyLmNvbSIsInByb3ZpZGVyVHlwZSI6Ik5BVkVSIiwidXNlclR5cGUiOiJNZW1iZXIiLCJleHAiOjE3MDIzNjY5MjZ9.vgShPvQHmksxsdu-asCCCO8rEARbb6HBwg0rSoIpBPE'

  const queryString = useSearchParams();
  const id = queryString.get('id');

  if (!id || !token) {
    const router = useRouter();
    router.push(`/error?code=002`);
  }

  useEffect(() => {
    console.log(token);
    console.log(id);
    getOrderDetail(token as string, id as string);
  });

  return (
    <>
      <PrevPageX />
      <div className="w-[80px] text-yogrey4 font-semibold">배달완료</div>
    </>
  );
};

export default OrderDetail;
