'use client';
import MarketDetailList from '@/components/common/MarketDetailList';
import MenuList from '@/components/home/marketList/MenuList';
import OptionList from '@/components/home/marketList/OptionList';
import { useSearchParams } from 'next/navigation';
import { shopApi } from '@/services/shopApi';
import { useRecoilValue } from 'recoil';
import { currentCoord, currentRegionCode, shopListOption, thisAddressId } from '@/recoil/state';
import { optionConvert } from '@/lib/optionConvert';
import { useState, useEffect, useRef } from 'react';
import type { Shop } from '@/types/types';

const MarketList = () => {
  const searchParams = useSearchParams();
  const menu = searchParams.get('menu');
  const shopListOptionState = useRecoilValue(shopListOption);

  //로그인 유저 주소정보
  const thisAddress = useRecoilValue(thisAddressId);

  //현재위치기준 법정동코드
  const regionCode = useRecoilValue(currentRegionCode)

  //비로그인 포함 gps기준 좌표정보
  const curCoord = useRecoilValue(currentCoord)
  const [shopListData, setShopListData] = useState<Shop[]>([]);

  //무한스크롤 cursor (collumn값)
  const [cursor, setCursor] = useState(1);

  //무한스크롤 subCursor (음식점id)
  const [subCursor, setSubCursor] = useState(0)

  //감시 타겟 ref
  const observerTarget = useRef<HTMLDivElement>(null);

  //무한스크롤 종료 state
  const [limit, setLimit] = useState(false);

  const getShopList = async (cursor: number, subCursor: number) => {
    try {
      // 초기 빈 객체 생성
      const requestInfo: { [key: string]: any } = {};

      // 각 키에 대해 유효성 검사 후 값 추가
      if (menu) requestInfo.category = menu;
      if (menu === '전체') requestInfo.category = '';
      if (shopListOptionState.sortState !== '정렬')
        requestInfo.sortOption = optionConvert(shopListOptionState.sortState) as string;
      if (shopListOptionState.delFilter !== '배달요금')
        requestInfo.deliveryPrice = optionConvert(shopListOptionState.delFilter) as number;
      if (shopListOptionState.orderAmount !== '최소주문금액')
        requestInfo.leastOrderPrice = optionConvert(shopListOptionState.orderAmount) as number;

      //로그인 시 & 비로그인 시 
      requestInfo.longitude = thisAddress?.longitude || curCoord?.lng;
      requestInfo.latitude = thisAddress?.latitude || curCoord?.lat;

      // 테스트용 좌표
      // requestInfo.longitude = 127.021577848223;
      // requestInfo.latitude = 37.560023342132;

      requestInfo.cursor = cursor;
      requestInfo.subCursor = subCursor;
      requestInfo.size = 10;
      requestInfo.code = thisAddress?.code || regionCode

      const response = await shopApi.fetchShopList(requestInfo);
      console.log(requestInfo);

      //다음 데이터가 있을 경우
      if (response.hasNext) {
        setCursor(response.nextCursor);
        setSubCursor(response.nextSubCursor);
      }

      return response;
    } catch (error) {
      console.error('Error fetching shop list:', error);
    }
  };

  const fetchData = async () => {
    try {
      const data = await getShopList(cursor, subCursor);
      console.log(data);
      if (data && data.content) {
        setShopListData((prev) => [...prev, ...data.content]);
        setCursor(data.nextCursor);
        setSubCursor(data.nextSubCursor);

        // 데이터가 더 이상 없을 경우 limit 상태를 true로 설정
        if (!data.hasNext) {
          setLimit(true);
        } else {
          setLimit(false);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 카테고리 변경 혹은 옵션 변경할 경우 상점리스트 및 무한스크롤 세팅 초기화
  useEffect(() => {
    setShopListData([]);
    setCursor(1);
    setSubCursor(0);
    setLimit(false);
  }, [menu, shopListOptionState]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          //타겟이 뷰포트와 교차할 경우 api 호출
          if (entry.isIntersecting) fetchData();
        });
      },
      { threshold: 0.1 },
    ); //타겟이 0.1만큼 뷰포트에 들어올 경우 실행

    //타겟 감시 시작
    if (observerTarget.current) observer.observe(observerTarget.current);

    //불러올 데이터가 더 이상 없을 경우 무한스크롤링 종료
    if (limit) observer.disconnect();

    // 컴포넌트 언마운트 시 또는 limit 상태가 true일 때, Observer 해제
    return () => {
      observer.disconnect();
    };
  }, [menu, cursor, subCursor, shopListData, shopListOptionState, limit]);

  return (
    <div className="w-full">
      <MenuList />
      <OptionList />
      <div className="h-[50px]" />
      <MarketDetailList shopListData={shopListData} />
      <div ref={observerTarget}></div>
    </div>
  );
};

export default MarketList;
