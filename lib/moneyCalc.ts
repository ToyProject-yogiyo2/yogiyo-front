export const moneyCalc = (menuPrice: number, optionPrice: number, quantity: number) => {
  // ( 메뉴가격 + 옵션가격 ) * 수량
  return ( menuPrice + optionPrice ) * quantity
}