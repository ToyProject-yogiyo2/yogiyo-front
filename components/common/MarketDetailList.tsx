import MaketDetailCard from '@/components/common/MarketDetailCard';
import type { ShopListResponse, Shop } from '@/types/types';

interface Props {
  shopListData?: Shop[];
}

const MarketDetailList = ({ shopListData }: Props) => {
  console.log(shopListData);
  return (
    <div className="flex flex-col">
      {shopListData?.map((shop: Shop, i) => <MaketDetailCard key={i} shop={shop} />)}
    </div>
  );
};

export default MarketDetailList;
