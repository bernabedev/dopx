import type { Chart as ChartType } from 'chart.js'
import { formatDate } from './utils'

let rateChart: ChartType | undefined
export function updateChart(
  $chartContainer: HTMLCanvasElement,
  historicalData: {
    date: string
    purchaseValue: number
    sellingValue: number
  }[]
) {
  // Extraer datos para el gráfico
  const dates = historicalData.map((item) => formatDate(item.date))
  const purchaseValues = historicalData.map((item) => item.purchaseValue)
  const sellingValues = historicalData.map((item) => item.sellingValue)

  // Si ya existe un gráfico, destruirlo
  if (rateChart) {
    rateChart.destroy()
  }

  // Crear un nuevo gráfico
  // @ts-ignore
  rateChart = new Chart($chartContainer, {
    type: 'line',
    data: {
      labels: dates,
      datasets: [
        {
          label: 'Tasa de Compra',
          data: purchaseValues,
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.1,
          fill: true
        },
        {
          label: 'Tasa de Venta',
          data: sellingValues,
          borderColor: 'rgb(16, 185, 129)',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          tension: 0.1,
          fill: true
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top'
        },
        tooltip: {
          mode: 'index',
          intersect: false
        }
      },
      scales: {
        y: {
          beginAtZero: false,
          ticks: {
            callback: function (value: number) {
              return value.toFixed(2)
            }
          }
        }
      },
      interaction: {
        mode: 'nearest',
        axis: 'x',
        intersect: false
      }
    }
  })
}
