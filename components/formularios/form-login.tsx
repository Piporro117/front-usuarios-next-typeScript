"use client"
import { Login, LoginSchema } from "@/zod/login-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Label } from "../ui/label"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function FormLogin() {

    const router = useRouter()

    const form = useForm<Login>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            password: '',
            user_email: '',
        }
    })

    async function onSubmit(data: Login) {
        console.log("Data", data)

        const res = await fetch("http://localhost:5000/api/auth/loginCookie", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
            credentials: 'include'
        })

        if (res.ok) {
            toast.success("Inicio de sesion exitoso")
            router.push('/usuarios')
        } else {
            toast.error("Error al iniciar sesion")
            console.log(res.json)
        }
    }



    return (
        <div className="space-y-5">
            <Label className="text-3xl"> Creación de usuario</Label>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">

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
                        name="password"
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
                        <Button type="submit" > Iniciar sesion </Button>
                    </div>

                </form>
            </Form>

        </div>
    )
}