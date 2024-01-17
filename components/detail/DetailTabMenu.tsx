'use client'
import { useState, useRef, useEffect } from 'react';

const DetailTabMenu = () => {
  const dummyMenu = new Array(10).fill('').map((_, i) => i+'번 메뉴')
  
  const parentRef = useRef<HTMLDivElement | null>(null);
  const childRef = useRef<HTMLDivElement | null>(null);

  const sectionRefs = useRef<{ [key: string]: HTMLDivElement }>({});

  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // IntersectionObserver 인스턴스 생성
    observer.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const foundMenu = Object.keys(sectionRefs.current).find(menu => sectionRefs.current[menu] === entry.target);
          if (foundMenu) {
            setActiveMenu(foundMenu);
          }
        }
      });
    }, { threshold: 0.1 });

    // 섹션을 observer에 등록
    Object.values(sectionRefs.current).forEach(section => {
      if (section && observer.current) {
        observer.current.observe(section); // observer.current가 null이 아닐 때만 observe 호출
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
  }, [activeMenu])


  const handleGrandchild = (event: React.MouseEvent<HTMLDivElement> | null, menu: string) => {
    if (parentRef.current && childRef.current) {
      let grandchildRect: any;
      let parentRect: any;

      //클릭이벤트로 메뉴 이동할 경우
      if (event) {
        grandchildRect = event.currentTarget.getBoundingClientRect();
        parentRect = parentRef.current.getBoundingClientRect();
      } else {
        // const grandchild = Array.from(childRef.current.children).find(
        //   (child) => child.textContent === queryMenu,
        // );
        // if (grandchild) {
        //   grandchildRect = grandchild.getBoundingClientRect();
        //   parentRect = parentRef.current.getBoundingClientRect();
        // }
      }

      const childCurrentScroll = childRef.current.scrollLeft;

      //메뉴를 화면 좌측으로 옮기기 위한 계산
      const scrollAmount = childCurrentScroll + grandchildRect.left - parentRect.left;
      // const menuScrollAmout =  window.scrollYOffset + rect.top - 80;

      childRef.current.scrollTo({
        left: scrollAmount,
        // behavior: 'smooth',
      });
      sectionRefs.current[menu]?.scrollTo({
        // top: 
      });
    }
  };




  return (
    // 탭메뉴 영역
    <div className='p-2'>
      <div ref={parentRef} className="w-full sticky top-[50px] left-0 overflow-hidden z-10">
        <div
          ref={childRef}
          className="no-scroll top-0 left-0 overflow-x-auto h-[30px] flex px-[20px] items-center gap-4 text-sm absoulte bg-white"
        >
          {dummyMenu.map((menu, i) => (
            <p
              className={`flex text-[1rem] items-center whitespace-nowrap cursor-pointer font-bold ${
                activeMenu === menu ? 'bg-black' : ''
              }`}
              onClick={(e) => {handleGrandchild(e, menu)}}
              key={i}
            >
              {menu}
            </p>
          ))}
        </div>
      </div>

      {/* 대표메뉴 영역 */}
      <div>
        대표메뉴에용
      </div>

      {/* 메뉴 리스트 영역 */}
      <div>
        {
        dummyMenu.map((menu, i) => {
          return (
            <>
              <div ref={el => {
                if (el) {
                  sectionRefs.current[menu] = el;
                }
              }} />
              <p key={i} className='h-[500px]'>{menu}</p>
            </>

          )
        })
          
        }
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