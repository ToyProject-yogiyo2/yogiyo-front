import { atom } from 'recoil';
import type { Coordinate, RegisterAddressRequest } from '@/types/types';

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

//현재 유저 주소 정보
export const userAddress = atom<RegisterAddressRequest[]>({
  key: 'userAddress',
  default: [],
});