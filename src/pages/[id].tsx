/* eslint-disable import/no-extraneous-dependencies */
import Layout from '@/layouts/Layout';
import React, { useState } from 'react';
import { IoMdChatbubbles } from 'react-icons/io';
import { IoBookmarkOutline } from 'react-icons/io5';
import { AiOutlineLike } from 'react-icons/ai';
import 'react-image-gallery/styles/css/image-gallery.css';
import ImageGallery from 'react-image-gallery';
import style from '@/styles/Id.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { useMediaQuery } from 'react-responsive';
import { wrapper } from '@/store/store';
import { GetServerSidePropsContext } from 'next';
import { getIdAction } from '@/store/id/idThunk';
import { images } from '@/helper/Constants/images_id';
import { IGameData } from '@/helper/Types/game';

export default function IdPage({ game }: { game: IGameData }) {
  const [index, setIndex] = useState(0);
  const isPhone = useMediaQuery({ minWidth: 345, maxWidth: 431 });
  let position: 'left' | 'bottom' = 'left';
  const uuid = crypto.randomUUID();
  if (isPhone) {
    position = 'bottom';
  }
  // для проверки на netrwork
  // const router = useRouter();
  // const { id } = router.query;
  // const dispatch = useDispatch<AppDispatch>();

  // useEffect(() => {
  //   let idValue = '';
  //   if (Array.isArray(id)) {
  //     idValue = id[0] ?? '';
  //   } else {
  //     idValue = id ?? '';
  //   }
  //   dispatch(getIdAction(idValue))
  //     .then((response) => {
  //       console.log(response.payload);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching types:', error);
  //       console.log([]);
  //     });
  // }, [id]);
  // для проверки на netrwork
  if (!game) {
    return <div>Loading...</div>;
  }
  return (
    <Layout title="id">
      <div className={style.main}>
        <div className={style.img_block}>
          <ImageGallery
            items={images}
            startIndex={index}
            showIndex
            lazyLoad
            showThumbnails
            showPlayButton={false}
            showBullets={false}
            thumbnailPosition={position}
            slideInterval={2000}
            onSlide={(number) => setIndex(number)}
          />
        </div>
        <div className={style.inf_block}>
          <h4>{game.metacritic}$</h4>
          <h3>{game.name}</h3>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Image
              src="/ava.jpg"
              width={50}
              height={50}
              className={style.user_img}
              alt="avatar"
            />
            <h5 style={{ marginLeft: '20px' }}>{game.slug}</h5>
          </div>
          <div style={{ display: 'flex' }}>
            <span className={style.overview}>Platform:</span>
            {game.parent_platforms.map((platformData) => (
              <p style={{ marginLeft: '5px' }} key={uuid}>
                {platformData.platform.slug}
              </p>
            ))}
          </div>
          <div style={{ display: 'flex' }}>
            <span className={style.overview}>Tags:</span>
            {game.genres.map((item) => (
              <p style={{ marginLeft: '5px' }} key={uuid}>
                {item.name}
              </p>
            ))}
          </div>
          <div className={style.chat_row}>
            <Link className={style.chat} href="/">
              <IoMdChatbubbles size={25} /> Chat
            </Link>
            <button className={style.button} type="button">
              <IoBookmarkOutline size={35} />
            </button>
            <p>{game.playtime}</p>
            <button className={style.button} type="button">
              <AiOutlineLike size={35} />
            </button>
          </div>
        </div>
      </div>
      <div className={style.description}>
        <h3>Overview</h3>
        <p>{game.description_raw}</p>
      </div>
    </Layout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context: GetServerSidePropsContext) => {
    try {
      const id = context.params?.id as string;
      const game = await store.dispatch(getIdAction(id));
      if (!game.payload) {
        return {
          notFound: true,
        };
      }
      return {
        props: {
          game: game.payload ? game.payload : null,
        },
      };
    } catch (error) {
      console.error('Error fetching data:', error);
      return {
        props: {
          game: null,
        },
      };
    }
  }
);
