"use client"
import { ChartAreaDefault } from "@/components/graficos/areaChart"
import TableComponente from "@/components/table/table-component"
import { Label } from "@/components/ui/label"
import { useUser } from "@/contextApi/context-auth"
import { ColumnasUsuario, Usuario } from "@/zod/usuario-schema"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function PageUsuarios() {

    const router = useRouter()

    const { user, clearUser } = useUser()
    const [usuarios, setUsuarios] = useState<Usuario[]>([])

    useEffect(() => {

        // funcion para trear los usaurios
        async function fetchUsuarios() {
            try {
                const response = await fetch("http://localhost:5000/api/auth/consultarUsuarios", {
                    method: 'GET',
                    credentials: 'include'
                })

                if (response.status === 401) {
                    clearUser()
                }


                if (response.ok) {
                    const data = await response.json()
                    setUsuarios(data)
                    console.log(data)
                }

            } catch (error) {
                console.log(error)
            }
        }
        console.log('user', user)
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
            />


            <ChartAreaDefault usuarios={usuarios} />


        </div>
    )
}