"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Usuario } from "@/zod/usuario-schema";

type UserContextType = {
    user: Usuario | null;
    setUser: (user: Usuario | null) => void;
    logout: () => void;
    clearUser: () => void;
    isUserLoggedIn: () => boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUserState] = useState<Usuario | null>(null);
    const router = useRouter();

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

    function logout() {
        saveUser(null);
        router.push("/login");
        // Opcional: puedes también pegarle al endpoint de logout de tu API aquí
    }

    // verificar si hay usaurio en el localstore
    function isUserLoggedIn(): boolean {
        if (user) return true; // ya está en memoria
        const stored = localStorage.getItem("user");
        return !!stored;
    }

    // Al montar el provider, recuperar usuario del localStorage
    useEffect(() => {
        const stored = localStorage.getItem("user");
        if (stored) {
            try {
                setUserState(JSON.parse(stored));
            } catch {
                localStorage.removeItem("user");
            }
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, logout, clearUser, isUserLoggedIn }}>
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
