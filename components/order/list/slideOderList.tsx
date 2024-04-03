import { OrderList } from "@/types/types";
import { useRouter } from "next/navigation";
import { orderListAtom } from "@/recoil/order";
import { useRecoilValue } from "recoil";

const SlideOrderList = () => {
  const router = useRouter();
  const orderList = useRecoilValue(orderListAtom);

  const handleClickOrder= () => {
    router.push('/order')
  }
  const handleClickLinkOrderList = () => {
    router.push('/home')
  }

  return (
    <div className="pl-4 pr-4 pb-4 bg-white">
      <div className="pt-3 pb-3 font-semibold">내가 주문한 맛집</div>
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex w-fit" >
          {orderList.map((item, index)=>{
            return(
            <div key={index} className="border rounded-2xl w-[240px] h-[80px] bg-white flex mr-2 overflow-hidden">
              <div className="w-[80px] p-[8px]">
                <div className="w-full h-full rounded-[10px] bg-grey2"></div>
              </div>
            </div>
            );
          })}
          <div className="w-[240px] h-[80px]">더 보기</div>
          <div className="w-[240px] h-[80px]" onClick={handleClickOrder}>(임시:주문하기)</div>
          <div className="w-[240px] h-[80px]" onClick={handleClickLinkOrderList}>(임시:홈으로)</div>
        </div>
      </div>
    </div>
  );
};

export default SlideOrderList;