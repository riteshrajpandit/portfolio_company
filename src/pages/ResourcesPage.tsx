import {
  Box,
  Container,
  Text,
  Button,
  VStack,
  HStack,
  SimpleGrid,
  Icon,
  Link as ChakraLink,
  Image,
} from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { useState } from "react"
import {
  HiArrowRight,
  HiDocumentText,
  HiAcademicCap,
  HiPhoto,
  HiClipboardDocumentList,
  HiNewspaper,
  HiChevronDown,
} from "react-icons/hi2"
import FAQsSection from "@/components/sections/FAQsSection"

// Resource sections data matching the navbar structure
interface ResourceSection {
  id: string
  title: string
  description: string
  icon: React.ComponentType
  gradient: string
  items?: Array<{
    title: string
    description: string
    link?: string
    isExternal?: boolean
    subtitle?: string
    image?: string
  }>
}

const resourceSections: ResourceSection[] = [
  {
    id: "documentation",
    title: "Documentation/Wiki",
    description: "Industry compliance documentation",
    icon: HiDocumentText,
    gradient: "linear(135deg, blue.400, blue.600)",
    items: [
      {
        title: "ERP Solutions",
        description: "Comprehensive guides for ERP implementation and usage. Our ERP documentation covers everything from initial setup to advanced configurations, helping you maximize efficiency and streamline your business operations.",
        link: "https://ss.awiskar.com/",
        isExternal: true,
        subtitle: "Enterprise Resource Planning",
        image: "/product-images/ERP.png"
      },
      {
        title: "Amigaa Platform",
        description: "Technical documentation for AI-powered automation platform. Discover how to leverage Amigaa's intelligent features to automate workflows, enhance productivity, and transform your business processes with cutting-edge AI technology.",
        link: "https://agent.amigaa.com/",
        isExternal: true,
        subtitle: "AI-Powered Automation",
        image: "/product-images/Amigaa.png"
      },
      {
        title: "GrowStart",
        description: "Complete documentation for startup growth and business acceleration platform. Learn how to scale your startup efficiently with our comprehensive guides covering funding, strategy, and operational excellence.",
        link: "#",
        isExternal: false,
        subtitle: "Startup Growth Platform",
        image: "/product-images/GrowStart.png"
      }
    ]
  },
  // {
  //   id: "end-user-training",
  //   title: "End User Training",
  //   description: "Training resources for end users and administrators",
  //   icon: HiAcademicCap,
  //   gradient: "linear(135deg, purple.400, purple.600)",
  //   items: [
  //     {
  //       title: "Getting Started Tutorials",
  //       description: "Quick start guides for new users",
  //       link: "#",
  //       isExternal: false
  //     },
  //     {
  //       title: "Video Training Library",
  //       description: "Comprehensive video tutorials and walkthroughs",
  //       link: "#",
  //       isExternal: false
  //     },
  //     {
  //       title: "Administrator Training",
  //       description: "Advanced training for system administrators",
  //       link: "#",
  //       isExternal: false
  //     },
  //     {
  //       title: "Certification Programs",
  //       description: "Professional certification courses",
  //       link: "#",
  //       isExternal: false
  //     }
  //   ]
  // },
  {
    id: "ioxet-gallery",
    title: "IOXET Gallery",
    description: "Showcase of IOXET solutions and customer success stories",
    icon: HiPhoto,
    gradient: "linear(135deg, green.400, green.600)",
    items: [
      {
        title: "Project Showcase",
        description: "Visual portfolio of completed projects",
        link: "#",
        isExternal: false
      },
      {
        title: "Customer Success Stories",
        description: "Real-world implementations and results",
        link: "#",
        isExternal: false
      },
      {
        title: "Product Screenshots",
        description: "Visual tour of our products and features",
        link: "#",
        isExternal: false
      },
      {
        title: "Video Demos",
        description: "Interactive product demonstrations",
        link: "#",
        isExternal: false
      }
    ]
  },
  {
    id: "case-studies",
    title: "Case Studies",
    description: "Comprehensive guides and technical documentation",
    icon: HiClipboardDocumentList,
    gradient: "linear(135deg, orange.400, orange.600)",
    items: [
      {
        title: "Enterprise Transformation",
        description: "How we helped large enterprises modernize their operations",
        link: "#",
        isExternal: false
      },
      {
        title: "Startup Success Stories",
        description: "Supporting startups from MVP to scale",
        link: "#",
        isExternal: false
      },
      {
        title: "Industry-Specific Solutions",
        description: "Tailored solutions for different industries",
        link: "#",
        isExternal: false
      },
      {
        title: "ROI Analysis",
        description: "Measurable business impact and returns",
        link: "#",
        isExternal: false
      }
    ]
  },
  {
    id: "whitepapers",
    title: "Whitepapers",
    description: "In-depth research and analysis on industry trends",
    icon: HiNewspaper,
    gradient: "linear(135deg, pink.400, pink.600)",
    items: [
      {
        title: "Digital Transformation Guide",
        description: "Complete guide to digital transformation strategies",
        link: "#",
        isExternal: false
      },
      {
        title: "AI in Business",
        description: "Leveraging AI for business growth and efficiency",
        link: "#",
        isExternal: false
      },
      {
        title: "Cloud Migration Strategy",
        description: "Best practices for cloud adoption",
        link: "#",
        isExternal: false
      },
      {
        title: "Cybersecurity Trends",
        description: "Latest trends in enterprise security",
        link: "#",
        isExternal: false
      }
    ]
  }
]

// Commented out for future development
/*
const resources = [
  {
    id: "trusted-center",
    title: "Trusted Center",
    subtitle: "Security, Compliance & Trust",
    description: "Comprehensive security documentation, compliance certifications, and trust resources.",
    icon: HiShieldCheck,
    sections: [] // Security Certifications, Privacy & Compliance
  },
  {
    id: "tools",
    title: "Free Tools",
    subtitle: "Productivity & Planning Tools",
    description: "Access our collection of free tools and utilities.",
    icon: HiWrench,
    categories: [] // Business Calculators, Assessment Tools
  }
]
*/

const MotionBox = motion(Box)
const MotionContainer = motion(Container)

const ResourcesPage = () => {
  const [openDocIndex, setOpenDocIndex] = useState<number | null>(null)

  const toggleDoc = (index: number) => {
    setOpenDocIndex(openDocIndex === index ? null : index)
  }

  return (
    <Box overflowX={"hidden"}>
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
              Access comprehensive documentation, training resources, case studies, and industry insights 
              designed to support your business growth and digital transformation journey.
            </Text>
          </MotionContainer>
        </Container>
      </Box>

      {/* FAQs Section */}
      <FAQsSection />

      {/* Resource Sections */}
      {resourceSections.map((section, index) => (
        <Box 
          key={section.id} 
          id={section.id} 
          py={{ base: 6, md: 6 }} 
          bg={index % 2 === 0 ? "white" : "neutral.50"}
        >
          <Container maxW="7xl">
            {/* Section Header */}
            <MotionBox
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              textAlign="center"
              mb={12}
            >
              <VStack gap={4}>
                <Box
                  // p={4}
                  bgGradient={section.gradient}
                  borderRadius="2xl"
                  color="white"
                  fontSize="3xl"
                  display="inline-flex"
                >
                  <Icon as={section.icon} />
                </Box>
                <Text
                  fontSize={{ base: "3xl", md: "4xl" }}
                  fontWeight="700"
                  color="text"
                >
                  {section.title}
                </Text>
                <Text
                  fontSize={{ base: "md", md: "lg" }}
                  color="muted"
                  maxW="2xl"
                  lineHeight="1.7"
                >
                  {section.description}
                </Text>
              </VStack>
            </MotionBox>

            {/* Documentation Section - Expandable/Collapsible Design */}
            {section.id === "documentation" && section.items && (
              <Container maxW="7xl">
                <VStack gap={0} align="stretch">
                  {section.items.map((item, itemIndex) => (
                    <MotionBox
                      key={itemIndex}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: itemIndex * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Box
                        position="relative"
                        borderBottom="2px solid"
                        borderColor="gray.200"
                        _last={{ borderBottom: "none" }}
                        transition="all 0.3s ease"
                        cursor="pointer"
                        onClick={() => toggleDoc(itemIndex)}
                        role="button"
                        aria-expanded={openDocIndex === itemIndex}
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            toggleDoc(itemIndex)
                          }
                        }}
                        _hover={{
                          bg: "gray.50"
                        }}
                      >
                        <Box py={6} px={6}>
                          <HStack justify="space-between" align="center" mb={0}>
                            {/* Numbering Circle */}
                            <HStack gap={4} flex="1" align="center">
                              <Box
                                minW="48px"
                                h="48px"
                                borderRadius="full"
                                bgGradient={section.gradient}
                                color="primary.500"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                fontSize="xl"
                                fontWeight="700"
                                flexShrink={0}
                              >
                                {String(itemIndex + 1).padStart(2, '0')}
                              </Box>
                              
                              {/* Title and Subtitle */}
                              <VStack align="start" gap={1} flex="1">
                                <Text
                                  fontSize={{ base: "lg", md: "xl" }}
                                  fontWeight="700"
                                  color={openDocIndex === itemIndex ? "primary.600" : "text"}
                                  lineHeight="1.3"
                                  transition="color 0.3s ease"
                                >
                                  {item.title}
                                </Text>
                                {item.subtitle && (
                                  <Text
                                    fontSize={{ base: "sm", md: "md" }}
                                    color="muted"
                                    fontWeight="500"
                                    lineHeight="1.4"
                                  >
                                    {item.subtitle}
                                  </Text>
                                )}
                              </VStack>
                            </HStack>
                            
                            {/* Chevron Icon */}
                            <Icon
                              as={HiChevronDown}
                              fontSize="xl"
                              color={openDocIndex === itemIndex ? "primary.500" : "gray.400"}
                              transition="all 0.3s ease"
                              transform={openDocIndex === itemIndex ? "rotate(180deg)" : "rotate(0deg)"}
                              ml={3}
                              flexShrink={0}
                            />
                          </HStack>
                          
                          {/* Expanded Content */}
                          <Box
                            opacity={openDocIndex === itemIndex ? 1 : 0}
                            maxHeight={openDocIndex === itemIndex ? "600px" : "0"}
                            overflow="hidden"
                            transition="all 0.5s ease"
                            mt={openDocIndex === itemIndex ? 6 : 0}
                          >
                            <HStack
                              align="start"
                              gap={6}
                              pl={4}
                            >
                              {/* Image Section */}
                              {item.image && (
                                <Box
                                  flexShrink={0}
                                  w={{ base: "120px", md: "180px" }}
                                  h={{ base: "120px", md: "180px" }}
                                  borderRadius="lg"
                                  overflow="hidden"
                                  bg="white"
                                  border="1px solid"
                                  borderColor="gray.200"
                                  display="flex"
                                  alignItems="center"
                                  justifyContent="center"
                                  p={4}
                                >
                                  <Image
                                    src={item.image}
                                    alt={item.title}
                                    w="full"
                                    h="full"
                                    objectFit="contain"
                                  />
                                </Box>
                              )}
                              
                              {/* Content Section */}
                              <VStack align="start" gap={4} flex="1">
                                <Text
                                  fontSize="md"
                                  color="muted"
                                  lineHeight="1.8"
                                >
                                  {item.description}
                                </Text>
                                
                                {/* Visit Us Button */}
                                {item.link && (
                                  <ChakraLink
                                    href={item.link}
                                    target={item.isExternal ? "_blank" : "_self"}
                                    rel={item.isExternal ? "noopener noreferrer" : undefined}
                                    style={{ textDecoration: 'none' }}
                                  >
                                    <Button
                                      colorScheme="primary"
                                      bg="primary.500"
                                      size="md"
                                      fontWeight="600"
                                      px={6}
                                      _hover={{
                                        transform: "translateY(-2px)",
                                        shadow: "md",
                                        bg: "primary.600"
                                      }}
                                      transition="all 0.3s ease"
                                    >
                                      Visit Us <Icon as={HiArrowRight} ml={2} />
                                    </Button>
                                  </ChakraLink>
                                )}
                              </VStack>
                            </HStack>
                          </Box>
                        </Box>
                      </Box>
                    </MotionBox>
                  ))}
                </VStack>
              </Container>
            )}

            {/* Other Sections - Regular Grid Design */}
            {section.id !== "documentation" && section.items && (
              <SimpleGrid
                columns={{ base: 1, md: 2 }}
                gap={6}
              >
                {section.items.map((item, itemIndex) => (
                  <MotionBox
                    key={itemIndex}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: itemIndex * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {item.isExternal ? (
                      <ChakraLink 
                        href={item.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        style={{ textDecoration: 'none' }}
                      >
                        <Box
                          p={6}
                          border="1px solid"
                          borderColor="gray.200"
                          borderRadius="xl"
                          transition="all 0.3s ease"
                          cursor="pointer"
                          h="full"
                          _hover={{
                            borderColor: "primary.400",
                            transform: "translateY(-4px)",
                            shadow: "lg"
                          }}
                        >
                          <VStack align="start" gap={3}>
                            <Text
                              fontSize="lg"
                              fontWeight="600"
                              color="text"
                              lineHeight="1.4"
                            >
                              {item.title}
                            </Text>
                            <Text
                              fontSize="sm"
                              color="muted"
                              lineHeight="1.6"
                            >
                              {item.description}
                            </Text>
                            <HStack gap={2} mt={2}>
                              <Text
                                fontSize="sm"
                                color="primary.500"
                                fontWeight="600"
                              >
                                Visit Resource
                              </Text>
                              <Icon as={HiArrowRight} color="primary.500" fontSize="sm" />
                            </HStack>
                          </VStack>
                        </Box>
                      </ChakraLink>
                    ) : (
                      <Link to={item.link || "#"} style={{ textDecoration: 'none' }}>
                        <Box
                          p={6}
                          border="1px solid"
                          borderColor="gray.200"
                          borderRadius="xl"
                          transition="all 0.3s ease"
                          cursor="pointer"
                          h="full"
                          _hover={{
                            borderColor: "primary.400",
                            transform: "translateY(-4px)",
                            shadow: "lg"
                          }}
                        >
                          <VStack align="start" gap={3}>
                            <Text
                              fontSize="lg"
                              fontWeight="600"
                              color="text"
                              lineHeight="1.4"
                            >
                              {item.title}
                            </Text>
                            <Text
                              fontSize="sm"
                              color="muted"
                              lineHeight="1.6"
                            >
                              {item.description}
                            </Text>
                            <HStack gap={2} mt={2}>
                              <Text
                                fontSize="sm"
                                color="primary.500"
                                fontWeight="600"
                              >
                                Learn More
                              </Text>
                              <Icon as={HiArrowRight} color="primary.500" fontSize="sm" />
                            </HStack>
                          </VStack>
                        </Box>
                      </Link>
                    )}
                  </MotionBox>
                ))}
              </SimpleGrid>
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
    </Box>
  )
}

export default ResourcesPage
