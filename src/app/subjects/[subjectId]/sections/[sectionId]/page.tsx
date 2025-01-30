// app/subjects/[subjectId]/sections/[sectionId]/page.tsx
import TopicList from '@/components/navigation/TopicList';
import { SAT_CONTENT, SubjectId } from '@/lib/mock/sat-data';
import { notFound } from 'next/navigation';

export default function SectionPage({
  params,
}: {
  params: { subjectId: string; sectionId: string };
}) {
  const subject = SAT_CONTENT[params.subjectId as SubjectId];
  const section = subject?.sections.find(s => s.id === params.sectionId);

  if (!section) return notFound();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">{section.name}</h2>
      <TopicList
        topics={[...section.topics]}
        subjectId={params.subjectId}
        sectionId={params.sectionId}
      />
    </div>
  );
}