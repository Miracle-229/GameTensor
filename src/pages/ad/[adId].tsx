/* eslint-disable react/jsx-no-useless-fragment */
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
import { IGameData } from '@/helper/Types/game';
import { useDispatch, useSelector } from 'react-redux';
import { getImageIdAction } from '@/store/imageId/imageThunk';
import { bookmarkData } from '@/store/getBookmark/getBookmarkSelector';
import { postBookmarkAction } from '@/store/postBookmark/postBookmarkThunk';
import { getBookmarkAction } from '@/store/getBookmark/getBookmarkThunk';
import { deleteBookmarkAction } from '@/store/deleteBookmark/deleteBookmarkThunk';
import { useAlert } from '@/helper/alertHooks';
import Alert from '@/components/Alert';
import { currentUserData } from '@/store/currentUser/currentUserSelector';
import { createChatAction } from '@/store/createChat/createChatThunk';
import { MdEdit } from 'react-icons/md';
import { useRouter } from 'next/router';
import { getUserNameAction } from '@/store/getUserName/getUserNameThunk';
import { userNameData } from '@/store/getUserName/getUserNameSelector';
import { setCookie } from 'cookies-next';

interface Image {
  original: string;
  thumbnail: string;
}

export default function IdGamePage({ game }: { game: IGameData }) {
  const user = useSelector(userNameData);
  const router = useRouter();
  const { adId } = router.query;
  const userData = useSelector(currentUserData);
  const { login } = userData;
  const role =
    Array.isArray(userData.roles) &&
    userData.roles.length > 0 &&
    userData.roles[0];
  const [isBookmarkLoaded, setIsBookmarkLoaded] = useState(false);
  const [images, setImages] = useState<Image[]>([]);
  const [index, setIndex] = useState(0);
  const dispatch = useDispatch<AppDispatch>();
  const bookmark = useSelector(bookmarkData);
  const { visibleError, showAlertError, hideAlertError } = useAlert();

  const handleChatClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!user) {
      event.preventDefault();
      showAlertError();
    } else if (typeof game.user.userId === 'string') {
      dispatch(createChatAction(game.user.userId));
      router.push('/chat');
    }
  };

  const editClick = () => {
    router.push(`/ad/edit/${adId}`);
    console.log(1234);
  };

  useEffect(() => {
    dispatch(getUserNameAction(game.user.login));
  }, [dispatch, game.user.login]);
  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      setCookie('user', userData, { maxAge: 60 * 60 * 24 });
    }
  }, [userData]);
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
    if (!isBookmarkLoaded) {
      dispatch(getBookmarkAction());
      setIsBookmarkLoaded(true);
    }
  }, [dispatch, isBookmarkLoaded, bookmark]);
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
          {images.length > 0 ? (
            <ImageGallery
              items={images}
              startIndex={index}
              showIndex
              lazyLoad
              showThumbnails
              useTranslate3D={false}
              showPlayButton={false}
              showBullets={false}
              showFullscreenButton={false}
              thumbnailPosition="bottom"
              slideInterval={2000}
              onSlide={(number) => setIndex(number)}
            />
          ) : (
            <Image width={650} height={350} src="/noimage.jpg" alt="noImage" />
          )}
        </div>
        <div className={style.inf_block}>
          <div style={{ display: 'flex' }}>
            <span className={style.overview}>Price:</span>
            <p style={{ marginLeft: '5px', padding: '0px' }}>{game.price}$</p>
          </div>
          <div style={{ display: 'flex' }}>
            <span className={style.overview}>Title:</span>
            <p style={{ marginLeft: '5px', padding: '0px' }}>{game.title}</p>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex' }}>
              <span className={style.overview}>Seller:</span>
              <Link
                href={`/user/${game.user.login}`}
                style={{
                  marginLeft: '5px',
                  padding: '0px',
                  borderBottom: '1px solid white',
                }}
              >
                {game.user.login}
              </Link>
            </div>
          </div>
          <div className={style.tags_box}>
            <span className={style.overview}>Tags:</span>
            {game.tags.map((item) => (
              <p className={style.overview_tags} key={game.adId}>
                {item.name}
              </p>
            ))}
          </div>
          <div style={{ display: 'flex' }}>
            {user.status === 'BLOCKED' && (
              <p className={style.overview}>User of this ad is blocked</p>
            )}
          </div>
          <div className={style.chat_row}>
            {role === 'ROLE_USER' && (
              <>
                {login !== game.user.login && user.status !== 'BLOCKED' && (
                  <button
                    className={style.chat}
                    type="button"
                    onClick={handleChatClick}
                  >
                    <IoMdChatbubbles size={25} /> Chat
                  </button>
                )}
                <>
                  {isBookmarked ? (
                    <button
                      className={`${user ? style.bookmark : style.none}`}
                      type="button"
                      onClick={unsetBookmark}
                    >
                      <FaBookmark size={35} className={style.icon} />
                    </button>
                  ) : (
                    <button
                      className={`${user ? style.bookmark : style.none}`}
                      type="button"
                      onClick={setBookmark}
                    >
                      <FaRegBookmark size={35} className={style.icon} />
                    </button>
                  )}
                  {login === game.user.login && (
                    <button
                      type="button"
                      onClick={editClick}
                      className={style.edit}
                    >
                      <MdEdit size={35} />
                    </button>
                  )}
                </>
              </>
            )}
          </div>
        </div>
      </div>
      <div className={style.description}>
        <h3>Overview</h3>
        <p>{game.description}</p>
      </div>
      <Alert
        type="error"
        message="Not authorized"
        visible={visibleError}
        onClose={hideAlertError}
      />
    </Layout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context: GetServerSidePropsContext) => {
    const id = context.params?.adId as string;
    const game = await store.dispatch(getIdAction(id));
    const { role, user } = context.req.cookies;

    if (
      (game.payload?.status === 'BLOCKED' ||
        game.payload?.status === 'CLOSED') &&
      role !== 'ROLE_ADMIN'
    ) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
    if (user) {
      const userParse = JSON.parse(user);
      if (
        userParse.login !== game.payload.user.login &&
        game.payload?.status === 'CREATED'
      ) {
        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        };
      }
    }
    if (!role && game.payload?.status === 'CREATED') {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
    if (!game.payload || game.payload === undefined) {
      return {
        notFound: true,
      };
    }

    const props = {
      game: game.payload ? game.payload : null,
    };

    return {
      props,
    };
  }
);
