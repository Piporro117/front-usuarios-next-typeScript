import { ColumnDef } from "@tanstack/react-table"
import { z } from "zod"

export const UsuarioSchema = z.object({
    id: z.number().optional(),
    user_name: z.string().optional(),
    user_email: z.string().optional(),
    password: z.string().optional(),
    created_date: z.string().optional()
}).superRefine((data, ctx) => {

    if (!data.user_name) {
        ctx.addIssue({
            code: 'custom',
            message: 'Campo obligaortio',
            path: ["user_name"]
        })
    }

    if (!data.user_email) {
        ctx.addIssue({
            code: 'custom',
            message: 'Campo obligatorio',
            path: ['user_email']
        })
    }


    if (!data.password) {
        ctx.addIssue({
            code: 'custom',
            message: 'Campo obligatorio',
            path: ['user_password']
        })
    }
})


export type Usuario = z.infer<typeof UsuarioSchema>

// columnas en tablas
export const ColumnasUsuario: ColumnDef<Usuario>[] = [
    {
        accessorKey: 'id',
        header: 'ID'
    },
    {
        accessorKey: 'user_name',
        header: 'Nombre de usuario'
    },
    {
        accessorKey: 'user_email',
        header: 'Email'
    },
    {
        accessorKey: 'created_date',
        header: 'Fecha de registro'
    }
]