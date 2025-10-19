import { convertirFecha } from "@/lib/utils"
import { ColumnDef } from "@tanstack/react-table"
import { z } from "zod"


// schema base para crear un usaurio y obtener datos de este
export const UsuarioSchema = z.object({
    user_id: z.number().optional(),
    user_clave: z.string().optional(),
    user_name: z.string().optional(),
    user_ape_pat: z.string().optional(),
    user_ape_mat: z.string().optional(),
    user_email: z.string().optional(),
    user_telef: z.number().optional(),
    user_rol: z.string().optional(),
    user_estatus: z.string().optional(),
    password: z.string().optional(),
    created_date: z.string().optional()
}).superRefine((data, ctx) => {

    if (!data.user_clave) {
        ctx.addIssue({
            code: 'custom',
            message: 'Campo obligaortio',
            path: ["user_clave"]
        })
    }

    if (!data.user_name) {
        ctx.addIssue({
            code: 'custom',
            message: 'Campo obligaortio',
            path: ["user_name"]
        })
    }

    if (!data.user_ape_mat) {
        ctx.addIssue({
            code: 'custom',
            message: 'Campo obligatorio',
            path: ['user_ape_mat']
        })
    }

    if (!data.user_ape_pat) {
        ctx.addIssue({
            code: 'custom',
            message: 'Campo obligatorio',
            path: ['user_ape_pat']
        })
    }

    if (!data.user_email) {
        ctx.addIssue({
            code: 'custom',
            message: 'Campo obligatorio',
            path: ['user_email']
        })
    }

    if (!data.user_telef) {
        ctx.addIssue({
            code: 'custom',
            message: 'Campo obligatorio',
            path: ['user_telef']
        })
    }

    if (!data.user_rol) {
        ctx.addIssue({
            code: 'custom',
            message: 'Campo obligatorio',
            path: ['user_rol']
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


// schema para la edicion de un usaurio
export const UsuarioEditSchema = UsuarioSchema.pick({
    user_name: true,
    user_ape_mat: true,
    user_ape_pat: true,
    user_rol: true,
    user_telef: true,
    user_email: true
}).superRefine((data, ctx) => {
    if (!data.user_name) {
        ctx.addIssue({
            code: 'custom',
            message: 'Campo obligatorio',
            path: ['user_name']
        })
    }

    if (!data.user_ape_mat) {
        ctx.addIssue({
            code: 'custom',
            message: 'Campo obligatorio',
            path: ['user_ape_mat']
        })
    }

    if (!data.user_ape_pat) {
        ctx.addIssue({
            code: 'custom',
            message: 'Campo obligatorio',
            path: ['user_ape_pat']
        })
    }

    if (!data.user_telef) {
        ctx.addIssue({
            code: 'custom',
            message: 'Campo obligatorio',
            path: ['user_telef']
        })
    }

    if (!data.user_rol) {
        ctx.addIssue({
            code: 'custom',
            message: 'Campo obligatorio',
            path: ['user_rol']
        })
    }

    if (!data.user_email) {
        ctx.addIssue({
            code: 'custom',
            message: 'Campo obligatorio',
            path: ['user_email']
        })
    }
})

// schema para el login de usaurio
export const UsuarioLoginSchema = UsuarioSchema.pick({
    user_clave: true,
    password: true
}).superRefine((data, ctx) => {
    if (!data.user_clave) {
        ctx.addIssue({
            code: 'custom',
            message: 'Campo obligatorio',
            path: ['user_clave']
        })
    }

    if (!data.password) {
        ctx.addIssue({
            code: 'custom',
            message: 'Campo obligatorio',
            path: ['password']
        })
    }

})

// type usuairo para creacion y obtencion
export type Usuario = z.infer<typeof UsuarioSchema>
export type UsuarioEdit = z.infer<typeof UsuarioEditSchema>
export type UsuarioLogin = z.infer<typeof UsuarioLoginSchema>



// columnas en tablas
export const ColumnasUsuario: ColumnDef<Usuario>[] = [
    {
        accessorKey: 'user_id',
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
        header: 'Fecha de registro',
        cell: ({ row }) => {
            const fecha = row.getValue("created_date") as string

            return convertirFecha(fecha)
        }
    }
]