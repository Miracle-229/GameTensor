/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */

import Image from 'next/image';
import React, { useState } from 'react';
import { AiFillLike } from 'react-icons/ai';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { searchGamesAction } from '@/store/search/searchThunk';
import { searchData } from '@/store/search/searchSelector';

function Search() {
  const dispatch = useDispatch<AppDispatch>();
  const options = useSelector(searchData);
  const [isLoading, setIsLoading] = useState(false);
  const search = async (query: string) => {
    try {
      const response = await dispatch(searchGamesAction(query));
      if (response.payload && Array.isArray(response.payload)) {
        setIsLoading(true);
      } else {
        console.log('No data available');
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
      labelKey="label"
      onSearch={async (item) => {
        search(item);
      }}
      options={options}
      placeholder="Search games..."
      renderMenuItemChildren={(option: any) => (
        <div className="render-option">
          {option.poster ? (
            <Image
              src={`${option.poster}`}
              alt={`${option.name} poster`}
              className="render-option-image"
              width={130}
              height={100}
            />
          ) : (
            <Image
              src="/no-image.jpg"
              alt={`${option.name} poster`}
              className="render-option-image"
              width={130}
              height={100}
            />
          )}
          <div className="render-option-inf">
            <h4>{option.label}</h4>
            <div className="render-option-inf-price">
              <span style={{ color: 'white', padding: '3px 5px' }}>
                ${option.date ? option.date.slice(0, 4) : ''}
              </span>
              <span className="render-option-like">
                {option.rating}
                <AiFillLike />
              </span>
            </div>
            <h6 className="render-option-inf-price">@{option.slug}</h6>
          </div>
        </div>
      )}
    />
  );
}

export default Search;
