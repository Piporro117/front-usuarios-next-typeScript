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
import { Lectura } from "@/zod/sensorReading-schema"

type ChartLecturaProps = {
    lecturas: Lectura[]
}

const chartConfig = {
    water: {
        label: "Volumen acumulado de agua",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig

export function ChartLectura({ lecturas }: ChartLecturaProps) {

    const data = lecturas
        .filter((lectura) => lectura.received_at && lectura.cumulative_water_volume != null)
        .map((lectura) => {
            const fecha = new Date(lectura.received_at ?? "")
            return {
                fecha: fecha.toLocaleDateString("default", { month: "short", day: "numeric" }),
                volumen: lectura.cumulative_water_volume,
            }
        }).slice(0, 31)


    return (
        <Card>
            <CardHeader>
                <CardTitle>Lecturas individuales de agua</CardTitle>
                <CardDescription>Visualización de cada lectura por fecha</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <AreaChart
                        data={data}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="fecha"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dot" />}
                        />
                        <Area
                            dataKey="volumen"
                            type="linear"
                            stroke="#34a0a4"
                            fill="#76c7c0"
                            fillOpacity={0.3}
                            dot={{ r: 3, fill: "#34a0a4" }}
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
            <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="text-muted-foreground flex items-center gap-2 leading-none">
                            Lecturas individuales - {new Date().getFullYear()}
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}
