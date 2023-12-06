import axios from 'axios';
import type { ShopList } from '@/lib/types';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const shopApi = {
  // 상점 리스트 조회
  async fetchShopList(params: ShopList) {
    try {
      const response = await api.get('/shop/list', {
        params,
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
}