// API Service with security best practices

export const API_BASE_URL = import.meta.env.VITE_API_ENDPOINT || 'http://localhost:8000'

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
  // Job details from API
  job_title: string
  department: string
  employment_type: string
  work_arrangement: string
  career: number // Career ID reference
  // Applicant details
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
  role: 'leader' | 'member'
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
  role: 'leader' | 'member'
  social_links: string[]
}

interface TeamMemberUpdateData {
  name?: string
  position?: string
  bio?: string
  image?: File
  role?: 'leader' | 'member'
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

// New nested structure for Career
interface JobLocation {
  city: string
  area: string
  country: string
}

interface JobExperience {
  min_years: number
  max_years: number
  level: string
}

interface JobSkills {
  required: string[]
  preferred: string[]
}

interface JobDetails {
  title: string
  department: string
  employment_type: string
  work_arrangement: string
  location: JobLocation
  experience: JobExperience
  skills: JobSkills
  description: string
  status: string
}

interface Career {
  id: number
  job: JobDetails
  posted_at: string
  updated_at: string
}

interface CareerCreateData {
  job: {
    title: string
    department: string
    employment_type: string
    work_arrangement: string
    location: {
      city: string
      area: string
      country: string
    }
    experience: {
      min_years: number
      max_years: number
      level: string
    }
    skills: {
      required: string[]
      preferred: string[]
    }
    description: string
    status: string
  }
}

interface CareerUpdateData {
  job?: {
    title?: string
    department?: string
    employment_type?: string
    work_arrangement?: string
    location?: {
      city?: string
      area?: string
      country?: string
    }
    experience?: {
      min_years?: number
      max_years?: number
      level?: string
    }
    skills?: {
      required?: string[]
      preferred?: string[]
    }
    description?: string
    status?: string
  }
}

interface CareersListResponse {
  data: Career[]
  message: string
  success: boolean
  count: number
  next: string | null
  previous: string | null
}

interface GalleryImage {
  id?: number
  image: string
  caption: string
}

interface GalleryCategory {
  id?: number
  title: string
  description: string
  uploaded_images: GalleryImage[]
}

interface GalleryListResponse {
  data: GalleryCategory[]
  message: string
  success: boolean
}

interface GalleryCreateData {
  title: string
  description: string
  uploaded_images: { id?: number; image?: File; caption: string }[]
}

interface Code {
  id: number
  code: string
  is_used: boolean
  used_at: string | null
  created_at: string
  status: "Unused" | "Active" | "Expired"
  is_expired: boolean
}

interface CodeListResponse {
  data: Code[]
  message: string
  success: boolean
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

  // Gallery Endpoints
  async getGallery(): Promise<GalleryListResponse> {
    return this.request<GalleryCategory[]>('/api/gallery-images/')
  }

  async createGallery(galleryData: GalleryCreateData): Promise<ApiResponse<GalleryCategory>> {
    const token = localStorage.getItem('admin_token')
    const formData = new FormData()
    formData.append('title', galleryData.title)
    formData.append('description', galleryData.description)
    
    if (galleryData.uploaded_images) {
      galleryData.uploaded_images.forEach((item) => {
        if (item.image instanceof File) {
          formData.append('images[]', item.image)
          formData.append('captions[]', item.caption || "")
        }
      })
    }

    const config: RequestInit = {
      method: 'POST',
      body: formData,
      headers: {
        ...(token ? { 'Authorization': `Token ${token}` } : {}),
      },
    }

    const response = await fetch(`${this.baseUrl}/api/gallery-images/`, config)
    
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
    }
    return await response.json()
  }

  async updateGallery(id: number, galleryData: Partial<GalleryCreateData>): Promise<ApiResponse<GalleryCategory>> {
    const token = localStorage.getItem('admin_token')
    const formData = new FormData()
    if (galleryData.title) formData.append('title', galleryData.title)
    if (galleryData.description) formData.append('description', galleryData.description)
    
    if (galleryData.uploaded_images) {
      galleryData.uploaded_images.forEach((item) => {
        if (item.image instanceof File) {
          formData.append('images[]', item.image)
          formData.append('captions[]', item.caption || "")
        }
      })
    }

    const config: RequestInit = {
      method: 'PATCH',
      body: formData,
      headers: {
        ...(token ? { 'Authorization': `Token ${token}` } : {}),
      },
    }

    const response = await fetch(`${this.baseUrl}/api/gallery-images/${id}/`, config)
    
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
    }
    return await response.json()
  }

  async deleteGallery(id: number): Promise<ApiResponse<null>> {
    return this.authenticatedRequest<null>(`/api/gallery-images/${id}/`, {
      method: 'DELETE',
    })
  }

  async generateCodes(): Promise<CodeListResponse> {
    return this.authenticatedRequest<Code[]>('/api/codes/generate/', {
      method: 'POST',
    })
  }

  async getCodes(): Promise<CodeListResponse> {
    return this.authenticatedRequest<Code[]>('/api/codes/list/', {
      method: 'GET',
    })
  }

  async useCode(code: string): Promise<ApiResponse<Code>> {
    return this.request<Code>('/api/codes/use/', {
      method: 'POST',
      body: JSON.stringify({ code }),
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
  JobDetails,
  JobLocation,
  JobExperience,
  JobSkills,
  JobApplication,
  JobApplicationListResponse,
  Message,
  MessageListResponse,
  TeamMember,
  TeamMemberListResponse,
  TeamMemberCreateData,
  TeamMemberUpdateData,
  SocialLink,
  GalleryCategory,
  GalleryImage,
  GalleryCreateData,
  GalleryListResponse,
  Code,
  CodeListResponse
}
