import Image from 'next/image';
import style from '@/styles/CardTag.module.scss';
import { ITags } from '@/helper/Types/game';

function CardTag({ dataTags }: { dataTags: ITags }) {
  return (
    <div key={dataTags.tagId} className={style.main}>
      <h3>{dataTags.name}</h3>
      <Image
        className={style.image}
        src={`/${dataTags.name}.png`}
        width={100}
        height={100}
        alt={dataTags.name}
      />
    </div>
  );
}

export default CardTag;
