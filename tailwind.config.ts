import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        yoblue: '#4286f5',
        yopink: '#f90050',
        yopink2: '#fff478',
        yogrey: '#f5f5f5',
        yogrey2: '#d3d3d3',
        yogrey3: '#bbbbbb',
        yogrey4: '#9c9c9c',
        yogrey5: '#666666',
        yogrey6: '#EFEFEF',
        yoblack: '#333333',
        yocgrey1: '#eef3f6',
        yocgrey2: '#dfe4e8',
        yoyellow: '#FDC912',
        kakao: '#F6E24B',
        naver: '#77C261',
        
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
export default config;
