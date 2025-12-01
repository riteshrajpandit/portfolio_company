import { Box, Text, HStack, Icon, VStack } from "@chakra-ui/react"
import { Line } from "react-chartjs-2"
import { useRef, useEffect, useState } from "react"
import { HiTrendingUp, HiTrendingDown } from "react-icons/hi"
import { chartColors, createGradient } from "@/utils/chartConfig"
import type { Chart, TooltipItem } from "chart.js"

interface VisitorsChartProps {
  period: string
  month?: number
  year?: number
}

// Sample data - replace with actual API data
const generateVisitorsData = (period: string, month?: number, year?: number) => {
  // Get number of days in the selected month
  const getDaysInMonth = (m: number, y: number) => {
    return new Date(y, m + 1, 0).getDate()
  }
  
  // Format date as "Jan 15"
  const formatDate = (day: number, monthNum: number) => {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return `${monthNames[monthNum]} ${day}`
  }

  if (period === 'week') {
    return {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      visitors: [1250, 1420, 1380, 1650, 1890, 2100, 1950],
      uniqueVisitors: [980, 1120, 1050, 1280, 1450, 1680, 1520]
    }
  } else if (period === 'month') {
    const currentMonth = month !== undefined ? month : new Date().getMonth()
    const currentYear = year !== undefined ? year : new Date().getFullYear()
    const daysInMonth = getDaysInMonth(currentMonth, currentYear)
    const days = Array.from({ length: daysInMonth }, (_, i) => formatDate(i + 1, currentMonth))
    return {
      labels: days,
      visitors: Array.from({ length: daysInMonth }, () => Math.floor(Math.random() * 1000) + 1000),
      uniqueVisitors: Array.from({ length: daysInMonth }, () => Math.floor(Math.random() * 800) + 700)
    }
  } else {
    return {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      visitors: [8500, 9200, 10100, 11500, 10800, 12200, 13500, 14200, 13800, 15100, 14500, 16200],
      uniqueVisitors: [6800, 7400, 8200, 9300, 8700, 9900, 11000, 11500, 11200, 12300, 11800, 13200]
    }
  }
}

export const VisitorsChart = ({ period, month, year }: VisitorsChartProps) => {
  const chartRef = useRef<Chart<"line">>(null)
  const [showGANote] = useState(true)
  const { labels, visitors, uniqueVisitors } = generateVisitorsData(period, month, year)
  const gaTrackingId = import.meta.env.VITE_GA_TRACKING_ID

  // Calculate statistics
  const totalVisitors = visitors.reduce((a, b) => a + b, 0)
  const avgVisitors = Math.round(totalVisitors / visitors.length)
  const currentPeriod = visitors.slice(-7).reduce((a, b) => a + b, 0)
  const previousPeriod = visitors.slice(-14, -7).reduce((a, b) => a + b, 0)
  const change = previousPeriod > 0 
    ? Math.round(((currentPeriod - previousPeriod) / previousPeriod) * 100)
    : 100

  useEffect(() => {
    const chart = chartRef.current
    if (chart) {
      const ctx = chart.ctx
      const gradient1 = createGradient(ctx, chartColors.primary.gradient)
      const gradient2 = createGradient(ctx, chartColors.success.gradient)
      
      chart.data.datasets[0].backgroundColor = gradient1
      chart.data.datasets[1].backgroundColor = gradient2
      chart.update()
    }
  }, [period, month, year])

  const data = {
    labels,
    datasets: [
      {
        label: 'Total Visitors',
        data: visitors,
        borderColor: chartColors.primary.main,
        backgroundColor: chartColors.primary.gradient,
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: chartColors.primary.main,
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 2,
      },
      {
        label: 'Unique Visitors',
        data: uniqueVisitors,
        borderColor: chartColors.success.main,
        backgroundColor: chartColors.success.gradient,
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: chartColors.success.main,
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 2,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 15,
          font: {
            size: 12,
            weight: 600,
          },
        },
      },
      title: {
        display: false,
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
        intersect: false,
        mode: 'index' as const,
        callbacks: {
          label: function(context: TooltipItem<"line">) {
            return `${context.dataset.label}: ${context.parsed.y?.toLocaleString() || 0}`
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
          },
          color: 'rgb(107, 114, 128)',
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
          drawBorder: false,
        },
        ticks: {
          font: {
            size: 11,
          },
          color: 'rgb(107, 114, 128)',
          padding: 8,
        },
      },
    },
  }

  return (
    <Box>
      {/* Google Analytics Integration Notice */}
      {showGANote && (
        <Box
          mb={4}
          p={4}
          bg="blue.50"
          borderRadius="lg"
          border="1px solid"
          borderColor="blue.200"
        >
          <Text fontSize="sm" fontWeight="600" color="blue.800" mb={1}>
            ℹ️ Visitor Tracking
          </Text>
          <Text fontSize="sm" color="blue.700">
            {gaTrackingId ? (
              <>Google Analytics is configured (ID: {gaTrackingId}). The chart below shows sample data. To display real visitor data, integrate the Google Analytics Data API with your backend.</>
            ) : (
              <>Configure Google Analytics tracking ID in .env (VITE_GA_TRACKING_ID) to start tracking visitors. Then integrate the GA4 Data API to display real data here.</>
            )}
          </Text>
        </Box>
      )}
      
      {/* Statistics Summary */}
      <HStack justify="space-between" mb={6} flexWrap="wrap" gap={4}>
        <VStack align="start" gap={0}>
          <Text fontSize="xs" color="neutral.600" fontWeight="600" textTransform="uppercase">
            Total Visitors
          </Text>
          <Text fontSize="2xl" fontWeight="700" color="neutral.900">
            {totalVisitors.toLocaleString()}
          </Text>
        </VStack>
        <VStack align="start" gap={0}>
          <Text fontSize="xs" color="neutral.600" fontWeight="600" textTransform="uppercase">
            Avg per Day
          </Text>
          <Text fontSize="2xl" fontWeight="700" color="neutral.900">
            {avgVisitors.toLocaleString()}
          </Text>
        </VStack>
        <VStack align="start" gap={0}>
          <Text fontSize="xs" color="neutral.600" fontWeight="600" textTransform="uppercase">
            Trend
          </Text>
          <HStack gap={1}>
            <Icon 
              as={change >= 0 ? HiTrendingUp : HiTrendingDown} 
              color={change >= 0 ? "green.500" : "red.500"}
              fontSize="lg"
            />
            <Text 
              fontSize="2xl" 
              fontWeight="700" 
              color={change >= 0 ? "green.500" : "red.500"}
            >
              {Math.abs(change)}%
            </Text>
          </HStack>
        </VStack>
      </HStack>

      {/* Chart */}
      <Box h="300px">
        <Line ref={chartRef} data={data} options={options} />
      </Box>
    </Box>
  )
}
