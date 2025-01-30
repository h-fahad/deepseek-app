// components/navigation/SubjectGrid.tsx
"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getAllSubjects } from '@/lib/api/firebase-client';
import { Subject } from '@/types/sat-types';
import SubjectCardSkeleton from '../common/SubjectCardSkeleton';
import { useAuth } from '@/contexts/AuthContext';
import { collection, getDocs } from '@firebase/firestore';
import { db } from '@/firebase/config';

export default function SubjectGrid() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const data = await getAllSubjects();
        console.log(data);
        setSubjects(data);
      } catch (err) {
        setError('Failed to load subjects');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  if (error) return <div className="text-red-500 p-4">{error}</div>;

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <SubjectCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {subjects.map((subject) => (
        <SubjectCard key={subject.id} subject={subject} />
      ))}
    </div>
  );
}

const SubjectCard = ({ subject }: { subject: Subject }) => {
  const { user } = useAuth();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const calculateProgress = async () => {
      if (!user) return;
      
      // Get user progress from Firestore
      const progressRef = collection(db, 'users', user.uid, 'progress');
      const querySnapshot = await getDocs(progressRef);
      
      const totalTopics = subject.sections.reduce(
        (acc, section) => acc + section.topics.length, 0
      );
      
      const completedTopics = querySnapshot.docs.filter(doc => 
        doc.data().status === 'completed'
      ).length;

      setProgress(Math.round((completedTopics / totalTopics) * 100));
    };

    calculateProgress();
  }, [user, subject]);

  return (
    <Link
      href={`/subjects/${subject.id}`}
      className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-blue-100 rounded-lg text-2xl">
          {subject.icon}
        </div>
        <h3 className="text-lg font-semibold">{subject.name}</h3>
      </div>
      <div className="flex items-center justify-between">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-sm text-gray-600 ml-2">
          {progress}%
        </span>
      </div>
    </Link>
  );
};