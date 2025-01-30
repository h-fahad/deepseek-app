// hooks/useSubjectData.ts
"use client";
import { useState, useEffect } from 'react';
import { getSubject } from '@/lib/api/firebase-client';

export default function useSubjectData(subjectId: string) {
  const [subject, setSubject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSubject(subjectId);
        setSubject(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [subjectId]);

  return { subject, loading, error };
}