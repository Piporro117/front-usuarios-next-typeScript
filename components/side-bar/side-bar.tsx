"use client"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { BookOpenCheck, Scissors, Unplug, ScanBarcode, Satellite, LandPlot, CircleUserRound, ChevronUp } from "lucide-react"
import MenuCollapsableSidebar from "./menu-collapsable"
import Image from "next/image"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "../ui/dropdown-menu"
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"

const itemsMedidores = [
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


const itemsVisualizacionDatos = [
    {
        title: "Ver respuestas",
        url: "#",
        icon: Satellite,
    },
    {
        title: 'Buscar medidor',
        url: '#',
        icon: LandPlot
    }
]
export function SideBar() {

    return (
        <Sidebar>
            {/** Header del sidebar */}
            <SidebarHeader className="flex items-center justify-center">
                <Image src={"/imgs/cfe_logo.png"} width={150} height={150} alt="logo" className="mt-2" />
            </SidebarHeader>


            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>

                        <MenuCollapsableSidebar titulo="Medidores" items={itemsMedidores} />

                        <MenuCollapsableSidebar titulo="Datos" items={itemsVisualizacionDatos} />

                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>


            {/** footer del sidebar */}
            <SidebarFooter>
                <SidebarMenu>

                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild className="h-15">
                                <SidebarMenuButton className="text-[18px]">
                                    <CircleUserRound size={24} />
                                    Usuario
                                    <ChevronUp className="ml-auto" size={500} />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>


                            <DropdownMenuContent
                                side="top"
                                className="w-52"
                            >
                                <DropdownMenuItem>
                                    <span>Perfil</span>
                                </DropdownMenuItem>

                                <DropdownMenuItem>
                                    <span>Configuracion</span>
                                </DropdownMenuItem>

                                <DropdownMenuItem>
                                    <span> Cerrar sesión</span>
                                </DropdownMenuItem>

                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}