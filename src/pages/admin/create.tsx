import AdminLayout from '@/layouts/AdminLayot';
import React, { useState } from 'react';
import style from '@/styles/CreateTag.module.scss';
import { postTagAction } from '@/store/postTag/postTagThunk';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/store/store';
import Alert from '@/components/Alert';
import { useAlert } from '@/helper/alertHooks';
import { postTagError } from '@/store/postTag/postTagSelector';

function Create() {
  const dispatch = useDispatch<AppDispatch>();
  const [tagName, setTagName] = useState('');
  const errorText = useSelector(postTagError) || '';
  const {
    visibleSuccess,
    visibleError,
    showAlertSuccess,
    hideAlertSuccess,
    showAlertError,
    hideAlertError,
  } = useAlert();

  const create = async () => {
    try {
      const response = await dispatch(postTagAction(tagName));
      console.log(response.type);
      if (response.type === 'postTag/rejected') {
        hideAlertSuccess();
        showAlertError();
      }
      if (response.type === 'postTag/fulfilled') {
        hideAlertError();
        showAlertSuccess();
        setTagName('');
      }
    } catch {
      showAlertError();
    }
  };
  return (
    <AdminLayout title="Create tag">
      <div className={style.main}>
        <h1>Create Tag</h1>
        <input
          value={tagName}
          onChange={(e) => setTagName(e.target.value)}
          type="text"
        />
        <button style={{ cursor: 'pointer' }} onClick={create} type="button">
          Create
        </button>
      </div>
      <Alert
        type="success"
        message="Success to create tag"
        visible={visibleSuccess}
        onClose={hideAlertSuccess}
      />
      <Alert
        type="error"
        message={errorText}
        visible={visibleError}
        onClose={hideAlertError}
      />
    </AdminLayout>
  );
}

export default Create;
