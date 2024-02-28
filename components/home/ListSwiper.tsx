'use client';
import { IoIosArrowForward } from 'react-icons/io';
import Link from 'next/link';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import MarketInfoCard from '../common/MaketInfoCard';
import { useState, useEffect, useRef } from 'react';
import type { Shop, RegisterAddressRequest } from '@/types/types';
import { shopApi } from '@/services/shopApi';
import { useRecoilValue } from 'recoil';
import { currentCoord, currentRegionCode } from '@/recoil/address';
import type { RequestInfoType } from '@/types/types';

interface ListSwiperProps {
  thisAddress: RegisterAddressRequest;
  shopListData: Shop[];
  setShopListData: React.Dispatch<React.SetStateAction<Shop[]>>;
}

const slideStyle = {
  flex: '1 1 0',
};

const lastArrowStyle = {
  width: '35px',
  height: '35px',
  border: '1px solid #ccc',
  borderRadius: '50%',
  padding: '5px',
  color: 'red',
};

const ListSwiper = ({ thisAddress, shopListData, setShopListData }: ListSwiperProps) => {
  const [loading, setLoading] = useState(false);

  const regionCode = useRecoilValue(currentRegionCode)
  const curCoord = useRecoilValue(currentCoord)

  //무한스크롤 cursor (collumn값)
  const [cursor, setCursor] = useState(0);

  //무한스크롤 subCursor (음식점id)
  const [subCursor, setSubCursor] = useState(0)

  //감시 타겟 ref
  const observerTarget = useRef<HTMLDivElement>(null);

  //무한스크롤 종료 state
  const [limit, setLimit] = useState(false);

  const getShopList = async (cursor: number, subCursor: number) => {
    try {
      console.log('세팅주소:' + thisAddress?.id)
      console.log('현재좌표:' + regionCode)
      const requestInfo: RequestInfoType = {
        category: '신규맛집',
        sortOption: 'ORDER',
        deliveryPrice: 3000,
        leastOrderPrice: 15000,
        longitude: thisAddress?.longitude || curCoord?.lng,
        latitude: thisAddress?.latitude || curCoord?.lat,
        // longitude: 127.021577848223,
        // latitude: 37.560023342132,
        size: 5,
        code: thisAddress?.code || regionCode
        // code: 1171010200
      };
      if(cursor){
        requestInfo.cursor = cursor
      }

      if(subCursor){
        requestInfo.subCursor = subCursor
      }

      const response = await shopApi.fetchShopList(requestInfo);
      console.log(requestInfo);

      //다음 오프셋이 있을 경우
      if (response?.hasNext) {
        setCursor(response.nextCursor);
        setSubCursor(response.nextSubCursor);
      }

      return response;
    } catch (error) {
      console.error('Error fetching shop list:', error);
    }
  };

  const fetchData = async () => {
    if (loading || limit) return; // 로딩 중이거나 limit 상태일 경우 함수 실행 방지
    setLoading(true);
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
      } else {
        setLimit(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  console.log(regionCode)

  useEffect(() => {
    // if (!regionCode) {
    //   return; 
    // }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          //타겟이 뷰포트와 교차할 경우 api 호출
          if (entry.isIntersecting && !limit && !loading) fetchData();
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
  }, [cursor, subCursor, limit, curCoord, currentRegionCode, loading]);

  return (
    <>
      <Swiper spaceBetween={10} slidesPerView={'auto'}>
        {shopListData?.map((shop, i) => {
          return (
            <SwiperSlide style={slideStyle} key={i}>
              <MarketInfoCard shop={shop} />
            </SwiperSlide>
          );
        })}

        {shopListData && (
          <SwiperSlide>
            <div ref={observerTarget}></div>
          </SwiperSlide>
        )}
        {/* {shopListData?.length > 20 && (
          <SwiperSlide style={slideStyle}>
            <Link
              href={''}
              className="w-[90px] h-[170px] flex justify-center items-center flex-col gap-2 cursor-pointer"
            >
              <IoIosArrowForward style={lastArrowStyle} />
              <span>더보기</span>
            </Link>
          </SwiperSlide>
        )} */}
      </Swiper>
    </>
  );
};

export default ListSwiper;
