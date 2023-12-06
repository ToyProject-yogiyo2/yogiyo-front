import MaketDetailCard from '@/components/common/MarketDetailCard';
import type { ShopListResponse, Shop } from '@/lib/types';

interface Props {
  shopListData?: Shop[]
}

const MarketDetailList = ({shopListData}: Props) => {
  console.log(shopListData)
  return (
    <div className="flex flex-col">
      {shopListData?.map((info: Shop, i) => <MaketDetailCard key={i} info={info} />)}
    </div>
  );
};

export default MarketDetailList;
