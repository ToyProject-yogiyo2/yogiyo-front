'use client';
import { AiFillStar, AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { likeApi } from '@/services/likeApi';
import { shopApi } from '@/services/shopApi';
import { useRecoilValue, useRecoilState } from 'recoil';
import { currentCoord, currentRegionCode, thisAddressId } from '@/recoil/address';
import { userInfoAtom } from '@/recoil/state';
import { recentlyViewedShopsState } from '@/recoil/state';

interface Props {
  info?: any;
  shopId?: string;
  onRemove?: (shopId: string) => void;
}

const MarketCard = ({ info, shopId, onRemove }: Props) => {
  const [heart, setHeart] = useState(info ? true : false);
  const [shopInfo, setShopInfo] = useState<any>(info)

  // 로그인 유무
  const userInfo = useRecoilValue(userInfoAtom);
  // 현재위치 법정동 코드
  const curRegionCode = useRecoilValue(currentRegionCode);
  // 로그인 시 세팅된 주소
  const thisAddId = useRecoilValue(thisAddressId);
  // 현재 접속된 좌표값
  const curCoord = useRecoilValue(currentCoord);

  const [recentlyViewedShops, setRecentlyViewedShops] = useRecoilState(recentlyViewedShopsState);

  const heartStyle = {
    fontSize: '2rem',
    cursor: 'pointer',
    fill: heart ? 'red' : 'black',
  };

  useEffect(() => {
    const fetchData = async () => {
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
    };
    fetchData();
  }, [shopId])

  const heartHandler = (shopId: number) => {
    setHeart(!heart);
    likeApi.toggleLike(shopId)
  };
  
  const removeFromRecentlyViewed = (shopId: number) => {
    const updatedShops = recentlyViewedShops.filter((id: string) => id !== shopId.toString());
    localStorage.setItem('recentlyViewedShops', JSON.stringify(updatedShops));
    setRecentlyViewedShops(updatedShops);
    onRemove && onRemove(shopId.toString());
  };


  return (
    <div className="mt-[20px] ml-[20px] mr-[20px] pb-[20px] border-b border-slate-200 flex gap-4">
      <Link href={{
        pathname: '/detail',
        query: {
          id: shopId ? shopInfo?.id : shopInfo?.shopId
        },
      }} className="flex flex-1 gap-4">
        <div className="w-[90px] h-[90px] rounded-xl bg-slate-300">
          <img src={shopId ? '/images/yogiyo-logo.jpg' : shopInfo?.shopImg} />
        </div>
        <div className="flex flex-col justify-center gap-2 flex-1">
          <div className="title_container flex justify-start gap-2 rounded-md">
            <p className="text-xl font-bold">{shopId ? shopInfo?.name : shopInfo?.shopName || '가게 이름'}</p>
          </div>
          <div className="flex justify-start items-center gap-1">
            <AiFillStar fill="#FDC912" className="text-2xl" />
            <p className="text-base font-bold">{shopId ? shopInfo?.totalScore : shopInfo?.score || '5.0'}</p>
          </div>
        </div>
      </Link>
      <div className="flex flex-col justify-around">
        {/* 최근 본 맛집 X버튼 */}
        {shopId && (
          <i 
            className="text-[2rem] relative cursor-pointer w-full h-[1.4rem]"
            onClick={() => removeFromRecentlyViewed(shopId ? shopInfo.id : shopInfo.shopId)}
          >
            <div className="absolute w-[1.4rem] h-[1px] bg-slate-600 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45"></div>
            <div className="absolute w-[1.4rem] h-[1px] bg-slate-600 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-[135deg]"></div>
          </i>
        )}
        <>
          {heart ? (
            <AiFillHeart style={heartStyle} onClick={() => heartHandler(shopId ? shopInfo.id : shopInfo.shopId)} />
          ) : (
            <AiOutlineHeart style={heartStyle} onClick={() => heartHandler(shopId ? shopInfo.id : shopInfo.shopId)} />
          )}
        </>
      </div>
    </div>
  );
};

export default MarketCard;
