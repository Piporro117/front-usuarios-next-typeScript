"use client"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { Usuario } from "@/zod/usuario-schema"


type ChartAreaDefaultProps = {
    usuarios: Usuario[]
}

const chartConfig = {
    desktop: {
        label: "Fehca de creacion de Usuarios",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig

export function ChartAreaDefault({ usuarios }: ChartAreaDefaultProps) {


    // transformar usuarios -> agrupar por mes
    const chartData = usuarios.reduce<Record<string, number>>((acc, user) => {
        if (user.created_date) {
            const fecha = new Date(user.created_date)
            const month = fecha.toLocaleString("default", { month: "long" })
            acc[month] = (acc[month] || 0) + 1
        }
        return acc
    }, {})

    // convertir objeto a arreglo para recharts
    const data = Object.entries(chartData).map(([month, total]) => ({
        month,
        usuarios: total,
    }))

    return (
        <Card>
            <CardHeader>
                <CardTitle>Fecha de creación de Usuarios</CardTitle>
                <CardDescription>En qué mes se crearon los usuarios</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <AreaChart
                        accessibilityLayer
                        data={data}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        <Area
                            dataKey="usuarios"
                            type="natural"
                            fill="#52D98A"
                            fillOpacity={0.4}
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
            <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="text-muted-foreground flex items-center gap-2 leading-none">
                            Enero - Diciembre {new Date().getFullYear()}
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}
