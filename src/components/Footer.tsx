import React from 'react';
import style from '@/styles/Footer.module.scss';
import { useMediaQuery } from 'react-responsive';
import { FaPhoneAlt } from 'react-icons/fa';
import { TbMailFilled } from 'react-icons/tb';
import Image from 'next/image';

function Footer() {
  const isLaptop = useMediaQuery({ minWidth: 769, maxWidth: 1024 });
  const isTablet = useMediaQuery({ minWidth: 426, maxWidth: 768 });
  const isPhone = useMediaQuery({ minWidth: 345, maxWidth: 431 });
  const getSize = (...args: boolean[]) => {
    const [laptop, tablet, phone] = args;
    if (laptop) {
      return { width: 50, height: 45 };
    }
    if (tablet) {
      return { width: 45, height: 40 };
    }
    if (phone) {
      return { width: 40, height: 35 };
    }
    return { width: 60, height: 50 };
  };
  const { width, height } = getSize(isLaptop, isTablet, isPhone);
  return (
    <div className={style.footer}>
      <div className={style.footer_block}>
        <div className={style.footer_block_name}>
          <Image src="/logo.png" alt="My Image" width={width} height={height} />
          <h2>GameTensor</h2>
        </div>
        <p>
          Keys to the world of entertainment in every matrix with Gametensor.
        </p>
      </div>
      <div className={style.footer_block}>
        <div className={style.footer_block_name}>
          <FaPhoneAlt size={20} />
          <div className={style.footer_block_phone}>(+123) 000 111 222 333</div>
        </div>
        <div className={style.footer_block_name}>
          <TbMailFilled
            style={{
              marginTop: '3px',
            }}
            size={23}
          />
          <div className={style.footer_block_phone}>support@gamergate.com</div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
