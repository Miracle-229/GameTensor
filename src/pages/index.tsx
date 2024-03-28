import CardAds from '@/components/CardAds';
import { IAdsData } from '@/helper/Types/game';
import Layout from '@/layouts/Layout';
import { getAdsAction } from '@/store/ads/adsThunk';
import { getCurrentUserAction } from '@/store/currentUser/currentUserThunk';
import { AppDispatch, wrapper } from '@/store/store';
import style from '@/styles/Home.module.scss';
import Image from 'next/image';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function Home({ adsData }: { adsData: IAdsData }) {
  const dispatch = useDispatch<AppDispatch>();
  // для проверки на netrwork
  // const dispatch = useDispatch<AppDispatch>();
  // useEffect(() => {
  //   dispatch(getAdsAction())
  //     .then((response) => {
  //       console.log(response.payload);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching types:', error);
  //       console.log([]);
  //     });
  // }, []);
  // для проверки на netrwork
  useEffect(() => {
    dispatch(getCurrentUserAction());
  }, [dispatch]);
  console.log(adsData);
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
        <div
          style={{
            marginTop: '100px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <h3 className={style.h3}>Trending advertisements</h3>
          <div className={style.ads_main}>
            {adsData.content.slice(0, 6).map((data) => (
              <CardAds key={data.adId} adsData={data} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    try {
      const [adsRes] = await Promise.all([
        store.dispatch(getAdsAction({ value: [], key: 'tags.tagId' })),
        // store.dispatch(getBookmarkAction()),
      ]);
      const [adsData] = await Promise.all([adsRes.payload]);
      return {
        props: {
          adsData,
        },
      };
    } catch (error) {
      console.error('Error fetching data:', error);
      return {
        props: {
          adsData: [],
        },
      };
    }
  }
);
