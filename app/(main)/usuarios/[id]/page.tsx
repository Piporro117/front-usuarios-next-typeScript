"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useUser } from "@/contextApi/context-auth"
import { convertirFecha } from "@/lib/utils"
import { Usuario } from "@/zod/usuario-schema"
import { PencilLine, Trash2 } from "lucide-react"
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
        <div className="w-full flex flex-col gap-3">

            <Label className="font-bold text-3xl my-9 bg-green-300 p-5 rounded-2xl"> Información general de usuario</Label>

            <div className="flex flex-col gap-1 border-4 rounded-2xl border-green-500">

                <div className="border-b border-green-400 py-2 px-6">
                    <Label className="font-bold text-2xl mb-4"> Nombre: </Label>
                    <Label> {usuario?.user_name?.toUpperCase()}</Label>
                </div>

                <div className="border-b border-green-400 py-2 px-6">
                    <Label className="font-bold text-2xl mb-4"> Folio: </Label>
                    <Label> {usuario?.id} </Label>
                </div>

                <div className="border-b border-green-400 py-2 px-6">
                    <Label className="font-bold text-2xl mb-4"> Email: </Label>
                    <Label> {usuario?.user_email?.toLocaleLowerCase()}</Label>
                </div>

                <div className="py-2 px-6">
                    <Label className="font-bold text-2xl mb-4"> Fecha de creacion: </Label>
                    <Label> {convertirFecha(usuario?.created_date)}</Label>
                </div>

            </div>

            <div className="mt-8 px-6 flex justify-around items-center">
                <Button size={'lg'} className="bg-blue-500 hover:bg-blue-600"> <PencilLine /> Editar </Button>

                <Button size={'lg'} className="bg-red-600 hover:bg-red-700"> <Trash2 /> Borrar </Button>
            </div>

        </div >
    )
}