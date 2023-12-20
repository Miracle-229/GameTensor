import Image from 'next/image';
import style from '@/styles/CartTag.module.scss';
import { Tags } from '@/helper/Types/game';

function CartTag({ dataTags }: { dataTags: Tags }) {
  return (
    <div key={dataTags.id} className={style.main}>
      <h3>{dataTags.name}</h3>
      <Image
        className={style.image}
        src={dataTags.image_background}
        width={100}
        height={100}
        alt={dataTags.name}
      />
    </div>
  );
}

export default CartTag;
