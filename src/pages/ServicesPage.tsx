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
  SimpleGrid,
} from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import {
  HiLightBulb,
  HiAcademicCap,
  HiArrowRight,
  HiCheckCircle,
  HiCog,
  HiChartBar,
  HiShieldCheck,
  HiUsers,
  HiGlobeAlt,
  HiClock,
  HiStar,
} from "react-icons/hi2"
import FeaturesSection from "@/components/sections/FeaturesSection"

const services = [
  {
    id: "it-consulting",
    title: "IT Consulting",
    subtitle: "Strategic Technology Guidance",
    description: "Navigate your digital transformation journey with expert guidance. Our consultants help you optimize your technology stack, improve processes, and achieve your business objectives through strategic IT planning.",
    icon: HiLightBulb,
    gradient: "linear(135deg, blue.500, indigo.600)",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop&auto=format",
    expertise: [
      {
        title: "Digital Transformation",
        description: "Modernize your business processes and technology infrastructure",
        icon: HiCog
      },
      {
        title: "Cloud Strategy",
        description: "Optimize cloud adoption and migration strategies",
        icon: HiGlobeAlt
      },
      {
        title: "Technology Assessment",
        description: "Evaluate and optimize your current technology stack",
        icon: HiChartBar
      },
      {
        title: "Security Consulting",
        description: "Strengthen your cybersecurity posture and compliance",
        icon: HiShieldCheck
      }
    ],
    process: [
      { phase: "Assessment", description: "Current state analysis and needs evaluation", duration: "1-2 weeks" },
      { phase: "Strategy", description: "Custom roadmap and solution design", duration: "2-3 weeks" },
      { phase: "Planning", description: "Detailed implementation planning", duration: "1 week" },
      { phase: "Execution", description: "Guided implementation and support", duration: "Ongoing" }
    ],
    pricing: {
      hourly: "$150-250/hour",
      project: "$5,000-50,000",
      retainer: "$3,000-15,000/month"
    }
  },
  {
    id: "workshop-training",
    title: "Workshop & Training",
    subtitle: "Professional Development Programs",
    description: "Empower your team with cutting-edge skills and knowledge through our comprehensive training programs and hands-on workshops designed for modern business needs.",
    icon: HiAcademicCap,
    gradient: "linear(135deg, emerald.500, teal.600)",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&auto=format",
    programs: [
      {
        title: "Leadership Development",
        description: "Build effective leadership skills for digital transformation",
        duration: "3 days",
        participants: "Up to 20",
        format: "In-person/Virtual"
      },
      {
        title: "Technical Skills Training",
        description: "Hands-on training in modern technologies and tools",
        duration: "5 days",
        participants: "Up to 15",
        format: "Hands-on Labs"
      },
      {
        title: "Process Improvement",
        description: "Lean and Agile methodologies for operational excellence",
        duration: "2 days",
        participants: "Up to 25",
        format: "Interactive Workshop"
      },
      {
        title: "Digital Literacy",
        description: "Essential digital skills for the modern workplace",
        duration: "4 days",
        participants: "Up to 30",
        format: "Blended Learning"
      }
    ],
    features: [
      "Customized curriculum for your industry",
      "Expert instructors with real-world experience",
      "Hands-on practical exercises",
      "Post-training support and resources",
      "Certification upon completion",
      "Flexible delivery options"
    ],
    outcomes: [
      "Increased team productivity and efficiency",
      "Improved technology adoption rates",
      "Enhanced problem-solving capabilities",
      "Better cross-team collaboration"
    ]
  }
]

const stats = [
  { label: "Training Programs", value: "200+", icon: HiAcademicCap },
  { label: "Professionals Trained", value: "5,000+", icon: HiUsers },
  { label: "Client Satisfaction", value: "98%", icon: HiStar },
  { label: "Years Experience", value: "10+", icon: HiClock }
]

const MotionBox = motion(Box)
const MotionContainer = motion(Container)

const ServicesPage = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box bg="neutral.50" pt={{ base: 28, md: 40 }} pb={{ base: 12, md: 16 }}>
        <Container maxW="7xl" px={{ base: 4, md: 6 }}>
          <MotionContainer
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            textAlign="center"
            maxW="4xl"
            mx="auto"
          >
            <Text
              fontSize={{ base: "2xl", sm: "3xl", md: "5xl", lg: "6xl" }}
              fontWeight="700"
              lineHeight="1.2"
              color="text"
              mb={{ base: 4, md: 6 }}
            >
              Expert{" "}
              <Text as="span" color="primary.500">
                Consulting
              </Text>{" "}
              & Training Services
            </Text>
            <Text
              fontSize={{ base: "md", md: "xl" }}
              color="muted"
              lineHeight="1.6"
              maxW="3xl"
              mx="auto"
              mb={{ base: 6, md: 8 }}
            >
              Accelerate your business growth with our strategic consulting services and 
              comprehensive training programs designed to unlock your team's full potential.
            </Text>
            <HStack justify="center" gap={4} wrap="wrap">
              <Link to="#it-consulting" style={{ textDecoration: 'none' }}>
                <Button
                  size="lg"
                  colorScheme="primary"
                  borderRadius="full"
                  px={8}
                  fontWeight="600"
                  _hover={{ transform: "translateY(-2px)", shadow: "lg" }}
                  transition="all 0.3s ease"
                >
                  Explore Services <HiArrowRight style={{ marginLeft: '8px' }} />
                </Button>
              </Link>
              <Link to="/about#career" style={{ textDecoration: 'none' }}>
                <Button
                  size="lg"
                  variant="outline"
                  borderColor="primary.500"
                  color="primary.500"
                  borderRadius="full"
                  px={8}
                  fontWeight="600"
                  _hover={{ bg: "primary.50", transform: "translateY(-2px)" }}
                  transition="all 0.3s ease"
                >
                  Contact Us
                </Button>
              </Link>
            </HStack>
          </MotionContainer>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container maxW="7xl" py={{ base: 12, md: 16 }} px={{ base: 4, md: 6 }}>
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <SimpleGrid columns={{ base: 2, md: 4 }} gap={8}>
            {stats.map((stat, index) => (
              <VStack key={index} gap={3} textAlign="center">
                <Box
                  p={4}
                  bg="primary.50"
                  borderRadius="xl"
                  color="primary.500"
                  fontSize="2xl"
                >
                  <Icon as={stat.icon} />
                </Box>
                <VStack gap={1}>
                  <Text fontSize="3xl" fontWeight="700" color="primary.500">
                    {stat.value}
                  </Text>
                  <Text fontSize="sm" color="muted" fontWeight="500">
                    {stat.label}
                  </Text>
                </VStack>
              </VStack>
            ))}
          </SimpleGrid>
        </MotionBox>
      </Container>

      <FeaturesSection />

      {/* Services Sections */}
      {services.map((service, index) => (
        <Box key={service.id} id={service.id} py={{ base: 12, md: 20 }} bg={index % 2 === 0 ? "white" : "neutral.50"}>
          <Container maxW="7xl" px={{ base: 4, md: 6 }}>
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
                        bg={service.gradient}
                        borderRadius="xl"
                        color="white"
                        fontSize="2xl"
                      >
                        <Icon as={service.icon} />
                      </Box>
                      <VStack align="start" gap={1}>
                        <Text fontSize="sm" color="primary.500" fontWeight="600" textTransform="uppercase">
                          {service.subtitle}
                        </Text>
                        <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="700" color="text">
                          {service.title}
                        </Text>
                      </VStack>
                    </HStack>

                    <Text fontSize={{ base: "md", md: "lg" }} color="muted" lineHeight="1.7">
                      {service.description}
                    </Text>

                    {/* Service-specific content */}
                    {service.id === "it-consulting" && service.expertise && (
                      <VStack align="start" gap={4} w="full">
                        <Text fontSize="lg" fontWeight="600" color="text">
                          Our Expertise Areas
                        </Text>
                        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4} w="full">
                          {service.expertise.map((area, idx) => (
                            <Box
                              key={idx}
                              p={4}
                              bg="white"
                              borderRadius="lg"
                              border="1px solid"
                              borderColor="gray.200"
                              _hover={{ shadow: "md", borderColor: "primary.300" }}
                              transition="all 0.3s ease"
                            >
                              <HStack gap={3} align="start">
                                <Icon as={area.icon} color="primary.500" fontSize="lg" mt={1} />
                                <VStack gap={1} align="start">
                                  <Text fontSize="sm" fontWeight="600" color="text">
                                    {area.title}
                                  </Text>
                                  <Text fontSize="xs" color="muted">
                                    {area.description}
                                  </Text>
                                </VStack>
                              </HStack>
                            </Box>
                          ))}
                        </Grid>
                      </VStack>
                    )}

                    {service.id === "workshop-training" && service.features && (
                      <VStack align="start" gap={3} w="full">
                        <Text fontSize="lg" fontWeight="600" color="text">
                          Training Features
                        </Text>
                        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={3} w="full">
                          {service.features.map((feature, idx) => (
                            <HStack key={idx} gap={3} align="start">
                              <Icon as={HiCheckCircle} color="green.500" fontSize="lg" mt={1} flexShrink={0} />
                              <Text fontSize="sm" color="text" fontWeight="500">
                                {feature}
                              </Text>
                            </HStack>
                          ))}
                        </Grid>
                      </VStack>
                    )}

                    <HStack gap={4} wrap="wrap">
                      <Link to="/products" style={{ textDecoration: 'none' }}>
                        <Button
                          colorScheme="primary"
                          borderRadius="full"
                          px={6}
                          fontWeight="600"
                          _hover={{ transform: "translateY(-2px)" }}
                          transition="all 0.3s ease"
                        >
                          Get Started
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
                      src={service.image}
                      alt={service.title}
                      w="full"
                      h={{ base: "300px", md: "400px" }}
                      objectFit="cover"
                    />
                    <Box
                      position="absolute"
                      inset={0}
                      bg={service.gradient}
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
                        {service.subtitle}
                      </Text>
                    </Box>
                  </Box>
                </MotionBox>
              </GridItem>
            </Grid>

            {/* Additional Content Sections */}
            {service.id === "it-consulting" && service.process && (
              <MotionBox
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                mt={16}
              >
                <VStack gap={8}>
                  <Text fontSize="2xl" fontWeight="700" color="text" textAlign="center">
                    Our Consulting Process
                  </Text>
                  <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={6} w="full">
                    {service.process.map((phase, idx) => (
                      <VStack key={idx} gap={4} textAlign="center">
                        <Box
                          w="60px"
                          h="60px"
                          bg="primary.500"
                          color="white"
                          borderRadius="full"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          fontSize="xl"
                          fontWeight="700"
                        >
                          {idx + 1}
                        </Box>
                        <VStack gap={2}>
                          <Text fontSize="md" fontWeight="600" color="text">
                            {phase.phase}
                          </Text>
                          <Text fontSize="sm" color="muted" textAlign="center">
                            {phase.description}
                          </Text>
                          <Badge colorScheme="primary" variant="subtle" px={2} py={1} borderRadius="full" fontSize="xs">
                            {phase.duration}
                          </Badge>
                        </VStack>
                      </VStack>
                    ))}
                  </Grid>
                  
                  {service.pricing && (
                    <Box
                      mt={8}
                      p={6}
                      bg="primary.50"
                      borderRadius="xl"
                      border="1px solid"
                      borderColor="primary.200"
                      w="full"
                    >
                      <VStack gap={4}>
                        <Text fontSize="lg" fontWeight="600" color="text" textAlign="center">
                          Flexible Pricing Options
                        </Text>
                        <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} w="full">
                          <VStack gap={2} textAlign="center">
                            <Text fontSize="md" fontWeight="600" color="primary.600">
                              Hourly Rate
                            </Text>
                            <Text fontSize="2xl" fontWeight="700" color="text">
                              {service.pricing.hourly}
                            </Text>
                            <Text fontSize="sm" color="muted">
                              For short-term projects
                            </Text>
                          </VStack>
                          <VStack gap={2} textAlign="center">
                            <Text fontSize="md" fontWeight="600" color="primary.600">
                              Project-Based
                            </Text>
                            <Text fontSize="2xl" fontWeight="700" color="text">
                              {service.pricing.project}
                            </Text>
                            <Text fontSize="sm" color="muted">
                              Fixed scope deliverables
                            </Text>
                          </VStack>
                          <VStack gap={2} textAlign="center">
                            <Text fontSize="md" fontWeight="600" color="primary.600">
                              Monthly Retainer
                            </Text>
                            <Text fontSize="2xl" fontWeight="700" color="text">
                              {service.pricing.retainer}
                            </Text>
                            <Text fontSize="sm" color="muted">
                              Ongoing strategic support
                            </Text>
                          </VStack>
                        </SimpleGrid>
                      </VStack>
                    </Box>
                  )}
                </VStack>
              </MotionBox>
            )}

            {service.id === "workshop-training" && service.programs && (
              <MotionBox
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                mt={16}
              >
                <VStack gap={8}>
                  <Text fontSize="2xl" fontWeight="700" color="text" textAlign="center">
                    Training Programs
                  </Text>
                  <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6} w="full">
                    {service.programs.map((program, idx) => (
                      <Box
                        key={idx}
                        p={6}
                        bg="white"
                        borderRadius="xl"
                        border="1px solid"
                        borderColor="gray.200"
                        shadow="sm"
                        _hover={{ shadow: "md", transform: "translateY(-2px)" }}
                        transition="all 0.3s ease"
                      >
                        <VStack gap={4} align="start">
                          <Text fontSize="lg" fontWeight="600" color="text">
                            {program.title}
                          </Text>
                          <Text fontSize="sm" color="muted" lineHeight="1.6">
                            {program.description}
                          </Text>
                          <Box h="1px" bg="gray.200" w="full" />
                          <SimpleGrid columns={3} gap={4} w="full" fontSize="sm">
                            <VStack gap={1} align="start">
                              <Text fontWeight="600" color="primary.600">
                                Duration
                              </Text>
                              <Text color="muted">
                                {program.duration}
                              </Text>
                            </VStack>
                            <VStack gap={1} align="start">
                              <Text fontWeight="600" color="primary.600">
                                Group Size
                              </Text>
                              <Text color="muted">
                                {program.participants}
                              </Text>
                            </VStack>
                            <VStack gap={1} align="start">
                              <Text fontWeight="600" color="primary.600">
                                Format
                              </Text>
                              <Text color="muted">
                                {program.format}
                              </Text>
                            </VStack>
                          </SimpleGrid>
                        </VStack>
                      </Box>
                    ))}
                  </Grid>

                  {service.outcomes && (
                    <Box
                      mt={8}
                      p={6}
                      bg="emerald.50"
                      borderRadius="xl"
                      border="1px solid"
                      borderColor="emerald.200"
                      w="full"
                    >
                      <VStack gap={4}>
                        <Text fontSize="lg" fontWeight="600" color="text" textAlign="center">
                          Expected Outcomes
                        </Text>
                        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={3} w="full">
                          {service.outcomes.map((outcome, idx) => (
                            <HStack key={idx} gap={3} align="start">
                              <Icon as={HiCheckCircle} color="emerald.500" fontSize="lg" mt={1} flexShrink={0} />
                              <Text fontSize="sm" color="text" fontWeight="500">
                                {outcome}
                              </Text>
                            </HStack>
                          ))}
                        </Grid>
                      </VStack>
                    </Box>
                  )}
                </VStack>
              </MotionBox>
            )}
          </Container>
        </Box>
      ))}

      {/* CTA Section */}
      <Container maxW="7xl" py={{ base: 12, md: 20 }} px={{ base: 4, md: 6 }}>
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
                Ready to Accelerate Your Growth?
              </Text>
              <Text fontSize="xl" opacity={0.9} lineHeight="1.6">
                Let our experts help you navigate challenges and unlock new opportunities for your business.
              </Text>
              <HStack gap={4} wrap="wrap" justify="center">
                <Link to="/products" style={{ textDecoration: 'none' }}>
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
                    Start Your Journey <HiArrowRight style={{ marginLeft: '8px' }} />
                  </Button>
                </Link>
                <Link to="/resources" style={{ textDecoration: 'none' }}>
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
                    View Resources
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

export default ServicesPage
