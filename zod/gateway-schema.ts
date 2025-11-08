import { ColumnDef } from "@tanstack/react-table"
import { number, z } from "zod"

export const GatewaySchema = z.object({
    gate_id: z.number().optional(),
    gate_nombre: z.string().optional(),
    gate_clave: z.string().optional(),
    gate_calle: z.string().optional(),
    gate_col: z.string().optional(),
    gate_ciudad: z.string().optional(),
    gate_estado: z.string().optional(),
    gate_num_ext: z.string().optional(),
    gate_long: z.float64().optional(),
    gate_lat: z.float64().optional(),
    gate_estatus: z.string().optional(),
    user_id: z.number().optional(),
    created_date: z.string().optional()
})


export type Gateway = z.infer<typeof GatewaySchema>

// columnas en la tabla 
export const ColumnasGateway: ColumnDef<Gateway>[] = [
    {
        accessorKey: 'gate_id',
        header: 'ID'
    },
    {
        accessorKey: 'gate_nombre',
        header: 'Nombre del gateway'
    },
    {
        accessorKey: 'gate_clave',
        header: 'Clave del gateway'
    },
    {
        accessorKey: 'gate_estatus',
        header: 'Estatus',
        cell: ({ row }) => {
            const estatus = row.original.gate_estatus

            if (estatus) {
                return estatus === "1" ? "Activo" : "Inactivo"
            } else {
                return
            }
        }
    }
]