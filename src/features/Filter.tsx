import { ClipboardData } from '@prisma/client';
import React, { useEffect, useState } from 'react';

function Filter(
  clipboardData: ClipboardData[],
  setFilteredData: React.Dispatch<React.SetStateAction<ClipboardData[]>>
) {
  const [filter, setFilter] = useState<string>('');
  const [isFilterByFavorite, setIsFilterByFavorite] = useState<boolean>(false);

  useEffect(() => {
    setFilteredData(
      clipboardData.filter((e) => {
        const favoriteFilter = isFilterByFavorite ? e.favorite : true;
        const contentFilter = filter ? e.content.toLowerCase().includes(filter.toLowerCase()) : true;
        const locationFilter = filter ? e.location.toLowerCase().includes(filter.toLowerCase()) : true;
        return (contentFilter || locationFilter) && favoriteFilter;
      })
    );
  }, [filter, isFilterByFavorite]);

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
      <label
        htmlFor="favoriteToggle"
        className="autoSaverSwitch relative inline-flex cursor-pointer select-none items-center"
      >
        <input
          id="favoriteToggle"
          type="checkbox"
          name="autoSaver"
          className="sr-only"
          checked={isFilterByFavorite}
          onChange={() => setIsFilterByFavorite(!isFilterByFavorite)}
        />
        <span
          className={`slider mr-3 border  flex h-[26px] w-[50px] items-center rounded-full p-1 duration-200 ${
            isFilterByFavorite ? 'bg-teal-700' : 'bg-primary '
          }`}
        >
          <span
            className={`dot h-[18px] w-[18px] rounded-full bg-white duration-200 ${
              isFilterByFavorite ? 'translate-x-6' : ''
            }`}
          />
        </span>{' '}
      </label>
    </div>
  );
}

export default Filter;
