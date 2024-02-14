'use client';
import { useState, useEffect, useRef } from 'react';
import {
  searchCoord,
  currentCoord,
  currentAddress,
  isDetailMapState,
  isFindMapState,
} from '@/recoil/state';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { MdArrowBackIosNew } from 'react-icons/md';
import { GrUserManager } from 'react-icons/gr';
import { arrowStyle } from './AddressModal';
import { mapIconStyle } from './DetailMap';
import { locationDecoder } from '@/lib/locationDecoder';

const FindMap = () => {
  const coord = useRecoilValue(currentCoord);
  const setSearchCo = useSetRecoilState(searchCoord);
  const [address, setAddress] = useRecoilState(currentAddress);
  const setIsDetail = useSetRecoilState(isDetailMapState);
  const setIsFindMap = useSetRecoilState(isFindMapState);

  //마우스 드래그 이벤트 발생유무
  const [action, setAction] = useState(false);
  const [centerCoord, setCenterCoord] = useState(coord);

  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!coord) return;
    const { kakao } = window;
    kakao.maps?.load(() => {
      let options = {
        center: new kakao.maps.LatLng(coord.lat, coord.lng),
        level: 3,
      };
      const geocoder = new kakao.maps.services.Geocoder();

      let map = new kakao.maps.Map(mapRef.current, options);

      kakao.maps.event.addListener(map, 'dragend', async function () {
        //움직임 안내 문구 없애기
        setAction(true);

        // 중앙 좌표 얻기
        const center = map.getCenter();
        const currentCoord = {
          lat: center.getLat(),
          lng: center.getLng(),
        };

        // 좌표 저장
        setCenterCoord(currentCoord);

        // 좌표를 주소로 변환
        const decodedAddress = await locationDecoder(kakao, geocoder, currentCoord);

        // 주소 저장
        setAddress(decodedAddress);
      });
    });
  }, []);

  return (
    <div
      className={`flex flex-col gap-[10px] fixed bottom-0 left-0 w-full py-[40px] transition-all duration-300 ease-in-out bg-white z-10 rounded-t-3xl overflow-hidden h-full`}
    >
      <div className="relative h-[50px]">
        <MdArrowBackIosNew style={arrowStyle} onClick={() => setIsFindMap(false)} />
        <h2 className="font-black text-center text-[1.2rem]">지도에서 주소찾기</h2>
      </div>
      <div className="w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] relative">
        <GrUserManager style={mapIconStyle} />
        {!action && (
          <span className="px-[12px] py-[10px] bg-sky-600 text-white rounded-3xl absolute z-50 top-5 left-1/2 -translate-x-1/2 whitespace-nowrap">
            지도를 움직여 위치를 설정하세요
          </span>
        )}
        <div id="map" ref={mapRef} style={{ width: '100%', height: '100%' }}></div>
      </div>
      <div className="flex flex-col gap-[10px] px-[20px]">
        <p className="font-[500] text-[1.2rem]">{address}</p>
        <span
          className="cursor-pointer bg-pink1 text-white font-black text-[1.2rem] rounded-xl p-[10px] text-center"
          onClick={() => {
            setIsDetail(true);
            setIsFindMap(false);
            setSearchCo(centerCoord);
          }}
        >
          선택한 위치로 설정
        </span>
      </div>
    </div>
  );
};

export default FindMap;
