import axios from 'axios';
import { Order } from '@/lib/types';

export const baseAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const getOrderDetail = async (token: string, id: string) => {
  const headers = {
    Authorization: token,
    //'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtaW50b2xiQG5hdmVyLmNvbSIsInByb3ZpZGVyVHlwZSI6Ik5BVkVSIiwidXNlclR5cGUiOiJNZW1iZXIiLCJleHAiOjE3MDIzNjY5MjZ9.vgShPvQHmksxsdu-asCCCO8rEARbb6HBwg0rSoIpBPE',
  };
  const res = await baseAxiosInstance.get(`/order/details?orderId=${id}`, { headers });
  console.log(res);
  return res.data;
};

export const postOrder = async (token: string, bill: any) => {
  const headers = {
    Authorization: token,
  };
  const res = await baseAxiosInstance.post(`/order/create`, bill, { headers });
  console.log(res);
};

export const getOrderList = async (token: string, lastId?: string | null) => {
  const headers = {
    Authorization: token,
  };
  const queryString = lastId ? `lastId=${lastId}` : '';
  const res = await baseAxiosInstance.get(`/order/scroll?${queryString}`, { headers });
  return res.data;
};
