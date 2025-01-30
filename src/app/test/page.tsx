// app/test/page.tsx
"use client";
import { useEffect } from 'react';
import { db } from '@/firebase/config';
import { doc, getDoc } from 'firebase/firestore';

export default function TestPage() {
  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "subjects", "math");
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        console.log("Firestore data:", docSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    fetchData();
  }, []);

  return <div>Check browser console for Firestore data</div>;
}