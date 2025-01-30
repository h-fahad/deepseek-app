// hooks/useRealTimeSubject.ts
import { db } from '@/firebase/config';
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export function useRealTimeSubject(subjectId: string) {
  const [subject, setSubject] = useState(null);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "subjects", subjectId), (doc) => {
      setSubject(doc.data());
    });
    return () => unsub();
  }, [subjectId]);

  return subject;
}