// Google Analytics utility functions

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}

export const GA_TRACKING_ID = 'G-661LL04SJZ'

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window === 'undefined') return

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
    });
  `
  document.head.appendChild(script2)
}

// Track page views
export const trackPageView = (url: string) => {
  if (typeof window.gtag === 'undefined') return
  
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}

// Track events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window.gtag === 'undefined') return

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
