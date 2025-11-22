"use client";

import { createContext, useContext, useState, ReactNode, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Usuario } from "@/zod/usuario-schema";

type UserContextType = {
    user: Usuario | null;
    setUser: (user: Usuario | null) => void;
    clearUser: () => void;
    isUserLoggedIn: () => boolean;
    logo: string;
    isLoadingUser: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUserState] = useState<Usuario | null>(null);
    const router = useRouter();
    const [isLoadingUser, setIsLoadingUser] = useState(true)

    useEffect(() => {
        const stored = localStorage.getItem("user");
        if (stored) {
            try {
                setUserState(JSON.parse(stored));
            } catch {
                localStorage.removeItem("user");
            }
        }
        setIsLoadingUser(false);
    }, []);

    // --- Helpers ---
    function saveUser(user: Usuario | null) {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
        setUserState(user);
    }

    // Expuesto al context
    function setUser(user: Usuario | null) {
        saveUser(user);
    }

    function clearUser() {
        saveUser(null);
        router.push("/login");
    }

    const logo = useMemo(() => {
        switch (user?.user_clave) {
            case "admin":
                return "/imgs/4tiLogo.png";
            case "pcentenario01":
                return "/imgs/logoCentenario.jpg";
            default:
                return "/imgs/4tiLogo.png";
        }
    }, [user]);

    // verificar si hay usaurio en el localstore
    function isUserLoggedIn(): boolean {
        if (user) return true;
        const stored = localStorage.getItem("user");
        return !!stored;
    }

    return (
        <UserContext.Provider value={{ user, setUser, clearUser, isUserLoggedIn, logo, isLoadingUser }}>
            {children}
        </UserContext.Provider>
    );
}

// Hook para usar el contexto
export function useUser() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}
