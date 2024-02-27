'use client'
import { useState, useEffect } from "react";
import { shopApi } from "@/services/shopApi";
import { useRecoilValue, useRecoilState } from "recoil";
import { addMenu } from "@/recoil/state";
import { foodModalState } from "@/recoil/modal";
import { SlArrowLeft } from "react-icons/sl";
import CustomCheckbox from "@/components/common/CustomCheckBox";
import { orderAtom } from "@/recoil/order";

const FoodDetail = ({shopId}: any) => {

  // 주문 상태값
  const [order, setOrder] = useRecoilState(orderAtom);
  // 수량
  const [quantity, setQuantity] = useState(1);

  const menu = useRecoilValue(addMenu);
  const [isModal, setIsModal] = useRecoilState(foodModalState);

  const [options, setOptions] = useState();
  const [filOptions, setFilOptions] = useState<any>();

  const imgStyled = {
    background: `url(${menu?.picture}) center center/cover no-repeat`,
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
        if(shopId){
          const result = await shopApi.getShopOptionGroup(shopId);
          setOptions(result.menuOptionGroups);
        }
      } catch (error){
        console.error(error);
      }
    }
    fetchData()
  }, [shopId])

  useEffect(() => {
    //모달이 오픈될 때 전체 스크롤 막기(모달만 스크롤 될 수 있도록)
    const body = document.body;
    if (isModal) {
      body.classList.add('no-scroll');
    } else {
      body.classList.remove('no-scroll');
    }

    // 가게의 옵션 중 메뉴와 해당되는 옵션 찾기
    const filteredOptions = dummyOption.filter(option =>
      option.menus.some(possibleMenu => possibleMenu === menu.name)
    );
    setFilOptions(filteredOptions)
    
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
    }else{
    // 옵션 제외됐을 때
      const filterOptions = addOrderOptions.filter((option: any) => 
        // !(option.id === select.id)
        option.optionName !== select.content
      )
      setAddOrderOptions(filterOptions)
    }
  };

  const handleAddOrder = () => {
    setOrder({
      ...order,
      orderItems: [
        ...order.orderItems, {
          menuId: menu.id,
          menuName: menu.name,
          price: menu.price,
          orderItemOptions: addOrderOptions,
          quantity: quantity
        }
      ]
    })
    setIsModal(false)
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
        <p className="font-black text-[1.4rem] text-slate-700">{menu.name}</p>
        <p className="text-slate-400">{menu.content}</p>
      </div>


      <div className="flex px-[20px] justify-between border-b p-[10px]">
        <span className="font-bold text-[1.1rem]">가격</span>
        <span className="font-bold text-[1.1rem]">{menu.price.toLocaleString()}원</span>
      </div>

      <div className="w-full h-[1px] bg-slate-200" />


      <div className="px-[20px]">
      {dummyOption?.map((option, i) => (
        <div className="w-full mb-[20px] border-b pb-[10px]" key={i}>
          <div className="flex justify-between py-[10px]">
            <span className="font-bold text-[1.1rem]">{option.name}</span>
            {option.isPossibleCount && <span className="text-[0.8rem]">최대 {option.count}개 선택 가능</span>}
          </div>
          {option?.menuOptions.map((select, i) => (
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
      <div className="flex px-[20px] justify-between border-b pb-[20px]">
        <span className="font-bold text-[1.1rem]">수량</span>
        <span className="font-bold text-[1.1rem]">{quantity}</span>
      </div>
      <div className="bg-slate-400 mb-[100px]">
        <span>총 주문금액</span>
        <span>{}원</span>
        <p>배달 최소주문금액 {}</p>
      </div>
      <div 
        className="fixed bottom-0 left-0 w-full h-[100px] bg-white"
        onClick={handleAddOrder}
      >
        담기
      </div>
    </div>
  )
};

export default FoodDetail;