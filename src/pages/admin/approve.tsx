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
import { patchStatusAdAction } from '@/store/patchStatusAd/patchStatusSelectorAd';
import { TbFileSad } from 'react-icons/tb';
import { searchGamesAction } from '@/store/search/searchThunk';
import { searchData } from '@/store/search/searchSelector';

function Approve() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const dataAds = useSelector(adsData);
  const dataSearch = useSelector(searchData);
  const dispatch = useDispatch<AppDispatch>();
  const [statusFilter, setStatusFilter] = useState('CREATED');
  const [isLoading, setIsLoading] = useState(false);
  const [filteredAds, setFilteredAds] = useState<IGameData[]>([]);
  const totalPages = searchTerm ? dataSearch.totalPages : dataAds.totalPages;

  const fetchAds = async (newStatus: string) => {
    let loadingTimer;
    setIsLoading(false);

    try {
      loadingTimer = setTimeout(() => setIsLoading(true), 2000);
      const response = await dispatch(
        getAdsAction({ status: newStatus, page: currentPage })
      );
      clearTimeout(loadingTimer);
      setFilteredAds(response.payload.content);
      setIsLoading(false);
    } catch (error) {
      clearTimeout(loadingTimer);
      setIsLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchAdsData = async () => {
      let loadingTimer;
      setIsLoading(false);

      try {
        loadingTimer = setTimeout(() => setIsLoading(true), 700);
        const response = await dispatch(
          getAdsAction({ status: statusFilter, page: currentPage })
        );
        clearTimeout(loadingTimer);
        setFilteredAds(response.payload.content);
        setIsLoading(false);
      } catch (error) {
        clearTimeout(loadingTimer);
        setIsLoading(false);
        console.error(error);
      }
    };
    fetchAdsData();
  }, [dispatch, currentPage, statusFilter]);

  const search = async (query: string) => {
    let loadingTimer;
    setIsLoading(false);

    try {
      loadingTimer = setTimeout(() => setIsLoading(true), 700);
      const response = await dispatch(
        searchGamesAction({ query: `${query}%`, status: statusFilter })
      );
      clearTimeout(loadingTimer);
      if (
        Array.isArray(response.payload.content) &&
        response.payload.content.length > 0
      ) {
        setFilteredAds(response.payload.content);
      } else {
        setFilteredAds([]);
      }
      setIsLoading(false);
    } catch (error) {
      clearTimeout(loadingTimer);
      setIsLoading(false);
      console.error(error);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchTerm(query);
    if (query.trim() === '') {
      fetchAds(statusFilter);
    } else {
      search(query);
    }
  };

  const changeStatus = (newStatus: string) => {
    setStatusFilter(newStatus);
    setCurrentPage(0);
    fetchAds(newStatus);
  };

  const changeAdStatus = async (
    event: React.ChangeEvent<HTMLSelectElement>,
    adId: number
  ) => {
    const newStatus = event.target.value;
    await dispatch(patchStatusAdAction({ key: newStatus, id: adId }));
    fetchAds(statusFilter);
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
    for (let i = 0; i < totalPages; i++) {
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
            onChange={handleSearchChange}
            type="text"
          />
        </div>
        <div className={style.status_select}>
          <select
            value={statusFilter}
            onChange={(e) => changeStatus(e.target.value)}
          >
            <option value="CREATED">New</option>
            <option value="APPROVED">Approved</option>
            <option value="BLOCKED">Blocked</option>
            <option value="CLOSED">Deleted</option>
          </select>
        </div>
        <div className={style.ads} id="scrollableDiv">
          {isLoading ? (
            <p>Loading...</p>
          ) : filteredAds.length > 0 ? (
            <>
              {filteredAds.map((data) => (
                <div className={style.ads_block} key={data.adId}>
                  {data.status !== 'CLOSED' && (
                    <select
                      defaultValue=""
                      onChange={(e) => changeAdStatus(e, data.adId)}
                    >
                      <option value="" disabled hidden>
                        Select
                      </option>
                      {data.status === 'CREATED' && (
                        <option value="CREATED">New</option>
                      )}
                      {data.status !== 'APPROVED' && (
                        <option value="APPROVED">Approved</option>
                      )}
                      {data.status !== 'BLOCKED' && (
                        <option value="BLOCKED">Blocked</option>
                      )}
                    </select>
                  )}
                  <CardAds adsData={data} />
                </div>
              ))}
            </>
          ) : (
            <p style={{ fontSize: '45px', width: '100%' }}>
              Not ads <TbFileSad />
            </p>
          )}
        </div>
        <div>{totalPages > 1 && renderPagination()}</div>
      </div>
    </AdminLayout>
  );
}

export default Approve;
