import Layout from '@/layouts/Layout';
import React, { useEffect, useState } from 'react';
import style from '@/styles/UserId.module.scss';
import Image from 'next/image';
import CardAds from '@/components/CardAds';
import FollowModal from '@/components/FollowModal';
import { users } from '@/helper/Constants/mockUsers';
import { FaSearch } from 'react-icons/fa';
import { IGameData } from '@/helper/Types/game';
import { useDispatch, useSelector } from 'react-redux';
import { MdEdit } from 'react-icons/md';
import { currentUserData } from '@/store/currentUser/currentUserSelector';
import { AppDispatch } from '@/store/store';
import { getAdsAction } from '@/store/ads/adsThunk';
import { adsData } from '@/store/ads/adsSelector';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getCurrentUserAction } from '@/store/currentUser/currentUserThunk';
import { setCookie } from 'cookies-next';

export default function IdUserPage() {
  const router = useRouter();
  const { userId } = router.query;
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(currentUserData);
  const ads = useSelector(adsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
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
    if (userId) {
      dispatch(getAdsAction({ key: 'user.userId', value: userId }));
    }
    if (userId === user.userId) {
      setEdit(true);
    }
  }, [dispatch, userId, user]);
  useEffect(() => {
    dispatch(getCurrentUserAction());
  }, [dispatch]);
  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      setCookie('user', user, { maxAge: 60 * 60 * 24 });
    }
  }, [user]);
  return (
    <Layout title="user">
      <div className={style.main}>
        <div className={style.profile}>
          <Image alt="game" width={105} height={105} src="/user_profile.jpg" />
          <div className={style.profile_inf}>
            <p>{user.login}</p>
            <div className={style.profile_inf_follow}>
              <button onClick={openModal} type="button">
                Followers: 123
              </button>
              <button type="button">Following: 123</button>
            </div>
            <button type="button">Subscribe</button>
          </div>
        </div>
        <FollowModal users={users} isOpen={open} onClose={closeModal} />
        <div className={style.input}>
          <FaSearch size={22} />
          <input
            placeholder="Search ads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
          />
        </div>

        <div className={style.ads}>
          {filteredAds.map((data) => (
            <div key={data.adId}>
              {edit && (
                <Link href={`/ad/edit/${data.adId}`}>
                  <MdEdit size={25} />
                </Link>
              )}
              <CardAds adsData={data} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
