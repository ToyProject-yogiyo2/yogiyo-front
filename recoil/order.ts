import { atom, selector } from 'recoil';
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
      {
        menuId: 2,
        price: 29999,
        quantity: 22,
        menuName: 'test메뉴1',
        orderItemOptions: [
          {
            optionName: 'test추가1',
            price: 500,
          },
          {
            optionName: 'test추가2',
            price: 500,
          },
          {
            optionName: 'test추가3',
            price: 500,
          },
          {
            optionName: 'test추가4',
            price: 500,
          },
          {
            optionName: 'test추가5',
            price: 500,
          },
          {
            optionName: 'test추가6',
            price: 500,
          },
        ],
      },
      {
        menuId: 3,
        price: 10101,
        quantity: 38,
        menuName: 'test메뉴2',
        orderItemOptions: [
          {
            optionName: 'test추가3',
            price: 2500,
          },
        ],
      },
    ],
    requestMsg: '없음',
    requestDoor: true,
    requestSpoon: false,
    orderType: 'DELIVERAY',
    paymentType: 'CARD',
    totalPrice: 0,
    deliveryPrice: 1000,
    totalPaymentPrice: 321000,
    code: '1171010200',
  },
});


export const totalPriceState = selector({
  key: 'totalPriceState',
  get: ({ get }) => {
    const food = get(orderAtom).totalPrice;
    const delivery = get(orderAtom).deliveryPrice;
    return food + delivery;
  },
});