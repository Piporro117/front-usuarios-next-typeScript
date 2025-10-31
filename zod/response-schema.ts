import { z } from "zod"

export const RespuestaSchema = z.object({
    resp_id: z.number().optional(),
    dev_eui: z.string().optional(),
    resp_valv_estatus: z.string().optional(),
    resp_fecha: z.string().optional(),
    resp_fluj_act: z.number().optional(),
    resp_temp_agua: z.number().optional(),
    resp_volt_bate: z.number().optional(),
    resp_codigo: z.string().optional(),
    created_date: z.string().optional()
})

export type Respuesta = z.infer<typeof RespuestaSchema>