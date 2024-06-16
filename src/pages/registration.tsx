/* eslint-disable jsx-a11y/label-has-associated-control */
import RegistrationLayout from '@/layouts/RegistrationLayout';
import React, { ChangeEvent, useState } from 'react';
import style from '@/styles/Registration.module.scss';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { registrationAction } from '@/store/registration/registrationThunk';
import { useRouter } from 'next/router';
import Alert from '@/components/Alert';
import { useAlert } from '@/helper/alertHooks';
import { registrationError } from '@/store/registration/registrationSelector';
import { deleteCookie } from 'cookies-next';
import { logoutAction } from '@/store/logout/logoutThunk';
import Image from 'next/image';

function Registration() {
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { visibleError, showAlertError, hideAlertError } = useAlert();
  const errorText = useSelector(registrationError) || '';
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const trimmedLogin = e.target.value.trim().replace(/\s+/g, ' ');
    setEmail(trimmedLogin);
  };

  const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
    const trimmedLogin = e.target.value.trim().replace(/\s+/g, ' ');
    setLogin(trimmedLogin);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const trimmedPassword = e.target.value.trim().replace(/\s+/g, ' ');
    setPassword(trimmedPassword);
    if (repeatPassword !== trimmedPassword) {
      setPasswordError('Passwords do not match');
    } else {
      setPasswordError('');
    }
  };

  const handleRepeatPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRepeatPassword(e.target.value);
    if (password !== e.target.value) {
      setPasswordError('Passwords do not match');
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (passwordError !== 'Passwords do not match') {
        const response = await dispatch(
          registrationAction({ login, email, password })
        );
        if (response.type === 'registration/rejected') {
          showAlertError();
          return;
        }
        dispatch(logoutAction());
        deleteCookie('user');
        deleteCookie('role');
        setIsLoading(true);
        router.push('/');
      }
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
          <h1>Registration</h1>
          <input
            value={login}
            onChange={handleLoginChange}
            required
            minLength={3}
            placeholder="Login"
            type="text"
          />
          <input
            value={email}
            onChange={handleEmailChange}
            required
            placeholder="Email"
            type="email"
          />
          <input
            value={password}
            onChange={handlePasswordChange}
            required
            minLength={4}
            placeholder="Password"
            type="password"
          />
          <input
            value={repeatPassword}
            onChange={handleRepeatPasswordChange}
            required
            placeholder="Repeat password"
            type="password"
          />
          {passwordError && (
            <p style={{ marginTop: '10px' }}>{passwordError}</p>
          )}
          <button type="submit">Enter</button>
        </form>
        <Link className={style.link} href="/login">
          You have already account? Login
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
        message={errorText}
        visible={visibleError}
        onClose={hideAlertError}
      />
    </RegistrationLayout>
  );
}

export default Registration;
