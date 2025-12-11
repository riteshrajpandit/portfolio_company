import { Link as RouterLink } from 'react-router-dom'
import {
  Container,
  Text,
  VStack,
  HStack,
  Box,
  Grid,
  GridItem,
  Button,
  Badge,
  Icon,
} from '@chakra-ui/react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaArrowRight, FaRocket, FaCog, FaExternalLinkAlt } from 'react-icons/fa'
import { HiPlus, HiMinus } from 'react-icons/hi'

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
  externalUrl: string
}

const products: Product[] = [
  {
    id: 'erp',
    name: 'ERP Solutions',
    description: 'Enterprise Resource Planning for streamlined business operations.',
    longDescription: 'Comprehensive ERP solutions that integrate all your business processes into a unified system for improved efficiency.',
    features: ['Financial Management', 'Inventory Control', 'Supply Chain', 'Reporting'],
    status: 'live',
    image: '/product-images/ERP.png',
    logo: '/product-logos/ERP.svg',
    icon: FaCog,
    color: 'blue.500',
    externalUrl: 'https://oneerp.us'
  },
  {
    id: 'amigaa',
    name: 'Amigaa Platform',
    description: 'AI-powered automation and intelligent workflow management.',
    longDescription: 'Advanced AI platform that revolutionizes business automation with intelligent agents and predictive analytics.',
    features: ['AI Automation', 'Workflow Management', 'Predictive Analytics', 'Smart Integrations'],
    status: 'live',
    image: '/product-images/Amigaa.png',
    logo: '/product-logos/Amigaa.svg',
    icon: FaRocket,
    color: 'purple.500',
    externalUrl: 'https://agent.amigaa.com'
  }
]

const ProductCard = ({ product }: { product: Product }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Box
      position="relative"
      borderRadius="2xl"
      overflow="hidden"
      cursor="pointer"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      h={{ base: "450px", md: "500px" }}
      bgImage={`url(${product.image})`}
      bgSize="contain"
      backgroundPosition="top center"
      transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: "2xl"
      }}
      role="group"
      border="1px solid"
      borderColor="gray.100"
    >
      {/* Dark gradient overlay - Always present at bottom for text readability */}
      <Box
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        h="60%"
        bgGradient="linear(to-t, rgba(10,10,10,0.95) 10%, rgba(10,10,10,0.6) 50%, transparent 100%)"
        backdropFilter="blur(20px)"
        style={{
          maskImage: "linear-gradient(to top, black 30%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to top, black 30%, transparent 100%)"
        }}
        transition="opacity 0.4s ease"
        opacity={isOpen ? 0 : 1}
        zIndex={1}
      />

      {/* Full Overlay on Hover - Gradient Blur */}
      <Box
        position="absolute"
        inset={0}
        bg="rgba(255, 255, 255, 0.85)"
        backdropFilter="blur(80px)"
        style={{
          maskImage: "linear-gradient(to top, black 60%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to top, black 60%, transparent 100%)"
        }}
        opacity={isOpen ? 1 : 0}
        transition="all 0.4s ease"
        zIndex={2}
      />

      {/* Floating Icon Button */}
      <Box
        position="absolute"
        bottom={6}
        right={6}
        zIndex={4}
      >
        <Box
          bg={isOpen ? "primary.500" : "white"}
          color={isOpen ? "white" : "primary.500"}
          w="56px"
          h="56px"
          borderRadius="full"
          display="flex"
          alignItems="center"
          justifyContent="center"
          boxShadow="xl"
          transition="all 0.3s ease"
        >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="minus"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon as={HiMinus} boxSize={6} />
                </motion.div>
              ) : (
                <motion.div
                  key="plus"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon as={HiPlus} boxSize={6} />
                </motion.div>
              )}
            </AnimatePresence>
        </Box>
      </Box>

      {/* Content Container */}
      <Box
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        p={{ base: 6, md: 8 }}
        pr={{ base: 6, md: 24 }} // Space for icon
        zIndex={3}
        display="flex"
        flexDirection="column"
        justifyContent="flex-end"
      >
        <VStack align="start" gap={2}>
          <Text
            fontSize={{ base: "2xl", md: "3xl" }}
            fontWeight="bold"
            color="primary.500"
            lineHeight="1.2"
            transform={isOpen ? "translateY(0)" : "translateY(0)"}
            transition="transform 0.4s ease"
          >
            {product.name}
          </Text>

          <AnimatePresence mode="wait">
            {!isOpen && (
               <motion.div
                 key="short-desc"
                 initial={{ opacity: 1, height: 'auto' }}
                 exit={{ opacity: 0, height: 0 }}
                 transition={{ duration: 0.3 }}
               >
                  <Text
                    fontSize="md"
                    color="gray.700"
                    lineHeight="1.6"
                    lineClamp={2}
                  >
                    {product.description}
                  </Text>
               </motion.div>
            )}
          
            {isOpen && (
              <motion.div
                key="full-content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{ overflow: "hidden", width: '100%' }}
              >
                <Box pt={2}>
                  <Text
                    fontSize="md"
                    color="gray.700"
                    lineHeight="1.6"
                    lineClamp={2}
                    mb = {2}
                  >
                    {product.description}
                  </Text>
                    <Text
                      fontSize="sm"
                      color="gray.800"
                      lineHeight="1.7"
                      mb={6}
                    >
                      {product.longDescription}
                    </Text>

                    <VStack align="start" gap={3} mb={6}>
                      <Text fontSize="xs" fontWeight="700" textTransform="uppercase" letterSpacing="wider" color="primary.600">
                        Key Features
                      </Text>
                      <HStack wrap="wrap" gap={2}>
                        {product.features.map((feature, index) => (
                          <Badge
                            key={index}
                            bg="whiteAlpha.600"
                            color="gray.800"
                            fontSize="xs"
                            px={3}
                            py={1.5}
                            borderRadius="full"
                            textTransform="none"
                            fontWeight="600"
                            border="1px solid"
                            borderColor="gray.300"
                            boxShadow="sm"
                          >
                            {feature}
                          </Badge>
                        ))}
                      </HStack>
                    </VStack>

                    <Text
                      as="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(product.externalUrl, '_blank');
                      }}
                      fontSize="sm"
                      fontWeight="700"
                      color="primary.600"
                      textDecoration="underline"
                      textUnderlineOffset="4px"
                      display="inline-flex"
                      alignItems="center"
                      transition="color 0.2s"
                      _hover={{
                        color: "primary.800"
                      }}
                    >
                      Visit Website <Icon as={FaExternalLinkAlt} ml={2} boxSize={3} />
                    </Text>
                </Box>
              </motion.div>
            )}
          </AnimatePresence>
        </VStack>
      </Box>
    </Box>
  )
}

const ProductsShowcaseSection = () => {
  return (
    <Box py={{ base: 16, md: 20 }} bg="#F2F9FF" position="relative" overflow="hidden">
      <Container maxW="7xl">
        {/* Section Header */}
        <VStack gap={4} mb={{ base: 12, md: 16 }} textAlign="center">
          <Box>
            <Text
              fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
              fontWeight="800"
              color="gray.900"
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
              color="gray.600"
              maxW="2xl"
              lineHeight="1.6"
            >
              Explore our comprehensive range of digital solutions designed to transform 
              your business operations and drive growth.
            </Text>
          </Box>
        </VStack>

        {/* Products Grid */}
        <Grid
          templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
          gap={{ base: 6, md: 8 }}
          mb={{ base: 8, md: 12 }}
        >
          {products.map((product) => (
            <GridItem key={product.id}>
              <ProductCard product={product} />
            </GridItem>
          ))}
        </Grid>

        {/* Explore More Products Button */}
        <Box textAlign="center">
          <RouterLink to="/products" style={{ textDecoration: 'none' }}>
            <Button
              size="lg"
              variant="outline"
              borderColor="primary.500"
              color="primary.600"
              bg="white"
              borderRadius="full"
              px={8}
              py={6}
              fontWeight="600"
              fontSize="md"
              _hover={{
                bg: "primary.500",
                color: "white",
                transform: "translateY(-2px)",
                boxShadow: "lg"
              }}
              transition="all 0.3s ease"
            >
              Explore More Products <Icon as={FaArrowRight} ml={2} />
            </Button>
          </RouterLink>
        </Box>
      </Container>
    </Box>
  )
}

export default ProductsShowcaseSection