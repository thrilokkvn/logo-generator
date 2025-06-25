import { useTheme } from "next-themes"
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";

export const ThemeToggle = () => {
    const {theme, setTheme} = useTheme();

    return (
        <Button variant={"ghost"} size={"icon"} className="relative" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
            <Sun className="h-7 w-7 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"/>
            <Moon className="h-7 w-7 absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"/>
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}