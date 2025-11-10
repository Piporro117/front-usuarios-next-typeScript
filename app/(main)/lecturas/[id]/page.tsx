"use client"
import { useParams } from "next/navigation"

export default function PageInfoLectura() {

    const { id } = useParams()

    const IdNumber = Number(id)

    return (
        <div>
            {IdNumber}
        </div>
    )
}