'use client';
import TabMenu from '@/components/common/TabMenu';
import React, { useState, useEffect } from 'react';
import { OrderInfo } from '@/lib/types';
import { getOrderList } from '@/services/orderAPI';
import Footer from '@/components/common/Footer';

const tabData = {
  left: { id: 'deliveryAndTogo', name: '배달/포장' },
  right: { id: 'yomart', name: '요마트/요편의점' },
};

interface Props {
  orderList: OrderInfo[];
}

/**
 *
 * @todo SlideOrderList, CardOrdered 의 map에 있는 key를 id값으로 수정하던가 해야함.. name은 유니크하지 않음.
 */
const OrderList = () => {
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [tab, setTab] = useState(tabData.left.id);
  const token = typeof window !== 'undefined' ? sessionStorage.getItem('access_token') : null;

  const [lastIdState, setLastIdState] = useState(null);
  const [hasNextState, setHasNextState] = useState(true);
  const [list, setList] = useState<any[]>([]);
  const [isBottom, setIsBottom] = useState(false);

  const handleGetSelected = (selectedTab: string) => {
    setTab(selectedTab);
    if (isInitialLoad) setIsInitialLoad(false);
    console.log('change');
  };

  //스크롤이 밑에 닿으면 데이터패치해서 다음 리스트 받아와서 현재 리스트에 추가해서 리렌더링해야됨
  useEffect(() => {
    if (isBottom || isInitialLoad) {
      if (isInitialLoad) setIsInitialLoad(false);
      dataFetch();
      console.log('render-useEffect');
      console.log(`${isInitialLoad}, ${isBottom}`);
      console.log('=================');
    }
  }, [isBottom]);

  useEffect(() => {
    console.log(list);
  }, [list]);

  const dataFetch = async () => {
    const { orderHistories, lastId, hasNext } = await getOrderList(token as string, lastIdState);
    const newItems = Array.isArray(orderHistories) ? orderHistories : [orderHistories];
    setList((p) => [...p, ...newItems]);
  };

  const dummyList = [
    {
      name: '가나다 커피집',
      min_delivery: 0,
      max_delivery: 3500,
      menu_name: '맛없는 커피',
      order_time: '2023-12-05 21:06:34',
      order_state: 3,
      order_type: 0,
      review: true,
    },
    {
      name: '맛없는 돈까스집',
      min_delivery: 0,
      max_delivery: 4000,
      menu_name: '의외로 맛있는 돈까스',
      order_time: '2023-12-12 23:08:55',
      order_state: 3,
      order_type: 1,
      review: true,
    },
    {
      name: '처참한 쫄면집',
      min_delivery: 0,
      max_delivery: 4000,
      menu_name: '졸면',
      order_time: '2023-12-20 01:03:27',
      order_state: 3,
      order_type: 1,
      review: true,
    },
    {
      name: '맛있는 뷔페',
      min_delivery: 0,
      max_delivery: 23283839,
      menu_name: '뷔페에 메뉴가어딨음',
      order_time: '2023-12-25 11:22:11',
      order_state: 1,
      order_type: 0,
      review: false,
    },
  ];

  return (
    <div className="bg-yogrey h-screen">
      <TabMenu
        tabData={tabData}
        isInitialLoad={isInitialLoad}
        selectedTab={tab}
        handleGetSelected={handleGetSelected}
      ></TabMenu>
      <SlideOrderList orderList={list} />
      <CardOrdered orderList={list} />
    </div>
  );
};

export default OrderList;

const SlideOrderList = ({ orderList }: Props) => {
  return (
    <div className="pl-4 pr-4 pb-4 bg-white">
      <div className="pt-3 pb-3 font-semibold">내가 주문한 맛집</div>
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex w-fit">
          {orderList.map((item) => {
            return (
              <div
                key={item.shopId}
                className="border rounded-2xl w-[240px] h-[80px] bg-white flex mr-2 overflow-hidden"
              >
                <div className="w-[80px] p-[8px]">
                  <div className="w-full h-full rounded-[10px] bg-yogrey2"></div>
                </div>
                <div className="pt-[8px] pb-[8px] flex-1">{item.shopName}</div>
              </div>
            );
          })}
          <div className="w-[240px] h-[80px]">더 보기</div>
        </div>
      </div>
    </div>
  );
};

const CardOrdered = ({ orderList }: Props) => {
  //const orderStateMap = ['주문확인','조리중','배달중','배달완료'];
  //const orderTypeMap = ['가게배달', '포장'];

  return (
    <div className="">
      {orderList.map((order) => {
        return (
          <div key={order.shopId} className="mt-2 p-4 bg-white">
            <div className="pb-4 flex flex-row text-center">
              <div className="w-[80px] text-xs font-semibold p-1 rounded-lg bg-yogrey">
                {order.orderType}
              </div>
              <div className="flex-1 text-left pl-2 text-sm text-yogrey3">{order.orderTime}</div>
              <div className="w-[80px] text-yogrey4 font-semibold">{order.status}</div>
            </div>
            <div className="flex h-[76px]">
              <div className="w-[76px] h-[76px] bg-yogrey2 rounded-xl"></div>
              <div className="flex-1 pl-4">
                <div className="h-1/2 pb-2">
                  <p className="font-bold leading-5">{order.shopName}</p>
                  <p className="">{order.menuName}</p>
                </div>
                <div className="h-1/2 pt-2 flex flex-row">
                  <div className="h-full flex-1 pr-2">
                    <button className={`${buttonStyles.active}`}>재주문</button>
                  </div>
                  <div className="h-full flex-1 pr-2">
                    <button className={`${buttonStyles.inactive}`}>리뷰쓰기</button>
                  </div>
                  <div className="h-full flex-1 pr-2">
                    <button className={`${buttonStyles.inactive}`}>주문상태</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <Footer />
    </div>
  );
};

const buttonStyles = {
  active:
    'w-full h-full rounded-lg border text-sm font-semibold border-yopink text-yopink text-center',
  inactive:
    'w-full h-full rounded-lg border text-sm font-semibold border-yogrey4 text-yogrey4 text-center',
};
