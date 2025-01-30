// components/common/SubjectCardSkeleton.tsx
export default function SubjectCardSkeleton() {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm animate-pulse">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-gray-200 rounded-lg w-12 h-12"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-gray-300 h-2 rounded-full w-1/4" />
        </div>
      </div>
    );
  }