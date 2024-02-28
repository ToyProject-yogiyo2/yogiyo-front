import { isDetailMapState } from '@/recoil/modal';
import { searchCoord, searchAddress } from '@/recoil/address';
import { useSetRecoilState } from 'recoil';

interface Props {
  results: any;
  query: any;
}

const SearchAddressList = ({ query, results }: Props) => {
  const setCoord = useSetRecoilState(searchCoord);
  const setAddress = useSetRecoilState(searchAddress);
  const setIsDetailMap = useSetRecoilState(isDetailMapState);
  return (
    <div className="p-[20px]">
      {results && results.length !== 0 ? (
        <ul className="flex flex-col gap-[20px]">
          {results.map((address: any, index: number) => (
            <li
              key={index}
              className="border-b py-2 cursor-pointer"
              onClick={() => {
                address.road_address
                  ? setCoord({
                      lat: address.road_address.y,
                      lng: address.road_address.x,
                    })
                  : setCoord({
                      lat: address.y,
                      lng: address.x,
                    });
                setAddress(address.address_name), setIsDetailMap(true);
              }}
            >
              {address.address_name}
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col gap-[20px]">
          <p className="font-[900] pb">이렇게 검색해보세요.</p>
          <ul className="flex flex-col gap-[15px]">
            <li>
              <p className="font-[600]">도로명 + 건물번호</p>
              <p className="text-slate-600">서초로 38길 12</p>
            </li>
            <li>
              <p className="font-[600]">지역명(동/리) + 번지</p>
              <p className="text-slate-600">서초로 1498-5</p>
            </li>
            <li>
              <p className="font-[600]">지역명(동/리) + 건물명(아파트명)</p>
              <p className="text-slate-600">서초동 요기요빌딩</p>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchAddressList;
