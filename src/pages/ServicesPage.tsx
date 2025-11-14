import {
  Box,
  Container,
  Text,
  Button,
  VStack,
  HStack,
  Grid,
  GridItem,
  Icon,
  Image,
} from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import {
  HiLightBulb,
  HiAcademicCap,
  HiArrowRight,
  HiCheckCircle,
  HiCog,
  HiSparkles,
  HiCubeTransparent
} from "react-icons/hi2"
// import FeaturesSection from "@/components/sections/FeaturesSection"

const services = [
  {
    id: "custom-software",
    title: "Custom Software Built for Your Business Needs",
    subtitle: "Custom AI Leveraged Software Development",
    description: "Innovative AI and software solutions tailored to your unique business challenges, enhance operational efficiency, and drive your digital transformation journey.",
    icon: HiLightBulb,
    gradient: "linear(135deg, blue.500, indigo.600)",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop&auto=format",
    keyFeatures: [
      "Custom Software Development",
      "SaaS Product Development",
      "Mobile App Development",
      "CI/CD & Automation",
      "API Development & Integration",
      "Agile Product Development",
      "Cross-Platform & Native Mobile Apps",
      "Data-Driven Decision Systems"
    ],
    technologicalAdaptation: [
      "Machine Learning Models",
      "Natural Language Processing",
      "Computer Vision & Image Recognition"
    ],
    businessBenefits: [
      "Your solution for your problems",
      "Reduce operational costs",
      "Improve accuracy and consistency",
      "Improve operational visibility"
    ],
    process: [
      { phase: "Discovery", description: "Understanding your requirements and challenges" },
      { phase: "Design", description: "Creating user-centered solutions and architecture" },
      { phase: "Development", description: "Building with modern technologies and best practices" },
      { phase: "Deployment", description: "Smooth launch with comprehensive testing" },
      { phase: "Support", description: "Ongoing maintenance and enhancement" }
    ]
  },
  {
    id: "ai-strategy",
    title: "Enterprise AI Use Case Consulting and AI Transformation Consultancy",
    subtitle: "AI Strategy Consultancy",
    description: "We help you harness the full potential of AI and ML to scale, automate and forecast events through development of comprehensive AI roadmap and implementation strategy tailored to your business objectives.",
    icon: HiSparkles,
    gradient: "linear(135deg, emerald.500, teal.600)",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&auto=format",
    weBring: [
      "Industry Expertise & Best Practices",
      "Cutting-Edge AI/ML Technology",
      "Proven Implementation Framework",
      "ROI-Focused Approach",
      "End-to-End Support"
    ],
    steps: [
      "Discovery & Assessment",
      "AI Readiness Evaluation",
      "Strategy Development",
      "Roadmap Creation",
      "Implementation Support",
      "Continuous Optimization"
    ],
    aiServices: [
      {
        title: "AI Strategy Consulting",
        description: "Identify the right opportunities and create a roadmap to implement AI effectively across your business."
      },
      {
        title: "Machine Learning Model Development",
        description: "Design, train, and deploy supervised, unsupervised, and reinforcement learning models."
      }
    ]
  },
  {
    id: "it-consulting",
    title: "Leverage IT as a Business Success Tool",
    subtitle: "IT Consultancy",
    description: "Our expertise will help you convert IT as your business success tool. We facilitate and integrate IT as a Business Success Tool to your Business Operation in an internationally accepted Practice.",
    icon: HiCog,
    gradient: "linear(135deg, purple.500, pink.600)",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&auto=format",
    weAssure: [
      "Strategic IT Planning & Governance",
      "Technology Infrastructure Optimization",
      "Digital Transformation Roadmap",
      "IT Risk Management & Compliance"
    ],
    businessServices: [
      "IT Strategy & Planning",
      "Technology Assessment",
      "Infrastructure Modernization",
      "Cloud Migration & Management",
      "Cybersecurity Consulting"
    ]
  },
  {
    id: "blockchain",
    title: "Web3 and Blockchain Development",
    subtitle: "Web3 and Blockchain",
    description: "We streamline blockchain for enterprise by providing secure, scalable, ROI-driven, and future-ready solutions that effectively and transparently address actual business problems. We help you gain control on seamless integration and efficient processes for sustained success.",
    icon: HiCubeTransparent,
    gradient: "linear(135deg, orange.500, red.600)",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop&auto=format",
    topFeatures: [
      "Smart Contract Development",
      "Decentralized Application (DApp) Development",
      "Blockchain Integration Services",
      "NFT Platform Development",
      "Cryptocurrency Wallet Development",
      "Blockchain Consulting & Strategy",
      "Private & Public Blockchain Solutions"
    ]
  },
  {
    id: "workshop-training",
    title: "Professional Development Through Tailored Workshops and Trainings",
    subtitle: "Empower Your HR",
    description: "Empower your team with cutting-edge skills and knowledge through our comprehensive training programs and hands-on workshops designed for modern business needs.",
    icon: HiAcademicCap,
    gradient: "linear(135deg, blue.500, cyan.600)",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=600&fit=crop&auto=format",
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

const MotionBox = motion(Box)
const MotionContainer = motion(Container)

const ServicesPage = () => {
  return (
    <Box overflowX={"hidden"}>
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
                AI Consulting
              </Text>{" "}
              & Software Development
            </Text>
            <Text
              fontSize={{ base: "md", md: "xl" }}
              color="muted"
              lineHeight="1.6"
              maxW="3xl"
              mx="auto"
              mb={{ base: 6, md: 8 }}
            >
              Accelerate your business growth with our strategic consulting services on comprehensive AI roadmap development and implementation and comprehensive development services to unlock full potential of your business in today's world.
            </Text>
          </MotionContainer>
        </Container>
      </Box>

      {/* Stats Section */}
      {/* <Container maxW="7xl" py={{ base: 12, md: 16 }} px={{ base: 4, md: 6 }}>
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
      </Container> */}

      {/* <FeaturesSection /> */}

      {/* Services Sections */}
      {services.map((service, index) => (
        <Box key={service.id} id={service.id} py={{ base: 12, md: 8 }} bg={index % 2 === 0 ? "white" : "neutral.50"}>
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
                        color="primary.500"
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
                    {/* Custom Software Development */}
                    {service.id === "custom-software" && (
                      <>
                        <VStack align="start" gap={3} w="full">
                          <Text fontSize="lg" fontWeight="600" color="text">
                            Key Features
                          </Text>
                          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={3} w="full">
                            {'keyFeatures' in service && service.keyFeatures?.map((feature, idx) => (
                              <HStack key={idx} gap={3} align="start">
                                <Icon as={HiCheckCircle} color="blackAlpha.700" fontSize="lg" mt={1} flexShrink={0} />
                                <Text fontSize="sm" color="text" fontWeight="500">
                                  {feature}
                                </Text>
                              </HStack>
                            ))}
                          </Grid>
                        </VStack>
                        
                        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6} w="full">
                          <VStack align="start" gap={3}>
                            <Text fontSize="lg" fontWeight="600" color="text">
                              Business Benefits
                            </Text>
                            {'businessBenefits' in service && service.businessBenefits?.map((benefit, idx) => (
                              <HStack key={idx} gap={3} align="start">
                                <Icon as={HiCheckCircle} color="#1B75BB" fontSize="lg" mt={1} flexShrink={0} />
                                <Text fontSize="sm" color="text" fontWeight="500">
                                  {benefit}
                                </Text>
                              </HStack>
                            ))}
                          </VStack>
                          
                          <VStack align="start" gap={3}>
                            <Text fontSize="lg" fontWeight="600" color="text">
                              Technological Adaptation
                            </Text>
                            {'technologicalAdaptation' in service && service.technologicalAdaptation?.map((tech, idx) => (
                              <HStack key={idx} gap={3} align="start">
                                <Icon as={HiCheckCircle} color="#1B75BB" fontSize="lg" mt={1} flexShrink={0} />
                                <Text fontSize="sm" color="text" fontWeight="500">
                                  {tech}
                                </Text>
                              </HStack>
                            ))}
                          </VStack>
                        </Grid>
                      </>
                    )}

                    {/* AI Strategy */}
                    {service.id === "ai-strategy" && (
                      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6} w="full">
                        <VStack align="start" gap={3}>
                          <Text fontSize="lg" fontWeight="600" color="text">
                            We Bring
                          </Text>
                          {'weBring' in service && service.weBring?.map((item, idx) => (
                            <HStack key={idx} gap={3} align="start">
                              <Icon as={HiCheckCircle} color="blackAlpha.700" fontSize="lg" mt={1} flexShrink={0} />
                              <Text fontSize="sm" color="text" fontWeight="500">
                                {item}
                              </Text>
                            </HStack>
                          ))}
                        </VStack>
                        
                        <VStack align="start" gap={3}>
                          <Text fontSize="lg" fontWeight="600" color="text">
                            Steps We Care
                          </Text>
                          {'steps' in service && service.steps?.map((step, idx) => (
                            <HStack key={idx} gap={3} align="start">
                              <Icon as={HiCheckCircle} color="#1B75BB" fontSize="lg" mt={1} flexShrink={0} />
                              <Text fontSize="sm" color="text" fontWeight="500">
                                {step}
                              </Text>
                            </HStack>
                          ))}
                        </VStack>
                      </Grid>
                    )}

                    {/* IT Consulting */}
                    {service.id === "it-consulting" && (
                      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6} w="full">
                        <VStack align="start" gap={3}>
                          <Text fontSize="lg" fontWeight="600" color="text">
                            We Assure
                          </Text>
                          {'weAssure' in service && service.weAssure?.map((item, idx) => (
                            <HStack key={idx} gap={3} align="start">
                              <Icon as={HiCheckCircle} color="blackAlpha.700" fontSize="lg" mt={1} flexShrink={0} />
                              <Text fontSize="sm" color="text" fontWeight="500">
                                {item}
                              </Text>
                            </HStack>
                          ))}
                        </VStack>
                        
                        <VStack align="start" gap={3}>
                          <Text fontSize="lg" fontWeight="600" color="text">
                            Business Services
                          </Text>
                          {'businessServices' in service && service.businessServices?.map((svc, idx) => (
                            <HStack key={idx} gap={3} align="start">
                              <Icon as={HiCheckCircle} color="#1B75BB" fontSize="lg" mt={1} flexShrink={0} />
                              <Text fontSize="sm" color="text" fontWeight="500">
                                {svc}
                              </Text>
                            </HStack>
                          ))}
                        </VStack>
                      </Grid>
                    )}

                    {/* Blockchain */}
                    {service.id === "blockchain" && (
                      <VStack align="start" gap={3} w="full">
                        <Text fontSize="lg" fontWeight="600" color="text">
                          Top Features
                        </Text>
                        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={3} w="full">
                          {'topFeatures' in service && service.topFeatures?.map((feature, idx) => (
                            <HStack key={idx} gap={3} align="start">
                              <Icon as={HiCheckCircle} color="#1B75BB" fontSize="lg" mt={1} flexShrink={0} />
                              <Text fontSize="sm" color="text" fontWeight="500">
                                {feature}
                              </Text>
                            </HStack>
                          ))}
                        </Grid>
                      </VStack>
                    )}

                    {/* Workshop & Training */}
                    {service.id === "workshop-training" && 'features' in service && service.features && (
                      <VStack align="start" gap={3} w="full">
                        <Text fontSize="lg" fontWeight="600" color="text">
                          Training Features
                        </Text>
                        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={3} w="full">
                          {service.features.map((feature, idx) => (
                            <HStack key={idx} gap={3} align="start">
                              <Icon as={HiCheckCircle} color="#1B75BB" fontSize="lg" mt={1} flexShrink={0} />
                              <Text fontSize="sm" color="text" fontWeight="500">
                                {feature}
                              </Text>
                            </HStack>
                          ))}
                        </Grid>
                      </VStack>
                    )}

                    <HStack gap={4} wrap="wrap">
                      <Link to="/contact" style={{ textDecoration: 'none' }}>
                        <Button
                          colorScheme="primary"
                          borderRadius="full"
                          px={6}
                          fontWeight="600"
                          _hover={{ transform: "translateY(-2px)" }}
                          transition="all 0.3s ease"
                        >
                          Contact Us
                        </Button>
                      </Link>
                      {/* <Link to="/about#career" style={{ textDecoration: 'none' }}>
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
                      </Link> */}
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
            {service.id === "custom-software" && 'process' in service && service.process && (
              <MotionBox
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                mt={16}
              >
                <VStack gap={8}>
                  <Text fontSize="2xl" fontWeight="700" color="text" textAlign="center">
                    Development Process: From Idea to Production
                  </Text>
                  <Box position="relative" w="full">
                    <Grid templateColumns={{ base: "1fr", md: "repeat(5, 1fr)" }} gap={6} w="full">
                      {service.process.map((phase, idx) => (
                        <Box key={idx} position="relative">
                          <VStack gap={4} textAlign="center">
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
                              position="relative"
                              zIndex={2}
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
                            </VStack>
                          </VStack>
                          {/* Connecting Line */}
                          {idx < service.process.length - 1 && (
                            <Box
                              position="absolute"
                              top="30px"
                              left="calc(100% - 90px)"
                              right="calc(-50%)"
                              height="2px"
                              bg="primary.300"
                              zIndex={1}
                              display={{ base: "none", md: "block" }}
                            />
                          )}
                        </Box>
                      ))}
                    </Grid>
                  </Box>
                </VStack>
              </MotionBox>
            )}
          </Container>
        </Box>
      ))}

      {/* CTA Section */}
      <Container maxW="7xl" py={{ base: 12, md: 16 }} px={{ base: 4, md: 6 }}>
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
