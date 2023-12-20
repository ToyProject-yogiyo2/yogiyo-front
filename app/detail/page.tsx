import DetailHeader from '@/components/detail/DetailHeader';
import HeadSlider from '@/components/detail/HeadSlider';
import MiddleTitle from '@/components/detail/MiddleTitle';

const Detail = () => {
  return (
    <div className="">
      <DetailHeader />
      <HeadSlider />
      <MiddleTitle />
      <div className="h-[1000px]" />
    </div>
  );
};

export default Detail;
