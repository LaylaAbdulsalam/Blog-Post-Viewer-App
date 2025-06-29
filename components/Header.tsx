// components/Header.tsx
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
    return (
        <header className="py-4">
            <div className="container mx-auto max-w-6xl flex justify-between items-center px-4">
                <Link href="/posts" className="font-bold text-gray-800 dark:text-white">
                    Your Name
                </Link>
                <ThemeToggle />
            </div>
        </header>
    );
}