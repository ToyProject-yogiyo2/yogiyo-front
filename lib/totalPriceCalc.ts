//총 금액 계산
export const totalPriceCalc = (orderItems: any) => {
  // 담긴 메뉴들 순회하며 계산
  return orderItems.reduce((acc:number, item: any) => {

    // 각 메뉴당 추가된 옵션들 순회하며 계산
    const totalOptionPrice = item.orderItemOptions?.reduce((accOption: number, option: any) => {
      return accOption + option.price
    }, 0) || 0 //옵션이 없을 경우 0원 적용

    //모두 더한 값에 메뉴 수량 곱해서 return
    return acc + (item.price + totalOptionPrice) * item.quantity
  }, 0) as number
}
