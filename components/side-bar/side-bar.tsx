"use client"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { BookOpenCheck, Scissors, Unplug, ScanBarcode, Satellite, LandPlot, Users, UserPlus } from "lucide-react"
import MenuCollapsableSidebar from "./menu-collapsable"
import HeaderSideBarComponent from "./header-siderbar"
import FooterSiderBarComponent from "./footer-sidebar"

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

const itemsFooter = [
    {
        title: 'Perfil',
        url: '#',
        icon: LandPlot
    }
]


const itemsUsuarios = [
    {
        title: "Ver usuarios",
        url: "/usuarios",
        icon: Users,
    },
    {
        title: "Nuevo usuario",
        url: "/usuarios/new",
        icon: UserPlus,
    },
]
export function SideBar() {

    return (
        <div className="relative">
            <Sidebar collapsible="icon">
                {/** Header del sidebar */}
                <HeaderSideBarComponent ruta="/imgs/4ti_logo.png" />


                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupContent>

                            <MenuCollapsableSidebar titulo="Usuarios" items={itemsUsuarios} />

                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>

                {/** footer de sidebar */}
                <FooterSiderBarComponent titulo="Usuario" items={itemsFooter} />
            </Sidebar>

            <SidebarTrigger className="absolute top-4 right-[-40px] " />
        </div>
    )
}