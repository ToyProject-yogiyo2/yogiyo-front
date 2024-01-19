import { atom } from 'recoil';
import type { Coordinate, UserInfo, RegisterAddressRequest } from '@/types/types';

//헤더모달 state
export const headerModalState = atom({
  key: 'headerModalState',
  default: false,
});

// 현재위치
export const currentCoord = atom<Coordinate | null>({
  key: 'currentCoord',
  default: null,
});

//현재위치 주소
export const currentAddress = atom<string | any>({
  key: 'currentAddress',
  default: '',
});

//현재위치 법정동 코드
export const currentRegionCode = atom<number | null>({
  key: 'currentRegionCode',
  default: null,
})

//검색위치
export const searchCoord = atom<Coordinate | null>({
  key: 'searchCoord',
  default: null,
});

//검색주소
export const searchAddress = atom({
  key: 'searchAddress',
  default: '',
});

//현재 세팅된 주소 정보
export const thisAddressId = atom<RegisterAddressRequest>({
  key: 'thisAddressId',
  default: {
    id: 0,
    address: {
      zipcode: '',
      street: '',
      detail: '',
    },
    here: false,
    code: 0,
    addressType: '',
    nickname: '',
    longitude: 0,
    latitude: 0,
  },
});

//상세정보 입력창 state
export const isDetailMapState = atom({
  key: 'isDetailMapState',
  default: false,
});

//주소찾기 창 state
export const isFindMapState = atom({
  key: 'isFindMapState',
  default: false,
});

//로그인한 유저 정보
export const userInfoAtom = atom<UserInfo>({
  key: 'user',
  default: {
    userId: 999999,
    nickname: 'unknown',
    email: 'unknown',
    phone: '01000000000',
    isLogin: false,
  },
});

//액세스 토큰
export const tokenAtom = atom({
  key: 'token',
  default: null,
});

//현재 유저 주소 정보
export const userAddress = atom<RegisterAddressRequest[]>({
  key: 'userAddress',
  default: [],
});

//상점 조회 옵션
export const shopListOption = atom({
  key: 'shopListOption',
  default: {
    sortState: '주문 많은순',
    delFilter: '배달요금',
    orderAmount: '최소주문금액',
  },
});

// 상점 리스트 조회 반환값
