import PrevPageX from '@/components/common/PrevPageX';

interface Props {
  delState: string,
  orderType: string
}
const DeliState = ({delState, orderType} : Props) => {
  return(
    <div className='p-4 mb-2 bg-white'>
      <PrevPageX size="1.7em"/>
      <div className="pt-2 text-grey4 font-semibold text-2xl">{delState}</div>
    </div>
  )
}

export default DeliState;