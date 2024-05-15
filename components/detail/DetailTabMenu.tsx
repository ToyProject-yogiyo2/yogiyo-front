'use client'
import { shopApi } from '@/services/shopApi';
import { useState, useRef, useEffect } from 'react';
import type { ShopInfoType, MenuGroupType } from '@/types/types';
import MenuSlider from './MenuSlider';
import { RiArrowDownSLine } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { useRecoilState } from 'recoil';
import { foodModalState } from '@/recoil/modal';

interface Props {
  shopInfo?: ShopInfoType,
  handleThisMenu: (param: number) => void;
}

const menuImgStyle = (url: string) => {
  if(!url){
    return {
    //   width: '27%',
    //   background: '#eccece',
    //   border: '1px solid #333',
    //   borderRadius: '20px'
      width: '0',
      height: '0'
    }
  }
  return {
    width: '27%',
    // height: '80%',
    background: `url(${url}) no-repeat center center/cover`,
    border: '1px solid #333',
    borderRadius: '20px'
  }
}

const DetailTabMenu = ({shopInfo, handleThisMenu}: Props) => {

  // 테스트용 메뉴그룹 더미데이터
  const dummyData = new Array(10).fill('').map((_, i) => {
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
          picture: '/images/yogiyo-logo.jpg'
        }
      })
    }
  });

  //음식 상세페이지 모달 state
  const [isModal, setIsModal] = useRecoilState(foodModalState);

  //실제 api로 받아올 메뉴그룹데이터
  const [menuGroups, setMenuGroups] = useState<MenuGroupType[]>([]);
  
  const totalRef = useRef<HTMLDivElement | null>(null);
  const parentRef = useRef<HTMLDivElement | null>(null);
  const childRef = useRef<HTMLDivElement | null>(null);
  const grandChildRef = useRef<{ [key: string]: HTMLDivElement }>({});

  const sectionRefs = useRef<{ [key: string]: HTMLDivElement }>({});

  const [activeMenu, setActiveMenu] = useState<string | null>(null);


  const handleGrandchildScroll = (menu: string) => {
    if (parentRef.current && childRef.current) {
      let grandchildRect: any;
      let parentRect: any;

      // 스크롤로 메뉴 이동할 경우
      grandchildRect = grandChildRef.current[menu].getBoundingClientRect();
      parentRect = parentRef.current.getBoundingClientRect();
      
      const childCurrentScroll = childRef.current.scrollLeft;

      //메뉴를 화면 좌측으로 옮기기 위한 계산
      const scrollAmount = childCurrentScroll + grandchildRect.left - parentRect.left - 10;

      childRef.current.scrollTo({
        left: scrollAmount,
      });
    }
  };

  const handleGrandchildClick = (menu: string) => {
      const tabHeader = sectionRefs.current[menu].offsetTop - 85
      window.scrollTo({
        top: tabHeader,
      })
  };
  
  useEffect(() => {
    //데이터 fetch
    const fetchData = async () => {
      if(shopInfo){
        try {
          const result = await shopApi.getShopMenuGroup(shopInfo?.id)
          // 받아온 메뉴그룹 데이터가 없을 경우 더미데이터 사용
          if(result.length === 0){
            setMenuGroups(dummyData)
          }else{
            setMenuGroups(result)
          }
          console.log(result)
        } catch (error) {
          console.error('컴포넌트 에러', error);
        }
      }
    };
    fetchData();
  }, [shopInfo])

  const [positions, setPositions] = useState<number[]>([]);

  useEffect(() => {
    //메뉴그룹 순회한 후 각 Ref의 위치값 저장
    let positions: number[] = []
    menuGroups.forEach((menuGroup) => {
      const name = menuGroup.name
      const sectionScroll = sectionRefs.current[name].getBoundingClientRect().top;
      positions.push(sectionScroll);
    })
    setPositions(positions);
  }, [])

  useEffect(() => {
    // 쓰로틀링 구현
    let timeoutId : NodeJS.Timeout | null = (null);

    // 스크롤 이동 시 메뉴탭 이동 및 hover효과
    const handleScroll = () => {
      if(timeoutId === null){
        timeoutId = setTimeout(() => {
          const currentScrollPosition = window.scrollY + 150;
          positions.forEach((_, i) => {
            if(currentScrollPosition >= positions[i] && currentScrollPosition <= positions[i+1]){
              setActiveMenu(menuGroups[i].name);
              handleGrandchildScroll(menuGroups[i].name)
            }else if(positions.length - 1 === i && currentScrollPosition >= positions[i]){
              // 마지막 요소일 떄
              setActiveMenu(menuGroups[i].name);
              handleGrandchildScroll(menuGroups[i].name)
            }
          })
          clearTimeout(timeoutId as NodeJS.Timeout);
          timeoutId = null;
        }, 100);
      }
    };
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [positions])

  const [isFullMenu, setIsFullMenu] = useState(false);
  const handleFullMenu = () => {
    const offsetTop = totalRef.current?.offsetTop as number - 60
    if(window.scrollY < offsetTop){
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })
    }

    console.log(offsetTop)
    setIsFullMenu(!isFullMenu)
  }
  console.log(menuGroups)
  return (
    <div className='' ref={totalRef}>
      {/* 탭메뉴 영역 */}
      {!isFullMenu && <div ref={parentRef} className="w-full sticky top-[50px] left-0 overflow-hidden z-10 border-y-[1px] py-[8px] pr-[50px] bg-white">
        <div
          ref={childRef}
          className="no-scroll top-0 left-0 overflow-x-auto h-[30px] flex px-[20px] items-center gap-4 text-sm absoulte bg-white"
        >
          {menuGroups?.map((menuGroup, i) => (
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
          {/* 전체메뉴 누르는 버튼 */}
          <div
            className='absolute right-0 top-0 w-[50px] h-full bg-white flex justify-center items-center'
            // onClick={() => setIsFullMenu(!isFullMenu)}
            onClick={() => handleFullMenu()}
          >
            <div className='absolute w-[1px] h-[60%] top-[10px] left-[2px] bg-slate-200 cursor-pointer'/>
            <RiArrowDownSLine style={{fontSize: '2rem'}}/>
          </div>
        </div>
      </div>}
      
      {/* 풀 메뉴 영역 */}
      {isFullMenu && <div className='fixed top-[50px] left-0 z-20 w-full' style={{height: '100vh'}}>
        <p className='bg-grey9 flex justify-between w-full font-bold text-[1.2rem] p-[10px]'>
          카테고리 전체보기
          <IoMdClose 
            style={{fontSize: '1.5rem'}}
            onClick={() => setIsFullMenu(!isFullMenu)}
          />
        </p>
        <div className='flex flex-wrap gap-3 bg-grey9 p-[10px] pb-[20px]'>
        {menuGroups?.map((menuGroup, i) => (
          <span 
            key={i}
            className={`p-[7px] rounded-3xl 
              ${activeMenu === menuGroup?.name ? 'bg-black text-white font-bold' : 'bg-white text-black'} 
            `}
            onClick={() => {
              handleGrandchildClick(menuGroup?.name)
              setIsFullMenu(!isFullMenu)
            }}
          >{menuGroup.name}</span>
        ))}
        </div>
        <div 
          onClick={() => setIsFullMenu(!isFullMenu)}
          className='p-[10px] h-full boder-b bg-black opacity-60' 
        />
      </div>}

      {/* 메뉴 리스트 영역 */}
      <div>
        {menuGroups.map((menuGroup, i) => {
          // 대표메뉴일 경우
          if(i === 0){
            return (
              <div 
                key={i}
                ref={el => {if(el) sectionRefs.current[menuGroup?.name] = el;}} 
                className='bg-grey9 h-[300px] p-4 relative'
              >
                <div
                  className='absolute top-[0%] left-[50%]'
                />
                <p className='text-[1.3rem] font-bold py-2'>대표메뉴</p>
                <MenuSlider menus={menuGroup.menus} shopId={shopInfo?.id} handleThisMenu={handleThisMenu}/>
              </div>
            )
          }
          return (
            <>
              <div 
                key={i}
                ref={el => {if(el) sectionRefs.current[menuGroup?.name] = el;}} 
                className='px-4 py-6 relative'
              >
                <div
                  className='absolute top-[0%] left-[50%]'
                />
                <p className='text-[1.3rem] font-bold pt-2 pb-6'>{menuGroup?.name}</p>
                {menuGroup.menus?.map((menu, i) => (
                  <div 
                    key={i}
                    className='flex gap-4 py-[20px] border-b'
                    onClick={() => {
                      setIsModal(true);
                      handleThisMenu(menu.id)
                    }}
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
              <div className='bg-grey9 h-2' />
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