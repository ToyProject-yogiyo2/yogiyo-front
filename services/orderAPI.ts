import { baseAxiosInstance } from './apiConfig';

export const getOrderDetail = async (id: string) => {
  const res = await baseAxiosInstance.get(`member/order/details?orderId=${id}`);
  return res;
};

export const postOrder = async (bill: any) => {
  const res = await baseAxiosInstance.post(`/member/order/create`, bill, { withCredentials: true });
  return res;
};

export const getOrderList = async (lastId: number) => {
  const queryString = lastId > 0 ? `?lastId=${lastId}` : '';
  const res = await baseAxiosInstance.get(`member/order/scroll${queryString}`, { withCredentials: true });
  return res.data;
};
