'use client'
import MarketCard from './MarketCard';

const dummyCon = {
  id: 0,
  name: '롯데리아',
  callNumber: '0',
  address: '어디동 어디시',
  categories: '',
  img: '',
};



interface Props {
  pickList?: {}[];
}

const dummy = new Array(10).fill(dummyCon);

const PickMarketDetailList = ({ pickList }: Props) => {
  return (
    <div className="flex flex-col bg-white">
      {pickList?.map((info, i) => <MarketCard key={i} info={info}/>)}
    </div>
  );
};

export default PickMarketDetailList;
