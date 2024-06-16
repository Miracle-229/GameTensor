/* eslint-disable react/require-default-props */
import React, { useEffect, useState } from 'react';
import style from '@/styles/TagsSearch.module.scss';
import { FaSearch } from 'react-icons/fa';
import { ITags } from '@/helper/Types/game';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { getAdsAction } from '@/store/ads/adsThunk';
import { useRouter } from 'next/router';

function TagsSearch({ selected, tags }: { selected?: ITags[]; tags: ITags[] }) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [tagsLoad, setTagsLoad] = useState(false);

  console.log(router.asPath);

  useEffect(() => {
    if (
      router.asPath !== '/ad/create' &&
      !/^\/ad\/edit\/[^/]+$/.test(router.asPath)
    ) {
      if (selectedItems.length > 0) {
        dispatch(getAdsAction({ value: selectedItems, key: 'tags.tagId' }));
      } else {
        dispatch(getAdsAction({ status: 'APPROVED' }));
      }
    }
    localStorage.setItem('selectedTags', selectedItems.join(','));
    if (selected && !tagsLoad) {
      const selectedIds = selected.map((item) => item.tagId);
      setSelectedItems(selectedIds);
      setTagsLoad(true);
    }
  }, [selectedItems, dispatch, tagsLoad, selected, router.asPath]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCheckboxChange = (id: number, isChecked: boolean) => {
    setSelectedItems((prevSelectedItems) => {
      if (isChecked) {
        return [...prevSelectedItems, id];
      }
      return prevSelectedItems.filter((itemId) => itemId !== id);
    });
  };

  const filteredData = tags.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const isRequired = selectedItems.length === 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h3>Tags</h3>
      <div className={style.search_bar}>
        <FaSearch size={22} />
        <input
          type="text"
          placeholder="Search tags..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className={style.search_area}>
        {filteredData.map((item) => (
          <div key={item.tagId}>
            <input
              required={isRequired}
              type="checkbox"
              className={style.checkbox}
              id={`${item.tagId}`}
              checked={selectedItems.includes(item.tagId)}
              onChange={(e) =>
                handleCheckboxChange(item.tagId, e.target.checked)
              }
            />
            <label className={style.label} htmlFor={`${item.tagId}`}>
              {item.name}
            </label>
          </div>
        ))}
      </div>
      {selectedItems.length > 0 && (
        <>
          <h3>Selected Tags:</h3>
          <div className={style.tags_area}>
            {selectedItems.map((selectedId) => {
              const selectedItem = tags.find(
                (item) => item.tagId === selectedId
              );
              return (
                <div key={selectedId}>
                  <input
                    type="checkbox"
                    className={style.checkbox}
                    id={String(selectedId)}
                    checked={selectedItems.includes(selectedId)}
                    onChange={(e) =>
                      handleCheckboxChange(selectedId, e.target.checked)
                    }
                  />
                  <label className={style.label} htmlFor={String(selectedId)}>
                    {selectedItem?.name}
                  </label>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default TagsSearch;
