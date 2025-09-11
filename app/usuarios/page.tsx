import FormularioUsuario from "@/components/formularios/form-usuario";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function PageUsuarios() {
    return (
        <div>

            <SidebarTrigger />

            Pagina princiapal usuarios


            <div className="">
                <FormularioUsuario />
            </div>


        </div>
    )
}