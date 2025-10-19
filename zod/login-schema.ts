import { z } from "zod"

export const LoginSchema = z.object({
    user_clave: z.string().min(1, "Campo obligatorio"),
    password: z.string().min(1, "Campo obligatorio")
})

export type Login = z.infer<typeof LoginSchema>
