import { createMemo } from "solid-js"
import { useStore } from "../../store"

export default function Dashboard() {
    const { dados } = useStore()

    return (
        <div>
            <h5>Dashboard</h5>
            <p>{dados.nome.first}</p>
        </div>
    )
}