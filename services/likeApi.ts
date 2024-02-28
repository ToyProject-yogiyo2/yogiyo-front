import { baseAxiosInstance } from './apiConfig';

export const likeApi = {
  //찜하기 토글
  async toggleLike(shopId: number) {
    try {
      const response = await baseAxiosInstance.post(`/member/like/${shopId}`);
      return response;
    } catch (error) {
      console.error('찜하기 토글 에러:', error);
      throw error;
    }
  },

  //찜하기 목록 조회
  async getLikeList(offset: number, limit: number) {
    try {
      const params = (offset !== 0 && limit !== 0) ? { offset, limit } : {};
      const response = await baseAxiosInstance.get(`/member/like/list`, {
        headers: {
          'Content-Type': 'application/json',
        },
        params,
      });
      console.log('찜하기api' + response)
      return response.data;
    } catch (error) {
      console.error('찜하기 목록 에러:', error);
      throw error;
    }
  },
};
