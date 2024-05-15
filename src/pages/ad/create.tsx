/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-array-index-key */
import React, { useState, ChangeEvent, useRef } from 'react';
import Layout from '@/layouts/Layout';
import style from '@/styles/CreateAds.module.scss';
import Image from 'next/image';
import TagsSearch from '@/components/TagsSearch';
import { ITags } from '@/helper/Types/game';
import { AppDispatch, wrapper } from '@/store/store';
import { getTagsAction } from '@/store/tags/tagsThunk';
import { createAdAction } from '@/store/createAd/createAdThunk';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { currentUserData } from '@/store/currentUser/currentUserSelector';
import { useAlert } from '@/helper/alertHooks';
import Alert from '@/components/Alert';

export default function Create({ tagsData }: { tagsData: ITags[] }) {
  const dispatch = useDispatch<AppDispatch>();
  const { visibleError, showAlertError, hideAlertError } = useAlert();
  const userData = useSelector(currentUserData);
  const { login } = userData;
  const router = useRouter();
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedImages = Array.from(e.target.files);
      const totalImages = images.length + selectedImages.length;

      if (totalImages > 6) {
        return;
      }

      setImages((prevImages) => [...prevImages, ...selectedImages]);

      // Обработка предварительного просмотра изображений
      selectedImages.forEach((image) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreviews((prevPreviews) => [
            ...prevPreviews,
            reader.result as string,
          ]);
        };
        reader.readAsDataURL(image);
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    images.forEach((image) => {
      formData.append('files', image);
    });
    formData.append('title', title);
    formData.append('description', description);
    const tags = localStorage.getItem('selectedTags');

    if (tags !== null) {
      formData.append('tags', tags);
    }
    formData.append('price', price);

    try {
      await dispatch(createAdAction(formData));
      router.push(`/user/${login}`);
    } catch (error) {
      showAlertError();
    }
  };

  return (
    <Layout title="Create advertisement">
      <div className={style.main}>
        <h1>Create advertisements</h1>
        <form onSubmit={handleSubmit}>
          <h3>Photos</h3>
          <div>
            <div className={style.row_images}>
              {images.map((image, index) => (
                <div key={index} className={style.imageContainer}>
                  <Image
                    width={100}
                    height={100}
                    src={imagePreviews[index]}
                    alt={`Uploaded ${index + 1}`}
                    style={{ maxWidth: '200px', maxHeight: '200px' }}
                  />
                  <button
                    type="button"
                    className={style.removeButton}
                    onClick={() => handleRemoveImage(index)}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
            <p className={style.photos_inf}>
              The maximum number of uploaded images is 6
            </p>
            <p className={style.photos_inf}>
              Uploaded images: {images.length} / 6
            </p>
            <div className={style.costume_input}>
              <input
                ref={inputRef}
                multiple
                type="file"
                id="upload-image"
                accept="image/*"
                onChange={handleImageChange}
                className={style.noinput}
              />
              <label htmlFor="upload-image">Upload Image</label>
            </div>
          </div>
          <h3>Title</h3>
          <input
            placeholder="Write title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TagsSearch tags={tagsData} />
          <h3>Description</h3>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <h3>Price</h3>
          <input
            placeholder="Choose price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <button type="submit">Create advertisements</button>
        </form>
      </div>
      <Alert
        type="error"
        message="Error to create ad"
        visible={visibleError}
        onClose={hideAlertError}
      />
    </Layout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    try {
      const [tagsRes] = await Promise.all([store.dispatch(getTagsAction())]);
      const [tagsData] = await Promise.all([tagsRes.payload]);
      return {
        props: {
          tagsData,
        },
      };
    } catch (error) {
      console.error('Error fetching data:', error);
      return {
        props: {
          tagsData: [],
        },
      };
    }
  }
);
