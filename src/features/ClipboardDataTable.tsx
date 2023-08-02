import { ClipboardData } from '@prisma/client';
import React, { FC, SetStateAction } from 'react';
import { dateToFullJstLocale } from '../util';

type Props = {
  filteredData: ClipboardData[];
  clipboardData: ClipboardData[];
  setClipboardData: React.Dispatch<SetStateAction<ClipboardData[]>>;
};

const ClipboardDataTable: FC<Props> = ({ filteredData, clipboardData, setClipboardData }) => {
  return (
    <div className="py-4  overflow-y-auto max-h-[85vh] max-x-[90vw]">
      <table className="w-full text-left text-gray-500 dark:text-gray-400 rounded">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Content
            </th>
            <th scope="col" className="px-6 py-3">
              favorite
            </th>
            <th scope="col" className="px-6 py-3">
              location
            </th>
            <th scope="col" className="px-6 py-3">
              count
            </th>
            <th scope="col" className="px-6 py-3">
              timestamp
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((data) => (
            <tr
              key={data.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700  hover:bg-gray-600 hover:bg-opacity-90"
              // TODO
              onClick={() => {
                ('');
              }}
            >
              <td className="px-6 py-1">{data.id}</td>
              <td className="px-6 py-2 text-white overflow-hidden">{data.content}</td>
              <td className="px-6 py-2">
                <button
                  onClick={async () => {
                    const switchedFavoriteData: ClipboardData = { ...data, favorite: !data.favorite };
                    const updateData = clipboardData.map((e) => (e.id === data.id ? switchedFavoriteData : e));
                    setClipboardData(updateData);

                    await window.Main.updateFavorites(switchedFavoriteData);
                  }}
                >
                  {data.favorite ? (
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-white m-auto"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                  ) : (
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-white m-auto"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 21 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="0.25"
                        d="m11.479 1.712 2.367 4.8a.532.532 0 0 0 .4.292l5.294.769a.534.534 0 0 1 .3.91l-3.83 3.735a.534.534 0 0 0-.154.473l.9 5.272a.535.535 0 0 1-.775.563l-4.734-2.49a.536.536 0 0 0-.5 0l-4.73 2.487a.534.534 0 0 1-.775-.563l.9-5.272a.534.534 0 0 0-.154-.473L2.158 8.48a.534.534 0 0 1 .3-.911l5.294-.77a.532.532 0 0 0 .4-.292l2.367-4.8a.534.534 0 0 1 .96.004Z"
                      />
                    </svg>
                  )}
                </button>
              </td>
              <td className="px-6 py-2">{data.location}</td>
              <td className="px-6 py-2">{data.count}</td>
              <td className="px-6 py-2">{dateToFullJstLocale(data.timestamp)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClipboardDataTable;
