"use client"
import { Usuario } from "@/zod/usuario-schema"
import { useEffect, useState } from "react"

export default function PageUsuarios() {

    const [usuarios, setUsuarios] = useState<Usuario[]>([])

    useEffect(() => {

        // funcion para trear los usaurios
        async function fetchUsuarios() {
            try {
                const response = await fetch("http://localhost:5000/api/auth/consultarUsuarios", {
                    method: 'GET',
                    credentials: 'include'
                })

                const data = await response.json()

                if (response.ok) {
                    setUsuarios(data)
                    console.log(data)
                } else {
                    console.log("Error en el fetch del usuarios")
                }

            } catch (error) {
                console.log(error)
            }
        }

        fetchUsuarios()
    }, [])

    return (
        <div className="mt-10 ml-14">

            Pagina principal Usuarios




        </div>
    )
}