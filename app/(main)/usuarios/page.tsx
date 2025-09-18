"use client"
import TableComponente from "@/components/table/table-component"
import { Label } from "@/components/ui/label"
import { useUser } from "@/contextApi/context-auth"
import { ColumnasUsuario, Usuario } from "@/zod/usuario-schema"
import { useEffect, useState } from "react"

export default function PageUsuarios() {

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

                const data = await response.json()


                if (response.ok) {
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
        <div className="mt-10 ml-14 w-full mr-3">

            <Label className="text-3xl"> Pagina principal usuarios </Label>

            <TableComponente
                columns={ColumnasUsuario}
                data={usuarios}
                filterBy="user_email"
            />


        </div>
    )
}