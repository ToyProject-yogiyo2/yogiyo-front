import React from 'react';
import Link from 'next/link';
import { BiChevronRight } from 'react-icons/bi';
import { BiHeart } from 'react-icons/bi';
import { BiGift } from 'react-icons/bi';
import { BiMessageDots } from 'react-icons/bi';
import { useRecoilState } from 'recoil';
import { userInfoAtom } from '@/recoil/state';

const LoggedIn = () => {
  const [user, setUser] = useRecoilState(userInfoAtom);

  return (
    <div className="w-full p-5">
      <div className="flex pt-5">
        <div className="h-auto w-5/6">
          <p>
            <span className="font-bold text-xl">{user.nickname}</span>
            <span className="ml-2 text-xs text-pink1 rounded-xl pt-0.5 pb-0.5 pl-1.5 pr-1.5 border border-pink1 ">
              요기패스 구독중
            </span>
          </p>
          <p className="text-xs pt-1.5 text-slate-500">{user.email}</p>
        </div>
        <div className="w-1/6 flex relative">
          <div className="absolute top-1/2 transform -translate-y-1/2 right-0">
            <Link href="../../mypage/aboutuser">
              <BiChevronRight color="grey" size="24px" />
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-slate-100 mt-5 rounded-xl h-36 w-full border-slate-200 border">
        <div className="flex h-3/5 w-full bg-white rounded-t-xl pt-5 pb-5 text-sm relative">
          <div className="w-1/3 grid grid-rows-2 gap-2 place-content-center">
            <BiHeart size="1.7rem" style={{ margin: '0 auto' }} />
            <p className="text-xs">찜 목록</p>
          </div>
          <div className="w-1/3 grid grid-rows-2 gap-2 place-content-center border-r border-l border-slate-300">
            <BiGift size="1.7rem" style={{ margin: '0 auto' }} />
            <p className="text-xs">선물함</p>
          </div>
          <div className="w-1/3 grid grid-rows-2 gap-2 place-content-center relative">
            <Link href="/mypage/review" className="absolute w-full">
              <BiMessageDots size="1.7rem" style={{ margin: '0 auto' }} />
              <p className="text-xs text-center">리뷰관리</p>
            </Link>
          </div>
        </div>

        <div className="flex h-2/5 text-sm">
          <div className="w-1/2 flex relative items-center border-r border-r-slate-200">
            <div className="w-4/5 justify-center relative">
              <p className="absolute flex top-1/2 transform -translate-y-1/2 text-slate-700 w-full p-3">
                <span className="text-left flex-1">쿠폰함</span>
                <span className="text-right font-bold">0장</span>
              </p>
            </div>
            <div className="w-1/5">
              <BiChevronRight color="grey" size="24px" />
            </div>
          </div>
          <div className="w-1/2 flex relative items-center">
            <div className="w-4/5 justify-center relative">
              <p className="absolute flex top-1/2 transform -translate-y-1/2 text-slate-700 w-full p-3">
                <span className="text-left flex-1">포인트</span>
                <span className="text-right font-bold">0원</span>
              </p>
            </div>
            <div className="w-1/5">
              <BiChevronRight color="grey" size="24px" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoggedIn;
