import CartTag from '@/components/CartTag';
import Layout from '@/layouts/Layout';
import style from '@/styles/Home.module.scss';

export default function Home() {
  return (
    <Layout title="GameTensor">
      <h3 className={style.h3}>Popular tags</h3>
      <CartTag />
    </Layout>
  );
}
