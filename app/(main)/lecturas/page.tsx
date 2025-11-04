"use client"

import TableComponente from "@/components/table/table-component"
import { Label } from "@/components/ui/label"
import { useUser } from "@/contextApi/context-auth"
import { ColumnasLectura, Lectura } from "@/zod/sensorReading-schema"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export default function PageLecturas() {

    const { clearUser } = useUser()
    const [lecturas, setLecturas] = useState<Lectura[]>([])

    useEffect(() => {

        async function fetchLectura() {
            try {

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/response/consultarTodasLecturas`, {
                    method: 'GET',
                    credentials: 'include'
                })

                if (response.status === 401) {
                    clearUser()
                    return
                }

                if (response.ok) {
                    const data: Lectura[] = await response.json()
                    setLecturas(data)
                } else {
                    toast.error("Error al obtener las lecturas")
                }

            } catch (error) {
                toast.error("Error en el fetch")
            }
        }

        fetchLectura()
    }, [])

    return (
        <div>

            <Label className="text-3xl"> SISTEMA DE MONITOREO DE LECTURAS </Label>

            <TableComponente
                columns={ColumnasLectura}
                data={lecturas}
                filterBy="dev_nombre"
                mensajeFiltro="Filtra nombre de dispositivo"
                routeBase="lectura"
            />

        </div>
    )
}