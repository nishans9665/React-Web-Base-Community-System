"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { QuestionCard } from "@/components/feed/QuestionCard";
import { CreatePostModal } from "@/components/feed/CreatePostModal";
import { Post } from "@/types";
import { Plus, Search } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { Input } from "@/components/ui/input";

// Mock Data
const INITIAL_POSTS: Post[] = [
  {
    id: "1",
    title: "How to configure thermal printer with POS system?",
    content: "I'm having trouble setting up the Epson TM-T82III with the latest POS version. It prints but the layout is misaligned. Has anyone faced this issue? I tried reinstalling drivers but no luck.",
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

export default function Home() {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useAuth();

  const handleCreatePost = (newPostData: { title: string; content: string; tags: string[] }) => {
    if (!user) return;

    const newPost: Post = {
      id: Date.now().toString(),
      ...newPostData,
      authorId: user.id,
      authorName: user.name,
      authorLevel: user.level,
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: 0
    };

    setPosts([newPost, ...posts]);
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-blue-500/30">
      <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] -z-10 opacity-50" />

      <Navbar />

      <main className="container mx-auto px-4 py-8 flex items-start gap-8">
        <Sidebar />

        {/* Main Feed */}
        <div className="flex-1 max-w-2xl mx-auto">
          <div className="flex flex-col gap-6 mb-8">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Latest Questions</h1>
              {user && <CreatePostModal onPostCreated={handleCreatePost} />}
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input
                placeholder="Search questions, topics, or errors..."
                className="pl-10 bg-white/5 border-white/10 text-white placeholder-gray-500 hover:bg-white/10 focus:border-blue-500/50 transition-all rounded-xl h-11"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-6">
            {filteredPosts.length > 0 ? (
              filteredPosts.map(post => (
                <QuestionCard key={post.id} post={post} />
              ))
            ) : (
              <div className="text-center py-12 text-gray-500 border border-white/5 rounded-2xl bg-white/5">
                <p>No results found for "{searchQuery}"</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar - Trending/Stats */}
        <aside className="hidden xl:block w-80 sticky top-24 space-y-6">
          <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
            <h3 className="font-bold mb-4">Trending Topics</h3>
            <div className="flex flex-wrap gap-2">
              {['#hardware', '#inventory', '#api', '#billing', '#tax'].map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full bg-black/40 border border-white/10 text-xs text-gray-300 hover:border-white/30 cursor-pointer transition-colors"
                  onClick={() => setSearchQuery(tag.replace('#', ''))}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
            <h3 className="font-bold mb-4">Top Contributors</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-700" />
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold">Alex Johnson</h4>
                    <p className="text-xs text-gray-500">1.2k pts</p>
                  </div>
                  <span className="text-xs font-bold text-yellow-500">#{i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
