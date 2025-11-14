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
import {
  HiArrowRight,
  HiDocumentText,
  HiAcademicCap,
  HiPhoto,
  HiClipboardDocumentList,
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
  {
    id: "end-user-training",
    title: "End User Training",
    description: "Training resources for end users and administrators",
    icon: HiAcademicCap,
    gradient: "linear(135deg, purple.400, purple.600)",
  },
  {
    id: "ioxet-gallery",
    title: "IOXET Gallery",
    description: "Showcase of IOXET solutions and customer success stories",
    icon: HiPhoto,
    gradient: "linear(135deg, green.400, green.600)",
  },
  {
    id: "case-studies",
    title: "Case Studies",
    description: "Real-world success stories and measurable business impact",
    icon: HiClipboardDocumentList,
    gradient: "linear(135deg, orange.400, orange.600)",
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
      <Box id="faqs">
        <FAQsSection />
      </Box>

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

            {/* Documentation Section - Grid with Hover Effects */}
            {section.id === "documentation" && section.items && (
              <SimpleGrid
                columns={{ base: 1, md: 2, lg: 3 }}
                gap={{ base: 6, md: 8 }}
              >
                {section.items.map((item, itemIndex) => (
                  <MotionBox
                    key={itemIndex}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: itemIndex * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <ChakraLink
                      href={item.link}
                      target={item.isExternal ? "_blank" : "_self"}
                      rel={item.isExternal ? "noopener noreferrer" : undefined}
                      style={{ textDecoration: 'none' }}
                      display="block"
                      h="full"
                    >
                      <Box
                        position="relative"
                        h="full"
                        borderRadius="2xl"
                        overflow="hidden"
                        shadow="md"
                        transition="all 0.4s ease"
                        cursor="pointer"
                        bg="white"
                        _hover={{
                          transform: "translateY(-8px)",
                          shadow: "2xl",
                        }}
                      >
                        {/* Image Section */}
                        <Box
                          position="relative"
                          h={{ base: "200px", md: "240px" }}
                          bg="gray.50"
                          overflow="hidden"
                        >
                          {item.image && (
                            <Image
                              src={item.image}
                              alt={item.title}
                              w="full"
                              h="full"
                              objectFit="contain"
                              transition="all 0.4s ease"
                              _groupHover={{
                                transform: "scale(1.05)"
                              }}
                            />
                          )}
                          
                          {/* Gradient Overlay on Hover */}
                          <Box
                            position="absolute"
                            top={0}
                            left={0}
                            right={0}
                            bottom={0}
                            bgGradient="linear(to-b, transparent, blackAlpha.700)"
                            opacity={0}
                            transition="opacity 0.4s ease"
                            _groupHover={{
                              opacity: 1
                            }}
                          />
                          
                          {/* Number Badge */}
                          <Box
                            position="absolute"
                            top={4}
                            right={4}
                            w="40px"
                            h="40px"
                            borderRadius="full"
                            bgGradient={section.gradient}
                            color="#1b75bb"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            fontSize="lg"
                            fontWeight="700"
                            shadow="lg"
                          >
                            {String(itemIndex + 1).padStart(2, '0')}
                          </Box>
                        </Box>

                        {/* Content Section */}
                        <Box
                          p={{ base: 5, md: 6 }}
                          position="relative"
                          role="group"
                          data-hover
                        >
                          <VStack align="start" gap={3}>
                            {/* Subtitle */}
                            {item.subtitle && (
                              <Text
                                fontSize="xs"
                                fontWeight="600"
                                color="primary.500"
                                textTransform="uppercase"
                                letterSpacing="wider"
                              >
                                {item.subtitle}
                              </Text>
                            )}
                            
                            {/* Title */}
                            <Text
                              fontSize={{ base: "xl", md: "2xl" }}
                              fontWeight="700"
                              color="text"
                              lineHeight="1.3"
                              transition="color 0.3s ease"
                              _groupHover={{
                                color: "primary.600"
                              }}
                            >
                              {item.title}
                            </Text>
                            
                            {/* Description */}
                            <Text
                              fontSize="sm"
                              color="muted"
                              lineHeight="1.7"
                              css={{
                                display: '-webkit-box',
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden'
                              }}
                            >
                              {item.description}
                            </Text>
                            
                            {/* CTA Button */}
                            <HStack
                              gap={2}
                              mt={2}
                              color="primary.500"
                              fontWeight="600"
                              fontSize="sm"
                              transition="all 0.3s ease"
                              _groupHover={{
                                gap: 3,
                                color: "primary.600"
                              }}
                            >
                              <Text>Visit Documentation</Text>
                              <Icon as={HiArrowRight} fontSize="md" />
                            </HStack>
                          </VStack>

                          {/* Hover Overlay Effect */}
                          <Box
                            position="absolute"
                            bottom={0}
                            left={0}
                            right={0}
                            h="4px"
                            bgGradient={section.gradient}
                            transform="scaleX(0)"
                            transformOrigin="left"
                            transition="transform 0.4s ease"
                            _groupHover={{
                              transform: "scaleX(1)"
                            }}
                          />
                        </Box>
                      </Box>
                    </ChakraLink>
                  </MotionBox>
                ))}
              </SimpleGrid>
            )}

            {/* IOXET Gallery Section - Image Grid */}
            {section.id === "ioxet-gallery" && (
              <VStack gap={8}>
                <SimpleGrid
                  columns={{ base: 2, md: 4 }}
                  gap={{ base: 4, md: 6 }}
                  w="full"
                >
                  {[1, 2, 3, 4].map((num) => (
                    <MotionBox
                      key={num}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: num * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Box
                        position="relative"
                        borderRadius="xl"
                        overflow="hidden"
                        shadow="md"
                        _hover={{
                          transform: "translateY(-4px)",
                          shadow: "xl",
                        }}
                        transition="all 0.3s ease"
                        bg="gray.100"
                      >
                        <Image
                          src={`/ioxet-gallery/image${num}.jpg`}
                          alt={`Gallery image ${num}`}
                          w="full"
                          h={{ base: "150px", md: "200px" }}
                          objectFit="cover"
                        />
                      </Box>
                    </MotionBox>
                  ))}
                </SimpleGrid>
                
                {/* View More Button */}
                <Link to="/gallery" style={{ textDecoration: 'none' }}>
                  <Button
                    size="lg"
                    colorScheme="primary"
                    bg="primary.500"
                    borderRadius="full"
                    px={8}
                    py={6}
                    fontSize="md"
                    fontWeight="600"
                    _hover={{
                      transform: "translateY(-2px)",
                      shadow: "lg",
                      bg: "primary.600"
                    }}
                    transition="all 0.3s ease"
                  >
                    View More Photos <Icon as={HiArrowRight} ml={2} />
                  </Button>
                </Link>
              </VStack>
            )}

            {/* Coming Soon Sections */}
            {section.id !== "documentation" && section.id !== "ioxet-gallery" && !section.items && (
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Box
                  p={12}
                  border="2px dashed"
                  borderColor="gray.300"
                  borderRadius="2xl"
                  textAlign="center"
                  bg="white"
                  position="relative"
                  overflow="hidden"
                >
                  {/* Background Gradient Overlay */}
                  <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    bgGradient={section.gradient}
                    opacity={0.03}
                    pointerEvents="none"
                  />
                  
                  <VStack gap={4} position="relative" zIndex={1}>
                    <Box
                      p={4}
                      bgGradient={section.gradient}
                      borderRadius="2xl"
                      color="white"
                      fontSize="4xl"
                      display="inline-flex"
                    >
                      <Icon as={section.icon} />
                    </Box>
                    <Text
                      fontSize={{ base: "2xl", md: "3xl" }}
                      fontWeight="700"
                      color="text"
                    >
                      Coming Soon
                    </Text>
                    <Text
                      fontSize="md"
                      color="muted"
                      maxW="xl"
                      lineHeight="1.7"
                    >
                      We're working hard to bring you comprehensive {section.title.toLowerCase()} content. 
                      Stay tuned for valuable insights and resources.
                    </Text>
                    <Box
                      mt={2}
                      px={4}
                      py={2}
                      bg="gray.100"
                      borderRadius="full"
                      display="inline-block"
                    >
                      <Text fontSize="sm" color="muted" fontWeight="600">
                        Expected Launch: Q1 2026
                      </Text>
                    </Box>
                  </VStack>
                </Box>
              </MotionBox>
            )}

            {/* Other Sections - Regular Grid Design */}
            {section.id !== "documentation" && section.id !== "ioxet-gallery" && section.items && (
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
                <Link to="/contact" style={{ textDecoration: 'none' }}>
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
