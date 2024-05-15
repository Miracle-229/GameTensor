import AdminLayout from '@/layouts/AdminLayot';
import React, { useState } from 'react';
import style from '@/styles/CreateTag.module.scss';
import { postTagAction } from '@/store/postTag/postTagThunk';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import Alert from '@/components/Alert';
import { useAlert } from '@/helper/alertHooks';

function Create() {
  const dispatch = useDispatch<AppDispatch>();
  const [tagName, setTagName] = useState('');
  const {
    visibleSuccess,
    visibleError,
    showAlertSuccess,
    hideAlertSuccess,
    showAlertError,
    hideAlertError,
  } = useAlert();
  const create = () => {
    if (tagName.trim() !== '') {
      dispatch(postTagAction(tagName));
      setTagName('');
      showAlertSuccess();
    } else {
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
        message="Error to create tag"
        visible={visibleError}
        onClose={hideAlertError}
      />
    </AdminLayout>
  );
}

export default Create;
