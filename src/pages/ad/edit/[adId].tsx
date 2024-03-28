/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-array-index-key */
import React, { useState, ChangeEvent, useRef, useEffect } from 'react';
import Layout from '@/layouts/Layout';
import style from '@/styles/CreateAds.module.scss';
import Image from 'next/image';
import TagsSearch from '@/components/TagsSearch';
import { IGameData, ITags } from '@/helper/Types/game';
import { AppDispatch, wrapper } from '@/store/store';
import { getTagsAction } from '@/store/tags/tagsThunk';
import api from '@/interceptors/api';
import { GetServerSidePropsContext } from 'next';
import { getIdAction } from '@/store/id/idThunk';
import { useDispatch } from 'react-redux';
import { getImageIdAction } from '@/store/imageId/imageThunk';
import { useRouter } from 'next/router';

interface IMedia {
  file: File;
  amId: string;
}

export default function Edit({
  tagsData,
  gameData,
}: {
  tagsData: ITags[];
  gameData: IGameData;
}) {
  const router = useRouter();
  const { adId } = router.query;
  const [images, setImages] = useState<File[]>([]);
  const [media, setMedia] = useState<IMedia[]>([]);
  const [removedImageIds, setRemovedImageIds] = useState<string[]>([]);
  const [title, setTitle] = useState(gameData.title);
  const [description, setDescription] = useState(gameData.description);
  const [price, setPrice] = useState(gameData.price);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const fetchImages = async () => {
      const promises = gameData.medias.map((result) =>
        dispatch(getImageIdAction(result.amId))
      );
      const results = await Promise.all(promises);
      const formattedImages = results.map((result) => result.payload as string);

      const filePromises = formattedImages.map(async (url, index) => {
        const response = await fetch(url);
        const blob = await response.blob();
        const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
        return {
          file,
          amId: gameData.medias[index].amId, // Save the amId from the original media object
        };
      });

      const fileResults = await Promise.all(filePromises);
      setMedia(fileResults); // Set the new state with amId
      setImages(fileResults.map((result) => result.file)); // Set the images state without amId
    };

    fetchImages();
  }, [dispatch, gameData]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      const totalImages = media.length + selectedFiles.length;

      if (totalImages > 6) {
        return;
      }

      const newMedia = selectedFiles.map((file, index) => {
        const { amId } = gameData.medias[media.length + index];
        return { file, amId };
      });

      setMedia((prevMedia) => [...prevMedia, ...newMedia]);
      setImages((prevImages) => [...prevImages, ...selectedFiles]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setMedia((prevMedia) => prevMedia.filter((_, i) => i !== index));
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setRemovedImageIds((prevIds) => [...prevIds, media[index].amId]);
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
    if (typeof adId === 'string') {
      formData.append('adId', adId);
    } else {
      console.error('adId is not a string or is undefined');
    }
    formData.append('deletedImages', removedImageIds.join(','));
    formData.append('description', description);
    const tags = localStorage.getItem('selectedTags');
    if (tags !== null) {
      formData.append('tags', tags);
    }
    formData.append('price', price);

    try {
      const response = await api.put('ad', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      localStorage.removeItem('selectedTags');
      console.log(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <Layout title="Edit advertisement">
      <div className={style.main}>
        <h1>Edit advertisement</h1>
        <form onSubmit={handleSubmit}>
          <h3>Photos</h3>
          <div>
            <div className={style.row_images}>
              {images.map((image, index) => (
                <div key={index} className={style.imageContainer}>
                  <Image
                    width={100}
                    height={100}
                    src={URL.createObjectURL(image)}
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
          <TagsSearch selected={gameData.tags} tags={tagsData} />
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
          <button type="submit">Update advertisements</button>
        </form>
      </div>
    </Layout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context: GetServerSidePropsContext) => {
    try {
      const id = context.params?.adId as string;
      const [gameRes, tagsRes] = await Promise.all([
        store.dispatch(getIdAction(id)),
        store.dispatch(getTagsAction()),
      ]);
      const [gameData, tagsData] = await Promise.all([
        gameRes.payload,
        tagsRes.payload,
      ]);
      return {
        props: {
          gameData,
          tagsData,
        },
      };
    } catch (error) {
      console.error('Error fetching data:', error);
      return {
        props: {
          gameData: [],
          tagsData: [],
        },
      };
    }
  }
);
