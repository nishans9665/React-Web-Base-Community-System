"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/types";
import { useRouter } from "next/navigation";

interface AuthContextType {
    user: User | null;
    login: (email: string) => Promise<void>;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check localStorage for persisted user
        const storedUser = localStorage.getItem("pos_community_user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string) => {
        setIsLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock Login Logic
        let mockUser: User;
        if (email.includes("admin")) {
            mockUser = {
                id: "admin-1",
                name: "Admin User",
                email,
                role: "admin",
                level: 99,
                xp: 10000,
                credits: 9999,
                avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin",
            };
        } else {
            mockUser = {
                id: "user-1",
                name: "John Doe",
                email,
                role: "user",
                level: 1,
                xp: 0,
                credits: 50,
                avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
            };
        }

        setUser(mockUser);
        localStorage.setItem("pos_community_user", JSON.stringify(mockUser));
        setIsLoading(false);
        router.push("/");
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("pos_community_user");
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
