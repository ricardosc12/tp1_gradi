import { onMount } from 'solid-js'
import { Chart, registerables } from 'chart.js';
import { Bar } from 'solid-chartjs'
import { ChartData } from 'chart.js'

const Graph = () => {
    onMount(() => {
        Chart.register(...registerables)
    })

    const chartData: ChartData = {
        labels: ['Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro'],
        datasets: [
            {
                label: 'Receitas',
                data: [7550, 11500, 3310, 13030, 1800, 5340],
                backgroundColor: "rgba(64, 255, 121, 0.5)",
            },
            {
                label: 'Gastos',
                data: [-3000, -6590, -4300, -5540, -5300, -2300],
                backgroundColor: "rgba(255, 64, 64, 0.5)",
            },
            {
                label: 'Lucro',
                data: [4550, 4910, -990, 7490, -3500, 3040],
                backgroundColor: "rgba(64, 210, 255, 1)",
                borderColor: 'rgba(64, 210, 255, 1)',
                tension: 0.4,
                type: "line"
            },
        ],
    }
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'none',
            },
            tooltip: {
                enabled: true,
                external: function (context) {
                    console.log(context)
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: [
                        '#39c763',
                        '#39c763',
                        '#b83232',
                        '#39c763',
                        '#b83232',
                        '#39c763',
                    ]
                }
            }
        }
    }

    return (
        <Bar data={chartData} options={chartOptions} />
    )
}

export { Graph }