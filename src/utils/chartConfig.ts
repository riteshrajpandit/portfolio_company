// Chart.js configuration and utilities
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

// Color palette following best practices (accessible, distinct, professional)
export const chartColors = {
  primary: {
    main: 'rgb(59, 130, 246)', // Blue
    light: 'rgba(59, 130, 246, 0.1)',
    gradient: 'rgba(59, 130, 246, 0.5)',
  },
  success: {
    main: 'rgb(34, 197, 94)', // Green
    light: 'rgba(34, 197, 94, 0.1)',
    gradient: 'rgba(34, 197, 94, 0.5)',
  },
  warning: {
    main: 'rgb(251, 146, 60)', // Orange
    light: 'rgba(251, 146, 60, 0.1)',
    gradient: 'rgba(251, 146, 60, 0.5)',
  },
  danger: {
    main: 'rgb(239, 68, 68)', // Red
    light: 'rgba(239, 68, 68, 0.1)',
    gradient: 'rgba(239, 68, 68, 0.5)',
  },
  purple: {
    main: 'rgb(168, 85, 247)',
    light: 'rgba(168, 85, 247, 0.1)',
    gradient: 'rgba(168, 85, 247, 0.5)',
  },
  neutral: {
    main: 'rgb(107, 114, 128)',
    light: 'rgba(107, 114, 128, 0.1)',
    gradient: 'rgba(107, 114, 128, 0.5)',
  },
}

// Common chart options following best practices
export const baseChartOptions = {
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
          weight: '600' as const,
        },
      },
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      padding: 12,
      titleFont: {
        size: 13,
        weight: '600' as const,
      },
      bodyFont: {
        size: 12,
      },
      cornerRadius: 8,
      displayColors: true,
      intersect: false,
      mode: 'index' as const,
    },
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

// Generate gradient for line charts
export const createGradient = (ctx: CanvasRenderingContext2D, color: string) => {
  const gradient = ctx.createLinearGradient(0, 0, 0, 300)
  gradient.addColorStop(0, color)
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
  return gradient
}

// Time period options
export const timePeriods = [
  { value: 'week', label: 'Last 7 Days' },
  { value: 'month', label: 'Last 30 Days' },
  { value: '3months', label: 'Last 3 Months' },
  { value: '6months', label: 'Last 6 Months' },
  { value: 'year', label: 'Last Year' },
]

// Format numbers for display
export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`
  }
  return num.toString()
}

// Calculate percentage change
export const calculateChange = (current: number, previous: number): number => {
  if (previous === 0) return 100
  return Math.round(((current - previous) / previous) * 100)
}
