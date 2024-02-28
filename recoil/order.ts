import { atom } from 'recoil';
import { Order } from '@/types/types';

export const orderAtom = atom<Order>({
  key: 'orderAtom',
  default: {
    shopId: 1,
    address: {
      zipcode: '31111',
      street: '아주 다니기 어려운 길',
      detail: '오른쪽 집',
    },
    orderItems: [
    //   {
    //     createdAt: null,
    //     updatedAt: null,
    //     id: null,
    //     price: 29999,
    //     quantity: 22,
    //     menuName: 'test메뉴1',
    //     orderItemOptions: [
    //       {
    //         id: null,
    //         optionName: 'test추가1',
    //         price: 500,
    //       },
    //     ],
    //   },
    //   {
    //     createdAt: null,
    //     updatedAt: null,
    //     id: null,
    //     price: 10101,
    //     quantity: 38,
    //     menuName: 'test메뉴2',
    //     orderItemOptions: [
    //       {
    //         id: null,
    //         optionName: 'test추가2',
    //         price: 2500,
    //       },
    //     ],
    //   },
    ],
    requestMsg: '없음',
    requestDoor: true,
    requestSpoon: false,
    orderType: 'DELIVERAY',
    paymentType: 'CARD',
    totalPrice: 0,
    deliveryPrice: 1000,
    totalPaymentPrice: 321000,
  },
});
