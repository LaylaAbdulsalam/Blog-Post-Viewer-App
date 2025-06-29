// app/posts/error.tsx
'use client';

import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
            <h2 className="text-2xl font-bold text-red-600 mb-4">
                Something went wrong!
            </h2>
            <p className="text-gray-700 mb-6">
                {error.message || "Could not fetch the requested data."}
            </p>
            <button
                onClick={() => reset()}
                className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg 
                   hover:bg-blue-700 transition-colors duration-300"
            >
                Try again
            </button>
        </div>
    );
}
