export interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'user';
    level: number;
    xp: number;
    credits: number;
    avatarUrl?: string; // Optional for now
}

export interface Post {
    id: string;
    title: string;
    content: string;
    authorId: string;
    authorName: string;
    authorLevel: number;
    createdAt: string;
    likes: number;
    comments: number;
    tags: string[];
}

export interface Comment {
    id: string;
    postId: string;
    content: string;
    authorId: string;
    authorName: string;
    authorLevel: number;
    createdAt: string;
}
