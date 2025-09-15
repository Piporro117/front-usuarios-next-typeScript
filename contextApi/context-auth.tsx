"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Usuario } from "@/zod/usuario-schema";

type UserContextType = {
    user: Usuario | null;
    setUser: (user: Usuario | null) => void;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<Usuario | null>(null);
    const router = useRouter();

    // Función para verificar si hay sesión activa
    async function checkAuth() {
        try {
            const res = await fetch("http://localhost:5000/api/auth/me", {
                method: "GET",
                credentials: "include",
            });
            if (res.ok) {
                const data = await res.json();
                setUser(data);
            } else {
                setUser(null);
            }
        } catch (err) {
            setUser(null);
        }
    }

    // Función para cerrar sesión
    async function logout() {
        try {
            const res = await fetch("http://localhost:5000/api/auth/logout", {
                method: "POST",
                credentials: "include",
            });
            if (res.ok) {
                setUser(null);
                router.push("/login");
            }
        } catch (err) {
            console.error("Error al cerrar sesión", err);
        }
    }

    // Verificar sesión al montar el contexto
    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, logout, checkAuth }}>
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
