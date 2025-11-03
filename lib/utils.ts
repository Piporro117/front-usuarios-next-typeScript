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

// función para convertir fecha de Flask en fecha visible con hora en formato 24h
export function convertirFechaConHora(data: string | undefined): string {
  if (data) {
    const date = new Date(data)

    const fecha = date.toLocaleDateString("es-MX", {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })

    const hora = date.toLocaleTimeString("es-MX", {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false // esto fuerza el formato 24 horas
    })

    return `${fecha} ${hora}`
  } else {
    return 'Conversión falló'
  }
}

