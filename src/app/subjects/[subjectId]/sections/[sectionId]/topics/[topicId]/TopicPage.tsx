"use client";
import { use } from 'react';
import { getTopicData } from '@/lib/api/firebase-client';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/navigation/Breadcrumbs';
import ChatStarter from '@/components/ai/ChatStarter';
import { updateProgress } from '@/lib/api/progress-service';
import { useAuth } from '@/contexts/AuthContext';

export default function TopicPage({
  params,
}: {
  params: Promise<{ 
    subjectId: string; 
    sectionId: string; 
    topicId: string 
  }>;
}) {
  // Unwrap the params promise
  const resolvedParams = use(params);
  const { subjectId, sectionId, topicId } = resolvedParams;
  
  // Fetch topic data using unwrapped params
  const topic = use(getTopicData(subjectId, sectionId, topicId));
  const { user } = useAuth();
  const path = `${subjectId}/${sectionId}/${topicId}`;

  if (!topic) return notFound();

  return (
    <div className="space-y-8">
      <Breadcrumbs
        paths={[
          { name: "Subjects", href: "/dashboard" },
          { 
            name: "Math", // Fetch actual subject name from Firestore
            href: `/subjects/${subjectId}`
          },
          {
            name: sectionId,
            href: `/subjects/${subjectId}/sections/${sectionId}`
          },
          { name: topic.name }
        ]}
      />

      <div className="prose max-w-none">
        <h1>{topic.name}</h1>
        <ChatStarter
          prompt={`Explain ${topic.name} in simple terms for SAT preparation`}
        />
      </div>
      
      {user && (
        <div className="flex gap-4 mt-8">
          <button
            onClick={() => updateProgress(user.uid, path, 'started')}
            className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
          >
            Mark as Started
          </button>
          <button
            onClick={() => updateProgress(user.uid, path, 'completed')}
            className="px-4 py-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
          >
            Mark as Completed
          </button>
        </div>
      )}
    </div>
  );
}