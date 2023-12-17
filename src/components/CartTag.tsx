import { getTagsAction } from '@/store/tagsSlice';
import { AppDispatch } from '@/store/store';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import style from '@/styles/CartTag.module.scss';
import { Tags } from '@/helper/Types/game';

function CartTag() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getTagsAction())
      .then((dataDocuments) => {
        setIsLoading(true);
        console.log(dataDocuments.payload.results);
        setData(dataDocuments.payload.results);
      })
      .catch((error) => {
        console.log('Error fetching types:', error);
        setIsLoading(false);
      });
  }, [dispatch]);

  return (
    <div className={style.main_row}>
      {isLoading ? (
        data.slice(0, 5).map((item: Tags) => (
          <div key={item.id} className={style.main}>
            <h3>{item.name}</h3>
            <Image
              className={style.image}
              src={item.image_background}
              width={100}
              height={100}
              alt={item.name}
            />
          </div>
        ))
      ) : (
        <p>
          <Image src="/loading.gif" width={500} height={500} alt="loading" />
        </p>
      )}
    </div>
  );
}

export default CartTag;
