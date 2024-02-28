'use client';
import Head from 'next/head';
import './globals.css';
import Header from '@/components/header/Header';
import Footer from '@/components/common/Footer';
import Homes from './home/page';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { currentAddress, currentCoord, currentRegionCode, thisAddressId, userAddress } from '@/recoil/address';
import { loadingState, userInfoAtom } from '@/recoil/state';
import { useState, useEffect } from 'react';
import { fetchAddress } from '@/lib/fetchAddress';
import SplashPage from '@/components/common/SplashPage';
import { useRouter } from 'next/navigation';
import LoginPage from '@/components/common/LoginPage';


export default function Home() {

  const [curCoord, setCurCoord] = useRecoilState(currentCoord);
  const setRegionCode = useSetRecoilState(currentRegionCode);
  const setCurAdd = useSetRecoilState(currentAddress);
  const setThisAdd = useSetRecoilState(thisAddressId);
  const setMemberAddress = useSetRecoilState(userAddress);
  const userInfo = useRecoilValue(userInfoAtom);
  
  //로딩 완료 체크
  const [locationLoaded, setLocationLoaded] = useState(false);
  const [regionCodeLoaded, setRegionCodeLoaded] = useState(false);
  const [isLoading, setIsLoading] = useRecoilState(loadingState);
  const router = useRouter();

  useEffect(() => {
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

    fetchAddress(setMemberAddress, setThisAdd);
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

    // Cleanup
    return () => {
      kakaoMapScript.removeEventListener('load', onLoadKakaoAPI);
    };
  }, [curCoord]);

  // 로딩 완료 확인
  useEffect(() => {
    if(locationLoaded && regionCodeLoaded){
      setIsLoading(false);
    }
  }, [locationLoaded, regionCodeLoaded])

  // useEffect(() => {
  //   console.log(userInfo)
  //   if(!userInfo.isLogin){
  //     console.log(userInfo)
  //     router.push('/login');
  //   }
  // }, [userInfo.isLogin, router])

  return (
    <div>
      <Head>
        <title>yogiyo</title>
        <meta name="description" content="clone yogiyo"></meta>
      </Head>
      {/* 로딩 유무 확인 - 로딩이 완료될 때 까지 스플래쉬 페이지 오픈 */}
      {isLoading ? 
        <SplashPage /> :

        // 로그인 유무 확인 - 비로그인 시 로그인 페이지 오픈
        userInfo.isLogin ? 
        <main className="flex flex-col w-full pt-[50px] pb-[70px]">
          <Header />
          <Homes />
          <Footer />
        </main> 
        :
        <LoginPage />
      }

    </div>
  );
}
