'use client';
import Head from 'next/head';
import './globals.css';
import Header from '@/components/header/Header';
import Footer from '@/components/common/Footer';
import Homes from './home/page';

export default function Home() {

  return (
    <div>
      <Head>
        <title>yogiyo</title>
        <meta name="description" content="clone yogiyo"></meta>
      </Head>
      <main className="flex flex-col w-full pt-[50px] pb-[70px]">
        <Header />
        <Homes />
        <Footer />
      </main>
    </div>
  );
}
