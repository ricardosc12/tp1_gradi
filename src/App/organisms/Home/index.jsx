import { useStore } from "../../store"
import style from "./style.module.css"
import Table from "../../molecules/Table"

export default function Home() {
    const { dados } = useStore()

    return (
        <div class="paper mt-3">
            <h1>Transações</h1>
            <h3 class="mt-1">Resultado previsto no mês</h3>
            <div class="overflow-x-auto">
                <Table />
            </div>
        </div>
    )
}

{/* <table class={style.table} border="1">
<thead>
    <tr>
        <th class="w-[100px]">Nome</th>
        <th>Idade</th>
        <th class="text-left">Cidade</th>
    </tr>
</thead>
<tbody>
    <tr>
        <td class="w-[100px]">João</td>
        <td>25</td>
        <td>São Paulo</td>
    </tr>
    <tr>
        <td>Maria</td>
        <td>30</td>
        <td>Rio de Janeiro</td>
    </tr>
    <tr>
        <td>Carlos</td>
        <td>22</td>
        <td>Brasília</td>
    </tr>
</tbody>
</table> */}