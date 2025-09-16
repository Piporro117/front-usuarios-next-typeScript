"use client";

import { SideBar } from "@/components/side-bar/side-bar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { useUser } from "@/contextApi/context-auth";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const { user, checkAuth } = useUser();
    const router = useRouter();

    useEffect(() => {
        async function validate() {
            await checkAuth(); // revisa si hay sesión activa
        }
        validate();
    }, []);

    // mientras no hay usuario, mandamos al login
    useEffect(() => {
        if (user === null) {
            router.push("/login");
        }
    }, [user]);

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
