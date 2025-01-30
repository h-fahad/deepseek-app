// lib/api/firebase-client.ts
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";
import { Subject } from "@/types/sat-types";

export async function getSubject(subjectId: string) {
  const docRef = doc(db, "subjects", subjectId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
}

// lib/api/firebase-client.ts
export async function getAllSubjects(): Promise<Subject[]> {
  const querySnapshot = await getDocs(collection(db, "subjects"));
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }) as Subject);
}