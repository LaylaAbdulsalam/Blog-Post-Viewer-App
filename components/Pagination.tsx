// components/Pagination.tsx
'use client'

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface PaginationProps {
    totalPages: number;
}

export function Pagination({ totalPages }: PaginationProps) {
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;

    const pages: (number | string)[] = [];

    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
            const lastPage = pages[pages.length - 1];
            if (typeof lastPage === 'number' && i > lastPage + 1) {
                pages.push('...');
            }
            pages.push(i);
        }
    }

    return (
        <nav className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-8 mt-12">
            <Link
                href={{ query: { page: Math.max(1, currentPage - 1) } }}
                className={`relative inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-800 ${currentPage === 1 ? 'pointer-events-none opacity-50' : ''}`}
            >
                <ArrowLeft className="h-5 w-5" />
                <span>Previous</span>
            </Link>

            <div className="hidden md:flex gap-1">
                {pages.map((page, i) => (
                    <Link
                        key={`${page}-${i}`}
                        href={typeof page === 'number' ? { query: { page } } : '#'}
                        className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${page === currentPage
                                ? 'z-10 bg-primary-700 text-white'
                                : typeof page === 'number'
                                    ? 'text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-dark-800'
                                    : 'text-gray-500'
                            } ${typeof page !== 'number' ? 'pointer-events-none' : ''}`}
                    >
                        {page}
                    </Link>
                ))}
            </div>

            <Link
                href={{ query: { page: Math.min(totalPages, currentPage + 1) } }}
                className={`relative inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-800 ${currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}`}
            >
                <span>Next</span>
                <ArrowRight className="h-5 w-5" />
            </Link>
        </nav>
    );
}