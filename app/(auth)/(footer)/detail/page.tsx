'use client'
import DetailHeader from '@/components/detail/DetailHeader';
import MiddleTitle from '@/components/detail/MiddleTitle';
import DetailTabMenu from '@/components/detail/DetailTabMenu';
import { useSearchParams } from 'next/navigation';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import { currentCoord, currentRegionCode, thisAddressId } from '@/recoil/address';
import { foodModalState } from '@/recoil/modal';
import { userInfoAtom } from '@/recoil/state';
import { useState, useEffect } from 'react';
import { shopApi } from '@/services/shopApi';
import type { ShopInfoType } from '@/types/types';
import ScrollToTop from '@/components/common/ScrollToTop';
import FoodDetail from '@/components/detail/foodDetail/FoodDetail';
import { orderAtom } from '@/recoil/order';
import { useRouter } from 'next/navigation';
import { recentlyViewedShopsState } from '@/recoil/state';

const Detail = () => {
  const searchParams = useSearchParams();
  const shopId = searchParams.get('id');
  const [shopInfo, setShopInfo] = useState<ShopInfoType>()
  const router = useRouter()
  
  // 모달 state
  const isModal = useRecoilValue(foodModalState);
  // 로그인 유무
  const userInfo = useRecoilValue(userInfoAtom);
  // 현재위치 법정동 코드
  const curRegionCode = useRecoilValue(currentRegionCode);
  // 로그인 시 세팅된 주소
  const thisAddId = useRecoilValue(thisAddressId);
  // 현재 접속된 좌표값
  const curCoord = useRecoilValue(currentCoord);

  //열린 메뉴
  const [thisMenu, setThisMenu] = useState(0);

  const handleThisMenu = (param: number) => {
    setThisMenu(param)
  }

  // 스크롤이벤트 처리
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    const position = window.scrollY;
    setIsScrolled(position > 200);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 주문 
  const [order, setOrder] = useRecoilState(orderAtom);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if(shopId){
          const param = {
            shopId: shopId,
            code: 0,
            latitude: 0,
            longitude: 0
          }
          // 로그인했을 경우                            
          if(userInfo.isLogin){
            param.code = thisAddId.code || (curRegionCode || 0)
            param.latitude = thisAddId.latitude
            param.longitude = thisAddId.longitude
          // 비로그인일 경우
          }else{
            param.code = curRegionCode || 0
            param.latitude = curCoord?.lat || 0
            param.longitude = curCoord?.lng || 0
          }
          const result = await shopApi.getShopInfo(param);
          setShopInfo(result)
        }
      } catch (error) {
        console.error('컴포넌트 내부 에러', error);
      }
    };
  
    fetchData();
  }, [shopId])

  const bannerStyle = {
    backgroundImage: `url(${shopInfo?.banner || '/images/banner.jpg'})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center'
  }

  const submitOrder = () => {
    setOrder({
      ...order,
      address: thisAddId.address,
    })
  }

  const setRecentlyViewedShops = useSetRecoilState(recentlyViewedShopsState);

  useEffect(() => {
    if (shopId) {
      // 로컬 스토리지에서 기존 최근 본 맛집 리스트 가져오기
      const existingShops = JSON.parse(localStorage.getItem('recentlyViewedShops') || '[]');

      // 현재 shopId가 이미 리스트에 있는지 확인
      if (!existingShops.includes(shopId)) {
        // 리스트 앞부분에 현재 shopId 추가
        const updatedShops = [shopId, ...existingShops.slice(0, 9)];

        // 로컬 스토리지에 업데이트된 리스트 저장
        localStorage.setItem('recentlyViewedShops', JSON.stringify(updatedShops));

        // Recoil 상태 업데이트
        setRecentlyViewedShops(updatedShops);
      }
    }
  }, [shopId]);

  return (
    <div className="">
      <DetailHeader shopInfo={shopInfo} isScrolled={isScrolled} />
      <div className={`w-full h-[200px]`} style={bannerStyle}/>
      <MiddleTitle shopInfo={shopInfo} />
      <div className='border-y-[4px] border-grey9' />
      <DetailTabMenu shopInfo={shopInfo} handleThisMenu={handleThisMenu}/>
      <ScrollToTop bottom={
        order.orderItems.length >= 1 ? 100 : 40
      }/>
      {/* 음식 상세페이지 모달 */}
      {isModal && <FoodDetail shop={shopInfo} thisMenu={thisMenu}/>}

      {/* 주문하기 component */}
      {(order.orderItems.length >= 1 && !isModal && shopInfo?.id === order.shopId) && 
      <div 
        className='fixed z-50 bottom-0 left-0 w-full h-[80px] flex justify-center items-center bg-white border-t rounded-t-xl'
        onClick={() => {
          router.push('/order')
          submitOrder()
        }}
      >
        <p className='w-full flex justify-center gap-[5px] py-[10px] mx-[10px] rounded-xl bg-pink1 font-bold text-white'>
          {(order.totalPrice).toLocaleString()}원 배달 주문하기
          <div className='w-[20px] h-[20px] flex justify-center items-center rounded-full bg-white'><span className='text-[0.8rem] text-pink1'>{order.orderItems.length}</span></div>
        </p>
      </div>}
    </div>
  );
};

export default Detail;