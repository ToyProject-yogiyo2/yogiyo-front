import React, { useState, useEffect} from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userAddress } from '@/recoil/address';
import { headerModalState, isDetailMapState, isFindMapState } from '@/recoil/modal';
import { FiSearch } from 'react-icons/fi';
import { AiOutlineAim } from 'react-icons/ai';
import { MdArrowBackIosNew } from 'react-icons/md';
import SearchAddressList from './SearchAddressList';
import axios from 'axios';
import DetailMap from './DetailMap';
import FindMap from './FindMap';
import UserAddressBtn from './addressModal/UserAddressBtn';
import { BiHomeAlt } from 'react-icons/bi';
import { BsBagDash } from 'react-icons/bs';

export const arrowStyle = {
  position: 'absolute',
  top: '0',
  left: '0',
  fontSize: '1.7rem',
  margin: '0 10px',
  cursor: 'pointer',
  color: '#333',
};

const AddressModal = () => {
  const [_, setIsModal] = useRecoilState(headerModalState);
  const isDetailMap = useRecoilValue(isDetailMapState);
  const [isFindMap, setIsFindMap] = useRecoilState(isFindMapState);
  const memberAddress = useRecoilValue(userAddress);
  const [height, setHeight] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);

  // 집 추가 & 회사 추가 로 이동할 경우 상태값
  const [directAdd, setDirectAdd] = useState('');

  // 집 추가 & 회사 추가 상태값 초기화
  useEffect(() => setDirectAdd('') , [])

  const searchIconStyle = {
    position: 'absolute',
    top: '12px',
    left: '35px',
    fontSize: '1.1rem',
    color: '#999',
  };

  const KAKAO_API_BASE_URL = process.env.NEXT_PUBLIC_KAKAO_API_BASE_URL || '';
  const KAKAO_API_KEY = process.env.NEXT_PUBLIC_KAKAO_API_KEY || '';

  const searchAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.get(KAKAO_API_BASE_URL, {
        headers: {
          Authorization: `KakaoAK ${KAKAO_API_KEY}`,
        },
        params: {
          query,
        },
      });
      console.log(response.data.documents);
      setResults(response.data.documents);
    } catch (error) {
      setResults([]);
    }
  };

  const addressAddDirect = (param: string) => {
    setIsFocused(true), setHeight(true);
    setDirectAdd(param);
  }

  return (
    <>
      {/* 모달창 제외 백그라운드 */}
      <div
        onClick={() => setIsModal(false)}
        className="w-full h-full fixed bottom-0 left-0 z-90 opacity-40 bg-black"
      />
      {/* 모달 본문 */}
      {!isDetailMap ? (
        !isFindMap ? (
          <>
            <div
              className={`fixed bottom-0 left-0 w-full transition-all duration-300 ease-in-out bg-white z-10 rounded-t-3xl overflow-hidden ${
                height ? 'h-full' : 'h-[50%]'
              }`}
            >
              {/* 모달창 크기 컨트롤 버튼*/}
              <div
                onClick={() => setHeight(!height)}
                className="cursor-pointer h-8 flex justify-center items-center"
              >
                {/* click 영역 */}
                <p className="w-[50px] h-[5px] bg-slate-300 rounded-xl"></p>
              </div>
              <div className="m-[20px] relative h-[50px]">
                {(isFocused || query) && (
                  <MdArrowBackIosNew
                    style={arrowStyle}
                    onClick={() => {
                      setQuery('');
                      setResults([]);
                      setIsFocused(false);
                      setDirectAdd('');
                    }}
                  />
                )}
                <h2 className="font-black text-center text-[1.2rem]">주소 설정</h2>
              </div>
              <form onSubmit={searchAddress} className="flex-1 px-[20px] relative">
                <FiSearch style={searchIconStyle} />
                <input
                  className="rounded-[10px] bg-slate-200 w-[100%] p-[12px] pl-[40px] text-[0.9rem]"
                  type="text"
                  value={query}
                  placeholder="건물명, 도로명 또는 지번으로 검색"
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => {
                    setIsFocused(true), setHeight(true);
                  }}
                  onBlur={() => {
                    setIsFocused(false);
                    setDirectAdd('');
                  }}
                />
              </form>
              {!query && (
                <>
                  <p
                    onClick={() => setIsFindMap(true)}
                    className="flex w-full justify-center items-center gap-1 pt-[15px] pb-[15px] cursor-pointer"
                  >
                    <AiOutlineAim /> 현재 위치로 주소 찾기
                  </p>
                  <div className="w-full h-[10px] bg-slate-200"></div>
                </>
              )}
              {/* 집과 회사만 */}
              {
                !isFocused && !query &&
                (
                  memberAddress.length > 0
                  && memberAddress.filter(addTarget => addTarget.addressType === "HOME" || addTarget.addressType === "COMPANY")
                  .map((addressTarget, i) => (
                      <UserAddressBtn key={i} addressTarget={addressTarget} />
                  ))
                )
              }
              {/* 집 추가버튼 */}
              {
                !isFocused && !query &&
                !memberAddress.find(addressTarget => addressTarget.addressType === "HOME") &&
                <div 
                  className="flex p-[20px]"
                  onClick={() => addressAddDirect('HOME')}
                >
                  <div className='flex flex-1 gap-2 cursor-pointer'><BiHomeAlt style={{ fontSize: '1.5rem' }}/><span className="flex items-center gap-2 text-[1rem] font-bold">집 추가</span></div>
                </div>
              }
              {/* 회사 추가버튼 */}
              {
                !isFocused && !query &&
                !memberAddress.find(addressTarget => addressTarget.addressType === "COMPANY") &&
                <div 
                  className="flex p-[20px]"
                  onClick={() => addressAddDirect('COMPANY')}
                >
                  <div className='flex flex-1 gap-2 cursor-pointer'><BsBagDash style={{ fontSize: '1.5rem' }}/><span className="flex items-center gap-2 text-[1rem] font-bold">회사 추가</span></div>
                </div>
              }
              {!isFocused && !query && <div className="w-full h-[10px] bg-slate-200"></div>}
              {/* 집과 회사 제외한 기타 주소만 */}
              {
                !isFocused && !query &&
                (
                  memberAddress.length > 0
                  && memberAddress.filter(addTarget => addTarget.addressType !== "HOME" && addTarget.addressType !== "COMPANY")
                  .map((addressTarget, i) => (
                      <UserAddressBtn key={i} addressTarget={addressTarget} />
                  ))
                )
              }
              {isFocused || query ? <SearchAddressList query={query} results={results} /> : null}
            </div>
          </>
        ) : (
          <FindMap />
        )
      ) : (
        <DetailMap directAdd={directAdd}/>
      )}
    </>
  );
};

export default AddressModal;
