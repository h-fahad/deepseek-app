// components/common/SubjectSkeleton.tsx
export default function SubjectSkeleton() {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
        </div>
        <div className="flex overflow-x-auto gap-4 pb-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="min-w-[200px] p-4 bg-gray-100 rounded-lg">
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }