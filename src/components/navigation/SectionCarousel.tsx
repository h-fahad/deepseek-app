// components/navigation/SectionCarousel.tsx
"use client";
import Link from 'next/link';

export default function SectionCarousel({ sections }: { sections: Array<{ id: string, name: string }> }) {
  return (
    <div className="flex overflow-x-auto pb-4 gap-4">
      {sections.map((section) => (
        <Link
          key={section.id}
          href={`#`} // Update with actual path later
          className="min-w-[200px] p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <h4 className="font-medium">{section.name}</h4>
        </Link>
      ))}
    </div>
  );
}