import CardAds from '@/components/CardAds';
import CardTag from '@/components/CardTag';
import { Ads, Tags } from '@/helper/Types/game';
import Layout from '@/layouts/Layout';
import { getAdsAction } from '@/store/adsSlice';
import { wrapper } from '@/store/store';
import { getTagsAction } from '@/store/tagsSlice';
import style from '@/styles/Home.module.scss';
import Image from 'next/image';

export default function Home({
  tagsData,
  adsData,
}: {
  tagsData: Tags[];
  adsData: Ads[];
}) {
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
        <div style={{ marginTop: '100px' }}>
          <h3 className={style.h3}>Popular tags</h3>
          <div className={style.tags_main}>
            {tagsData.slice(0, 5).map((data) => (
              <CardTag key={data.id} dataTags={data} />
            ))}
          </div>
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
            {adsData.slice(0, 6).map((data) => (
              <CardAds key={data.id} adsData={data} />
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
      const [tagsRes, adsRes] = await Promise.all([
        store.dispatch(getTagsAction()),
        store.dispatch(getAdsAction()),
      ]);
      const [tagsData, adsData] = await Promise.all([
        tagsRes.payload,
        adsRes.payload,
      ]);
      return {
        props: {
          tagsData,
          adsData,
        },
      };
    } catch (error) {
      console.error('Error fetching data:', error);
      return {
        props: {
          tagsData: [],
          adsData: [],
        },
      };
    }
  }
);
