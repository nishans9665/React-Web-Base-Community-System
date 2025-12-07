"use client";

import Link from "next/link";
import { Post } from "@/types";
import { MessageSquare, Heart, Clock, Tag, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
    post: Post;
}

export function QuestionCard({ post }: QuestionCardProps) {
    return (
        <div className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:border-white/20 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center text-sm font-bold text-white">
                        {post.authorName.charAt(0)}
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-white">{post.authorName}</h3>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                            <span className="bg-blue-500/10 text-blue-400 px-1.5 py-0.5 rounded border border-blue-500/20">
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

                <button className="text-gray-500 hover:text-white transition-colors">
                    <MoreHorizontal className="w-5 h-5" />
                </button>
            </div>

            <Link href={`/post/${post.id}`}>
                <h2 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors cursor-pointer">
                    {post.title}
                </h2>
            </Link>

            <p className="text-gray-400 text-sm line-clamp-3 mb-4 leading-relaxed">
                {post.content}
            </p>

            <div className="flex items-center gap-2 mb-6 flex-wrap">
                {post.tags.map(tag => (
                    <span key={tag} className="flex items-center gap-1 px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] text-gray-300 hover:bg-white/10 transition-colors">
                        <Tag className="w-3 h-3 text-gray-500" />
                        {tag}
                    </span>
                ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-pink-500 transition-colors group/like">
                        <Heart className="w-4 h-4 group-hover/like:fill-pink-500/20" />
                        {post.likes} Likes
                    </button>
                    <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-blue-400 transition-colors">
                        <MessageSquare className="w-4 h-4" />
                        {post.comments} Answers
                    </button>
                </div>

                <Link href={`/post/${post.id}`} className="text-xs font-medium text-blue-400 hover:text-blue-300">
                    Read More
                </Link>
            </div>
        </div>
    );
}
