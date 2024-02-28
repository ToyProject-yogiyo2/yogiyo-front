import { AiFillStar } from 'react-icons/ai';
import type { Shop } from '@/types/types';
import Link from 'next/link';

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

const MarketInfoCard = ({ shop }: Props) => {
  return (
    <Link
      href={{
        pathname: '/detail',
        query: {
          id: shop.shopId,
        },
      }}
      className="w-[170px] h-[300px] flex flex-col gap-1"
    >
      <div className="img_container w-full h-[170px] flex justify-center items-center overflow-hidden rounded-xl">
        {shop.icon ? (
          <div className="w-full h-full" style={iconStyled(shop.icon)} />
        ) : (
          <div className="w-full h-full bg-black" style={basicStyled} />
        )}
      </div>
      <div className="title_container flex justify-start gap-1.5 rounded-md">
        {/* 나중에 요기요 아이콘 찾으면 여기다 넣기 */}
        <i>{/*yogiyo_icon*/}</i>
        <p className="text-xl font-bold">{shop.shopName || '가게 이름'}</p>
      </div>
      <div className="flex justify-start items-center gap-1">
        <AiFillStar fill="#FDC912" className="text-2xl" />
        <p className="text-base font-bold">{shop.totalScore.toFixed(1) || '5.0'}</p>
      </div>
      <div className="text-sm">
        <p>{shop.deliveryTime || 0}분</p>
      </div>
      <div className="text-sm flex items-center gap-2">
        <span>배달요금</span>
        <p className="font-bold">{shop.maxDeliveryPrice || '3,000원'}</p>
      </div>
    </Link>
  );
};

export default MarketInfoCard;
