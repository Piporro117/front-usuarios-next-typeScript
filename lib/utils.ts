import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// funcion para convertir fecha de flask en fecha visible
export function convertirFecha(data: string | undefined): string {

  if (data) {
    const date = new Date(data)

    return date.toLocaleString("es-MX", {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } else {
    return 'Conversion fallo'
  }
}
