import { useStore } from "../../store"
import style from "./style.module.css"
import { defaultColumns } from "./components/Table"
import { Button, Switch } from "@hope-ui/solid"
import { AddIcon, CheckIcon, TrashIcon } from "@/assets/icons"
import Revenue from "./components/Revenue"
import ActionButton from "@/App/atoms/ActionButton"
import Table from "@/App/molecules/Table"
import { createEffect, createSignal } from "solid-js"


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

    const { dados } = useStore()
    const [rowSelection, setRowSelection] = createSignal({})

    createEffect(()=>{
        console.log(rowSelection())
    })

    return (
        <>
            <div class="paper mt-3">
                <h2>Transações</h2>
                <h3 class="mt-1">Resultado previsto no mês</h3>
                <Revenue data={defaultData} />
            </div>
            <div class="mt-3">
                <div class="flex items-center space-x-3">
                    <Button leftIcon={<AddIcon />}>Nova Transação</Button>
                    <ActionButton icon={<TrashIcon />} />
                </div>
                <div class="overflow-x-auto">
                    <Table rowSelection={rowSelection} setRowSelection={setRowSelection} data={defaultData} columns={defaultColumns} />
                </div>
            </div >
        </>

    )
}