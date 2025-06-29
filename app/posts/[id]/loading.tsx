// app/posts/[id]/loading.tsx
export default function LoadingPostDetail() {
    return (
        <main className="bg-gray-50 min-h-screen py-8 sm:py-12">
            <div className="container mx-auto max-w-4xl px-4 animate-pulse">
                <div className="h-6 bg-gray-300 rounded w-1/4 mb-8"></div>
                <div className="h-12 bg-gray-300 rounded w-full mb-4"></div>
                <div className="h-8 bg-gray-300 rounded w-5/6 mb-8"></div>
                <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
            </div>
        </main>
    );
}
