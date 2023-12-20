import { ReqAuth, SocialLogin } from '@/lib/types';
import { baseAxiosInstance } from './apiConfig';

export const getNaverAuth = (req: ReqAuth) => {
  const baseURL = 'https://nid.naver.com/oauth2.0/authorize';
  window.location.href = `${baseURL}?response_type=${req.code}&client_id=${req.client_id}&redirect_uri=${req.redirect_uri}&state=${req.state}`;
};

export const getKakaoAuth = async (req: ReqAuth) => {
  const baseURL = 'https://kauth.kakao.com/oauth/authorize';
  window.location.href = `${baseURL}?response_type=${req.code}&client_id=${req.client_id}&redirect_uri=${req.redirect_uri}`;
};

export const login = async (reqbody: SocialLogin) => {
  try {
    const resTokenApi = await getAccessToken(reqbody);
    const { token, userId } = resTokenApi;
    const resUserInfo = await getUserInfo(token);
    return { ...resUserInfo, id: userId, accessToken: token };
  } catch (error) {
    console.error(error);
    return false;
  }
};
export const getAccessToken = async (reqbody: SocialLogin) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const resTokenAPI = await baseAxiosInstance.post('/memberLogin', reqbody, { headers });
  const token = resTokenAPI.headers.authorization;
  const userId = resTokenAPI.data.userId;
  return { token, userId };
};

export const getUserInfo = async (token: string) => {
  const headers = {
    Authorization: token,
  };
  const res = await baseAxiosInstance.get('/member/mypage', { headers });
  /*const res = await baseAxiosInstance.get('/member/mypage', {
    headers: {
      Authorization: token
    }
  })
  */
  console.log(res);
  return res.data;
};
