import { ColumnDef } from "@tanstack/react-table"
import { z } from "zod"

export const DispositivoSchema = z.object({
    dev_id: z.number().optional(),
    dev_nombre: z.string().optional(),
    dev_eui: z.string().optional(),
    dev_num_ser: z.string().optional(),
    id_gateway: z.number().nullable().optional(),
    id_zona: z.number().nullable().optional(),
    dev_descr: z.string().optional(),
    dev_tipo: z.string().optional(),
    dev_estatus: z.string().optional(),
    created_date: z.string().optional()
}).superRefine((data, ctx) => {

    if (!data.dev_nombre) {
        ctx.addIssue({
            code: 'custom',
            message: 'Campo obligaortio',
            path: ["dev_nombre"]
        })
    }

    if (!data.dev_eui) {
        ctx.addIssue({
            code: 'custom',
            message: 'Campo obligaortio',
            path: ["dev_eui"]
        })
    }

    if (!data.dev_num_ser) {
        ctx.addIssue({
            code: 'custom',
            message: 'Campo obligaortio',
            path: ["dev_num_ser"]
        })
    }

    if (!data.dev_descr) {
        ctx.addIssue({
            code: 'custom',
            message: 'Campo obligaortio',
            path: ["dev_descr"]
        })
    }

    if (!data.dev_tipo) {
        ctx.addIssue({
            code: 'custom',
            message: 'Campo obligaortio',
            path: ["dev_tipo"]
        })
    }

    if (!data.dev_estatus) {
        ctx.addIssue({
            code: 'custom',
            message: 'Campo obligaortio',
            path: ["dev_estatus"]
        })
    }

})

export type Dispositivo = z.infer<typeof DispositivoSchema>


// columnas en tablas
export const ColumnasDispositivo: ColumnDef<Dispositivo>[] = [
    {
        accessorKey: 'dev_id',
        header: 'ID'
    },
    {
        accessorKey: 'dev_nombre',
        header: 'Nombre disp.'
    },
    {
        accessorKey: 'dev_eui',
        header: 'EUI'
    },
    {
        accessorKey: 'dev_estatus',
        header: 'Estatus',
        cell: ({ row }) => {
            const estatus = row.original.dev_estatus

            if (estatus) {
                return estatus === "1" ? "Activo" : "Inactivo"
            } else {
                return
            }
        }
    }
]

