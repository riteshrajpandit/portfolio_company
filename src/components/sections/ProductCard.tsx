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
  HiCheckCircle,
  HiLightBulb,
  HiShieldCheck,
  HiGlobeAlt,
} from "react-icons/hi2"

const MotionBox = motion(Box)

interface Product {
  id: string
  title: string
  subtitle: string
  description: string
  icon: React.ComponentType
  gradient: string
  image: string
  features: string[]
  benefits: string[]
}

interface ProductCardProps {
  product: Product
  index: number
}

const ProductCard = ({ product, index }: ProductCardProps) => {
  return (
    <Box id={product.id} py={{ base: 16, md: 20 }} bg={index % 2 === 0 ? "white" : "neutral.50"}>
      <Container maxW="7xl">
        <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={12} alignItems="center">
          {/* Content Side */}
          <GridItem order={{ base: 2, lg: index % 2 === 0 ? 1 : 2 }}>
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
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
      </Container>
    </Box>
  )
}

export default ProductCard
