"use client"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { BookOpenCheck, Scissors, Unplug, ScanBarcode, ChevronDown, ChevronUp } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"
import { useState } from "react"

const items = [
    {
        title: "Toma de lectura",
        url: "#",
        icon: BookOpenCheck,
    },
    {
        title: "Corte de servicio",
        url: "#",
        icon: Scissors,
    },
    {
        title: "Reconexión de servicio",
        url: "#",
        icon: Unplug,
    },
    {
        title: "Enviar hexadecimal",
        url: "#",
        icon: ScanBarcode,
    },
]

export function SideBar() {

    const [open, setOpen] = useState(false)

    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel> CFE </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <Collapsible defaultOpen className="group/collapsible" open={open} onOpenChange={setOpen}>
                                <SidebarMenuItem>

                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton className="flex justify-between">
                                            Medidores

                                            {open ? <ChevronDown /> : <ChevronUp />}
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>

                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            {items.map((item) => (
                                                <SidebarMenuSubItem key={item.title}>
                                                    <SidebarMenuButton asChild>
                                                        <a href={item.url}>
                                                            <item.icon />
                                                            <span>{item.title}</span>
                                                        </a>
                                                    </SidebarMenuButton>
                                                </SidebarMenuSubItem>
                                            ))}
                                        </SidebarMenuSub>
                                    </CollapsibleContent>

                                </SidebarMenuItem>

                            </Collapsible>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}