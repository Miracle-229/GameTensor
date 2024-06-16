import Layout from '@/layouts/Layout';
import React, { ChangeEvent, useState } from 'react';
import style from '@/styles/Settings.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { changePasswordAction } from '@/store/changePassword/changePasswordThunk';
import { useAlert } from '@/helper/alertHooks';
import Alert from '@/components/Alert';
import { changePasswordError } from '@/store/changePassword/changePasswordSelector';

function Settings() {
  const dispatch = useDispatch<AppDispatch>();
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const errorText = useSelector(changePasswordError) || '';
  const [successText, setSuccessText] = useState('');
  const {
    visibleSuccess,
    visibleError,
    showAlertSuccess,
    hideAlertSuccess,
    showAlertError,
    hideAlertError,
  } = useAlert();

  const handlePasswordChange = (
    e: ChangeEvent<HTMLInputElement>,
    flag?: boolean
  ) => {
    const trimmedPassword = e.target.value.trim().replace(/\s+/g, ' ');
    if (flag) {
      setNewPass(trimmedPassword);
    } else if (!flag) {
      setOldPass(trimmedPassword);
    }
  };
  const handleSaveChanges = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await dispatch(
        changePasswordAction({ oldPass, newPass })
      );
      console.log(response);
      if (response.type === 'changePassword/rejected') {
        showAlertError();
        hideAlertSuccess();
      }
      if (response.type === 'changePassword/fulfilled') {
        setSuccessText('Password changed !');
        hideAlertError();
        showAlertSuccess();
        setOldPass('');
        setNewPass('');
      }
    } catch {
      showAlertError();
    }
  };
  return (
    <Layout title="User settings">
      <form onSubmit={handleSaveChanges} className={style.main}>
        <h1>Profile Settings</h1>
        <h3>Password</h3>
        <input
          value={oldPass}
          onChange={(e) => handlePasswordChange(e, false)}
          placeholder="Repeat old password..."
          type="password"
          required
        />
        <input
          onChange={(e) => handlePasswordChange(e, true)}
          value={newPass}
          placeholder="Input new password..."
          type="password"
          required
        />
        <button type="submit">Save changes</button>
      </form>
      <Alert
        type="error"
        message={errorText}
        visible={visibleError}
        onClose={hideAlertError}
      />
      <Alert
        type="success"
        message={successText}
        visible={visibleSuccess}
        onClose={hideAlertSuccess}
      />
    </Layout>
  );
}

export default Settings;
