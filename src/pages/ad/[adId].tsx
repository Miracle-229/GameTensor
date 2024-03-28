/* eslint-disable import/no-extraneous-dependencies */
import Layout from '@/layouts/Layout';
import React, { useEffect, useState } from 'react';
import { IoMdChatbubbles } from 'react-icons/io';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
import 'react-image-gallery/styles/css/image-gallery.css';
import ImageGallery from 'react-image-gallery';
import style from '@/styles/GameId.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { AppDispatch, wrapper } from '@/store/store';
import { GetServerSidePropsContext } from 'next';
import { getIdAction } from '@/store/id/idThunk';
// import { images } from '@/helper/Constants/images_id';
import { IGameData } from '@/helper/Types/game';
import { useDispatch, useSelector } from 'react-redux';
import { getImageIdAction } from '@/store/imageId/imageThunk';
import {
  bookmarkData,
  bookmarkStatus,
} from '@/store/getBookmark/getBookmarkSelector';
import { postBookmarkAction } from '@/store/postBookmark/postBookmarkThunk';
import { getBookmarkAction } from '@/store/getBookmark/getBookmarkThunk';
import { deleteBookmarkAction } from '@/store/deleteBookmark/deleteBookmarkThunk';

interface Image {
  original: string;
  thumbnail: string;
}

export default function IdGamePage({ game }: { game: IGameData }) {
  const [images, setImages] = useState<Image[]>([]);
  const [index, setIndex] = useState(0);
  const dispatch = useDispatch<AppDispatch>();
  const bookmark = useSelector(bookmarkData);
  const bookmarkCheck = useSelector(bookmarkStatus);
  useEffect(() => {
    const fetchImages = async () => {
      const promises = game.medias.map((media) =>
        dispatch(getImageIdAction(media.amId))
      );
      const results = await Promise.all(promises);
      const formattedImages = results.map((result) => ({
        original: result.payload as string,
        thumbnail: result.payload as string,
      }));
      setImages(formattedImages);
    };

    fetchImages();
  }, [dispatch, game]);
  const setBookmark = async () => {
    await dispatch(postBookmarkAction(game.adId));
    dispatch(getBookmarkAction());
  };
  const unsetBookmark = async () => {
    const bookmarkedAd = bookmark.find((item) => item.ad.adId === game.adId);
    if (bookmarkedAd) {
      await dispatch(deleteBookmarkAction(bookmarkedAd.bookmarkId));
    }
    dispatch(getBookmarkAction());
  };
  useEffect(() => {
    if (bookmarkCheck !== 'succeeded') {
      dispatch(getBookmarkAction());
    }
  }, [dispatch, bookmarkCheck, bookmark]);
  const isBookmarked = bookmark.some((item) => item.ad.adId === game.adId);

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
    <Layout title={`${game.title}`}>
      <div className={style.main}>
        <div className={style.img_block}>
          <ImageGallery
            items={images}
            startIndex={index}
            showIndex
            lazyLoad
            showThumbnails
            useTranslate3D={false}
            showPlayButton={false}
            showBullets={false}
            thumbnailPosition="bottom"
            slideInterval={2000}
            onSlide={(number) => setIndex(number)}
          />
        </div>
        <div className={style.inf_block}>
          <h4>{game.price}$</h4>
          <h3>{game.title}</h3>
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
            <h5 style={{ marginLeft: '20px' }}>{game.user.login}</h5>
          </div>
          <div style={{ display: 'flex' }}>
            <span className={style.overview}>Tags:</span>
            {game.tags.map((item) => (
              <p style={{ marginLeft: '5px' }} key={game.adId}>
                {item.name}
              </p>
            ))}
          </div>
          <div className={style.chat_row}>
            <Link className={style.chat} href="/">
              <IoMdChatbubbles size={25} /> Chat
            </Link>
            {isBookmarked ? (
              <button
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                }}
                type="button"
                onClick={unsetBookmark}
              >
                <FaBookmark size={35} />
              </button>
            ) : (
              <button
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                }}
                type="button"
                onClick={setBookmark}
              >
                <FaRegBookmark size={35} />
              </button>
            )}
          </div>
        </div>
      </div>
      <div className={style.description}>
        <h3>Overview</h3>
        <p>{game.description}</p>
      </div>
    </Layout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context: GetServerSidePropsContext) => {
    try {
      const id = context.params?.adId as string;
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
