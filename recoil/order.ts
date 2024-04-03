import { atom, selector } from 'recoil';
import { Order, OrderList } from '@/types/types';

export const orderAtom = atom<Order>({
  key: 'orderAtom',
  default: {
    shopId: 0,
    shopName: '',
    address: {
      street: '', 
      detail: '', 
    },
    orderItems: [],
    requestMsg: '',
    requestDoor: true,
    requestSpoon: false,
    orderType: 'DELIVERY',
    paymentType: 'CARD',
    totalPrice: 0,
    deliveryPrice: 0,
    deliveryTime: 0,
    totalPaymentPrice: 0,
    code: ''
  }
});

export const orderDetailCursor = atom<string | null>({
  key: 'orderDetailCursor',
  default : null
})

export const orderItemsWithPriceSelector = selector({
  key: 'orderItemsWithPriceSelector',
  get: (prop) => {
    const itemList = prop.get(orderAtom).orderItems;
    if(!itemList){
      return [];
    }
    const newItemList = itemList.map((item) => {
      const priceOptions = item.orderItemOptions.reduce((acc, cur) => {
        return acc + cur.price;
      }, 0);
      const priceWithOption = item.price + priceOptions;
      const priceTotal = priceWithOption * item.quantity;
      return { ...item, priceWithOption, priceTotal };
    });
    return newItemList;
  },
});

export const pricesSelector = selector({
  key: 'pricesSelector',
  get: ({ get }) => {
    const foodList = get(orderItemsWithPriceSelector);
    if(!foodList){
      return {priceFoodTotal: 0, priceDelivery: 0, priceFoodAndDelivery: 0}
    }
    const priceFoodTotal = foodList.reduce((acc, cur) => {
      return acc + cur.priceTotal;
    }, 0);
    const priceDelivery = get(orderAtom).deliveryPrice;
    const priceFoodAndDelivery = priceFoodTotal + priceDelivery;
    return { priceFoodTotal, priceDelivery, priceFoodAndDelivery };
    
  },
});

export const orderListAtom = atom<OrderList[]>({
  key: 'orderListAtom',
  default: [{
    menuCount : 1,
    menuName : 'default',
    orderId : 0,
    orderTime : 'default',
    orderType : 'DELIVERY',
    shopId : 111111,
    shopImg : '/shopImg.png',
    shopName : 'default',
    status : 'DONE',
    totalMenuCount : 1,
  }]
})