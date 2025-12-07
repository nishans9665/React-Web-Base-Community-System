"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/components/auth/AuthProvider";
import { Camera, Save, Loader2 } from "lucide-react";

export default function ProfilePage() {
    const { user } = useAuth();
    const [profileLoading, setProfileLoading] = useState(false);
    const [passwordLoading, setPasswordLoading] = useState(false);

    // Mock State
    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || ""); // Read-only in this mock usually
    const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || "");
    const [address, setAddress] = useState(user?.address || "");
    const [phone, setPhone] = useState(user?.phone || "");

    const handleProfileUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        setProfileLoading(true);
        // Mock API call
        setTimeout(() => {
            setProfileLoading(false);
            alert("Profile updated successfully!");
        }, 1500);
    };

    const handlePasswordUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        setPasswordLoading(true);
        // Mock API call
        setTimeout(() => {
            setPasswordLoading(false);
            alert("Password updated successfully!");
        }, 1500);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const fakeUrl = URL.createObjectURL(file);
            setAvatarUrl(fakeUrl);
        }
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <p>Please log in.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />

            <main className="container mx-auto px-4 py-8 max-w-4xl">
                <h1 className="text-3xl font-bold mb-8">Settings</h1>

                <Tabs defaultValue="general" className="w-full">
                    <TabsList className="mb-8">
                        <TabsTrigger value="general">General</TabsTrigger>
                        <TabsTrigger value="security">Security</TabsTrigger>
                        <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    </TabsList>

                    <TabsContent value="general">
                        <Card>
                            <CardHeader>
                                <CardTitle>Profile Information</CardTitle>
                                <CardDescription>Update your profile details and public avatar.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleProfileUpdate} className="space-y-6">
                                    <div className="flex items-center gap-6">
                                        <div className="relative group">
                                            <Avatar className="w-24 h-24 border-2 border-border">
                                                <AvatarImage src={avatarUrl} className="object-cover" />
                                                <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <label
                                                htmlFor="avatar-upload"
                                                className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white"
                                            >
                                                <Camera className="w-6 h-6" />
                                            </label>
                                            <input
                                                id="avatar-upload"
                                                type="file"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                            />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-lg">Profile Picture</h3>
                                            <p className="text-sm text-muted-foreground">
                                                Click on the image to upload a new one. <br />
                                                JPG, GIF or PNG. Max size of 2MB.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Display Name</Label>
                                            <Input
                                                id="name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="Your Name"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email Address</Label>
                                            <Input
                                                id="email"
                                                value={email}
                                                disabled
                                                className="bg-muted"
                                            />
                                            <p className="text-xs text-muted-foreground">Email change is currently disabled.</p>
                                        </div>
                                    </div>

                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="address">Address</Label>
                                            <Textarea
                                                id="address"
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                                placeholder="Your Address"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Phone Number</Label>
                                            <Input
                                                id="phone"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                placeholder="Your Phone Number"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-end">
                                        <Button type="submit" disabled={profileLoading} className="min-w-[120px]">
                                            {profileLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                                            Save Changes
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="security">
                        <Card>
                            <CardHeader>
                                <CardTitle>Security Settings</CardTitle>
                                <CardDescription>Manage your password and account security.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handlePasswordUpdate} className="space-y-6 max-w-lg">
                                    <div className="space-y-2">
                                        <Label htmlFor="current-password">Current Password</Label>
                                        <Input id="current-password" type="password" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="new-password">New Password</Label>
                                        <Input id="new-password" type="password" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="confirm-password">Confirm Password</Label>
                                        <Input id="confirm-password" type="password" />
                                    </div>
                                    <div className="flex justify-end pt-4">
                                        <Button type="submit" variant="destructive" disabled={passwordLoading}>
                                            {passwordLoading ? "Updating..." : "Update Password"}
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
}
