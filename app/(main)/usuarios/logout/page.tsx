"use client"
import { Button } from "@/components/ui/button";
import { useUser } from "@/contextApi/context-auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function PageLogout() {

    const router = useRouter()

    const { logout } = useUser()

    async function onClick() {
        const response = await fetch('http://localhost:5000/api/auth/logout', {
            method: 'POST',
            credentials: 'include'
        })

        if (response.ok) {
            logout()
            router.push('/login')
        } else {
            toast.error("Error al salir de la sesion")
        }
    }

    return (
        <div className="flex justify-center items-center w-full">

            <Button onClick={onClick}>
                Logout
            </Button>

        </div>
    )
}