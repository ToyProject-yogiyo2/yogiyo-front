import type { ShopList } from '@/types/types';
import { baseAxiosInstance } from './apiConfig';
import type { ShopInfoType } from '@/types/types';

export const shopApi = {
  // 상점 리스트 조회
  async fetchShopList(params: ShopList) {
    try {
      const response = await baseAxiosInstance.get('/member/shop/list', {
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

  //가게 상세 정보 조회(member)
  async getShopInfo(params: any) {
    try {
      const response = await baseAxiosInstance.get(`/member/shop/details`, {
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

  //가게 메뉴 그룹 전체 조회
  async getShopMenuGroup(shopId: number | undefined) {
    try {
      const response = await baseAxiosInstance.get(`/member/menu-group/shop/${shopId}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },

  //옵션그룹 전체조회
  async getShopOptionGroup(shopId: number | undefined) {
    try {
      const response = await baseAxiosInstance.get(`/owner/menu-option-group/shop/${shopId}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
};
