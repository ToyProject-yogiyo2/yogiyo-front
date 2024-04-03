'use client';
import { useEffect, useState } from 'react';
import { postOrder } from '@/services/orderAPI';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userInfoAtom } from '@/recoil/state';

import { HiOutlineHome } from 'react-icons/hi';
import { HiOutlineChevronRight } from 'react-icons/hi2';
import { FiPlus } from 'react-icons/fi';
import { LuPlus, LuMinus, LuX } from 'react-icons/lu';

import { Order, Handler } from '@/types/types';
import { shopApi } from '@/services/shopApi';
import { useRouter } from 'next/navigation';

import { orderAtom, orderDetailCursor, orderItemsWithPriceSelector, pricesSelector } from '@/recoil/order';

import { thisAddressId } from '@/recoil/address';

const OrderPage = () => {
  const thisAddId = useRecoilValue(thisAddressId);
  const orderItemsWithPrice = useRecoilValue(orderItemsWithPriceSelector);
  const prices = useRecoilValue(pricesSelector);

  const router = useRouter();
  const userInfo = useRecoilValue(userInfoAtom);
  const [bill, setBill] = useRecoilState(orderAtom);
  const [cursor, setCursor] = useRecoilState(orderDetailCursor);

  const getShopInfoAsync = async (param: {
    shopId: number;
    code: number;
    latitude: number;
    longitude: number;
  }) => {
    const result = await shopApi.getShopInfo(param);
    setBill({ ...bill, shopName: result.name, deliveryTime: result.deliveryTime });
  };

  useEffect(() => {
    if (userInfo.isLogin) {
      const param = {
        shopId: bill.shopId,
        code: thisAddId.code,
        latitude: thisAddId.latitude,
        longitude: thisAddId.longitude,
      };
      getShopInfoAsync(param);
    } else {
      console.log('로그아웃 상태입니다.');
      router.push('/');
    }
  }, []);

  const handleGetOrder = async () => {
    const { deliveryTime, shopName, ...newbill} = bill;
    const res = await postOrder(newbill);
    if(res.status >= 200 && res.status < 300){
      setCursor(`${res.data.orderId}`)
      router.push(`/order/detail/${res.data.orderId}`)
    }else{
     console.log('주문 오류!')
    }
    console.log(res)
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checkboxID = e.target.id;
    switch (checkboxID) {
      case 'checkDoor':
        setBill((prev) => ({
          ...prev,
          requestDoor: !prev.requestDoor,
        }));
        break;
      case 'checkSpoon':
        setBill((prev) => ({
          ...prev,
          requestSpoon: !prev.requestSpoon,
        }));
        break;
      default:
        console.log('해당하는 요소 없음');
    }
  };

  const [mintime, maxtime] = [0, 10];

  return (
    <>
      <div className="p-4">
        <div className="flex flex-row text-sm pt-2 pb-2 border-b-2 border-grey1">
          <span className="pr-1 font-semibold">가게배달</span>
          <span>{`${mintime}~${maxtime}분 후 도착`}</span>
        </div>
        {bill && (
          <div>
            <Address street={bill.address.street} detail={bill.address.detail} />
            <Cart items={orderItemsWithPrice} />
            <OrderNotes
              door={bill.requestDoor}
              spoon={bill.requestSpoon}
              changeInput={handleCheckboxChange}
            />
            <Prices
              food={prices.priceFoodTotal}
              delivery={prices.priceDelivery}
              total={prices.priceFoodAndDelivery}
            />
          </div>
        )}
      </div>
      <div className=' bg-grey8'>
        <div className="p-6 text-sm bg-grey8 text-grey5 mt-2">
          <p>개인정보 제3자 제공 내용 및 결제에 동의합니다.</p>
          <p>최소주문금액은 배달요금/일회용컵 보증금을 제외한 금액입니다.</p>
          <p>배달요금에는 할인수단이 적용되지 않습니다? (단, 배달요금 관련 할인/선물은 적용)</p>
        </div>
        <div className='p-4 bg-white rounded-t-xl shadow-xl'>
          <div className='p-4 bg-pink1 text-white font-bold text-center' onClick={handleGetOrder}>
            {`${prices.priceFoodAndDelivery}원 배달 결제하기`}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderPage;

interface Item {
  menuId: number;
  menuName: string;
  price: number;
  priceTotal: number;
  priceWithOption: number;
  quantity: number;
  orderItemOptions: {
    optionName: string;
    price: number;
  }[];
}
interface Cart {
  items: Item[];
}
const Cart = ({ items }: Cart) => {
  const router = useRouter();
  const [bill, setBill] = useRecoilState(orderAtom);

  const handleAllDelete = () => {
    setBill({ ...bill, orderItems: [] });
  };
  const handleOneDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (bill.orderItems.length < 2) {
      console.log('최소 1개 이상의 아이템을 가져야 합니다.');
      return 0;
    }
    const newItems = bill.orderItems.filter((item, index) => {
      return index !== Number(event.currentTarget.id);
    });
    setBill({ ...bill, orderItems: newItems });
  };
  const handleClickPlus = (event: React.MouseEvent<HTMLDivElement>) => {
    const index = Number(event.currentTarget.id);
    if (bill.orderItems[index].quantity < 99) {
      const newBill = { ...bill };
      newBill.orderItems = [...newBill.orderItems];
      newBill.orderItems[index] = {
        ...newBill.orderItems[index],
        quantity: newBill.orderItems[index].quantity + 1,
      };
      setBill(newBill);
    } else {
      console.log('수량을 99 이상으로 늘일 수 없음');
    }
  };
  const handleClickMinus = (event: React.MouseEvent<HTMLDivElement>) => {
    const index = Number(event.currentTarget.id);
    if (bill.orderItems[index].quantity > 1) {
      const newBill = { ...bill };
      newBill.orderItems = [...newBill.orderItems];
      newBill.orderItems[index] = {
        ...newBill.orderItems[index],
        quantity: newBill.orderItems[index].quantity - 1,
      };
      setBill(newBill);
    } else {
      console.log('수량을 1 이하로 줄일 수 없음');
    }
  };
  const handleGoShopDetail = () => {
    router.push(`/detail?id=${bill.shopId}`);
  };

  return (
    <div className="rounded-lg border">
      <div className="flex p-4">
        <div className="flex-1 font-bold">{bill.shopName}</div>
        <div className="ml-auto text-sm text-grey4" onClick={handleAllDelete}>
          전체삭제
        </div>
      </div>
      <div>
        {items.map((item: Item, index: number) => (
          <div key={index}>
            <div className="flex p-4">
              <div className="w-20 h-20 bg-grey2"></div>
              <div className="flex-1 pl-2 pr-2">
                <p className="pb-2">{item.menuName}</p>
                <p className="text-sm">
                  {item.orderItemOptions.reduce((acc, cur, index) => {
                    if (index === 0) {
                      return cur.optionName;
                    }
                    return `${acc}, ${cur.optionName}`;
                  }, '')}
                </p>
                <p className="font-bold mt-2">{`${item.priceTotal}원`}</p>
              </div>
              <LuX
                onClick={handleOneDelete}
                id={index}
                style={{
                  marginTop: '0.5rem',
                  marginBottom: 'auto',
                  fontSize: '1.3rem',
                  color: 'grey',
                }}
              />
            </div>
            <div className="flex">
              <div className="flex-1"></div>
              <div className="flex rounded-md border text-center pt-[10px] pb-[10px] mr-4">
                <div className="grid pl-4" id={index.toString()} onClick={handleClickMinus}>
                  <LuMinus style={{ margin: 'auto' }} />
                </div>
                <div className="mr-4 ml-4 w-4">{item.quantity}</div>
                <div className="grid pr-4" id={index.toString()} onClick={handleClickPlus}>
                  <LuPlus style={{ margin: 'auto' }} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div
        className="flex text-blue1 font-semibold justify-center p-4"
        onClick={handleGoShopDetail}
      >
        <div className="mt-[3px]">
          <FiPlus />
        </div>
        <div>메뉴추가하기</div>
      </div>
    </div>
  );
};

interface OrderNotes extends Handler {
  door: boolean;
  spoon: boolean;
}
const OrderNotes = ({ door, spoon, changeInput }: OrderNotes) => {
  return (
    <div className="rounded-lg border p-4 mt-4">
      <p className="font-bold">주문요청사항</p>
      <div className="flex pt-4 pb-4 border-b">
        <input type="checkbox" id="checkDoor" checked={door} onChange={changeInput} />
        <div className="pl-2">
          <label htmlFor="checkDoor">문 앞에 놓고, 문자주세요.</label>
        </div>
      </div>
      <div className="flex pt-4 pb-4 border-b">
        <input type="checkbox" id="checkSpoon" checked={spoon} onChange={changeInput} />
        <div className="pl-2">
          <label htmlFor="checkSpoon">일회용 수저, 포크가 필요해요.</label>
          <p className="text-green-600 text-sm">
            지구를 지키는 작은 실천! <span className="font-bold">현재까지 140회 참여</span>
          </p>
        </div>
      </div>
      <div className="flex pt-4">
        <div className="flex-1 text-grey4">요청사항을 선택하세요</div>
        <HiOutlineChevronRight style={{ margin: 'auto' }} />
      </div>
    </div>
  );
};

interface Address {
  street: string;
  detail: string;
}
const Address = ({ street, detail }: Address) => {
  return (
    <div className="pt-2 pb-2 min-h-[75px]">
      <div className="flex">
        <span className="mt-[3px]">
          <HiOutlineHome />
        </span>
        <div className="flex flex-col pr-2 pl-2">
          <p>집(으)로 배달</p>
          <p className="text-sm">{street}</p>
          <p className="text-sm">{detail}</p>
        </div>
        <span className="mt-[3px]">
          <HiOutlineChevronRight />
        </span>
      </div>
    </div>
  );
};

interface Prices {
  food: number;
  delivery: number;
  total: number;
}
const Prices = ({ food, delivery, total }: Prices) => {
  return (
    <div className="mt-4">
      <div className="flex pt-[6px]">
        <div>상품금액</div>
        <div className="ml-auto">{`${food} 원`}</div>
      </div>
      <div className="flex pt-2 pb-[6px]">
        <div>배달금액</div>
        <div className="ml-auto">{`${delivery} 원`}</div>
      </div>
      <div className="flex pt-4 pb-4 font-bold border-t border-t-grey2">
        <div>총 결제금액</div>
        <div className="ml-auto">{`${total} 원`}</div>
      </div>
    </div>
  );
};
