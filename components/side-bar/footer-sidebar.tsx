import { cn } from "@/lib/utils"
import { CircleUserRound, ChevronUp, LucideProps, LogOut } from "lucide-react"
import { SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { ForwardRefExoticComponent, RefAttributes, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useUser } from "@/contextApi/context-auth"
import { toast } from "sonner"

type FooterSideBarProps = {
    titulo: string
    items?: {
        title: string;
        url: string;
        icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
    }[]
}


export default function FooterSiderBarComponent({ titulo, items }: FooterSideBarProps) {

    const [open, setOpen] = useState(false)

    const router = useRouter()

    const { clearUser } = useUser()

    async function onClick() {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
            method: 'POST',
            credentials: 'include'
        })

        if (response.ok) {
            toast.success("Cerrado de sesión exitoso")
            clearUser()
            router.push('/login')
        } else {
            toast.error("Error al salir de la sesión")
        }
    }

    return (
        <SidebarFooter>
            <SidebarMenu>

                <SidebarMenuItem>
                    <DropdownMenu open={open} onOpenChange={setOpen}>
                        <DropdownMenuTrigger asChild className="h-15">
                            <SidebarMenuButton className="text-[18px]">
                                <CircleUserRound size={24} />
                                {titulo}
                                <ChevronUp className={cn(
                                    "transition-transform duration-300 ml-auto",
                                    open ? "rotate-180" : "rotate-0"
                                )} size={500} />
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>


                        <DropdownMenuContent
                            side="top"
                            className="w-52"
                        >
                            {items && items.map(item => {
                                const Icon = item.icon
                                return (
                                    <DropdownMenuItem key={item.title}>
                                        <Link href={item.url} className="flex gap-1">
                                            <Icon className="w-4 h-4" />
                                            {item.title}
                                        </Link>
                                    </DropdownMenuItem>
                                )
                            })}

                            <DropdownMenuItem onClick={onClick}>
                                <LogOut />
                                Cerrar sesión
                            </DropdownMenuItem>

                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
    )
}