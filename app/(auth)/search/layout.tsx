import React from 'react';
import SearchHeader from '@/components/search/SearchHeader';
import Footer from '@/components/common/Footer';

interface Props {
  children: React.ReactNode;
}

const SearchLayout = ({ children }: Props) => {
  return (
    <div className="pt-[50px] pb-[70px]">
      {/* @ts-ignore */}
      <SearchHeader />
      <>{children}</>
      <Footer />
    </div>
  );
};

export default SearchLayout;
