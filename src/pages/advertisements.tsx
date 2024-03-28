/* eslint-disable no-plusplus */
import React, { useEffect, useState } from 'react';
import Layout from '@/layouts/Layout';
import style from '@/styles/Advertisements.module.scss';
import TagsSearch from '@/components/TagsSearch';
import { getTagsAction } from '@/store/tags/tagsThunk';
import { ITags } from '@/helper/Types/game';
import CardAds from '@/components/CardAds';
import { adsData } from '@/store/ads/adsSelector';
import { AppDispatch, wrapper } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { getAdsAction } from '@/store/ads/adsThunk';

function Advertisements({ tagsData }: { tagsData: ITags[] }) {
  const [currentPage, setCurrentPage] = useState(0);
  const dataAds = useSelector(adsData);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getAdsAction({ value: [], key: 'tags.tagId', page: currentPage }));
  }, [dispatch, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 0; i < dataAds.totalPages; i++) {
      pageNumbers.push(i);
    }

    return (
      <nav style={{ marginTop: '25px' }}>
        <ul className={style.pagination}>
          {pageNumbers.map((number) => (
            <li key={number} className={style.page_item}>
              <button
                type="button"
                onClick={() => handlePageChange(number)}
                className={`${style.page_button} ${
                  currentPage === number ? style.active : ''
                }`}
              >
                {number + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    );
  };

  return (
    <Layout title="Advertisements">
      <div className={style.main}>
        <h1>Advertisements</h1>
        <div className={style.content}>
          <TagsSearch tags={tagsData} />
          <div className={style.ads_main}>
            {dataAds.content.map((data) => (
              <CardAds key={data.adId} adsData={data} />
            ))}
          </div>
        </div>
        {dataAds.totalPages > 0 && renderPagination()}
      </div>
    </Layout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    try {
      const [tagsRes] = await Promise.all([store.dispatch(getTagsAction())]);
      const [tagsData] = await Promise.all([tagsRes.payload]);
      return {
        props: {
          tagsData,
        },
      };
    } catch (error) {
      console.error('Error fetching data:', error);
      return {
        props: {
          tagsData: [],
        },
      };
    }
  }
);

export default Advertisements;
