import { Box, VStack, HStack, Text, Grid, Spinner, Center, Button, Link as ChakraLink, Badge, Input, Dialog, Portal, CloseButton } from "@chakra-ui/react"
import { useState, useEffect, useMemo } from "react"
import { toaster } from "@/components/ui/toaster"
import { apiService, type JobApplication } from "@/services/api"
import { HiDownload, HiMail, HiPhone, HiLocationMarker, HiGlobe, HiClock, HiCurrencyDollar, HiBriefcase, HiSearch, HiFilter, HiEye, HiDocumentText, HiUser, HiCalendar } from "react-icons/hi"

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
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [previewFile, setPreviewFile] = useState<{ url: string; type: 'resume' | 'cover_letter'; name: string } | null>(null)

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

  const formatShortDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const openApplicationModal = (application: JobApplication) => {
    setSelectedApplication(application)
    setIsModalOpen(true)
    setPreviewFile(null)
  }

  const closeApplicationModal = () => {
    setIsModalOpen(false)
    setSelectedApplication(null)
    setPreviewFile(null)
  }

  const handleViewFile = (fileUrl: string, fileType: 'resume' | 'cover_letter', applicantName: string) => {
    const fullUrl = fileUrl.startsWith('http') ? fileUrl : `${API_BASE_URL}${fileUrl}`
    setPreviewFile({ url: fullUrl, type: fileType, name: applicantName })
  }

  const closeFilePreview = () => {
    setPreviewFile(null)
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
                variant="plain"
                color="red.500"
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
        <Box
          bg="white"
          borderRadius="xl"
          border="1px solid"
          borderColor="neutral.200"
          overflow="hidden"
        >
          {/* Table Header */}
          <Grid
            templateColumns={{ base: "1fr", md: "2fr 1.5fr 1fr 1fr auto" }}
            gap={4}
            p={4}
            bg="neutral.50"
            borderBottom="1px solid"
            borderColor="neutral.200"
            display={{ base: "none", md: "grid" }}
          >
            <Text fontSize="xs" fontWeight="700" color="neutral.600" textTransform="uppercase">
              Candidate
            </Text>
            <Text fontSize="xs" fontWeight="700" color="neutral.600" textTransform="uppercase">
              Position
            </Text>
            <Text fontSize="xs" fontWeight="700" color="neutral.600" textTransform="uppercase">
              Type
            </Text>
            <Text fontSize="xs" fontWeight="700" color="neutral.600" textTransform="uppercase">
              Applied
            </Text>
            <Text fontSize="xs" fontWeight="700" color="neutral.600" textTransform="uppercase">
              Action
            </Text>
          </Grid>

          {/* Table Rows */}
          <VStack gap={0} align="stretch">
            {filteredApplications.map((application, index) => (
              <Grid
                key={application.id}
                templateColumns={{ base: "1fr", md: "2fr 1.5fr 1fr 1fr auto" }}
                gap={4}
                p={4}
                alignItems="center"
                borderBottom={index < filteredApplications.length - 1 ? "1px solid" : "none"}
                borderColor="neutral.100"
                _hover={{ bg: "neutral.50" }}
                transition="background 0.2s ease"
                cursor="pointer"
                onClick={() => openApplicationModal(application)}
              >
                {/* Candidate Info */}
                <HStack gap={3}>
                  <Box
                    w={10}
                    h={10}
                    borderRadius="full"
                    bg="primary.100"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexShrink={0}
                  >
                    <Text fontSize="sm" fontWeight="700" color="primary.600">
                      {application.first_name[0]}{application.last_name[0]}
                    </Text>
                  </Box>
                  <VStack align="start" gap={0}>
                    <Text fontSize="sm" fontWeight="600" color="text">
                      {application.first_name} {application.last_name}
                    </Text>
                    <Text fontSize="xs" color="muted" display={{ base: "block", md: "none" }}>
                      {application.job_title || "No position"}
                    </Text>
                    <Text fontSize="xs" color="muted" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
                      {application.email}
                    </Text>
                  </VStack>
                </HStack>

                {/* Position */}
                <VStack align="start" gap={1} display={{ base: "none", md: "flex" }}>
                  <Text fontSize="sm" fontWeight="500" color="text" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
                    {application.job_title || "—"}
                  </Text>
                  {application.department && (
                    <Badge colorScheme="purple" variant="subtle" size="sm" borderRadius="full">
                      {application.department}
                    </Badge>
                  )}
                </VStack>

                {/* Type Badges */}
                <HStack gap={1} wrap="wrap" display={{ base: "none", md: "flex" }}>
                  {application.employment_type && (
                    <Badge colorScheme="blue" variant="subtle" size="sm" borderRadius="full">
                      {getEmploymentTypeLabel(application.employment_type)}
                    </Badge>
                  )}
                  {application.work_arrangement && (
                    <Badge colorScheme="green" variant="subtle" size="sm" borderRadius="full">
                      {getWorkArrangementLabel(application.work_arrangement)}
                    </Badge>
                  )}
                </HStack>

                {/* Date */}
                <Text fontSize="sm" color="muted" display={{ base: "none", md: "block" }}>
                  {application.created_at && formatShortDate(application.created_at)}
                </Text>

                {/* View Button */}
                <Button
                  size="sm"
                  variant="outline"
                  colorScheme="primary"
                  onClick={(e) => {
                    e.stopPropagation()
                    openApplicationModal(application)
                  }}
                >
                  <HStack gap={1}>
                    <HiEye size={14} />
                    <Text display={{ base: "none", sm: "inline" }}>View</Text>
                  </HStack>
                </Button>
              </Grid>
            ))}
          </VStack>
        </Box>
      )}

      {/* Application Detail Modal */}
      <Dialog.Root open={isModalOpen} onOpenChange={(e) => !e.open && closeApplicationModal()} size="xl">
        <Portal>
          <Dialog.Backdrop bg="blackAlpha.600" />
          <Dialog.Positioner>
            <Dialog.Content
              bg="white"
              borderRadius="2xl"
              maxW="900px"
              w="95vw"
              maxH="90vh"
              overflow="hidden"
            >
              {selectedApplication && (
                <>
                  <Dialog.Header p={6} borderBottom="1px solid" borderColor="neutral.100">
                    <HStack justify="space-between" w="full">
                      <VStack align="start" gap={1}>
                        <Dialog.Title fontSize="xl" fontWeight="700" color="text">
                          {selectedApplication.first_name} {selectedApplication.last_name}
                        </Dialog.Title>
                        <Text fontSize="sm" color="muted">
                          Applied on {selectedApplication.created_at && formatDate(selectedApplication.created_at)}
                        </Text>
                      </VStack>
                      <Dialog.CloseTrigger asChild>
                        <CloseButton size="sm" />
                      </Dialog.CloseTrigger>
                    </HStack>
                  </Dialog.Header>

                  <Dialog.Body p={0} overflow="auto" maxH="calc(90vh - 180px)">
                    {/* File Preview Section */}
                    {previewFile && (
                      <Box
                        p={4}
                        bg="neutral.900"
                        borderBottom="1px solid"
                        borderColor="neutral.700"
                      >
                        <VStack gap={3} align="stretch">
                          <HStack justify="space-between">
                            <HStack gap={2}>
                              <HiDocumentText color="white" size={18} />
                              <Text color="white" fontSize="sm" fontWeight="600">
                                {previewFile.type === 'resume' ? 'Resume' : 'Cover Letter'} - {previewFile.name}
                              </Text>
                            </HStack>
                            <HStack gap={2}>
                              <Button
                                size="xs"
                                variant="outline"
                                colorScheme="whiteAlpha"
                                onClick={() => handleDownloadFile(
                                  previewFile.url,
                                  previewFile.name,
                                  previewFile.type
                                )}
                              >
                                <HStack gap={1}>
                                  <HiDownload size={12} />
                                  <Text>Download</Text>
                                </HStack>
                              </Button>
                              <Button
                                size="xs"
                                variant="ghost"
                                colorScheme="whiteAlpha"
                                onClick={closeFilePreview}
                              >
                                Close Preview
                              </Button>
                            </HStack>
                          </HStack>
                          <Box
                            bg="white"
                            borderRadius="lg"
                            overflow="hidden"
                            h="400px"
                          >
                            <iframe
                              src={`${previewFile.url}#toolbar=1&navpanes=0`}
                              width="100%"
                              height="100%"
                              style={{ border: 'none' }}
                              title={`${previewFile.type} preview`}
                            />
                          </Box>
                        </VStack>
                      </Box>
                    )}

                    <Box p={6}>
                      <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={6}>
                        {/* Left Column - Personal & Contact Info */}
                        <VStack align="stretch" gap={5}>
                          {/* Job Applied For */}
                          {(selectedApplication.job_title || selectedApplication.department) && (
                            <Box
                              p={4}
                              bg="primary.50"
                              borderRadius="xl"
                              border="1px solid"
                              borderColor="primary.100"
                            >
                              <VStack align="start" gap={3}>
                                <HStack gap={2}>
                                  <HiBriefcase size={18} color="var(--chakra-colors-primary-600)" />
                                  <Text fontSize="sm" fontWeight="700" color="primary.700">
                                    Position Applied
                                  </Text>
                                </HStack>
                                {selectedApplication.job_title && (
                                  <Text fontSize="md" fontWeight="600" color="text">
                                    {selectedApplication.job_title}
                                  </Text>
                                )}
                                <HStack gap={2} wrap="wrap">
                                  {selectedApplication.department && (
                                    <Badge colorScheme="purple" variant="subtle" borderRadius="full" px={3}>
                                      {selectedApplication.department}
                                    </Badge>
                                  )}
                                  {selectedApplication.employment_type && (
                                    <Badge colorScheme="blue" variant="subtle" borderRadius="full" px={3}>
                                      {getEmploymentTypeLabel(selectedApplication.employment_type)}
                                    </Badge>
                                  )}
                                  {selectedApplication.work_arrangement && (
                                    <Badge colorScheme="green" variant="subtle" borderRadius="full" px={3}>
                                      {getWorkArrangementLabel(selectedApplication.work_arrangement)}
                                    </Badge>
                                  )}
                                </HStack>
                              </VStack>
                            </Box>
                          )}

                          {/* Contact Information */}
                          <Box>
                            <HStack gap={2} mb={3}>
                              <HiUser size={16} color="var(--chakra-colors-neutral-500)" />
                              <Text fontSize="sm" fontWeight="700" color="neutral.600">
                                Contact Information
                              </Text>
                            </HStack>
                            <VStack align="stretch" gap={3} p={4} bg="neutral.50" borderRadius="xl">
                              <HStack gap={3}>
                                <Box w={8} h={8} borderRadius="lg" bg="primary.100" display="flex" alignItems="center" justifyContent="center">
                                  <HiMail size={14} color="var(--chakra-colors-primary-600)" />
                                </Box>
                                <VStack align="start" gap={0}>
                                  <Text fontSize="xs" color="muted">Email</Text>
                                  <ChakraLink href={`mailto:${selectedApplication.email}`} color="primary.500" fontSize="sm" fontWeight="500">
                                    {selectedApplication.email}
                                  </ChakraLink>
                                </VStack>
                              </HStack>

                              <HStack gap={3}>
                                <Box w={8} h={8} borderRadius="lg" bg="primary.100" display="flex" alignItems="center" justifyContent="center">
                                  <HiPhone size={14} color="var(--chakra-colors-primary-600)" />
                                </Box>
                                <VStack align="start" gap={0}>
                                  <Text fontSize="xs" color="muted">Phone</Text>
                                  <Text fontSize="sm" fontWeight="500" color="text">
                                    {selectedApplication.phone_number}
                                  </Text>
                                </VStack>
                              </HStack>

                              <HStack gap={3}>
                                <Box w={8} h={8} borderRadius="lg" bg="primary.100" display="flex" alignItems="center" justifyContent="center">
                                  <HiLocationMarker size={14} color="var(--chakra-colors-primary-600)" />
                                </Box>
                                <VStack align="start" gap={0}>
                                  <Text fontSize="xs" color="muted">Location</Text>
                                  <Text fontSize="sm" fontWeight="500" color="text">
                                    {selectedApplication.current_location}
                                  </Text>
                                </VStack>
                              </HStack>

                              {selectedApplication.linkedin_profile && (
                                <HStack gap={3}>
                                  <Box w={8} h={8} borderRadius="lg" bg="blue.100" display="flex" alignItems="center" justifyContent="center">
                                    <HiGlobe size={14} color="var(--chakra-colors-blue-600)" />
                                  </Box>
                                  <VStack align="start" gap={0}>
                                    <Text fontSize="xs" color="muted">LinkedIn</Text>
                                    <ChakraLink 
                                      href={selectedApplication.linkedin_profile} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      color="primary.500" 
                                      fontSize="sm"
                                      fontWeight="500"
                                    >
                                      View Profile →
                                    </ChakraLink>
                                  </VStack>
                                </HStack>
                              )}

                              {selectedApplication.portfolio_website && (
                                <HStack gap={3}>
                                  <Box w={8} h={8} borderRadius="lg" bg="purple.100" display="flex" alignItems="center" justifyContent="center">
                                    <HiGlobe size={14} color="var(--chakra-colors-purple-600)" />
                                  </Box>
                                  <VStack align="start" gap={0}>
                                    <Text fontSize="xs" color="muted">Portfolio</Text>
                                    <ChakraLink 
                                      href={selectedApplication.portfolio_website} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      color="primary.500" 
                                      fontSize="sm"
                                      fontWeight="500"
                                    >
                                      View Website →
                                    </ChakraLink>
                                  </VStack>
                                </HStack>
                              )}
                            </VStack>
                          </Box>
                        </VStack>

                        {/* Right Column - Professional Info & Documents */}
                        <VStack align="stretch" gap={5}>
                          {/* Professional Details */}
                          <Box>
                            <HStack gap={2} mb={3}>
                              <HiCalendar size={16} color="var(--chakra-colors-neutral-500)" />
                              <Text fontSize="sm" fontWeight="700" color="neutral.600">
                                Professional Details
                              </Text>
                            </HStack>
                            <Grid templateColumns="repeat(2, 1fr)" gap={3}>
                              {selectedApplication.years_of_experience !== null && selectedApplication.years_of_experience !== undefined && (
                                <Box p={4} bg="neutral.50" borderRadius="xl">
                                  <Text fontSize="xs" color="muted" mb={1}>Experience</Text>
                                  <Text fontSize="lg" fontWeight="700" color="text">
                                    {selectedApplication.years_of_experience}
                                    <Text as="span" fontSize="sm" fontWeight="500" color="muted"> years</Text>
                                  </Text>
                                </Box>
                              )}

                              {selectedApplication.notice_period && (
                                <Box p={4} bg="neutral.50" borderRadius="xl">
                                  <HStack gap={1} mb={1}>
                                    <HiClock size={12} color="var(--chakra-colors-neutral-500)" />
                                    <Text fontSize="xs" color="muted">Notice Period</Text>
                                  </HStack>
                                  <Text fontSize="md" fontWeight="600" color="text">
                                    {selectedApplication.notice_period}
                                  </Text>
                                </Box>
                              )}

                              {selectedApplication.expected_salary && (
                                <Box p={4} bg="neutral.50" borderRadius="xl" gridColumn={!selectedApplication.years_of_experience && !selectedApplication.notice_period ? "span 2" : "auto"}>
                                  <HStack gap={1} mb={1}>
                                    <HiCurrencyDollar size={12} color="var(--chakra-colors-neutral-500)" />
                                    <Text fontSize="xs" color="muted">Expected Salary</Text>
                                  </HStack>
                                  <Text fontSize="md" fontWeight="600" color="text">
                                    {selectedApplication.expected_salary}
                                  </Text>
                                </Box>
                              )}
                            </Grid>
                          </Box>

                          {/* Documents */}
                          <Box>
                            <HStack gap={2} mb={3}>
                              <HiDocumentText size={16} color="var(--chakra-colors-neutral-500)" />
                              <Text fontSize="sm" fontWeight="700" color="neutral.600">
                                Documents
                              </Text>
                            </HStack>
                            <VStack align="stretch" gap={3}>
                              {/* Resume */}
                              {selectedApplication.resume && (
                                <Box
                                  p={4}
                                  bg="neutral.50"
                                  borderRadius="xl"
                                  border="1px solid"
                                  borderColor="neutral.200"
                                  _hover={{ borderColor: "primary.300", bg: "primary.50" }}
                                  transition="all 0.2s ease"
                                >
                                  <HStack justify="space-between">
                                    <HStack gap={3}>
                                      <Box
                                        w={10}
                                        h={10}
                                        borderRadius="lg"
                                        bg="primary.100"
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                      >
                                        <HiDocumentText size={20} color="var(--chakra-colors-primary-600)" />
                                      </Box>
                                      <VStack align="start" gap={0}>
                                        <Text fontSize="sm" fontWeight="600" color="text">Resume</Text>
                                        <Text fontSize="xs" color="muted">
                                          {typeof selectedApplication.resume === 'string' 
                                            ? selectedApplication.resume.split('/').pop() 
                                            : 'Document'}
                                        </Text>
                                      </VStack>
                                    </HStack>
                                    <HStack gap={2}>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        colorScheme="primary"
                                        onClick={() => handleViewFile(
                                          typeof selectedApplication.resume === 'string' ? selectedApplication.resume : '',
                                          'resume',
                                          `${selectedApplication.first_name} ${selectedApplication.last_name}`
                                        )}
                                      >
                                        {/* <HStack gap={1}>
                                          <HiEye size={14} />
                                          <Text>View</Text>
                                        </HStack> */}
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        colorScheme="primary"
                                        onClick={() => handleDownloadFile(
                                          typeof selectedApplication.resume === 'string' ? selectedApplication.resume : '',
                                          `${selectedApplication.first_name} ${selectedApplication.last_name}`,
                                          'resume'
                                        )}
                                      >
                                        <HStack gap={1}>
                                          <HiDownload size={14} />
                                          <Text>Download</Text>
                                        </HStack>
                                      </Button>
                                    </HStack>
                                  </HStack>
                                </Box>
                              )}

                              {/* Cover Letter */}
                              {selectedApplication.cover_letter && (
                                <Box
                                  p={4}
                                  bg="neutral.50"
                                  borderRadius="xl"
                                  border="1px solid"
                                  borderColor="neutral.200"
                                  _hover={{ borderColor: "primary.300", bg: "primary.50" }}
                                  transition="all 0.2s ease"
                                >
                                  <HStack justify="space-between">
                                    <HStack gap={3}>
                                      <Box
                                        w={10}
                                        h={10}
                                        borderRadius="lg"
                                        bg="green.100"
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                      >
                                        <HiDocumentText size={20} color="var(--chakra-colors-green-600)" />
                                      </Box>
                                      <VStack align="start" gap={0}>
                                        <Text fontSize="sm" fontWeight="600" color="text">Cover Letter</Text>
                                        <Text fontSize="xs" color="muted">
                                          {selectedApplication.cover_letter.split('/').pop()}
                                        </Text>
                                      </VStack>
                                    </HStack>
                                    <HStack gap={2}>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        colorScheme="primary"
                                        onClick={() => handleViewFile(
                                          selectedApplication.cover_letter,
                                          'cover_letter',
                                          `${selectedApplication.first_name} ${selectedApplication.last_name}`
                                        )}
                                      >
                                        {/* <HStack gap={1}>
                                          <HiEye size={14} />
                                          <Text>View</Text>
                                        </HStack> */}
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        colorScheme="primary"
                                        onClick={() => handleDownloadFile(
                                          selectedApplication.cover_letter,
                                          `${selectedApplication.first_name} ${selectedApplication.last_name}`,
                                          'cover_letter'
                                        )}
                                      >
                                        <HStack gap={1}>
                                          <HiDownload size={14} />
                                          <Text>Download</Text>
                                        </HStack>
                                      </Button>
                                    </HStack>
                                  </HStack>
                                </Box>
                              )}

                              {!selectedApplication.resume && !selectedApplication.cover_letter && (
                                <Box p={4} bg="neutral.50" borderRadius="xl" textAlign="center">
                                  <Text fontSize="sm" color="muted">No documents uploaded</Text>
                                </Box>
                              )}
                            </VStack>
                          </Box>
                        </VStack>
                      </Grid>
                    </Box>
                  </Dialog.Body>

                  <Dialog.Footer p={4} borderTop="1px solid" borderColor="neutral.100">
                    <HStack justify="space-between" w="full">
                      <Text fontSize="xs" color="muted">
                        Application ID: #{selectedApplication.id}
                      </Text>
                      <HStack gap={2}>
                        <Button
                          variant="ghost"
                          onClick={closeApplicationModal}
                        >
                          Close
                        </Button>
                        {selectedApplication.email && (
                          <ChakraLink
                            href={`mailto:${selectedApplication.email}?subject=Regarding your application for ${selectedApplication.job_title || 'the position'}`}
                            _hover={{ textDecoration: "none" }}
                          >
                            <Button colorScheme="primary">
                              <HStack gap={2}>
                                <HiMail size={16} />
                                <Text>Contact Candidate</Text>
                              </HStack>
                            </Button>
                          </ChakraLink>
                        )}
                      </HStack>
                    </HStack>
                  </Dialog.Footer>
                </>
              )}
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </VStack>
  )
}
