"use client"

import { Usuario, UsuarioSchema } from "@/zod/usuario-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Label } from "../ui/label"

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
        <div className="space-y-5">
            <Label className="text-3xl"> Creación de usuario</Label>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
                    <FormField
                        control={form.control}
                        name="user_name"
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

                    <FormField
                        control={form.control}
                        name="user_password"
                        render={({ field }) => (
                            <FormItem className="col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2">
                                <FormLabel>Contraseña</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ingrese usuario" {...field} type="password" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />



                    <div className="flex flex-col-reverse col-start-1">
                        <Button type="submit" > Crear usuario</Button>
                    </div>

                </form>
            </Form>

        </div>
    )
}