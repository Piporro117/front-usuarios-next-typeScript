import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/contextApi/context-auth";

export function useRequireAdmin() {
    const { user, isLoadingUser } = useUser()
    const router = useRouter()

    useEffect(() => {
        if (!isLoadingUser) {
            if (user?.user_rol !== "admin") {
                router.replace("/gateway")
            }
        }
    }, [isLoadingUser, user])

    return { isLoadingUser, isAllowed: user?.user_rol === "admin" }
}
