'use client';
import { IoIosArrowForward } from 'react-icons/io';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import MarketInfoCard from '../common/MaketInfoCard';
import { useState, useEffect } from 'react';
import type { Shop, RegisterAddressRequest } from '@/types/types';
import { shopApi } from '@/services/shopApi';
import { useRecoilValue } from 'recoil';
import { currentCoord, currentRegionCode } from '@/recoil/address';
import type { RequestInfoType, OrderHistoriesType } from '@/types/types';
import { getOrderList } from '@/services/orderAPI';

interface ListSwiperProps {
  thisAddress: RegisterAddressRequest;
  kind: string;
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

const ListSwiper = ({ thisAddress, kind }: ListSwiperProps) => {
  const [loading, setLoading] = useState(false);

  const regionCode = useRecoilValue(currentRegionCode)
  const curCoord = useRecoilValue(currentCoord)

  const [shopListData, setShopListData] = useState<Shop[]>([]);

  const [orderListData, setOrderListData] = useState<any[]>()

  //무한스크롤 cursor (collumn값)
  // const [cursor, setCursor] = useState(0);

  //무한스크롤 subCursor (음식점id)
  // const [subCursor, setSubCursor] = useState(0)

  //무한스크롤 종료 state
  const [limit, setLimit] = useState(false);

  const getOrderShopList = async () => {
    const response = await getOrderList(0);
    if (response?.orderHistories) {
      let idList: Array<{ shopId: number; shopName: string; shopImg: string }> = response.orderHistories.map((order: OrderHistoriesType) => ({
        shopId: order.shopId,
        shopName: order.shopName,
        shopImg: order.shopImg,
      }));
  
      // shopId를 기준으로 중복 제거
      const uniqueIdList = idList.reduce((acc: Array<{ shopId: number; shopName: string; shopImg: string }>, current) => {
        const x = acc.find(item => item.shopId === current.shopId);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);
  
      setOrderListData(uniqueIdList);
    }
  };

  const getShopList = async () => {
    try {
      // console.log('세팅주소:' + thisAddress?.id)
      // console.log('현재좌표:' + regionCode)
      const requestInfo: RequestInfoType = {
        category: '신규맛집',
        sortOption: 'ORDER',
        deliveryPrice: 3000,
        leastOrderPrice: 15000,
        longitude: thisAddress?.longitude || curCoord?.lng,
        latitude: thisAddress?.latitude || curCoord?.lat,
        size: 5,
        code: thisAddress?.code || regionCode
      };
      // if(cursor){
      //   requestInfo.cursor = cursor
      // }

      // if(subCursor){
      //   requestInfo.subCursor = subCursor
      // }

      const response = await shopApi.fetchShopList(requestInfo);

      // //다음 오프셋이 있을 경우
      // if (response?.hasNext) {
      //   setCursor(response.nextCursor);
      //   setSubCursor(response.nextSubCursor);
      // }

      return response;
    } catch (error) {
      console.error('Error fetching shop list:', error);
    }
  };

  const fetchData = async () => {
    if (loading || limit) return; // 로딩 중이거나 limit 상태일 경우 함수 실행 방지
    setLoading(true);
    try {                       
      const data = await (kind === 'myOrder' ? getOrderShopList : getShopList)();
      if (data && data.content) {
        setShopListData((prev) => [...prev, ...data.content]);
        // setCursor(data.nextCursor);
        // setSubCursor(data.nextSubCursor);

        // 데이터가 더 이상 없을 경우 limit 상태를 true로 설정
        // if (!data.hasNext) {
        //   setLimit(true);
        // } else {
        //   setLimit(false);
        // }
      // } else {
        // setLimit(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // 초기 데이터 로드 또는 thisAddress 변경 시 데이터 재로드
    setShopListData([]);
    // setCursor(0);
    // setSubCursor(0);
    fetchData(); // 이 함수 내부에서 getShopList 호출 포함
  }, [thisAddress]); 

  return (
    <>
      <Swiper 
        spaceBetween={10} 
        slidesPerView={'auto'}
        loop={false}
        slidesPerGroup={1}
      >
        {(kind === 'myOrder' ? orderListData : shopListData)?.map((shop, i) => {
          return (
            <SwiperSlide style={slideStyle} key={i}>
              <MarketInfoCard shop={shop} />
            </SwiperSlide>
          );
        })}

        {kind === 'newEateries' && <SwiperSlide style={slideStyle}>
          <Link
            href={{
              pathname: '/home/marketList',
              query: {menu: '신규맛집'}
            }}
            className="w-[90px] h-[170px] flex justify-center items-center flex-col gap-2 cursor-pointer"
          >
            <IoIosArrowForward style={lastArrowStyle} />
            <span>더보기</span>
          </Link>
        </SwiperSlide>}
      </Swiper>
    </>
  );
};

export default ListSwiper;

