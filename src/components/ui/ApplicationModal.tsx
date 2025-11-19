import {
  Box,
  Button,
  HStack,
  VStack,
  Text,
  Heading,
  Badge,
  Circle,
  Grid,
  Icon,
  IconButton,
  Portal,
} from "@chakra-ui/react"
import { AnimatePresence, motion } from "framer-motion"
import { HiX, HiMail, HiPhone } from "react-icons/hi"
import { useEffect } from "react"
import { toaster } from "@/components/ui/toaster"

interface Application {
  id: number
  name: string
  email: string
  phone: string
  position: string
  department: string
  experience: string
  appliedDate: string
  status: string
  resume: string
  coverLetter: string
  linkedIn?: string
  location?: string
  portfolio?: string
  noticePeriod?: string
  expectedSalary?: string
}

interface ApplicationModalProps {
  isOpen: boolean
  onClose: () => void
  application: Application | null
}

const MotionBox = motion(Box)

const getStatusColor = (status: string) => {
  switch (status) {
    case "New":
      return "blue"
    case "Reviewing":
      return "purple"
    case "Shortlisted":
      return "green"
    case "Rejected":
      return "red"
    default:
      return "gray"
  }
}

export const ApplicationModal = ({ isOpen, onClose, application }: ApplicationModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  if (!application) return null

  return (
    <Portal>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <MotionBox
              position="fixed"
              top={0}
              left={0}
              right={0}
              bottom={0}
              bg="rgba(0, 0, 0, 0.5)"
              backdropFilter="blur(4px)"
              zIndex={1000}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />

            {/* Modal Content */}
            <MotionBox
              position="fixed"
              top="50%"
              left="50%"
              bg="white"
              borderRadius="2xl"
              boxShadow="2xl"
              zIndex={1001}
              maxW="4xl"
              w="90%"
              maxH="90vh"
              overflow="auto"
              initial={{ opacity: 0, scale: 0.95, x: "-50%", y: "-50%" }}
              animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
              exit={{ opacity: 0, scale: 0.95, x: "-50%", y: "-50%" }}
              transition={{ duration: 0.2 }}
            >
              {/* Header */}
              <Box p={6} borderBottom="1px solid" borderColor="neutral.200">
                <HStack justify="space-between">
                  <HStack gap={3}>
                    <Circle size="56px" bg="primary.100" color="primary.600" fontWeight="600" fontSize="xl">
                      {application.name.charAt(0).toUpperCase()}
                    </Circle>
                    <VStack align="start" gap={0}>
                      <Heading fontSize="xl" fontWeight="700">
                        {application.name}
                      </Heading>
                      <Text fontSize="sm" color="neutral.600">
                        Application for {application.position}
                      </Text>
                    </VStack>
                  </HStack>
                  <IconButton
                    aria-label="Close modal"
                    onClick={onClose}
                    variant="ghost"
                    size="sm"
                  >
                    <Icon as={HiX} fontSize="xl" />
                  </IconButton>
                </HStack>
              </Box>

              {/* Body */}
              <Box p={6}>
                <VStack gap={6} align="stretch">
                  {/* Contact Information */}
                  <Box>
                    <Heading fontSize="md" fontWeight="700" mb={3} color="neutral.900">
                      Contact Information
                    </Heading>
                    <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={3}>
                      <HStack gap={2}>
                        <Icon as={HiMail} color="primary.500" fontSize="lg" />
                        <VStack align="start" gap={0}>
                          <Text fontSize="xs" color="neutral.600">Email</Text>
                          <Text fontSize="sm" fontWeight="600" color="neutral.900">
                            {application.email}
                          </Text>
                        </VStack>
                      </HStack>
                      <HStack gap={2}>
                        <Icon as={HiPhone} color="primary.500" fontSize="lg" />
                        <VStack align="start" gap={0}>
                          <Text fontSize="xs" color="neutral.600">Phone</Text>
                          <Text fontSize="sm" fontWeight="600" color="neutral.900">
                            {application.phone}
                          </Text>
                        </VStack>
                      </HStack>
                      {application.location && (
                        <HStack gap={2}>
                          <Icon as={HiMail} color="primary.500" fontSize="lg" />
                          <VStack align="start" gap={0}>
                            <Text fontSize="xs" color="neutral.600">Location</Text>
                            <Text fontSize="sm" fontWeight="600" color="neutral.900">
                              {application.location}
                            </Text>
                          </VStack>
                        </HStack>
                      )}
                    </Grid>
                  </Box>

                  {/* Application Details */}
                  <Box>
                    <Heading fontSize="md" fontWeight="700" mb={3} color="neutral.900">
                      Application Details
                    </Heading>
                    <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
                      <VStack align="start" gap={1}>
                        <Text fontSize="xs" color="neutral.600">Position</Text>
                        <Badge colorScheme="blue" fontSize="sm">
                          {application.position}
                        </Badge>
                      </VStack>
                      <VStack align="start" gap={1}>
                        <Text fontSize="xs" color="neutral.600">Department</Text>
                        <Text fontSize="sm" fontWeight="600" color="neutral.900">
                          {application.department}
                        </Text>
                      </VStack>
                      <VStack align="start" gap={1}>
                        <Text fontSize="xs" color="neutral.600">Experience</Text>
                        <Text fontSize="sm" fontWeight="600" color="neutral.900">
                          {application.experience}
                        </Text>
                      </VStack>
                      <VStack align="start" gap={1}>
                        <Text fontSize="xs" color="neutral.600">Applied Date</Text>
                        <Text fontSize="sm" fontWeight="600" color="neutral.900">
                          {new Date(application.appliedDate).toLocaleDateString()}
                        </Text>
                      </VStack>
                      <VStack align="start" gap={1}>
                        <Text fontSize="xs" color="neutral.600">Status</Text>
                        <Badge colorScheme={getStatusColor(application.status)} fontSize="sm">
                          {application.status}
                        </Badge>
                      </VStack>
                      {application.noticePeriod && (
                        <VStack align="start" gap={1}>
                          <Text fontSize="xs" color="neutral.600">Notice Period</Text>
                          <Text fontSize="sm" fontWeight="600" color="neutral.900">
                            {application.noticePeriod}
                          </Text>
                        </VStack>
                      )}
                      {application.expectedSalary && (
                        <VStack align="start" gap={1}>
                          <Text fontSize="xs" color="neutral.600">Expected Salary</Text>
                          <Text fontSize="sm" fontWeight="600" color="neutral.900">
                            {application.expectedSalary}
                          </Text>
                        </VStack>
                      )}
                      <VStack align="start" gap={1}>
                        <Text fontSize="xs" color="neutral.600">Resume</Text>
                        <Button
                          size="xs"
                          variant="outline"
                          colorScheme="blue"
                          onClick={() => {
                            toaster.create({
                              title: "Resume Downloaded",
                              description: application.resume,
                              type: "info",
                              duration: 3000,
                            })
                          }}
                        >
                          Download {application.resume}
                        </Button>
                      </VStack>
                    </Grid>
                  </Box>

                  {/* Cover Letter */}
                  <Box>
                    <Heading fontSize="md" fontWeight="700" mb={3} color="neutral.900">
                      Cover Letter
                    </Heading>
                    <Box
                      p={4}
                      bg="neutral.50"
                      borderRadius="lg"
                      border="1px solid"
                      borderColor="neutral.200"
                    >
                      <Text fontSize="sm" color="neutral.700" lineHeight="1.7">
                        {application.coverLetter}
                      </Text>
                    </Box>
                  </Box>

                  {/* LinkedIn */}
                  {(application.linkedIn || application.portfolio) && (
                    <Box>
                      <Heading fontSize="md" fontWeight="700" mb={3} color="neutral.900">
                        Professional Links
                      </Heading>
                      <HStack gap={3} wrap="wrap">
                        {application.linkedIn && (
                          <Button
                            variant="outline"
                            colorScheme="blue"
                            onClick={() => window.open(application.linkedIn, "_blank")}
                          >
                            View LinkedIn Profile
                          </Button>
                        )}
                        {application.portfolio && (
                          <Button
                            variant="outline"
                            colorScheme="purple"
                            onClick={() => window.open(application.portfolio, "_blank")}
                          >
                            View Portfolio
                          </Button>
                        )}
                      </HStack>
                    </Box>
                  )}
                </VStack>
              </Box>

              {/* Footer */}
              <Box p={6} borderTop="1px solid" borderColor="neutral.200">
                <HStack gap={3} w="full" justify="space-between">
                  <HStack gap={2}>
                    <Button
                      colorScheme="green"
                      onClick={() => {
                        toaster.create({
                          title: "Application Shortlisted",
                          description: `${application.name} has been shortlisted`,
                          type: "success",
                          duration: 3000,
                        })
                        onClose()
                      }}
                    >
                      Shortlist Candidate
                    </Button>
                    <Button
                      colorScheme="red"
                      variant="outline"
                      onClick={() => {
                        toaster.create({
                          title: "Application Rejected",
                          description: `${application.name}'s application has been rejected`,
                          type: "info",
                          duration: 3000,
                        })
                        onClose()
                      }}
                    >
                      Reject
                    </Button>
                  </HStack>
                  <Button variant="outline" onClick={onClose}>
                    Close
                  </Button>
                </HStack>
              </Box>
            </MotionBox>
          </>
        )}
      </AnimatePresence>
    </Portal>
  )
}
