/* eslint-disable jsx-a11y/label-has-associated-control */
import RegistrationLayout from '@/layouts/RegistrationLayout';
import React, { useState } from 'react';
import style from '@/styles/Registration.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { registrationAction } from '@/store/registration/registrationThunk';
import { useRouter } from 'next/router';

function Registration() {
  const [, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(registrationAction({ login, email, password }));
      router.push('/');
      console.log('Registration successful');
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
          {imageUrl && (
            <Image width={100} height={100} src={imageUrl} alt="Uploaded" />
          )}
          <div className="custom-file-upload">
            <input
              type="file"
              id="upload-image"
              accept="image/*"
              onChange={handleImageChange}
              className={style.noinput}
            />
            <label htmlFor="upload-image">Upload Image</label>
          </div>
          <button type="submit">Enter</button>
        </form>
        <Link className={style.link} href="/login">
          You have already account? Login
        </Link>
      </div>
    </RegistrationLayout>
  );
}

export default Registration;
