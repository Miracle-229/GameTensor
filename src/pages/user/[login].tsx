import Layout from '@/layouts/Layout';
import React, { useEffect, useState } from 'react';
import style from '@/styles/UserId.module.scss';
import CardAds from '@/components/CardAds';
import FollowModal from '@/components/FollowModal';
import { FaSearch } from 'react-icons/fa';
import { IGameData } from '@/helper/Types/game';
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
import { getUserNameAction } from '@/store/getUserName/getUserNameThunk';
import { useAlert } from '@/helper/alertHooks';
import Alert from '@/components/Alert';
import { createChatAction } from '@/store/createChat/createChatThunk';
import { onSubscribeAction } from '@/store/onSubscribe/onSubscribeThunk';
import { userNameData } from '@/store/getUserName/getUserNameSelector';
import { GetServerSidePropsContext } from 'next';

export default function IdUserPage() {
  const { visibleError, showAlertError, hideAlertError } = useAlert();
  const router = useRouter();
  const { login } = router.query;
  const user = useSelector(userNameData);
  const dispatch = useDispatch<AppDispatch>();
  const subscribers = user.subscribers || [];
  const followers = user.followers || [];
  const [activeTab, setActiveTab] = useState('APPROVED');
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  const currentUser = useSelector(currentUserData);
  const flag = login === currentUser.login;
  const role =
    Array.isArray(currentUser.roles) &&
    currentUser.roles.length > 0 &&
    currentUser.roles[0];
  const ads = useSelector(adsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFollowing, setIsFollowing] = useState(false);
  const [openSubscribers, setOpenSubscribers] = useState(false);
  const [openFollowers, setOpenFollowers] = useState(false);
  const filteredAds = ads.content
    .slice(0.8)
    .filter((ad: IGameData) =>
      ad.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const openModalSubscribers = () => {
    setOpenSubscribers(true);
  };

  const closeModalSubscribers = () => {
    setOpenSubscribers(false);
  };

  const openModalFollowers = () => {
    setOpenFollowers(true);
  };

  const closeModalFollowers = () => {
    setOpenFollowers(false);
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
    dispatch(getUserNameAction(user.login));
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

  const onSubscribe = async (id: string) => {
    await dispatch(onSubscribeAction(id));
    dispatch(getUserNameAction(user.login));
  };
  useEffect(() => {
    if (currentUser?.followers) {
      setIsFollowing(
        currentUser.followers.some(
          (follower) => follower.userId === user.userId
        )
      );
    }
  }, [currentUser, user.userId]);

  const handleSubscribe = () => {
    if (isFollowing) {
      onSubscribe(user.userId!.toString());
      setIsFollowing(false);
    } else {
      subscribe(user.userId!.toString());
      setIsFollowing(true);
    }
  };

  useEffect(() => {
    if (typeof login === 'string') {
      dispatch(getUserNameAction(login));
    }
  }, [login, dispatch]);
  return (
    <Layout title={`${login}`}>
      <div className={style.main}>
        <div className={style.profile}>
          <div className={style.profile_inf}>
            <p>{user?.login}</p>
            {user.status !== 'BLOCKED' && (
              <div className={style.profile_inf_follow}>
                <button onClick={openModalSubscribers} type="button">
                  Followers: {user.subscribers?.length}
                </button>
                <button onClick={openModalFollowers} type="button">
                  Following: {user.followers?.length}
                </button>
              </div>
            )}
            {role === 'ROLE_USER' &&
              login !== currentUser.login &&
              user.status !== 'BLOCKED' && (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <button onClick={handleSubscribe} type="button">
                    {isFollowing ? 'Unsubscribe' : 'Subscribe'}
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
            <FollowModal
              onSubscribe={onSubscribe}
              isFollow={false}
              flag={flag}
              users={subscribers}
              isOpen={openSubscribers}
              onClose={closeModalSubscribers}
            />
            <FollowModal
              onSubscribe={onSubscribe}
              isFollow
              flag={flag}
              users={followers}
              isOpen={openFollowers}
              onClose={closeModalFollowers}
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
    const login = context.params?.login as string;
    const game = await store.dispatch(getUserNameAction(login));

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
