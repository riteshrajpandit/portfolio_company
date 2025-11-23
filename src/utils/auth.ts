// Authentication utilities with security best practices

interface AuthUser {
  token: string
  user_id: number
  username: string
}

const TOKEN_KEY = 'admin_token'
const USER_KEY = 'admin_user'
const USER_ID_KEY = 'admin_user_id'

// Token expiration time (24 hours in milliseconds)
const TOKEN_EXPIRY_KEY = 'admin_token_expiry'
const TOKEN_EXPIRY_DURATION = 24 * 60 * 60 * 1000

export const authUtils = {
  // Store authentication data securely
  setAuth(data: AuthUser): void {
    try {
      localStorage.setItem(TOKEN_KEY, data.token)
      localStorage.setItem(USER_KEY, data.username)
      localStorage.setItem(USER_ID_KEY, data.user_id.toString())
      
      // Set token expiry time
      const expiryTime = Date.now() + TOKEN_EXPIRY_DURATION
      localStorage.setItem(TOKEN_EXPIRY_KEY, expiryTime.toString())
    } catch (error) {
      console.error('Error storing authentication data:', error)
      throw new Error('Failed to store authentication data')
    }
  },

  // Get authentication token
  getToken(): string | null {
    try {
      const token = localStorage.getItem(TOKEN_KEY)
      
      // Check if token is expired
      if (token && this.isTokenExpired()) {
        this.clearAuth()
        return null
      }
      
      return token
    } catch (error) {
      console.error('Error retrieving token:', error)
      return null
    }
  },

  // Get current user data
  getUser(): { username: string; user_id: number } | null {
    try {
      const username = localStorage.getItem(USER_KEY)
      const userId = localStorage.getItem(USER_ID_KEY)
      
      if (!username || !userId || this.isTokenExpired()) {
        return null
      }
      
      return {
        username,
        user_id: parseInt(userId, 10)
      }
    } catch (error) {
      console.error('Error retrieving user data:', error)
      return null
    }
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const token = this.getToken()
    return token !== null && !this.isTokenExpired()
  },

  // Check if token is expired
  isTokenExpired(): boolean {
    try {
      const expiryTime = localStorage.getItem(TOKEN_EXPIRY_KEY)
      
      if (!expiryTime) {
        return true
      }
      
      return Date.now() > parseInt(expiryTime, 10)
    } catch (error) {
      console.error('Error checking token expiry:', error)
      return true
    }
  },

  // Clear authentication data
  clearAuth(): void {
    try {
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(USER_KEY)
      localStorage.removeItem(USER_ID_KEY)
      localStorage.removeItem(TOKEN_EXPIRY_KEY)
    } catch (error) {
      console.error('Error clearing authentication data:', error)
    }
  },

  // Get remaining time until token expires (in milliseconds)
  getTokenRemainingTime(): number {
    try {
      const expiryTime = localStorage.getItem(TOKEN_EXPIRY_KEY)
      
      if (!expiryTime) {
        return 0
      }
      
      const remaining = parseInt(expiryTime, 10) - Date.now()
      return remaining > 0 ? remaining : 0
    } catch (error) {
      console.error('Error calculating remaining time:', error)
      return 0
    }
  },

  // Refresh token expiry time
  refreshTokenExpiry(): void {
    try {
      if (this.isAuthenticated()) {
        const expiryTime = Date.now() + TOKEN_EXPIRY_DURATION
        localStorage.setItem(TOKEN_EXPIRY_KEY, expiryTime.toString())
      }
    } catch (error) {
      console.error('Error refreshing token expiry:', error)
    }
  }
}

export type { AuthUser }
