import AdminLayout from '@/layouts/AdminLayot';
import React, { useState } from 'react';
import style from '@/styles/AdminBlock.module.scss';
import { IAuth } from '@/helper/Types/game';
import { FaSearch } from 'react-icons/fa';
import { AppDispatch, wrapper } from '@/store/store';
import { getUsersAction } from '@/store/getUsers/getUsersThunk';
import { patchStatusUserAction } from '@/store/patchStatusUser/patchStatusUserThunk';
import { useDispatch } from 'react-redux';

function Block({ userData }: { userData: IAuth[] }) {
  const dispatch = useDispatch<AppDispatch>();
  const [searchTerm, setSearchTerm] = useState('');
  const [userList, setUserList] = useState<IAuth[]>(userData);

  console.log(userData);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setUserList(
      userData.filter((user) =>
        user.login.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };

  const toggleBlock = async (userId: number) => {
    const currentUser = userList.find((user) => user.userId === userId);
    const newStatus = currentUser?.status === 'ACTIVE' ? 'BLOCKED' : 'ACTIVE';

    try {
      await dispatch(patchStatusUserAction({ key: newStatus, id: userId }));
      setUserList((prevUsers) =>
        prevUsers.map((user) =>
          user.userId === userId
            ? { ...user, status: newStatus, isBlocked: newStatus === 'BLOCKED' }
            : user
        )
      );
    } catch (error) {
      console.error('Error toggling block status:', error);
    }
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
              <li key={user.userId}>
                <span>{user.login}</span>
                <button type="button" onClick={() => toggleBlock(user.userId!)}>
                  {user.status === 'ACTIVE' ? 'Block' : 'Unblock'}
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

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    try {
      const [usersRes] = await Promise.all([store.dispatch(getUsersAction())]);
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
