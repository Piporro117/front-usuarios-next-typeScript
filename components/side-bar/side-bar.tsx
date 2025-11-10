"use client"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { BookOpenCheck, Scissors, Unplug, ScanBarcode, Satellite, LandPlot, Users, UserPlus, Router, RadioTower, FileSearch, icons } from "lucide-react"
import MenuCollapsableSidebar from "./menu-collapsable"
import HeaderSideBarComponent from "./header-siderbar"
import FooterSiderBarComponent from "./footer-sidebar"
import { useUser } from "@/contextApi/context-auth"


const itemsFooter = [
    {
        title: 'Perfil',
        url: '#',
        icon: LandPlot
    }
]

const itemsLecturas = [
    {
        title: "Ver lecturas",
        url: "/lecturas",
        icon: FileSearch
    }
]

const itemsUsuarios = [
    {
        title: "Ver usuarios",
        url: "/usuarios",
        icon: Users,
    }
]

const itemsGateway = [
    {
        title: "Ver tus gateways",
        url: "/gateway",
        icon: Router,
    }
]
export function SideBar() {

    const { user } = useUser()

    return (
        <div className="relative">
            <Sidebar collapsible="icon">
                {/** Header del sidebar */}
                <HeaderSideBarComponent ruta="/imgs/4ti_logo.png" />


                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupContent>

                            <MenuCollapsableSidebar titulo="Gateways" items={itemsGateway} />

                            <MenuCollapsableSidebar titulo="Lecturas" items={itemsLecturas} />

                            {user?.user_rol === "admin" && (
                                <MenuCollapsableSidebar titulo="Usuarios" items={itemsUsuarios} />
                            )}

                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>

                {/** footer de sidebar */}
                <FooterSiderBarComponent titulo="Usuario" />
            </Sidebar>

            <SidebarTrigger className="absolute top-4 right-[-40px] " />
        </div>
    )
}