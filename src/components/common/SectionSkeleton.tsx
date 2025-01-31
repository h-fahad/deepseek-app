// components/common/SectionSkeleton.tsx
export default function SectionSkeleton() {
    return (
        <div className="space-y-6 animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="grid gap-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-16 bg-gray-100 rounded-lg"></div>
                ))}
            </div>
        </div>
    );
}
