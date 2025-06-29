// lib/data.ts

import { Post } from "@/types";

export interface EnhancedPost extends Post {
    authorName: string;
    publishDate: string;
    coverImage: string;
    tags: string[];
    excerpt: string;
}

const authors = [
    { id: 1, name: "Olivia Rhye", imageUrl: "/authors/olivia.png" },
    { id: 2, name: "Phoenix Baker", imageUrl: "/authors/phoenix.png" },
    { id: 3, name: "Lana Steiner", imageUrl: "/authors/lana.png" },
    { id: 4, name: "Candice Wu", imageUrl: "/authors/candice.png" },
    { id: 5, name: "Natali Craig", imageUrl: "/authors/natali.png" },
    { id: 6, name: "Drew Cano", imageUrl: "/authors/drew.png" },
    { id: 7, name: "Orlando Diggs", imageUrl: "/authors/orlando.png" },
    { id: 8, name: "Andi Lane", imageUrl: "/authors/andi.png" },
    { id: 9, name: "Kate Morrison", imageUrl: "/authors/kate.png" },
    { id: 10, name: "Demi Wilkinson", imageUrl: "/authors/demi.png" },
];

const allTags = ["Design", "Research", "Presentation", "Product", "Frameworks", "Leadership", "Management", "Software Development", "Tools", "SaaS", "Community", "UX", "API"];

const getPostTags = (postId: number): string[] => {
    const selectedTags: string[] = [];
    const tagCount = (postId % 2) + 2;
    for (let i = 0; i < tagCount; i++) {
        selectedTags.push(allTags[(postId + i * 3) % allTags.length]);
    }
    return selectedTags;
};


const enhancePost = (post: Post): EnhancedPost => {
    const author = authors.find(a => a.id === post.userId) || authors[0];
    const publishDate = `Sunday, 1 Jan 2023`;

    return {
        ...post,
        title: post.title
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' '),
        body: post.body.repeat(5) + "\n\n" + post.body.repeat(5),
        excerpt: post.body.substring(0, 120) + "...",
        authorName: author.name,
        publishDate: publishDate,
        coverImage: `https://picsum.photos/seed/${post.id}/1280/720`,
        tags: getPostTags(post.id),
    };
};

export const getEnhancedPosts = async (): Promise<EnhancedPost[]> => {
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts', { next: { revalidate: 3600 } });
        if (!res.ok) throw new Error('Failed to fetch posts');
        const posts: Post[] = await res.json();
        return posts.map(enhancePost);
    } catch (error) {
        console.error("Error fetching posts:", error);
        return [];
    }
};

export const getEnhancedPostById = async (id: string): Promise<EnhancedPost> => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, { next: { revalidate: 3600 } });
    if (!res.ok) {
        throw new Error('Failed to fetch post');
    }
    const post: Post = await res.json();
    return enhancePost(post);
};