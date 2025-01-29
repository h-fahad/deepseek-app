// components/navigation/DashboardSidebar.tsx
"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpenIcon, AcademicCapIcon, ChartBarIcon } from '@heroicons/react/24/outline';

export default function DashboardSidebar() {
  const pathname = usePathname();

  const navItems = [
    {
      name: 'Subjects',
      href: '/dashboard',
      icon: BookOpenIcon,
    },
    {
      name: 'Progress',
      href: '/dashboard/progress',
      icon: ChartBarIcon,
    },
    {
      name: 'Practice Tests',
      href: '/dashboard/tests',
      icon: AcademicCapIcon,
    },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4">
      <div className="flex items-center gap-2 mb-8">
        <img src="/vercel.svg" className="h-8 w-8" alt="Logo" />
        <span className="text-xl font-bold">SAT Prep</span>
      </div>
      <nav className="space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center px-3 py-2 rounded-lg ${
              pathname === item.href
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <item.icon className="h-5 w-5 mr-3" />
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}