'use client';

/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useRef, useState } from 'react';
import style from '@/styles/Header.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaSearch,
  FaBell,
  FaUser,
  FaBookmark,
  FaDoorOpen,
} from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useMediaQuery } from 'react-responsive';
import { IoMdChatbubbles } from 'react-icons/io';
import { MdContacts, MdDashboard } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { currentUserData } from '@/store/currentUser/currentUserSelector';
import { AppDispatch } from '@/store/store';
import { logoutAction } from '@/store/logout/logoutThunk';
import { useRouter } from 'next/router';
import { notifCountData } from '@/store/getNotifCount/getNotifCountSelector';
import { getNotifAction } from '@/store/getNotif/getNotifThunk';
import { notifData } from '@/store/getNotif/getNotifSelector';
import { formatDateLink } from '@/helper/Constants/timeFunctions';
import { patchStatusNotifAction } from '@/store/pathStatusNotif/pathStatusNotifThunk';
import { getCurrentUserAction } from '@/store/currentUser/currentUserThunk';
import { INotif } from '@/helper/Types/game';
import { getNotifCountAction } from '@/store/getNotifCount/getNotifCountThunk';
import Search from './Search';

function Header() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const userData = useSelector(currentUserData);
  const notifCount = useSelector(notifCountData);
  const headerRef = useRef<HTMLDivElement>(null);
  const loginFromQuery = router.query.login as string;
  const advertisementsFromQuery = router.pathname;
  const { login, roles } = userData;
  const addAdvertisementLink =
    Array.isArray(roles) && roles.length > 0 && roles[0] === 'ROLE_USER'
      ? '/ad/create'
      : '/registration';
  const [showUser, setShowUser] = useState<boolean>(false);
  const [showNot, setShowNot] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [menu, setMenu] = useState<boolean>(false);
  const isLaptop = useMediaQuery({ minWidth: 769, maxWidth: 1024 });
  const isTablet = useMediaQuery({ minWidth: 426, maxWidth: 768 });
  const isPhone = useMediaQuery({ minWidth: 345, maxWidth: 431 });
  const dataNotif = useSelector(notifData);
  const [currentPage, setCurrentPage] = useState(0);
  const { totalPages } = dataNotif;
  const [notifications, setNotifications] = useState<{
    content: INotif[];
    pageable: { pageNumber: number };
    totalPages: number;
  }>(dataNotif);

  const getNotif = async () => {
    await dispatch(getNotifAction());
  };

  useEffect(() => {
    if (dataNotif.content && dataNotif.content.length > 0) {
      const notificationsIds = dataNotif.content.map(
        (notif) => notif.notificationId
      );
      dispatch(patchStatusNotifAction(notificationsIds));
    }
  }, [dataNotif, dispatch]);

  useEffect(() => {
    setNotifications((prevState) => ({
      ...prevState,
      content: [
        ...prevState.content.filter((notif) => notif.message !== ''),
        ...dataNotif.content,
      ],
    }));
  }, [dataNotif]);

  useEffect(() => {
    setNotifications({
      content: [],
      pageable: { pageNumber: 0 },
      totalPages: 0,
    });
  }, [showNot]);

  useEffect(() => {
    const fetchNotifCount = async () => {
      await dispatch(getNotifCountAction());
    };
    fetchNotifCount();
  }, [dispatch, notifications]);

  const scroll = async () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    if (currentPage < totalPages) {
      await dispatch(getNotifAction(nextPage));
    }
  };
  const getSize = (...args: boolean[]) => {
    const [laptop, tablet, phone] = args;
    if (laptop) {
      return { width: 50, height: 45 };
    }
    if (tablet) {
      return { width: 45, height: 40 };
    }
    if (phone) {
      return { width: 40, height: 35 };
    }
    return { width: 60, height: 50 };
  };
  const openMenu = () => {
    setMenu(!menu);
    setShowUser(false);
    setShowNot(false);
  };
  const openUser = () => {
    setShowUser(!showUser);
    setMenu(false);
    setShowNot(false);
  };
  const openNot = () => {
    setShowNot(!showNot);
    setMenu(false);
    setShowUser(false);
    if (!showNot) {
      getNotif();
    }
  };
  useEffect(() => {
    setShowMenu(isPhone);
  }, [isPhone]);
  const logout = () => {
    dispatch(logoutAction());
    setMenu(false);
    setShowUser(false);
    setShowNot(false);
    router.push('/');
  };
  const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
    if (
      headerRef.current &&
      !headerRef.current.contains(event.target as Node)
    ) {
      setMenu(false);
      setShowUser(false);
      setShowNot(false);
      dispatch(getNotifCountAction());
    }
  };

  const logoClick = () => {
    router.push('/');
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);
  useEffect(() => {
    const fetchCurrentUser = async () => {
      await dispatch(getCurrentUserAction());
    };
    fetchCurrentUser();
  }, [dispatch, dataNotif]);
  const { width, height } = getSize(isLaptop, isTablet, isPhone);

  return (
    <>
      <header ref={headerRef} className={style.header}>
        {showMenu ? (
          <>
            <div className={style.search}>
              <button className={style.logo} type="button" onClick={logoClick}>
                <Image
                  src="/logo.png"
                  alt="My Image"
                  width={width}
                  height={height}
                />
              </button>
              <Search />
            </div>
            <div className={style.block_header_user}>
              {Array.isArray(roles) &&
                roles.length > 0 &&
                roles[0] === 'ROLE_USER' && (
                  <button
                    onClick={openNot}
                    className={`${
                      userData.login ? style.burger_button : style.none
                    }`}
                    type="button"
                  >
                    <FaBell className={style.user_ico} size={22} />
                    {notifCount > 0 && <span>{notifCount}</span>}
                  </button>
                )}
              <button
                onClick={openUser}
                className={style.burger_button_user}
                type="button"
              >
                <FaUser className={style.user_ico} size={22} />
              </button>
              <button
                onClick={openMenu}
                className={style.burger_button}
                type="button"
              >
                <GiHamburgerMenu size={22} />
              </button>
            </div>
          </>
        ) : (
          <>
            <div className={style.block_header}>
              <button type="button" onClick={logoClick} className={style.logo}>
                <Image
                  src="/logo.png"
                  alt="My Image"
                  width={width}
                  height={height}
                />
              </button>
              <Link className={style.link} href="/rules">
                Rules
              </Link>
              {advertisementsFromQuery !== '/advertisements' ? (
                <Link className={style.link} href="/advertisements">
                  Advertisements
                </Link>
              ) : (
                <div className={style.link}>Advertisements</div>
              )}
              <div className={style.search}>
                <FaSearch size={22} />
                <Search />
              </div>
            </div>
            <div className={style.block_header_user}>
              <Link className={style.add_button} href={addAdvertisementLink}>
                Add advertisements
              </Link>
              {Array.isArray(roles) &&
                roles.length > 0 &&
                roles[0] === 'ROLE_USER' && (
                  <button
                    onClick={openNot}
                    className={`${
                      userData.login ? style.burger_button : style.none
                    }`}
                    type="button"
                  >
                    <FaBell className={style.user_ico} size={22} />
                    {notifCount > 0 && <span>{notifCount}</span>}
                  </button>
                )}
              <button
                onClick={openUser}
                className={style.burger_button_user}
                type="button"
              >
                <FaUser className={style.user_ico} size={22} />
              </button>
            </div>
          </>
        )}
      </header>
      {menu && (
        <div className={style.menu}>
          <Link className={style.link} href="/rules">
            Rules
          </Link>
          {advertisementsFromQuery !== '/advertisements' ? (
            <Link className={style.link} href="/advertisements">
              Advertisements
            </Link>
          ) : (
            <div className={style.link}>Advertisements</div>
          )}
          {Array.isArray(roles) &&
            roles.length > 0 &&
            roles[0] === 'ROLE_USER' && (
              <Link className={style.add_button} href="/ad/create">
                Add advertisements
              </Link>
            )}
        </div>
      )}
      {showUser && (
        <div className={style.menu_user}>
          {Array.isArray(roles) &&
          roles.length > 0 &&
          roles[0] === 'ROLE_USER' ? (
            <>
              <Link className={style.link} href="/user/settings">
                <MdContacts size={20} /> Settings account
              </Link>
              {login !== loginFromQuery ? (
                <Link className={style.link} href={`/user/${login}`}>
                  <MdDashboard size={20} /> My advertisements
                </Link>
              ) : (
                <div className={style.link}>
                  <MdDashboard size={20} /> My advertisements
                </div>
              )}
              <Link className={style.link} href="/bookmarks">
                <FaBookmark size={20} /> Bookmarks
              </Link>

              <Link className={style.link} href="/chat">
                <IoMdChatbubbles size={20} />
                Chat
              </Link>

              <Link onClick={logout} className={style.link} href="/">
                <FaDoorOpen size={20} />
                Exit
              </Link>
            </>
          ) : (
            <>
              <Link className={style.link} href="/registration">
                Registration
              </Link>
              <Link className={style.link} href="/login">
                Login
              </Link>
            </>
          )}
        </div>
      )}
      {showNot && (
        <div className={style.menu_user}>
          {notifications.content.length > 0 ? (
            <div onScroll={scroll} className={style.notification_div}>
              {notifications.content.map((notif) => (
                <Link href={`/ad/${notif.linkId}`} key={notif.notificationId}>
                  <div className={style.notification_div}>
                    <p>{notif.message}</p>
                    <span>{formatDateLink(notif.creationDate)}</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p>There are no notifications yet</p>
          )}
        </div>
      )}
    </>
  );
}

export default Header;
