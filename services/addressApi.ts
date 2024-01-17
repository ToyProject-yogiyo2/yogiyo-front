import type { RegisterAddressRequest } from '@/types/types';
import { baseAxiosInstance } from './apiConfig';

export const addressApi = {
  // 멤버 주소 등록
  async register(data: RegisterAddressRequest) {
    try {
      const response = await baseAxiosInstance.post('/address/register', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },

  // 멤버 주소 조회
  async view() {
    try {
      const response = await baseAxiosInstance.get('/address/view', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },

  // 멤버 주소 삭제
  async delete(memberAddressId: number) {
    try {
      const response = await baseAxiosInstance.delete(`/address/${memberAddressId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },

  // '요기' 위치 설정
  async change(memberAddressId: number) {
    try {
      const response = await baseAxiosInstance.patch(
        `/address/here/${memberAddressId}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
};
