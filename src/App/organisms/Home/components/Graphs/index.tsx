import { createEffect, createMemo } from "solid-js";
import { PieGraph } from "./categorias";
import { Button } from "@hope-ui/solid";

export function Graphs(props) {

    const dados = createMemo(() => {

        const data = {
            categorias: {
            },
        }

        if (!Array.isArray(props.transacoes)) return data

        props.transacoes.forEach(item => {
            if (data['categorias'][item.categoria + '-' + item.tipo]) {
                data['categorias'][item.categoria + '-' + item.tipo] += item.valor
            }
            else {
                data['categorias'][item.categoria + '-' + item.tipo] = item.valor
            }
        })

        return data
    })

    return (
        <div class="flex w-1/2  justify-center items-end flex-col">
            <h2 class="mb-2">Transações por categoria</h2>
            <div class="h-[170px] mr-5">
                <PieGraph labels={Object.keys(dados().categorias)} data={Object.values(dados().categorias)} />
            </div>
        </div>
    )
}