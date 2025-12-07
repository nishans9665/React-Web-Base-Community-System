"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, FileText, Settings, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

const adminLinks = [
    { href: "/admin", label: "Overview", icon: LayoutDashboard },
    { href: "/admin/users", label: "User Management", icon: Users },
    { href: "/admin/posts", label: "Content Moderation", icon: FileText },
    { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-[#111] border-r border-white/10 min-h-screen p-4">
            <div className="flex items-center gap-2 mb-8 px-2">
                <Shield className="w-6 h-6 text-red-500" />
                <span className="font-bold text-lg text-white">Admin Panel</span>
            </div>

            <div className="space-y-1">
                {adminLinks.map(link => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;

                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-red-600/10 text-red-500 border border-red-600/20"
                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <Icon className="w-5 h-5" />
                            {link.label}
                        </Link>
                    );
                })}
            </div>
        </aside>
    );
}
