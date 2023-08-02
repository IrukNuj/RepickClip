import React, { FC } from 'react';

type Props = {
  isFilterByFavorite: boolean;
  setIsFilterByFavorite: React.Dispatch<React.SetStateAction<boolean>>;
};

const ToggleFavoriteFilterButton: FC<Props> = ({ isFilterByFavorite, setIsFilterByFavorite }) => {
  return (
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
  );
};

export default ToggleFavoriteFilterButton;
