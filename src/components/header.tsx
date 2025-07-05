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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Credits } from "./Credits";

export const Header = () => {
    const [user, setUser] = useState<User | null>(null);
    const [credits, setCredits] = useState(0);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };
    const router = useRouter();
    const pathname = usePathname();

    const getSession = async () => {
        try {
            const response = await axios.get(
                "/api/auth/session"
            );

            setUser(response.data.user);
            console.log(response);
        } catch (e: any) {
            toast.error(e.message);
        }
    };

    const getCredits = async() => {
        try {
            const response = await axios.get("/api/user/credits");

            if (!response.data.credits) {
                return;
            }

            sessionStorage.setItem("credits", response.data.credits[0].points);
            setCredits(response.data.credits[0].points);
        } catch (e: any) {
            toast.error(e.message);
        }
    }

    useEffect(() => {
        const storedCredits = sessionStorage.getItem("credits");
        if (storedCredits) setCredits(Number(storedCredits));
        getSession();
    }, []);

    useEffect(() => {
        getCredits();
    }, [pathname])

    const handleLogout = async () => {
        try {
            await axios.post("http://localhost:3000/api/auth/logout");
            toast.success("Logout Successful");
            router.replace("/");
        } catch (e) {
            toast.error("Logout failed");
        }

        getSession();
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div
                        onClick={() => router.push("/")}
                        className="flex items-center space-x-2 cursor-pointer"
                    >
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                            <Zap className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Logolumeo
                        </span>
                    </div>

                    {pathname === "/" && (
                        <nav className="hidden md:flex items-center space-x-8">
                            <Button
                                variant={"ghost"}
                                onClick={() => scrollToSection("features")}
                                className="text-foreground hover:text-primary font-medium transition-colors"
                            >
                                Features
                            </Button>
                            <Button
                                variant={"ghost"}
                                onClick={() => scrollToSection("how-it-works")}
                                className="text-foreground hover:text-primary font-medium transition-colors"
                            >
                                How It Works
                            </Button>
                            <Button
                                variant={"ghost"}
                                onClick={() => router.push("/logos")}
                                className="text-foreground hover:text-primary font-medium transition-colors"
                            >
                                My Logos
                            </Button>
                        </nav>
                    )}

                    <div className="hidden md:flex items-center space-x-4">
                        {user && <Credits credits={credits}/>}
                        <ThemeToggle />
                        {user === null && (
                            <div className="flex space-x-4">
                                <Button
                                    onClick={() => router.push("/auth")}
                                    variant="ghost"
                                    className="text-foreground hover:text-primary"
                                >
                                    Sign In
                                </Button>
                                <Button
                                    onClick={() => router.push("/generate")}
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full px-6"
                                >
                                    Get Started
                                </Button>
                            </div>
                        )}
                        {user && (
                            <DropdownMenu>
                                <DropdownMenuTrigger className="cursor-pointer">
                                    <Avatar className="outline-none focus-visible:ring-none">
                                        <AvatarImage
                                            className="outline-none focus-visible:ring-none"
                                            src="https://github.com/shadcn.png"
                                        />
                                        <AvatarFallback>
                                            {user.user_metadata.first_name[0].toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>
                                        My Account
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => router.push("/profile")} className="cursor-pointer">
                                        Profile
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => router.push("/logos")}
                                        className="cursor-pointer"
                                    >
                                        Dashboard
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        onClick={handleLogout}
                                        className="cursor-pointer text-red-400"
                                    >
                                        Logout
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </div>

                    <div className="md:hidden flex items-center space-x-2">
                        <ThemeToggle />
                        <DropdownMenu>
                            <DropdownMenuTrigger className="cursor-pointer">
                                {user && (
                                    <Avatar className="outline-none focus-visible:ring-none">
                                        <AvatarImage
                                            className="outline-none focus-visible:ring-none"
                                            src="https://github.com/shadcn.png"
                                        />
                                        <AvatarFallback>
                                            {user.user_metadata.first_name[0].toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                )}
                                {!user && (
                                    <Menu className="w-6 h-6 text-foreground" />
                                )}
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                {user && (
                                    <DropdownMenuLabel>
                                        My Account
                                    </DropdownMenuLabel>
                                )}
                                <DropdownMenuSeparator />
                                {user && (
                                    <DropdownMenuItem onClick={() => router.push("/profile")} className="cursor-pointer">
                                        Profile
                                    </DropdownMenuItem>
                                )}
                                {user && (
                                    <DropdownMenuItem
                                        onClick={() => router.push("/logos")}
                                        className="cursor-pointer"
                                    >
                                        Dashboard
                                    </DropdownMenuItem>
                                )}
                                {!user && (
                                    <DropdownMenuItem
                                        onClick={() =>
                                            scrollToSection("features")
                                        }
                                    >
                                        Features
                                    </DropdownMenuItem>
                                )}
                                {!user && (
                                    <DropdownMenuItem
                                        onClick={() =>
                                            scrollToSection("how-it-works")
                                        }
                                    >
                                        How It Works
                                    </DropdownMenuItem>
                                )}

                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={() => {
                                        if (user) handleLogout();
                                        else router.push("/auth");
                                    }}
                                    className={`cursor-pointer ${user && "text-red-400"}`}>
                                    {user ? "Logout" : "Sign In"}
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </header>
    );
};
