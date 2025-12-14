import { Box, VStack, HStack, Text, Heading, Grid, Spinner, Center, Button, Link as ChakraLink, Badge, Input } from "@chakra-ui/react"
import { useState, useEffect, useMemo } from "react"
import { toaster } from "@/components/ui/toaster"
import { apiService, type JobApplication } from "@/services/api"
import { HiDownload, HiMail, HiPhone, HiLocationMarker, HiGlobe, HiClock, HiCurrencyDollar, HiBriefcase, HiSearch, HiFilter } from "react-icons/hi"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'

// Helper functions for labels
const getEmploymentTypeLabel = (type: string): string => {
  const types: Record<string, string> = {
    full_time: "Full-time",
    part_time: "Part-time",
    freelance: "Freelance",
    contract: "Contract",
    internship: "Internship",
  }
  return types[type] || type
}

const getWorkArrangementLabel = (mode: string): string => {
  const modes: Record<string, string> = {
    onsite: "Onsite",
    hybrid: "Hybrid",
    remote: "Remote",
  }
  return modes[mode] || mode
}

export const ApplicationsManagement = () => {
  const [applications, setApplications] = useState<JobApplication[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedJobTitle, setSelectedJobTitle] = useState("all")

  // Fetch applications on component mount
  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      setIsLoading(true)
      const response = await apiService.getJobApplications()
      setApplications(response.data)
    } catch (error) {
      toaster.create({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to fetch applications",
        type: "error",
        duration: 3000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Get unique departments and job titles for filters
  const uniqueDepartments = useMemo(() => {
    const depts = new Set(applications.map(app => app.department).filter(Boolean))
    return Array.from(depts).sort()
  }, [applications])

  const uniqueJobTitles = useMemo(() => {
    const titles = new Set(applications.map(app => app.job_title).filter(Boolean))
    return Array.from(titles).sort()
  }, [applications])

  // Filter applications
  const filteredApplications = useMemo(() => {
    return applications.filter(app => {
      // Search filter
      const searchLower = searchQuery.toLowerCase()
      const matchesSearch = !searchQuery || 
        app.first_name.toLowerCase().includes(searchLower) ||
        app.last_name.toLowerCase().includes(searchLower) ||
        app.email.toLowerCase().includes(searchLower) ||
        app.job_title?.toLowerCase().includes(searchLower) ||
        app.department?.toLowerCase().includes(searchLower)

      // Department filter
      const matchesDepartment = selectedDepartment === "all" || app.department === selectedDepartment

      // Job title filter
      const matchesJobTitle = selectedJobTitle === "all" || app.job_title === selectedJobTitle

      return matchesSearch && matchesDepartment && matchesJobTitle
    })
  }, [applications, searchQuery, selectedDepartment, selectedJobTitle])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleDownloadFile = async (fileUrl: string, applicantName: string, fileType: 'resume' | 'cover_letter') => {
    try {
      // Construct the full URL if it's a relative path
      const fullUrl = fileUrl.startsWith('http') ? fileUrl : `${API_BASE_URL}${fileUrl}`
      
      // Fetch the file with proper headers
      const response = await fetch(fullUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Token ${localStorage.getItem('admin_token')}`,
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to download ${fileType.replace('_', ' ')}`)
      }

      // Get the blob from response
      const blob = await response.blob()
      
      // Create a temporary URL for the blob
      const blobUrl = window.URL.createObjectURL(blob)
      
      // Create a temporary anchor element and trigger download
      const link = document.createElement('a')
      link.href = blobUrl
      
      // Extract filename from the URL or create one
      const extension = fileUrl.split('.').pop() || 'pdf'
      const filename = `${applicantName.replace(/\s+/g, '_')}_${fileType}.${extension}`
      link.download = filename
      
      document.body.appendChild(link)
      link.click()
      
      // Cleanup
      document.body.removeChild(link)
      window.URL.revokeObjectURL(blobUrl)
      
      toaster.create({
        title: "Success",
        description: `${fileType.replace('_', ' ')} downloaded successfully`,
        type: "success",
        duration: 2000,
      })
    } catch (error) {
      toaster.create({
        title: "Error",
        description: error instanceof Error ? error.message : `Failed to download ${fileType.replace('_', ' ')}`,
        type: "error",
        duration: 3000,
      })
    }
  }

  if (isLoading) {
    return (
      <Center py={20}>
        <Spinner size="xl" color="primary.500" />
      </Center>
    )
  }

  return (
    <VStack gap={6} align="stretch">
      {/* Header */}
      <HStack justify="space-between" wrap="wrap" gap={4}>
        <VStack align="start" gap={1}>
          <Heading fontSize="2xl" fontWeight="700" color="text">
            Job Applications
          </Heading>
          <Text fontSize="sm" color="muted">
            {filteredApplications.length} of {applications.length} application{applications.length !== 1 ? 's' : ''}
          </Text>
        </VStack>
        <Button
          variant="outline"
          onClick={fetchApplications}
          size="sm"
        >
          Refresh
        </Button>
      </HStack>

      {/* Filters */}
      <Box
        p={4}
        bg="white"
        borderRadius="xl"
        border="1px solid"
        borderColor="neutral.200"
      >
        <VStack gap={4} align="stretch">
          {/* Search */}
          <Box position="relative">
            <HStack
              position="absolute"
              left={3}
              top="50%"
              transform="translateY(-50%)"
              pointerEvents="none"
              zIndex={1}
            >
              <HiSearch color="var(--chakra-colors-neutral-400)" />
            </HStack>
            <Input
              pl={10}
              placeholder="Search by name, email, job title, or department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              bg="neutral.50"
              borderColor="neutral.200"
              _focus={{ borderColor: "primary.500", bg: "white" }}
            />
          </Box>

          {/* Filter dropdowns */}
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
            <VStack align="stretch" gap={1}>
              <HStack gap={1}>
                <HiFilter size={14} color="var(--chakra-colors-neutral-500)" />
                <Text fontSize="xs" fontWeight="600" color="neutral.600">Department</Text>
              </HStack>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                style={{
                  padding: "8px 12px",
                  borderRadius: "6px",
                  border: "1px solid #E2E8F0",
                  fontSize: "14px",
                  backgroundColor: "#FAFAFA"
                }}
              >
                <option value="all">All Departments ({applications.length})</option>
                {uniqueDepartments.map(dept => {
                  const count = applications.filter(a => a.department === dept).length
                  return (
                    <option key={dept} value={dept}>{dept} ({count})</option>
                  )
                })}
              </select>
            </VStack>
            <VStack align="stretch" gap={1}>
              <HStack gap={1}>
                <HiBriefcase size={14} color="var(--chakra-colors-neutral-500)" />
                <Text fontSize="xs" fontWeight="600" color="neutral.600">Job Title</Text>
              </HStack>
              <select
                value={selectedJobTitle}
                onChange={(e) => setSelectedJobTitle(e.target.value)}
                style={{
                  padding: "8px 12px",
                  borderRadius: "6px",
                  border: "1px solid #E2E8F0",
                  fontSize: "14px",
                  backgroundColor: "#FAFAFA"
                }}
              >
                <option value="all">All Positions ({applications.length})</option>
                {uniqueJobTitles.map(title => {
                  const count = applications.filter(a => a.job_title === title).length
                  return (
                    <option key={title} value={title}>{title} ({count})</option>
                  )
                })}
              </select>
            </VStack>
          </Grid>

          {/* Active filters indicator */}
          {(searchQuery || selectedDepartment !== "all" || selectedJobTitle !== "all") && (
            <HStack gap={2} wrap="wrap">
              <Text fontSize="xs" color="neutral.500">Active filters:</Text>
              {searchQuery && (
                <Badge colorScheme="blue" variant="subtle" borderRadius="full" px={2}>
                  Search: "{searchQuery}"
                  <Button
                    size="xs"
                    variant="ghost"
                    ml={1}
                    p={0}
                    minW="auto"
                    h="auto"
                    onClick={() => setSearchQuery("")}
                  >
                    ×
                  </Button>
                </Badge>
              )}
              {selectedDepartment !== "all" && (
                <Badge colorScheme="purple" variant="subtle" borderRadius="full" px={2}>
                  {selectedDepartment}
                  <Button
                    size="xs"
                    variant="ghost"
                    ml={1}
                    p={0}
                    minW="auto"
                    h="auto"
                    onClick={() => setSelectedDepartment("all")}
                  >
                    ×
                  </Button>
                </Badge>
              )}
              {selectedJobTitle !== "all" && (
                <Badge colorScheme="green" variant="subtle" borderRadius="full" px={2}>
                  {selectedJobTitle}
                  <Button
                    size="xs"
                    variant="ghost"
                    ml={1}
                    p={0}
                    minW="auto"
                    h="auto"
                    onClick={() => setSelectedJobTitle("all")}
                  >
                    ×
                  </Button>
                </Badge>
              )}
              <Button
                size="xs"
                variant="link"
                colorScheme="red"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedDepartment("all")
                  setSelectedJobTitle("all")
                }}
              >
                Clear all
              </Button>
            </HStack>
          )}
        </VStack>
      </Box>

      {/* Applications List */}
      {filteredApplications.length === 0 ? (
        <Box
          p={12}
          bg="white"
          borderRadius="xl"
          border="1px solid"
          borderColor="neutral.200"
          textAlign="center"
        >
          <Text color="neutral.600">
            {applications.length === 0 
              ? "No applications received yet." 
              : "No applications match your filters."}
          </Text>
        </Box>
      ) : (
        <VStack gap={4} align="stretch">
          {filteredApplications.map((application) => (
            <Box
              key={application.id}
              p={6}
              bg="white"
              borderRadius="xl"
              border="1px solid"
              borderColor="neutral.200"
              _hover={{ shadow: "md" }}
              transition="all 0.3s ease"
            >
              <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={6}>
                {/* Left Column - Personal Info */}
                <VStack align="stretch" gap={4}>
                  <VStack align="start" gap={1}>
                    <Heading fontSize="lg" fontWeight="700" color="text">
                      {application.first_name} {application.last_name}
                    </Heading>
                    <Text fontSize="sm" color="muted">
                      Applied on {application.created_at && formatDate(application.created_at)}
                    </Text>
                  </VStack>

                  {/* Job Details Badges */}
                  {(application.job_title || application.department) && (
                    <Box
                      p={3}
                      bg="primary.50"
                      borderRadius="lg"
                      border="1px solid"
                      borderColor="primary.100"
                    >
                      <VStack align="start" gap={2}>
                        {application.job_title && (
                          <HStack gap={2}>
                            <HiBriefcase size={16} color="var(--chakra-colors-primary-600)" />
                            <Text fontSize="sm" fontWeight="600" color="primary.700">
                              {application.job_title}
                            </Text>
                          </HStack>
                        )}
                        <HStack gap={2} wrap="wrap">
                          {application.department && (
                            <Badge colorScheme="purple" variant="subtle" borderRadius="full" px={2}>
                              {application.department}
                            </Badge>
                          )}
                          {application.employment_type && (
                            <Badge colorScheme="blue" variant="subtle" borderRadius="full" px={2}>
                              {getEmploymentTypeLabel(application.employment_type)}
                            </Badge>
                          )}
                          {application.work_arrangement && (
                            <Badge colorScheme="green" variant="subtle" borderRadius="full" px={2}>
                              {getWorkArrangementLabel(application.work_arrangement)}
                            </Badge>
                          )}
                        </HStack>
                      </VStack>
                    </Box>
                  )}

                  <VStack align="stretch" gap={2}>
                    <HStack gap={2}>
                      <HiMail color="var(--chakra-colors-primary-500)" />
                      <ChakraLink href={`mailto:${application.email}`} color="primary.500" fontSize="sm">
                        {application.email}
                      </ChakraLink>
                    </HStack>
                    <HStack gap={2}>
                      <HiPhone color="var(--chakra-colors-primary-500)" />
                      <Text fontSize="sm" color="text">{application.phone_number}</Text>
                    </HStack>
                    <HStack gap={2}>
                      <HiLocationMarker color="var(--chakra-colors-primary-500)" />
                      <Text fontSize="sm" color="text">{application.current_location}</Text>
                    </HStack>
                    {application.linkedin_profile && (
                      <HStack gap={2}>
                        <HiGlobe color="var(--chakra-colors-primary-500)" />
                        <ChakraLink 
                          href={application.linkedin_profile} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          color="primary.500" 
                          fontSize="sm"
                        >
                          LinkedIn Profile
                        </ChakraLink>
                      </HStack>
                    )}
                    {application.portfolio_website && (
                      <HStack gap={2}>
                        <HiGlobe color="var(--chakra-colors-primary-500)" />
                        <ChakraLink 
                          href={application.portfolio_website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          color="primary.500" 
                          fontSize="sm"
                        >
                          Portfolio Website
                        </ChakraLink>
                      </HStack>
                    )}
                  </VStack>

                  {/* Cover Letter Download */}
                  {application.cover_letter && (
                    <Button
                      variant="outline"
                      colorScheme="primary"
                      size="sm"
                      w="full"
                      onClick={() => handleDownloadFile(
                        application.cover_letter,
                        `${application.first_name} ${application.last_name}`,
                        'cover_letter'
                      )}
                    >
                      <HStack gap={2}>
                        <HiDownload />
                        <Text>Download Cover Letter</Text>
                      </HStack>
                    </Button>
                  )}
                </VStack>

                {/* Right Column - Professional Info */}
                <VStack align="stretch" gap={4}>
                  <VStack align="stretch" gap={3}>
                    {application.years_of_experience !== null && application.years_of_experience !== undefined && (
                      <Box p={3} bg="neutral.50" borderRadius="lg">
                        <Text fontSize="xs" color="muted" mb={1}>Experience</Text>
                        <Text fontSize="sm" fontWeight="600" color="text">
                          {application.years_of_experience} years
                        </Text>
                      </Box>
                    )}
                    {application.notice_period && (
                      <Box p={3} bg="neutral.50" borderRadius="lg">
                        <HStack gap={2} mb={1}>
                          <HiClock size={14} color="var(--chakra-colors-neutral-600)" />
                          <Text fontSize="xs" color="muted">Notice Period</Text>
                        </HStack>
                        <Text fontSize="sm" fontWeight="600" color="text">
                          {application.notice_period}
                        </Text>
                      </Box>
                    )}
                    {application.expected_salary && (
                      <Box p={3} bg="neutral.50" borderRadius="lg">
                        <HStack gap={2} mb={1}>
                          <HiCurrencyDollar size={14} color="var(--chakra-colors-neutral-600)" />
                          <Text fontSize="xs" color="muted">Expected Salary</Text>
                        </HStack>
                        <Text fontSize="sm" fontWeight="600" color="text">
                          {application.expected_salary}
                        </Text>
                      </Box>
                    )}
                  </VStack>

                  {/* Resume Download */}
                  {application.resume && (
                    <Button
                      colorScheme="primary"
                      size="sm"
                      w="full"
                      onClick={() => handleDownloadFile(
                        typeof application.resume === 'string' ? application.resume : '',
                        `${application.first_name} ${application.last_name}`,
                        'resume'
                      )}
                    >
                      <HStack gap={2}>
                        <HiDownload />
                        <Text>Download Resume</Text>
                      </HStack>
                    </Button>
                  )}
                </VStack>
              </Grid>
            </Box>
          ))}
        </VStack>
      )}
    </VStack>
  )
}
