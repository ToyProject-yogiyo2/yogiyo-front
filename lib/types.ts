/*
  순서대로
  가게이름, 별점, 가게이미지, 배달시간, 배달요금
*/
export interface MaketInfoType {
  info: {
    name?: string;
    rate?: string;
    img?: string;
    delay?: string;
    delFee?: string;
  };
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
  initialLoad?: boolean;
  name: string;
  handle?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface InputBox {
  title?: string;
  placeholder: string;
  type: string;
  style?: string;
}

export interface User {
  id: string;
  nickname: string;
  email: string;
  phone?: string;
  authAt?: string;
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