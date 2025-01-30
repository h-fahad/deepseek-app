// lib/api/progress-service.ts
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase/config";

export async function updateProgress(
  userId: string,
  path: string, // e.g. 'math/algebra/linear-equations'
  status: 'started' | 'completed'
) {
  await setDoc(doc(db, "users", userId, "progress", path), {
    status,
    updatedAt: serverTimestamp()
  }, { merge: true });
}