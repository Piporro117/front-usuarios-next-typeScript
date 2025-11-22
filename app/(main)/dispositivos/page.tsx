"use client"

import DialogDispositivo from "@/components/dialogs/dialogDispositivo"
import TableComponente from "@/components/table/table-component"
import { Label } from "@/components/ui/label"
import { useUser } from "@/contextApi/context-auth"
import { Dispositivo } from "@/zod/device-schema"
import { ColumnasDispositivo } from "@/zod/tables-cols/device-cols"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function PageDispositivo() {
    const router = useRouter()
    const { clearUser, user } = useUser()
    const [dispositivos, setDispositivos] = useState<Dispositivo[]>([])
    const [open, setOpen] = useState(false)
    const [dispositivoSeleccionado, setDispositivoSeleccionado] = useState<Dispositivo | undefined>(undefined)


    useEffect(() => {

        if (user?.user_rol !== "admin") {
            router.push("/gateway")
            return
        }

        async function fetchDispositivos() {
            try {

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/device/consultarDispositivos`, {
                    method: 'GET',
                    credentials: 'include'
                })

                if (response.status === 401) {
                    clearUser()
                    return
                }

                if (response.ok) {
                    const data: Dispositivo[] = await response.json()
                    setDispositivos(data)
                }

            } catch (error) {
                console.log(error)
            }
        }

        fetchDispositivos()
    }, [])

    return (
        <div>

            <Label className="text-3xl"> SISTEMA DE MONITOREO DE DISPOSITIVOS  </Label>

            <TableComponente
                columns={ColumnasDispositivo}
                data={dispositivos}
                filterBy="dev_nombre"
                mensajeFiltro="Filtrar por nombre"
                routeBase="dispositivos"
                onRowClick={(disp) => {
                    setDispositivoSeleccionado(disp)
                    setOpen(true)
                }}
                ocultarBotonNuevo
            />

            {dispositivoSeleccionado && (
                <DialogDispositivo open={open} setOpen={setOpen} dispositivo={dispositivoSeleccionado} />
            )}

        </div>
    )
}