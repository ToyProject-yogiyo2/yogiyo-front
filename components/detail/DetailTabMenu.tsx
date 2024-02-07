'use client'
import { shopApi } from '@/services/shopApi';
import { useState, useRef, useEffect } from 'react';
import type { ShopInfoType, MenuGroupType } from '@/types/types';
import MenuSlider from './MenuSlider';

interface Props {
  shopInfo?: ShopInfoType
}

const menuImgStyle = (url: string) => {
  if(!url){
    return {
      width: '27%',
      background: '#d82020',
      border: '1px solid #333',
      borderRadius: '20px'
    }
  }
  return {
    width: '27%',
    height: '80%',
    background: `url(${url}) no-repeat center center/cover`,
    border: '1px solid #333',
    borderRadius: '20px'
  }
}

const DetailTabMenu = ({shopInfo}: Props) => {
  // 테스트용 메뉴그룹 더미데이터
  const dummyMenu = new Array(10).fill('').map((_, i) => {
    return {
      id: i+1,
      name: i === 0 ? `대표메뉴` : `${i}번 메뉴그룹`,
      content: '메뉴그룹 테스트',
      menus: new Array(4).fill('').map((_, i) => {
        return {
          id: i+1,
          name: `${i+1}번 메뉴`,
          content: '메뉴 테스트',
          price: 1000,
          reviewNum: 100,
          picture: ''
        }
      })
    }
  });

  //실제 api로 받아올 메뉴그룹데이터
  const [menuGroups, setMenuGroups] = useState<MenuGroupType[]>([]);
  
  const parentRef = useRef<HTMLDivElement | null>(null);
  const childRef = useRef<HTMLDivElement | null>(null);
  const grandChildRef = useRef<{ [key: string]: HTMLDivElement }>({});

  const sectionRefs = useRef<{ [key: string]: HTMLDivElement }>({});

  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const observer = useRef<IntersectionObserver | null>(null);
  
  useEffect(() => {
    //데이터 fetch
    const fetchData = async () => {
      if(shopInfo){
        try {
          const result = await shopApi.getShopMenuGroup(shopInfo?.id)
          setMenuGroups(result.menuGroups)
          console.log(result)
        } catch (error) {
          console.error('컴포넌트 에러', error);
        }
      }
    };
    fetchData();
  }, [shopInfo])

  useEffect(() => {
    // IntersectionObserver 인스턴스 생성
    observer.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const foundMenu = Object.keys(sectionRefs.current)
          .find(menu => sectionRefs.current[menu] === entry.target);
          console.log(foundMenu)
          if (foundMenu) {
            setActiveMenu(foundMenu);
            handleGrandchildScroll(foundMenu);
          }
        }
      });
    }, { threshold: 0.9});

    // 섹션을 observer에 등록
    Object.values(sectionRefs.current).forEach(section => {
      if (section && observer.current) {
        observer.current.observe(section);
      }
    });

    // 컴포넌트 언마운트 시 observer 해제
    return () => {
      if (observer.current) {
        Object.values(sectionRefs.current).forEach(section => {
          if (section && observer.current) {
            observer.current.unobserve(section);
          }
        });
      }
    };
  }, [])

  const handleGrandchildScroll = (menu: string) => {
    if (parentRef.current && childRef.current) {
      let grandchildRect: any;
      let parentRect: any;

      // 스크롤로 메뉴 이동할 경우
      grandchildRect = grandChildRef.current[menu].getBoundingClientRect();
      parentRect = parentRef.current.getBoundingClientRect();
      
      const childCurrentScroll = childRef.current.scrollLeft;

      const tabHeader = sectionRefs.current[menu].offsetTop - 100

      //메뉴를 화면 좌측으로 옮기기 위한 계산
      const scrollAmount = childCurrentScroll + grandchildRect.left - parentRect.left - 10;

      childRef.current.scrollTo({
        left: scrollAmount,
      });

      window.scrollTo({
        top: tabHeader,
      })

    }
  };

  const handleGrandchildClick = (menu: string) => {
      const tabHeader = sectionRefs.current[menu].offsetTop - 85
      window.scrollTo({
        top: tabHeader,
      })
  };


  return (
    // 탭메뉴 영역
    <div className=''>
      <div ref={parentRef} className="w-full sticky top-[50px] left-0 overflow-hidden z-10 border-y-[1px] py-[8px] bg-white">
        <div
          ref={childRef}
          className="no-scroll top-0 left-0 overflow-x-auto h-[30px] flex px-[20px] items-center gap-4 text-sm absoulte bg-white"
        >
          {dummyMenu?.map((menuGroup, i) => (
            <p
              ref={el => {if(el) grandChildRef.current[menuGroup?.name] = el;}} 
              className={`flex text-[1rem] items-center whitespace-nowrap cursor-pointer p-[5px] ${
                activeMenu === menuGroup?.name ? 'bg-black text-white rounded-3xl font-bold' : ''
              }`}
              onClick={() => {
                handleGrandchildClick(menuGroup?.name)
                console.log(menuGroup?.name)
              }}
              key={i}
            >
              {menuGroup?.name}
            </p>
          ))}
        </div>
      </div>

      {/* 메뉴 리스트 영역 */}
      <div>
        {dummyMenu.map((menuGroup, i) => {
          // 대표메뉴일 경우
          if(i === 0){
            return (
              <div 
                key={i}
                ref={el => {if(el) sectionRefs.current[menuGroup?.name] = el;}} 
                className='bg-yogrey6 h-[300px] p-4'
              >
                <p className='text-[1.3rem] font-bold py-2'>대표메뉴</p>
                <MenuSlider menus={menuGroup.menus}/>
              </div>
            )
          }
          return (
            <>
              <div 
                key={i}
                ref={el => {if(el) sectionRefs.current[menuGroup?.name] = el;}} 
                className='px-4 py-6'
              >
                <p className='text-[1.3rem] font-bold pt-2 pb-6'>{menuGroup?.name}</p>
                {menuGroup.menus?.map((menu, i) => (
                  <div 
                    key={i}
                    className='flex gap-4 py-[20px] border-b'
                  >
                    <div className='flex-1 flex flex-col gap-2'>
                      <p className='font-bold'>{menu.name}</p>
                      <p className='text-[0.8rem] text-slate-400'>{menu.content}</p>
                      <p className='text-[0.8rem]'>리뷰 ({menu.reviewNum})</p>
                      <p className='font-bold'>{(menu.price).toLocaleString()}<span className='font-normal'>원</span></p>
                    </div>
                    <div style={menuImgStyle(menu.picture)}/>
                  </div>
                ))}
              </div>
              <div className='bg-yogrey6 h-2' />
            </>
          )
        })}
      </div>
      <style jsx>{`
        .no-scroll {
          -ms-overflow-style: none;
        }
        .no-scroll::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default DetailTabMenu