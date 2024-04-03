'use client';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

const ErrorPage = () => {
  const [count, setCount] = useState(5);
  const router = useRouter();
  const params = useSearchParams();
  const code = params.get('code');

  useEffect(() => {
    if (count === 0) {
      router.push('/');
    } else {
      const redirect = setTimeout(() => {
        setCount(count - 1);
      }, 1000);

      return () => {
        clearTimeout(redirect);
      };
    }
  }, [count]);

  let message = '';

  switch (code) {
    case '001':
      message = '로그인에 실패했습니다.';
      break;
    case '002':
      message = '해당 페이지를 찾을 수 없습니다.';
      break;
    case '003':
      message = '접근할 수 없는 페이지입니다..';
      break;
  }

  return (
    <div>
      <p>{message}</p>
      <p>{`${count}초 후 홈 화면으로 이동합니다.`}</p>
    </div>
  );
};

export default ErrorPage;
