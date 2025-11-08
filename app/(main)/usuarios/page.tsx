"use client"
import DialogUser from "@/components/dialogs/dialogUser"
import TableComponente from "@/components/table/table-component"
import { Label } from "@/components/ui/label"
import { useUser } from "@/contextApi/context-auth"
import { ColumnasUsuario, Usuario } from "@/zod/usuario-schema"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function PageUsuarios() {

    const router = useRouter()

    const { clearUser } = useUser()
    const [usuarios, setUsuarios] = useState<Usuario[]>([])
    const [open, setOpen] = useState(false)
    const [usuarioSeleccionado, setusaurioSeleccionado] = useState<Usuario | undefined>(undefined)

    useEffect(() => {

        // funcion para trear los usaurios
        async function fetchUsuarios() {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/consultarUsuarios`, {
                    method: 'GET',
                    credentials: 'include'
                })

                if (response.status === 401) {
                    clearUser()
                    return
                }

                if (response.ok) {
                    const data = await response.json()
                    setUsuarios(data)
                }

            } catch (error) {
                console.log(error)
            }
        }
        fetchUsuarios()
    }, [])

    return (
        <div className="">

            <Label className="text-3xl"> SISTEMA DE MONITOREO MAESTRO </Label>

            <TableComponente
                columns={ColumnasUsuario}
                data={usuarios}
                filterBy="user_email"
                onRowDoubleClick={(usuario) => {
                    router.push(`/usuarios/${usuario.user_id}`)
                }}
                onRowClick={(usuario) => {
                    setusaurioSeleccionado(usuario)
                    setOpen(true)
                }}
                mensajeFiltro="email del usuario"
                routeBase="usuarios"
                ocultarBotonNuevo
            />

            {usuarioSeleccionado && (
                <DialogUser open={open} setOpen={setOpen} usuario={usuarioSeleccionado} />
            )}

        </div>
    )
}