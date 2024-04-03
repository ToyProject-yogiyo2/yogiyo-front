import { addressApi } from '@/services/addressApi';

//로그인한 유저의 주소 정보를 모두 불러온 후 recoil 상태에 저장함.
export const fetchAddress = async (setMemberAddress: any, setThisAdd: any, curAdd: any = {}) => {
  try {
    const data = await addressApi.view();
    if (data) {
      setMemberAddress(data.memberAddresses);
      const yogiAddress = data.memberAddresses.find((value: any) => value.here);
      if(yogiAddress){
        // 요기 설정된 주소 세팅
        setThisAdd(yogiAddress);
      }else{
        // 요기 설정된 주소가 없을 경우 현재 위치로 세팅
        setThisAdd(curAdd);
      }
    }
  } catch (error) {
    console.error('주소 조회 중 오류 발생:', error);
  }
};
