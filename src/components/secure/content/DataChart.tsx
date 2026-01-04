import { Box } from "@chakra-ui/react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import type { ChartData, ChartOptions } from 'chart.js'
import { Bar, Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
)

interface DataChartProps {
  type: 'bar' | 'line'
  data: ChartData<'bar' | 'line'>
  options?: ChartOptions<'bar' | 'line'>
}

export const DataChart = ({ type, data, options }: DataChartProps) => {
  const defaultOptions: ChartOptions<'bar' | 'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'rgba(255, 255, 255, 0.7)'
        }
      },
    },
    scales: {
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)'
        }
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)'
        }
      }
    },
    ...options
  }

  return (
    <Box h="300px" w="full" bg="whiteAlpha.50" p={4} borderRadius="xl">
      {type === 'bar' && <Bar data={data as ChartData<'bar'>} options={defaultOptions as ChartOptions<'bar'>} />}
      {type === 'line' && <Line data={data as ChartData<'line'>} options={defaultOptions as ChartOptions<'line'>} />}
    </Box>
  )
}
