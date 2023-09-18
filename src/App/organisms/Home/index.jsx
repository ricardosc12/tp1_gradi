import { useStore } from "../../store"
import style from "./style.module.css"
import { HomeTable } from "./components/Table"


export default function Home() {
    const { dados } = useStore()

    return (
        <>
            <div class="paper mt-3">
                <h1>Transações</h1>
                <h3 class="mt-1">Resultado previsto no mês</h3>
            </div>
            <div class="mt-3">
                <div class="overflow-x-auto">
                    <HomeTable />
                </div>
            </div>
        </>

    )
}