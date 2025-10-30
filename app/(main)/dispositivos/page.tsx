"use client"

import TableComponente from "@/components/table/table-component"
import { Label } from "@/components/ui/label"
import { useUser } from "@/contextApi/context-auth"
import { ColumnasDispositivo, Dispositivo } from "@/zod/device-schema"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function PageDispositivo() {

    const router = useRouter()

    const { clearUser } = useUser()
    const [dispositivos, setDispositivos] = useState<Dispositivo[]>([])

    useEffect(() => {
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
                    const data = await response.json()
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
            />

        </div>
    )
}