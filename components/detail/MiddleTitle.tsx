'use client';
import { FaStar, FaHeart } from 'react-icons/fa';
import { SlArrowRight } from 'react-icons/sl';
import { HiOutlineSpeakerphone } from 'react-icons/hi';
import { useState } from 'react';
import Link from 'next/link';

const MiddleTitle = () => {
  const listStyled = `
    text-slate-500
    font-bold
  `

  return (
    <div className="">
      <div className="px-4 pt-4 relative">
        <p className="text-[1.8rem] font-bold">가게이름</p>
        <div 
          className='absolute top-4 right-4'
          onClick={() => {}}
        >
          <FaHeart style={{
            fontSize: '1.8rem'
          }}
          color={'#f00'} />
          <p className='text-[1.1rem] text-red-800 font-bold'>237</p>
        </div>
      </div>
      <div className="flex items-center gap-2 px-4 border-b pb-2">
        <span className="text-[1.5rem] font-bold flex items-center gap-1">
          <FaStar color={'#FECE00'} />
          5.0
        </span>
        <div className="flex items-center gap-1 text-slate-400 cursor-pointer">
          <span className="">리뷰</span>
          <span className="">476</span>
          <SlArrowRight style={{ fontSize: '0.8rem' }} />
        </div>

      </div>
      {/* <div className="pt-6">
        <div className="flex justify-around pt-4 border-b">
          <span
            className={`h-full pb-4 px-8 tracking-[0.08rem] cursor-pointer ${
              tap === 0 && 'font-black border-b-4 text-black border-black'
            }`}
            onClick={() => setTap(0)}
          >
            배달·40분~
          </span>
          <span
            className={`h-full pb-4 px-8 tracking-[0.08rem] cursor-pointer ${
              tap === 1 && 'font-black border-b-4 text-black border-black'
            }`}
            onClick={() => setTap(1)}
          >
            포장·20분
          </span>
        </div>
      </div> */}
      <div className="p-4">
        <div className='flex mb-4'>
          <ul className='flex flex-col gap-2 w-full'>
            <li className='flex gap-4'>
              <p className={listStyled}>배달정보</p>
              <div className='p-4 rounded-2xl bg-red-50 flex-1'>
                <p className='text-red-500 text-[1.2rem] font-black'>40~45분 <span className='text-[1rem]'>가게배달</span></p>
                <p>3,000원</p>
                <p>요기패스는 배달비 무료</p>
              </div>
            </li>
            <li className='flex gap-4'>
              <p className={listStyled}>할인혜택</p>
              <p className='text-red-500 font-bold'>15,000원 이상 주문 시 2,000원 할인</p>
            </li>
            <li className='flex gap-4'>
              <p className={listStyled}>최소주문</p>
              <p>14,000원</p>
            </li>
            <li className='flex gap-4'>
              <p className={listStyled}>가게위치</p>
              <p>1.2km</p>
            </li>
          </ul>
        </div>

        {}
        <Link
          href={``}
          className="py-6 px-4 flex gap-2 items-center bg-slate-100 rounded-xl text-slate-600"
        >
          <HiOutlineSpeakerphone fontSize={'1.2rem'} />
          <span className="flex-1">사장님 공지사항 링크</span>
          <SlArrowRight />
        </Link>
      </div>
      <div className="py-2 px-4 flex gap-2">
        <Link
          href=""
          className="rounded-xl border border-slate-400 py-3 flex-1 flex justify-center items-center"
        >
          리뷰 100
        </Link>
        <Link
          href=""
          className="rounded-xl border border-slate-400 py-3 flex-1 flex justify-center items-center"
        >
          가게 · 원산지 정보
        </Link>
      </div>
    </div>
  );
};

export default MiddleTitle;
