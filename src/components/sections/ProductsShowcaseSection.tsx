import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  Container,
  Text,
  VStack,
  HStack,
  Box,
  Grid,
  GridItem,
  Image,
  Button,
  Badge,
} from '@chakra-ui/react'
import { FaArrowRight, FaRocket, FaCog } from 'react-icons/fa'

interface Product {
  id: string
  name: string
  description: string
  longDescription: string
  features: string[]
  status: 'live' | 'coming-soon'
  image: string
  logo: string
  icon: React.ComponentType<{ size?: number }>
  color: string
}

const products: Product[] = [
  {
    id: 'erp',
    name: 'ERP Solutions',
    description: 'Enterprise Resource Planning for streamlined business operations',
    longDescription: 'Comprehensive ERP solutions that integrate all your business processes into a unified system for improved efficiency and data-driven decision making.',
    features: ['Financial Management', 'Inventory Control', 'Supply Chain', 'Reporting & Analytics'],
    status: 'live',
    image: '/product-images/ERP.png',
    logo: '/product-logos/ERP.svg',
    icon: FaCog,
    color: 'blue.500'
  },
  {
    id: 'amigaa',
    name: 'Amigaa Platform',
    description: 'AI-powered automation and intelligent workflow management',
    longDescription: 'Advanced AI platform that revolutionizes business automation with intelligent agents, workflow optimization, and predictive analytics.',
    features: ['AI Automation', 'Workflow Management', 'Predictive Analytics', 'Smart Integrations'],
    status: 'live',
    image: '/product-images/Amigaa.png',
    logo: '/product-logos/Amigaa.svg',
    icon: FaRocket,
    color: 'purple.500'
  }
]

const ProductsShowcaseSection = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product>(products[0])

  return (
    <Box py={{ base: 16, md: 4 }} bg="background">
      <Container maxW="7xl">
        {/* Section Header */}
        <VStack gap={4} mb={{ base: 12, md: 16 }} textAlign="center">
          <Box>
            <Text
              fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
              fontWeight="bold"
              color="text"
              lineHeight="1.2"
            >
              Our Product
              <Text as="span" color="primary.500" ml={2}>
                Suite
              </Text>
            </Text>
          </Box>
          <Box>
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color="muted"
              maxW="2xl"
              lineHeight="1.6"
            >
              Explore our comprehensive range of digital solutions designed to transform 
              your business operations and drive growth.
            </Text>
          </Box>
        </VStack>

        {/* Main Content Grid */}
        <Grid
          templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
          gap={{ base: 6, md: 8, lg: 12 }}
          alignItems={{ base: "stretch", lg: "center" }}
        >
          {/* Left Side - Product Display */}
          <GridItem>
            <Box
              position="relative"
              bg="card"
              p={{ base: 6, md: 8 }}
              border="1px solid"
              borderColor="border"
              shadow="xl"
              overflow="hidden"
              borderRadius="xl"
              transition="all 0.3s ease"
              _hover={{
                shadow: "2xl",
                borderColor: "primary.200"
              }}
            >
              {/* Product Image */}
              <Box
                position="relative"
                h={{ base: "200px", md: "250px" }}
                mb={4}
                overflow="hidden"
                bg="gray.50"
                borderRadius="lg"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  w="auto"
                  h="auto"
                  maxW="90%"
                  maxH="90%"
                  objectFit="contain"
                  transition="all 0.5s ease"
                />
              </Box>

              {/* Product Details */}
              <VStack align="start" gap={3}>
                <HStack gap={3} align="center">
                  <Image
                    src={selectedProduct.logo}
                    alt={`${selectedProduct.name} logo`}
                    w="32px"
                    h="32px"
                    objectFit="contain"
                  />
                  <Text
                    fontSize={{ base: "lg", md: "xl" }}
                    fontWeight="bold"
                    color="text"
                  >
                    {selectedProduct.name}
                  </Text>
                </HStack>

                <Text
                  fontSize="sm"
                  color="muted"
                  lineHeight="1.5"
                  overflow="hidden"
                  display="-webkit-box"
                  css={{
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {selectedProduct.longDescription}
                </Text>

                {/* Features */}
                <Box>
                  <Text fontSize="xs" fontWeight="600" color="text" mb={1}>
                    Key Features:
                  </Text>
                  <HStack wrap="wrap" gap={1}>
                    {selectedProduct.features.slice(0, 3).map((feature, index) => (
                      <Badge key={index} variant="outline" fontSize="xs" px={2} py={1}>
                        {feature}
                      </Badge>
                    ))}
                  </HStack>
                </Box>
              </VStack>
            </Box>
          </GridItem>

          {/* Right Side - Product Grid */}
          <GridItem>
            <VStack gap={{ base: 4, md: 6 }} align="stretch">
              <Grid
                templateColumns="1fr"
                gap={{ base: 3, md: 4 }}
              >
                {products.map((product) => {
                  const isSelected = selectedProduct.id === product.id
                  const IconComponent = product.icon

                  return (
                    <Box
                      key={product.id}
                    >
                      <Box
                        p={6}
                        bg={isSelected ? "primary.50" : "card"}
                        border="2px solid"
                        borderColor={isSelected ? "primary.500" : "border"}
                        borderRadius="xl"
                        cursor="pointer"
                        onClick={() => setSelectedProduct(product)}
                        transition="all 0.3s ease"
                        _hover={{
                          borderColor: isSelected ? "primary.600" : "primary.300",
                          shadow: "lg",
                          bg: isSelected ? "primary.100" : "primary.25",
                          transform: "translateY(-2px)"
                        }}
                        position="relative"
                        overflow="hidden"
                      >
                        {/* Background Icon */}
                        <Box
                          position="absolute"
                          top={2}
                          right={2}
                          opacity={0.1}
                          color={product.color}
                        >
                          <IconComponent size={60} />
                        </Box>

                        <VStack align="start" gap={2} position="relative" zIndex={1}>
                          <Box h="40px" display="flex" alignItems="center">
                            <Image
                              src={product.logo}
                              alt={`${product.name} logo`}
                              w="36px"
                              h="36px"
                              objectFit="contain"
                            />
                          </Box>

                          <Text
                            fontSize="lg"
                            fontWeight="bold"
                            color={isSelected ? "primary.600" : "text"}
                            lineHeight="1.2"
                          >
                            {product.name}
                          </Text>

                          <Text
                            fontSize="sm"
                            color="muted"
                            lineHeight="1.5"
                            overflow="hidden"
                            display="-webkit-box"
                            css={{
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: "vertical",
                            }}
                          >
                            {product.description}
                          </Text>
                        </VStack>
                      </Box>
                    </Box>
                  )
                })}
              </Grid>
              
              {/* Explore More Products Button */}
              <Box>
                <RouterLink to="/products" style={{ textDecoration: 'none' }}>
                  <Button
                    size="lg"
                    colorScheme="primary"
                    borderRadius="full"
                    px={8}
                    py={6}
                    w="full"
                    fontWeight="600"
                    fontSize="md"
                    _hover={{
                      transform: "translateY(-2px)",
                      shadow: "lg",
                      bg: "primary.600"
                    }}
                    transition="all 0.3s ease"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    gap={2}
                  >
                    Explore More Products
                    <FaArrowRight />
                  </Button>
                </RouterLink>
              </Box>
            </VStack>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  )
}

export default ProductsShowcaseSection