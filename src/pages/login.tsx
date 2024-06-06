/* eslint-disable consistent-return */
/* eslint-disable react/no-unescaped-entities */
import RegistrationLayout from '@/layouts/RegistrationLayout';
import React, { ChangeEvent, useEffect, useState } from 'react';
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
import { loginError } from '@/store/login/loginSelector';
import { getUserNameAction } from '@/store/getUserName/getUserNameThunk';
import { userNameData } from '@/store/getUserName/getUserNameSelector';
import Image from 'next/image';

function Login() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { visibleError, showAlertError, hideAlertError } = useAlert();
  const currentUser = useSelector(currentUserData);
  const [errorBlock, setErrorBlock] = useState('');
  const errorText = useSelector(loginError) || '';
  const user = useSelector(userNameData);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
    const trimmedLogin = e.target.value.trim().replace(/\s+/g, ' ');
    setLogin(trimmedLogin);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const trimmedPassword = e.target.value.trim().replace(/\s+/g, ' ');
    setPassword(trimmedPassword);
  };

  useEffect(() => {
    dispatch(getUserNameAction(login));
  }, [dispatch, login]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (user.status !== 'BLOCKED') {
        const response = await dispatch(loginAction({ login, password }));

        if (response.type === 'login/rejected') {
          showAlertError();
          return;
        }
        if (localStorage.getItem('accessToken')) {
          setCookie('user', user, { maxAge: 60 * 60 * 24 });
          localStorage.setItem('user', JSON.stringify(currentUser));
        }
        router.push('/');
        setIsLoading(true);
      } else {
        setErrorBlock('You have been blocked');
        showAlertError();
      }
    } catch (error) {
      showAlertError();
    }
  };

  return (
    <RegistrationLayout title="Login">
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
            onChange={handleLoginChange}
            pattern="^\S+(\s\S+)*$"
            placeholder="Login"
            type="text"
          />
          <input
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
            type="password"
          />
          <button type="submit">Enter</button>
        </form>
        <Link className={style.link} href="/registration">
          Don't have an account yet? Registration
        </Link>
        {isLoading && (
          <Image
            style={{ marginTop: '20px' }}
            src="/loading.gif"
            width={70}
            height={70}
            alt="loading"
          />
        )}
      </div>
      <Alert
        type="error"
        message={errorText || errorBlock}
        visible={visibleError}
        onClose={hideAlertError}
      />
    </RegistrationLayout>
  );
}

export default Login;
