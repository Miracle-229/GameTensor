import Layout from '@/layouts/Layout';
import React, { useEffect } from 'react';
import style from '@/styles/Bookmarks.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { getBookmarkAction } from '@/store/getBookmark/getBookmarkThunk';
import {
  bookmarkData,
  bookmarkStatus,
} from '@/store/getBookmark/getBookmarkSelector';
import CardAds from '@/components/CardAds';

function Bookmarks() {
  const bookmark = useSelector(bookmarkData);
  const bookmarkCheck = useSelector(bookmarkStatus);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (bookmarkCheck !== 'succeeded') {
      dispatch(getBookmarkAction());
    }
  }, [dispatch, bookmarkCheck, bookmark]);
  console.log(bookmark);
  return (
    <Layout title="Bookmarks">
      <div className={style.main}>
        <h1>Bookmarks</h1>
        <div className={style.ads_main}>
          {bookmark.map((item) => (
            <CardAds key={item.ad.adId} adsData={item.ad} />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Bookmarks;
