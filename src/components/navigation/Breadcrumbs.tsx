// components/navigation/Breadcrumbs.tsx
"use client";
import Link from 'next/link';

export default function Breadcrumbs({ paths }: { 
  paths: Array<{ name: string; href?: string }> 
}) {
  return (
    <nav className="flex text-sm" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {paths.map((path, index) => (
          <li key={path.name} className="flex items-center">
            {path.href ? (
              <Link
                href={path.href}
                className="text-gray-500 hover:text-gray-700"
              >
                {path.name}
              </Link>
            ) : (
              <span className="text-gray-700">{path.name}</span>
            )}
            {index < paths.length - 1 && (
              <span className="mx-2 text-gray-400">/</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}