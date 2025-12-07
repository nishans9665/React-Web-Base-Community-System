"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Post, Comment } from "@/types";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Clock, MessageSquare, Heart, Share2, Tag, Send } from "lucide-react";

// Mock Data (Duplicated for now, ideally moved to a store/context)
const MOCK_POSTS: Post[] = [
    {
        id: "1",
        title: "How to configure thermal printer with POS system?",
        content: "I'm having trouble setting up the Epson TM-T82III with the latest POS version. It prints but the layout is misaligned. Has anyone faced this issue? I tried reinstalling drivers but no luck.\n\nI've checked the baud rate and it matches. The paper size is set to 80mm in the settings. Is there a specific driver version I should be using?",
        authorId: "user-2",
        authorName: "Sarah Tech",
        authorLevel: 12,
        createdAt: "2023-12-07T10:00:00Z",
        likes: 24,
        comments: 5,
        tags: ["hardware", "printer", "troubleshooting"]
    },
    {
        id: "2",
        title: "Best practices for inventory management in retail?",
        content: "Looking for advice on how to structure categories for a grocery store. Do you guys use sub-categories for brands or just generic types? What works best for reporting?",
        authorId: "user-3",
        authorName: "Mike Store Owner",
        authorLevel: 5,
        createdAt: "2023-12-06T14:30:00Z",
        likes: 15,
        comments: 12,
        tags: ["inventory", "retail", "management"]
    },
    {
        id: "3",
        title: "API Rate limits for bulk product upload?",
        content: "I'm hitting a 429 error when uploading >1000 items via the CSV import API. Is there a documented limit or a way to batch these requests efficiently? Documentation seems vague.",
        authorId: "user-4",
        authorName: "Dev Dave",
        authorLevel: 25,
        createdAt: "2023-12-05T09:15:00Z",
        likes: 42,
        comments: 8,
        tags: ["api", "development", "bulk-import"]
    }
];

const MOCK_COMMENTS: Comment[] = [
    {
        id: "c1",
        postId: "1",
        content: "Make sure you are using the APD_512 driver, not the generic one.",
        authorId: "user-5",
        authorName: "Support Guru",
        authorLevel: 20,
        createdAt: "2023-12-07T10:30:00Z"
    },
    {
        id: "c2",
        postId: "1",
        content: "Also check the padding settings in the POS config file.",
        authorId: "user-6",
        authorName: "Techie Tom",
        authorLevel: 8,
        createdAt: "2023-12-07T11:00:00Z"
    }
];

export default function PostDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [post, setPost] = useState<Post | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        // Simulate Fetch
        const foundPost = MOCK_POSTS.find(p => p.id === params.id);
        if (foundPost) {
            setPost(foundPost);
            setComments(MOCK_COMMENTS.filter(c => c.postId === foundPost.id));
        }
    }, [params.id]);

    const handleSubmitComment = () => {
        if (!newComment.trim()) return;
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            const comment: Comment = {
                id: Date.now().toString(),
                postId: post!.id,
                content: newComment,
                authorId: "current-user",
                authorName: "You",
                authorLevel: 1,
                createdAt: new Date().toISOString()
            };

            setComments([...comments, comment]);
            setNewComment("");
            setIsSubmitting(false);
        }, 1000);
    };

    if (!post) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
                <div className="animate-pulse">Loading discussion...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-blue-500/30">
            <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] -z-10 opacity-50" />

            <Navbar />

            <main className="container mx-auto px-4 py-8 flex items-start gap-8">
                <Sidebar />

                <div className="flex-1 max-w-3xl mx-auto">
                    <Button
                        variant="ghost"
                        onClick={() => router.back()}
                        className="mb-6 text-gray-400 hover:text-white"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Feed
                    </Button>

                    {/* Post Content */}
                    <div className="bg-[#111] rounded-2xl border border-white/10 overflow-hidden mb-8">
                        <div className="p-8">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center text-lg font-bold">
                                    {post.authorName.charAt(0)}
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold">{post.title}</h1>
                                    <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                                        <span className="text-blue-400 font-medium">{post.authorName}</span>
                                        <span>•</span>
                                        <span className="bg-blue-500/10 text-blue-400 px-1.5 py-0.5 rounded text-xs border border-blue-500/20">Lvl {post.authorLevel}</span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {new Date(post.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed whitespace-pre-wrap">
                                {post.content}
                            </div>

                            <div className="flex flex-wrap gap-2 mt-8 mb-8">
                                {post.tags.map(tag => (
                                    <span key={tag} className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300">
                                        <Tag className="w-3 h-3 text-gray-500" />
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center justify-between pt-6 border-t border-white/10">
                                <div className="flex items-center gap-4">
                                    <Button variant="ghost" className="hover:text-pink-500 hover:bg-pink-500/10 gap-2">
                                        <Heart className="w-5 h-5" />
                                        {post.likes} Likes
                                    </Button>
                                    <Button variant="ghost" className="hover:text-blue-500 hover:bg-blue-500/10 gap-2">
                                        <Share2 className="w-5 h-5" />
                                        Share
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Comments Section */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-bold flex items-center gap-2">
                            <MessageSquare className="w-5 h-5 text-blue-500" />
                            {comments.length} Answers
                        </h3>

                        {/* Comment Input */}
                        <div className="bg-[#111] p-6 rounded-2xl border border-white/10">
                            <Textarea
                                placeholder="Write a helpful answer..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                className="bg-black/40 border-white/10 mb-4 min-h-[100px]"
                            />
                            <div className="flex justify-end">
                                <Button
                                    onClick={handleSubmitComment}
                                    disabled={isSubmitting || !newComment.trim()}
                                    className="bg-blue-600 hover:bg-blue-500"
                                >
                                    {isSubmitting ? "Posting..." : <><Send className="w-4 h-4 mr-2" /> Post Answer</>}
                                </Button>
                            </div>
                        </div>

                        {/* Comment List */}
                        <div className="space-y-4">
                            {comments.map(comment => (
                                <div key={comment.id} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs font-bold">
                                                {comment.authorName.charAt(0)}
                                            </div>
                                            <div>
                                                <span className="text-sm font-bold block">{comment.authorName}</span>
                                                <span className="text-xs text-gray-400">Lvl {comment.authorLevel}</span>
                                            </div>
                                        </div>
                                        <span className="text-xs text-gray-500">
                                            {new Date(comment.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="text-gray-300 text-sm leading-relaxed">
                                        {comment.content}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
