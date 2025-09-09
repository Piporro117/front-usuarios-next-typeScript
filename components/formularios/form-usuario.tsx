"use client"

import { Usuario, UsuarioSchema } from "@/zod/usuario-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

export default function FormularioUsuario() {

    // creacion del formulario
    const form = useForm<Usuario>({
        resolver: zodResolver(UsuarioSchema),
        defaultValues: {
            user_name: '',
            user_password: '',
            user_email: '',
        }
    })

    // funcion del submit
    function onSubmit(data: Usuario) {
        console.log("Datos del formulario: ", data)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="user_name"
                    render={({ field }) => (
                        <FormItem>
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
                        <FormItem>
                            <FormLabel>Email del usaurio</FormLabel>
                            <FormControl>
                                <Input placeholder="Ingrese correo" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="user_password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Contraseña</FormLabel>
                            <FormControl>
                                <Input placeholder="Ingrese usuario" {...field} type="password" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />


                <Button type="submit"> Crear usuario</Button>
            </form>
        </Form>
    )
}