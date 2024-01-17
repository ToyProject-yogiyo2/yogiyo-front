import { AiFillStar } from 'react-icons/ai';
import Link from 'next/link';
import type { Shop } from '@/types/types';

interface Props {
  shop: Shop;
}

const iconStyled = (imgUrl: string) => {
  return {
    backgroundImage: `url(${imgUrl})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  };
};

const basicStyled = {
  backgroundImage: `url(/images/yogiyo-logo.jpg)`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
};

const MaketDetailCard = ({ shop }: Props) => {
  return (
    <Link
      href={{
        pathname: 'detail',
        query: {
          id: shop.shopId,
        },
      }}
      className="mt-[20px] ml-[20px] mr-[20px] pb-[20px] border-b border-slate-200 flex gap-4"
    >
      <div className="w-[90px] h-[90px] rounded-xl bg-slate-300">
        {shop.icon ? (
          <div className="w-full h-full" style={iconStyled(shop.icon)} />
        ) : (
          <div className="w-full h-full bg-black" style={basicStyled} />
        )}
      </div>
      <div>
        <div className="title_container flex justify-start gap-2 rounded-md">
          {/* 나중에 요기요 아이콘 찾으면 여기다 넣기 */}
          {/* <i>yogiyo_icon</i> */}
          <p className="text-xl font-bold">{shop.shopName}</p>
        </div>
        <div className="flex justify-start items-center gap-1">
          <AiFillStar fill="#FDC912" className="text-2xl" />
          <p className="text-base font-bold">{shop.totalScore.toFixed(1)}</p>
        </div>
        <div className="text-sm flex gap-2">
          <p>{shop.deliveryTime}분</p>
          <span>배달요금</span>
          <p className="font-bold">{shop.maxDeliveryPrice}원</p>
        </div>
      </div>
    </Link>
  );
};

export default MaketDetailCard;
