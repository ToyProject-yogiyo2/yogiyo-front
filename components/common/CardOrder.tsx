'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BiChevronRight } from 'react-icons/bi';
import { TbTruckDelivery, TbChevronDownLeft } from 'react-icons/tb';
import { AiFillStar } from 'react-icons/ai';
import { BsChevronDown } from 'react-icons/bs';
import { BsChevronUp } from 'react-icons/bs';
import { MenuOption } from '@/types/types';

interface Props {
  type: number;
  tabIndex?: string;
}

// 타입만 받고, 탭인덱스는 현재 어떤 탭을 설정하냐에 따라 이 컴포넌트 안에서 다른 카드를 보여주기 위함인데
// 애초에 이 컴포넌트를 렌더링하는 곳에서 타입별로 조건부 렌더링을 하도록 변경하는걸로
/**
 * 이미 작성한 리뷰/ 작성가능한 리뷰 리스트를 받아 표출
 * @memberof review
 * @prop {?tabIndex} // 'left' | 'right' 로 현재 선택된 탭을 알려줌
 * @todo 리스트를 받아오는 부분 미구현, 이 형태가 다른곳에서도 쓰인다면 좀 수정해야 할듯
 */
const CardOrder = ({ type }: Props) => {
  useEffect(() => {
    console.log(`type: ${type}`);
  }, [type]);

  return <>{type === 0 ? <WritableReviews /> : type === 1 ? <WrittenReviews /> : <div>응?</div>}</>;
};

export default CardOrder;

const WritableReviews = () => {
  return (
    <div className="p-4 mb-2 bg-white">
      <CommonReviews />
      <Writable />
    </div>
  );
};

const WrittenReviews = () => {
  return (
    <div className="p-4 mb-2 bg-white">
      <CommonReviews />
      <Written />
    </div>
  );
};

const CommonReviews = () => {
  return (
    <div>
      <div className="flex">
        <div className="w-1/2">
          <div className="flex text-lg">
            <span className="font-semibold">롯데리아-오창점</span>
            <span className="mt-1">
              <BiChevronRight />
            </span>
          </div>
          <p className="text-[1rem] text-grey3 font-[400]">2023.8.29</p>
        </div>
        <div className="w-1/2 relative">
          <p className="absolute right-0 text-xs bg-grey1 rounded-md pt-1 pb-1 pr-2 pl-2 font-bold flex">
            <span className="text-sm">
              <TbTruckDelivery />
            </span>
            <span className="pl-1">배달주문</span>
          </p>
        </div>
      </div>
      <div className="w-full h-[2px] bg-grey1 mt-4 mb-4"></div>
    </div>
  );
};
const Writable = () => {
  const imagebox = 'w-[70px] h-[70px] bg-grey1 rounded-md overflow-hidden';
  const whiteButton = 'text-sm pt-2 pb-2 pr-4 pl-4 border border-grey2 rounded-md';

  return (
    <div className="flex pt-2 pb-2">
      <div className={`${imagebox}`}></div>
      <div className={`pl-4 pr-4 flex-1 overflow-hidden whitespace-nowrap`}>
        <p className={`overflow-hidden overflow-ellipsis`}>
          모짜렐라인더버거 어쩌구저쩌구 길면어쩌지
        </p>
        <p className="text-sm">
          리뷰 작성 기간 <span className="bold text-pink1">15시간 남음</span>
        </p>
      </div>
      <Link href="/">
        <p className={`${whiteButton}`}>리뷰쓰기</p>
      </Link>
    </div>
  );
};

const Written = () => {
  const [isdetailSpread, setIsDetailSpread] = useState(false);
  const handleDetailSpread = () => {
    setIsDetailSpread(!isdetailSpread);
  };

  const imageBox = 'w-[70px] h-[70px] bg-grey1 rounded-md overflow-hidden';
  const whiteButton = 'text-sm pt-2 pb-2 pr-4 pl-4 border border-grey2 rounded-md';
  const detailBox = `border-grey3 border w-full min-h-[50px] p-2 ${
    isdetailSpread ? '' : 'hidden'
  }`;

  const count = 5; //나중에 서버에서 받기
  const starArray = new Array(count).fill(null);

  return (
    <div>
      <div className="flex pt-2 pb-2">
        <div className={`${imageBox}`}></div>
        <div className="pl-4 pr-4 flex-1 overflow-hidden whitespace-nowrap">
          <p className="overflow-hidden overflow-ellipsis">
            뼈다귀해장국2인..........??????????????asdfawef.
          </p>
          <div className="flex">
            {starArray.map((_, index) => (
              <AiFillStar fill="#FDC912" className="" key={index} />
            ))}
          </div>
          <div className="flex">
            <span>맛</span>
            <AiFillStar fill="#FDC912" className="mt-[5px] pr-1 pl-1 w-auto" />
            <span className="text-yellow1 pr-2">{count}</span>

            <span>양 </span>
            <AiFillStar fill="#FDC912" className="mt-[5px] pr-1 pl-1 w-auto" />
            <span className="text-yellow1 pr-2">{count}</span>

            <span>배달 </span>
            <AiFillStar fill="#FDC912" className="mt-[5px] pr-1 pl-1 w-auto" />
            <span className="text-yellow1">{count}</span>
          </div>
        </div>
        <div className="text-sm text-grey4">삭제</div>
      </div>
      <div className="pt-2 pb-2 w-full">
        <div className="h-[200px] bg-grey1"></div>
      </div>
      <div className="pt-2 pb-2 w-full">
        <div className="pb-1.5">언제 먹어도 맛있 어쩌구</div>
        <div className="text-grey4 pb-2">고기듬뿍돼지김치찌개</div>
      </div>
      <div className="pt-2 pb-2 w-full">
        <div className="flex">
          <label htmlFor="detail" className="pb-2 text-sm text-grey5">
            주문 옵션 보기
          </label>
          <button id="detail" onClick={handleDetailSpread} className="pl-1 mb-[0.3rem] text-sm">
            {isdetailSpread ? <BsChevronUp /> : <BsChevronDown />}
          </button>
        </div>
        <div className={`${detailBox}`}>
          <p>고기듬뿍돼지김치찌개</p>
          <Obtion name="오잉 " content="이게되네" />
        </div>
      </div>
    </div>
  );
};

const Obtion = (option: MenuOption) => {
  return (
    <div className="flex text-grey4 text-sm">
      <TbChevronDownLeft className="pr-1 text-xl" />
      <p className="">{`${option.name} : ${option.content}`}</p>
    </div>
  );
};
