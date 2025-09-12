import { ChevronDown, ChevronUp, LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes, useState } from "react";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubItem } from "../ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";

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
                            {titulo}
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
    )
}