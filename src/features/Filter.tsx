import { ClipboardData } from '@prisma/client';
import React, { FC, SetStateAction, useEffect, useState } from 'react';
import ToggleFavoriteFilterButton from './ToggleFavoriteFilterButton';

type Props = {
  clipboardData: ClipboardData[];
  setFilteredData: React.Dispatch<SetStateAction<ClipboardData[]>>;
};

const FilterComponent: FC<Props> = ({ clipboardData, setFilteredData }) => {
  const [filter, setFilter] = useState<string>();
  const [isFilterByFavorite, setIsFilterByFavorite] = useState<boolean>(false);

  useEffect(() => {
    if (clipboardData) {
      const filteredData = clipboardData.filter((e) => {
        const favoriteFilter = isFilterByFavorite ? e.favorite : true;
        const contentFilter = filter ? e.content.toLowerCase().includes(filter.toLowerCase()) : true;
        const locationFilter = filter ? e.location.toLowerCase().includes(filter.toLowerCase()) : true;
        return (contentFilter || locationFilter) && favoriteFilter;
      });
      setFilteredData(filteredData);
    }
  }, [filter, isFilterByFavorite, clipboardData]);

  return (
    <div className="flex">
      <input
        className="border bg-gray-300 bg-transparent  text-gray-700 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        type="text"
        placeholder="けんさくまど"
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value);
        }}
      />
      <ToggleFavoriteFilterButton
        isFilterByFavorite={isFilterByFavorite}
        setIsFilterByFavorite={setIsFilterByFavorite}
      />
    </div>
  );
};

export default FilterComponent;
