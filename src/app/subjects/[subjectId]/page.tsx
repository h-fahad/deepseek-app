// app/subjects/[subjectId]/page.tsx
import { getSubject } from '@/lib/api/firebase-client';
import { notFound } from 'next/navigation';
import SectionCarousel from '@/components/navigation/SectionCarousel';
import SubjectSkeleton from '@/components/common/SubjectSkeleton';
import { Suspense } from 'react';

// Main page component (server component)
export default function SubjectPage({
  params,
}: {
  params: { subjectId: string };
}) {
  return (
    <Suspense fallback={<SubjectSkeleton />}>
      <SubjectContent subjectId={params.subjectId} />
    </Suspense>
  );
}

// Async content component
async function SubjectContent({ subjectId }: { subjectId: string }) {
  const subject = await getSubject(subjectId);

  if (!subject) return notFound();

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <span className="text-4xl">{subject.icon}</span>
        <h1 className="text-3xl font-bold">{subject.name}</h1>
      </div>
      <SectionCarousel
        subjectId={subjectId}
        sections={subject.sections}
      />
    </div>
  );
}