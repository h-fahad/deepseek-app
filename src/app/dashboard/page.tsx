// app/dashboard/page.tsx
import SubjectGrid from '@/components/navigation/SubjectGrid';
import QuestionGenerator from '@/components/practice/QuestionGenerator';

export default function DashboardPage() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Select Your Subject</h2>
      <SubjectGrid />
      <h1 className="text-2xl font-bold mb-8">SAT Practice Generator</h1>
      <QuestionGenerator />
    </div>
  );
}