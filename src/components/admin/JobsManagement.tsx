import { Box, VStack, HStack, Text, Heading, Button, Badge, Grid, Input, Spinner, Center } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { toaster } from "@/components/ui/toaster"
import { apiService, type Career } from "@/services/api"

interface JobsManagementProps {
  onJobsUpdate?: () => void
}

export const JobsManagement = ({ onJobsUpdate }: JobsManagementProps) => {
  const [jobs, setJobs] = useState<Career[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreatingJob, setIsCreatingJob] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isCustomDepartment, setIsCustomDepartment] = useState(false)
  const [isCustomJobType, setIsCustomJobType] = useState(false)
  const [editingJob, setEditingJob] = useState<Career | null>(null)
  const [newJob, setNewJob] = useState({
    job_name: "",
    department_name: "Engineering",
    location: "",
    job_type: "full_time",
    remote_mode: "onsite",
    experience_level: "",
    description: "",
    requirements: ""
  })

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
    if (!newJob.job_name || !newJob.department_name || !newJob.experience_level || !newJob.description) {
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
      
      // Only include remote_mode if job_type is 'remote'
      const jobData: {
        job_name: string
        department_name: string
        job_type: string
        experience_level: string
        requirements: string
        description: string
        location?: string
        remote_mode?: string
      } = {
        job_name: newJob.job_name,
        department_name: newJob.department_name,
        location: newJob.location,
        job_type: newJob.job_type,
        experience_level: newJob.experience_level,
        description: newJob.description,
        requirements: newJob.requirements,
      }
      
      if (newJob.job_type === 'remote') {
        jobData.remote_mode = newJob.remote_mode
      }
      
      await apiService.createCareer(jobData)
      
      toaster.create({
        title: "Success",
        description: `${newJob.job_name} has been posted`,
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
      
      // Only include remote_mode if job_type is 'remote'
      const updateData: {
        job_name?: string
        department_name?: string
        job_type?: string
        experience_level?: string
        requirements?: string
        description?: string
        location?: string
        remote_mode?: string
      } = {
        job_name: newJob.job_name,
        department_name: newJob.department_name,
        location: newJob.location,
        job_type: newJob.job_type,
        experience_level: newJob.experience_level,
        description: newJob.description,
        requirements: newJob.requirements,
      }
      
      if (newJob.job_type === 'remote') {
        updateData.remote_mode = newJob.remote_mode
      }
      
      await apiService.updateCareer(editingJob.id, updateData)
      
      toaster.create({
        title: "Success",
        description: `${newJob.job_name} has been updated`,
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
      job_name: job.job_name,
      department_name: job.department_name,
      location: job.location || "",
      job_type: job.job_type,
      remote_mode: job.remote_mode || "onsite",
      experience_level: job.experience_level,
      description: job.description,
      requirements: job.requirements,
    })
    setIsCreatingJob(true)
  }

  const resetForm = () => {
    setNewJob({
      job_name: "",
      department_name: "Engineering",
      location: "",
      job_type: "full_time",
      remote_mode: "onsite",
      experience_level: "",
      description: "",
      requirements: ""
    })
    setEditingJob(null)
    setIsCustomDepartment(false)
    setIsCustomJobType(false)
  }

  const handleCancel = () => {
    setIsCreatingJob(false)
    resetForm()
  }

  const getJobTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      full_time: "Full-time",
      part_time: "Part-time",
      freelance: "Freelance",
      remote: "Remote",
    }
    return types[type] || type
  }

  const getRemoteModeLabel = (mode: string | null | undefined) => {
    const modes: Record<string, string> = {
      onsite: "Onsite",
      hybrid: "Hybrid",
    }
    return mode ? modes[mode] || mode : "Onsite"
  }

  // Get unique departments from existing jobs + default ones
  const uniqueDepartments = Array.from(new Set([
    "Engineering", "Design", "Product", "Sales", "Marketing", "HR", "Finance", "Operations",
    ...jobs.map(j => j.department_name)
  ])).sort()

  // Get unique job types from existing jobs + default ones
  const uniqueJobTypes = Array.from(new Set([
    "full_time", "part_time", "freelance", "remote",
    ...jobs.map(j => j.job_type)
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
                  value={newJob.job_name}
                  onChange={(e) => setNewJob({...newJob, job_name: e.target.value})}
                />
              </VStack>
              <VStack align="stretch" gap={2}>
                <Text fontSize="sm" fontWeight="600">Department *</Text>
                {isCustomDepartment ? (
                  <HStack>
                    <Input
                      placeholder="Enter department name"
                      value={newJob.department_name}
                      onChange={(e) => setNewJob({...newJob, department_name: e.target.value})}
                      autoFocus
                    />
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => {
                        setIsCustomDepartment(false)
                        setNewJob({...newJob, department_name: "Engineering"})
                      }}
                    >
                      Cancel
                    </Button>
                  </HStack>
                ) : (
                  <select
                    value={newJob.department_name}
                    onChange={(e) => {
                      if (e.target.value === '__new__') {
                        setIsCustomDepartment(true)
                        setNewJob({...newJob, department_name: ""})
                      } else {
                        setNewJob({...newJob, department_name: e.target.value})
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
                <Text fontSize="sm" fontWeight="600">Location</Text>
                <Input
                  placeholder="e.g., Bengaluru, India"
                  value={newJob.location}
                  onChange={(e) => setNewJob({...newJob, location: e.target.value})}
                />
              </VStack>
              {/* Only show Remote Mode field when job type is 'remote' */}
              {newJob.job_type === 'remote' && (
                <VStack align="stretch" gap={2}>
                  <Text fontSize="sm" fontWeight="600">Remote Mode *</Text>
                  <select
                    value={newJob.remote_mode}
                    onChange={(e) => setNewJob({...newJob, remote_mode: e.target.value})}
                    style={{
                      padding: "8px 12px",
                      borderRadius: "6px",
                      border: "1px solid #E2E8F0",
                      fontSize: "14px"
                    }}
                  >
                    <option value="onsite">Onsite</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </VStack>
              )}
              <VStack align="stretch" gap={2}>
                <Text fontSize="sm" fontWeight="600">Job Type *</Text>
                {isCustomJobType ? (
                  <HStack>
                    <Input
                      placeholder="Enter job type (e.g. Contract)"
                      value={newJob.job_type}
                      onChange={(e) => setNewJob({...newJob, job_type: e.target.value})}
                      autoFocus
                    />
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => {
                        setIsCustomJobType(false)
                        setNewJob({...newJob, job_type: "full_time"})
                      }}
                    >
                      Cancel
                    </Button>
                  </HStack>
                ) : (
                  <select
                    value={newJob.job_type}
                    onChange={(e) => {
                      if (e.target.value === '__new__') {
                        setIsCustomJobType(true)
                        setNewJob({...newJob, job_type: ""})
                      } else {
                        setNewJob({...newJob, job_type: e.target.value})
                      }
                    }}
                    style={{
                      padding: "8px 12px",
                      borderRadius: "6px",
                      border: "1px solid #E2E8F0",
                      fontSize: "14px"
                    }}
                  >
                    {uniqueJobTypes.map(type => (
                      <option key={type} value={type}>{getJobTypeLabel(type)}</option>
                    ))}
                    <option value="__new__">+ Create New Job Type</option>
                  </select>
                )}
              </VStack>
              <VStack align="stretch" gap={2}>
                <Text fontSize="sm" fontWeight="600">Experience Required *</Text>
                <Input
                  placeholder="e.g., 2-5 years"
                  value={newJob.experience_level}
                  onChange={(e) => setNewJob({...newJob, experience_level: e.target.value})}
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
              <Text fontSize="sm" fontWeight="600">Requirements *</Text>
              <Text fontSize="xs" color="neutral.600">Use new lines to separate requirements</Text>
              <textarea
                placeholder="e.g., 3+ years experience with React&#10;Strong TypeScript skills&#10;Experience with REST APIs"
                value={newJob.requirements}
                onChange={(e) => setNewJob({...newJob, requirements: e.target.value})}
                rows={6}
                style={{
                  padding: "8px 12px",
                  borderRadius: "6px",
                  border: "1px solid #E2E8F0",
                  fontSize: "14px",
                  fontFamily: "inherit"
                }}
              />
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
                      {job.job_name}
                    </Heading>
                    <Text fontSize="sm" color="neutral.600">
                      {job.department_name}
                    </Text>
                  </VStack>
                  <Badge
                    colorScheme={job.expire ? "gray" : "green"}
                    fontSize="xs"
                  >
                    {job.expire ? "Expired" : "Active"}
                  </Badge>
                </HStack>
                <VStack align="stretch" gap={2}>
                  <HStack gap={2}>
                    <Badge colorScheme="blue" fontSize="xs">
                      {getJobTypeLabel(job.job_type)}
                    </Badge>
                    <Badge colorScheme="purple" fontSize="xs">
                      {getRemoteModeLabel(job.remote_mode)}
                    </Badge>
                  </HStack>
                  <Text fontSize="sm" color="neutral.600">
                    <strong>Experience:</strong> {job.experience_level}
                  </Text>
                  {job.location && (
                    <Text fontSize="sm" color="neutral.600">
                      <strong>Location:</strong> {job.location}
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
                    onClick={() => handleDeleteJob(job.id, job.job_name)}
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
