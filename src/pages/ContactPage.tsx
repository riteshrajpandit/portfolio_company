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
} from "@chakra-ui/react"
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa"
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

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
    alert("Thank you for your message! We'll get back to you soon.")
    setFormData({
      name: "",
      email: "",
      company: "",
      message: "",
    })
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
                    </Box>
                  </Grid>
                  <Box>
                    <Text mb={2} fontWeight="medium" color="neutral.700">Company</Text>
                    <Input
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Your company name (optional)"
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
    </Box>
  )
}
export default ContactPage