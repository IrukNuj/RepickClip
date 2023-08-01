import React, { useEffect, useState } from 'react';
import { ClipboardData } from '@prisma/client';
import AppBar from './AppBar';

function App() {
  const [clipboardData, setClipboardData] = useState<ClipboardData[]>([]);

  useEffect(() => {
    window.Main.getClipboardData().then((data) => {
      setClipboardData(data);
    });
  }, []);

  return (
    <div className="flex flex-col h-screen">
      {window.Main && (
        <div className="flex-none">
          <AppBar />
        </div>
      )}
      <div className="flex-auto bg-slate-900">
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4 text-gray-200">Clipboard Data:(このへんにSearch Form)</h1>
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Content
                </th>
                <th scope="col" className="px-6 py-3">
                  favorited
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
              {clipboardData.map((data) => (
                <tr key={data.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4">{data.id}</td>
                  <td className="px-8 py-4">{data.content}</td>
                  <td className="px-6 py-4">{String(data.favorite)}</td>
                  <td className="px-6 py-4">{data.count}</td>
                  <td className="px-6 py-4">{String(data.timestamp)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
