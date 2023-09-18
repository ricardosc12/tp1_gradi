import {
    flexRender,
    getCoreRowModel,
    ColumnDef,
    createSolidTable,
    SortingState
} from '@tanstack/solid-table'
import { createSignal, For } from 'solid-js'

type Person = {
    firstName: string
    lastName: string
    age: number
    visits: number
    status: string
    progress: number
}

const defaultData = [
    {
        firstName: 'tanner',
        lastName: 'linsley',
        age: 24,
        visits: 100,
        status: 'In Relationship',
        progress: 50,
    },
    {
        firstName: 'tandy',
        lastName: 'miller',
        age: 40,
        visits: 40,
        status: 'Single',
        progress: 80,
    },
    {
        firstName: 'joe',
        lastName: 'dirte',
        age: 45,
        visits: 20,
        status: 'Complicated',
        progress: 10,
    },
]

const defaultColumns: ColumnDef<Person>[] = [
    {
        accessorKey: 'firstName',
        cell: info => info.getValue(),
    },
    {
        accessorFn: row => row.lastName,
        id: 'lastName',
        cell: info => info.getValue(),
        header: () => <span>Last Name</span>,
    },
    {
        accessorKey: 'age',
        header: () => 'Age',
    },
    {
        accessorKey: 'visits',
        header: () => <span>Visits</span>,
    },
    {
        accessorKey: 'status',
        header: () => <span class='text-left'>Status</span>,
    },
    {
        accessorKey: 'progress',
        header: 'Profile Progress',
    },
]

export default function Table(props) {

    const [data, setData] = createSignal(defaultData)
    const [sorting, setSorting] = createSignal<SortingState>([])

    const table = createSolidTable({
        get data() {
            return data()
        },
        state: {
            sorting: sorting()
        },
        onSortingChange: setSorting,
        columns: defaultColumns,
        getCoreRowModel: getCoreRowModel(),
        columnResizeMode: 'onChange'
    })

    return (
        <div class="p-2">
            <table style={{ width: `${table.getCenterTotalSize()}px` }}>
                <thead>
                    <For each={table.getHeaderGroups()}>
                        {headerGroup => (
                            <tr>
                                <For each={headerGroup.headers}>
                                    {header => (

                                        <th class='text-left' style={{ width: `${header.getSize()}px` }}>
                                            <div
                                                {...{
                                                    class: header.column.getCanSort()
                                                        ? 'cursor-pointer select-none'
                                                        : '',
                                                    onClick: header.column.getToggleSortingHandler(),
                                                }}
                                            ></div>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                            {{
                                                asc: ' 🔼',
                                                desc: ' 🔽',
                                            }[header.column.getIsSorted() as string] ?? null}
                                        </th>
                                    )}
                                </For>
                            </tr>
                        )}
                    </For>
                </thead>
                <tbody>
                    <For each={table.getRowModel().rows}>
                        {row => (
                            <tr>
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