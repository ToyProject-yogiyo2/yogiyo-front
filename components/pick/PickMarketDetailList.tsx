'use client'
import MarketCard from './MarketCard';
interface Props {
  pickList?: {}[];
  existingShops?: string[];
  
}

const PickMarketDetailList = ({ pickList, existingShops }: Props) => {
  if(existingShops){
    return (
      <div className="flex flex-col bg-white">
        {existingShops?.map((shopId, i) => <MarketCard key={i} shopId={shopId}/>)}
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
