"use client"

import DialogDispositivo from "@/components/dialogs/dialogDispositivo"
import TriangleLoader from "@/components/loader"
import TableComponente from "@/components/table/table-component"
import { Label } from "@/components/ui/label"
import { useUser } from "@/contextApi/context-auth"
import { ColumnasDispositivo, Dispositivo } from "@/zod/device-schema"
import { Gateway } from "@/zod/gateway-schema"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export default function PageDispositiviosPorGateway() {

    const { gate_id } = useParams()

    const gatewayId = gate_id ? Number(gate_id) : undefined

    const { clearUser } = useUser()
    const [dispositivos, setDispositivos] = useState<Dispositivo[]>([])
    const [open, setOpen] = useState(false)
    const [dispositivoSeleccionado, setDispositivoSeleccionado] = useState<Dispositivo | undefined>(undefined)
    const [gateway, setGateway] = useState<Gateway | undefined>(undefined)

    // states de carga
    const [loadingDispositivios, setLoadingDispositivios] = useState(true)
    const [loadingGateway, setLoadingGateway] = useState(true)


    useEffect(() => {
        async function fetchDispositivos() {
            try {

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/device/consultarPorGateway/${gatewayId}`, {
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
                    setLoadingDispositivios(false)
                } else {
                    toast.error("Error al obteber los dispositivios")
                    setLoadingDispositivios(false)
                }

            } catch (error) {
                console.log(error)
                setLoadingDispositivios(false)
            }
        }

        async function fetchGateway() {
            try {

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/gateway/obtenerGateway/${gatewayId}`, {
                    method: 'GET',
                    credentials: 'include'
                })

                if (response.status === 401) {
                    clearUser()
                    return
                }

                if (response.ok) {
                    const data: Gateway = await response.json()
                    setGateway(data)
                    setLoadingGateway(false)
                } else {
                    toast.error("Error al obtener info del gatewat")
                    setLoadingGateway(false)
                }

            } catch (error) {
                setLoadingGateway(false)
                console.log("error")
            }
        }

        fetchGateway()
        fetchDispositivos()
    }, [])

    return (
        <div>

            {loadingDispositivios ? (<TriangleLoader />) : (
                <div>
                    <Label className="text-3xl"> DISPOSITIVIOS DEL GATEWAY {gateway?.gate_nombre?.toUpperCase()}</Label>

                    <TableComponente
                        columns={ColumnasDispositivo}
                        data={dispositivos}
                        filterBy="dev_nombre"
                        mensajeFiltro="nombre"
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
            )}

        </div>
    )
}
