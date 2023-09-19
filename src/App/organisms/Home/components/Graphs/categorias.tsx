import { onMount } from 'solid-js'
import { Chart, registerables } from 'chart.js';
import { Pie } from 'solid-chartjs'
import { ChartData } from 'chart.js'

const PieGraph = (props) => {

    onMount(() => {
        Chart.register(...registerables)
    })

    const chartData: ChartData = {
        labels: props.labels,
        datasets: [
            {
                get data() {
                    return props.data
                },
            },
        ],
    }
    const chartOptions = {
        responsive: true,
        scales: {
            r: {
                pointLabels: {
                    display: true,
                    centerPointLabels: true,
                    font: {
                        size: 18
                    }
                }
            }
        },
        plugins: {
            title: {
                display: !!props.title,
                text: props.title,
                color: props.titleColor,
            },
            legend: {
                position: 'none'
            }
        }
        // plugins: {
        //     legend: {
        //         position: 'none',
        //     },
        //     tooltip: {
        //         enabled: true,
        //         external: function (context) {
        //             console.log(context)
        //         }
        //     }
        // },
        // scales: {
        //     x: {
        //         ticks: {
        //             color: [
        //                 '#39c763',
        //                 '#39c763',
        //                 '#b83232',
        //                 '#39c763',
        //                 '#b83232',
        //                 '#39c763',
        //             ]
        //         }
        //     }
        // }
    }

    return (
        <Pie data={chartData} options={chartOptions} />
    )
}

export { PieGraph }