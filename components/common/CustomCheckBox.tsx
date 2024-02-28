'use client'
import { ImCheckboxChecked } from "react-icons/im";

interface Props {
  checked: boolean;
}

const CustomCheckbox = ({ checked }: Props) => {
  return (
    <div className="flex items-center">
      <div // label 추가로 div 대신 사용
        className={`w-6 h-6 flex justify-center items-center mr-2 rounded ${checked ? 'bg-white border-black' : 'border-2 border-gray-400'}`}>
        {checked && <ImCheckboxChecked className="w-6 h-6 text-black" />}
      </div>
    </div>
  );
};

export default CustomCheckbox;