'use client';
import { FaStar } from 'react-icons/fa';
import { SlArrowRight } from 'react-icons/sl';
import { HiOutlineSpeakerphone } from 'react-icons/hi';
import { useState } from 'react';
import Link from 'next/link';

const MiddleTitle = () => {
  const [tap, setTap] = useState(0);

  return (
    <div className="">
      <div className="px-4 pt-4">
        <p className="text-[1.8rem] font-bold">가게이름</p>
      </div>
      <div className="flex items-center gap-2 px-4">
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
      <div className="pt-6">
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
      </div>
      <div className="px-4 py-2">
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
