import Table from "@/App/molecules/Table"
import { ColumnDef } from "@tanstack/solid-table"

const Real = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
});

const defaultData = [
    {
        data: '23/09/2023',
        tipo: "receita",
        pago: true,
        descricao: "Curso - Enem",
        recebido_de: "Esposa",
        categoria: 'Estudo',
        valor: 50,
        tipo_pagamento: "Cartão"
    },
    {
        data: '23/09/2024',
        tipo: "receita",
        pago: true,
        descricao: "Conta de luz",
        recebido_de: "Esposa",
        categoria: 'Gasto Fixos',
        valor: 80,
        tipo_pagamento: "Dinheiro"
    },
    {
        data: '23/09/2023',
        tipo: "despesa",
        pago: false,
        descricao: "Netflix",
        recebido_de: '',
        categoria: 'Entreterimento',
        valor: 300,
        tipo_pagamento: "Boleto"
    },
]

const defaultColumns: ColumnDef<any>[] = [
    {
        accessorKey: 'data',
        header: "Data",
        cell: info => info.getValue(),
    },
    {
        accessorKey: 'tipo',
        header: "Tipo",
        cell: info => info.getValue(),
    },
    {
        accessorFn: row => row.pago,
        id: 'pago',
        cell: info => info.getValue()?"Sim":"Não",
        header: "Pago",
    },
    {
        accessorKey: 'descricao',
        header: () => 'Descrição',
    },
    {
        accessorKey: 'recebido_de',
        header: () => <span>Recebido de</span>,
    },
    {
        accessorKey: 'categoria',
        header: () => <span>Categoria</span>,
    },
    {
        accessorKey: 'valor',
        header: 'Valor',
        cell: info => <span>{Real.format(info.getValue() as number)}</span>
    },
    {
        accessorKey: 'tipo_pagamento',
        header: 'Tipo de pagamento',
    },
]

export function HomeTable() {
    return <Table data={defaultData} columns={defaultColumns} />
}