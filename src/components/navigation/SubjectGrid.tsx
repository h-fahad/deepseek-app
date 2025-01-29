// components/navigation/SubjectGrid.tsx
"use client";
import Link from 'next/link';
import { MATH_ICON, READING_ICON, WRITING_ICON } from '@/lib/constants/subjects';

const subjects = [
  {
    id: 'math',
    name: 'Mathematics',
    icon: MATH_ICON,
    progress: 35,
  },
  {
    id: 'reading',
    name: 'Reading',
    icon: READING_ICON,
    progress: 20,
  },
  {
    id: 'writing',
    name: 'Writing',
    icon: WRITING_ICON,
    progress: 15,
  },
];

export default function SubjectGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {subjects.map((subject) => (
        <Link
          key={subject.id}
          href={`/subjects/${subject.id}`}
          className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              {/* <subject.icon className="h-6 w-6 text-blue-600" /> */}
            </div>
            <h3 className="text-lg font-semibold">{subject.name}</h3>
          </div>
          <div className="flex items-center justify-between">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${subject.progress}%` }}
              />
            </div>
            <span className="text-sm text-gray-600 ml-2">
              {subject.progress}%
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}