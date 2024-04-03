import './globals.css';
import type { Metadata } from 'next';

import { noto_sans } from '@/lib/font';
import RecoilRootWrapper from './RecoilRootWrapper';

export const metadata: Metadata = {
  title: 'yogiyo front test',
  description: 'test app',
  keywords: ['yogiyo', 'clone'],
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko">
      <body className={noto_sans.className}>
        <RecoilRootWrapper>{children}</RecoilRootWrapper>
      </body>
    </html>
  );
}

export default RootLayout;