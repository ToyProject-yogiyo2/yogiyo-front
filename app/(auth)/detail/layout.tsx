import Footer from '@/components/common/Footer';
import React from 'react';

const DetailLayout = ({ children }: {children: React.ReactNode}) => {
  return (
    <main className="">
      {/* @ts-ignore */}
      <>{children}</>
    </main>
  );
};

export default DetailLayout;