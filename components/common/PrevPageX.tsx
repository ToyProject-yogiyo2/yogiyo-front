import { GoX } from 'react-icons/go';
import { useRouter } from 'next/navigation';

interface Props {
  size?: string
}
const PrevPageX = (props :Props) => {
  const router = useRouter();

  const setSize = () => {
    if(props.size){
      return {fontSize: props.size}
    }else{
      return {fontSize: '2rem'}
    }
  }

  const size = setSize()
  const handleX = () => {
    router.back();
  };

  return (
    <div className='ml-[-3px]'>
      <GoX style={size} onClick={handleX} />
    </div>
  );
};

export default PrevPageX;
