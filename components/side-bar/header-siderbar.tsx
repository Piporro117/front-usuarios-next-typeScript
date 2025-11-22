import { SidebarHeader } from "../ui/sidebar";
import Image from "next/image"

type HeaderSidebarComponentProps = {
    ruta: string
}

export default function HeaderSideBarComponent({ ruta }: HeaderSidebarComponentProps) {
    return (
        <SidebarHeader className="flex items-center justify-center">
            <Image src={ruta} width={100} height={100} alt="logo" className="mt-2" />
        </SidebarHeader>
    )
}