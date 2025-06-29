// app/posts/[id]/page.tsx

import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getEnhancedPostById, EnhancedPost } from '@/lib/data';


type PageProps = {
    params: { id: string };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    try {
        const post = await getEnhancedPostById(params.id);
        return {
            title: post.title,
            description: post.excerpt,
        };
    } catch (error) {
        return { title: "Post not found" };
    }
}

export default async function PostPage({ params }: PageProps) {
    let post: EnhancedPost;
    try {
        post = await getEnhancedPostById(params.id);
    } catch (error) {
        notFound();
    }

    return (
        <main className="py-8">
            <article>
                <h1 className="text-4xl md:text-5xl font-extrabold text-light-text dark:text-white mb-4 capitalize tracking-tight">
                    {post.title}
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">{post.publishDate}</p>

                <div className="relative w-full h-96 mb-8">
                    <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover rounded-lg"
                        priority
                    />
                </div>

                <div className="prose prose-lg dark:prose-invert max-w-none">
                    <p>{post.body}</p>
                </div>
            </article>
        </main>
    );
}