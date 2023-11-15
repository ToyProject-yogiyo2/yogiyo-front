'use client';
import { useState, useEffect } from 'react';
import {
  searchAddress,
  searchCoord,
  isDetailMapState,
  headerModalState,
  currentAddress,
  currentCoord,
  userAddress,
  thisAddressId
} from '@/recoil/state';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { MdArrowBackIosNew } from 'react-icons/md';
import { GrUserManager } from 'react-icons/gr';
import { arrowStyle } from './AddressModal';
import { BiHomeAlt } from 'react-icons/bi';
import { BsBagDash } from 'react-icons/bs';
import { FiMapPin } from 'react-icons/fi';
import { addressApi } from '@/services/addressApi';
import { fetchAddress } from '@/lib/fetchAddress';

export const mapIconStyle = {
  position: 'absolute',
  zIndex: '999',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  background: '#fff',
  padding: '5px',
  borderRadius: '50%',
  width: '3rem',
  height: '3rem',
  border: '1px solid #333',
};

const buttonIconStyle = {
  fontSize: '1.5rem',
};

const DetailMap = () => {
  //검색 좌표 및 주소
  const coord = useRecoilValue(searchCoord);
  const address = useRecoilValue(searchAddress);

  //현재 좌표 및 주소
  const setCurCoord = useSetRecoilState(currentCoord);
  const setCurAdd = useSetRecoilState(currentAddress);

  //모달 상태
  const setHeaderModal = useSetRecoilState(headerModalState);
  const setIsDetail = useSetRecoilState(isDetailMapState);

  //fetch후 상태저장
  const setMemberAddress = useSetRecoilState(userAddress);
  const setThisAdd = useSetRecoilState(thisAddressId);

  //상세주소
  const [detailAddress, setDetailAddress] = useState('');

  //주소 별명
  const [isAddressName, setIsAddressName] = useState('');

  useEffect(() => {
    if (!coord) return;
    const { kakao } = window;
    kakao.maps?.load(() => {
      let container = document.getElementById('map');

      let options = {
        center: new kakao.maps.LatLng(coord.lat, coord.lng),
        level: 3,
      };

      let map = new kakao.maps.StaticMap(container, options);
    });
  }, [coord]);

  const setAddress = async () => {
    //사용자가 주소를 저장하려는 경우
    if (isAddressName) {
      const selectAddressName = () => {
        if (isAddressName === 'HOME') return '집';
        if (isAddressName === 'COMPANY') return '회사';
        if (isAddressName === 'ELSE') return '기타';
        return isAddressName;
      };
      await addressApi.register({
        here: true,
        address: {
          zipcode: '',
          street: address,
          detail: detailAddress,
        },
        nickname: selectAddressName(),
        addressType:
          isAddressName !== 'HOME' && isAddressName !== 'COMPANY' ? 'ELSE' : isAddressName,
        longitude: coord?.lng || 0,
        latitude: coord?.lat || 0,
      });

      await fetchAddress(setMemberAddress, setThisAdd)
    }
    setCurCoord(coord);
    setCurAdd(address);
  };

  return (
    <div
      className={`flex flex-col gap-[10px] fixed bottom-0 left-0 w-full py-[40px] transition-all duration-300 ease-in-out bg-white z-10 rounded-t-3xl overflow-hidden h-full`}
    >
      <div className="relative h-[50px]">
        <MdArrowBackIosNew style={arrowStyle} onClick={() => setIsDetail(false)} />
        <h2 className="font-black text-center text-[1.2rem]">주소 상세 정보 입력</h2>
      </div>
      <div className="w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] relative">
        <div id="map" style={{ width: '100%', height: '100%' }}></div>
        <GrUserManager style={mapIconStyle} />
      </div>
      <div className="flex flex-col gap-[10px] px-[20px]">
        <p className="font-[500] text-[1.2rem]">{address}</p>
        <input
          type="text"
          className="p-[10px] border rounded-xl"
          placeholder="상세주소를 입력하세요 (건물명, 동/호수 등)"
          onChange={(e) => setDetailAddress(e.target.value)}
        />

        <div className="flex justify-around gap-4">
          <div
            onClick={() => setIsAddressName((prev) => (prev === 'HOME' ? '' : 'HOME'))}
            className={`flex flex-col justify-center items-center rounded-2xl flex-1 h-[70px] border gap-1 cursor-pointer 
            ${isAddressName === 'HOME' && `border-slate-400`}
            `}
          >
            <BiHomeAlt style={buttonIconStyle} />집
          </div>
          <div
            onClick={() => {
              setIsAddressName((prev) => (prev === 'COMPANY' ? '' : 'COMPANY'));
            }}
            className={`flex flex-col justify-center items-center rounded-2xl flex-1 h-[70px] border gap-1 cursor-pointer
            ${isAddressName === 'COMPANY' && `border-slate-400`}
            `}
          >
            <BsBagDash style={buttonIconStyle} />
            회사
          </div>
          <div
            onClick={() =>
              setIsAddressName((prev) =>
                prev !== '' && prev !== 'HOME' && prev !== 'COMPANY' ? '' : 'ELSE',
              )
            }
            className={`flex flex-col justify-center items-center rounded-2xl flex-1 h-[70px] border gap-1 cursor-pointer
            ${
              isAddressName !== '' &&
              isAddressName !== 'HOME' &&
              isAddressName !== 'COMPANY' &&
              `border-slate-400`
            }
            `}
          >
            <FiMapPin style={buttonIconStyle} />
            기타
          </div>
        </div>
        {isAddressName !== '' && isAddressName !== 'HOME' && isAddressName !== 'COMPANY' && (
          <input
            type="text"
            onChange={(e) => setIsAddressName(e.target.value)}
            className="p-[10px] border rounded-xl"
            placeholder="주소의 별명을 지어주세요"
          />
        )}
        <span
          className="cursor-pointer bg-yopink text-white font-black text-[1.2rem] rounded-xl p-[10px] text-center"
          onClick={() => {
            setIsDetail(false);
            setHeaderModal(false);
            setAddress();
          }}
        >
          요기로 배달
        </span>
      </div>
    </div>
  );
};

export default DetailMap;
