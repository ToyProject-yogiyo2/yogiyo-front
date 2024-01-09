import { baseAxiosInstance } from './apiConfig';

export const menuGroupApi = {
  // 메뉴 그룹 전체 조회
  async getTotalMenu(shopId: number) {
    try {
      const response = await baseAxiosInstance.get(`/menu-group/shop/${shopId}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
};
