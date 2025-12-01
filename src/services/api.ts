// API Service with security best practices

const API_BASE_URL = import.meta.env.VITE_API_ENDPOINT || 'http://localhost:8000'

interface CareersListResponse {
  data: Career[]
  message: string
  success: boolean
  count: number
  next: string | null
  previous: string | null
}

interface JobApplication {
  id?: number
  first_name: string
  last_name: string
  email: string
  phone_number: string
  current_location: string
  linkedin_profile?: string
  portfolio_website?: string
  years_of_experience?: number
  notice_period?: string
  expected_salary?: string
  cover_letter: string
  resume: File | string
  created_at?: string
  updated_at?: string
}

interface JobApplicationListResponse {
  data: JobApplication[]
  message: string
  success: boolean
  count: number
  next: string | null
  previous: string | null
}

interface Message {
  id?: number
  name: string
  email: string
  company: string
  message: string
  meeting_tool: string
  agenda: string
  date_time: string
  phone_number: string
  website?: string
  created_at?: string
}

interface MessageListResponse {
  data: Message[]
  message: string
  success: boolean
}

interface SocialLink {
  id?: number
  url: string
}

interface TeamMember {
  id?: number
  name: string
  position: string
  bio: string
  image: string
  uploaded_links: SocialLink[]
}

interface TeamMemberListResponse {
  data: TeamMember[]
  message: string
  success: boolean
}

interface TeamMemberCreateData {
  name: string
  position: string
  bio: string
  image: File
  social_links: string[]
}

interface TeamMemberUpdateData {
  name?: string
  position?: string
  bio?: string
  image?: File
  social_links?: string[]
}

interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}

interface LoginResponse {
  token: string
  user_id: number
  username: string
}

interface LoginCredentials {
  username: string
  password: string
}

interface Career {
  id: number
  job_name: string
  department_name: string
  job_type: string
  remote_mode?: string | null
  location?: string
  experience_level: string
  requirements: string
  description: string
  expire: boolean
  posted_at: string
  updated_at: string
}

interface CareerCreateData {
  job_name: string
  department_name: string
  job_type: string
  experience_level: string
  requirements: string
  description: string
  remote_mode?: string
  location?: string
}

interface CareerUpdateData {
  job_name?: string
  department_name?: string
  job_type?: string
  experience_level?: string
  requirements?: string
  description?: string
  remote_mode?: string
  location?: string
  expire?: boolean
}

interface CareersListResponse {
  data: Career[]
  message: string
  success: boolean
  count: number
  next: string | null
  previous: string | null
}

class ApiService {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`
    
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      // Handle 204 No Content responses (e.g., DELETE operations)
      if (response.status === 204 || response.headers.get('content-length') === '0') {
        return {
          success: true,
          data: null as T,
          message: 'Operation completed successfully'
        }
      }

      const data = await response.json()
      return data
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`API Error: ${error.message}`)
      }
      throw new Error('An unexpected error occurred')
    }
  }

  async login(credentials: LoginCredentials): Promise<ApiResponse<LoginResponse>> {
    return this.request<LoginResponse>('/api/login/', {
      method: 'POST',
      body: JSON.stringify(credentials),
    })
  }

  async authenticatedRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const token = localStorage.getItem('admin_token')
    
    if (!token) {
      throw new Error('No authentication token found')
    }

    return this.request<T>(endpoint, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Token ${token}`,
      },
    })
  }

  // Career API Methods
  async getCareers(department?: string): Promise<CareersListResponse> {
    const queryParam = department ? `?department=${encodeURIComponent(department)}` : ''
    const url = `${this.baseUrl}/api/careers/${queryParam}`
    
    const config: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`API Error: ${error.message}`)
      }
      throw new Error('An unexpected error occurred')
    }
  }

  async createCareer(careerData: CareerCreateData): Promise<ApiResponse<Career>> {
    return this.authenticatedRequest<Career>('/api/careers/', {
      method: 'POST',
      body: JSON.stringify(careerData),
    })
  }

  async updateCareer(id: number, careerData: CareerUpdateData): Promise<ApiResponse<Career>> {
    return this.authenticatedRequest<Career>(`/api/careers/?id=${id}`, {
      method: 'PATCH',
      body: JSON.stringify(careerData),
    })
  }

  async deleteCareer(id: number): Promise<ApiResponse<null>> {
    return this.authenticatedRequest<null>(`/api/careers/?id=${id}`, {
      method: 'DELETE',
    })
  }

  // Job Application API Methods
  async applyForJob(applicationData: FormData): Promise<ApiResponse<JobApplication>> {
    const token = localStorage.getItem('admin_token')
    const url = `${this.baseUrl}/api/apply/`
    
    const config: RequestInit = {
      method: 'POST',
      body: applicationData,
      headers: token ? {
        'Authorization': `Token ${token}`,
      } : {},
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`API Error: ${error.message}`)
      }
      throw new Error('An unexpected error occurred')
    }
  }

  async getJobApplications(): Promise<JobApplicationListResponse> {
    return this.authenticatedRequest<JobApplicationListResponse>('/api/applications/', {
      method: 'GET',
    }) as unknown as JobApplicationListResponse
  }

  // Message API Methods
  async sendMessage(messageData: Omit<Message, 'id' | 'created_at'>): Promise<ApiResponse<Message>> {
    const url = `${this.baseUrl}/api/messages/`
    
    const config: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messageData),
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`API Error: ${error.message}`)
      }
      throw new Error('An unexpected error occurred')
    }
  }

  async getMessages(): Promise<MessageListResponse> {
    return this.authenticatedRequest<MessageListResponse>('/api/messages/', {
      method: 'GET',
    }) as unknown as MessageListResponse
  }

  async getMessageById(id: number): Promise<ApiResponse<Message>> {
    return this.authenticatedRequest<Message>(`/api/messages/${id}/`, {
      method: 'GET',
    })
  }

  // Team Member API Methods
  async getTeamMembers(): Promise<TeamMemberListResponse> {
    const url = `${this.baseUrl}/api/team/`
    
    const config: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`API Error: ${error.message}`)
      }
      throw new Error('An unexpected error occurred')
    }
  }

  async getTeamMemberById(id: number): Promise<ApiResponse<TeamMember>> {
    const url = `${this.baseUrl}/api/team/${id}/`
    
    const config: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`API Error: ${error.message}`)
      }
      throw new Error('An unexpected error occurred')
    }
  }

  async createTeamMember(teamMemberData: FormData): Promise<ApiResponse<TeamMember>> {
    const token = localStorage.getItem('admin_token')
    const url = `${this.baseUrl}/api/team/`
    
    const config: RequestInit = {
      method: 'POST',
      body: teamMemberData,
      headers: token ? {
        'Authorization': `Token ${token}`,
      } : {},
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`API Error: ${error.message}`)
      }
      throw new Error('An unexpected error occurred')
    }
  }

  async updateTeamMember(id: number, teamMemberData: Partial<TeamMemberUpdateData>): Promise<ApiResponse<TeamMember>> {
    const token = localStorage.getItem('admin_token')
    const url = `${this.baseUrl}/api/team/${id}/`
    
    // Create FormData if image is included, otherwise use JSON
    let body: FormData | string
    let contentType: string | undefined
    
    if (teamMemberData.image) {
      const formData = new FormData()
      if (teamMemberData.name) formData.append('name', teamMemberData.name)
      if (teamMemberData.position) formData.append('position', teamMemberData.position)
      if (teamMemberData.bio) formData.append('bio', teamMemberData.bio)
      if (teamMemberData.image) formData.append('image', teamMemberData.image)
      if (teamMemberData.social_links) {
        teamMemberData.social_links.forEach(link => {
          formData.append('social_links[]', link)
        })
      }
      body = formData
    } else {
      body = JSON.stringify(teamMemberData)
      contentType = 'application/json'
    }
    
    const config: RequestInit = {
      method: 'PATCH',
      body: body,
      headers: {
        ...(contentType ? { 'Content-Type': contentType } : {}),
        ...(token ? { 'Authorization': `Token ${token}` } : {}),
      },
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`API Error: ${error.message}`)
      }
      throw new Error('An unexpected error occurred')
    }
  }

  async deleteTeamMember(id: number): Promise<ApiResponse<null>> {
    return this.authenticatedRequest<null>(`/api/team/${id}/`, {
      method: 'DELETE',
    })
  }
}

export const apiService = new ApiService(API_BASE_URL)
export type { 
  LoginResponse, 
  LoginCredentials, 
  ApiResponse,
  Career,
  CareerCreateData,
  CareerUpdateData,
  CareersListResponse,
  JobApplication,
  JobApplicationListResponse,
  Message,
  MessageListResponse,
  TeamMember,
  TeamMemberListResponse,
  TeamMemberCreateData,
  TeamMemberUpdateData,
  SocialLink
}
