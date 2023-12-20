'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import './slideStyles.css';

const slideStyle = {
  width: '100%',
  height: '200px',
  background: '#888',
};

const HeadSlider = () => {
  const dummy = new Array(4).fill({});
  return (
    <div className="relative">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{
          type: 'fraction',
        }}
        autoplay={{ delay: 3000 }}
        loop={true}
        className="detail_swiper"
      >
        {dummy?.map((img, i) => {
          return (
            <SwiperSlide style={slideStyle} key={i}>
              <div className="w-full h-full" />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default HeadSlider;
