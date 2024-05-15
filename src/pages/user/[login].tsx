import Layout from '@/layouts/Layout';
import React, { useEffect, useState } from 'react';
import style from '@/styles/UserId.module.scss';
import CardAds from '@/components/CardAds';
import FollowModal from '@/components/FollowModal';
import { FaSearch } from 'react-icons/fa';
import { IAuth, IGameData } from '@/helper/Types/game';
import { useDispatch, useSelector } from 'react-redux';
import { MdEdit, MdDelete } from 'react-icons/md';
import { IoMdChatbubbles } from 'react-icons/io';
import { currentUserData } from '@/store/currentUser/currentUserSelector';
import { AppDispatch, wrapper } from '@/store/store';
import { getAdsAction } from '@/store/ads/adsThunk';
import { adsData } from '@/store/ads/adsSelector';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { setCookie } from 'cookies-next';
import { getCurrentUserAction } from '@/store/currentUser/currentUserThunk';
import { getBookmarkAction } from '@/store/getBookmark/getBookmarkThunk';
import { subscribeAction } from '@/store/subscribe/subscribeThunk';
import { patchStatusAdAction } from '@/store/patchStatusAd/patchStatusSelectorAd';
import { GetServerSidePropsContext } from 'next';
import { getUserNameAction } from '@/store/getUserName/getUserNameThunk';
import { useAlert } from '@/helper/alertHooks';
import Alert from '@/components/Alert';
import { createChatAction } from '@/store/createChat/createChatThunk';

// import { onSubscribeAction } from '@/store/onSubscribe/onSubscribeThunk';

export default function IdUserPage({ userData }: { userData: IAuth }) {
  const user = userData;
  const { visibleError, showAlertError, hideAlertError } = useAlert();
  const router = useRouter();
  const { login } = router.query;
  const dispatch = useDispatch<AppDispatch>();
  const subscribers = user.subscribers || [];
  const [activeTab, setActiveTab] = useState('APPROVED');
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  const currentUser = useSelector(currentUserData);
  const flag = login === currentUser.login;
  const ads = useSelector(adsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const filteredAds = ads.content
    .slice(0.8)
    .filter((ad: IGameData) =>
      ad.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (login) {
      dispatch(
        getAdsAction({ key: 'user.login', value: login, status: activeTab })
      );
    }
  }, [dispatch, login, activeTab]);

  const handleChatClick = () => {
    if (!user) {
      showAlertError();
    } else if (typeof user.userId === 'string') {
      dispatch(createChatAction(user.userId));
      router.push('/chat');
    }
  };

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      setCookie('user', currentUser, { maxAge: 60 * 60 * 24 });
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      await dispatch(getCurrentUserAction());
    };
    const fetchBookmarks = async () => {
      await dispatch(getBookmarkAction());
    };

    fetchCurrentUser();
    fetchBookmarks();
  }, [dispatch, login]);

  const subscribe = async (id: string) => {
    await dispatch(subscribeAction(id));
  };

  const deleteAd = async (adId: number) => {
    await dispatch(patchStatusAdAction({ key: 'CLOSED', id: adId }));
    dispatch(
      getAdsAction({ key: 'user.login', value: login, status: activeTab })
    );
  };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      await dispatch(getCurrentUserAction());
    };
    fetchCurrentUser();
  }, [dispatch]);

  return (
    <Layout title={`${login}`}>
      <div className={style.main}>
        <div className={style.profile}>
          <div className={style.profile_inf}>
            <p>{user?.login}</p>
            <div className={style.profile_inf_follow}>
              <button onClick={openModal} type="button">
                Followers: {user.subscribers?.length}
              </button>
              <button type="button">Following: 123</button>
            </div>
            {login !== currentUser.login && (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <button
                  onClick={() => subscribe(user.userId as string)}
                  type="button"
                >
                  Subscribe
                </button>
                <button
                  type="button"
                  className={style.chat}
                  onClick={handleChatClick}
                >
                  <IoMdChatbubbles size={25} /> Chat
                </button>
              </div>
            )}
          </div>
        </div>
        {user.status === 'ACTIVE' ? (
          <>
            {' '}
            <FollowModal
              flag={flag}
              users={subscribers}
              isOpen={open}
              onClose={closeModal}
            />
            <div className={style.input}>
              <FaSearch size={22} />
              <input
                placeholder="Search ads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
              />
            </div>
            <div className={style.ads_main}>
              {login === currentUser.login && (
                <div className={style.tabs}>
                  <button
                    type="button"
                    className={
                      activeTab === 'APPROVED' ? style.tab_active : style.tab
                    }
                    onClick={() => handleTabChange('APPROVED')}
                  >
                    Approved
                  </button>
                  <button
                    type="button"
                    className={
                      activeTab === 'CREATED' ? style.tab_active : style.tab
                    }
                    onClick={() => handleTabChange('CREATED')}
                  >
                    Created
                  </button>
                  <button
                    type="button"
                    className={
                      activeTab === 'BLOCKED' ? style.tab_active : style.tab
                    }
                    onClick={() => handleTabChange('BLOCKED')}
                  >
                    Blocked
                  </button>
                </div>
              )}
              {login === currentUser.login ? (
                <>
                  {activeTab === 'APPROVED' && (
                    <div className={style.ads}>
                      {filteredAds.map((data) => (
                        <div key={data.adId}>
                          <div className={style.adiId_buttons}>
                            <Link href={`/ad/edit/${data.adId}`}>
                              <MdEdit size={25} />
                            </Link>
                            <button
                              onClick={() => deleteAd(data.adId)}
                              type="button"
                            >
                              <MdDelete size={26} />
                            </button>
                          </div>
                          <CardAds adsData={data} />
                        </div>
                      ))}
                    </div>
                  )}
                  {activeTab === 'CREATED' && (
                    <div className={style.ads}>
                      {filteredAds.map((data) => (
                        <div key={data.adId}>
                          <div className={style.adiId_buttons}>
                            <Link href={`/ad/edit/${data.adId}`}>
                              <MdEdit size={25} />
                            </Link>
                            <button
                              onClick={() => deleteAd(data.adId)}
                              type="button"
                            >
                              <MdDelete size={26} />
                            </button>
                          </div>
                          <CardAds adsData={data} />
                        </div>
                      ))}
                    </div>
                  )}
                  {activeTab === 'BLOCKED' && (
                    <div className={style.ads}>
                      {filteredAds.map((data) => (
                        <div key={data.adId}>
                          <div className={style.adiId_buttons}>
                            <Link href={`/ad/edit/${data.adId}`}>
                              <MdEdit size={25} />
                            </Link>
                            <button
                              onClick={() => deleteAd(data.adId)}
                              type="button"
                            >
                              <MdDelete size={26} />
                            </button>
                          </div>
                          <CardAds adsData={data} />
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className={style.ads}>
                  {filteredAds.map((data) => (
                    <div key={data.adId}>
                      <CardAds adsData={data} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        ) : (
          <div>
            <h3 style={{ marginTop: '20px' }}>This user is blocked</h3>
          </div>
        )}
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
    try {
      const login = context.params?.login as string;
      const [usersRes] = await Promise.all([
        store.dispatch(getUserNameAction(login)),
      ]);
      const [userData] = await Promise.all([usersRes.payload]);
      return {
        props: {
          userData,
        },
      };
    } catch (error) {
      console.error('Error fetching data:', error);
      return {
        props: {
          userData: [],
        },
      };
    }
  }
);
