import axios from 'axios';
import { Order } from '@/types/types';

export const baseAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const getOrderDetail = async (id: string) => {
  const headers = {
    //Authorization: token,
    //'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtaW50b2xiQG5hdmVyLmNvbSIsInByb3ZpZGVyVHlwZSI6Ik5BVkVSIiwidXNlclR5cGUiOiJNZW1iZXIiLCJleHAiOjE3MDIzNjY5MjZ9.vgShPvQHmksxsdu-asCCCO8rEARbb6HBwg0rSoIpBPE',
  };
  const res = await baseAxiosInstance.get(`/order/details?orderId=${id}`, { headers });
  console.log(res);
  return res.data;
};

export const postOrder = async (bill: any) => {
  const res = await baseAxiosInstance.post(`/order/create`, bill, { withCredentials: true });
  console.log(res);
};

export const getOrderList = async (token: string, lastId?: string | null) => {
  //const headers = {
    //Authorization: token,
  //  withCredentials: true
  //};
  const queryString = lastId ? `lastId=${lastId}` : '';
  const res = await baseAxiosInstance.get(`/order/scroll?${queryString}`, { withCredentials: true });
  return res.data;
};
