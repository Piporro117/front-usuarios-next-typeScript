import { ColumnDef } from "@tanstack/react-table"
import { Dispositivo } from "../device-schema"

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
        accessorKey: 'dev_lat',
        header: 'Latitud'
    },
    {
        accessorKey: 'dev_long',
        header: 'Longitud'
    },
    {
        accessorKey: 'dev_estatus',
        header: 'Estatus',
        cell: ({ row }) => {
            const estatus = row.original.dev_estatus

            if (estatus) {
                return estatus === "1" ?
                    <span className="bg-green-400 px-3 py-1 rounded-2xl font-bold">
                        Activo
                    </span>
                    :
                    <span className="bg-red-400 px-3 py-1 rounded-2xl font-bold">
                        Inactivo
                    </span>
            } else {
                return
            }
        }
    }
]