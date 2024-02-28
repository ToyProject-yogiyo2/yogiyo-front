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
        blue1: '#4286f5',
        pink1: '#f90050',
        yellow1: '#FDC912',
        grey1: '#f5f5f5',
        grey2: '#d3d3d3',
        grey3: '#bbbbbb',
        grey4: '#9c9c9c',
        grey5: '#666666',
        grey6: '#333333',
        grey7: '#eef3f6',
        grey8: '#dfe4e8',
        grey9: '#EFEFEF',
        kakao: '#F6E24B',
        naver: '#77C261',
        
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
export default config;
