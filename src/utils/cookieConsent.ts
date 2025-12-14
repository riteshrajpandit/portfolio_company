// Cookie Consent Utility Functions
// Industry-standard cookie management following GDPR/CCPA guidelines

export interface CookiePreferences {
  necessary: boolean // Always true - required for site functionality
  analytics: boolean // Google Analytics, tracking
  marketing: boolean // Marketing and advertising cookies
  preferences: boolean // User preference cookies (theme, language)
}

export interface ConsentRecord {
  preferences: CookiePreferences
  timestamp: string
  version: string
}

const CONSENT_KEY = 'ioxet_cookie_consent'
const CONSENT_VERSION = '1.0.0' // Increment when cookie policy changes

// Default preferences - only necessary cookies enabled
export const DEFAULT_PREFERENCES: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
  preferences: false,
}

// Check if user has given consent
export const hasConsent = (): boolean => {
  if (typeof window === 'undefined') return false
  const consent = localStorage.getItem(CONSENT_KEY)
  if (!consent) return false
  
  try {
    const record: ConsentRecord = JSON.parse(consent)
    // Check if consent version matches current version
    return record.version === CONSENT_VERSION
  } catch {
    return false
  }
}

// Get stored consent preferences
export const getConsentPreferences = (): CookiePreferences | null => {
  if (typeof window === 'undefined') return null
  const consent = localStorage.getItem(CONSENT_KEY)
  if (!consent) return null
  
  try {
    const record: ConsentRecord = JSON.parse(consent)
    return record.preferences
  } catch {
    return null
  }
}

// Save consent preferences
export const saveConsentPreferences = (preferences: CookiePreferences): void => {
  if (typeof window === 'undefined') return
  
  const record: ConsentRecord = {
    preferences: { ...preferences, necessary: true }, // Necessary is always true
    timestamp: new Date().toISOString(),
    version: CONSENT_VERSION,
  }
  
  localStorage.setItem(CONSENT_KEY, JSON.stringify(record))
  
  // Dispatch custom event for other components to react
  window.dispatchEvent(new CustomEvent('cookieConsentChange', { 
    detail: record.preferences 
  }))
}

// Accept all cookies
export const acceptAllCookies = (): void => {
  saveConsentPreferences({
    necessary: true,
    analytics: true,
    marketing: true,
    preferences: true,
  })
}

// Reject non-essential cookies (only necessary)
export const rejectNonEssentialCookies = (): void => {
  saveConsentPreferences({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false,
  })
}

// Check if specific cookie category is allowed
export const isCookieAllowed = (category: keyof CookiePreferences): boolean => {
  const preferences = getConsentPreferences()
  if (!preferences) return category === 'necessary'
  return preferences[category]
}

// Remove consent (for testing or user request)
export const revokeConsent = (): void => {
  if (typeof window === 'undefined') return
  localStorage.removeItem(CONSENT_KEY)
  
  // Dispatch event
  window.dispatchEvent(new CustomEvent('cookieConsentRevoked'))
}

// Cookie category descriptions for the UI
export const COOKIE_CATEGORIES = {
  necessary: {
    title: 'Necessary',
    description: 'Essential cookies required for the website to function properly. These cannot be disabled.',
    required: true,
  },
  analytics: {
    title: 'Analytics',
    description: 'Help us understand how visitors interact with our website by collecting anonymous usage data.',
    required: false,
  },
  marketing: {
    title: 'Marketing',
    description: 'Used to track visitors across websites to display relevant advertisements.',
    required: false,
  },
  preferences: {
    title: 'Preferences',
    description: 'Allow the website to remember your preferences like language and region.',
    required: false,
  },
}
