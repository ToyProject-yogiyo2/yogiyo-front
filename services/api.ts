import { baseAxiosInstance } from './apiConfig';

/*
export const getNaverAuth = async () => {
  axios
    .get(
      'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=0o_XScx3lU6SBOFvKmsc&redirect_uri=http://localhost:3000/&state=false',
    )
    .then(() => {
      console.log('abc');
    });
};
*/

export const getNaverAuth = () => {
  window.location.href =
    'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=0o_XScx3lU6SBOFvKmsc&redirect_uri=http://localhost:3000/loading/&state=false';
};

export const getGoogleAuthCode = () => {
  const client_id = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const redirect_uri = process.env.NEXT_PUBLIC_LOGIN_REDIRECT_URI;
  const response_type = 'code';
  const scope = 'email profile';

  const callLoginWindow = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=${response_type}&scope=${scope}`;
  window.location.href = callLoginWindow;
};

export const postGoogleAuthCode = async (authSource: any) => {
  const res = await baseAxiosInstance.post('/socialLogin', authSource);
  console.log(res);
};
