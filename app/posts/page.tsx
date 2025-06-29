// app/posts/page.tsx

import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { PostCard } from '@/components/PostCard';
import { Pagination } from '@/components/Pagination';
import { getEnhancedPosts, EnhancedPost } from '@/lib/data';

export const metadata: Metadata = {
    title: "The Blog",
    description: "A collection of insightful blog posts, tech articles, and design guides.",
};

const POSTS_PER_PAGE = 9;

const FeaturedPostCard = ({ post }: { post: EnhancedPost }) => (
    <Link href={`/posts/${post.id}`} className="block group col-span-1 lg:col-span-2">
        <article className="flex flex-col h-full">
            <div className="relative w-full h-80 mb-4">
                <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    sizes="(max-width: 1280px) 100vw, 800px"
                    className="object-cover rounded-lg"
                    priority
                />
            </div>
            <p className="text-sm text-primary-500 font-semibold">{post.publishDate}</p>
            <h2 className="text-3xl font-bold my-2 text-light-text dark:text-white flex justify-between items-start">
                <span>{post.title}</span>
                <ArrowUpRight className="w-7 h-7 text-gray-500 shrink-0 group-hover:text-primary-500 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">{post.excerpt}</p>
            <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 text-sm font-medium bg-accent-bg text-accent-text dark:bg-dark-800 dark:text-primary-500 rounded-full">
                        {tag}
                    </span>
                ))}
            </div>
        </article>
    </Link>
);

export default async function BlogHomePage({ searchParams }: { searchParams: { page?: string } }) {
    const allPosts = await getEnhancedPosts();
    const currentPage = Number(searchParams.page) || 1;
    const recentPosts = allPosts.slice(0, 3);
    const otherPosts = allPosts.slice(3);
    const totalPages = Math.ceil(otherPosts.length / POSTS_PER_PAGE);

    const paginatedPostsStart = (currentPage - 1) * POSTS_PER_PAGE;
    const paginatedPostsEnd = paginatedPostsStart + POSTS_PER_PAGE;
    const currentPosts = otherPosts.slice(paginatedPostsStart, paginatedPostsEnd);

    return (
        <main className="py-8">
            <div className="text-center my-12 md:my-16">
                <div className="w-full h-px bg-gray-200 dark:bg-gray-700 mb-4"></div>
                <h1 className="text-6xl md:text-8xl font-extrabold text-light-text dark:text-white tracking-tighter">
                    THE BLOG
                </h1>
                <div className="w-full h-px bg-gray-200 dark:bg-gray-700 mt-4"></div>
            </div>

            {currentPage === 1 && (
                <>
                    <h2 className="text-3xl font-bold mb-8 text-light-text dark:text-white">Recent blog posts</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                        <FeaturedPostCard post={recentPosts[0]} />
                        <div className="flex flex-col gap-8">
                            {recentPosts.slice(1).map(post => (
                                <PostCard key={post.id} post={post} variant="small" />
                            ))}
                        </div>
                    </div>
                </>
            )}

            <h2 className="text-3xl font-bold mb-8 text-light-text dark:text-white">All blog posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {currentPosts.map((post) => (
                    <PostCard key={post.id} post={post} variant="default" />
                ))}
            </div>

            <Pagination totalPages={totalPages} />
        </main>
    );
}