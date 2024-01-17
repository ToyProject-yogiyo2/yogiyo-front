import type { ShopList } from '@/types/types';
import { baseAxiosInstance } from './apiConfig';

export const shopApi = {
  // 상점 리스트 조회
  async fetchShopList(params: ShopList) {
    try {
      const response = await baseAxiosInstance.get('/shop/list', {
        headers: {
          'Content-Type': 'application/json',
        },
        params,
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
};
