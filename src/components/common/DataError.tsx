// components/common/DataError.tsx
"use client";
import { useEffect } from 'react';

export default function DataError({ error }: { error: Error }) {
  useEffect(() => {
    console.error('Data Error:', error);
  }, [error]);

  return (
    <div className="p-4 bg-red-50 text-red-600 rounded-lg">
      <h3 className="font-bold">Error Loading Data</h3>
      <p>{error.message}</p>
    </div>
  );
}