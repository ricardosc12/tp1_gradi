import {
    flexRender,
    getCoreRowModel,
    ColumnDef,
    createSolidTable,
    SortingState,
    getSortedRowModel,
    RowSelectionState,
    OnChangeFn
} from '@tanstack/solid-table'
import { createSignal, For } from 'solid-js'
import { ArrowIcon } from '../../../assets/icons'
import style from './style.module.css'

interface TableProps {
    data: any;
    columns: ColumnDef<any>[];
    rowSelection?: Function;
    setRowSelection?: OnChangeFn<RowSelectionState>
}

export default function Table(props: TableProps) {

    const [sorting, setSorting] = createSignal<SortingState>([])

    const table = createSolidTable({
        get data() {
            return props.data
        },
        state: {
            get sorting() {
                return sorting()
            },
            get rowSelection() {
                return props.rowSelection()
            }
        },
        onRowSelectionChange: props.setRowSelection,
        enableRowSelection: true,
        onSortingChange: setSorting,
        columns: props.columns || [],
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        columnResizeMode: 'onChange'
    })

    return (
        <div class='pl-3'>
            <table class={style.table} style={{ width: `${table.getCenterTotalSize()}px` }}>
                <thead>
                    <For each={table.getHeaderGroups()}>
                        {headerGroup => (
                            <tr>
                                <For each={headerGroup.headers}>
                                    {header => (
                                        <th class='text-left select-none' style={{ width: `${header.getSize()}px` }} onClick={header.column.getToggleSortingHandler()}>
                                            <div class='flex items-center text'>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                                <Icon sort={header.column.getIsSorted()} />
                                            </div>
                                        </th>
                                    )
                                    }
                                </For>
                            </tr>
                        )}
                    </For>
                </thead>
                <tbody>
                    <For each={table.getRowModel().rows}>
                        {row => (
                            <tr class={`${row.getIsSelected()?"active":""}`}>
                                <For each={row.getVisibleCells()}>
                                    {cell => (
                                        <td class='text-left' style={{ width: `${cell.column.getSize()}px` }}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </td>
                                    )}
                                </For>
                            </tr>
                        )}
                    </For>
                </tbody>
            </table>
        </div>
    )
}

const Icon = (props) => {
    return (
        <div class={style.icon_sort}>
            <ArrowIcon class={props.sort == 'desc' ? "opacity-0" : ''} />
            <ArrowIcon class={props.sort == 'asc' ? "opacity-0" : ''} />
        </div>
    )
}