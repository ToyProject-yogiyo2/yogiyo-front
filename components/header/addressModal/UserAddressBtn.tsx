import { BiHomeAlt } from 'react-icons/bi';
import { BsBagDash } from 'react-icons/bs';
import { useSetRecoilState } from 'recoil';
import { userAddress, headerModalState, thisAddressId } from '@/recoil/state';
import { addressApi } from '@/services/addressApi';
import { fetchAddress } from '@/lib/fetchAddress';
import { FiMapPin } from 'react-icons/fi';

const UserAddressBtn = ({ addressTarget }: any) => {
  const setMemberAddress = useSetRecoilState(userAddress);
  const setHeaderModal = useSetRecoilState(headerModalState);
  const setThisAdd = useSetRecoilState(thisAddressId);

  const fullAddress = addressTarget.address.street + ' ' + addressTarget.address.detail;

  const iconRenderSelect = () => {
    const type = addressTarget.addressType;
    let result;

    switch (type) {
      case 'HOME':
        result = <BiHomeAlt style={{ fontSize: '1.5rem' }} />;
        break;
      case 'COMPANY':
        result = <BsBagDash style={{ fontSize: '1.5rem' }} />;
        break;
      default:
        result = <FiMapPin style={{ fontSize: '1.5rem' }} />;
        break;
    }

    return result;
  };

  return (
    <div className="flex p-[20px]">
      <div
        className="flex flex-1 gap-2 cursor-pointer"
        onClick={async () => {
          await addressApi.change(addressTarget.id);
          await fetchAddress(setMemberAddress, setThisAdd);
          setHeaderModal(false);
        }}
      >
        {iconRenderSelect()}
        <div className="flex flex-col flex-1 gap-1">
          <span className="flex items-center gap-2 text-[1rem] font-bold">
            {addressTarget.nickname}
            {addressTarget.here && (
              <span className="text-[0.8rem] text-pink1 bg-red-100 p-[0.15rem] rounded-md">
                요기
              </span>
            )}
          </span>
          <span className="text-[0.9rem] text-slate-600">{fullAddress}</span>
        </div>
      </div>
      {!addressTarget.here && (
        <i
          className="text-[2rem] relative cursor-pointer w-[1.3rem] h-[1.3rem] bg-slate-200 rounded-[50%]"
          onClick={async () => {
            const isConfirm = confirm(`${addressTarget.nickname} 주소를 삭제하시겠어요?`);
            if (isConfirm) {
              await addressApi.delete(addressTarget.id);
              await fetchAddress(setMemberAddress, setThisAdd);
            }
          }}
        >
          <div className="absolute w-[0.95rem] h-[1px] bg-slate-500 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45"></div>
          <div className="absolute w-[0.95rem] h-[1px] bg-slate-500 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-[135deg]"></div>
        </i>
      )}
    </div>
  );
};

export default UserAddressBtn;
