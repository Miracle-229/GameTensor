/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect, useState } from 'react';
import style from '@/styles/CardAds.module.scss';
import Image from 'next/image';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
import { IGameData } from '@/helper/Types/game';
import { useDispatch, useSelector } from 'react-redux';
import { imageIdData } from '@/store/imageId/imageIdSelector';
import { fetchImageId } from '@/store/imageId/imageThunk';
import { AppDispatch } from '@/store/store';
import { postBookmarkAction } from '@/store/postBookmark/postBookmarkThunk';
import Link from 'next/link';
import { getBookmarkAction } from '@/store/getBookmark/getBookmarkThunk';
import { bookmarkData } from '@/store/getBookmark/getBookmarkSelector';
import { deleteBookmarkAction } from '@/store/deleteBookmark/deleteBookmarkThunk';
import { getCookie } from 'cookies-next';

function CardAds({ adsData }: { adsData: IGameData }) {
  const user = getCookie('user');
  const dispatch = useDispatch<AppDispatch>();
  const imageSrc = useSelector(imageIdData)[adsData.adId];
  const bookmark = useSelector(bookmarkData);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const setBookmark = async () => {
    await dispatch(postBookmarkAction(adsData.adId));
    dispatch(getBookmarkAction());
  };
  useEffect(() => {
    setIsClient(true);
  }, []);
  const unsetBookmark = async () => {
    const bookmarkedAd = bookmark.find((item) => item.ad.adId === adsData.adId);
    if (bookmarkedAd) {
      await dispatch(deleteBookmarkAction(bookmarkedAd.bookmarkId));
    }
    dispatch(getBookmarkAction());
  };
  useEffect(() => {
    if (adsData.medias && adsData.medias.length > 0 && !imageLoaded) {
      const { amId } = adsData.medias[0];
      dispatch(fetchImageId(amId, adsData.adId.toString()));
      setImageLoaded(true);
    }
  }, [adsData.adId, adsData.medias, imageLoaded, dispatch]);
  const isBookmarked = bookmark.some((item) => item.ad.adId === adsData.adId);
  return (
    <div className={style.main}>
      {imageSrc ? (
        <Link href={`/ad/${adsData.adId}`}>
          <Image
            className={style.image}
            src={imageSrc}
            width={265}
            placeholder="blur"
            blurDataURL="/blur.jpg"
            height={165}
            alt="GameTensor"
            loading="lazy"
          />
        </Link>
      ) : (
        <Link href={`/ad/${adsData.adId}`}>
          <Image
            className={style.image}
            src="/noimage.jpg"
            width={265}
            height={165}
            alt="GameTensor"
          />
        </Link>
      )}
      <div className={style.ads_inf_main}>
        <div className={style.inf}>
          <h3>
            {adsData?.title?.length > 21
              ? `${adsData.title.slice(0, 20)}...`
              : adsData?.title || 'НЕИЗВЕСТНОЕ НАЗВАНИЕ'}
          </h3>
        </div>
        <div className={style.active}>
          <p> $ {adsData.price}</p>
          <Link href={`/user/${adsData?.user.login}`}>
            <h4>
              {adsData?.user.login?.length > 9
                ? `@${adsData.user.login.slice(0, 8)}...`
                : `@${adsData?.user.login}` || 'НЕИЗВЕСТНОЕ НАЗВАНИЕ'}
            </h4>
          </Link>
          {user && isClient ? (
            <>
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
                  <FaBookmark className={style.icon} />
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
                  <FaRegBookmark className={style.icon} />
                </button>
              )}
            </>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}

export default CardAds;
