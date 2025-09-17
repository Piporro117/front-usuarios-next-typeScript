"use client";

import { SideBar } from "@/components/side-bar/side-bar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useUser } from "@/contextApi/context-auth";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const { isUserLoggedIn } = useUser();
    const router = useRouter();

    // mientras no hay usuario, mandamos al login
    useEffect(() => {
        if (!isUserLoggedIn()) {
            router.push("/login");
        }
    }, [isUserLoggedIn]);

    return (
        <div lang="en">
            <div>
                <SidebarProvider>
                    <SideBar />
                    {children}
                </SidebarProvider>
            </div>
        </div>
    );
}
