export interface Coordinate {
  lat: number;
  lng: number;
}

export interface MenuOption {
  name: string;
  content: string;
}

export interface Tab {
  tabData: {
    left: Tabdata;
    right: Tabdata;
  };
  isInitialLoad?: boolean;
  selectedTab: string;
  handleGetSelected: (selectedTab: string) => void;
}
export interface Tabdata {
  id: string;
  name?: string;
}

export interface InputBox {
  title?: string;
  placeholder: string;
  type: string;
  style?: string;
}

export interface UserInfo {
  userId: number;
  nickname: string; 
  email: string;
  phone?: string;
  isLogin?: boolean;
}

export interface Address {
  zipcode: string;
  street: string;
  detail: string;
}

export interface RegisterAddressRequest {
  id?: number;
  here?: boolean;
  address: Address;
  nickname: string;
  addressType: string;
  longitude: number;
  latitude: number;
  code: number;
}

export interface SocialLogin {
  email: string | null;
  password: string | null;
  authCode: string;
  providerType: string;
}

export interface DynamicRoute {
  params: {
    provider: string;
  };
}

export interface ReqAuth {
  code: string;
  client_id: string;
  redirect_uri: string;
  state?: string;
}

/* 임시로 쓰던거(우리API문서랑 다름)
export interface OrderInfo {
  name: string;
  min_delivery: number;
  max_delivery: number;
  menu_name?: string;
  order_type?: number;
  order_time?: string;
  order_state?: number;
  review?: boolean;
}
*/

export interface Address {
  zipcode: string;
  street: string;
  detail: string;
}

export interface RegisterAddressRequest {
  address: Address;
  nickname: string;
  addressType: string;
  longitude: number;
  latitude: number;
}

export interface ShopList {
  category?: string;
  sortOption?: string;
  deliveryPrice?: number;
  leastOrderPrice?: number;
  longitude?: number;
  latitude?: number;
  offset?: number;
  limit?: number;
}

export interface Shop {
  shopId: number;
  shopName: string;
  totalScore: number;
  distance: number;
  deliveryTime: number;
  minDeliveryPrice: number;
  maxDeliveryPrice: number;
  icon: string;
}

export interface ShopListResponse {
  content: Shop[];
  nextOffset: number;
  hasNext: boolean;
}

export interface OrderDetail {
  orderId: number;
  status: string; //ex 'DONE'
  orderType: string; //ex 'DELIVERY'
  shopName: string; //ex 'BHC 행당점'
  shopId: number;
  orderNumber: string; //ex '10OCT0_2312'
  orderTime: string; //ex '2023-12-04T12:07:28.30948'
  orderItems: [
    {
      createdAt: string | null;
      updatedAt: string | null;
      id: number;
      price: number;
      quantity: number;
      menuName: string; //ex '후라이드치킨'
      orderItemOptions: [
        {
          id: number | null;
          optionName: string; //ex '양념추가'
          price: number;
        },
      ];
    },
  ];
  totalPrice: number;
  deliveryPrice: number;
  paymentPrice: number;
  paymentType: string; //ex 'CARD',
  address: {
    zipcode: number; //ex 14582
    street: string; //ex '다산로 4길 57'
    detail: string; //ex '장미아파트 8동'
  };
  requestMsg: string; //ex '요청사항 없음'
  requestDoor: boolean;
  requestSpoon: boolean;
}

export interface OrderInfo {
  orderId: number;
  orderTime: string; //ex "2023-12-04T12:07:28.333953",
  orderType: string; //ex "DELIVERY",
  status: string; //ex "DONE",
  shopId: number;
  shopName: string; //ex "BHC 행당점",
  shopImg: string; //ex "img.jpg",
  menuName: string; //ex "후라이드 치킨",
  menuCount: number;
  totalMenuCount: number;
}

export interface Order {
  shopId: number;
  address: {
    zipcode: string; //ex "14582",
    street: string; //ex "다산로 4길 57",
    detail: string; //ex "장미아파트 8동"
  };
  orderItems: [
    {
      createdAt: string | null;
      updatedAt: string | null;
      id: number | null;
      price: number;
      quantity: number;
      menuName: string;
      orderItemOptions: [
        {
          id: number | null;
          optionName: string; //ex "양념추가",
          price: number; //ex 500
        },
      ];
    },
  ];
  requestMsg: string; //ex "요청사항 없음",
  requestDoor: boolean; //ex true,
  requestSpoon: boolean; //ex false,
  orderType: string; //ex "DELIVERY",
  paymentType: string; //ex "CARD",
  totalPrice: number; //ex 20000,
  deliveryPrice: number; //ex 1000,
  totalPaymentPrice: number; //ex 21000
}

export interface requestInfoType {
  category: string,
  sortOption: string,
  deliveryPrice: number,
  leastOrderPrice: number,
  longitude: number | undefined,
  latitude: number | undefined,
  size: number,
  code: number | null,
  cursor?: number,
  subCursor?: number
}

export interface shopInfoType {
  id: number,
  name: string,
  callNumber: string,
  address: string,
  categories: string[]
}