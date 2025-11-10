"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Label } from "../ui/label"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useUser } from "@/contextApi/context-auth"
import { UsuarioLogin, UsuarioLoginSchema } from "@/zod/usuario-schema"

export default function FormLogin() {

    const router = useRouter()

    const { setUser } = useUser()

    const form = useForm<UsuarioLogin>({
        resolver: zodResolver(UsuarioLoginSchema),
        defaultValues: {
            user_password: '',
            user_clave: '',
        }
    })

    async function onSubmit(data: UsuarioLogin) {

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/loginCookie`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
            credentials: 'include'
        })

        if (res.ok) {
            const dataUsuario = await res.json()
            setUser(dataUsuario)
            toast.success("Inicio de sesion exitoso")
            router.push('/gateway')
        } else {
            if (res.status === 401) {
                toast.error("Usuario o contraseña no validos")
                return
            }

            const error = await res.json().catch(() => null);
            toast.error(error?.message || "Error al iniciar sesión");
        }
    }



    return (
        <div className="space-y-5">
            <Label className="text-3xl"> Inicio de sesion </Label>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">

                    <FormField
                        control={form.control}
                        name="user_clave"
                        render={({ field }) => (
                            <FormItem className="col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2">
                                <FormLabel>Clave de usaurio</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ingrese clave" {...field} />
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
                        <Button type="submit" variant={'blue'} > Iniciar sesion </Button>
                    </div>

                </form>
            </Form>

        </div>
    )
}