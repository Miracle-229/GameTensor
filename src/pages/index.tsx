import CartTag from '@/components/CartTag';
import { Tags } from '@/helper/Types/game';
import Layout from '@/layouts/Layout';
import { wrapper } from '@/store/store';
import { getTagsAction } from '@/store/tagsSlice';
import style from '@/styles/Home.module.scss';
import Image from 'next/image';

export default function Home({ responsiveData }: { responsiveData: Tags[] }) {
  return (
    <Layout title="GameTensor">
      <div className={style.home}>
        <div className={style.slogan}>
          <p>
            Keys to the world of entertainment in every matrix with Gametensor
          </p>
          <Image
            className={style.slogan_img}
            src="/home_man.png"
            width={220}
            height={220}
            alt="GameTensor"
          />
        </div>
        <h3 className={style.h3}>Popular tags</h3>
        <div className={style.tags_main}>
          {responsiveData.slice(0, 5).map((data) => (
            <CartTag key={data.id} dataTags={data} />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    try {
      await store.dispatch(getTagsAction());
      const state = store.getState();
      const responsive = state.tags.data;
      return {
        props: {
          responsiveData: responsive,
        },
      };
    } catch (error) {
      console.error('Error fetching types:', error);
      return {
        props: {
          responsiveData: [],
        },
      };
    }
  }
);
