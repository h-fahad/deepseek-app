// components/common/TopicSkeleton.tsx
export default function TopicSkeleton() {
    return (
        <div className="space-y-8 animate-pulse">
            <div className="flex items-center gap-2">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-4 bg-gray-200 rounded w-1/6"></div>
                ))}
            </div>
            <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                <div className="h-32 bg-gray-100 rounded-lg"></div>
            </div>
        </div>
    );
}