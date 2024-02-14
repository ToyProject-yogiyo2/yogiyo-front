import React from 'react';

const ChangeNickName = () => {
  return (
    <div className="p-4">
      <input
        className="w-full p-4 mb-5 border border-slate-300"
        placeholder="닉네임 입력 (10자 이내)"
      ></input>
      <button className="w-full p-4 bg-pink1 font-bold text-white text-lg">닉네임 변경</button>
    </div>
  );
};

export default ChangeNickName;
