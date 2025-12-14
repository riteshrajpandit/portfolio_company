// Google Analytics utility functions
// Respects user cookie consent preferences

import { isCookieAllowed, hasConsent, getConsentPreferences } from './cookieConsent'

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
    gaInitialized?: boolean
  }
}

export const GA_TRACKING_ID = 'G-661LL04SJZ'

// Initialize Google Analytics (only if consent given)
export const initGA = () => {
  if (typeof window === 'undefined') return
  
  // Check if analytics cookies are allowed
  if (!hasConsent() || !isCookieAllowed('analytics')) {
    // Set up listener for consent changes
    window.addEventListener('cookieConsentChange', handleConsentChange as EventListener)
    return
  }

  loadGoogleAnalytics()
}

// Handle consent changes
const handleConsentChange = (event: CustomEvent) => {
  const preferences = event.detail
  if (preferences.analytics && !window.gaInitialized) {
    loadGoogleAnalytics()
  }
}

// Load Google Analytics scripts
const loadGoogleAnalytics = () => {
  if (window.gaInitialized) return
  
  // Create script elements
  const script1 = document.createElement('script')
  script1.async = true
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`
  document.head.appendChild(script1)

  const script2 = document.createElement('script')
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_TRACKING_ID}', {
      page_path: window.location.pathname,
      anonymize_ip: true
    });
  `
  document.head.appendChild(script2)
  
  window.gaInitialized = true
}

// Check if analytics is enabled before tracking
const isAnalyticsEnabled = (): boolean => {
  return hasConsent() && isCookieAllowed('analytics') && typeof window.gtag !== 'undefined'
}

// Track page views
export const trackPageView = (url: string) => {
  if (!isAnalyticsEnabled()) return
  
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}

// Track events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (!isAnalyticsEnabled()) return

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}

// Track specific events
export const trackButtonClick = (buttonName: string, location: string) => {
  trackEvent('click', 'Button', `${buttonName} - ${location}`)
}

export const trackFormSubmit = (formName: string) => {
  trackEvent('submit', 'Form', formName)
}

export const trackLinkClick = (linkName: string, url: string) => {
  trackEvent('click', 'External Link', `${linkName} - ${url}`)
}

export const trackProductView = (productName: string) => {
  trackEvent('view', 'Product', productName)
}

export const trackServiceView = (serviceName: string) => {
  trackEvent('view', 'Service', serviceName)
}

export const trackCareerApplication = (position: string) => {
  trackEvent('apply', 'Career', position)
}

export const trackContactFormSubmit = () => {
  trackEvent('submit', 'Contact Form', 'Contact Page')
}

export const trackNewsletterSignup = () => {
  trackEvent('signup', 'Newsletter', 'Footer')
}

// Track time on page
export const trackTimeOnPage = (pageName: string, timeInSeconds: number) => {
  trackEvent('time_on_page', 'Engagement', pageName, timeInSeconds)
}

// Track scroll depth
export const trackScrollDepth = (percentage: number) => {
  trackEvent('scroll', 'Engagement', `Scroll Depth: ${percentage}%`, percentage)
}
