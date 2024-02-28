'use clinet'
import { useEffect, useState } from "react";
import { VscArrowUp } from "react-icons/vsc";

interface Props {
  bottom: number
}

// 클릭 시 최상단 스크롤로 가는 컴포넌트
const ScrollToTop = ({bottom}: Props) => {
  const [isVisible, setIsVisible] = useState(false); // 컴포넌트의 가시성 상태
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 100) { // 스크롤 위치가 100px 이상이면 버튼을 표시
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const handleScroll = () => {
    window.scrollTo(0,0);
  }

  return isVisible ? ( 
    <div 
      className={`w-[40px] h-[40px] fixed right-[20px] cursor-pointer z-50 bg-white rounded-full border-2 flex justify-center items-center`}
      style={{bottom: bottom+'px'}}
      onClick={handleScroll}
    >
      <VscArrowUp style={{fontSize: '20px'}}/>
    </div>
  ) : null;
};

export default ScrollToTop;