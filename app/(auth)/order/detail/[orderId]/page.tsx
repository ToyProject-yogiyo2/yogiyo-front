'use client'
import { Ordered } from "@/types/types"
import { useEffect, useState } from "react";

import DeliState from "@/components/order/detail/deliState";
import ShopInfo from "@/components/order/detail/shopInfo";
import Receipt from "@/components/order/detail/receipt";
import { getOrderDetail } from "@/services/orderAPI";

interface Props {
  params: {
    orderId: string
  }
}

const OrderDetailDynamic = ({ params }: Props) => {
  const orderId = params.orderId;
  const [orderInfo, setOrderInfo] = useState<Ordered | null>(null);
  
  useEffect(()=>{
    console.log(`${orderId} 주문 상세 페이지`)
    handleAPI()
  },[])

  const handleAPI = async () => {
    const orderDetail = await getOrderDetail(orderId);
    setOrderInfo(orderDetail.data)
  }

  return(
    <div>
      {orderInfo?
      <div className='w-screen min-h-screen bg-grey7'>
        <DeliState delState={orderInfo.status} orderType={orderInfo.orderType}/>
        <ShopInfo shopName={orderInfo.shopName} shopId={orderInfo.shopId}/>
        <Receipt orderInfo={orderInfo}/>
      </div>
      :<></>}
    </div>
  )
}

export default OrderDetailDynamic;