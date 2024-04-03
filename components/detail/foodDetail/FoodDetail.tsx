'use client'
import { useState, useEffect } from "react";
import { shopApi } from "@/services/shopApi";
import { useRecoilState } from "recoil";
import { foodModalState } from "@/recoil/modal";
import { SlArrowLeft } from "react-icons/sl";
import CustomCheckbox from "@/components/common/CustomCheckBox";
import { orderAtom } from "@/recoil/order";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import Swal from "sweetalert2";
import { moneyCalc } from "@/lib/moneyCalc";
import { totalPriceCalc } from "@/lib/totalPriceCalc";
import type { DetailMenuType } from "@/types/types";

const FoodDetail = ({shop, thisMenu}: any) => {

  // 메뉴 상세 정보
  const [menuInfo, setMenuInfo] = useState<DetailMenuType>({
    id: 1,
    name: '',
    content: '',
    picture: '',
    price: 0,
    reviewNum: 0,
    optionGroups: [{
      id: 1,
      name: '',
      count: 0,
      optionType: '',
      options: [{
        id: 1,
        content: '',
        price: 0
      }],
      possibleCount: false
    }],
  });
  // 메뉴
  // const menu = useRecoilValue(addMenu);
  // 주문 상태값
  const [order, setOrder] = useRecoilState(orderAtom);
  // 수량
  const [quantity, setQuantity] = useState(1);
  // 중간가격
  const [middlePrice, setMiddlePrice] = useState(menuInfo?.price || 0);
  // 옵션총합
  const [optionPrice, setOptionPrice] = useState(0);

  const [isModal, setIsModal] = useRecoilState(foodModalState);

  const [filOptions, setFilOptions] = useState<any>();

  const imgStyled = {
    background: `url(${menuInfo?.picture}) center center/cover no-repeat`,
  }

  // 더미옵션
  const dummyOption = new Array(5).fill('').map((_, i) => {
    const randomNum = Math.floor(Math.random() * 5) + 1
    return {
      id: i,
      name: '옵션그룹' + i,
      position: i,
      count: randomNum,
      optionType: 'OPTIONAL',
      visible: 'SHOW',
      menuOptions: new Array(5).fill('').map((_, j) => {
        return {
          "id" : i.toString() + j,
          "content" : '옵션' + i.toString() + j,
          "price" : 1000,
          "position" : 1,
          "visible" : "SHOW"
        }
      }),
      menus: ['메뉴1', '메뉴2'],
      isPossibleCount: true
    }
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        if(thisMenu){
          const result = await shopApi.getMenuInfo(thisMenu);
          setMenuInfo(result);
        }
      } catch (error){
        console.error(error);
      }
    }
    fetchData()
  }, [shop])

  useEffect(() => {
    //모달이 오픈될 때 전체 스크롤 막기(모달만 스크롤 될 수 있도록)
    const body = document.body;
    if (isModal) {
      body.classList.add('no-scroll');
    } else {
      body.classList.remove('no-scroll');
    }

    // 가게의 옵션 중 메뉴와 해당되는 옵션 찾기
    // const filteredOptions = dummyOption.filter(option =>
    //   option.menus.some(possibleMenu => possibleMenu === menu.name)
    // );
    // setFilOptions(filteredOptions);
    
    // 옵션 초기화
    setAddOrderOptions([]);
  
    // 컴포넌트가 언마운트될 때 클래스를 제거.
    return () => {
      body.classList.remove('no-scroll');
    };
  }, [])

  //체크박스 상태값들
  const [checkedState, setCheckedState] = useState<{ [key: string]: boolean }>({});

  //주문 옵션값들
  interface OrderOption {
    optionName: string;
    price: number;
  }
  const [addOrderOptions, setAddOrderOptions] = useState<OrderOption[]>([]);

  // 체크박스 변경 핸들러
  const handleCheckboxChange = (select: any) => {
    setCheckedState(prevState => ({
      ...prevState,
      [select.id]: !prevState[select.id], // 체크 상태 토글
    }));

    if(!checkedState[select.id]){
      // 옵션 추가됐을 때
      setAddOrderOptions((prevOptions: any) => [
        ...prevOptions,
        {
          optionName: select.content,
          price: select.price
        }
      ]);

      setOptionPrice(prev => prev + select.price);
    }else{
    // 옵션 제외됐을 때
      const filterOptions = addOrderOptions.filter((option: any) => 
        // !(option.id === select.id)
        option.optionName !== select.content
      )
      setAddOrderOptions(filterOptions)
      setOptionPrice(prev => prev - select.price);
    }

    setMiddlePrice(moneyCalc(menuInfo?.price || 0, optionPrice, quantity))
  };
  


  const handleAddOrder = () => {
    const addOrder = () => {
      const newOrderItem = {
        menuId: menuInfo?.id,
        menuName: menuInfo?.name,
        price: menuInfo?.price,
        orderItemOptions: addOrderOptions,
        quantity: quantity,
      };
      const newTotalPrice = totalPriceCalc([...order.orderItems, newOrderItem]);
  
      setOrder({
        ...order,
        shopId: shop.id,
        orderItems: [...order.orderItems, newOrderItem],
        totalPrice: newTotalPrice,
      });
      setIsModal(false)
    }

    // 담긴 메뉴가 존재하고, 현재 가게와 다른 가게일 때
    if(order.orderItems.length > 0 && order.shopId !== shop.id){
      Swal.fire({
        title: "요기요",
        html: '장바구니에 담긴 메뉴를 취소하고 새로운 가게에서 주문하시겠어요?',
        showCancelButton: true,
        confirmButtonText: "예",
        cancelButtonText: "아니요",
        confirmButtonColor: '#000'
      }).then((result) => {
        if (result.isConfirmed) {
          const newOrderItem = {
            menuId: menuInfo?.id,
            menuName: menuInfo?.name,
            price: menuInfo?.price,
            orderItemOptions: addOrderOptions,
            quantity: quantity,
          };
          const newTotalPrice = totalPriceCalc([newOrderItem]);

          setOrder({
            ...order,
            shopId: shop.id,
            orderItems: [newOrderItem],
            totalPrice: newTotalPrice,
          });

          setIsModal(false)
        }
      });
    }else{
      addOrder()
    }
  }

  return (
    <div 
      className="w-full h-full fixed top-0 left-0 z-50 flex flex-col gap-[10px] bg-white"
      style={{overflowY: 'auto'}}
    >
      <i className="p-[16px] cursor-pointer absolute top-0 left-0" onClick={() => setIsModal(false)}>
        <SlArrowLeft style={{fontSize: '1.4rem', color: '#000' }} />
      </i>
      <div className="">
        <div className="w-full h-[200px]" style={imgStyled} />
        <p className="text-center bg-slate-100 py-[2px] text-slate-400">위 사진은 연출된 사진으로, 실제와 다를 수 있습니다.</p>
      </div>
      {/* 리뷰 및 메뉴이름&메뉴설명 */}
      <div className="flex flex-col gap-[3px] px-[20px] py-[20px] border-b-2">
        <p className="font-black text-[1.4rem] text-slate-700">{menuInfo?.name}</p>
        <p className="text-slate-400">{menuInfo?.content}</p>
      </div>


      <div className="flex px-[20px] justify-between border-b p-[10px]">
        <span className="font-bold text-[1.1rem]">가격</span>
        <span className="font-bold text-[1.1rem]">{menuInfo?.price.toLocaleString()}원</span>
      </div>

      <div className="w-full h-[1px] bg-slate-200" />


      <div className="px-[20px]">
      {menuInfo && menuInfo.optionGroups?.map((option, i) => (
        <div className="w-full mb-[20px] border-b pb-[10px]" key={i}>
          <div className="flex justify-between py-[10px]">
            <span className="font-bold text-[1.1rem]">{option.name}</span>
            {option.possibleCount && <span className="text-[0.8rem]">최대 {option.count}개 선택 가능</span>}
          </div>
          {option?.options.map((select, i) => (
            <label 
              htmlFor={select.id.toString()} 
              key={i}
              className="w-full flex cursor-pointer mb-[10px]"
              onClick={() => handleCheckboxChange(select)}
            >
              <CustomCheckbox 
                checked={checkedState[select.id]} 
              />
              <span>{select.content}</span>
              <span className="ml-[auto]">+{select.price.toLocaleString()}원</span>
            </label>
          ))}
        </div>
      ))}
      </div>
      <div className="flex px-[20px] gap-[20px] justify-between pb-[20px]">
        <span className="font-bold text-[1.1rem] mr-[auto]">수량</span>
        <div
          className="text-[2rem] text-slate-300"
          onClick={() => {
            setQuantity((prev) => {
              if((prev - 1) < 1){
                return 1
              }else{
                return prev - 1
              }
            })
            setOrder({
              ...order,
              totalPrice: order.totalPrice * quantity
            })
          }}
        >
          <CiCircleMinus />
        </div>
        <span className="font-bold text-[1.1rem]">{quantity}</span>
        <div
          className="text-[2rem]"
          onClick={() => {
            setQuantity((prev) => prev + 1)
            setOrder({
              ...order,
              totalPrice: order.totalPrice * quantity
            })
          }}
        >
          <CiCirclePlus />
        </div>
      </div>
      <div className="flex justify-between flex-wrap bg-grey7 p-[20px] mb-[100px]">
        <span className="font-bold text-[1.1rem]">총 주문금액</span>
        <span className="font-black text-[1.3rem] text-red-600">{(moneyCalc(menuInfo?.price || 0, optionPrice, quantity)).toLocaleString()}원</span>
        <p className="w-full text-end text-[0.9rem] text-slate-700">(배달 최소주문금액 {(shop?.minOrderPrice|0).toLocaleString()}원)</p>
      </div>

      <div 
        className='fixed z-50 bottom-0 left-0 w-full px-[20px] h-[100px] flex flex-col gap-[10px] justify-center items-center bg-white border-t rounded-t-xl'
        onClick={handleAddOrder}
      >
        <p className="font-semibold text-red-600">{shop?.minOrderPrice.toLocaleString()}원부터 배달 가능해요</p>
        <p className='w-full flex justify-center gap-[5px] py-[10px] mx-[10px] rounded-xl bg-pink1 font-bold text-white'>
          {(moneyCalc(menuInfo?.price || 0, optionPrice, quantity)).toLocaleString()}원 담기
        </p>
      </div>
    </div>
  )
};

export default FoodDetail;