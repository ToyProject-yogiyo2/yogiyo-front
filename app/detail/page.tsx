'use client'
import DetailHeader from '@/components/detail/DetailHeader';
import HeadSlider from '@/components/detail/MenuSlider';
import MiddleTitle from '@/components/detail/MiddleTitle';
import SignatureMenuTab from '@/components/detail/SignatureMenuTab';
import DetailMenuList from '@/components/detail/DetailMenuList';
import DetailTabMenu from '@/components/detail/DetailTabMenu';
import { useSearchParams } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { currentCoord, currentRegionCode, thisAddressId, userInfoAtom } from '@/recoil/state';
import { useState, useEffect } from 'react';
import { shopApi } from '@/services/shopApi';
import type { ShopInfoType } from '@/types/types';

const Detail = () => {
  const searchParams = useSearchParams();
  const shopId = searchParams.get('id');
  const [shopInfo, setShopInfo] = useState<ShopInfoType>()

  // 로그인 유무
  const userInfo = useRecoilValue(userInfoAtom);
  // 현재위치 법정동 코드
  const curRegionCode = useRecoilValue(currentRegionCode);
  // 로그인 시 세팅된 주소
  const thisAddId = useRecoilValue(thisAddressId);
  // 현재 접속된 좌표값
  const curCoord = useRecoilValue(currentCoord);

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
            console.log(userInfo)
            param.code = thisAddId.code
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
  }, [])

  const bannerStyle = {
    backgroundImage: `url(${shopInfo?.banner})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center'
  }

  return (
    <div className="">
      <DetailHeader shopInfo={shopInfo} />
      {/* <HeadSlider /> */}
      <div className={`w-full h-[200px]`} style={bannerStyle}/>
      <MiddleTitle shopInfo={shopInfo} />
      <div className='border-y-[4px] border-grey1' />
      <DetailTabMenu shopInfo={shopInfo} />
      <SignatureMenuTab />
      <DetailMenuList />
    </div>
  );
};

export default Detail;
