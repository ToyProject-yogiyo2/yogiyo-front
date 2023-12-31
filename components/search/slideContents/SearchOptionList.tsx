'use client';

import { useState } from 'react';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import { BsCheck } from 'react-icons/bs';
import { RiArrowGoBackFill } from 'react-icons/ri';

//menu 타입
type MenuKey = 'sort' | 'delFilter' | 'orderAmount';
interface SelectMenuState {
  target: MenuKey;
  list: string[];
}

const menu = {
  sort: ['주문 많은순', '리뷰 많은순', '거리 가까운순', '별점 높은순'],
  delFilter: ['배달요금', '무료', '무료 ~ 1000원', '무료 ~ 2000원', '무료 ~ 3000원'],
  orderAmount: ['최소주문금액', '5,000원 이하', '10,000원 이하', '12,000원 이하', '15,000원 이하'],
};

const SearchOptionList = () => {
  //메뉴 옵션 state
  const [sortState, setSortState] = useState(menu.sort[0]);
  const [delFilter, setDelFilter] = useState(menu.delFilter[0]);
  const [orderAmount, setOrderAmount] = useState(menu.orderAmount[0]);

  //드롭다운 메뉴 토글
  const [toggleDropDown, setToggleDropDown] = useState(false);
  //선택된 메뉴 state
  const [selectMenu, setSelectMenu] = useState<SelectMenuState>({
    target: 'sort',
    list: menu.sort,
  });

  //setter함수 하나로 합침
  const setMenuDropDown = (select: MenuKey) => {
    setToggleDropDown(!toggleDropDown);
    setSelectMenu({ target: select, list: menu[select] });
  };

  //토글될 드롭다운 메뉴 렌더링
  const dropDownMenu = (toggle: boolean, menu: any) => {
    const isSelected = (menuTarget: string, value: string) =>
      (menuTarget === 'sort' && value === sortState) ||
      (menuTarget === 'delFilter' && value === delFilter) ||
      (menuTarget === 'orderAmount' && value === orderAmount);

    if (toggle) {
      return (
        <div className="bg-white flex flex-col gap-4 sticky top-[150px] left-0 z-10 w-full pb-6 cursor-pointer ">
          {menu.list.map((value: string, i: number) => (
            <p
              key={i}
              onClick={() => {
                switch (menu.target) {
                  case 'sort':
                    setSortState(value);
                    break;
                  case 'delFilter':
                    setDelFilter(value);
                    break;
                  case 'orderAmount':
                    setOrderAmount(value);
                }

                setToggleDropDown(false);
              }}
              className={`px-4 py-1 flex justify-between ${
                isSelected(menu.target, value) ? 'text-black' : 'text-gray-400'
              }`}
            >
              {value}
              {isSelected(menu.target, value) ? <BsCheck style={{ fontSize: '1.5rem' }} /> : null}
            </p>
          ))}
        </div>
      );
    }
  };

  return (
    <>
      <div className="w-full py-[10px] overflow-hidden sticky top-[90px] left-0 z-10">
        <div className="no-scroll top-0 left-0 overflow-x-auto h-[50px] flex px-[20px] items-center gap-4 text-sm absoulte bg-white">
          {(sortState !== menu.sort[0] ||
            delFilter !== menu.delFilter[0] ||
            orderAmount !== menu.orderAmount[0]) && (
            <div
              onClick={() => {
                setSortState(menu.sort[0]),
                  setDelFilter(menu.delFilter[0]),
                  setOrderAmount(menu.orderAmount[0]);
              }}
              className={`px-[10px] py-[5px] border border-slate-800 rounded-2xl flex justify-center items-center gap-1 cursor-pointer whitespace-nowrap`}
            >
              <RiArrowGoBackFill />
              초기화
            </div>
          )}
          <div
            onClick={() => {
              setMenuDropDown('sort');
            }}
            className={`px-[10px] py-[5px] border border-slate-300 rounded-2xl flex justify-center items-center gap-1 cursor-pointer whitespace-nowrap 
              ${sortState !== menu.sort[0] && `bg-slate-900 text-white`}
            `}
          >
            {sortState}
            {toggleDropDown && selectMenu.target === 'sort' ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </div>
          <div
            onClick={() => {
              setMenuDropDown('delFilter');
            }}
            className={`px-[10px] py-[5px] border border-slate-300 rounded-2xl flex justify-center items-center gap-1 cursor-pointer whitespace-nowrap 
            ${delFilter !== menu.delFilter[0] && `bg-slate-900 text-white`}
            `}
          >
            {delFilter}
            {toggleDropDown && selectMenu.target === 'delFilter' ? (
              <IoIosArrowUp />
            ) : (
              <IoIosArrowDown />
            )}
          </div>
          <div
            onClick={() => {
              setMenuDropDown('orderAmount');
            }}
            className={`px-[10px] py-[5px] border border-slate-300 rounded-2xl flex justify-center items-center gap-1 cursor-pointer whitespace-nowrap 
            ${orderAmount !== menu.orderAmount[0] && `bg-slate-900 text-white`}
            `}
          >
            {orderAmount}
            {toggleDropDown && selectMenu.target === 'orderAmount' ? (
              <IoIosArrowUp />
            ) : (
              <IoIosArrowDown />
            )}
          </div>
        </div>
      </div>
      {dropDownMenu(toggleDropDown, selectMenu)}
      {toggleDropDown ? (
        <div
          onClick={() => {
            setToggleDropDown(false);
          }}
          className="w-full h-full fixed top-[100px] left-0 bg-black bg-opacity-10 z-90"
        ></div>
      ) : null}
      <style jsx>{`
        .no-scroll {
          -ms-overflow-style: none;
        }
        .no-scroll::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
};

export default SearchOptionList;
