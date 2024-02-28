import { atom } from 'recoil';

//헤더모달 state
export const headerModalState = atom({
  key: 'headerModalState',
  default: false,
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

//스크롤 막기 상태값
export const scrollHidden = atom({
  key: 'scrollHidden',
  default: false
})

//음식 상세정보 모달 state
export const foodModalState = atom({
  key: 'foodModalState',
  default: false
})