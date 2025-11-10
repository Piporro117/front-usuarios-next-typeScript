"use client"

import DialogGateway from "@/components/dialogs/dialogGateway"
import TriangleLoader from "@/components/loader"
import TableComponente from "@/components/table/table-component"
import { Label } from "@/components/ui/label"
import { useUser } from "@/contextApi/context-auth"
import { ColumnasGateway, Gateway } from "@/zod/gateway-schema"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export default function PageGateway() {

    const { clearUser, user } = useUser()
    const [gateways, setGateways] = useState<Gateway[]>([])
    const [loading, setLoading] = useState(true)

    const [open, setOpen] = useState(false)
    const [gatewaySeleccionado, setGatewaySeleccionado] = useState<Gateway | undefined>(undefined)

    useEffect(() => {

        async function fetchGateways() {
            try {

                const rol = user?.user_rol
                const user_id = user?.user_id

                const response = await fetch(rol === "admin" ? `${process.env.NEXT_PUBLIC_API_URL}/api/gateway/consultarTodos` : `${process.env.NEXT_PUBLIC_API_URL}/api/gateway/consultarTodoPorUsu/${user_id}`, {
                    method: 'GET',
                    credentials: 'include'
                })

                if (response.status === 401) {
                    clearUser()
                    return
                }

                if (response.ok) {
                    const data: Gateway[] = await response.json()
                    setGateways(data)
                    setLoading(false)
                } else {
                    toast.error("Error el obtener los gateways")
                    setLoading(false)
                }

            } catch (error) {
                console.log(error)
                setLoading(false)
            }
        }

        fetchGateways()
    }, [])

    return (
        <div>

            {loading ? (<TriangleLoader />) : (
                <div>
                    <Label className="text-3xl"> GATEWAYS DEL USUARIO {user?.user_nombre?.toUpperCase()}</Label>

                    <TableComponente
                        columns={ColumnasGateway}
                        data={gateways}
                        filterBy="gate_nombre"
                        mensajeFiltro="nombre"
                        routeBase="gateway"
                        ocultarBotonNuevo
                        onRowClick={(gate) => {
                            setGatewaySeleccionado(gate)
                            setOpen(true)
                        }}
                    />

                    {gatewaySeleccionado && (
                        <DialogGateway open={open} setOpen={setOpen} gateway={gatewaySeleccionado} />
                    )}

                </div>
            )}


        </div>
    )

}