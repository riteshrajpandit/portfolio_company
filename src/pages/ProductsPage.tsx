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
import {
  HiChartBar,
  HiCog,
  HiSparkles,
  HiArrowRight,
  HiCheckCircle,
  HiLightBulb,
  HiShieldCheck,
  HiGlobeAlt,
} from "react-icons/hi2"

const products = [
  {
    id: "erp",
    title: "ERP Solutions",
    subtitle: "Enterprise Resource Planning",
    description: "Streamline your entire business operation with our comprehensive ERP system that integrates all departments and processes into a single, unified platform.",
    icon: HiChartBar,
    gradient: "linear(135deg, blue.500, cyan.500)",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&auto=format",
    features: [
      "Financial Management & Accounting",
      "Supply Chain & Inventory Control",
      "Human Resources Management",
      "Customer Relationship Management",
      "Business Intelligence & Analytics",
      "Multi-location Support"
    ],
    benefits: [
      "Increased operational efficiency by 40%",
      "Real-time visibility across all departments",
      "Reduced manual processes and errors",
      "Improved compliance and reporting"
    ],
    pricing: {
      starter: { price: "$299", users: "Up to 10 users", features: ["Core ERP modules", "Basic reporting", "Email support"] },
      professional: { price: "$599", users: "Up to 50 users", features: ["All ERP modules", "Advanced analytics", "Priority support", "API access"] },
      enterprise: { price: "Custom", users: "Unlimited users", features: ["Full customization", "Dedicated support", "On-premise option", "Advanced integrations"] }
    }
  },
  {
    id: "solutions",
    title: "Custom Solutions",
    subtitle: "Tailored Business Applications",
    description: "Get bespoke software solutions designed specifically for your unique business requirements and industry-specific challenges.",
    icon: HiCog,
    gradient: "linear(135deg, purple.500, pink.500)",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&auto=format",
    features: [
      "Custom Application Development",
      "Legacy System Modernization",
      "Third-party Integrations",
      "Mobile & Web Applications",
      "Database Design & Optimization",
      "API Development & Management"
    ],
    benefits: [
      "Perfect fit for your business processes",
      "Scalable architecture for future growth",
      "Seamless integration with existing systems",
      "Competitive advantage through innovation"
    ],
    process: [
      { step: "Discovery", description: "Understanding your requirements and challenges" },
      { step: "Design", description: "Creating user-centered solutions and architecture" },
      { step: "Development", description: "Building with modern technologies and best practices" },
      { step: "Deployment", description: "Smooth launch with comprehensive testing" },
      { step: "Support", description: "Ongoing maintenance and enhancement" }
    ]
  },
  {
    id: "amigaa",
    title: "Amigaa Platform",
    subtitle: "AI-Powered Intelligent Automation",
    description: "Revolutionary AI platform that transforms business operations through intelligent automation, predictive analytics, and machine learning capabilities.",
    icon: HiSparkles,
    gradient: "linear(135deg, orange.500, red.500)",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop&auto=format",
    features: [
      "Machine Learning Models",
      "Natural Language Processing",
      "Computer Vision & Image Recognition",
      "Predictive Analytics",
      "Intelligent Process Automation",
      "Real-time Decision Making"
    ],
    benefits: [
      "Automate complex decision-making processes",
      "Reduce operational costs by up to 60%",
      "Improve accuracy and consistency",
      "24/7 intelligent monitoring and alerts"
    ],
    useCases: [
      { title: "Document Processing", description: "Automatically extract and process information from documents" },
      { title: "Quality Control", description: "AI-powered visual inspection and defect detection" },
      { title: "Customer Service", description: "Intelligent chatbots and automated support systems" },
      { title: "Fraud Detection", description: "Real-time transaction monitoring and risk assessment" }
    ]
  }
]

const MotionBox = motion(Box)
const MotionContainer = motion(Container)

const ProductsPage = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box bg="neutral.50" pt={20} pb={16}>
        <Container maxW="7xl">
          <MotionContainer
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            textAlign="center"
            maxW="4xl"
            mx="auto"
          >
            <Badge
              colorScheme="primary"
              variant="solid"
              px={4}
              py={2}
              borderRadius="full"
              fontSize="sm"
              fontWeight="600"
              mb={6}
            >
              ✨ Our Product Suite
            </Badge>
            <Text
              fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
              fontWeight="700"
              lineHeight="1.1"
              color="text"
              mb={6}
            >
              Powerful{" "}
              <Text as="span" color="primary.500">
                Solutions
              </Text>{" "}
              for Modern Business
            </Text>
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color="muted"
              lineHeight="1.7"
              maxW="3xl"
              mx="auto"
              mb={8}
            >
              Discover our comprehensive suite of products designed to transform your business operations, 
              enhance productivity, and drive sustainable growth in today's digital landscape.
            </Text>
            <HStack justify="center" gap={4} wrap="wrap">
              <Link to="#erp" style={{ textDecoration: 'none' }}>
                <Button
                  size="lg"
                  colorScheme="primary"
                  borderRadius="full"
                  px={8}
                  fontWeight="600"
                  _hover={{ transform: "translateY(-2px)", shadow: "lg" }}
                  transition="all 0.3s ease"
                >
                  Explore Products <HiArrowRight style={{ marginLeft: '8px' }} />
                </Button>
              </Link>
              <Link to="/services" style={{ textDecoration: 'none' }}>
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
                  Get Consultation
                </Button>
              </Link>
            </HStack>
          </MotionContainer>
        </Container>
      </Box>

      {/* Products Sections */}
      {products.map((product, index) => (
        <Box key={product.id} id={product.id} py={{ base: 16, md: 20 }} bg={index % 2 === 0 ? "white" : "neutral.50"}>
          <Container maxW="7xl">
            <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={12} alignItems="center">
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
                        bg={product.gradient}
                        borderRadius="xl"
                        color="white"
                        fontSize="2xl"
                      >
                        <Icon as={product.icon} />
                      </Box>
                      <VStack align="start" gap={1}>
                        <Text fontSize="sm" color="primary.500" fontWeight="600" textTransform="uppercase">
                          {product.subtitle}
                        </Text>
                        <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="700" color="text">
                          {product.title}
                        </Text>
                      </VStack>
                    </HStack>

                    <Text fontSize={{ base: "md", md: "lg" }} color="muted" lineHeight="1.7">
                      {product.description}
                    </Text>

                    {/* Features */}
                    <VStack align="start" gap={3} w="full">
                      <Text fontSize="lg" fontWeight="600" color="text">
                        Key Features
                      </Text>
                      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={3} w="full">
                        {product.features.map((feature, idx) => (
                          <HStack key={idx} gap={3} align="start">
                            <Icon as={HiCheckCircle} color="green.500" fontSize="lg" mt={1} flexShrink={0} />
                            <Text fontSize="sm" color="text" fontWeight="500">
                              {feature}
                            </Text>
                          </HStack>
                        ))}
                      </Grid>
                    </VStack>

                    {/* Benefits */}
                    <VStack align="start" gap={3} w="full">
                      <Text fontSize="lg" fontWeight="600" color="text">
                        Business Benefits
                      </Text>
                      <VStack align="start" gap={2} w="full">
                        {product.benefits.map((benefit, idx) => (
                          <HStack key={idx} gap={3} align="start">
                            <Icon as={HiLightBulb} color="primary.500" fontSize="lg" mt={1} flexShrink={0} />
                            <Text fontSize="sm" color="muted" fontWeight="500">
                              {benefit}
                            </Text>
                          </HStack>
                        ))}
                      </VStack>
                    </VStack>

                    <HStack gap={4} wrap="wrap">
                      <Link to="/services#it-consulting" style={{ textDecoration: 'none' }}>
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
                      <Link to="/services#workshop-training" style={{ textDecoration: 'none' }}>
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
                          Get Demo
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
                      src={product.image}
                      alt={product.title}
                      w="full"
                      h={{ base: "300px", md: "400px" }}
                      objectFit="cover"
                    />
                    <Box
                      position="absolute"
                      inset={0}
                      bg={product.gradient}
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
                        {product.subtitle}
                      </Text>
                    </Box>

                    {/* Floating Stats */}
                    <Box
                      position="absolute"
                      bottom={6}
                      right={6}
                      bg="whiteAlpha.900"
                      backdropFilter="blur(20px)"
                      p={4}
                      borderRadius="xl"
                      shadow="lg"
                    >
                      <VStack gap={2} align="start">
                        <HStack gap={2}>
                          <Icon as={HiShieldCheck} color="green.500" />
                          <Text fontSize="xs" fontWeight="600" color="text">
                            Enterprise Ready
                          </Text>
                        </HStack>
                        <HStack gap={2}>
                          <Icon as={HiGlobeAlt} color="blue.500" />
                          <Text fontSize="xs" fontWeight="600" color="text">
                            Global Support
                          </Text>
                        </HStack>
                      </VStack>
                    </Box>
                  </Box>
                </MotionBox>
              </GridItem>
            </Grid>

            {/* Additional Content for specific products */}
            {product.id === "erp" && product.pricing && (
              <MotionBox
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                mt={16}
              >
                <Text fontSize="2xl" fontWeight="700" color="text" textAlign="center" mb={10}>
                  Choose Your ERP Plan
                </Text>
                <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
                  {Object.entries(product.pricing).map(([planName, plan]) => (
                    <Box
                      key={planName}
                      bg="white"
                      p={8}
                      borderRadius="2xl"
                      border="2px solid"
                      borderColor={planName === "professional" ? "primary.500" : "gray.200"}
                      shadow="lg"
                      position="relative"
                      _hover={{ transform: "translateY(-4px)", shadow: "xl" }}
                      transition="all 0.3s ease"
                    >
                      {planName === "professional" && (
                        <Badge
                          position="absolute"
                          top={-3}
                          left="50%"
                          transform="translateX(-50%)"
                          colorScheme="primary"
                          px={4}
                          py={1}
                          borderRadius="full"
                          fontSize="xs"
                          fontWeight="600"
                        >
                          Most Popular
                        </Badge>
                      )}
                      
                      <VStack gap={4} align="start">
                        <Text fontSize="xl" fontWeight="700" color="text" textTransform="capitalize">
                          {planName}
                        </Text>
                        <HStack gap={1} align="baseline">
                          <Text fontSize="3xl" fontWeight="700" color="primary.500">
                            {plan.price}
                          </Text>
                          {plan.price !== "Custom" && (
                            <Text fontSize="sm" color="muted">
                              /month
                            </Text>
                          )}
                        </HStack>
                        <Text fontSize="sm" color="muted" fontWeight="500">
                          {plan.users}
                        </Text>
                        
                        <VStack gap={2} align="start" w="full">
                          {plan.features.map((feature, idx) => (
                            <HStack key={idx} gap={2} align="start">
                              <Icon as={HiCheckCircle} color="green.500" fontSize="sm" mt={1} />
                              <Text fontSize="sm" color="text">
                                {feature}
                              </Text>
                            </HStack>
                          ))}
                        </VStack>
                        
                        <Button
                          w="full"
                          colorScheme={planName === "professional" ? "primary" : undefined}
                          variant={planName === "professional" ? "solid" : "outline"}
                          borderRadius="full"
                          fontWeight="600"
                          _hover={{ transform: "translateY(-1px)" }}
                          transition="all 0.3s ease"
                        >
                          {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
                        </Button>
                      </VStack>
                    </Box>
                  ))}
                </Grid>
              </MotionBox>
            )}

            {product.id === "solutions" && product.process && (
              <MotionBox
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                mt={16}
              >
                <Text fontSize="2xl" fontWeight="700" color="text" textAlign="center" mb={10}>
                  Our Development Process
                </Text>
                <Grid templateColumns={{ base: "1fr", md: "repeat(5, 1fr)" }} gap={6}>
                  {product.process.map((step, idx) => (
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
                          {step.step}
                        </Text>
                        <Text fontSize="sm" color="muted" textAlign="center">
                          {step.description}
                        </Text>
                      </VStack>
                    </VStack>
                  ))}
                </Grid>
              </MotionBox>
            )}

            {product.id === "amigaa" && product.useCases && (
              <MotionBox
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                mt={16}
              >
                <Text fontSize="2xl" fontWeight="700" color="text" textAlign="center" mb={10}>
                  Real-World Applications
                </Text>
                <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
                  {product.useCases.map((useCase, idx) => (
                    <Box
                      key={idx}
                      bg="white"
                      p={6}
                      borderRadius="xl"
                      border="1px solid"
                      borderColor="gray.200"
                      shadow="sm"
                      _hover={{ shadow: "md", transform: "translateY(-2px)" }}
                      transition="all 0.3s ease"
                    >
                      <VStack gap={3} align="start">
                        <Text fontSize="lg" fontWeight="600" color="text">
                          {useCase.title}
                        </Text>
                        <Text fontSize="sm" color="muted" lineHeight="1.6">
                          {useCase.description}
                        </Text>
                      </VStack>
                    </Box>
                  ))}
                </Grid>
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
                Ready to Transform Your Business?
              </Text>
              <Text fontSize="xl" opacity={0.9} lineHeight="1.6">
                Choose the perfect product for your needs or let our experts help you find the ideal solution.
              </Text>
              <HStack gap={4} wrap="wrap" justify="center">
                <Link to="/services#it-consulting" style={{ textDecoration: 'none' }}>
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
                    Get Consultation <HiArrowRight style={{ marginLeft: '8px' }} />
                  </Button>
                </Link>
                <Link to="/about#career" style={{ textDecoration: 'none' }}>
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
                    Contact Us
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

export default ProductsPage
