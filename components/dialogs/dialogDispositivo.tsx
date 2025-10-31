import { Dispositivo } from "@/zod/device-schema"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { useUser } from "@/contextApi/context-auth"
import { Respuesta } from "@/zod/response-schema"
import { toast } from "sonner"
import { Button } from "../ui/button"
import { FileChartColumn } from "lucide-react"


type DialogDispositivoProps = {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    dispositivo: Dispositivo
}

export default function DialogDispositivo({ dispositivo, open, setOpen }: DialogDispositivoProps) {

    const { clearUser } = useUser()

    const [respuesta, setRespuesta] = useState<Respuesta | undefined>(undefined)

    useEffect(() => {
        async function fetchRespuestaDispositivo() {

            try {

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/response/obtenerRespuestaPorEUI/${dispositivo.dev_eui}`, {
                    method: 'GET',
                    credentials: 'include'
                })

                if (response.status === 401) {
                    clearUser()
                    return
                }

                if (response.ok) {
                    const data: Respuesta = await response.json()
                    setRespuesta(data)
                } else {
                    const error: { error: string, mensaje: string } = await response.json()
                    toast.error(`Error al obtener respuesta: ${error.mensaje}`)
                    console.log(error)
                }

            } catch (error) {
                console.log(Error)
            }

        }

        fetchRespuestaDispositivo()
    }, [dispositivo])


    return (
        <div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-2xl"> Informacion del {dispositivo.dev_nombre}</DialogTitle>

                        <div className="w-full grid grid-cols-2 gap-2.5">

                            <div className="flex-col">
                                <section className="font-bold"> EUI </section>
                                <section> {dispositivo.dev_eui}</section>
                            </div>

                            <div className="flex-col">
                                <section className="font-bold"> Num. serie </section>
                                <section> {dispositivo.dev_num_ser}</section>
                            </div>

                            <div className="flex-col">
                                <section className="font-bold"> Flujo del agua </section>
                                <section> {respuesta ? respuesta.resp_fluj_act : ' - '}</section>
                            </div>

                            <div className="flex-col">
                                <section className="font-bold"> Estado valvula </section>
                                <section> {respuesta ? respuesta.resp_valv_estatus : ' - '}</section>
                            </div>

                            <div className="flex-col">
                                <section className="font-bold"> Temperatura agua </section>
                                <section> {respuesta ? respuesta.resp_temp_agua : ' - '}</section>
                            </div>


                            <div className="col-start-1 flex-row-reverse">
                                <Button variant={'blue'}>
                                    <FileChartColumn />
                                    Ver información completa
                                </Button>
                            </div>

                        </div>

                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    )
}