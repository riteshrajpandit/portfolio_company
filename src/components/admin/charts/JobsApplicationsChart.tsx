import { Box, Text, HStack, Icon, VStack, Spinner, Center } from "@chakra-ui/react"
import { Bar } from "react-chartjs-2"
import { useRef, useEffect, useState } from "react"
import { HiBriefcase, HiUsers } from "react-icons/hi"
import { chartColors, createGradient, formatNumber } from "@/utils/chartConfig"
import { apiService } from "@/services/api"
import type { Chart, TooltipItem } from "chart.js"

interface JobsApplicationsChartProps {
  period: string
  month?: number
  year?: number
}

// Aggregate real data by time period
const aggregateDataByPeriod = (
  jobs: Array<{ posted_at?: string }>,
  applications: Array<{ created_at?: string }>,
  period: string,
  month?: number,
  year?: number
) => {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  
  if (period === 'week') {
    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    const jobsPosted = new Array(7).fill(0)
    const applicationsCount = new Array(7).fill(0)
    
    const now = new Date()
    const weekStart = new Date(now)
    weekStart.setDate(now.getDate() - now.getDay() + 1) // Monday
    
    jobs.forEach(job => {
      if (job.posted_at) {
        const date = new Date(job.posted_at)
        const dayDiff = Math.floor((date.getTime() - weekStart.getTime()) / (1000 * 60 * 60 * 24))
        if (dayDiff >= 0 && dayDiff < 7) jobsPosted[dayDiff]++
      }
    })
    
    applications.forEach(app => {
      if (app.created_at) {
        const date = new Date(app.created_at)
        const dayDiff = Math.floor((date.getTime() - weekStart.getTime()) / (1000 * 60 * 60 * 24))
        if (dayDiff >= 0 && dayDiff < 7) applicationsCount[dayDiff]++
      }
    })
    
    return { labels, jobsPosted, applications: applicationsCount }
  }
  
  if (period === 'month') {
    const currentMonth = month !== undefined ? month : new Date().getMonth()
    const currentYear = year !== undefined ? year : new Date().getFullYear()
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
    const labels = Array.from({ length: daysInMonth }, (_, i) => `${monthNames[currentMonth]} ${i + 1}`)
    const jobsPosted = new Array(daysInMonth).fill(0)
    const applicationsCount = new Array(daysInMonth).fill(0)
    
    jobs.forEach(job => {
      if (job.posted_at) {
        const date = new Date(job.posted_at)
        if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
          jobsPosted[date.getDate() - 1]++
        }
      }
    })
    
    applications.forEach(app => {
      if (app.created_at) {
        const date = new Date(app.created_at)
        if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
          applicationsCount[date.getDate() - 1]++
        }
      }
    })
    
    return { labels, jobsPosted, applications: applicationsCount }
  }
  
  if (period === 'year') {
    const currentYear = year !== undefined ? year : new Date().getFullYear()
    const labels = monthNames
    const jobsPosted = new Array(12).fill(0)
    const applicationsCount = new Array(12).fill(0)
    
    jobs.forEach(job => {
      if (job.posted_at) {
        const date = new Date(job.posted_at)
        if (date.getFullYear() === currentYear) {
          jobsPosted[date.getMonth()]++
        }
      }
    })
    
    applications.forEach(app => {
      if (app.created_at) {
        const date = new Date(app.created_at)
        if (date.getFullYear() === currentYear) {
          applicationsCount[date.getMonth()]++
        }
      }
    })
    
    return { labels, jobsPosted, applications: applicationsCount }
  }
  
  // Default: last 6 months
  const labels = []
  const jobsPosted = []
  const applicationsCount = []
  const now = new Date()
  
  for (let i = 5; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
    labels.push(monthNames[date.getMonth()])
    
    const monthJobs = jobs.filter(job => {
      if (!job.posted_at) return false
      const jobDate = new Date(job.posted_at)
      return jobDate.getMonth() === date.getMonth() && jobDate.getFullYear() === date.getFullYear()
    }).length
    
    const monthApps = applications.filter(app => {
      if (!app.created_at) return false
      const appDate = new Date(app.created_at)
      return appDate.getMonth() === date.getMonth() && appDate.getFullYear() === date.getFullYear()
    }).length
    
    jobsPosted.push(monthJobs)
    applicationsCount.push(monthApps)
  }
  
  return { labels, jobsPosted, applications: applicationsCount }
}

export const JobsApplicationsChart = ({ period, month, year }: JobsApplicationsChartProps) => {
  const chartRef = useRef<Chart<"bar">>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [chartData, setChartData] = useState<{
    labels: string[]
    jobsPosted: number[]
    applications: number[]
  }>({ labels: [], jobsPosted: [], applications: [] })
  
  useEffect(() => {
    fetchData()
  }, [period, month, year])
  
  const fetchData = async () => {
    try {
      setIsLoading(true)
      const [jobsResponse, applicationsResponse] = await Promise.all([
        apiService.getCareers(),
        apiService.getJobApplications()
      ])
      
      const aggregated = aggregateDataByPeriod(
        jobsResponse.data,
        applicationsResponse.data,
        period,
        month,
        year
      )
      
      setChartData(aggregated)
    } catch (error) {
      console.error('Failed to fetch jobs/applications data:', error)
      // Fallback to empty data
      setChartData({ labels: [], jobsPosted: [], applications: [] })
    } finally {
      setIsLoading(false)
    }
  }
  
  const { labels, jobsPosted, applications } = chartData

  // Calculate statistics
  const totalJobs = jobsPosted.reduce((acc: number, val: number) => acc + val, 0)
  const totalApplications = applications.reduce((acc: number, val: number) => acc + val, 0)
  const avgApplicationsPerJob = totalJobs > 0 ? (totalApplications / totalJobs).toFixed(1) : '0'

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

  if (isLoading) {
    return (
      <Center py={20}>
        <Spinner size="xl" color="primary.500" />
      </Center>
    )
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
