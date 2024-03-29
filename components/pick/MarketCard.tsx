'use client';
import { AiFillStar, AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useState } from 'react';
import Link from 'next/link';
import { likeApi } from '@/services/likeApi';

const MarketCard = ({ info }: any) => {
  const [heart, setHeart] = useState(true);

  const heartStyle = {
    fontSize: '2rem',
    cursor: 'pointer',
    fill: heart ? 'red' : 'black',
  };

  const heartHandler = (shopId: number) => {
    setHeart(!heart);
    likeApi.toggleLike(shopId)
  };

  return (
    <div className="mt-[20px] ml-[20px] mr-[20px] pb-[20px] border-b border-slate-200 flex gap-4">
      <Link href={{
        pathname: '/detail',
        query: {
          id: info.shopId
        },
      }} className="flex flex-1 gap-4">
        <div className="w-[90px] h-[90px] rounded-xl bg-slate-300">
          <img src={info.shopImg} />
        </div>
        <div className="flex flex-col justify-center gap-2 flex-1">
          <div className="title_container flex justify-start gap-2 rounded-md">
            <p className="text-xl font-bold">{info.shopName || '가게 이름'}</p>
          </div>
          <div className="flex justify-start items-center gap-1">
            <AiFillStar fill="#FDC912" className="text-2xl" />
            <p className="text-base font-bold">{info.score || '5.0'}</p>
          </div>
        </div>
      </Link>
      <div className="flex flex-col justify-around">
        {/* 최근 본 맛집 X버튼 */}
        {/* {!pick && (
          <i className="text-[2rem] relative cursor-pointer w-full h-[1.4rem]">
            <div className="absolute w-[1.4rem] h-[1px] bg-slate-600 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45"></div>
            <div className="absolute w-[1.4rem] h-[1px] bg-slate-600 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-[135deg]"></div>
          </i>
        )} */}
        <>
          {heart ? (
            <AiFillHeart style={heartStyle} onClick={() => heartHandler(info.shopId)} />
          ) : (
            <AiOutlineHeart style={heartStyle} onClick={() => heartHandler(info.shopId)} />
          )}
        </>
      </div>
    </div>
  );
};

export default MarketCard;
