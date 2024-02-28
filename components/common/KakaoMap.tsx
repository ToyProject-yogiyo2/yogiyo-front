'use client';
import { useEffect } from 'react';
import { currentCoord } from '@/recoil/address';
import { useRecoilValue } from 'recoil';

const KakaoMap = () => {
  const curCoord = useRecoilValue(currentCoord);

  useEffect(() => {
    if (!curCoord) return;

    const { kakao } = window;
    kakao.maps?.load(() => {
      let container = document.getElementById('map');
      let options = {
        center: new kakao.maps.LatLng(curCoord.lat, curCoord.lng),
        level: 3,
      };

      let map = new kakao.maps.Map(container, options);
      map.setZoomable(false);
    });
  }, [curCoord]);

  return (
    <div className="w-full flex flex-col items-center justify-center p-4">
      <div className="w-full h-[25vh] sm:h-[40vh] md:h-[50vh] lg:h-[60vh] border rounded-3xl overflow-hidden">
        <div id="map" style={{ width: '100%', height: '100%' }}></div>
      </div>
    </div>
  );
};

export default KakaoMap;
