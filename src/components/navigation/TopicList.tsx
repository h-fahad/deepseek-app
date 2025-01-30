// components/navigation/TopicList.tsx
import Link from 'next/link';

interface Topic {
  id: string;
  name: string;
}

export default function TopicList({
  topics,
  subjectId,
  sectionId,
}: {
  topics: Topic[];
  subjectId: string;
  sectionId: string;
}) {
  return (
    <div className="grid grid-cols-1 gap-3">
      {topics.map((topic) => (
        <Link
          key={topic.id}
          href={`/subjects/${subjectId}/sections/${sectionId}/topics/${topic.id}`}
          className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-border border border-gray-100"
        >
          <h3 className="font-medium text-gray-900">{topic.name}</h3>
        </Link>
      ))}
    </div>
  );
}