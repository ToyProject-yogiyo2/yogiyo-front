'use client';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import './slideStyles.css';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { foodModalState } from '@/recoil/modal';
import FoodDetail from './foodDetail/FoodDetail';
import { addMenu } from '@/recoil/state';

const slideStyle = {
  width: '170px',
  height: '200px',
  background: '#fff',
  borderRadius: '20px',
  overflow: 'hidden'
};

interface Props {
  menus: {
    id: number,
    name: string,
    content: string,
    price: number,
    reviewNum: number,
    picture: string
  }[],
  shopId: number | undefined
}

const bgStyle = (url: string) => {
  if(!url){
    return {
      background: '#312c2c'
    }
  }
  return {
    background: `url(${url}) no-repeat center center/cover`
  }
}

const MenuSlider = ({menus, shopId}: Props) => {

  const [isModal, setIsModal] = useRecoilState(foodModalState);
  const setAddMenu = useSetRecoilState(addMenu);

  return (
    <div className="relative">
      <Swiper
        spaceBetween={10}
        slidesPerView='auto'
        loop={false}
      >
        {menus?.map((menu, i) => {
          return (
            <SwiperSlide 
              style={slideStyle} 
              key={i}
              onClick={() => {
                setIsModal(true);
                setAddMenu(menu);
              }}
            >
              {/* 음식상세페이지 모달*/}
              {/* {isModal && <FoodDetail shopId={shopId} menu={menu}/>} */}
              <div className="w-full h-[70%]" style={bgStyle(menu.picture)} />
              <div className='h-[30%] flex flex-col justify-center px-4'>
                <p className='font-bold'>{menu.name}</p> 
                <p className=''>{(menu.price).toLocaleString() + '원'}</p> 
              </div>

            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default MenuSlider;
