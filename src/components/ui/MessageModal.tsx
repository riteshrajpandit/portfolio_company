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
import { HiX, HiMail, HiPhone, HiGlobeAlt, HiCalendar, HiClock } from "react-icons/hi"
import { useEffect } from "react"

interface Message {
  id: number
  name: string
  email: string
  company: string
  phoneNumber: string
  website: string
  meetingTool: string
  agenda: string
  dateTime: string
  message: string
  submittedDate: string
  status: string
}

interface MessageModalProps {
  isOpen: boolean
  onClose: () => void
  message: Message | null
}

const MotionBox = motion(Box)

const getStatusColor = (status: string) => {
  switch (status) {
    case "unread":
      return "blue"
    case "read":
      return "gray"
    case "replied":
      return "green"
    default:
      return "gray"
  }
}

const getMeetingToolLabel = (tool: string) => {
  const labels: Record<string, string> = {
    "zoom": "Zoom",
    "google-meet": "Google Meet",
    "microsoft-teams": "Microsoft Teams",
    "in-person": "In-Person Meeting",
    "phone": "Phone Call"
  }
  return labels[tool] || tool
}

const getAgendaLabel = (agenda: string) => {
  const labels: Record<string, string> = {
    "it-consulting": "IT Consulting",
    "amigaa": "Amigaa Solutions",
    "erp-solutions": "ERP Solutions",
    "security-consulting": "Security Consulting",
    "web-development": "Web Development",
    "mobile-development": "Mobile App Development",
    "cloud-services": "Cloud Services",
    "other": "Other"
  }
  return labels[agenda] || agenda
}

export const MessageModal = ({ isOpen, onClose, message }: MessageModalProps) => {
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

  if (!message) return null

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
                      {message.name.charAt(0).toUpperCase()}
                    </Circle>
                    <VStack align="start" gap={0}>
                      <Heading fontSize="xl" fontWeight="700">
                        {message.name}
                      </Heading>
                      <Text fontSize="sm" color="neutral.600">
                        {message.company}
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
                            {message.email}
                          </Text>
                        </VStack>
                      </HStack>
                      {message.phoneNumber && (
                        <HStack gap={2}>
                          <Icon as={HiPhone} color="primary.500" fontSize="lg" />
                          <VStack align="start" gap={0}>
                            <Text fontSize="xs" color="neutral.600">Phone</Text>
                            <Text fontSize="sm" fontWeight="600" color="neutral.900">
                              {message.phoneNumber}
                            </Text>
                          </VStack>
                        </HStack>
                      )}
                      {message.website && (
                        <HStack gap={2}>
                          <Icon as={HiGlobeAlt} color="primary.500" fontSize="lg" />
                          <VStack align="start" gap={0}>
                            <Text fontSize="xs" color="neutral.600">Website</Text>
                            <Text fontSize="sm" fontWeight="600" color="primary.500" cursor="pointer" onClick={() => window.open(message.website, "_blank")}>
                              {message.website}
                            </Text>
                          </VStack>
                        </HStack>
                      )}
                    </Grid>
                  </Box>

                  {/* Meeting Details */}
                  <Box>
                    <Heading fontSize="md" fontWeight="700" mb={3} color="neutral.900">
                      Meeting Details
                    </Heading>
                    <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
                      <VStack align="start" gap={1}>
                        <Text fontSize="xs" color="neutral.600">Meeting Tool</Text>
                        <Badge colorScheme="purple" fontSize="sm">
                          {getMeetingToolLabel(message.meetingTool)}
                        </Badge>
                      </VStack>
                      <VStack align="start" gap={1}>
                        <Text fontSize="xs" color="neutral.600">Agenda</Text>
                        <Badge colorScheme="blue" fontSize="sm">
                          {getAgendaLabel(message.agenda)}
                        </Badge>
                      </VStack>
                      <VStack align="start" gap={1}>
                        <HStack gap={1}>
                          <Icon as={HiCalendar} color="neutral.600" fontSize="sm" />
                          <Text fontSize="xs" color="neutral.600">Requested Date & Time</Text>
                        </HStack>
                        <Text fontSize="sm" fontWeight="600" color="neutral.900">
                          {new Date(message.dateTime).toLocaleString()}
                        </Text>
                      </VStack>
                      <VStack align="start" gap={1}>
                        <HStack gap={1}>
                          <Icon as={HiClock} color="neutral.600" fontSize="sm" />
                          <Text fontSize="xs" color="neutral.600">Submitted On</Text>
                        </HStack>
                        <Text fontSize="sm" fontWeight="600" color="neutral.900">
                          {new Date(message.submittedDate).toLocaleString()}
                        </Text>
                      </VStack>
                      <VStack align="start" gap={1}>
                        <Text fontSize="xs" color="neutral.600">Status</Text>
                        <Badge colorScheme={getStatusColor(message.status)} fontSize="sm">
                          {message.status.toUpperCase()}
                        </Badge>
                      </VStack>
                    </Grid>
                  </Box>

                  {/* Message Content */}
                  <Box>
                    <Heading fontSize="md" fontWeight="700" mb={3} color="neutral.900">
                      Message
                    </Heading>
                    <Box
                      p={4}
                      bg="neutral.50"
                      borderRadius="lg"
                      border="1px solid"
                      borderColor="neutral.200"
                    >
                      <Text fontSize="sm" color="neutral.700" lineHeight="1.7">
                        {message.message}
                      </Text>
                    </Box>
                  </Box>
                </VStack>
              </Box>

              {/* Footer */}
              <Box p={6} borderTop="1px solid" borderColor="neutral.200">
                <HStack gap={3} w="full" justify="space-between">
                  <HStack gap={2}>
                    <Button
                      colorScheme="green"
                      onClick={() => {
                        window.location.href = `mailto:${message.email}?subject=Re: ${getAgendaLabel(message.agenda)}`
                        onClose()
                      }}
                    >
                      Reply via Email
                    </Button>
                    {message.phoneNumber && (
                      <Button
                        colorScheme="blue"
                        variant="outline"
                        onClick={() => {
                          window.location.href = `tel:${message.phoneNumber}`
                        }}
                      >
                        Call
                      </Button>
                    )}
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
