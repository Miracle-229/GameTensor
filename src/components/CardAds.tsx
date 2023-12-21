import React from 'react';
import style from '@/styles/CardAds.module.scss';
import Image from 'next/image';
import { AiFillLike } from 'react-icons/ai';
import { FaRegBookmark } from 'react-icons/fa';
import { Ads } from '@/helper/Types/game';

function CardAds({ adsData }: { adsData: Ads }) {
  return (
    <div className={style.main}>
      <Image
        className={style.image}
        src={adsData.background_image}
        width={265}
        height={165}
        alt="GameTensor"
      />
      <div className={style.ads_inf_main}>
        <div className={style.inf}>
          <h3>
            {adsData?.name?.length > 17
              ? `${adsData.name.slice(0, 16)}...`
              : adsData?.name || 'НЕИЗВЕСТНОЕ НАЗВАНИЕ'}
          </h3>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p style={{ textAlign: 'center' }}>{adsData.playtime}</p>
            <AiFillLike className={style.icon} />
          </div>
        </div>
        <div className={style.active}>
          <p> $ {adsData.metacritic}</p>
          <h4>
            {adsData?.slug?.length > 9
              ? `@${adsData.slug.slice(0, 8)}...`
              : `@${adsData?.slug}` || 'НЕИЗВЕСТНОЕ НАЗВАНИЕ'}
          </h4>
          <FaRegBookmark className={style.icon} />
        </div>
      </div>
    </div>
  );
}

export default CardAds;
