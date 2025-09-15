import { z } from "zod"

export const LoginSchema = z.object({
    user_email: z.string().min(1, "Campo obligatorio").email("Correo inválido"),
    password: z.string().min(1, "Campo obligatorio")
})

export type Login = z.infer<typeof LoginSchema>
