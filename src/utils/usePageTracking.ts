import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { trackScrollDepth, trackTimeOnPage } from './analytics'

// Hook to track scroll depth
export const useScrollTracking = () => {
  const scrollTracked = useRef<Set<number>>(new Set())
  const location = useLocation()

  useEffect(() => {
    // Reset tracked percentages on route change
    scrollTracked.current.clear()

    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const scrollPercentage = Math.round((scrollTop / (documentHeight - windowHeight)) * 100)

      // Track at 25%, 50%, 75%, and 100%
      const milestones = [25, 50, 75, 100]
      
      for (const milestone of milestones) {
        if (scrollPercentage >= milestone && !scrollTracked.current.has(milestone)) {
          scrollTracked.current.add(milestone)
          trackScrollDepth(milestone)
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [location])
}

// Hook to track time spent on page
export const useTimeTracking = (pageName: string) => {
  const startTime = useRef<number>(Date.now())
  const location = useLocation()

  useEffect(() => {
    startTime.current = Date.now()

    return () => {
      const timeSpent = Math.round((Date.now() - startTime.current) / 1000)
      // Only track if user spent more than 5 seconds
      if (timeSpent >= 5) {
        trackTimeOnPage(pageName, timeSpent)
      }
    }
  }, [pageName, location])
}

// Combined hook for both tracking features
export const usePageTracking = (pageName: string) => {
  useScrollTracking()
  useTimeTracking(pageName)
}
