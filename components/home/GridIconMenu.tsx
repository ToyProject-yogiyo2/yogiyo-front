'use client'
import Link from 'next/link';
import { gridIconList } from '@/lib/commonData';
import { shopApi } from '@/services/shopApi';

const GridIconMenu = () => {
  const bgIcon = (param: number) => {
    return {
      backgroundImage: `url(/img/menu_icon_${param + 1}.svg)`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    };
  };

  async function getShopList() {
    try {
      const response = await shopApi.fetchShopList({
        category: '치킨',
        sortOption: 'CLOSEST',
        deliveryPrice: 3000,
        leastOrderPrice: 10000,
        longitude: 127.0215778,
        latitude: 37.5600233,
        offset: 0,
        limit: 5
      });
      console.log('Shop List:', response);
    } catch (error) {
      console.error('Error fetching shop list:', error);
    }
  }

  getShopList()

  return (
    <div className="grid grid-cols-5 gap-4 min-h-[400px] p-4">
      {gridIconList.map((menuName, i) => {
        return (
          <Link
            href={{
              pathname: 'home/marketList',
              query: {
                menu: menuName,
              },
            }}
            key={i}
            className="w-full h-full flex flex-col justify-center items-center"
          >
            <i className={`w-[50px] h-[50px]`} style={bgIcon(i)}></i>
            <span className="text-[0.8rem] font-bold tracking-tighter whitespace-nowrap">
              {menuName}
            </span>
          </Link>
        );
      })}
    </div>
  );
};

export default GridIconMenu;
