/* eslint-disable jsx-a11y/label-has-associated-control */
import RegistrationLayout from '@/layouts/RegistrationLayout';
import React, { useState } from 'react';
import style from '@/styles/Registration.module.scss';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { registrationAction } from '@/store/registration/registrationThunk';
import { useRouter } from 'next/router';
import Alert from '@/components/Alert';
import { useAlert } from '@/helper/alertHooks';

function Registration() {
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { visibleError, showAlertError, hideAlertError } = useAlert();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await dispatch(
        registrationAction({ login, email, password })
      );
      if (response.type === 'registration/rejected') {
        showAlertError();
        return;
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
          <h1>Registration</h1>
          <input
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
            placeholder="Login"
            type="text"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
            type="email"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
            type="password"
          />
          <input required placeholder="Repeat password" type="password" />
          <button type="submit">Enter</button>
        </form>
        <Link className={style.link} href="/login">
          You have already account? Login
        </Link>
      </div>
      <Alert
        type="error"
        message="Error to registration (This username or email address is already occupied)"
        visible={visibleError}
        onClose={hideAlertError}
      />
    </RegistrationLayout>
  );
}

export default Registration;
