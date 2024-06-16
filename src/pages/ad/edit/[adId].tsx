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
import { GetServerSidePropsContext } from 'next';
import { getIdAction } from '@/store/id/idThunk';
import { useDispatch, useSelector } from 'react-redux';
import { getImageIdAction } from '@/store/imageId/imageThunk';
import { useRouter } from 'next/router';
import { editAdAction } from '@/store/editAd/editAdThunk';
import Alert from '@/components/Alert';
import { useAlert } from '@/helper/alertHooks';
import { editAdError } from '@/store/editAd/editAdSelector';

interface IMedia {
  file: File;
  amId: string;
  url: string;
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
  const [, setImages] = useState<File[]>([]);
  const [existingMedia, setExistingMedia] = useState<IMedia[]>([]);
  const [newMedia, setNewMedia] = useState<IMedia[]>([]);
  const [removedImageIds, setRemovedImageIds] = useState<string[]>([]);
  const [title, setTitle] = useState(gameData.title);
  const [description, setDescription] = useState(gameData.description);
  const [price, setPrice] = useState(gameData.price);
  const inputRef = useRef<HTMLInputElement>(null);
  const errorText = useSelector(editAdError) || '';
  const [errorCountFiles, setErrorCountFiles] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const { visibleError, showAlertError, hideAlertError } = useAlert();

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
          amId: gameData.medias[index].amId,
          url: URL.createObjectURL(file),
        };
      });

      const fileResults = await Promise.all(filePromises);
      setExistingMedia(fileResults);
      setImages(fileResults.map((result) => result.file));
    };

    fetchImages();
  }, [dispatch, gameData]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const validImageTypes = ['image/jpeg', 'image/png'];
      const selectedFiles = Array.from(e.target.files).filter((file) => {
        const fileType = file.type.toLowerCase();
        if (!validImageTypes.includes(fileType)) {
          setErrorCountFiles('Need only photos');
          showAlertError();
        }
        return validImageTypes.includes(fileType);
      });

      const totalImages =
        existingMedia.length + newMedia.length + selectedFiles.length;

      if (totalImages > 6) {
        setErrorCountFiles('Maximum 6 files');
        showAlertError();
        return;
      }

      const newMediaItems = selectedFiles.map((file) => ({
        file,
        amId: '',
        url: URL.createObjectURL(file), // Create the object URL here
      }));

      setNewMedia((prevNewMedia) => [...prevNewMedia, ...newMediaItems]);
      setImages((prevImages) => [...prevImages, ...selectedFiles]);
    }
  };

  const handleRemoveImage = (index: number) => {
    if (index < existingMedia.length) {
      const { amId } = existingMedia[index];

      setExistingMedia((prevMedia) => prevMedia.filter((_, i) => i !== index));
      setImages((prevImages) => prevImages.filter((_, i) => i !== index));

      if (amId) {
        setRemovedImageIds((prevIds) => [...prevIds, amId]);
      }
    } else {
      const newMediaIndex = index - existingMedia.length;

      setNewMedia((prevNewMedia) =>
        prevNewMedia.filter((_, i) => i !== newMediaIndex)
      );
      setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    }

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    newMedia.forEach((mediaItem) => {
      formData.append('files', mediaItem.file);
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
      await dispatch(editAdAction(formData));
      router.push(`/ad/${adId}`);
    } catch (error) {
      showAlertError();
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
              {existingMedia.map((mediaItem, index) => (
                <div key={index} className={style.imageContainer}>
                  <Image
                    width={100}
                    height={100}
                    src={mediaItem.url} // Use the stored URL here
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
              {newMedia.map((mediaItem, index) => (
                <div
                  key={existingMedia.length + index}
                  className={style.imageContainer}
                >
                  <Image
                    width={100}
                    height={100}
                    src={mediaItem.url} // Use the stored URL here
                    alt={`Uploaded ${existingMedia.length + index + 1}`}
                    style={{ maxWidth: '200px', maxHeight: '200px' }}
                  />
                  <button
                    type="button"
                    className={style.removeButton}
                    onClick={() =>
                      handleRemoveImage(existingMedia.length + index)
                    }
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
              Uploaded images: {existingMedia.length + newMedia.length} / 6
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
            required
            value={title}
            maxLength={48}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TagsSearch selected={gameData.tags} tags={tagsData} />
          <h3>Description</h3>
          <textarea
            required
            value={description}
            maxLength={256}
            onChange={(e) => setDescription(e.target.value)}
          />
          <h3>Price</h3>
          <input
            required
            placeholder="Choose price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            onKeyDown={(e) => {
              if (['e', 'E', '-', '+'].includes(e.key)) {
                e.preventDefault();
              }
            }}
            onInput={(e) => {
              const input = e.target as HTMLInputElement;
              if (input.value && Number(input.value) < 0) {
                input.value = '';
              }
            }}
          />
          <button type="submit">Update advertisements</button>
        </form>
      </div>
      <Alert
        type="error"
        message={errorText || errorCountFiles}
        visible={visibleError}
        onClose={hideAlertError}
      />
    </Layout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context: GetServerSidePropsContext) => {
    try {
      const { role, user } = context.req.cookies;
      if (!role) {
        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        };
      }
      if (role === 'ROLE_ADMIN') {
        return {
          redirect: {
            destination: '/admin/block',
            permanent: false,
          },
        };
      }
      const id = context.params?.adId as string;
      const [gameRes, tagsRes] = await Promise.all([
        store.dispatch(getIdAction(id)),
        store.dispatch(getTagsAction()),
      ]);
      const [gameData, tagsData] = await Promise.all([
        gameRes.payload,
        tagsRes.payload,
      ]);
      if (user) {
        const userParse = JSON.parse(user);
        if (userParse.login !== gameData.user.login) {
          return {
            redirect: {
              destination: '/admin/block',
              permanent: false,
            },
          };
        }
      }
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
