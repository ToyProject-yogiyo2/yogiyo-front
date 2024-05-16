'use client'
import MarketCard from './MarketCard';

interface Props {
  pickList?: {}[];
  existingShops?: string[];
  onRemove?: (shopId: string) => void;
}

const PickMarketDetailList = ({ pickList, existingShops, onRemove }: Props) => {
  if(existingShops){
    return (
      <div className="flex flex-col bg-white">
        {existingShops?.map((shopId, i) => <MarketCard key={i} shopId={shopId} onRemove={onRemove}/>)}
      </div>
    )
  }
  return (
    <div className="flex flex-col bg-white">
      {pickList?.map((info, i) => <MarketCard key={i} info={info}/>)}
    </div>
  );
};

export default PickMarketDetailList;
