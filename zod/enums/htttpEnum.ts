import { z } from "zod"

export const HttpMethodEnum = z.enum(["POST", "PUT", "GET", "DELETE"])

export type HttpMethod = z.infer<typeof HttpMethodEnum>
