import { Box, VStack, HStack, Text, Heading, Grid, Spinner, Center, Button, Link as ChakraLink } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { toaster } from "@/components/ui/toaster"
import { apiService, type JobApplication } from "@/services/api"
import { HiDownload, HiMail, HiPhone, HiLocationMarker, HiGlobe, HiClock, HiCurrencyDollar } from "react-icons/hi"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'

export const ApplicationsManagement = () => {
  const [applications, setApplications] = useState<JobApplication[]>([])
  const [isLoading, setIsLoading] = useState(true)

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleDownloadResume = async (resumeUrl: string, applicantName: string) => {
    try {
      // Construct the full URL if it's a relative path
      const fullUrl = resumeUrl.startsWith('http') ? resumeUrl : `${API_BASE_URL}${resumeUrl}`
      
      // Fetch the file with proper headers
      const response = await fetch(fullUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Token ${localStorage.getItem('admin_token')}`,
        },
      })

      if (!response.ok) {
        throw new Error('Failed to download resume')
      }

      // Get the blob from response
      const blob = await response.blob()
      
      // Create a temporary URL for the blob
      const blobUrl = window.URL.createObjectURL(blob)
      
      // Create a temporary anchor element and trigger download
      const link = document.createElement('a')
      link.href = blobUrl
      
      // Extract filename from the URL or create one
      const filename = resumeUrl.split('/').pop() || `${applicantName.replace(/\s+/g, '_')}_resume.pdf`
      link.download = filename
      
      document.body.appendChild(link)
      link.click()
      
      // Cleanup
      document.body.removeChild(link)
      window.URL.revokeObjectURL(blobUrl)
      
      toaster.create({
        title: "Success",
        description: "Resume downloaded successfully",
        type: "success",
        duration: 2000,
      })
    } catch (error) {
      toaster.create({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to download resume",
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
      <HStack justify="space-between">
        <VStack align="start" gap={1}>
          <Heading fontSize="2xl" fontWeight="700" color="text">
            Job Applications
          </Heading>
          <Text fontSize="sm" color="muted">
            {applications.length} application{applications.length !== 1 ? 's' : ''} received
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

      {/* Applications List */}
      {applications.length === 0 ? (
        <Box
          p={12}
          bg="white"
          borderRadius="xl"
          border="1px solid"
          borderColor="neutral.200"
          textAlign="center"
        >
          <Text color="neutral.600">No applications received yet.</Text>
        </Box>
      ) : (
        <VStack gap={4} align="stretch">
          {applications.map((application) => (
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

                  {/* Cover Letter */}
                  <Box>
                    <Text fontSize="sm" fontWeight="600" mb={2} color="text">
                      Cover Letter:
                    </Text>
                    <Text fontSize="sm" color="muted" lineHeight="1.6">
                      {application.cover_letter}
                    </Text>
                  </Box>
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
                      onClick={() => handleDownloadResume(
                        typeof application.resume === 'string' ? application.resume : '',
                        `${application.first_name} ${application.last_name}`
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
