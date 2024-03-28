/* eslint-disable no-plusplus */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import AdminLayout from '@/layouts/AdminLayot';
import { FaSearch } from 'react-icons/fa';
import style from '@/styles/AdminApprove.module.scss';
import CardAds from '@/components/CardAds';
import { IGameData } from '@/helper/Types/game';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { adsData } from '@/store/ads/adsSelector';
import { getAdsAction } from '@/store/ads/adsThunk';

function Approve() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const dataAds = useSelector(adsData);
  const dispatch = useDispatch<AppDispatch>();
  const [statusFilter, setStatusFilter] = useState('all');
  console.log(dataAds);
  useEffect(() => {
    dispatch(getAdsAction({ value: [], key: 'tags.tagId', page: currentPage }));
  }, [dispatch, currentPage]);

  const filteredAds = dataAds.content.filter(
    (ad: IGameData) =>
      ad.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === 'all' || ad.status === statusFilter) // Include status filter
  );

  const changeStatus = (newStatus: string) => {
    setStatusFilter(newStatus);
    setCurrentPage(0);
    dispatch(getAdsAction({ value: [], key: 'tags.tagId', page: 0 }));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const scrollableDiv = document.getElementById('scrollableDiv');
    if (scrollableDiv) {
      scrollableDiv.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
    <AdminLayout title="Approve advertisements">
      <div className={style.main}>
        <h1>Approve</h1>
        <div className={style.input}>
          <FaSearch size={22} />
          <input
            placeholder="Search ads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
          />
        </div>
        <div className={style.status_select}>
          <select
            value={statusFilter}
            onChange={(e) => changeStatus(e.target.value)}
          >
            <option value="all">All</option>
            <option value="CREATED">New</option>
            <option value="APPROVED">Approved</option>
            <option value="BLOCKED">Blocked</option>
          </select>
        </div>
        <div className={style.ads} id="scrollableDiv">
          {filteredAds.map((data) => (
            <div className={style.ads_block} key={data.adId}>
              <select
                defaultValue={
                  data.status === 'CREATED'
                    ? 'CREATED'
                    : data.status === 'APPROVED'
                      ? 'APPROVED'
                      : 'BLOCKED'
                }
              >
                <option value="CREATED">New</option>
                <option value="APPROVED">Approved</option>
                <option value="BLOCKED">Blocked</option>
              </select>
              <CardAds adsData={data} />
            </div>
          ))}
        </div>
        <div>{dataAds.totalPages > 0 && renderPagination()}</div>
      </div>
    </AdminLayout>
  );
}

export default Approve;
