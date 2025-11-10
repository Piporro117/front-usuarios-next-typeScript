"use client"
import FormularioUsuario from "@/components/formularios/form-usuario";
import { useUser } from "@/contextApi/context-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PageNewUsuairo() {

    const router = useRouter()

    const { user } = useUser()

    useEffect(() => {
        if (user?.user_rol !== "admin") {
            router.push("/gateway")
            return
        }
    }, [])

    return (
        <div className="">
            <FormularioUsuario />
        </div>
    )
}