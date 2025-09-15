import { ChevronDown, ChevronUp, LucideProps, PanelTopOpen } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes, useState } from "react";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubItem } from "../ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { cn } from "@/lib/utils";
import Link from "next/link";

type MenuCollapsableSidebarProps = {
    titulo: string
    items: {
        title: string;
        url: string;
        icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
    }[]
}

export default function MenuCollapsableSidebar({ titulo, items }: MenuCollapsableSidebarProps) {

    const [open, setOpen] = useState(true)


    return (
        <SidebarMenu>
            <Collapsible defaultOpen className="group/collapsible" open={open} onOpenChange={setOpen}>
                <SidebarMenuItem>

                    <CollapsibleTrigger asChild>
                        <SidebarMenuButton className="flex justify-between">

                            <div className="flex justify-center items-center gap-2">
                                <PanelTopOpen />
                                {titulo}
                            </div>
                            <ChevronDown className={cn(
                                "transition-transform duration-300",
                                open ? "rotate-180" : "rotate-0"
                            )} />
                        </SidebarMenuButton>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                        <SidebarMenuSub>
                            {items.map((item) => (
                                <SidebarMenuSubItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuSubItem>
                            ))}
                        </SidebarMenuSub>
                    </CollapsibleContent>

                </SidebarMenuItem>

            </Collapsible>
        </SidebarMenu>
    )
}