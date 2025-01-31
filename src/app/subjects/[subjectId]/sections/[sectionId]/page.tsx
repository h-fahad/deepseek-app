// app/subjects/[subjectId]/sections/[sectionId]/page.tsx
import { getSectionData } from '@/lib/api/firebase-client';
import { notFound } from 'next/navigation';
import TopicList from '@/components/navigation/TopicList';
import { Suspense } from 'react';
import SectionSkeleton from '@/components/common/SectionSkeleton';

export default async function SectionPage({
  params,
}: {
  params: { subjectId: string; sectionId: string };
}) {
  return (
    <Suspense fallback={<SectionSkeleton />}>
      <SectionContent params={params} />
    </Suspense>
  );
}

async function SectionContent({ params }: { params: { subjectId: string; sectionId: string } }) {
  const section = await getSectionData(params.subjectId, params.sectionId);
  
  if (!section) return notFound();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">{section.name}</h2>
      <TopicList
        topics={section.topics}
        subjectId={params.subjectId}
        sectionId={params.sectionId}
      />
    </div>
  );
}