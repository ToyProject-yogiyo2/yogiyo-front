'use client';
import TabMenu from '@/components/common/TabMenu';
import React, { useState, useEffect } from 'react';
import { OrderInfo } from '@/types/types';
import { getOrderList } from '@/services/orderAPI';
import Footer from '@/components/common/Footer';
import { useRouter } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { userInfoAtom } from '@/recoil/state';

const tabData = {
  left: { id: 'deliveryAndTogo', name: '배달/포장' },
  right: { id: 'yomart', name: '요마트/요편의점' },
};

interface Props {
  orderList: OrderInfo[];
}

const OrderList = () => {
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [tab, setTab] = useState(tabData.left.id);
  //const token = typeof window !== 'undefined' ? sessionStorage.getItem('access_token') : null;

  const [lastIdState, setLastIdState] = useState('9999999');
  const [hasNextState, setHasNextState] = useState(true);
  const [list, setList] = useState<any[]>([]);
  const [isBottom, setIsBottom] = useState(false);

  const userInfo = useRecoilValue(userInfoAtom);
  const router = useRouter();

  if(!userInfo.isLogin){
    console.log("로그인 상태가 아닙니다.")
    router.push('/mypage');
  }else{
    console.log(`${userInfo.nickname} 의 주문내역`);
  }

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

  useEffect(()=>{
    console.log(list)
    console.log(`lastId: ${lastIdState}`)
    console.log(`hasNext: ${hasNextState}`)
  },[list]);

  const dataFetch = async () => {
    if(!lastIdState){
      setLastIdState('9999999');
    }
    const { orderHistories, lastId, hasNext } = await getOrderList(lastIdState);

    setLastIdState(lastId);
    setHasNextState(hasNext);

    const newItems = Array.isArray(orderHistories) ? orderHistories : [orderHistories];
    setList((p) => [...p, ...newItems]);
  };

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
  const router = useRouter();

  const handleClickOrder= () => {
    router.push('/order')
  }
  const handleClickLinkOrderList = () => {
    router.push('/')
  }
  return (
    <div className="pl-4 pr-4 pb-4 bg-white">
      <div className="pt-3 pb-3 font-semibold">내가 주문한 맛집</div>
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex w-fit" >
          {orderList.map((item, index)=>{
            return(
            <div key={index} className="border rounded-2xl w-[240px] h-[80px] bg-white flex mr-2 overflow-hidden">
              <div className="w-[80px] p-[8px]">
                <div className="w-full h-full rounded-[10px] bg-yogrey2"></div>
              </div>
            </div>
            );
          })}
          <div className="w-[240px] h-[80px]">더 보기</div>
          <div className="w-[240px] h-[80px]" onClick={handleClickOrder}>(임시:주문하기)</div>
          <div className="w-[240px] h-[80px]" onClick={handleClickLinkOrderList}>(임시:홈으로)</div>
        </div>
      </div>
    </div>
  );
};

const CardOrdered = ({ orderList }: Props) => {
  //const orderStateMap = ['주문확인','조리중','배달중','배달완료'];
  //const orderTypeMap = ['가게배달', '포장'];

  const handleReOrder = (shopId : number) => {
    console.log(`shop id [${shopId}] 상세페이지로 연결해야함~`)
  }
  const handleWriteReview = (order : OrderInfo) => {
    console.log(`주문번호 [${order.orderId}] 상세페이지로 연결해야함~`)
  }
  const handleOrderDetail = (orderId : number) => {
    console.log(`order id [${orderId}] 주문상세내역으로 연결해야함~`)
  }

  return(
    <div className="">
      {
        orderList.map((order, index)=>{
          return(
              <div key={index} className="mt-2 p-4 bg-white">
                <div className="pb-4 flex flex-row text-center">
                  <div className="w-[80px] text-xs font-semibold p-1 rounded-lg bg-yogrey">{order.orderType}</div>
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
                        <button className={`${buttonStyles.active}`} onClick={()=>handleReOrder(order.shopId)}>재주문</button>
                      </div>
                      <div className="h-full flex-1 pr-2">
                        <button className={`${buttonStyles.inactive}`} onClick={()=>handleWriteReview(order)}>리뷰쓰기</button>
                      </div>
                      <div className="h-full flex-1 pr-2">
                        <button className={`${buttonStyles.inactive}`} onClick={()=>handleOrderDetail(order.orderId)}>주문상세</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          );
        })
      }
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
