"use client"

import { Dispositivo, DispositivoSchema } from "@/zod/device-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { Label } from "../ui/label"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import { useUser } from "@/contextApi/context-auth"
import { toast } from "sonner"

export default function FormularioDispositivo() {

    const router = useRouter()

    const { clearUser } = useUser()

    // creacion del formulario objeto
    const form = useForm<Dispositivo>({
        resolver: zodResolver(DispositivoSchema),
        defaultValues: {
            dev_descr: '',
            dev_estatus: '1',
            dev_eui: '',
            dev_nombre: '',
            dev_num_ser: '',
            dev_tipo: '',
            id_gateway: null,
            id_zona: null,
        }
    })

    async function onSubmit(data: Dispositivo) {
        try {

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/device/register`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify(data)
            })

            if (response.status === 401) {
                clearUser()
                return
            }

            if (response.ok) {
                toast.success("Dispositivo registrado exitosamente")
                router.push("/dispositivos")
            } else {

                const responseData = await response.json();
                toast.error(`Error al registrar el dispositivo ${responseData}`)

            }


        } catch (error) {
            toast.error(`Error al enviar datos: ${error}`)
        }
    }

    return (
        <div className="space-y-5">
            <Label className="text-3xl"> Registro de dispositivo </Label>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">

                    <FormField
                        control={form.control}
                        name="dev_nombre"
                        render={({ field }) => (
                            <FormItem className="col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2">
                                <FormLabel>Nombre del dispositivo</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ingrese nombre" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="dev_eui"
                        render={({ field }) => (
                            <FormItem className="col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2">
                                <FormLabel>Dipsoitivo eui</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ingrese eui" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="dev_num_ser"
                        render={({ field }) => (
                            <FormItem className="col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2">
                                <FormLabel>Numero de serie</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ingrese num. de serie" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="dev_tipo"
                        render={({ field }) => (
                            <FormItem className="col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2">
                                <FormLabel>Tipo de dispositivo</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}

                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Selecciona el tipo" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="agu"> Agua </SelectItem>
                                            <SelectItem value="luz"> Luz </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    <FormField
                        control={form.control}
                        name="dev_descr"
                        render={({ field }) => (
                            <FormItem className="col-span-1 md:col-span-2 lg:col-span-4 xl:col-span-4">
                                <FormLabel>Descripción</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Escribe una breve descripción..."
                                        {...field}
                                        className="w-full"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" variant={"blue"} className="col-start-1"> Registrar </Button>

                </form>
            </Form>

        </div>
    )
}