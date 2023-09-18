import ActionButton from "@/App/atoms/ActionButton";
import Table from "@/App/molecules/Table"
import { BoletoIcon, CardIcon, MoneyDownIcon, MoneyIcon, MoneyUpIcon, PixIcon } from "@/assets/icons";
import { Checkbox, Switch } from "@hope-ui/solid";
import { ColumnDef } from "@tanstack/solid-table"

export const Real = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
});

const tipos_pagamento = {
    Boleto: BoletoIcon,
    Dinheiro: MoneyIcon,
    Cartão: CardIcon,
    Pix: PixIcon,
}

const tipos_despesa = {
    receita: MoneyUpIcon,
    despesa: MoneyDownIcon
}

export const defaultColumns: ColumnDef<any>[] = [
    {
        accessorKey: 'data',
        header: ({ table }) => (
            <Checkbox {...{
                checked: table.getIsAllRowsSelected(),
                indeterminate: table.getIsSomeRowsSelected(),
                onChange: table.getToggleAllRowsSelectedHandler()
            }} />
        ),
        cell: ({ row }) => (
            <Checkbox
                {...{
                    checked: row.getIsSelected(),
                    disabled: !row.getCanSelect(),
                    indeterminate: row.getIsSomeSelected(),
                    onChange: row.getToggleSelectedHandler(),
                }}
            />
        ),
        enableSorting: false,
        size: 10
    },
    {
        accessorKey: 'data',
        header: "Data",
        cell: info => info.getValue(),
    },
    {
        accessorFn: row => row.pago,
        id: 'pago',
        cell: info => <Switch class="-ml-2" defaultChecked={info.getValue() as boolean} />,
        header: "Pago",
    },
    {
        accessorKey: 'descricao',
        header: () => 'Descrição',
        size: 200
    },
    {
        accessorKey: 'origem',
        header: () => <span>Origem</span>,
    },
    {
        accessorKey: 'categoria',
        header: () => <span>Categoria</span>,
    },
    {
        accessorKey: 'tipo',
        header: "Tipo",
        cell: info => <ActionButton
            color={info.getValue() == 'despesa' ? 'vermelhinho' : 'verdinho'}
            title={info.getValue() as string}
            icon={tipos_despesa[info.getValue() as string]}
        />,
        size: 50
    },
    {
        accessorKey: 'valor',
        header: 'Valor',
        cell: info => (
            <span class="font-medium" style={{ color: info.row.original.tipo == 'despesa' ? "var(--vermelho)" : "var(--verde-dark)" }}>
                {info.row.original.tipo == 'despesa' ? '-' : '+'} {Real.format(info.getValue() as number)}
            </span>
        )
    },
    {
        accessorKey: 'tipo_pagamento',
        header: 'Tipo de pagamento',
        cell: info => (
            <div class="flex space-x-3">
                <span><ActionButton title={info.getValue() as string} size="small" icon={tipos_pagamento[info.getValue() as string]} /></span>
                <p>{info.getValue() as string}</p>
            </div>
        ),
        size: 250
    },
]