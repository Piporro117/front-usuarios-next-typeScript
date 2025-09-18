"use client"

import { useUser } from "@/contextApi/context-auth"
import { Usuario } from "@/zod/usuario-schema"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function PageInfoUsuario() {

    const { id } = useParams()
    const { clearUser } = useUser()

    const [usuario, setUsaurio] = useState<Usuario | undefined>(undefined)

    const idNumber = id ? Number(id) : undefined

    useEffect(() => {

        // funcion parar hacer fetch y traer la info del usuairo
        async function fetchUsuario() {
            try {
                const response = await fetch(`http://localhost:5000/api/auth/obtenerUsuario/${idNumber}`, {
                    method: 'GET',
                    credentials: 'include'
                })

                if (response.ok) {
                    const data = await response.json()
                    setUsaurio(data)
                    console.log(data)
                } else {
                    if (response.status === 401) {
                        clearUser()
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }

        fetchUsuario()
    }, [])

    return (
        <div>

            <p>Usuario info</p>

            <p> Id {usuario?.id}</p>

            <p> Nombre {usuario?.user_name}</p>

            <p> Email {usuario?.user_email}</p>

            <p> Fecha creacion {usuario?.created_date}</p>

        </div>
    )
}