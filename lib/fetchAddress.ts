import { addressApi } from '@/services/addressApi';

//로그인한 유저의 주소 정보를 모두 불러온 후 recoil 상태에 저장함.
export const fetchAddress = async (setMemberAddress: any, setThisAdd: any) => {
  try {
    const data = await addressApi.view();
    if (data) {
      setMemberAddress(data.memberAddresses);
      const yogiAddress = data.memberAddresses.find((value: any) => value.here);
      setThisAdd(yogiAddress);
    }
  } catch (error) {
    console.error('주소 조회 중 오류 발생:', error);
  }
};
