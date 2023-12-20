'use client';
import { IoIosArrowDown } from 'react-icons/io';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  headerModalState,
  currentCoord,
  currentAddress,
  userAddress,
  thisAddressId,
  userInfoAtom,
} from '@/recoil/state';
import AddressModal from './AddressModal';
import { useState, useEffect } from 'react';
import { fetchAddress } from '@/lib/fetchAddress';

declare global {
  interface Window {
    kakao: any;
  }
}

const Header = () => {
  const [isModal, setIsModal] = useRecoilState(headerModalState);
  const [curCoord, setCurCoord] = useRecoilState(currentCoord);
  const [curAdd, setCurAdd] = useRecoilState(currentAddress);
  const [thisAdd, setThisAdd] = useRecoilState(thisAddressId);
  const [memberAddress, setMemberAddress] = useRecoilState(userAddress);
  const userInfo = useRecoilValue(userInfoAtom);

  //로그인 확인용
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    // 현재 유저의 위치 찾기
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setCurCoord({ lat, lng });
        },
        (error) => {
          // 오류날 경우 or 유저가 위치추적권한을 허용하지 않을 경우 임의 좌표 설정
          setCurCoord({ lat: 37.566826, lng: 126.9786567 }); // Default to Seoul
        },
      );
    }

    fetchAddress(setMemberAddress, setThisAdd, userInfo);
  }, []);

  useEffect(() => {
    if (!curCoord) return; // 현재 유저의 위치 찾기 전이라면 return

    const kakaoMapScript = document.createElement('script');
    kakaoMapScript.async = false;
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_APP_KEY}&autoload=false&libraries=services`;
    document.head.appendChild(kakaoMapScript);

    const onLoadKakaoAPI = () => {
      const { kakao } = window;
      kakao.maps?.load(() => {
        // 주소-좌표 변환 객체를 생성
        const geocoder = new kakao.maps.services.Geocoder();

        // 좌표 설정
        const latlng = new kakao.maps.LatLng(curCoord.lat, curCoord.lng);

        // 좌표를 주소로 변환
        geocoder.coord2Address(latlng.getLng(), latlng.getLat(), (result: any, status: any) => {
          if (status === kakao.maps.services.Status.OK) {
            const detailAddress = result[0].address.address_name;
            setCurAdd(detailAddress);
          }
        });
      });
    };
    kakaoMapScript.addEventListener('load', onLoadKakaoAPI);

    // Cleanup
    return () => {
      kakaoMapScript.removeEventListener('load', onLoadKakaoAPI);
    };
  }, [curCoord]);

  return (
    <header className="fixed gap-2 top-0 left-0 w-full h-[50px] flex justify-center items-center bg-white z-50">
      <p
        onClick={() => setIsModal(true)}
        className={`text-center flex gap-2 items-center font-[800] text-[1.3rem] __className_e22756`}
      >
        {memberAddress.length > 0 ? thisAdd.nickname : curAdd}{' '}
        <IoIosArrowDown style={{ marginTop: '3px', fontSize: '1.2rem' }} />
      </p>
      {isModal ? <AddressModal /> : null}
    </header>
  );
};

export default Header;
