import { Box, Text, VStack, SimpleGrid, Spinner, Center } from "@chakra-ui/react"
import { Doughnut } from "react-chartjs-2"
import { useRef, useEffect, useState } from "react"
import { chartColors, formatNumber } from "@/utils/chartConfig"
import { apiService, type Message } from "@/services/api"
import type { Chart, TooltipItem } from "chart.js"

interface MessagesChartProps {
  period: string
  month?: number
  year?: number
}

// Aggregate messages by meeting tool
const aggregateByMeetingTool = (messages: Message[]) => {
  const toolCounts: Record<string, number> = {}
  
  messages.forEach(msg => {
    const tool = msg.meeting_tool || 'unknown'
    toolCounts[tool] = (toolCounts[tool] || 0) + 1
  })
  
  const sortedTools = Object.entries(toolCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
  
  return {
    labels: sortedTools.map(([tool]) => {
      // Capitalize and format tool names
      return tool.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    }),
    data: sortedTools.map(([, count]) => count),
    colors: [
      chartColors.primary.main,
      chartColors.success.main,
      chartColors.warning.main,
      chartColors.danger.main,
      chartColors.purple.main,
    ],
  }
}

// Aggregate messages by agenda
const aggregateByAgenda = (messages: Message[]) => {
  const agendaCounts: Record<string, number> = {}
  
  messages.forEach(msg => {
    const agenda = msg.agenda || 'unknown'
    agendaCounts[agenda] = (agendaCounts[agenda] || 0) + 1
  })
  
  const sortedAgendas = Object.entries(agendaCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
  
  return {
    labels: sortedAgendas.map(([agenda]) => {
      // Capitalize and format agenda names
      return agenda.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    }),
    data: sortedAgendas.map(([, count]) => count),
    colors: [
      chartColors.success.main,
      chartColors.primary.main,
      chartColors.purple.main,
      chartColors.warning.main,
      chartColors.danger.main,
    ],
  }
}

export const MessagesChart = ({ period, month, year }: MessagesChartProps) => {
  const toolChartRef = useRef<Chart<"doughnut">>(null)
  const agendaChartRef = useRef<Chart<"doughnut">>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [messages, setMessages] = useState<Message[]>([])
  
  useEffect(() => {
    fetchMessages()
  }, [period, month, year])
  
  const fetchMessages = async () => {
    try {
      setIsLoading(true)
      const response = await apiService.getMessages()
      
      // Filter messages based on period
      const filtered = response.data.filter(msg => {
        if (!msg.created_at) return false
        const msgDate = new Date(msg.created_at)
        const now = new Date()
        
        if (period === 'week') {
          const weekStart = new Date(now)
          weekStart.setDate(now.getDate() - now.getDay() + 1)
          return msgDate >= weekStart && msgDate <= now
        }
        
        if (period === 'month') {
          const currentMonth = month !== undefined ? month : now.getMonth()
          const currentYear = year !== undefined ? year : now.getFullYear()
          return msgDate.getMonth() === currentMonth && msgDate.getFullYear() === currentYear
        }
        
        if (period === 'year') {
          const currentYear = year !== undefined ? year : now.getFullYear()
          return msgDate.getFullYear() === currentYear
        }
        
        // Default: last 6 months
        const sixMonthsAgo = new Date(now)
        sixMonthsAgo.setMonth(now.getMonth() - 6)
        return msgDate >= sixMonthsAgo
      })
      
      setMessages(filtered)
    } catch (error) {
      console.error('Failed to fetch messages:', error)
      setMessages([])
    } finally {
      setIsLoading(false)
    }
  }

  const toolData = aggregateByMeetingTool(messages)
  const agendaData = aggregateByAgenda(messages)
  const totalMessages = messages.length

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

  if (isLoading) {
    return (
      <Center py={20}>
        <Spinner size="xl" color="primary.500" />
      </Center>
    )
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
