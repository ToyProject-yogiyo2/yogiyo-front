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

/* cookie 방식이 아닐 때 사용했던
export const login = async (reqbody: SocialLogin) => {
  try {
    const resTokenApi = await getAccessToken(reqbody);
    const { token, userId } = resTokenApi;
    const resUserInfo = await getUserInfo(token);
  /return { ...resUserInfo, id: userId, accessToken: token };
    return 
  } catch (error) {
    console.error(error);
    return false;
  }
};
*/

export const getCookie = async (reqbody: SocialLogin) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const config = {headers, withCredentials: true}
  const resTokenAPI = await baseAxiosInstance.post('/memberLogin', reqbody, { withCredentials: true });
  
  const isLogin = true;
  const userId = resTokenAPI.data.userId;
  const email = resTokenAPI.data.email;

  const resUserInfoAPI = await getUserInfo()
  const nickname = resUserInfoAPI.nickname;

  return { userId, email, nickname, isLogin };
};

export const getUserInfo = async () => {
  //const headers = {
  //  Authorization: token,
  //};
  const res = await baseAxiosInstance.get('/member/mypage', { withCredentials: true });
  /*const res = await baseAxiosInstance.get('/member/mypage', {
    headers: {
      Authorization: token
    }
  })
  */
  console.log(res);
  return res.data;
};


export const logout = async (userId: number) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  const config = {headers, withCredentials: true}

  const resLogout = await baseAxiosInstance.post(`/memberLogout/${userId}`,"",config)
}
