'use client';
import { postOrder } from '@/services/orderAPI';
import { useRecoilValue } from 'recoil';
import { userInfoAtom } from '@/recoil/state';

const Order = () => {
  //const user = useRecoilValue(userInfoAtom);
  //const token = user.accessToken;
  //const token = typeof window !== 'undefined' ? sessionStorage.getItem('access_token') : null;

  const bill = {
    shopId: 1,
    address: {
      zipcode: '39201',
      street: '도봉로5길 21',
      detail: '도량그린빌..',
    },
    "orderItems" : [ {
      "createdAt" : null,
      "updatedAt" : null,
      "id" : null,
      "price" : 2000,
      "quantity" : 1,
      "menuName" : "choco맛커피",
      "orderItemOptions" : [ {
        "id" : null,
        "optionName" : '아무것도',
        "price" : 500
      } ]
    } ],
    "requestMsg" : "요청사항 없음",
    "requestDoor" : true,
    "requestSpoon" : false,
    "orderType" : "DELIVERY",
    "paymentType" : "CARD",
    "totalPrice" : 20000,
    "deliveryPrice" : 1000,
    "totalPaymentPrice" : 21000
  }

  const handleGetOrder = () => {
    postOrder(bill);
  };

  return (
    <>
      <div>
        <button onClick={handleGetOrder}>냅다 주문하기</button>
      </div>
    </>
  );
};

export default Order;
