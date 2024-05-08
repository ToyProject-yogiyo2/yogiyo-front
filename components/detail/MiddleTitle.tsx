'use client';
import { FaStar, FaHeart } from 'react-icons/fa';
import { SlArrowRight } from 'react-icons/sl';
import { HiOutlineSpeakerphone } from 'react-icons/hi';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { shopApi } from '@/services/shopApi';
import { likeApi } from '@/services/likeApi';
import { useSearchParams } from 'next/navigation';
import type { ShopInfoType } from '@/types/types';

interface Props {
  shopInfo?: ShopInfoType
}


const MiddleTitle = ({shopInfo}: Props) => {
  const [heart, setHeart] = useState(shopInfo?.isLike);
  const [likeNum, setLikeNum] = useState(shopInfo?.likeNum);

  useEffect(() => {
    setHeart(shopInfo?.isLike);
    setLikeNum(shopInfo?.likeNum);
  }, [shopInfo])

  const listStyled = `
    text-slate-500
    font-bold
  `
  console.log(shopInfo)
  return (
    <div className="">
      <div className="px-4 pt-4 relative">
        <p className="text-[1.8rem] font-bold">{shopInfo?.name || 'Shop Name'}</p>
        <div 
          className='absolute top-4 right-4'
          onClick={() => {
            setHeart(!heart)
            if(shopInfo?.id) {
              likeApi.toggleLike(shopInfo?.id)
              if(heart){
                setLikeNum(prev => prev as number - 1)
              }else{
                setLikeNum(prev => prev as number + 1)
              }
            }
          }}
        >
          <FaHeart style={{
            fontSize: '1.8rem'
          }}
          color={heart ? '#f00' : '#ccc'} />
          <p className='text-[1.1rem] text-red-800 font-bold text-center'>{likeNum}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 px-4 border-b pb-2">
        <span className="text-[1.5rem] font-bold flex items-center gap-1">
          <FaStar color={'#FECE00'} />
          {shopInfo?.totalScore}
        </span>
        <div className="flex items-center gap-1 text-slate-400 cursor-pointer">
          <span className="">리뷰</span>
          <span className="">{shopInfo?.reviewNum}</span>
          <SlArrowRight style={{ fontSize: '0.8rem' }} />
        </div>
      </div>
      <div className="p-4">
        <div className='flex mb-4'>
          <ul className='flex flex-col gap-2 w-full'>
            <li className='flex gap-4'>
              <p className={listStyled}>배달정보</p>
              {shopInfo?.deliveryTime ? 
              <div className='p-4 rounded-2xl bg-red-50 flex-1'>
                <p className='text-red-500 text-[1.2rem] font-black'>
                  {(shopInfo?.deliveryTime) as number - 5}~{(shopInfo?.deliveryTime) as number + 5}분 <span className='text-[1rem]'>가게배달</span>
                </p>
                <p>{((shopInfo?.minDeliveryPrice || 1000).toLocaleString() || 0) + '원'}</p>
                <p>요기패스는 배달비 무료</p>
              </div> : 
              <>
                <span className='font-black'>배달 불가 지역</span>
              </>
            }

            </li>
            {/* <li className='flex gap-4'>
              <p className={listStyled}>할인혜택</p>
              <p className='text-red-500 font-bold'>15,000원 이상 주문 시 2,000원 할인</p>
            </li> */}
            {shopInfo?.deliveryTime && 
            <>
            <li className='flex gap-4'>
              <p className={listStyled}>최소주문</p>
              <p>{((shopInfo?.minOrderPrice || 1000).toLocaleString() || 0) + '원'}</p>
            </li>
            <li className='flex gap-4'>
              <p className={listStyled}>가게위치</p>
              <p>{Math.floor((shopInfo?.distance || 1)/10000) + 'km'}</p>
            </li>
            </>}
          </ul>
        </div>
        <Link
          href={{
            pathname: `detail/info`,
            query: {id: shopInfo?.id}
          }}
          className="py-6 px-4 flex gap-2 items-center bg-slate-100 rounded-xl text-slate-600"
        >
          <HiOutlineSpeakerphone fontSize={'1.2rem'} />
          <span className="flex-1">{shopInfo?.noticeTitle || '사장님 공지사항 링크'}</span>
          <SlArrowRight />
        </Link>
      </div>
      <div className="py-2 px-4 flex gap-2">
        <Link
          href={`detail/info`}
          className="rounded-xl border border-slate-400 py-3 flex-1 flex justify-center items-center"
        >
          리뷰 {shopInfo?.reviewNum}
        </Link>
        <Link
          href={{
            pathname: `detail/info`,
            query: {id: shopInfo?.id}
          }}
          className="rounded-xl border border-slate-400 py-3 flex-1 flex justify-center items-center"
        >
          가게 · 원산지 정보
        </Link>
      </div>
    </div>
  );
};

export default MiddleTitle;
