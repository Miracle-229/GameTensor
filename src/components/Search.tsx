/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { searchGamesAction } from '@/store/search/searchThunk';
import { searchData, searchStatus } from '@/store/search/searchSelector';
import { imageIdData } from '@/store/imageId/imageIdSelector';
import { fetchImageId } from '@/store/imageId/imageThunk';
import { IGameData } from '@/helper/Types/game';

function Search() {
  const dispatch = useDispatch<AppDispatch>();
  const options = useSelector(searchData);
  const imageIdDataState = useSelector(imageIdData);
  const [imageLoaded, setImageLoaded] = useState(false);
  const statusSearch = useSelector(searchStatus);

  useEffect(() => {
    if (options && options.length > 0 && !imageLoaded) {
      options.forEach((option) => {
        if (option.medias && option.medias.length > 0) {
          const { amId } = option.medias[0];
          dispatch(fetchImageId(amId, option.adId.toString()));
        }
      });
      setImageLoaded(true);
    }
  }, [dispatch, options, imageLoaded]);
  const [isLoading, setIsLoading] = useState(false);
  const search = async (query: string) => {
    try {
      const response = await dispatch(searchGamesAction(`${query}%`));
      if (
        response.payload.length > 0 &&
        Array.isArray(response.payload) &&
        statusSearch
      ) {
        setIsLoading(true);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AsyncTypeahead
      id="search-bar"
      isLoading={isLoading}
      labelKey="title"
      onSearch={async (item) => {
        search(item);
      }}
      options={options}
      placeholder="Search advertisements..."
      renderMenuItemChildren={(game) => {
        const imageSrc = imageIdDataState[(game as IGameData).adId];
        return (
          <div className="render-option">
            {imageSrc && (
              <Image
                src={imageSrc}
                alt={`${(game as IGameData).title} poster`}
                className="render-option-image"
                width={130}
                height={100}
              />
            )}
            <div className="render-option-inf">
              <h4>{(game as IGameData).title}</h4>
              <div className="render-option-inf-price">
                <span style={{ color: 'white', padding: '3px 5px' }}>
                  ${(game as IGameData).price || 'N/A'}
                </span>
              </div>
              <h6 className="render-option-inf-price">
                @{(game as IGameData).user.login}
              </h6>
            </div>
          </div>
        );
      }}
    />
  );
}

export default Search;
