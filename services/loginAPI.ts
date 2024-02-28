import { ReqAuth, SocialLogin } from '@/types/types';
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
  const resTokenAPI = await baseAxiosInstance.post('/member/login', reqbody, { withCredentials: true });
  
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

  const resLogout = await baseAxiosInstance.post(`/member/logout/${userId}`,"",config)
  console.log(resLogout)

  const defaultUserInfo = {
    userId: 999999,
    nickname: 'unknown',
    email: 'unknown',
    phone: '01000000000',
    isLogin: false,
  }

  return defaultUserInfo;
}


export const emailLogin = async (email: string, password: string) => {
  const userData = {
    "email" : email,
    "password" : password,
    "authCode" : null,
    "providerType" : "DEFAULT"
  }
  const resLogin = await baseAxiosInstance.post(`/member/login`, userData)
  if (resLogin.status >= 200 && resLogin.status < 300) {
    window.location.href = '/';
    console.log(`유저 ${resLogin.data.userId} 로그인 성공`)
  }else{
    console.error('emailLogin api 호출 중 에러 발생')
  }
}

export const emailJoin = async (email: string, password: string, nickname: string) => {
  const userData = {
    "nickname" : nickname,
    "email" : email,
    "password" : password,
    "providerType" : "DEFAULT"
  }
  const resJoin = await baseAxiosInstance.post(`/member/join`, userData)
  if (resJoin.status >= 200 && resJoin.status < 300) {
    console.log(`유저 ${resJoin.data.id} 로그인 성공`)
    window.location.href = '/';
  }else{
    console.error('emailJoin api 호출 중 에러 발생')
  }
}