// app/dashboard/page.tsx
import SubjectGrid from '@/components/navigation/SubjectGrid';

export default function DashboardPage() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Select Your Subject</h2>
      <SubjectGrid />
    </div>
  );
}