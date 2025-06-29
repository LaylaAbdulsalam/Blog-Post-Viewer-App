// components/PostCard.tsx
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { EnhancedPost } from '@/lib/data';

interface PostCardProps {
    post: EnhancedPost;
    variant?: 'default' | 'small';
}

export function PostCard({ post, variant = 'default' }: PostCardProps) {
    const isSmall = variant === 'small';

    return (
        <Link href={`/posts/${post.id}`} className="group">
            <article className="flex flex-col h-full">
                {!isSmall && (
                    <div className="relative w-full h-52 mb-4">
                        <Image src={post.coverImage} alt={post.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover rounded-lg" />
                    </div>
                )}
                <p className="text-sm text-primary-500 font-semibold">{post.publishDate}</p>
                <h2 className={`${isSmall ? 'text-xl' : 'text-2xl'} font-bold my-2 text-gray-900 dark:text-white flex justify-between items-start`}>
                    <span>{post.title}</span>
                    <ArrowUpRight className="w-6 h-6 text-gray-500 shrink-0 group-hover:text-primary-500 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
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
}