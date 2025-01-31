// app/subjects/[subjectId]/sections/[sectionId]/topics/[topicId]/page.tsx
"use client";
import { getTopicData } from '@/lib/api/firebase-client';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/navigation/Breadcrumbs';
import ChatStarter from '@/components/ai/ChatStarter';
import { updateProgress } from '@/lib/api/progress-service';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';
import { Topic } from '@/types/sat-types';
import TopicSkeleton from '@/components/common/TopicSkeleton';

export default function TopicPage({
  params,
}: {
  params: { subjectId: string; sectionId: string; topicId: string };
}) {
  const { user } = useAuth();
  const [topic, setTopic] = useState<Topic | null>(null);
  const [loading, setLoading] = useState(true);
  const [routeParams, setRouteParams] = useState<{
    subjectId: string;
    sectionId: string;
    topicId: string;
  } | null>(null);

  // Store params in state after component mounts
  useEffect(() => {
    const getParams = async () => {
      const subjectId = await params.subjectId;
      const sectionId = await params.sectionId;
      const topicId = await params.topicId;
      setRouteParams({
        subjectId: subjectId,
        sectionId: sectionId,
        topicId: topicId
      });
    }
    getParams();
  }, [params]);

  // Fetch topic data when params are available
  useEffect(() => {
    if (!routeParams) return;

    const fetchTopic = async () => {
      try {
        const data = await getTopicData(
          routeParams.subjectId,
          routeParams.sectionId,
          routeParams.topicId
        );
        setTopic(data || null);
      } catch (error) {
        console.error('Error fetching topic:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopic();
  }, [routeParams]);

  if (!routeParams || loading) return <TopicSkeleton />;
  if (!topic) return notFound();

  const path = `${routeParams.subjectId}/${routeParams.sectionId}/${routeParams.topicId}`;

  return (
    <div className="space-y-8">
      <Breadcrumbs
        paths={[
          { name: "Subjects", href: "/dashboard" },
          {
            name: "Math", // Fetch subject name if needed
            href: `/subjects/${routeParams.subjectId}`
          },
          {
            name: routeParams.sectionId,
            href: `/subjects/${routeParams.subjectId}/sections/${routeParams.sectionId}`
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