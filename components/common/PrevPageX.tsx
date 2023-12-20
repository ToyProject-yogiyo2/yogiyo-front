import { GoX } from 'react-icons/go';
import { useRouter } from 'next/navigation';

const PrevPageX = () => {
  const router = useRouter();
  //const back = router.back;

  const handleX = () => {
    router.back();
  };

  return (
    <>
      <GoX className="text-[2rem]" onClick={handleX} />
    </>
  );
};

export default PrevPageX;
