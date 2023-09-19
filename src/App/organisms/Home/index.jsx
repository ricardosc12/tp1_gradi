import { useStore } from "../../store"
import style from "./style.module.css"
import { defaultColumns } from "./components/Table"
import { Button, Switch } from "@hope-ui/solid"
import { AddIcon, CheckIcon, TrashIcon } from "@/assets/icons"
import Revenue from "./components/Revenue"
import ActionButton from "@/App/atoms/ActionButton"
import Table from "@/App/molecules/Table"
import { createEffect, createMemo, createSignal, onMount } from "solid-js"
import { PieGraph } from "./components/Graphs/categorias"
import { Graphs } from "./components/Graphs"
import Modal from "@/App/molecules/Modal"
import { jsonToXml, xmlToJson } from "@/utils/convert"



const defaultData = [
    {
        data: '23/09/2023',
        tipo: "despesa",
        pago: false,
        descricao: "Curso - Enem",
        origem: "Salário",
        categoria: 'Estudo',
        valor: 4100,
        tipo_pagamento: "Cartão"
    },
    {
        data: '23/09/2024',
        tipo: "despesa",
        pago: true,
        descricao: "Conta de luz",
        origem: "Salário",
        categoria: 'Gasto Fixos',
        valor: 210,
        tipo_pagamento: "Pix"
    },
    {
        data: '23/09/2024',
        tipo: "despesa",
        pago: true,
        descricao: "Conta de Água",
        origem: "Salário",
        categoria: 'Gasto Fixos',
        valor: 340,
        tipo_pagamento: "Pix"
    },
    {
        data: '23/09/2024',
        tipo: "despesa",
        pago: true,
        descricao: "Aluguel",
        origem: "Salário",
        categoria: 'Gasto Fixos',
        valor: 900,
        tipo_pagamento: "Pix"
    },
    {
        data: '23/09/2024',
        tipo: "receita",
        pago: true,
        descricao: "Pagamento de setembro",
        origem: "Azapfy",
        categoria: 'Salário',
        valor: 9560,
        tipo_pagamento: "Pix"
    },
    {
        data: '23/09/2023',
        tipo: "despesa",
        pago: false,
        descricao: "Amazon",
        origem: 'Salário',
        categoria: 'Entreterimento',
        valor: 19.90,
        tipo_pagamento: "Cartão"
    },
    {
        data: '23/09/2023',
        tipo: "despesa",
        pago: false,
        descricao: "Netflix",
        origem: 'Salário',
        categoria: 'Entreterimento',
        valor: 59.90,
        tipo_pagamento: "Cartão"
    },
    {
        data: '23/09/2024',
        tipo: "receita",
        pago: true,
        descricao: "Venda online",
        origem: "Mercado Livre",
        categoria: 'Marketplace',
        valor: 11300,
        tipo_pagamento: "Pix"
    },
    {
        data: '23/09/2024',
        tipo: "receita",
        pago: true,
        descricao: "Venda online",
        origem: "Shopee",
        categoria: 'Marketplace',
        valor: 3444,
        tipo_pagamento: "Pix"
    },
    {
        data: '23/09/2024',
        tipo: "receita",
        pago: false,
        descricao: "Venda de NFT",
        origem: "Site",
        categoria: 'Venda',
        valor: 5660.90,
        tipo_pagamento: "Pix"
    },
]

export default function Home() {

    const [dados, { setTransacao, removeTransacao, addTransacao, toggleTransacao }] = useStore()
    const [rowSelection, setRowSelection] = createSignal({})

    onMount(() => {
        setTransacao(defaultData)
    })

    function handleRemove() {
        removeTransacao(Object.keys(rowSelection()).map(id => Number(id)))
        setRowSelection({})
    }

    const xmlString = jsonToXml(defaultData)

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'text/xml');

    console.log(xmlString)

    console.log(xmlToJson(xmlDoc))

    return (
        <>
            <div class="paper mt-3 flex justify-between">
                <div class="w-1/2">
                    <h2>Transações</h2>
                    <h3 class="mt-1">Resultado previsto no mês</h3>
                    <Revenue data={dados.transacoes} />
                </div>
                <Graphs transacoes={dados.transacoes} />
            </div>
            <div class="mt-3">
                <div class="flex items-center space-x-3 mb-4 bg-roxinho-bg px-3 py-2 rounded-3xl justify-between">
                    <Modal handleAdd={addTransacao} transacoes={dados.transacoes} />
                    <ActionButton onclick={handleRemove} className="cursor-pointer" color={Object.values(rowSelection()).length ? "vermelhinho" : "cinzinha"} icon={<TrashIcon />} />
                </div>
                <div class="overflow-x-auto">
                    <Table rowSelection={rowSelection} setRowSelection={setRowSelection} data={dados.transacoes} columns={defaultColumns({ toggleTransacao })} />
                </div>
            </div>
        </>

    )
}