import {
  Box,
  Container,
  Text,
  Button,
  Stack,
  Flex,
  Grid,
  Input,
  Textarea,
  Heading,
  VStack,
  HStack,
} from "@chakra-ui/react"
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaCheckCircle, FaRocket, FaTimes } from "react-icons/fa"
import { useState } from "react"

const contactInfo = [
  {
    icon: FaPhone,
    title: "Phone",
    details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
  },
  {
    icon: FaEnvelope,
    title: "Email",
    details: ["hello@yourcompany.com", "support@yourcompany.com"],
  },
  {
    icon: FaMapMarkerAlt,
    title: "Address",
    details: ["123 Business Street", "Suite 100, City, State 12345"],
  },
  {
    icon: FaClock,
    title: "Business Hours",
    details: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat: 10:00 AM - 4:00 PM"],
  },
]

const meetingTools = [
  { value: "zoom", label: "Zoom" },
  { value: "google-meet", label: "Google Meet" },
  { value: "microsoft-teams", label: "Microsoft Teams" },
  { value: "in-person", label: "In-Person Meeting" },
  { value: "phone", label: "Phone Call" },
]

const agendaOptions = [
  { value: "it-consulting", label: "IT Consulting" },
  { value: "amigaa", label: "Amigaa Solutions" },
  { value: "erp-solutions", label: "ERP Solutions" },
  { value: "security-consulting", label: "Security Consulting" },
  { value: "web-development", label: "Web Development" },
  { value: "mobile-development", label: "Mobile App Development" },
  { value: "cloud-services", label: "Cloud Services" },
  { value: "comprehensive-trade-finance", label: "Comprehensive Trade and Finance Consulting" },
  { value: "other", label: "Other" },
]

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    meetingTool: "",
    agenda: "",
    dateTime: "",
    phoneNumber: "",
    website: "",
  })

  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    
    // Show success modal instead of alert
    setShowSuccessModal(true)
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      company: "",
      message: "",
      meetingTool: "",
      agenda: "",
      dateTime: "",
      phoneNumber: "",
      website: "",
    })
  }

  const closeSuccessModal = () => {
    setShowSuccessModal(false)
  }

  return (
    <Box>
      {/* Hero Section */}
      <Box py={20} bg="primary.50">
        <Container maxW="7xl" textAlign="center">
          <Text fontSize="5xl" fontWeight="bold" lineHeight="shorter" mb={6} color="neutral.800">
            Get In <Text as="span" color="primary.500">Touch</Text>
          </Text>
          <Text fontSize="xl" color="neutral.600" maxW="2xl" mx="auto" lineHeight="tall">
            Ready to start your project? We'd love to hear about your ideas and discuss how we can help bring them to life.
          </Text>
        </Container>
      </Box>

      {/* Contact Form & Info */}
      <Box py={20} bg="white">
        <Container maxW="7xl">
          <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={12}>
            {/* Contact Form */}
            <Box>
              <Heading size="xl" mb={8} color="neutral.800">
                Send us a message
              </Heading>
              <Box as="form" onSubmit={handleSubmit}>
                <Stack gap={6}>
                  {/* Meeting Tool Dropdown */}
                  <Box>
                    <Text mb={2} fontWeight="medium" color="neutral.700">Meeting Tool *</Text>
                    <Text fontSize="sm" color="neutral.600" mb={2}>
                      Select the preferred meeting/communication tool.
                    </Text>
                    <Box position="relative">
                      <select
                        name="meetingTool"
                        value={formData.meetingTool}
                        onChange={handleInputChange}
                        required
                        style={{
                          width: "100%",
                          height: "48px",
                          padding: "0 16px",
                          backgroundColor: "#f9fafb",
                          border: "1px solid #d1d5db",
                          borderRadius: "8px",
                          fontSize: "16px",
                          color: "#374151",
                          appearance: "none",
                          backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDE0IDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xIDFMNyA3TDEzIDEiIHN0cm9rZT0iIzM3NDE1MSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==')",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 16px center",
                          backgroundSize: "14px 8px"
                        }}
                      >
                        <option value="" disabled>Select meeting tool...</option>
                        {meetingTools.map((tool) => (
                          <option key={tool.value} value={tool.value}>{tool.label}</option>
                        ))}
                      </select>
                    </Box>
                  </Box>

                  {/* Agenda Dropdown */}
                  <Box>
                    <Text mb={2} fontWeight="medium" color="neutral.700">Agenda *</Text>
                    <Text fontSize="sm" color="neutral.600" mb={2}>
                      Please select the services you are interested in.
                    </Text>
                    <Box position="relative">
                      <select
                        name="agenda"
                        value={formData.agenda}
                        onChange={handleInputChange}
                        required
                        style={{
                          width: "100%",
                          height: "48px",
                          padding: "0 16px",
                          backgroundColor: "#f9fafb",
                          border: "1px solid #d1d5db",
                          borderRadius: "8px",
                          fontSize: "16px",
                          color: "#374151",
                          appearance: "none",
                          backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDE0IDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xIDFMNyA3TDEzIDEiIHN0cm9rZT0iIzM3NDE1MSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==')",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 16px center",
                          backgroundSize: "14px 8px"
                        }}
                      >
                        <option value="" disabled>Select agenda...</option>
                        {agendaOptions.map((option) => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    </Box>
                  </Box>

                  {/* Date and Time */}
                  <Box>
                    <Text mb={2} fontWeight="medium" color="neutral.700">Date and Time *</Text>
                    <Input
                      name="dateTime"
                      type="datetime-local"
                      value={formData.dateTime}
                      onChange={handleInputChange}
                      size="lg"
                      bg="neutral.50"
                      border="1px"
                      borderColor="neutral.300"
                      _focus={{
                        borderColor: "primary.500",
                        boxShadow: "0 0 0 1px var(--chakra-colors-primary-500)"
                      }}
                      required
                    />
                  </Box>

                  <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
                    <Box>
                      <Text mb={2} fontWeight="medium" color="neutral.700">Full Name *</Text>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        size="lg"
                        bg="neutral.50"
                        border="1px"
                        borderColor="neutral.300"
                        _focus={{
                          borderColor: "primary.500",
                          boxShadow: "0 0 0 1px var(--chakra-colors-primary-500)"
                        }}
                        required
                      />
                    </Box>
                    <Box>
                      <Text mb={2} fontWeight="medium" color="neutral.700">Email *</Text>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        size="lg"
                        bg="neutral.50"
                        border="1px"
                        borderColor="neutral.300"
                        _focus={{
                          borderColor: "primary.500",
                          boxShadow: "0 0 0 1px var(--chakra-colors-primary-500)"
                        }}
                        required
                      />
                      <Text fontSize="sm" color="neutral.600" mt={1}>
                        Please use gmail for Google Meet and hotmail or outlook if you choose Microsoft Teams as the Meeting Tool.
                      </Text>
                    </Box>
                  </Grid>

                  <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
                    <Box>
                      <Text mb={2} fontWeight="medium" color="neutral.700">Company *</Text>
                      <Input
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Your company name"
                        size="lg"
                        bg="neutral.50"
                        border="1px"
                        borderColor="neutral.300"
                        _focus={{
                          borderColor: "primary.500",
                          boxShadow: "0 0 0 1px var(--chakra-colors-primary-500)"
                        }}
                        required
                      />
                      <Text fontSize="sm" color="neutral.600" mt={1}>
                        Please use N/A or Startup, if you do not represent a company yet.
                      </Text>
                    </Box>
                    <Box>
                      <Text mb={2} fontWeight="medium" color="neutral.700">Phone Number</Text>
                      <Input
                        name="phoneNumber"
                        type="tel"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        placeholder="e.g., +977"
                        size="lg"
                        bg="neutral.50"
                        border="1px"
                        borderColor="neutral.300"
                        _focus={{
                          borderColor: "primary.500",
                          boxShadow: "0 0 0 1px var(--chakra-colors-primary-500)"
                        }}
                      />
                      <Text fontSize="sm" color="neutral.600" mt={1}>
                        Please provide the mobile number with WhatsApp or Viber if you choose such Meeting Tool.
                      </Text>
                    </Box>
                  </Grid>

                  {/* Website */}
                  <Box>
                    <Text mb={2} fontWeight="medium" color="neutral.700">Your Website</Text>
                    <Input
                      name="website"
                      type="url"
                      value={formData.website}
                      onChange={handleInputChange}
                      placeholder="Enter your website URL (optional)"
                      size="lg"
                      bg="neutral.50"
                      border="1px"
                      borderColor="neutral.300"
                      _focus={{
                        borderColor: "primary.500",
                        boxShadow: "0 0 0 1px var(--chakra-colors-primary-500)"
                      }}
                    />
                  </Box>

                  <Box>
                    <Text mb={2} fontWeight="medium" color="neutral.700">Message *</Text>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your project..."
                      rows={6}
                      bg="neutral.50"
                      border="1px"
                      borderColor="neutral.300"
                      _focus={{
                        borderColor: "primary.500",
                        boxShadow: "0 0 0 1px var(--chakra-colors-primary-500)"
                      }}
                      required
                    />
                  </Box>
                  <Button
                    type="submit"
                    size="lg"
                    bg="primary.500"
                    color="white"
                    _hover={{ bg: "primary.600" }}
                    alignSelf="flex-start"
                  >
                    Send Message
                  </Button>
                </Stack>
              </Box>
            </Box>

            {/* Contact Info */}
            <Box>
              <Heading size="xl" mb={8} color="neutral.800">
                Contact Information
              </Heading>
              <Stack gap={8}>
                {contactInfo.map((info, index) => (
                  <Flex key={index} align="flex-start" gap={4}>
                    <Box
                      p={3}
                      bg="primary.100"
                      color="primary.500"
                      borderRadius="lg"
                      flexShrink={0}
                    >
                      <info.icon size={24} />
                    </Box>
                    <Box>
                      <Text fontWeight="semibold" fontSize="lg" mb={2} color="neutral.800">
                        {info.title}
                      </Text>
                      {info.details.map((detail, detailIndex) => (
                        <Text key={detailIndex} color="neutral.600" lineHeight="tall">
                          {detail}
                        </Text>
                      ))}
                    </Box>
                  </Flex>
                ))}
              </Stack>

              {/* Map placeholder */}
              <Box mt={8}>
                <Heading size="lg" mb={4} color="neutral.800">
                  Find Us
                </Heading>
                <Box
                  bg="neutral.200"
                  h="300px"
                  borderRadius="lg"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  color="neutral.600"
                >
                  <Text>Interactive Map Coming Soon</Text>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Container>
      </Box>

      {/* FAQ Section */}
      <Box py={20} bg="neutral.50">
        <Container maxW="7xl">
          <Box textAlign="center" mb={16}>
            <Text fontSize="4xl" fontWeight="bold" mb={4} color="neutral.800">
              Frequently Asked Questions
            </Text>
          </Box>
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={8}>
            <Box bg="white" p={6} borderRadius="lg" shadow="md">
              <Text fontWeight="semibold" fontSize="lg" mb={3} color="neutral.800">
                How long does a typical project take?
              </Text>
              <Text color="neutral.600" lineHeight="tall">
                Project timelines vary based on complexity and scope. Simple websites typically take 2-4 weeks, 
                while complex applications can take 3-6 months. We'll provide a detailed timeline during our initial consultation.
              </Text>
            </Box>
            <Box bg="white" p={6} borderRadius="lg" shadow="md">
              <Text fontWeight="semibold" fontSize="lg" mb={3} color="neutral.800">
                Do you provide ongoing support?
              </Text>
              <Text color="neutral.600" lineHeight="tall">
                Yes! We offer comprehensive maintenance and support packages to ensure your project continues 
                to perform optimally. This includes updates, security patches, and feature enhancements.
              </Text>
            </Box>
            <Box bg="white" p={6} borderRadius="lg" shadow="md">
              <Text fontWeight="semibold" fontSize="lg" mb={3} color="neutral.800">
                What technologies do you work with?
              </Text>
              <Text color="neutral.600" lineHeight="tall">
                We specialize in modern web technologies including React, Next.js, Node.js, and cloud platforms. 
                For mobile development, we use React Native and native iOS/Android development.
              </Text>
            </Box>
            <Box bg="white" p={6} borderRadius="lg" shadow="md">
              <Text fontWeight="semibold" fontSize="lg" mb={3} color="neutral.800">
                How do you handle project communication?
              </Text>
              <Text color="neutral.600" lineHeight="tall">
                We believe in transparent communication. You'll have a dedicated project manager and access to 
                our project management tools where you can track progress and provide feedback in real-time.
              </Text>
            </Box>
          </Grid>
        </Container>
      </Box>

      {/* Success Modal */}
      {showSuccessModal && (
        <Box
          position="fixed"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="blackAlpha.600"
          display="flex"
          alignItems="center"
          justifyContent="center"
          zIndex="modal"
          p={4}
        >
          <Box
            bg="white"
            borderRadius="2xl"
            p={8}
            maxW="md"
            w="full"
            position="relative"
            boxShadow="2xl"
            border="1px"
            borderColor="gray.200"
          >
            {/* Close Button */}
            <Button
              position="absolute"
              top={4}
              right={4}
              size="sm"
              variant="ghost"
              onClick={closeSuccessModal}
              color="gray.500"
              _hover={{ color: "gray.700", bg: "gray.100" }}
            >
              <FaTimes />
            </Button>

            <VStack gap={6} textAlign="center">
              {/* Success Icon */}
              <Box
                p={4}
                bg="green.100"
                borderRadius="full"
                color="green.500"
              >
                <FaCheckCircle size={48} />
              </Box>

              {/* Success Message */}
              <VStack gap={3}>
                <Heading size="lg" color="gray.800">
                  Message Sent Successfully!
                </Heading>
                <Text color="gray.600" lineHeight="tall">
                  Thank you for reaching out to us! We've received your message and will get back to you within 24 hours.
                </Text>
              </VStack>

              {/* Action Buttons */}
              <HStack gap={4} pt={2}>
                <Button
                  onClick={closeSuccessModal}
                  bg="primary.500"
                  color="white"
                  _hover={{ bg: "primary.600" }}
                  size="lg"
                  borderRadius="lg"
                >
                  <HStack gap={2}>
                    <Text>Continue Exploring</Text>
                    <FaRocket />
                  </HStack>
                </Button>
              </HStack>

              {/* Additional Info */}
              <Box
                bg="blue.50"
                p={4}
                borderRadius="lg"
                border="1px"
                borderColor="blue.200"
                w="full"
              >
                <Text fontSize="sm" color="blue.700" fontWeight="medium" mb={2}>
                  What's Next?
                </Text>
                <VStack gap={1} align="start">
                  <Text fontSize="sm" color="blue.600">
                    • We'll review your requirements carefully
                  </Text>
                  <Text fontSize="sm" color="blue.600">
                    • Our team will prepare a customized proposal
                  </Text>
                  <Text fontSize="sm" color="blue.600">
                    • We'll schedule a follow-up meeting
                  </Text>
                </VStack>
              </Box>
            </VStack>
          </Box>
        </Box>
      )}
    </Box>
  )
}
export default ContactPage