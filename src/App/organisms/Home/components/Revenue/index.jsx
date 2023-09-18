import { createMemo } from "solid-js"
import { Progress, ProgressIndicator, ProgressLabel } from "@hope-ui/solid"
import { Real } from "../Table"
import style from './style.module.css'

export default function Revenue(props) {

    const data = createMemo(() => {

        const revenue = {
            despesas: {
                pago: 0,
                previsto: 0
            },
            receita: {
                pago: 0,
                previsto: 0
            }
        }

        if (!Array.isArray(props.data)) return revenue

        props.data.forEach(item => {
            if (item.tipo === "despesa") {
                if (item.pago) {
                    revenue.despesas.pago += item.valor
                }
                else {
                    revenue.despesas.previsto += item.valor
                }
            }
            else if (item.tipo === "receita") {
                if (item.pago) {
                    revenue.receita.pago += item.valor
                }
                else {
                    revenue.receita.previsto += item.valor
                }
            }
        });

        return revenue
    })

    const totalPrevisto = createMemo(() => - data().despesas.previsto + data().receita.previsto - data().despesas.pago + data().receita.pago)

    const percentReceita = createMemo(() => data().receita.pago / (data().receita.pago + data().receita.previsto) * 100)
    const percentDespesa = createMemo(() => data().despesas.pago / (data().despesas.pago + data().despesas.previsto) * 100)

    return (
        <div class={style.root}>
            <div class="flex space-x-1 mb-5">
                {totalPrevisto() >= 0 ? (
                    <div class="flex items-center space-x-2">
                        <p class="text-verde-dark">+</p>
                        <h2 class="text-verde-dark">{Real.format(totalPrevisto())}</h2>
                    </div>
                ) : (
                    <div class="flex items-center space-x-2">
                        <p class="text-vermelho">-</p>
                        <h2 class="text-vermelho">{Real.format(totalPrevisto())}</h2>
                    </div>
                )}
            </div>
            <div class="flex w-full space-x-5">
                <div class="w-full space-y-1">
                    <h5>Recebimentos</h5>
                    <Progress trackColor="var(--background-dark)" value={percentReceita()}>
                        <ProgressIndicator bg="var(--verdinho)" />
                    </Progress>
                    <span class="flex w-full justify-between">
                        <p class="font-medium text-verde-dark">Recebido</p>
                        <p class="font-medium text-verde-dark">+ {Real.format(data().receita.pago)}</p>
                    </span>
                    <span class="flex w-full justify-between">
                        <p class="font-medium">Previsto</p>
                        <p class="font-medium">{Real.format(data().receita.previsto)}</p>
                    </span>
                </div>
                <div class="w-full space-y-1">
                    <h5>Despesas</h5>
                    <Progress trackColor="var(--background-dark)" value={percentDespesa()}>
                        <ProgressIndicator bg="var(--vermelhinho)" />
                    </Progress>
                    <span class="flex w-full justify-between">
                        <p class="font-medium text-vermelho">Recebido</p>
                        <p class="font-medium text-vermelho">- {Real.format(data().despesas.pago)}</p>
                    </span>
                    <span class="flex w-full justify-between">
                        <p class="font-medium">Previsto</p>
                        <p class="font-medium">{Real.format(data().despesas.previsto)}</p>
                    </span>
                </div>
            </div>
        </div>
    )
}