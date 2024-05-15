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
import { getCookie } from 'cookies-next';
import { AppDispatch } from '@/store/store';
import { logoutAction } from '@/store/logout/logoutThunk';
import { useRouter } from 'next/router';
import { notifCountData } from '@/store/getNotifCount/getNotifCountSelector';
import Search from './Search';

function Header() {
  const user = getCookie('user');
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const userData = useSelector(currentUserData);
  const notifCount = useSelector(notifCountData);
  const headerRef = useRef(null);
  const loginFromQuery = router.query.login as string;
  const { login, status } = userData;
  const addAdvertisementLink = user ? '/ad/create' : '/registration';
  const [showUser, setShowUser] = useState<boolean>(false);
  const [showNot, setShowNot] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [menu, setMenu] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);
  const isLaptop = useMediaQuery({ minWidth: 769, maxWidth: 1024 });
  const isTablet = useMediaQuery({ minWidth: 426, maxWidth: 768 });
  const isPhone = useMediaQuery({ minWidth: 345, maxWidth: 431 });
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
  };

  useEffect(() => {
    setIsClient(true);
  }, []);
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
  const handleOutsideClick = (event) => {
    if (headerRef.current && !headerRef.current.contains(event.target)) {
      setMenu(false);
      setShowUser(false);
      setShowNot(false);
    }
  };

  useEffect(() => {
    // Добавляем обработчик клика при монтировании компонента
    document.addEventListener('click', handleOutsideClick);

    // Удаляем обработчик клика при размонтировании компонента
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);
  const { width, height } = getSize(isLaptop, isTablet, isPhone);
  return (
    <>
      <header ref={headerRef} className={style.header}>
        {showMenu ? (
          <>
            <div className={style.search}>
              <Link href="/" className={style.logo}>
                <Image
                  src="/logo.png"
                  alt="My Image"
                  width={width}
                  height={height}
                />
              </Link>
              <Search />
            </div>
            <div className={style.block_header_user}>
              <button
                // ref={notRef}
                onClick={openNot}
                className={`${user ? style.burger_button : style.none}`}
                type="button"
              >
                <FaBell size={22} />
              </button>
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
              <Link href="/" className={style.logo}>
                <Image
                  src="/logo.png"
                  alt="My Image"
                  width={width}
                  height={height}
                />
              </Link>
              <Link className={style.link} href="/rules">
                Rules
              </Link>
              <Link className={style.link} href="/advertisements">
                Advertisements
              </Link>
              <div className={style.search}>
                <FaSearch size={22} />
                <Search />
              </div>
            </div>
            <div className={style.block_header_user}>
              {status === 'ACTIVE' && (
                <Link className={style.add_button} href={addAdvertisementLink}>
                  Add advertisements
                </Link>
              )}
              {user && isClient && (
                <button
                  onClick={openNot}
                  className={style.burger_button}
                  type="button"
                >
                  <FaBell className={style.user_ico} size={22} />
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
          <Link className={style.link} href="/advertisements">
            Advertisements
          </Link>
          {user && (
            <Link className={style.add_button} href="/ad/create">
              Add advertisements
            </Link>
          )}
        </div>
      )}
      {showUser && (
        <div className={style.menu_user}>
          {user ? (
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
              {status === 'ACTIVE' && (
                <Link className={style.link} href="/chat">
                  <IoMdChatbubbles size={20} />
                  Chat
                </Link>
              )}
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
        <>
          {status === 'ACTIVE' && (
            <div className={style.menu_user}>
              <Link className={style.link} href="/">
                <p>There are no notifications yet</p>
              </Link>
            </div>
          )}
          {status === 'BLOCKED' && (
            <div className={style.menu_user}>
              <Link className={style.link} href="/">
                <p>Your account is blocked</p>
              </Link>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Header;
