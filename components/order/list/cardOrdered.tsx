import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import { orderListAtom } from "@/recoil/order";

const CardOrdered = () => {
  //const orderStateMap = ['주문확인','조리중','배달중','배달완료'];
  //const orderTypeMap = ['가게배달', '포장'];
  const router = useRouter();
  const orderList = useRecoilValue(orderListAtom);

  const handleReOrder = (shopId : number) => {
    router.push(`/detail?id=${shopId}`)
  }
  const handleWriteReview = (orderId : number) => {
    console.log(`주문번호 [${orderId}] 의 내용을 장바구니에 담고 주문 경로로 이동해야함`)
  }
  const handleOrderDetail = (orderId : number) => {
    router.push(`/order/detail/${orderId}`)
  }

  return(
    <div className="">
      {
        orderList.map((order, index)=>{
          return(
              <div key={index} className="mt-2 p-4 bg-white">
                <div className="pb-4 flex flex-row text-center">
                  <div className="w-[80px] text-xs font-semibold p-1 rounded-lg bg-grey1">{order.orderType}</div>
                  <div className="flex-1 text-left pl-2 text-sm text-grey3">{order.orderTime}</div>
                  <div className="w-[80px] text-grey4 font-semibold">{order.status}</div>
                </div>
                <div className="flex h-[76px]">
                  <div className="w-[76px] h-[76px] bg-grey2 rounded-xl"></div>
                  <div className="flex-1 pl-4">
                    <div className="h-1/2 pb-2">
                      <p className="font-bold leading-5">{order.shopName}</p>
                      <p className="">{order.menuName}</p>
                    </div>
                    <div className="h-1/2 pt-2 flex flex-row">
                      <div className="h-full flex-1 pr-2">
                        <button className={`${buttonStyles.active}`} onClick={()=>handleReOrder(order.shopId)}>재주문</button>
                      </div>
                      <div className="h-full flex-1 pr-2">
                        <button className={`${buttonStyles.inactive}`} onClick={()=>handleWriteReview(order.orderId)}>리뷰쓰기</button>
                      </div>
                      <div className="h-full flex-1 pr-2">
                        <button className={`${buttonStyles.inactive}`} onClick={()=>handleOrderDetail(order.orderId)}>주문상세</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          );
        })
      }
    </div>
  );
};

export default CardOrdered;

const buttonStyles = {
  active:
    'w-full h-full rounded-lg border text-sm font-semibold border-pink1 text-pink1 text-center',
  inactive:
    'w-full h-full rounded-lg border text-sm font-semibold border-grey4 text-grey4 text-center',
};
