
import { Ordered } from "@/types/types";
import { useRouter } from "next/navigation";

interface Props {
  shopName: string;
  shopId: number;
}

const ShopInfo = ({shopName, shopId}: Props) => {
  const router = useRouter();
  const handleMoveShop = () => {
    console.log(`shopid: ${shopId}`)
    router.push(`/detail?id=${shopId}`)
  }
  return(
    <div className='px-4 py-6 bg-white min-h-10 border-b border-grey2'>
    <div className='pb-3 font-semibold text-[1.3rem]' onClick={handleMoveShop}>{shopName}</div>
    <div className='flex'>
      <div className='flex-1 p-2 mr-1 leading-7 text-center rounded-xl border border-pink1 text-pink1'>재주문</div>
      <div className='flex-1 p-2 ml-1 leading-7 text-center rounded-xl border border-black'>리뷰쓰기</div>
    </div>
  </div>
  )
}

export default ShopInfo;