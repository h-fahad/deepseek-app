// app/dashboard/layout.tsx
"use client";
import AuthGuard from '@/components/common/AuthGuard';
import DashboardSidebar from '@/components/navigation/DashboardSidebar';
import { useAuth } from '@/contexts/AuthContext';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 flex">
        <DashboardSidebar />
        <main className="flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {user?.email?.split('@')[0]}!
            </h1>
            {/* Add profile dropdown later */}
          </div>
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}