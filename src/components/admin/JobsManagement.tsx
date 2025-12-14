import { Box, VStack, HStack, Text, Heading, Button, Badge, Grid, Input, Spinner, Center } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { toaster } from "@/components/ui/toaster"
import { apiService, type Career } from "@/services/api"

interface JobsManagementProps {
  onJobsUpdate?: () => void
}

// Form state for creating/editing jobs
interface JobFormState {
  title: string
  department: string
  employment_type: string
  work_arrangement: string
  location_city: string
  location_area: string
  location_country: string
  experience_min_years: number
  experience_max_years: number
  experience_level: string
  skills_required: string
  skills_preferred: string
  description: string
  status: string
}

const initialFormState: JobFormState = {
  title: "",
  department: "Engineering",
  employment_type: "full_time",
  work_arrangement: "onsite",
  location_city: "",
  location_area: "",
  location_country: "Nepal",
  experience_min_years: 0,
  experience_max_years: 2,
  experience_level: "entry",
  skills_required: "",
  skills_preferred: "",
  description: "",
  status: "open"
}

export const JobsManagement = ({ onJobsUpdate }: JobsManagementProps) => {
  const [jobs, setJobs] = useState<Career[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreatingJob, setIsCreatingJob] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isCustomDepartment, setIsCustomDepartment] = useState(false)
  const [isCustomJobType, setIsCustomJobType] = useState(false)
  const [editingJob, setEditingJob] = useState<Career | null>(null)
  const [newJob, setNewJob] = useState<JobFormState>(initialFormState)

  // Fetch jobs on component mount
  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      setIsLoading(true)
      const response = await apiService.getCareers()
      setJobs(response.data)
    } catch (error) {
      toaster.create({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to fetch jobs",
        type: "error",
        duration: 3000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handlePostJob = async () => {
    // Validation
    if (!newJob.title || !newJob.department || !newJob.description) {
      toaster.create({
        title: "Validation Error",
        description: "Please fill in all required fields",
        type: "error",
        duration: 3000,
      })
      return
    }

    try {
      setIsSubmitting(true)
      
      // Build the job data according to new API structure
      const jobData = {
        job: {
          title: newJob.title,
          department: newJob.department,
          employment_type: newJob.employment_type,
          work_arrangement: newJob.work_arrangement,
          location: {
            city: newJob.location_city,
            area: newJob.location_area,
            country: newJob.location_country,
          },
          experience: {
            min_years: newJob.experience_min_years,
            max_years: newJob.experience_max_years,
            level: newJob.experience_level,
          },
          skills: {
            required: newJob.skills_required.split(',').map(s => s.trim()).filter(s => s),
            preferred: newJob.skills_preferred.split(',').map(s => s.trim()).filter(s => s),
          },
          description: newJob.description,
          status: newJob.status,
        }
      }
      
      await apiService.createCareer(jobData)
      
      toaster.create({
        title: "Success",
        description: `${newJob.title} has been posted`,
        type: "success",
        duration: 3000,
      })
      
      setIsCreatingJob(false)
      resetForm()
      fetchJobs() // Refresh the list
      onJobsUpdate?.()
    } catch (error) {
      toaster.create({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create job",
        type: "error",
        duration: 3000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleUpdateJob = async () => {
    if (!editingJob) return

    try {
      setIsSubmitting(true)
      
      // Build the update data according to new API structure
      const updateData = {
        job: {
          title: newJob.title,
          department: newJob.department,
          employment_type: newJob.employment_type,
          work_arrangement: newJob.work_arrangement,
          location: {
            city: newJob.location_city,
            area: newJob.location_area,
            country: newJob.location_country,
          },
          experience: {
            min_years: newJob.experience_min_years,
            max_years: newJob.experience_max_years,
            level: newJob.experience_level,
          },
          skills: {
            required: newJob.skills_required.split(',').map(s => s.trim()).filter(s => s),
            preferred: newJob.skills_preferred.split(',').map(s => s.trim()).filter(s => s),
          },
          description: newJob.description,
          status: newJob.status,
        }
      }
      
      await apiService.updateCareer(editingJob.id, updateData)
      
      toaster.create({
        title: "Success",
        description: `${newJob.title} has been updated`,
        type: "success",
        duration: 3000,
      })
      
      setEditingJob(null)
      setIsCreatingJob(false)
      resetForm()
      fetchJobs()
      onJobsUpdate?.()
    } catch (error) {
      toaster.create({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update job",
        type: "error",
        duration: 3000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteJob = async (id: number, jobName: string) => {
    if (!confirm(`Are you sure you want to delete "${jobName}"?`)) {
      return
    }

    try {
      await apiService.deleteCareer(id)
      
      toaster.create({
        title: "Success",
        description: `${jobName} has been deleted`,
        type: "success",
        duration: 3000,
      })
      
      fetchJobs()
      onJobsUpdate?.()
    } catch (error) {
      toaster.create({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete job",
        type: "error",
        duration: 3000,
      })
    }
  }

  const handleEditJob = (job: Career) => {
    setEditingJob(job)
    setNewJob({
      title: job.job.title,
      department: job.job.department,
      employment_type: job.job.employment_type,
      work_arrangement: job.job.work_arrangement,
      location_city: job.job.location.city,
      location_area: job.job.location.area,
      location_country: job.job.location.country,
      experience_min_years: job.job.experience.min_years,
      experience_max_years: job.job.experience.max_years,
      experience_level: job.job.experience.level,
      skills_required: job.job.skills.required.join(', '),
      skills_preferred: job.job.skills.preferred.join(', '),
      description: job.job.description,
      status: job.job.status,
    })
    setIsCreatingJob(true)
  }

  const resetForm = () => {
    setNewJob(initialFormState)
    setEditingJob(null)
    setIsCustomDepartment(false)
    setIsCustomJobType(false)
  }

  const handleCancel = () => {
    setIsCreatingJob(false)
    resetForm()
  }

  const getEmploymentTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      full_time: "Full-time",
      part_time: "Part-time",
      freelance: "Freelance",
      contract: "Contract",
      internship: "Internship",
    }
    return types[type] || type
  }

  const getWorkArrangementLabel = (mode: string) => {
    const modes: Record<string, string> = {
      onsite: "Onsite",
      hybrid: "Hybrid",
      remote: "Remote",
    }
    return modes[mode] || mode
  }

  const getExperienceLevelLabel = (level: string) => {
    const levels: Record<string, string> = {
      entry: "Entry Level",
      junior: "Junior",
      mid: "Mid Level",
      senior: "Senior",
      lead: "Lead",
      manager: "Manager",
    }
    return levels[level] || level
  }

  // Get unique departments from existing jobs + default ones
  const uniqueDepartments = Array.from(new Set([
    "Engineering", "Design", "Product", "Sales", "Marketing", "HR", "Finance", "Operations",
    ...jobs.map(j => j.job.department)
  ])).sort()

  // Get unique employment types from existing jobs + default ones
  const uniqueEmploymentTypes = Array.from(new Set([
    "full_time", "part_time", "freelance", "contract", "internship",
    ...jobs.map(j => j.job.employment_type)
  ])).sort()

  if (isLoading) {
    return (
      <Center py={20}>
        <Spinner size="xl" color="primary.500" />
      </Center>
    )
  }

  return (
    <VStack gap={6} align="stretch">
      {/* Create New Job Button */}
      <HStack justify="space-between">
        <Text fontSize="lg" fontWeight="600" color="neutral.700">
          Posted Jobs ({jobs.length})
        </Text>
        <Button
          colorScheme="primary"
          onClick={() => setIsCreatingJob(!isCreatingJob)}
          disabled={isSubmitting}
        >
          {isCreatingJob ? "Cancel" : "+ Create New Job"}
        </Button>
      </HStack>

      {/* Create/Edit Job Form */}
      {isCreatingJob && (
        <Box
          p={6}
          bg="white"
          borderRadius="xl"
          border="1px solid"
          borderColor="neutral.200"
        >
          <Heading fontSize="lg" fontWeight="700" mb={6}>
            {editingJob ? "Edit Job Posting" : "Create New Job Posting"}
          </Heading>
          <VStack gap={4} align="stretch">
            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
              <VStack align="stretch" gap={2}>
                <Text fontSize="sm" fontWeight="600">Job Title *</Text>
                <Input
                  placeholder="e.g., Senior Full Stack Developer"
                  value={newJob.title}
                  onChange={(e) => setNewJob({...newJob, title: e.target.value})}
                />
              </VStack>
              <VStack align="stretch" gap={2}>
                <Text fontSize="sm" fontWeight="600">Department *</Text>
                {isCustomDepartment ? (
                  <HStack>
                    <Input
                      placeholder="Enter department name"
                      value={newJob.department}
                      onChange={(e) => setNewJob({...newJob, department: e.target.value})}
                      autoFocus
                    />
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => {
                        setIsCustomDepartment(false)
                        setNewJob({...newJob, department: "Engineering"})
                      }}
                    >
                      Cancel
                    </Button>
                  </HStack>
                ) : (
                  <select
                    value={newJob.department}
                    onChange={(e) => {
                      if (e.target.value === '__new__') {
                        setIsCustomDepartment(true)
                        setNewJob({...newJob, department: ""})
                      } else {
                        setNewJob({...newJob, department: e.target.value})
                      }
                    }}
                    style={{
                      padding: "8px 12px",
                      borderRadius: "6px",
                      border: "1px solid #E2E8F0",
                      fontSize: "14px"
                    }}
                  >
                    {uniqueDepartments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                    <option value="__new__">+ Create New Department</option>
                  </select>
                )}
              </VStack>
              <VStack align="stretch" gap={2}>
                <Text fontSize="sm" fontWeight="600">Employment Type *</Text>
                {isCustomJobType ? (
                  <HStack>
                    <Input
                      placeholder="Enter employment type"
                      value={newJob.employment_type}
                      onChange={(e) => setNewJob({...newJob, employment_type: e.target.value})}
                      autoFocus
                    />
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => {
                        setIsCustomJobType(false)
                        setNewJob({...newJob, employment_type: "full_time"})
                      }}
                    >
                      Cancel
                    </Button>
                  </HStack>
                ) : (
                  <select
                    value={newJob.employment_type}
                    onChange={(e) => {
                      if (e.target.value === '__new__') {
                        setIsCustomJobType(true)
                        setNewJob({...newJob, employment_type: ""})
                      } else {
                        setNewJob({...newJob, employment_type: e.target.value})
                      }
                    }}
                    style={{
                      padding: "8px 12px",
                      borderRadius: "6px",
                      border: "1px solid #E2E8F0",
                      fontSize: "14px"
                    }}
                  >
                    {uniqueEmploymentTypes.map(type => (
                      <option key={type} value={type}>{getEmploymentTypeLabel(type)}</option>
                    ))}
                    <option value="__new__">+ Create New Type</option>
                  </select>
                )}
              </VStack>
              <VStack align="stretch" gap={2}>
                <Text fontSize="sm" fontWeight="600">Work Arrangement *</Text>
                <select
                  value={newJob.work_arrangement}
                  onChange={(e) => setNewJob({...newJob, work_arrangement: e.target.value})}
                  style={{
                    padding: "8px 12px",
                    borderRadius: "6px",
                    border: "1px solid #E2E8F0",
                    fontSize: "14px"
                  }}
                >
                  <option value="onsite">Onsite</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="remote">Remote</option>
                </select>
              </VStack>
            </Grid>

            {/* Location Fields */}
            <Text fontSize="sm" fontWeight="600" color="neutral.700">Location</Text>
            <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4}>
              <VStack align="stretch" gap={2}>
                <Text fontSize="xs" color="neutral.600">City</Text>
                <Input
                  placeholder="e.g., Lalitpur"
                  value={newJob.location_city}
                  onChange={(e) => setNewJob({...newJob, location_city: e.target.value})}
                />
              </VStack>
              <VStack align="stretch" gap={2}>
                <Text fontSize="xs" color="neutral.600">Area</Text>
                <Input
                  placeholder="e.g., Hattiban"
                  value={newJob.location_area}
                  onChange={(e) => setNewJob({...newJob, location_area: e.target.value})}
                />
              </VStack>
              <VStack align="stretch" gap={2}>
                <Text fontSize="xs" color="neutral.600">Country</Text>
                <Input
                  placeholder="e.g., Nepal"
                  value={newJob.location_country}
                  onChange={(e) => setNewJob({...newJob, location_country: e.target.value})}
                />
              </VStack>
            </Grid>

            {/* Experience Fields */}
            <Text fontSize="sm" fontWeight="600" color="neutral.700">Experience Requirements</Text>
            <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4}>
              <VStack align="stretch" gap={2}>
                <Text fontSize="xs" color="neutral.600">Min Years</Text>
                <Input
                  type="number"
                  min={0}
                  placeholder="0"
                  value={newJob.experience_min_years}
                  onChange={(e) => setNewJob({...newJob, experience_min_years: parseInt(e.target.value) || 0})}
                />
              </VStack>
              <VStack align="stretch" gap={2}>
                <Text fontSize="xs" color="neutral.600">Max Years</Text>
                <Input
                  type="number"
                  min={0}
                  placeholder="5"
                  value={newJob.experience_max_years}
                  onChange={(e) => setNewJob({...newJob, experience_max_years: parseInt(e.target.value) || 0})}
                />
              </VStack>
              <VStack align="stretch" gap={2}>
                <Text fontSize="xs" color="neutral.600">Level</Text>
                <select
                  value={newJob.experience_level}
                  onChange={(e) => setNewJob({...newJob, experience_level: e.target.value})}
                  style={{
                    padding: "8px 12px",
                    borderRadius: "6px",
                    border: "1px solid #E2E8F0",
                    fontSize: "14px"
                  }}
                >
                  <option value="entry">Entry Level</option>
                  <option value="junior">Junior</option>
                  <option value="mid">Mid Level</option>
                  <option value="senior">Senior</option>
                  <option value="lead">Lead</option>
                  <option value="manager">Manager</option>
                </select>
              </VStack>
            </Grid>

            {/* Skills Fields */}
            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
              <VStack align="stretch" gap={2}>
                <Text fontSize="sm" fontWeight="600">Required Skills</Text>
                <Text fontSize="xs" color="neutral.600">Comma-separated list</Text>
                <Input
                  placeholder="e.g., Python, Django, REST APIs"
                  value={newJob.skills_required}
                  onChange={(e) => setNewJob({...newJob, skills_required: e.target.value})}
                />
              </VStack>
              <VStack align="stretch" gap={2}>
                <Text fontSize="sm" fontWeight="600">Preferred Skills</Text>
                <Text fontSize="xs" color="neutral.600">Comma-separated list</Text>
                <Input
                  placeholder="e.g., TensorFlow, AWS, Docker"
                  value={newJob.skills_preferred}
                  onChange={(e) => setNewJob({...newJob, skills_preferred: e.target.value})}
                />
              </VStack>
            </Grid>

            <VStack align="stretch" gap={2}>
              <Text fontSize="sm" fontWeight="600">Job Description *</Text>
              <textarea
                placeholder="Describe the role, responsibilities, and what you're looking for..."
                value={newJob.description}
                onChange={(e) => setNewJob({...newJob, description: e.target.value})}
                rows={4}
                style={{
                  padding: "8px 12px",
                  borderRadius: "6px",
                  border: "1px solid #E2E8F0",
                  fontSize: "14px",
                  fontFamily: "inherit"
                }}
              />
            </VStack>

            <VStack align="stretch" gap={2}>
              <Text fontSize="sm" fontWeight="600">Status</Text>
              <select
                value={newJob.status}
                onChange={(e) => setNewJob({...newJob, status: e.target.value})}
                style={{
                  padding: "8px 12px",
                  borderRadius: "6px",
                  border: "1px solid #E2E8F0",
                  fontSize: "14px"
                }}
              >
                <option value="open">Open</option>
                <option value="closed">Closed</option>
                <option value="draft">Draft</option>
              </select>
            </VStack>

            <HStack gap={3} pt={4}>
              <Button
                colorScheme="primary"
                onClick={editingJob ? handleUpdateJob : handlePostJob}
                loading={isSubmitting}
              >
                {editingJob ? "Update Job" : "Post Job"}
              </Button>
              <Button
                variant="outline"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            </HStack>
          </VStack>
        </Box>
      )}

      {/* Posted Jobs List */}
      {jobs.length === 0 ? (
        <Box
          p={12}
          bg="white"
          borderRadius="xl"
          border="1px solid"
          borderColor="neutral.200"
          textAlign="center"
        >
          <Text color="neutral.600">No jobs posted yet. Create your first job posting!</Text>
        </Box>
      ) : (
        <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap={4}>
          {jobs.map((job) => (
            <Box
              key={job.id}
              p={6}
              bg="white"
              borderRadius="xl"
              border="1px solid"
              borderColor="neutral.200"
              _hover={{ shadow: "md" }}
              transition="all 0.3s ease"
            >
              <VStack align="stretch" gap={4}>
                <HStack justify="space-between">
                  <VStack align="start" gap={1}>
                    <Heading fontSize="lg" fontWeight="700" color="neutral.900">
                      {job.job.title}
                    </Heading>
                    <Text fontSize="sm" color="neutral.600">
                      {job.job.department}
                    </Text>
                  </VStack>
                  <Badge
                    colorScheme={job.job.status === "open" ? "green" : "gray"}
                    fontSize="xs"
                  >
                    {job.job.status === "open" ? "Open" : job.job.status === "closed" ? "Closed" : "Draft"}
                  </Badge>
                </HStack>
                <VStack align="stretch" gap={2}>
                  <HStack gap={2} flexWrap="wrap">
                    <Badge colorScheme="blue" fontSize="xs">
                      {getEmploymentTypeLabel(job.job.employment_type)}
                    </Badge>
                    <Badge colorScheme="purple" fontSize="xs">
                      {getWorkArrangementLabel(job.job.work_arrangement)}
                    </Badge>
                    <Badge colorScheme="orange" fontSize="xs">
                      {getExperienceLevelLabel(job.job.experience.level)}
                    </Badge>
                  </HStack>
                  <Text fontSize="sm" color="neutral.600">
                    <strong>Experience:</strong> {job.job.experience.min_years}-{job.job.experience.max_years} years
                  </Text>
                  {job.job.location.city && (
                    <Text fontSize="sm" color="neutral.600">
                      <strong>Location:</strong> {job.job.location.area}, {job.job.location.city}, {job.job.location.country}
                    </Text>
                  )}
                  {job.job.skills.required.length > 0 && (
                    <Text fontSize="sm" color="neutral.600">
                      <strong>Skills:</strong> {job.job.skills.required.join(', ')}
                    </Text>
                  )}
                  <Text fontSize="xs" color="neutral.500">
                    Posted: {new Date(job.posted_at).toLocaleDateString()}
                  </Text>
                </VStack>
                <HStack gap={2}>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    colorScheme="primary" 
                    flex={1}
                    onClick={() => handleEditJob(job)}
                  >
                    Edit
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    colorScheme="red"
                    onClick={() => handleDeleteJob(job.id, job.job.title)}
                  >
                    Delete
                  </Button>
                </HStack>
              </VStack>
            </Box>
          ))}
        </Grid>
      )}
    </VStack>
  )
}
