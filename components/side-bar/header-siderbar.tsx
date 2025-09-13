import { SidebarHeader } from "../ui/sidebar";
import Image from "next/image"

type HeaderSidebarComponentProps = {
    ruta: string
}

export default function HeaderSideBarComponent({ ruta }: HeaderSidebarComponentProps) {
    return (
        <SidebarHeader className="flex items-center justify-center">
            <Image src={ruta} width={150} height={150} alt="logo" className="mt-2" />
        </SidebarHeader>
    )
}