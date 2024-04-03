'use client';
import { IoIosArrowDown } from 'react-icons/io';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  currentAddress,
  userAddress,
  thisAddressId,
} from '@/recoil/address';
import {
  headerModalState,
} from '@/recoil/modal';
import AddressModal from './AddressModal';

declare global {
  interface Window {
    kakao: any;
  }
}

const Header = () => {
  const [isModal, setIsModal] = useRecoilState(headerModalState);
  const curAdd = useRecoilValue(currentAddress);
  const thisAdd = useRecoilValue(thisAddressId);
  const memberAddress = useRecoilValue(userAddress);

  console.log(curAdd)
  console.log(thisAdd)
  console.log(memberAddress)
  
  return (
    <header className="fixed gap-2 top-0 left-0 w-full h-[50px] flex justify-center items-center bg-white z-50">
      <p
        onClick={() => setIsModal(true)}
        className={`text-center flex gap-2 items-center font-[800] text-[1.3rem] __className_e22756`}
      >
        {memberAddress.length > 0 ? thisAdd.nickname : curAdd}{' '}
        <IoIosArrowDown style={{ marginTop: '3px', fontSize: '1.2rem' }} />
      </p>
      {isModal ? <AddressModal /> : null}
    </header>
  );
};

export default Header;
