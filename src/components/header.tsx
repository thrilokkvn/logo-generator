"use client";

import { Menu, Zap } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./theme-toggle";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import axios from "axios";
import { toast } from "sonner";
import { User } from "@supabase/supabase-js";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null)
    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            setIsMenuOpen(false);
        }
    };
    const router = useRouter();
    const pathname = usePathname();

    const getSession = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/auth/session");
            setUser(response.data.user);
            console.log(response)
        }catch (e: any) {
            toast.error(e.message);
        }
    }

    useEffect(() => {
        getSession();
    }, []);

    const handleLogout = async() => {
        try {
            const response = await axios.post("http://localhost:3000/api/auth/logout");
            toast.success("Logout Successful")
        } catch (e) {
            toast.error("Logout failed");
        }

        getSession();
    }

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div onClick={() => router.push("/")} className="flex items-center space-x-2 cursor-pointer">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                            <Zap className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Logolumeo
                        </span>
                    </div>

                    {pathname === "/" && <nav className="hidden md:flex items-center space-x-8">
                        <Button variant={"ghost"}
                            onClick={() => scrollToSection("features")}
                            className="text-foreground hover:text-primary font-medium transition-colors">
                            Features
                        </Button>
                        <Button variant={"ghost"}
                            onClick={() => scrollToSection("how-it-works")}
                            className="text-foreground hover:text-primary font-medium transition-colors">
                            How It Works
                        </Button>
                        <Button variant={"ghost"}
                            onClick={() => scrollToSection("examples")}
                            className="text-foreground hover:text-primary font-medium transition-colors">
                            Examples
                        </Button>
                    </nav>}

                    <div className="hidden md:flex items-center space-x-4">
                        <ThemeToggle />
                        {user === null && <div className="flex space-x-4">
                            <Button onClick={() => router.push("/auth")}
                                variant="ghost"
                                className="text-foreground hover:text-primary">
                                Sign In
                            </Button>
                            <Button onClick={() => router.push("/generate")} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full px-6">
                                Get Started
                            </Button>
                        </div>} 
                        {user && 
                        <DropdownMenu>
                            <DropdownMenuTrigger className="cursor-pointer">
                                <Avatar className="outline-none focus-visible:ring-none">
                                    <AvatarImage className="outline-none focus-visible:ring-none" src="https://github.com/shadcn.png" />
                                    <AvatarFallback>{user.user_metadata.first_name[0].toUpperCase()}</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer">Dashboard</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-400">Logout</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>}
                    </div>

                    <div className="md:hidden flex items-center space-x-2">
                        <ThemeToggle />
                        <button className="p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            <Menu className="w-6 h-6 text-foreground" />
                        </button>
                    </div>
                </div>

                {isMenuOpen && (
                    <div className="md:hidden absolute top-16 left-0 right-0 bg-background border-b border-border shadow-lg">
                        <nav className="flex flex-col space-y-4 p-4">
                            <button
                                onClick={() => scrollToSection("features")}
                                className="text-foreground hover:text-primary font-medium text-left">
                                Features
                            </button>
                            <button
                                onClick={() => scrollToSection("how-it-works")}
                                className="text-foreground hover:text-primary font-medium text-left">
                                How It Works
                            </button>
                            <button
                                onClick={() => scrollToSection("examples")}
                                className="text-foreground hover:text-primary font-medium text-left">
                                Examples
                            </button>
                            <div className="flex flex-col space-y-2 pt-4 border-t border-border">
                                <Button
                                    variant="ghost"
                                    className="text-foreground hover:text-primary justify-start">
                                    Sign In
                                </Button>
                                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                                    Get Started
                                </Button>
                            </div>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};
