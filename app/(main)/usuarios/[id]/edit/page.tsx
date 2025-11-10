"use client"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useUser } from "@/contextApi/context-auth"
import { Usuario, UsuarioEdit, UsuarioEditSchema } from "@/zod/usuario-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { redirect, useParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"


export default function PageEditUsuario() {

    const { id } = useParams()
    const { clearUser, user } = useUser()
    const router = useRouter()

    const idNumber = id ? Number(id) : undefined

    // state de almacenamiento
    const [usuario, setUsaurio] = useState<Usuario | undefined>(undefined)

    // state de carga
    const [loading, setLoading] = useState(true)

    // useEffect para obtener la info del usaurio
    useEffect(() => {

        if (user?.user_rol !== "admin") {
            router.push("/gateway")
            return
        }

        async function fetchUsuario() {
            try {
                const response = await fetch(`http://localhost:5000/api/auth/obtenerUsuario/${idNumber}`, {
                    method: 'GET',
                    credentials: 'include'
                })

                if (response.ok) {
                    const data = await response.json()
                    setUsaurio(data)
                    setLoading(false)
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


    // creacion del formulario
    const form = useForm<UsuarioEdit>({
        resolver: zodResolver(UsuarioEditSchema),
        defaultValues: {
            user_nombre: usuario?.user_nombre ?? '',
            user_email: usuario?.user_email ?? ''
        }
    })

    // para poner la data del usaurio
    useEffect(() => {
        if (usuario) {
            form.reset({
                user_nombre: usuario.user_nombre,
                user_email: usuario.user_email
            })
        }
    }, [usuario, form])


    // funcion submit
    async function onSubmit(data: Usuario) {
        try {

            const user_id = usuario?.user_id
            const response = await fetch(`http://localhost:5000/api/auth/editarUsuario/${user_id}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
                credentials: 'include'
            })

            if (response.ok) {
                toast.success("Usuario actualizado correctamente")
                router.back()
            } else {
                if (response.status === 401) {
                    clearUser()
                    redirect('app/login')
                }
            }

        } catch (error) {
            toast.error("Error al ectualizar el usuario")
            return
        }
    }

    return (
        <>

            {loading ? (
                <div> Cargando ...</div>
            ) : (
                <div className="space-y-5">
                    <Label className="text-3xl"> Edicion de usuario</Label>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">

                            <FormField
                                control={form.control}
                                name="user_nombre"
                                render={({ field }) => (
                                    <FormItem className="col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2">
                                        <FormLabel>Nombre del usuario</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Ingrese usuario" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="user_email"
                                render={({ field }) => (
                                    <FormItem className="col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2">
                                        <FormLabel>Email del usaurio</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Ingrese correo" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex flex-col-reverse col-start-1">
                                <Button type="submit" > Editar usuario</Button>
                            </div>

                        </form>
                    </Form>

                </div>
            )}

        </>
    )
}