import AdminLayout from '@/layouts/AdminLayot';
import React, { useState } from 'react';
import style from '@/styles/AdminBlock.module.scss';
import { IUser } from '@/helper/Types/game';
import { FaSearch } from 'react-icons/fa';
import Image from 'next/image';
import { users } from '@/helper/Constants/mockUsers';

function Block() {
  const [searchTerm, setSearchTerm] = useState('');
  const [userList, setUserList] = useState<IUser[]>(users);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setUserList(
      users.filter((user) =>
        user.name.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };

  const toggleBlock = (id: number) => {
    setUserList((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, isBlocked: !user.isBlocked } : user
      )
    );
  };
  return (
    <AdminLayout title="block">
      <div className={style.main}>
        <h1>Block user</h1>
        <div className={style.search}>
          <div className={style.input}>
            <FaSearch size={22} />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <ul>
            {userList.map((user) => (
              <li key={user.id}>
                <Image
                  width={50}
                  height={50}
                  src={user.image}
                  alt={user.name}
                />
                <span>{user.name}</span>
                <button type="button" onClick={() => toggleBlock(user.id)}>
                  {user.isBlocked ? 'Unblock' : 'Block'}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AdminLayout>
  );
}

export default Block;
