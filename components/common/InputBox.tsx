import { InputBox } from '@/types/types';
import { useState } from 'react';

const InputBox = (props: InputBox) => {
  return (
    <div className={props.style}>
      {props.title ? <p className="pb-2">{props.title}</p> : ''}
      <input
        className="w-full p-3.5 text-md border border-grey2 rounded-xl focus:outline-none focus:border-grey4"
        type={props.type}
        placeholder={props.placeholder}
        onChange={props.onChange}
        id={props.id}
        value={props.value}
      />
    </div>
  );
};

export default InputBox;
