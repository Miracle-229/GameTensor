import AdminLayout from '@/layouts/AdminLayot';
import React from 'react';
import style from '@/styles/CreateTag.module.scss';

function Create() {
  return (
    <AdminLayout title="Create tag">
      <div className={style.main}>
        <h1>Create Tag</h1>
        <input type="text" />
        <button type="button">Create </button>
      </div>
    </AdminLayout>
  );
}

export default Create;
