/* eslint-disable react/no-unescaped-entities */
import RegistrationLayout from '@/layouts/RegistrationLayout';
import React, { useState } from 'react';
import style from '@/styles/Registration.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { loginAction } from '@/store/login/loginThunk';
import { setCookie } from 'cookies-next';
import { useAlert } from '@/helper/alertHooks';
import Alert from '@/components/Alert';
import { currentUserData } from '@/store/currentUser/currentUserSelector';

function Login() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { visibleError, showAlertError, hideAlertError } = useAlert();
  const currentUser = useSelector(currentUserData);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await dispatch(loginAction({ login, password }));
      if (response.type === 'login/rejected') {
        showAlertError();
        return;
      }
      if (localStorage.getItem('accessToken')) {
        setCookie('user', 'user', { maxAge: 60 * 60 * 24 });
        localStorage.setItem('user', JSON.stringify(currentUser));
      }
      router.push('/');
    } catch (error) {
      showAlertError();
    }
  };
  return (
    <RegistrationLayout title="Registration">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <form onSubmit={handleSubmit} className={style.main}>
          <h1>Login</h1>
          <input
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            placeholder="Login"
            type="text"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
          />
          <button type="submit">Enter</button>
        </form>
        <Link className={style.link} href="/registration">
          Don't have an account yet? Registration
        </Link>
      </div>
      <Alert
        type="error"
        message="Error to authorization"
        visible={visibleError}
        onClose={hideAlertError}
      />
    </RegistrationLayout>
  );
}

export default Login;
