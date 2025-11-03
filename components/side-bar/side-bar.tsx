"use client"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { BookOpenCheck, Scissors, Unplug, ScanBarcode, Satellite, LandPlot, Users, UserPlus, Router, RadioTower, FileSearch } from "lucide-react"
import MenuCollapsableSidebar from "./menu-collapsable"
import HeaderSideBarComponent from "./header-siderbar"
import FooterSiderBarComponent from "./footer-sidebar"

const itemsMedidores = [
    {
        title: "Ver dispositivos",
        url: "/dispositivos",
        icon: Router,
    },
]

const itemsLecturas = [
    {
        title: "Ver lecturas",
        url: "/lecturas",
        icon: FileSearch
    }
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
    }
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

                            <MenuCollapsableSidebar titulo="Lecturas" items={itemsLecturas} />

                            <MenuCollapsableSidebar titulo="Dispositivos" items={itemsMedidores} />

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