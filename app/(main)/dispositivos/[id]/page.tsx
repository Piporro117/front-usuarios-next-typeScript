"use client"
import TriangleLoader from "@/components/loader";
import { useUser } from "@/contextApi/context-auth";
import { Dispositivo } from "@/zod/device-schema";
import { Lectura } from "@/zod/sensorReading-schema";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Image from "next/image"
import { Label } from "@/components/ui/label";
import { ChartLectura } from "@/components/graficos/graficaLecturasDevice";
import { convertirFechaConHora } from "@/lib/utils";

export default function PageInfoDispositivo() {

    const { id } = useParams()
    const idNumber = id ? Number(id) : undefined
    const { clearUser } = useUser()

    // states de almacenamiento
    const [dispositivo, setDispositivo] = useState<Dispositivo | undefined>(undefined)
    const [lectura, setLectura] = useState<Lectura | undefined>(undefined)
    const [lecturas, setLecturas] = useState<Lectura[]>([])

    // states de carga
    const [loadingDispositivo, setLoadingDipositivo] = useState(true)
    const [loadingRespuesta, setLoadingRespuesta] = useState(true)
    const [loadingLecturas, setLoadingLecturas] = useState(true)

    useEffect(() => {

        // fecth para obtener el dispositivo por id
        async function fetchDispositivo() {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/device/obtenerDispositivo/${idNumber}`, {
                    method: 'GET',
                    credentials: 'include'
                })

                if (response.status === 401) {
                    clearUser()
                    return
                }

                if (response.ok) {
                    const data: Dispositivo = await response.json()
                    setDispositivo(data)
                    setLoadingDipositivo(false)
                } else {
                    toast.error("Error al obtener el dispositivo")
                    setLoadingDipositivo(false)
                }

            } catch (error) {
                console.log(error)
            }
        }
        fetchDispositivo()
    }, [])

    // use effect para ptra cosa
    useEffect(() => {

        if (!dispositivo?.dev_num_ser) return

        // funcion para obtener la lectua mas reciente por id dispositivo
        async function fetchLectura() {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/response/consultarLecturaRecientePorDevice/${dispositivo?.dev_num_ser}`, {
                    method: 'GET',
                    credentials: 'include'
                })

                if (response.status === 401) {
                    clearUser()
                    return
                }

                if (response.ok) {
                    const data: Lectura = await response.json()
                    setLectura(data)
                    setLoadingRespuesta(false)
                } else {
                    toast.error("Error al obtener la lectura reciente")
                    setLoadingRespuesta(false)
                }
            } catch (error) {
                console.log(error)
                setLoadingRespuesta(false)
            }
        }

        // feth de obtener lecturas de este dispositiv
        async function fetchLecturasDispositivio() {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/response//obtenerLecturasPorEUI/${dispositivo?.dev_num_ser}`, {
                    method: 'GET',
                    credentials: 'include'
                })

                if (response.status === 401) {
                    clearUser()
                    return
                }

                if (response.ok) {
                    const data: Lectura[] = await response.json()
                    setLecturas(data)
                    console.log(data)
                    setLoadingLecturas(false)
                } else {
                    toast.error("Error al obtener la lecturas")
                    setLoadingLecturas(false)
                }
            } catch (error) {
                console.log(error)
                setLoadingLecturas(false)
            }
        }

        fetchLectura()
        fetchLecturasDispositivio()
    }, [dispositivo])


    return (
        <div>
            {loadingDispositivo || loadingRespuesta ? (<TriangleLoader />) : (

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 w-full  gap-5">

                    { /** columna izquierda */}
                    <div className="grid grid-rows-1 w-full gap-5">

                        <div className="mb-5">
                            <Image src={"/imgs/logoCentenario.jpg"} width={650} height={180} alt="logo" className="" />
                        </div>

                        <div className="rounded-2xl bg-gray-200 p-3">

                            <Label className="text-3xl font-bold">Información general:</Label>

                            <div className="mt-1">
                                <Label className="text-2xl">Ultima Lectura: {lectura?.cumulative_water_volume}</Label>
                            </div>

                            <div className="mt-1">
                                <Label className="text-2xl">Fecha y hora de ultima lectura: {convertirFechaConHora(lectura?.received_at)}</Label>
                            </div>

                            <div className="mt-1">
                                <Label className="text-2xl">Temperatura del agua ( Centigrados ): {lectura?.water_temperature}</Label>
                            </div>

                            <div className="mt-1">
                                <Label className="text-2xl">Estado de la valvula: {lectura ? (lectura.valve_is_open ? 'Abierto' : (lectura.valve_is_closed ? 'Cerrada' : "Error")) : ' - '}</Label>
                            </div>

                            <div className="mt-1">
                                <Label className="text-2xl">Flujo instanteno del agua: {lectura?.instantaneous_flow}</Label>
                            </div>


                        </div>


                        <div className="w-full h-fit flex flex-col gap-2 rounded-2xl bg-gray-200 p-3">
                            <Label className="text-3xl font-bold">Lecturas:  </Label>

                            <ChartLectura lecturas={lecturas} />
                        </div>


                    </div>

                    {/** COLUMANA DERECHA */}
                    <div className="grid grid-rows-1 w-full gap-8">
                        <div className="w-full h-fit flex flex-col gap-5 rounded-2xl p-3">

                            <div className="w-full h-fit flex flex-col gap-2 rounded-2xl bg-gray-200 p-3">
                                <Label className="text-3xl font-bold">MEDIDOR: {dispositivo?.dev_nombre?.toUpperCase()} </Label>

                                <div className="mt-1">
                                    <Label className="text-2xl">Numero de serie: {dispositivo?.dev_num_ser}</Label>
                                </div>
                            </div>

                            <div className="w-full h-fit flex flex-col gap-2 rounded-2xl bg-gray-200 p-3">
                                <Label className="text-3xl font-bold">Ubicación:  </Label>

                                <div className="mt-1">
                                    <Label className="text-2xl">Latitud: {dispositivo?.dev_lat}</Label>
                                </div>

                                <div className="mt-1">
                                    <Label className="text-2xl">Longitud: {dispositivo?.dev_long}</Label>
                                </div>
                            </div>



                        </div>


                    </div>

                </div>
            )}
        </div>
    )
}