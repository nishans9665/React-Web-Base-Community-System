"use client";

import { TopUpModal } from "@/components/user/TopUpModal";

export function Sidebar() {
    return (
        <aside className="hidden lg:block w-64 sticky top-24 bg-white/5 rounded-2xl border border-white/10 p-4 h-[calc(100vh-8rem)]">
            <div className="space-y-4">
                <div>
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Menu</h3>
                    <button className="w-full text-left px-4 py-2 rounded-lg bg-blue-600/10 text-blue-400 font-medium border border-blue-600/20">Home</button>
                    <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors">Popular</button>
                    <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors">Topics</button>
                </div>

                <div>
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">My Community</h3>
                    <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors">Bookmarks</button>
                    <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors">My Questions</button>
                </div>
            </div>

            <div className="mt-8 p-4 rounded-xl bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/20">
                <h4 className="font-semibold text-sm mb-1 text-white">Upgrade Level</h4>
                <p className="text-xs text-gray-400 mb-3">Unlock premium features and badges.</p>
                <TopUpModal />
            </div>
        </aside>
    );
}
