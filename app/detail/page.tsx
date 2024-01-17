'use client'
import DetailHeader from '@/components/detail/DetailHeader';
import HeadSlider from '@/components/detail/HeadSlider';
import MiddleTitle from '@/components/detail/MiddleTitle';
import SignatureMenuTab from '@/components/detail/SignatureMenuTab';
import DetailMenuList from '@/components/detail/DetailMenuList';
import DetailTabMenu from '@/components/detail/DetailTabMenu';
import { useSearchParams } from 'next/navigation';

const Detail = () => {
  const searchParams = useSearchParams();
  const shopId = searchParams.get('id');
  return (
    <div className="">
      <DetailHeader />
      <HeadSlider />
      <MiddleTitle />
      <div className='border-y-[4px] border-slate-200 ' />
      <DetailTabMenu />
      <SignatureMenuTab />
      <DetailMenuList />
    </div>
  );
};

export default Detail;
