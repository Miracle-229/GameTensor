/* eslint-disable react/no-unescaped-entities */
import RegistrationLayout from '@/layouts/RegistrationLayout';
import React, { useState } from 'react';
import style from '@/styles/Registration.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { loginAction } from '@/store/login/loginThunk';
import { setCookie } from 'cookies-next';

function Login() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(loginAction({ login, password }));
      if (localStorage.getItem('accessToken')) {
        setCookie('user', 'user', { maxAge: 60 * 60 * 24 });
      }
      router.push('/');
      console.log('Login successful');
    } catch (error) {
      console.error('Registration failed:', error);
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
    </RegistrationLayout>
  );
}

export default Login;
