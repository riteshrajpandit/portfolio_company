import { Box, Text, VStack, SimpleGrid } from "@chakra-ui/react"
import { Doughnut } from "react-chartjs-2"
import { useRef, useEffect } from "react"
import { chartColors, formatNumber } from "@/utils/chartConfig"
import type { Chart, TooltipItem } from "chart.js"

interface MessagesChartProps {
  period: string
  month?: number
  year?: number
}

// Sample data - would come from API in production
const getMessagesByTool = () => ({
  labels: ["Zoom", "Google Meet", "Microsoft Teams", "Phone Call", "In-Person"],
  data: [145, 98, 67, 45, 23],
  colors: [
    chartColors.primary.main,
    chartColors.success.main,
    chartColors.warning.main,
    chartColors.danger.main,
    chartColors.purple.main,
  ],
})

const getMessagesByAgenda = () => ({
  labels: ["Job Application", "Interview Schedule", "Job Query", "Partnership", "General Inquiry"],
  data: [156, 89, 67, 34, 32],
  colors: [
    chartColors.success.main,
    chartColors.primary.main,
    chartColors.purple.main,
    chartColors.warning.main,
    chartColors.danger.main,
  ],
})

export const MessagesChart = ({ period, month, year }: MessagesChartProps) => {
  const toolChartRef = useRef<Chart<"doughnut">>(null)
  const agendaChartRef = useRef<Chart<"doughnut">>(null)

  const toolData = getMessagesByTool()
  const agendaData = getMessagesByAgenda()

  const totalMessages = toolData.data.reduce((acc, val) => acc + val, 0)

  useEffect(() => {
    // Charts will auto-render with configured colors
  }, [period, month, year])

  const createChartData = (labels: string[], data: number[], colors: string[]) => ({
    labels,
    datasets: [
      {
        data,
        backgroundColor: colors.map(color => color.replace('rgb', 'rgba').replace(')', ', 0.8)')),
        borderColor: colors,
        borderWidth: 2,
        hoverOffset: 8,
      },
    ],
  })

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'right' as const,
        labels: {
          usePointStyle: true,
          padding: 12,
          font: {
            size: 11,
            weight: 600,
          },
          generateLabels: (chart: Chart) => {
            const data = chart.data
            if (data.labels?.length && data.datasets.length) {
              return data.labels.map((label, i) => {
                const value = data.datasets[0].data[i] as number
                const total = (data.datasets[0].data as number[]).reduce((a, b) => a + b, 0)
                const percentage = ((value / total) * 100).toFixed(1)
                return {
                  text: `${label}: ${percentage}%`,
                  fillStyle: (data.datasets[0].backgroundColor as string[])[i],
                  hidden: false,
                  index: i,
                }
              })
            }
            return []
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 13,
          weight: 600,
        },
        bodyFont: {
          size: 12,
        },
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function(context: TooltipItem<"doughnut">) {
            const label = context.label || ''
            const value = context.parsed as number
            const total = (context.dataset.data as number[]).reduce((a: number, b: number) => a + b, 0)
            const percentage = ((value / total) * 100).toFixed(1)
            return `${label}: ${value} (${percentage}%)`
          }
        }
      }
    },
    cutout: '65%',
  }

  return (
    <Box>
      {/* Summary Stats */}
      <VStack align="flex-start" mb={4} gap={1}>
        <Text fontSize="xs" color="gray.600">
          Total Messages
        </Text>
        <Text fontSize="2xl" fontWeight="bold" color="gray.900">
          {formatNumber(totalMessages)}
        </Text>
      </VStack>

      {/* Charts Grid */}
      <SimpleGrid columns={{ base: 1, lg: 2 }} gap={6}>
        {/* Messages by Communication Tool */}
        <Box>
          <Text fontSize="sm" fontWeight="semibold" color="gray.700" mb={3}>
            Messages by Communication Tool
          </Text>
          <Box height="280px">
            <Doughnut
              ref={toolChartRef}
              data={createChartData(toolData.labels, toolData.data, toolData.colors)}
              options={chartOptions}
            />
          </Box>
        </Box>

        {/* Messages by Agenda */}
        <Box>
          <Text fontSize="sm" fontWeight="semibold" color="gray.700" mb={3}>
            Messages by Agenda Type
          </Text>
          <Box height="280px">
            <Doughnut
              ref={agendaChartRef}
              data={createChartData(agendaData.labels, agendaData.data, agendaData.colors)}
              options={chartOptions}
            />
          </Box>
        </Box>
      </SimpleGrid>
    </Box>
  )
}
