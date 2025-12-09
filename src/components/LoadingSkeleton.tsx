export default function LoadingSkeleton({ type = 'card' }: { type?: 'card' | 'detail' }) {
    if (type === 'detail') {
        return (
            <div className="container-custom py-12 animate-pulse">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    <div className="h-96 bg-gray-200 rounded-xl"></div>
                    <div className="space-y-4">
                        <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="card overflow-hidden animate-pulse">
            <div className="h-48 bg-gray-200"></div>
            <div className="p-6 space-y-4">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>
        </div>
    );
}
