import { Usuario } from "@/zod/usuario-schema"
import { Dispatch, SetStateAction } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { convertirFecha } from "@/lib/utils"
import { Button } from "../ui/button"
import { BookOpenText, Pencil } from "lucide-react"
import { useRouter } from "next/navigation"

type DialogUserProp = {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
    usuario: Usuario
}

export default function DialogUser({ usuario, open, setOpen }: DialogUserProp) {

    const router = useRouter()

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-2xl">Informacion de {usuario.user_clave}</DialogTitle>
                    </DialogHeader>

                    <div className="w-full grid grid-cols-2 gap-2.5">

                        <div className="flex-col">
                            <section className="font-bold"> Nombre usuario </section>
                            <section> {usuario.user_name}</section>
                        </div>

                        <div className="flex-col">
                            <section className="font-bold"> Correo </section>
                            <section> {usuario.user_email}</section>
                        </div>

                        <div className="flex-col">
                            <section className="font-bold"> Rol </section>
                            <section> {usuario.user_rol}</section>
                        </div>

                        <div className="flex-col">
                            <section className="font-bold"> Telefono </section>
                            <section> {usuario.user_telef}</section>
                        </div>

                        <div className="flex-col">
                            <section className="font-bold"> Registrado:  </section>
                            <section> {convertirFecha(usuario.created_date)}</section>
                        </div>

                        <div className="col-span-2 flex justify-between items-center mt-3">
                            <Button variant={'blue'} onClick={() => router.push(`/usuarios/${usuario.user_id}`)}> <BookOpenText /> Info detallada </Button>

                            <Button variant={'blue'} onClick={() => router.push(`/usuarios/${usuario.user_id}/edit`)} > <Pencil /> Editar </Button>
                        </div>

                    </div>

                </DialogContent>
            </Dialog>
        </div>
    )
}