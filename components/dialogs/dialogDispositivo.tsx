import { Dispositivo } from "@/zod/device-schema"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { useUser } from "@/contextApi/context-auth"
import { toast } from "sonner"
import { Button } from "../ui/button"
import { FileChartColumn } from "lucide-react"
import { Lectura } from "@/zod/sensorReading-schema"
import { useRouter } from "next/navigation"
import TriangleLoader from "../loader"


type DialogDispositivoProps = {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    dispositivo: Dispositivo
}

export default function DialogDispositivo({ dispositivo, open, setOpen }: DialogDispositivoProps) {

    const { clearUser } = useUser()

    const router = useRouter()

    const [respuesta, setRespuesta] = useState<Lectura | undefined>(undefined)
    const [loadingRespuesta, setLoadingRespuesta] = useState(true)

    useEffect(() => {
        async function fetchRespuestaDispositivo() {

            try {

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/response/consultarLecturaRecientePorDevice/${dispositivo.dev_num_ser}`, {
                    method: 'GET',
                    credentials: 'include'
                })

                if (response.status === 401) {
                    clearUser()
                    return
                }

                if (response.ok) {
                    const data: Lectura = await response.json()
                    setRespuesta(data)
                    setLoadingRespuesta(false)
                } else {
                    const error: { error: string, mensaje: string } = await response.json()
                    toast.error(`Error al obtener respuesta: ${error.mensaje}`)
                    setLoadingRespuesta(false)
                    console.log(error)
                }

            } catch (error) {
                console.log(Error)
                setLoadingRespuesta(false)
            }

        }

        fetchRespuestaDispositivo()
    }, [dispositivo])

    return (
        <div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        {loadingRespuesta ? (<div className="">
                            <DialogTitle className="text-2xl"></DialogTitle>
                            ...cargando
                        </div>) : (
                            <>
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
                                        <section> {respuesta ? respuesta.instantaneous_flow : ' - '}</section>
                                    </div>

                                    <div className="flex-col">
                                        <section className="font-bold"> Estado valvula </section>
                                        <section> {respuesta ? (respuesta.valve_is_open ? 'Abierto' : (respuesta.valve_is_closed ? 'Cerrada' : "Error")) : ' - '}</section>
                                    </div>

                                    <div className="flex-col">
                                        <section className="font-bold"> Temperatura agua ( Centigrados ) </section>
                                        <section>{respuesta ? respuesta.water_temperature : ' - '}</section>
                                    </div>


                                    <div className="col-start-1 flex-row-reverse">
                                        <Button variant={'blue'} onClick={() => router.push(`/dispositivos/${dispositivo.dev_id}`)}>
                                            <FileChartColumn />
                                            Ver información completa
                                        </Button>
                                    </div>


                                </div>
                            </>
                        )}
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    )
}