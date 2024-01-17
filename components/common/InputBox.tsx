import { InputBox } from '@/types/types';

const InputBox = (props: InputBox) => {
  return (
    <div className={props.style}>
      {props.title ? <p className="pb-2">{props.title}</p> : ''}
      <input
        className="w-full p-3.5 text-md border border-yogrey2 rounded-xl focus:outline-none focus:border-yogrey4"
        type={props.type}
        placeholder={props.placeholder}
      />
    </div>
  );
};

export default InputBox;
