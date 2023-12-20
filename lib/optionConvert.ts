export const optionConvert = (param: string) => {
  let result;
  switch (param) {
    case '주문 많은순':
      result = 'ORDER';
      break;
    case '리뷰 많은순':
      result = 'REVIEW';
      break;
    case '거리 가까운순':
      result = 'CLOSEST';
      break;
    case '별점 높은순':
      result = 'SCORE';
      break;
    case '배달요금':
      result = 0;
      break;
    case '무료':
      result = 0;
      break;
    case '무료 ~ 1000원':
      result = 1000;
      break;
    case '무료 ~ 2000원':
      result = 2000;
      break;
    case '무료 ~ 3000원':
      result = 3000;
      break;
    case '최소주문금액':
      result = 0;
      break;
    case '5,000원 이하':
      result = 5000;
      break;
    case '10,000원 이하':
      result = 10000;
      break;
    case '12,000원 이하':
      result = 12000;
      break;
    case '15,000원 이하':
      result = 15000;
      break;
  }
  return result;
};
