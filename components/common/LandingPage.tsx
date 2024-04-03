'use client';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { currentAddress, currentCoord, currentRegionCode, thisAddressId, userAddress } from '@/recoil/address';
import { loadingState, userInfoAtom } from '@/recoil/state';
import { useState } from 'react';
import { fetchAddress } from '@/lib/fetchAddress';
import { useRouter } from 'next/navigation';

const LandingPage = () => {
  const [curCoord, setCurCoord] = useRecoilState(currentCoord);
  const [regionCode, setRegionCode] = useRecoilState(currentRegionCode);
  const [curAdd, setCurAdd] = useRecoilState(currentAddress);
  const setThisAdd = useSetRecoilState(thisAddressId);
  const setMemberAddress = useSetRecoilState(userAddress);
  const userInfo = useRecoilValue(userInfoAtom);

  const [locationLoaded, setLocationLoaded] = useState(false);
  const [regionCodeLoaded, setRegionCodeLoaded] = useState(false);
  const [isLoading, setIsLoading] = useRecoilState(loadingState);

  const router = useRouter();

  useEffect(() => {
    if(!isLoading){
      router.push('/home')
    }else{
    // 현재 유저의 위치 찾기
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            setCurCoord({ lat, lng });
            setLocationLoaded(true);
          },
          (error) => {
            // 오류날 경우 or 유저가 위치추적권한을 허용하지 않을 경우 임의 좌표 설정
            setCurCoord({ lat: 37.566826, lng: 126.9786567 }); // Default to Seoul
            setLocationLoaded(true);
          },
        );
      }else{
        setLocationLoaded(true);
      }
    }
  }, [isLoading]);

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
        const callback = (result: any, status: any) => {
          if (status === kakao.maps.services.Status.OK) {
            setRegionCode(result[0].code);
            setRegionCodeLoaded(true);
          }
        };
        geocoder.coord2RegionCode(curCoord.lng, curCoord.lat, callback);
      });
    };
    kakaoMapScript.addEventListener('load', onLoadKakaoAPI);
    //주소값 세팅되면 로딩완료

    // '요기'세팅된 주소가 없을 경우 현재 주소값 적용
    const optional = {
      id: 0,
      address: {
        zipcode: '',
        street: curAdd,
        detail: '',
      },
      here: true,
      code: regionCode,
      addressType: '',
      nickname: curAdd,
      longitude: curCoord?.lng,
      latitude: curCoord?.lat,
    }
    
    fetchAddress(setMemberAddress, setThisAdd, optional);

    // Cleanup
    return () => {
      kakaoMapScript.removeEventListener('load', onLoadKakaoAPI);
    };
  }, [curCoord]);

  useEffect(() => {
    if (locationLoaded && regionCodeLoaded) {
      setIsLoading(false);
    }
  }, [locationLoaded, regionCodeLoaded]);

  return (
    <div className="w-full h-[100vh] flex justify-center items-center bg-rose-600">
      <div className="w-[220px] h-[100px] flex justify-center items-center rounded-3xl bg-white">
        <div className="w-[200px] h-[50px]" style={{background: 'url(/img/yogiyo_new_logo.svg) center center/contain no-repeat'}} />
      </div>
    </div>
  );
};

export default LandingPage;