import { cn } from "@/lib/utils"
import { CircleUserRound, ChevronUp, LucideProps } from "lucide-react"
import { SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { ForwardRefExoticComponent, RefAttributes, useState } from "react"
import Link from "next/link"

type FooterSideBarProps = {
    titulo: string
    items: {
        title: string;
        url: string;
        icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
    }[]
}


export default function FooterSiderBarComponent({ titulo, items }: FooterSideBarProps) {

    const [open, setOpen] = useState(false)

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
                            {items.map(item => {
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

                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
    )
}