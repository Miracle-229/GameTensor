import Sidebar from '@/components/Sidebar';
import { LayoutProps } from '@/helper/Types/game';
import Head from 'next/head';

export default function AdminLayout({ children, title }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        {children}
      </div>
    </>
  );
}