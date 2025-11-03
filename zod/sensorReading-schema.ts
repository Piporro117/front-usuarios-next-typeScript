import { convertirFecha, convertirFechaConHora } from "@/lib/utils"
import { ColumnDef } from "@tanstack/react-table"
import { z } from "zod"

export const LecturaSchema = z.object({
    id: z.number().optional(),
    received_at: z.string().optional(),
    gateway_id: z.string().optional(),
    raw_payload: z.string().optional(),
    device_eui: z.string().optional(),
    function_code: z.string().optional(),
    reporting_type: z.string().optional(),
    device_has_valve: z.boolean().optional(),
    device_is_prepaid: z.boolean().optional(),
    device_power_source: z.string().optional(),
    device_is_rechargeable: z.boolean().optional(),
    device_class: z.string().optional(),
    cumulative_flow_unit: z.string().optional(),
    instantaneous_flow_unit: z.string().optional(),
    temperature_unit: z.string().optional(),
    cumulative_water_volume: z.number().optional(),
    yesterday_cumulative_water_volume: z.number().optional(),
    instantaneous_flow: z.number().optional(),
    water_temperature: z.number().optional(),
    big_alarm_min_flow_rate: z.number().optional(),
    small_alarm_max_flow_rate: z.number().optional(),
    alarm_reverse_flow: z.boolean().optional(),
    alarm_empty_pipe: z.boolean().optional(),
    alarm_low_power_warning: z.boolean().optional(),
    alarm_low_power: z.boolean().optional(),
    alarm_flow_limit: z.boolean().optional(),
    alarm_low_flow: z.boolean().optional(),
    alarm_high_water_temp: z.boolean().optional(),
    alarm_low_water_temp: z.boolean().optional(),
    alarm_low_water_level: z.boolean().optional(),
    alarm_water_overdraft: z.boolean().optional(),
    alarm_water_overdraft_end: z.boolean().optional(),
    alarm_high_current: z.boolean().optional(),
    alarm_small_flow: z.boolean().optional(),
    alarm_zero_balance: z.boolean().optional(),
    valve_is_open: z.boolean().optional(),
    valve_is_closed: z.boolean().optional(),
    valve_failure: z.boolean().optional(),
    last_valve_command: z.string().optional(),
    total_uploads: z.number().optional(),
    last_valve_actuation_time_sec: z.number().optional(),
    valve_closing_count: z.number().optional(),
    valve_opening_count: z.number().optional(),
    rust_removal_count: z.number().optional(),
    rust_removal_state: z.string().optional(),
    flow_alarm_serial_number: z.number().optional(),
})

export type Lectura = z.infer<typeof LecturaSchema>

// columnas en las tablas
export const ColumnasLectura: ColumnDef<Lectura>[] = [

    {
        accessorKey: 'id',
        header: 'ID'
    },
    {
        accessorKey: 'device_eui',
        header: 'Numero dispositivo'
    },
    {
        accessorKey: 'cumulative_water_volume',
        header: 'Agua acomulada'
    },
    {
        accessorKey: 'water_temperature',
        header: 'Temperatura agua',
        cell: ({ row }) => {

            const temperatura = row.original.water_temperature

            if (temperatura) {
                return Math.round(temperatura * 100)
            } else {
                return ' - '
            }
        }
    },
    {
        accessorKey: 'last_valve_command',
        header: 'Ulitimo comando valvula'
    },
    {
        accessorKey: 'instantaneous_flow',
        header: 'Flujo instanteneo'
    },
    {
        header: 'Estado valvula',
        cell: ({ row }) => {
            const abierto = row.original.valve_is_open
            const cerrada = row.original.valve_is_closed

            if (abierto) {
                return 'Abierta'
            } else if (cerrada) {
                return 'Cerrada'
            } else {
                return 'Error'
            }
        }
    },
    {
        accessorKey: 'received_at',
        header: 'Fecha recibida',
        cell: ({ row }) => {
            return convertirFechaConHora(row.original.received_at)
        }
    }
]