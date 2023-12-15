/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import style from '@/styles/Header.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { FaSearch, FaBell, FaUser } from 'react-icons/fa';
import { Autocomplete } from '@mui/material';
import { top100Films } from '@/helper/Constants/Mock-Data';

function Header() {
  return (
    <header className={style.header}>
      <div className={style.block_header}>
        <div className={style.logo}>
          <Image
            alt="GameTensor"
            objectFit="contain"
            layout="fill"
            src="/logo.png"
          />
        </div>
        <Link className={style.link} href="/">
          Home
        </Link>
        <Link className={style.link} href="/">
          Advertisements
        </Link>
        <div className={style.search}>
          <FaSearch size={22} />
          <Autocomplete
            className={style.autocomplete}
            id="custom-input-demo"
            options={top100Films.map((option) => option.title)}
            renderInput={(params) => (
              <div ref={params.InputProps.ref}>
                <input type="text" {...params.inputProps} />
              </div>
            )}
          />
        </div>
      </div>
      <div className={style.block_header}>
        <Link className={style.add_button} href="/">
          Add advertisements
        </Link>
        <FaBell size={22} />
        <FaUser size={22} />
      </div>
    </header>
  );
}

export default Header;
