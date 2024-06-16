/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import style from '@/styles/Sidebar.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { MdBlock, MdDomainVerification } from 'react-icons/md';
import { FaTag, FaDoorClosed } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { logoutAction } from '@/store/logout/logoutThunk';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { deleteCookie } from 'cookies-next';

function Sidebar() {
  const dispatch = useDispatch<AppDispatch>();
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    dispatch(logoutAction());
    setShowModal(false);
    deleteCookie('role');
    router.push('/');
  };

  const logout = () => {
    closeModal();
  };

  return (
    <div className={style.side}>
      <div className={style.main}>
        <Image src="/logo.png" width={63} height={63} alt="gametensor" />
        <ul>
          <li>
            <MdBlock className={style.icon} />
            <Link href="/admin/block">Block user</Link>
          </li>
          <li>
            <FaTag className={style.icon} />
            <Link href="/admin/create">Create tag</Link>
          </li>
          <li>
            <MdDomainVerification className={style.icon} />
            <Link href="/admin/approve">Approve</Link>
          </li>
          <li>
            <FaDoorClosed className={style.icon} />
            <button onClick={openModal} type="button">
              Exit
            </button>
          </li>
        </ul>
      </div>
      {showModal && (
        <div className={style.modal} onClick={closeModal}>
          <div className={style.modalContent}>
            <p>Are you sure you want to exit?</p>
            <Link href="/" onClick={logout}>
              Yes
            </Link>
            <button type="button" onClick={closeModal}>
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
