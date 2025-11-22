"use client"

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"
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

type BarChartConsumoProps = {
    lecturas: Lectura[]
}

const chartConfig = {
    water: {
        label: "Volumen acumulado de agua",
        color: "#76c7c0",
    },
} satisfies ChartConfig

export function BarChartConsumo({ lecturas }: BarChartConsumoProps) {

    const data = lecturas
        .filter((lectura) => lectura.received_at && lectura.yesterday_cumulative_water_volume != null)
        .map((lectura) => {
            const fecha = new Date(lectura.received_at ?? "")
            return {
                fecha: fecha.toLocaleDateString("default", { month: "short", day: "numeric" }),
                consumo: lectura.yesterday_cumulative_water_volume,
            }
        })
        .slice(0, 31)

    return (
        <Card>
            <CardHeader>
                <CardTitle>Consumo diario de agua</CardTitle>
                <CardDescription>Visualización de consumo por día</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart
                        accessibilityLayer
                        data={data}
                        margin={{ top: 20, left: 12, right: 12 }}
                    >
                        <CartesianGrid vertical={false} />

                        <XAxis
                            dataKey="fecha"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={10}
                        />

                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />

                        <Bar
                            dataKey="consumo"
                            fill="var(--color-water)"
                            radius={8}
                        >
                            <LabelList
                                dataKey="consumo"
                                position="top"
                                offset={8}
                                className="fill-foreground"
                                fontSize={11}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>

            <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="text-muted-foreground flex items-center gap-2 leading-none">
                            Consumo diario mes
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}
