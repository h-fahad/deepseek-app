// app/subjects/[subjectId]/sections/[sectionId]/topics/[topicId]/page.tsx
"use client";
import { SAT_CONTENT, SubjectId } from '@/lib/mock/sat-data';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/navigation/Breadcrumbs';
import ChatStarter from '@/components/ai/ChatStarter';
import { updateProgress } from '@/lib/api/progress-service';
import { useAuth } from '@/contexts/AuthContext';

export default function TopicPage({
  params,
}: {
  params: { subjectId: string; sectionId: string; topicId: string };
}) {
  const { user } = useAuth();
  const path = `${params.subjectId}/${params.sectionId}/${params.topicId}`;

  const topic = SAT_CONTENT[params.subjectId as SubjectId]
    ?.sections.find(s => s.id === params.sectionId)
    ?.topics.find(t => t.id === params.topicId);

  if (!topic) return notFound();

  return (
    <div className="space-y-8">
      <Breadcrumbs
        paths={[
          { name: "Subjects", href: "/dashboard" },
          { 
            name: SAT_CONTENT[params.subjectId as keyof typeof SAT_CONTENT].name,
            href: `/subjects/${params.subjectId}`
          },
          {
            name: params.sectionId,
            href: `/subjects/${params.subjectId}/sections/${params.sectionId}`
          },
          { name: topic.name }
        ]}
      />

      <div className="prose max-w-none">
        <h1>{topic.name}</h1>
        {/* Temporary content - will replace with AI-generated */}
        <p>Coming soon: AI-powered explanation for {topic.name}...</p>
        
        <ChatStarter
          prompt={`Explain ${topic.name} in simple terms for SAT preparation`}
        />
      </div>
      <div className="flex gap-4 mt-8">
        <button
          onClick={() => user?.uid && updateProgress(user.uid, path, 'started')}
          className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg"
        >
          Mark as Started
        </button>
        <button
          onClick={() => user?.uid && updateProgress(user.uid, path, 'completed')}
          className="px-4 py-2 bg-green-100 text-green-600 rounded-lg"
        >
          Mark as Completed
        </button>
      </div>
    </div>
  );
}