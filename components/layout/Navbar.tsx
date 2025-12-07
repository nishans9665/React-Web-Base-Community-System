"use client";

import Link from "next/link";
import { useAuth } from "@/components/auth/AuthProvider";
import { ModeToggle } from "@/components/mode-toggle";
import {
    LogOut,
    User as UserIcon,
    Settings,
    CreditCard
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Navbar() {
    const { user, logout } = useAuth();

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/50 backdrop-blur-xl">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white">
                        P
                    </div>
                    <span className="font-bold text-lg text-foreground">POS Community</span>
                </Link>

                {user ? (
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-6 mr-4">
                            <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                                Feed
                            </Link>
                            <Link href="/leaderboard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                                Leaderboard
                            </Link>
                        </div>

                        <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                            <ModeToggle />

                            <div className="flex flex-col items-end mr-2 hidden sm:flex">
                                <span className="text-xs font-semibold text-foreground">{user.name}</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] uppercase tracking-wider font-bold text-blue-400">Lvl {user.level}</span>
                                    <span className="text-[10px] text-muted-foreground">•</span>
                                    <span className="text-[10px] text-yellow-500 font-medium flex items-center gap-0.5">
                                        {user.credits} CR
                                    </span>
                                </div>
                            </div>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="h-9 w-9 rounded-full bg-secondary/10 flex items-center justify-center border border-white/10 overflow-hidden outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                                        <Avatar className="h-9 w-9">
                                            <AvatarImage src={user.avatarUrl} alt={user.name} />
                                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end" forceMount>
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium leading-none">{user.name}</p>
                                            <p className="text-xs leading-none text-muted-foreground">
                                                {user.email}
                                            </p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <Link href="/profile">
                                            <DropdownMenuItem>
                                                <UserIcon className="mr-2 h-4 w-4" />
                                                <span>Profile</span>
                                            </DropdownMenuItem>
                                        </Link>
                                        <Link href="/profile">
                                            <DropdownMenuItem>
                                                <Settings className="mr-2 h-4 w-4" />
                                                <span>Settings</span>
                                            </DropdownMenuItem>
                                        </Link>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={logout} className="text-red-500 focus:text-red-500 focus:bg-red-500/10">
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Log out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-4">
                        <ModeToggle />
                        <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                            Sign In
                        </Link>
                        <Link
                            href="/signup"
                            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 transition-colors"
                        >
                            Join Now
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}
