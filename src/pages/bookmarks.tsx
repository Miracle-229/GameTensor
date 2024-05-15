import Layout from '@/layouts/Layout';
import React, { useEffect, useState } from 'react';
import style from '@/styles/Bookmarks.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { getBookmarkAction } from '@/store/getBookmark/getBookmarkThunk';
import { bookmarkData } from '@/store/getBookmark/getBookmarkSelector';
import CardAds from '@/components/CardAds';
import { useAlert } from '@/helper/alertHooks';
import Alert from '@/components/Alert';

function Bookmarks() {
  const bookmark = useSelector(bookmarkData);
  const dispatch = useDispatch<AppDispatch>();
  const [isBookmarkLoaded, setIsBookmarkLoaded] = useState(false);
  const { showAlertError, hideAlertError, visibleError } = useAlert();
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!isBookmarkLoaded) {
          await dispatch(getBookmarkAction());
          setIsBookmarkLoaded(true);
        }
      } catch (error) {
        showAlertError();
        console.error('Error fetching bookmark:', error);
      }
    };
    fetchData();
  }, [dispatch, isBookmarkLoaded, showAlertError]);
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
      <Alert
        type="error"
        message="Error to create tag"
        visible={visibleError}
        onClose={hideAlertError}
      />
    </Layout>
  );
}

export default Bookmarks;
