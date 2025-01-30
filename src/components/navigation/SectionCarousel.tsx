// components/navigation/SectionCarousel.tsx
"use client";
import Link from 'next/link';

interface Section {
  id: string;
  name: string;
  topics: Array<{ id: string; name: string }>;
}

export default function SectionCarousel({
  sections,
  subjectId,
}: {
  sections: Section[];
  subjectId: string;
}) {
  return (
    <div className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide">
      {sections?.map((section) => (
        <Link
          key={section.id}
          href={`/subjects/${subjectId}/sections/${section.id}`}
          className="min-w-[200px] p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
        >
          <h3 className="font-medium text-gray-900">{section.name}</h3>
          <p className="text-sm text-gray-500 mt-2">
            {section.topics.length} topics
          </p>
        </Link>
      ))}
    </div>
  );
}