// This file provides utilities to work with Google Analytics data
// In a production environment, you would use Google Analytics Data API
// For now, we'll create mock data structures that match GA4 format

export interface AnalyticsData {
  visitors: {
    total: number
    change: string
  }
  pageViews: {
    total: number
    change: string
  }
  sessions: {
    total: number
    change: string
  }
  bounceRate: {
    rate: number
    change: string
  }
  topPages: Array<{
    path: string
    views: number
    change: number
  }>
  trafficSources: Array<{
    source: string
    visitors: number
    percentage: number
  }>
  deviceBreakdown: {
    mobile: number
    desktop: number
    tablet: number
  }
  timeSeriesData: Array<{
    date: string
    visitors: number
    pageViews: number
  }>
}

// Simulate fetching analytics data
// In production, replace this with actual Google Analytics Data API calls
export const fetchAnalyticsData = async (
  period: 'week' | 'month' | '3months' | '6months' | 'year',
  _month?: number,
  _year?: number
): Promise<AnalyticsData> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))

  // Generate realistic mock data based on period
  const now = new Date()
  const daysInPeriod = period === 'week' ? 7 : 
                       period === 'month' ? 30 :
                       period === '3months' ? 90 :
                       period === '6months' ? 180 : 365

  const timeSeriesData = []
  for (let i = daysInPeriod - 1; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    timeSeriesData.push({
      date: date.toISOString().split('T')[0],
      visitors: Math.floor(Math.random() * 200) + 100,
      pageViews: Math.floor(Math.random() * 400) + 200,
    })
  }

  return {
    visitors: {
      total: 12456,
      change: '+12.3%'
    },
    pageViews: {
      total: 34567,
      change: '+18.5%'
    },
    sessions: {
      total: 15678,
      change: '+10.2%'
    },
    bounceRate: {
      rate: 42.3,
      change: '-5.1%'
    },
    topPages: [
      { path: '/', views: 5432, change: 15 },
      { path: '/products', views: 3421, change: 23 },
      { path: '/services', views: 2876, change: -8 },
      { path: '/about', views: 2134, change: 12 },
      { path: '/contact', views: 1987, change: 18 },
    ],
    trafficSources: [
      { source: 'Direct', visitors: 5234, percentage: 42 },
      { source: 'Organic Search', visitors: 3876, percentage: 31 },
      { source: 'Social Media', visitors: 2123, percentage: 17 },
      { source: 'Referral', visitors: 1223, percentage: 10 },
    ],
    deviceBreakdown: {
      mobile: 45,
      desktop: 48,
      tablet: 7,
    },
    timeSeriesData,
  }
}

// Helper to format analytics numbers
export const formatAnalyticsNumber = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`
  }
  return num.toString()
}

// Helper to get change color
export const getChangeColor = (change: string): string => {
  const isPositive = change.startsWith('+')
  return isPositive ? 'green.500' : 'red.500'
}
