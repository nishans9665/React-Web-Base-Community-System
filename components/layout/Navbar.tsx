"use client";

import Link from "next/link";
import { useAuth } from "@/components/auth/AuthProvider";
import { Button } from "@/components/ui/button"; // Will create simplified button usage
import {
    LogOut,
    PlusCircle,
    TrendingUp,
    Trophy,
    User as UserIcon,
    CreditCard
} from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
    const { user, logout } = useAuth();

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-xl">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white">
                        P
                    </div>
                    <span className="font-bold text-lg text-white">POS Community</span>
                </Link>

                {user ? (
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-6 mr-4">
                            <Link href="/" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                                Feed
                            </Link>
                            <Link href="/leaderboard" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                                Leaderboard
                            </Link>
                        </div>

                        <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                            <div className="flex flex-col items-end mr-2">
                                <span className="text-xs font-semibold text-white">{user.name}</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] uppercase tracking-wider font-bold text-blue-400">Lvl {user.level}</span>
                                    <span className="text-[10px] text-gray-500">•</span>
                                    <span className="text-[10px] text-yellow-500 font-medium flex items-center gap-0.5">
                                        {user.credits} CR
                                    </span>
                                </div>
                            </div>

                            <button className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center border border-white/10 overflow-hidden">
                                {user.avatarUrl ? (
                                    <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                                ) : (
                                    <UserIcon className="w-5 h-5 text-gray-400" />
                                )}
                            </button>

                            <button
                                onClick={logout}
                                className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all"
                                title="Logout"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-4">
                        <Link href="/login" className="text-sm font-medium text-gray-300 hover:text-white">
                            Sign In
                        </Link>
                        <Link
                            href="/signup"
                            className="px-4 py-2 rounded-lg bg-white text-black text-sm font-bold hover:bg-gray-200 transition-colors"
                        >
                            Join Now
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}
