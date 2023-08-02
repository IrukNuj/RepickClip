import React, { useEffect, useState } from 'react';
import { ClipboardData } from '@prisma/client';
import AppBar from './AppBar';
import FilterComponent from './features/Filter';
import ClipboardDataTable from './features/ClipboardDataTable';

const App = () => {
  const [clipboardData, setClipboardData] = useState<ClipboardData[]>([]);
  const [filteredData, setFilteredData] = useState<ClipboardData[]>([]);

  useEffect(() => {
    window.Main.getClipboardData().then((data) => {
      setClipboardData(data);
    });
  }, []);

  return (
    <>
      {window.Main && (
        <div className="flex-none">
          <AppBar />
        </div>
      )}
      <div className="flex  p-6 bg-slate-900 relative h-screen">
        <div className="flex-auto w-5/6">
          <h1 className="text-2xl font-bold mb-4 text-gray-200">Clipboard Data:(このへんにSearch Form)</h1>
          <FilterComponent clipboardData={clipboardData} setFilteredData={setFilteredData} />
          <ClipboardDataTable
            filteredData={filteredData}
            clipboardData={clipboardData}
            setClipboardData={setClipboardData}
          />
        </div>
      </div>
    </>
  );
};

export default App;
