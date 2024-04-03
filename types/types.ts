export interface Handler {
  changeInput?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  click?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
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
    left: string;
    right: string;
  };
  selectedTab: string;
  handleGetSelected: (selectedTab: string) => void;
}
export interface Tabdata {
  id: string;
  name?: string;
}

export interface InputBox {
  id: string;
  title?: string;
  placeholder: string;
  type: string;
  style?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export interface UserInfo {
  userId: number;
  nickname: string;
  email: string;
  phone?: string;
  isLogin: boolean;
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

export interface ReqAuth {
  code: string;
  client_id: string;
  redirect_uri: string;
  state?: string;
}

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
  totalScore?: number;
  distance?: number;
  deliveryTime?: number;
  minDeliveryPrice?: number;
  maxDeliveryPrice?: number;
  icon?: string;
}

export interface ShopListResponse {
  content: Shop[];
  nextOffset: number;
  hasNext: boolean;
}

export interface Order {
  shopId: number;
  shopName?: string;
  address: {
    street: string; //ex "다산로 4길 57",
    detail: string; //ex "장미아파트 8동"
  };
  orderItems: {
    menuId: number;
    price: number;
    quantity: number;
    menuName: string;
    orderItemOptions: {
      optionName: string; //ex "양념추가",
      price: number; //ex 500
    }[];
  }[];
  requestMsg: string; //ex "요청사항 없음",
  requestDoor: boolean; //ex true,
  requestSpoon: boolean; //ex false,
  orderType: string; //ex "DELIVERY",
  paymentType: string; //ex "CARD",
  totalPrice: number; //ex 20000,
  deliveryPrice: number; //ex 1000,
  deliveryTime?: number;
  totalPaymentPrice?: number; //ex 21000
  code: string; //ex "1171010200"
}

export interface Ordered {
  orderId : number;
  status : string;
  orderType : string;
  shopName : string;
  shopId : number;
  orderNumber : string;
  orderTime : string;
  orderItems : {
    id : number;
    price : number;
    quantity : number;
    menuName : string;
    menuId : number;
    orderItemOptions : {
      optionName : string;
      price : number;
    }[];
  }[];
  totalPrice : number;
  deliveryPrice : number;
  paymentPrice : number;
  paymentType : string;
  address : {
    street : string;
    detail : string;
  },
  requestMsg : string;
  requestDoor : boolean;
  requestSpoon : boolean;
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

export interface RequestInfoType {
  category: string;
  sortOption: string;
  deliveryPrice: number;
  leastOrderPrice: number;
  longitude: number | undefined;
  latitude: number | undefined;
  size: number;
  code: number | null;
  cursor?: number;
  subCursor?: number;
}

export interface ShopInfoType {
  id: number;
  name: string;
  reviewNum: number;
  likeNum: number;
  totalScore: number;
  banner: string;
  noticeTitle: string;
  distance: number;
  minOrderPrice: number;
  minDeliveryPrice: number;
  isLike: boolean;
  deliveryTime: number;
}

export interface DetailMenuType {
  id: number,
  name: string,
  content: string,
  picture: string,
  price: number,
  reviewNum: number,
  optionGroups: OptionGroupsType[],
}

interface OptionGroupsType {
  id: number,
  name: string,
  count: number,
  optionType: string,
  options: optionsType[],
  possibleCount: boolean
}

interface optionsType {
  id: number,
  content: string,
  price: number
}

export interface MenuGroupType {
  id: number;
  name: string;
  content: string;
  menus: Menus[];
}

export interface Menus {
  id: number;
  name: string;
  content: string;
  price: number;
  reviewNum: number;
  picture: string;
}

// 주문내역 조회 타입
export interface OrderHistoriesType {
  orderId : number,
  orderTime : string,
  orderType : string,
  status : string,
  shopId : number,
  shopName : string,
  shopImg : string,
  menuName : string,
  menuCount : number,
  totalMenuCount : number
}

export interface OrderList {
  menuCount : number;
  menuName : string;
  orderId : number;
  orderTime : string;
  orderType : string;
  shopId : number;
  shopImg : string;
  shopName : string;
  status : string;
  totalMenuCount : number;
}