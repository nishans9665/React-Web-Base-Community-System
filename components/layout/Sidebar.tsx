"use client";

import { cn } from "@/lib/utils";
import { TopUpModal } from "@/components/user/TopUpModal";

interface SidebarProps {
    activeTab?: string;
    onTabChange?: (tab: string) => void;
}

export function Sidebar({ activeTab = "home", onTabChange }: SidebarProps) {
    const menuItems = [
        { id: "home", label: "Home" },
        { id: "popular", label: "Popular" },
        { id: "topics", label: "Topics" },
    ];

    return (
        <aside className="hidden lg:block w-64 sticky top-24 bg-card rounded-2xl border border-border p-4 h-[calc(100vh-8rem)]">
            <div className="space-y-4">
                <div>
                    <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Menu</h3>
                    {menuItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => onTabChange?.(item.id)}
                            className={cn(
                                "w-full text-left px-4 py-2 rounded-lg font-medium transition-colors mb-1",
                                activeTab === item.id
                                    ? "bg-primary/10 text-primary border border-primary/20"
                                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                            )}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>

                <div>
                    <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">My Community</h3>
                    <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors">Bookmarks</button>
                    <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors">My Questions</button>
                </div>
            </div>

            <div className="mt-8 p-4 rounded-xl bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/20">
                <h4 className="font-semibold text-sm mb-1 text-foreground">Upgrade Level</h4>
                <p className="text-xs text-muted-foreground mb-3">Unlock premium features and badges.</p>
                <TopUpModal />
            </div>
        </aside>
    );
}
