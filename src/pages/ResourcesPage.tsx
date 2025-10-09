import {
  Box,
  Container,
  Text,
  Button,
  VStack,
  HStack,
  Grid,
  GridItem,
  Badge,
  Icon,
  Image,

} from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { useState } from "react"
import {
  HiShieldCheck,
  HiWrench,
  HiArrowRight,
  HiDocumentText,
  HiLockClosed,
  HiCalculator,
  HiChartBar,
  HiArrowDownTray,
} from "react-icons/hi2"
import ROICalculatorModal from "../components/ui/ROICalculatorModal"
import FAQsSection from "@/components/sections/FAQsSection"
import DocumentationSection from "@/components/sections/DocumentationSection"

const resources = [
  {
    id: "trusted-center",
    title: "Trusted Center",
    subtitle: "Security, Compliance & Trust",
    description: "Comprehensive security documentation, compliance certifications, and trust resources to ensure your confidence in our solutions and data handling practices.",
    icon: HiShieldCheck,
    gradient: "linear(135deg, emerald.500, teal.600)",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop&auto=format",
    sections: [
      {
        title: "Security Certifications",
        icon: HiLockClosed,
        items: [
          { name: "ISO 27001", description: "Information Security Management", status: "Certified" },
          { name: "SOC 2 Type II", description: "Service Organization Control", status: "Certified" },
          { name: "GDPR Compliance", description: "General Data Protection Regulation", status: "Compliant" },
          { name: "HIPAA", description: "Health Insurance Portability", status: "Compliant" }
        ]
      },
      {
        title: "Privacy & Compliance",
        icon: HiDocumentText,
        items: [
          { name: "Privacy Policy", description: "How we collect and use your data", type: "document" },
          { name: "Terms of Service", description: "Legal terms and conditions", type: "document" },
          { name: "Data Processing Agreement", description: "GDPR-compliant DPA template", type: "document" },
          { name: "Security Whitepaper", description: "Detailed security practices", type: "document" }
        ]
      }
    ]
  },
  {
    id: "tools",
    title: "Free Tools",
    subtitle: "Productivity & Planning Tools",
    description: "Access our collection of free tools and utilities designed to enhance your productivity, streamline workflows, and support your business planning efforts.",
    icon: HiWrench,
    gradient: "linear(135deg, blue.500, indigo.600)",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&auto=format",
    categories: [
      {
        title: "Business Calculators",
        icon: HiCalculator,
        tools: [
          { 
            name: "ROI Calculator", 
            description: "Calculate return on investment for your projects",
            usage: "1.2K+ uses",
            type: "calculator"
          },
          { 
            name: "Project Cost Estimator", 
            description: "Estimate development costs and timelines",
            usage: "800+ uses",
            type: "calculator"
          },
          { 
            name: "Cloud Cost Calculator", 
            description: "Compare cloud service pricing and costs",
            usage: "950+ uses",
            type: "calculator"
          },
          { 
            name: "Team Productivity Calculator", 
            description: "Measure and optimize team efficiency",
            usage: "600+ uses",
            type: "calculator"
          }
        ]
      },
      {
        title: "Assessment Tools",
        icon: HiChartBar,
        tools: [
          { 
            name: "Digital Maturity Assessment", 
            description: "Evaluate your digital transformation readiness",
            completions: "450+",
            type: "assessment"
          },
          { 
            name: "Security Posture Check", 
            description: "Assess your current security status",
            completions: "320+",
            type: "assessment"
          },
          { 
            name: "Technology Stack Audit", 
            description: "Review your current technology landscape",
            completions: "280+",
            type: "assessment"
          },
          { 
            name: "Team Skills Gap Analysis", 
            description: "Identify training and development needs",
            completions: "190+",
            type: "assessment"
          }
        ]
      }
    ]
  }
]

const MotionBox = motion(Box)
const MotionContainer = motion(Container)

const ResourcesPage = () => {
  const [isROIModalOpen, setIsROIModalOpen] = useState(false)

  const openROICalculator = () => {
    setIsROIModalOpen(true)
  }

  const closeROICalculator = () => {
    setIsROIModalOpen(false)
  }
  

  return (
    
    <Box>
      {/* Hero Section */}
      <Box bg="neutral.50" pt={40} pb={16}>
        <Container maxW="7xl">
          <MotionContainer
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            textAlign="center"
            maxW="4xl"
            mx="auto"
          >
            <Text
              fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
              fontWeight="700"
              lineHeight="1.1"
              color="text"
              mb={6}
            >
              Trust{" "}
              <Text as="span" color="primary.500">
                Resources
              </Text>{" "}
              & Free Tools
            </Text>
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color="muted"
              lineHeight="1.7"
              maxW="3xl"
              mx="auto"
              mb={8}
            >
              Access comprehensive security documentation, compliance information, and powerful free tools 
              designed to support your business growth and build confidence in our partnership.
            </Text>
            <HStack justify="center" gap={4} wrap="wrap">
              <Link to="#trusted-center" style={{ textDecoration: 'none' }}>
                
              </Link>
            </HStack>
          </MotionContainer>
        </Container>
      </Box>
      {/* FAQs Section */}
      <FAQsSection />
      <DocumentationSection />

      {/* Resources Sections */}
      {resources.map((resource, index) => (
        <Box key={resource.id} id={resource.id} py={{ base: 16, md: 20 }} bg={index % 2 === 0 ? "white" : "neutral.50"}>
          <Container maxW="7xl">
            <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={12} alignItems="start">
              {/* Content Side */}
              <GridItem order={{ base: 2, lg: index % 2 === 0 ? 1 : 2 }}>
                <MotionBox
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <VStack align="start" gap={6}>
                    <HStack gap={4} align="center">
                      <Box
                        p={4}
                        bg={resource.gradient}
                        borderRadius="xl"
                        color="white"
                        fontSize="2xl"
                      >
                        <Icon as={resource.icon} />
                      </Box>
                      <VStack align="start" gap={1}>
                        <Text fontSize="sm" color="primary.500" fontWeight="600" textTransform="uppercase">
                          {resource.subtitle}
                        </Text>
                        <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="700" color="text">
                          {resource.title}
                        </Text>
                      </VStack>
                    </HStack>

                    <Text fontSize={{ base: "md", md: "lg" }} color="muted" lineHeight="1.7">
                      {resource.description}
                    </Text>

                    <HStack gap={4} wrap="wrap">
                      <Link to="/services" style={{ textDecoration: 'none' }}>
                        <Button
                          colorScheme="primary"
                          borderRadius="full"
                          px={6}
                          fontWeight="600"
                          _hover={{ transform: "translateY(-2px)" }}
                          transition="all 0.3s ease"
                        >
                          Learn More
                        </Button>
                      </Link>
                      <Link to="/about#career" style={{ textDecoration: 'none' }}>
                        <Button
                          variant="outline"
                          borderColor="primary.500"
                          color="primary.500"
                          borderRadius="full"
                          px={6}
                          fontWeight="600"
                          _hover={{ bg: "primary.50" }}
                          transition="all 0.3s ease"
                        >
                          Contact Us
                        </Button>
                      </Link>
                    </HStack>
                  </VStack>
                </MotionBox>
              </GridItem>

              {/* Image Side */}
              <GridItem order={{ base: 1, lg: index % 2 === 0 ? 2 : 1 }}>
                <MotionBox
                  initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <Box
                    position="relative"
                    borderRadius="2xl"
                    overflow="hidden"
                    shadow="2xl"
                    _hover={{ transform: "translateY(-4px)", shadow: "3xl" }}
                    transition="all 0.4s ease"
                  >
                    <Image
                      src={resource.image}
                      alt={resource.title}
                      w="full"
                      h={{ base: "300px", md: "400px" }}
                      objectFit="cover"
                    />
                    <Box
                      position="absolute"
                      inset={0}
                      bg={resource.gradient}
                      opacity={0.1}
                    />
                    
                    {/* Floating Badge */}
                    <Box
                      position="absolute"
                      top={6}
                      left={6}
                      bg="white"
                      px={4}
                      py={2}
                      borderRadius="full"
                      shadow="lg"
                      backdropFilter="blur(10px)"
                    >
                      <Text fontSize="sm" fontWeight="600" color="text">
                        {resource.subtitle}
                      </Text>
                    </Box>
                  </Box>
                </MotionBox>
              </GridItem>
            </Grid>

            {/* Resource-specific content */}
            {resource.id === "trusted-center" && resource.sections && (
              <MotionBox
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                mt={16}
              >
                <VStack gap={12}>
                  {resource.sections.map((section, idx) => (
                    <VStack key={idx} gap={6} w="full">
                      <HStack gap={3} justify="center">
                        <Icon as={section.icon} color="primary.500" fontSize="xl" />
                        <Text fontSize="2xl" fontWeight="700" color="text">
                          {section.title}
                        </Text>
                      </HStack>
                      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4} w="full">
                        {section.items.map((item, itemIdx) => (
                          <Box 
                            key={itemIdx} 
                            border="1px" 
                            borderColor="gray.200" 
                            borderRadius="lg" 
                            p={4}
                            _hover={{ shadow: "md" }} 
                            transition="all 0.3s ease"
                          >
                            <VStack gap={3} align="start">
                              <HStack gap={3} justify="space-between" w="full">
                                <Text fontSize="md" fontWeight="600" color="text">
                                  {item.name}
                                </Text>
                                {'status' in item && (
                                  <Badge colorScheme="green" variant="subtle" px={2} py={1} borderRadius="full" fontSize="xs">
                                    {item.status}
                                  </Badge>
                                )}
                                {'date' in item && (
                                  <Badge colorScheme="blue" variant="subtle" px={2} py={1} borderRadius="full" fontSize="xs">
                                    {String(item.date)}
                                  </Badge>
                                )}
                                {'type' in item && (
                                  <Icon as={HiDocumentText} color="primary.500" />
                                )}
                              </HStack>
                              <Text fontSize="sm" color="muted">
                                {item.description}
                              </Text>
                            </VStack>
                          </Box>
                        ))}
                      </Grid>
                    </VStack>
                  ))}
                </VStack>
              </MotionBox>
            )}

            {resource.id === "tools" && resource.categories && (
              <MotionBox
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                mt={16}
              >
                <VStack gap={12}>
                  {resource.categories.map((category, idx) => (
                    <VStack key={idx} gap={6} w="full">
                      <HStack gap={3} justify="center">
                        <Icon as={category.icon} color="primary.500" fontSize="xl" />
                        <Text fontSize="2xl" fontWeight="700" color="text">
                          {category.title}
                        </Text>
                      </HStack>
                      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4} w="full">
                        {category.tools.map((tool, toolIdx) => (
                          <Box 
                            key={toolIdx} 
                            border="1px" 
                            borderColor="gray.200" 
                            borderRadius="lg" 
                            p={4}
                            _hover={{ shadow: "md", transform: "translateY(-2px)" }} 
                            transition="all 0.3s ease"
                            cursor="pointer"
                          >
                            <VStack gap={3} align="start">
                              <HStack gap={3} justify="space-between" w="full">
                                <Text fontSize="md" fontWeight="600" color="text">
                                  {tool.name}
                                </Text>
                                <HStack gap={2}>
                                  {'usage' in tool && (
                                    <Badge colorScheme="blue" variant="subtle" px={2} py={1} borderRadius="full" fontSize="xs">
                                      {tool.usage}
                                    </Badge>
                                  )}
                                  {'downloads' in tool && (
                                    <Badge colorScheme="green" variant="subtle" px={2} py={1} borderRadius="full" fontSize="xs">
                                      {String(tool.downloads)} downloads
                                    </Badge>
                                  )}
                                  {'completions' in tool && (
                                    <Badge colorScheme="purple" variant="subtle" px={2} py={1} borderRadius="full" fontSize="xs">
                                      {tool.completions} completed
                                    </Badge>
                                  )}
                                </HStack>
                              </HStack>
                              <Text fontSize="sm" color="muted">
                                {tool.description}
                              </Text>
                              <Button
                                size="sm"
                                colorScheme="primary"
                                variant="ghost"
                                fontSize="xs"
                                _hover={{ bg: "primary.50" }}
                                onClick={tool.name === "ROI Calculator" ? openROICalculator : undefined}
                              >
                                <Icon as={tool.type === "calculator" ? HiCalculator : 
                                         tool.type === "template" ? HiArrowDownTray : HiChartBar} mr={2} />
                                {tool.type === "calculator" ? "Use Calculator" : 
                                 tool.type === "template" ? "Download" : "Take Assessment"}
                              </Button>
                            </VStack>
                          </Box>
                        ))}
                      </Grid>
                    </VStack>
                  ))}
                </VStack>
              </MotionBox>
            )}
          </Container>
        </Box>
      ))}

      {/* CTA Section */}
      <Container maxW="7xl" py={{ base: 16, md: 20 }}>
        <MotionBox
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Box
            bg="primary.500"
            color="white"
            p={12}
            borderRadius="3xl"
            textAlign="center"
            bgGradient="linear(135deg, primary.500, primary.600)"
          >
            <VStack gap={6} maxW="3xl" mx="auto">
              <Text fontSize={{ base: "3xl", md: "4xl" }} fontWeight="700">
                Need More Information?
              </Text>
              <Text fontSize="xl" opacity={0.9} lineHeight="1.6">
                Can't find what you're looking for? Our team is here to help you with any questions about our security practices or available tools.
              </Text>
              <HStack gap={4} wrap="wrap" justify="center">
                <Link to="/services" style={{ textDecoration: 'none' }}>
                  <Button
                    size="lg"
                    bg="white"
                    color="primary.600"
                    borderRadius="full"
                    px={8}
                    py={6}
                    fontSize="lg"
                    fontWeight="600"
                    _hover={{
                      transform: "translateY(-2px)",
                      shadow: "xl"
                    }}
                    transition="all 0.3s ease"
                  >
                    Contact Support <HiArrowRight style={{ marginLeft: '8px' }} />
                  </Button>
                </Link>
                <Link to="/products" style={{ textDecoration: 'none' }}>
                  <Button
                    size="lg"
                    variant="outline"
                    borderColor="white"
                    color="white"
                    borderRadius="full"
                    px={8}
                    py={6}
                    fontSize="lg"
                    fontWeight="600"
                    _hover={{
                      bg: "whiteAlpha.200",
                      transform: "translateY(-2px)"
                    }}
                    transition="all 0.3s ease"
                  >
                    Explore Products
                  </Button>
                </Link>
              </HStack>
            </VStack>
          </Box>
        </MotionBox>
      </Container>

      {/* ROI Calculator Modal */}
      <ROICalculatorModal 
        isOpen={isROIModalOpen} 
        onClose={closeROICalculator} 
      />
    </Box>
  )
}

export default ResourcesPage
