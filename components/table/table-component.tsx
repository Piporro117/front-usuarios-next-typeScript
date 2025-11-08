"use client"

import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from "@tanstack/react-table"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { useState } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"

type DataTableProps<TData, TValue> = {
    columns: ColumnDef<TData, TValue>[]
    data: TData[],
    filterBy: string,
    onRowDoubleClick?: (rowData: TData) => void,
    onRowClick?: (rowData: TData) => void,
    mensajeFiltro: string,
    routeBase: string,
    ocultarBotonNuevo?: boolean,
}

export default function TableComponente<TData, TValue>({ columns, data, filterBy, onRowDoubleClick, onRowClick, mensajeFiltro, routeBase, ocultarBotonNuevo }: DataTableProps<TData, TValue>) {

    // redireccionamiento de boton nuevo
    const router = useRouter()

    // state de filtrado
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnsFilters] = useState<ColumnFiltersState>([])

    // creamos la tabla 
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        // para filtrados
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnsFilters,
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        // paginacion de la tabla
        getPaginationRowModel: getPaginationRowModel(),
        state: {
            sorting,
            columnFilters
        },
        // para la paginacion
    })

    return (

        <>

            { /** BUSQUEDA FILTRADOS */}
            <div className="flex items-center justify-between py-4">
                <Input
                    placeholder={`Filtrar por ${mensajeFiltro ?? "columna"}...`}
                    className="max-w-sm"
                    value={(table.getColumn(filterBy)?.getFilterValue() as string) ?? ""}
                    onChange={(event) => {
                        table.getColumn(filterBy)?.setFilterValue(event.target.value)
                    }}
                />

                {/** Boton de redireccionamiento */}
                {!ocultarBotonNuevo && (
                    <Button variant={'blue'} size={'lg'} onClick={() => router.push(`${routeBase}/new`)}><Plus /> Nuevo </Button>
                )}
            </div>

            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder ?
                                                null
                                                :
                                                flexRender(header.column.columnDef.header, header.getContext())
                                            }
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>


                    <TableBody>
                        {table.getRowModel().rows?.length ?
                            (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                        onDoubleClick={() => onRowDoubleClick?.(row.original)}
                                        onClick={() => onRowClick?.(row.original)}
                                        className="hover: cursor-pointer">
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            )
                            :
                            (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        Sin resultados
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </div>


            {/** Control de paginacion de la tabla */}

            <div className="flex items-center justify-between py-4">
                <div className="text-sm text-muted-foreground">
                    Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
                </div>

                <div className="flex items-center space-x-2">
                    <Button
                        variant={'outline'}
                        size={'sm'}
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Anterior
                    </Button>


                    <Button
                        variant={'outline'}
                        size={'sm'}
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Siguiente
                    </Button>
                </div>

            </div>
        </>
    )

}