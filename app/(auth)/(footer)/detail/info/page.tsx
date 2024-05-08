'use client';
import { HiOutlineSpeakerphone } from "react-icons/hi";
import DetailHeader from "@/components/detail/DetailHeader";
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import type { ShopInfoType, ShopNotice} from '@/types/types';
import { useRouter } from 'next/navigation';
import { userInfoAtom } from '@/recoil/state';
import { useRecoilValue, useRecoilState } from 'recoil';
import MiddleTitle from '@/components/detail/MiddleTitle';
import DetailTabMenu from '@/components/detail/DetailTabMenu';
import { currentCoord, currentRegionCode, thisAddressId } from '@/recoil/address';
import { foodModalState } from '@/recoil/modal';
import { shopApi } from '@/services/shopApi';
import ScrollToTop from '@/components/common/ScrollToTop';
import FoodDetail from '@/components/detail/foodDetail/FoodDetail';
import { orderAtom } from '@/recoil/order';

const DetailInfo = () => {
  const searchParams = useSearchParams();
  const shopId = searchParams.get('id');
  const [shopInfo, setShopInfo] = useState<ShopInfoType>()
  const [shopNotice, setShopNotice] = useState<ShopNotice>()
  const router = useRouter()

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
          setShopInfo(result);
          const noticeResult = await shopApi.getShopNotice(Number(shopId));
          setShopNotice(noticeResult);
        }
      } catch (error) {
        console.error('컴포넌트 내부 에러', error);
      }
    };
  
    fetchData();
  }, [shopId])

  return (
    <>
      <DetailHeader shopInfo={shopInfo} isScrolled={true} />  
      <div className="h-[10px] bg-slate-100 mt-[55px]" />
      <div className="p-[20px] pt-[30px]">
        <p className="
          flex gap-[5px] items-center text-[1.2rem] font-bold mb-[10px]
        ">
          <HiOutlineSpeakerphone style={{fontSize: '1.5rem'}}/>
          {shopNotice?.title}
        </p>
        <div className="w-full h-[1px] bg-slate-400 mb-[30px]" />

        <div className="grid grid-cols-2 gap-4 mb-[20px]">
          {shopNotice?.images?.map((url, i) => (
            <div key={i} className="aspect-w-1 aspect-h-1">
              <img src={url} alt={`Image ${i}`} className="object-cover w-full h-full" />
            </div>
          ))}
        </div>
        
        <p className="">
          {shopNotice?.notice}
        </p>
      </div>
    </>
  )
};

export default DetailInfo;