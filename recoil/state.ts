import { atom } from 'recoil';
import type { Menus, UserInfo } from '@/types/types';

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

//상점 조회 옵션
export const shopListOption = atom({
  key: 'shopListOption',
  default: {
    sortState: '주문 많은순',
    delFilter: '배달요금',
    orderAmount: '최소주문금액',
  },
});

//로딩 상태값
export const loadingState = atom({
  key: 'loadingState',
  default: true
})

//상세 메뉴
export const addMenu = atom<Menus>({
  key: 'addMenu',
  default: {
    id: 0,
    name: '',
    content: '',
    price: 0,
    reviewNum: 0,
    picture: ''
  }
})