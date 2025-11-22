
import { Gateway } from "@/zod/gateway-schema"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { convertirFecha } from "@/lib/utils"
import { Button } from "../ui/button"
import { GalleryHorizontalEnd, Loader } from "lucide-react"
import { useRouter } from "next/navigation"
import { useUser } from "@/contextApi/context-auth"
import { Dispositivo } from "@/zod/device-schema"
import { toast } from "sonner"
import Image from "next/image"

type DialogGatewayProps = {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    gateway: Gateway
}

export default function DialogGateway({ open, setOpen, gateway }: DialogGatewayProps) {

    const router = useRouter()

    const { clearUser, logo } = useUser()

    const [numeroDispositivos, setNumeroDispositivos] = useState<number>(0)

    // state de loading
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        setLoading(true)

        async function fetchDispositivos() {
            try {

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/device/consultarPorGateway/${gateway.gate_id}`, {
                    method: 'GET',
                    credentials: 'include'
                })

                if (response.status === 401) {
                    clearUser()
                    return
                }

                if (response.ok) {
                    const data: Dispositivo[] = await response.json()
                    setNumeroDispositivos(data.length)
                    setLoading(false)
                } else {
                    toast.error("Error al obteber los dispositivios")
                    setLoading(false)
                }

            } catch (error) {
                console.log(error)
                setLoading(false)
            }
        }

        fetchDispositivos()
    }, [gateway])


    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-2xl">
                            <Image alt="logo" src={logo} width={100} height={100} />

                            Información del Gateway {gateway.gate_nombre}
                        </DialogTitle>
                        {loading ? (
                            <div className="animate-spin w-fit h-fit justify-center items-center">
                                <Loader />
                            </div>
                        ) : (

                            <div className="w-full grid grid-cols-2 gap-2.5">

                                <div className="flex-col">
                                    <section className="font-bold"> Identificador </section>
                                    <section> {gateway.gate_clave}</section>
                                </div>

                                <div className="flex-col">
                                    <section className="font-bold"> Calle </section>
                                    <section> {gateway.gate_calle}</section>
                                </div>

                                <div className="flex-col">
                                    <section className="font-bold"> Número </section>
                                    <section> {gateway.gate_num_ext}</section>
                                </div>

                                <div className="flex-col">
                                    <section className="font-bold"> Colonia </section>
                                    <section> {gateway.gate_col ?? ' - '}</section>
                                </div>

                                <div className="flex-col">
                                    <section className="font-bold"> Ciudad </section>
                                    <section> {gateway.gate_ciudad}</section>
                                </div>

                                <div className="flex-col">
                                    <section className="font-bold"> Fecha registro </section>
                                    <section> {convertirFecha(gateway.created_date)}</section>
                                </div>

                                <div className="flex-col">
                                    <section className="font-bold"> Dispositivos registrados </section>
                                    <section> {numeroDispositivos}</section>
                                </div>

                                <div className="col-start-1 flex-row-reverse">
                                    <Button variant={'blue'} onClick={() => router.push(`/dispositivos/gateway/${gateway.gate_id}`)}>
                                        <GalleryHorizontalEnd />
                                        Ver dispositivos
                                    </Button>
                                </div>

                            </div>
                        )}
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}