import CardAds from '@/components/CardAds';
import CardTag from '@/components/CardTag';
import { IAds, ITags } from '@/helper/Types/game';
import Layout from '@/layouts/Layout';
import { getAdsAction } from '@/store/ads/adsThunk';
import { wrapper } from '@/store/store';
import { getTagsAction } from '@/store/tags/tagsThunk';
import style from '@/styles/Home.module.scss';
import Image from 'next/image';
import Link from 'next/link';

export default function Home({
  tagsData,
  adsData,
}: {
  tagsData: ITags[];
  adsData: IAds[];
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
              <Link href={`/${data.id}`} key={data.id}>
                <CardAds adsData={data} />
              </Link>
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
