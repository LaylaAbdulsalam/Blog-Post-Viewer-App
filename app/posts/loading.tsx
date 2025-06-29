// app/posts/loading.tsx
export default function LoadingPostsList() {
    const skeletonCards = Array(9).fill(0);

    return (
        <main className="bg-gray-50 min-h-screen p-4 sm:p-8">
            <div className="container mx-auto max-w-6xl">
                <div className="h-10 bg-gray-200 rounded-md w-1/4 mb-8 animate-pulse"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {skeletonCards.map((_, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                            <div className="h-6 bg-gray-300 rounded-md w-3/4 mb-4"></div>
                            <div className="h-4 bg-gray-200 rounded-md w-full mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded-md w-5/6 mb-4"></div>
                            <div className="h-5 bg-gray-300 rounded-md w-1/3 mt-4"></div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}