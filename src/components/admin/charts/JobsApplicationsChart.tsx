import { Box, Text, HStack, Icon, VStack } from "@chakra-ui/react"
import { Bar } from "react-chartjs-2"
import { useRef, useEffect } from "react"
import { HiBriefcase, HiUsers } from "react-icons/hi"
import { chartColors, createGradient, formatNumber } from "@/utils/chartConfig"
import type { Chart, TooltipItem } from "chart.js"

interface JobsApplicationsChartProps {
  period: string
  month?: number
  year?: number
}

const generateJobsData = (period: string, month?: number, year?: number) => {
  // Get number of days in the selected month
  const getDaysInMonth = (m: number, y: number) => {
    return new Date(y, m + 1, 0).getDate()
  }
  
  // Format date as "Jan 15" or "15"
  const formatDate = (day: number, monthNum: number) => {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return `${monthNames[monthNum]} ${day}`
  }
  
  switch (period) {
    case "week":
      return {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        jobsPosted: [5, 8, 6, 12, 9, 3, 4],
        applications: [23, 45, 32, 67, 54, 18, 21],
      }
    case "month": {
      const currentMonth = month !== undefined ? month : new Date().getMonth()
      const currentYear = year !== undefined ? year : new Date().getFullYear()
      const daysInMonth = getDaysInMonth(currentMonth, currentYear)
      const days = Array.from({ length: daysInMonth }, (_, i) => formatDate(i + 1, currentMonth))
      return {
        labels: days,
        jobsPosted: Array.from({ length: daysInMonth }, () => Math.floor(Math.random() * 15) + 3),
        applications: Array.from({ length: daysInMonth }, () => Math.floor(Math.random() * 80) + 20),
      }
    }
    case "year":
      return {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        jobsPosted: [45, 52, 48, 63, 58, 51, 49, 55, 62, 68, 71, 66],
        applications: [234, 289, 256, 345, 312, 278, 267, 301, 334, 367, 389, 356],
      }
    default:
      return {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        jobsPosted: [45, 52, 48, 63, 58, 51],
        applications: [234, 289, 256, 345, 312, 278],
      }
  }
}

export const JobsApplicationsChart = ({ period, month, year }: JobsApplicationsChartProps) => {
  const chartRef = useRef<Chart<"bar">>(null)
  const { labels, jobsPosted, applications } = generateJobsData(period, month, year)

  // Calculate statistics
  const totalJobs = jobsPosted.reduce((acc, val) => acc + val, 0)
  const totalApplications = applications.reduce((acc, val) => acc + val, 0)
  const avgApplicationsPerJob = (totalApplications / totalJobs).toFixed(1)

  useEffect(() => {
    if (chartRef.current) {
      const chart = chartRef.current
      const ctx = chart.ctx

      // Apply gradients to datasets
      if (chart.data.datasets[0]) {
        chart.data.datasets[0].backgroundColor = createGradient(ctx, chartColors.primary.main)
        chart.data.datasets[0].hoverBackgroundColor = chartColors.primary.main
      }
      if (chart.data.datasets[1]) {
        chart.data.datasets[1].backgroundColor = createGradient(ctx, chartColors.success.main)
        chart.data.datasets[1].hoverBackgroundColor = chartColors.success.main
      }
      chart.update()
    }
  }, [period, month, year])

  const data = {
    labels,
    datasets: [
      {
        label: "Jobs Posted",
        data: jobsPosted,
        backgroundColor: chartColors.primary.light,
        borderColor: chartColors.primary.main,
        borderWidth: 2,
        borderRadius: 6,
        maxBarThickness: 40,
      },
      {
        label: "Applications Received",
        data: applications,
        backgroundColor: chartColors.success.light,
        borderColor: chartColors.success.main,
        borderWidth: 2,
        borderRadius: 6,
        maxBarThickness: 40,
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
          label: function(context: TooltipItem<"bar">) {
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
      {/* Statistics Summary */}
      <HStack mb={4} gap={6}>
        <VStack align="flex-start" gap={0}>
          <HStack>
            <Icon fontSize="sm" color="blue.500">
              <HiBriefcase />
            </Icon>
            <Text fontSize="xs" color="gray.600">
              Total Jobs
            </Text>
          </HStack>
          <Text fontSize="2xl" fontWeight="bold" color="gray.900">
            {formatNumber(totalJobs)}
          </Text>
        </VStack>

        <VStack align="flex-start" gap={0}>
          <HStack>
            <Icon fontSize="sm" color="green.500">
              <HiUsers />
            </Icon>
            <Text fontSize="xs" color="gray.600">
              Total Applications
            </Text>
          </HStack>
          <Text fontSize="2xl" fontWeight="bold" color="gray.900">
            {formatNumber(totalApplications)}
          </Text>
        </VStack>

        <VStack align="flex-start" gap={0}>
          <Text fontSize="xs" color="gray.600">
            Avg. Applications/Job
          </Text>
          <Text fontSize="2xl" fontWeight="bold" color="purple.600">
            {avgApplicationsPerJob}
          </Text>
        </VStack>
      </HStack>

      {/* Chart */}
      <Box height="300px">
        <Bar ref={chartRef} data={data} options={options} />
      </Box>
    </Box>
  )
}
