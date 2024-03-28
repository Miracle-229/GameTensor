import Layout from '@/layouts/Layout';
import React from 'react';
import style from '@/styles/Settings.module.scss';
import Image from 'next/image';

function Settings() {
  return (
    <Layout title="User settings">
      <div className={style.main}>
        <h1>Profile Settings</h1>
        <h3>Avatar</h3>
        <Image width={140} height={140} alt="user" src="/nouserimage.jpg" />
        <button type="button">Upload image</button>
        <h3>Login</h3>
        <input placeholder="Change login..." type="text" />
        <button type="button">Save changes</button>
        <h3>Password</h3>
        <input placeholder="Repeat old password..." type="password" />
        <input placeholder="Input new password..." type="password" />
        <button type="button">Save changes</button>
      </div>
    </Layout>
  );
}

export default Settings;
