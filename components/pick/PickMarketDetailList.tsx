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
  pick?: boolean;
}

const dummy = new Array(10).fill(dummyCon);

const PickMarketDetailList = ({ pick }: Props) => {
  return (
    <div className="flex flex-col bg-white">
      {dummy?.map((info, i) => <MarketCard key={i} info={info} pick={pick} />)}
    </div>
  );
};

export default PickMarketDetailList;
