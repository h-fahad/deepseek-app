// lib/api/firebase-client.ts
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";
import { Section, Subject, Topic } from "@/types/sat-types";

export async function getSubject(subjectId: string) {
  const docRef = doc(db, "subjects", subjectId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
}

// lib/api/firebase-client.ts
// lib/api/firebase-client.ts
export async function getAllSubjects(): Promise<Subject[]> {
  try {
    const querySnapshot = await getDocs(collection(db, "subjects"));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      name: doc.data().name || '',
      icon: doc.data().icon || '📘',
      sections: doc.data().sections || []
    }) as Subject);
  } catch (error) {
    console.error('Error fetching subjects:', error);
    return [];
  }
}

// lib/api/firebase-client.ts
export async function getSectionData(subjectId: string, sectionId: string) {
  const subjectDoc = await getDoc(doc(db, "subjects", subjectId));
  if (!subjectDoc.exists()) return null;
  
  const subjectData = subjectDoc.data();
  const section = subjectData.sections.find((s: Section) => s.id === sectionId);
  return section || null;
}

export async function getTopicData(
  subjectId: string, 
  sectionId: string, 
  topicId: string
) {
  const section = await getSectionData(subjectId, sectionId);
  if (!section) return null;
  
  return section.topics.find((t: Topic) => t.id === topicId) || null;
}