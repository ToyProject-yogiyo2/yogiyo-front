'use client'
import MarketCard from './MarketCard';
interface Props {
  pickList?: {}[];
}

const PickMarketDetailList = ({ pickList }: Props) => {
  return (
    <div className="flex flex-col bg-white">
      {pickList?.map((info, i) => <MarketCard key={i} info={info}/>)}
    </div>
  );
};

export default PickMarketDetailList;
