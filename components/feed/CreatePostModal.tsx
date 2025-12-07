"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Tag, Loader2 } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";

interface CreatePostModalProps {
    onPostCreated: (postData: { title: string; content: string; tags: string[] }) => void;
}

export function CreatePostModal({ onPostCreated }: CreatePostModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !content) return;

        setIsLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));

        const tagList = tags.split(",").map(t => t.trim()).filter(Boolean);
        onPostCreated({ title, content, tags: tagList });

        setIsLoading(false);
        setIsOpen(false);
        setTitle("");
        setContent("");
        setTags("");
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold shadow-lg shadow-blue-500/25 transition-all hover:scale-105">
                    <Plus className="w-4 h-4 mr-2" />
                    Ask Question
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl bg-[#1a1a1a] border-white/10 text-white">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                        Ask the Community
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Question Title</label>
                        <Input
                            placeholder="e.g., How to resolve thermal printer driver conflict?"
                            className="bg-black/20 border-white/10 text-white placeholder-gray-500 focus:border-blue-500/50"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Details</label>
                        <Textarea
                            placeholder="Describe your issue in detail..."
                            className="min-h-[150px] bg-black/20 border-white/10 text-white placeholder-gray-500 focus:border-blue-500/50 resize-none"
                            value={content}
                            onChange={e => setContent(e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                            <Tag className="w-3 h-3 text-blue-400" />
                            Tags (comma separated)
                        </label>
                        <Input
                            placeholder="printer, drivers, windows"
                            className="bg-black/20 border-white/10 text-white placeholder-gray-500 focus:border-blue-500/50"
                            value={tags}
                            onChange={e => setTags(e.target.value)}
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                        <Button type="button" variant="ghost" onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white hover:bg-white/10">
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading || !user} className="bg-blue-600 hover:bg-blue-500 text-white min-w-[100px]">
                            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Post Question"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
