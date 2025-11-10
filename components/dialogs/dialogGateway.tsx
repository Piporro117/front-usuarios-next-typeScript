
import { Gateway } from "@/zod/gateway-schema"
import { Dispatch, SetStateAction } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { convertirFecha } from "@/lib/utils"
import { Button } from "../ui/button"
import { GalleryHorizontalEnd } from "lucide-react"
import { useRouter } from "next/navigation"

type DialogGatewayProps = {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    gateway: Gateway
}

export default function DialogGateway({ open, setOpen, gateway }: DialogGatewayProps) {

    const router = useRouter()


    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-2xl">Información del Gateway {gateway.gate_nombre}</DialogTitle>

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
                                <section className="font-bold"> Numero </section>
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

                            <div className="col-start-1 flex-row-reverse">
                                <Button variant={'blue'} onClick={() => router.push(`/dispositivos/gateway/${gateway.gate_id}`)}>
                                    <GalleryHorizontalEnd />
                                    Ver dispositivos
                                </Button>
                            </div>

                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}