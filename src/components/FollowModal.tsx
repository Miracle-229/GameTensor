import React, { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Modal from 'react-modal';
import style from '@/styles/FollowModal.module.scss';
import Image from 'next/image';
import { IoSearch } from 'react-icons/io5';

function FollowModal({ isOpen, onClose, users }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      width: '350px',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'rgba(47, 47, 47)',
      border: 'none',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0,0.4)',
    },
  };

  return (
    <Modal
      style={customStyles}
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="User Modal"
    >
      <div className={style.main}>
        <h2>Followers</h2>
        <div>
          <IoSearch size={25} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <ul>
          {filteredUsers.map((user) => (
            <li style={{ color: 'black' }} key={user.id}>
              <div>
                <Image alt="123" width={40} height={40} src="/follow.jpg" />
                <p>{user.name}</p>
              </div>
              <button type="button">Remove</button>
            </li>
          ))}
        </ul>
        <button className={style.button} type="button" onClick={onClose}>
          x
        </button>
      </div>
    </Modal>
  );
}

export default FollowModal;
