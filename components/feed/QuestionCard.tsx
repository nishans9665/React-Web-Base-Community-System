"use client";

import { useState } from "react";
import Link from "next/link";
import { Post } from "@/types";
import { MessageSquare, Heart, Clock, Tag, MoreHorizontal, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
    post: Post;
}

export function QuestionCard({ post }: QuestionCardProps) {
    const [isLiked, setIsLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(post.likes);

    const toggleLike = () => {
        if (isLiked) {
            setLikesCount(prev => prev - 1);
        } else {
            setLikesCount(prev => prev + 1);
        }
        setIsLiked(!isLiked);
    };

    const handleShare = () => {
        // Mock share
        alert("Link copied to clipboard!");
    };

    return (
        <div className="group relative p-6 rounded-2xl bg-card border border-border hover:bg-accent/50 transition-all duration-300 shadow-sm hover:shadow-md">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                        {post.authorName.charAt(0)}
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-foreground">{post.authorName}</h3>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="bg-primary/10 text-primary px-1.5 py-0.5 rounded border border-primary/20">
                                Lvl {post.authorLevel}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {new Date(post.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                </div>

                <button className="text-muted-foreground hover:text-foreground transition-colors">
                    <MoreHorizontal className="w-5 h-5" />
                </button>
            </div>

            <Link href={`/post/${post.id}`}>
                <h2 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors cursor-pointer">
                    {post.title}
                </h2>
            </Link>

            <p className="text-muted-foreground text-sm line-clamp-3 mb-4 leading-relaxed">
                {post.content}
            </p>

            <div className="flex items-center gap-2 mb-6 flex-wrap">
                {post.tags.map(tag => (
                    <span key={tag} className="flex items-center gap-1 px-2 py-1 rounded-md bg-secondary text-[10px] text-secondary-foreground hover:bg-secondary/80 transition-colors">
                        <Tag className="w-3 h-3 text-muted-foreground" />
                        {tag}
                    </span>
                ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-4">
                    <button
                        onClick={(e) => { e.preventDefault(); toggleLike(); }}
                        className={cn(
                            "flex items-center gap-2 text-sm transition-colors",
                            isLiked ? "text-red-500" : "text-muted-foreground hover:text-red-500"
                        )}
                    >
                        <Heart className={cn("w-4 h-4", isLiked && "fill-current")} />
                        {likesCount} Likes
                    </button>
                    <Link href={`/post/${post.id}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                        <MessageSquare className="w-4 h-4" />
                        {post.comments} Answers
                    </Link>
                    <button
                        onClick={(e) => { e.preventDefault(); handleShare(); }}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-blue-500 transition-colors"
                    >
                        <Share2 className="w-4 h-4" />
                        Share
                    </button>
                </div>

                <Link href={`/post/${post.id}`} className="text-xs font-medium text-primary hover:text-primary/80">
                    Read More
                </Link>
            </div>
        </div>
    );
}
