'use client';
import { BiHomeAlt, BiSearch } from 'react-icons/bi';
import { AiOutlineHeart } from 'react-icons/ai';
import { LuNewspaper } from 'react-icons/lu';
import { RiContactsLine } from 'react-icons/ri';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

//path경로 맞는지 검사
const isFirstRootHome = (pathname: string, currentPath: string) => {
  const match = pathname.match(/^\/([^/]+)/);
  const currentMatch = currentPath.match(/^\/([^/]+)/);
  if (match && currentMatch) {
    if (match[0] === currentMatch[0]) {
      return true;
    }
  }
  return false;
};

const Footer = () => {
  const footerList = ['홈', '찜', '검색', '주문내역', '마이요기요'];
  const routerPath = ['/home', '/pick', '/search', '/order/list', '/mypage'];
  const iconList = [BiHomeAlt, AiOutlineHeart, BiSearch, LuNewspaper, RiContactsLine];
  const pathname = usePathname();
  return (
    <div className="w-full h-[70px] border-t border-slate-300 bg-white flex fixed left-0 bottom-0 z-10">
      {footerList.map((name, i) => {
        const IconComponent = iconList[i];
        return (
          <Link
            href={routerPath[i]}
            className={`w-[20%] flex flex-col gap-1 justify-center items-center py-[15px] ${
              // 현재 페이지 경로가 footer의 Icon과 같거나, || 최상위 도메인 Home이거나 를 만족할 때 해당 Footer Icon 색상 변경
              isFirstRootHome(pathname, routerPath[i]) || (pathname === '/' && i === 0)
                ? 'text-black'
                : 'text-slate-500'
            }`}
            key={i}
          >
            <IconComponent style={{ fontSize: '1.4rem' }} />
            <span className="text-[0.8rem]">{name}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default Footer;
