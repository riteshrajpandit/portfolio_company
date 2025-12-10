import { 
  Box, 
  Container, 
  Text, 
  Button, 
  VStack, 
  Heading,
  SimpleGrid,
  Image,
  Stack,
  Icon
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { HiArrowRight, HiPlay } from 'react-icons/hi2'
import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { portfolioImages } from '../../data/portfolioData'
import ProductModal from '../ui/ProductModal'

const stats = [
  { value: 100, suffix: "+", label: "Years of Collective Experience" },
  { value: 3, suffix: "+", label: "Concurrent Projects" },
  { value: 4, suffix: "", label: "Brands" },
]

// Animated Counter Component
const AnimatedCounter = ({ value, suffix = "", duration = 2 }: { value: number; suffix?: string; duration?: number }) => {
  const [count, setCount] = useState(0)
  const countRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(countRef, { once: true })

  useEffect(() => {
    if (isInView) {
      let startTime: number | null = null
      const startValue = 0
      const endValue = value

      const animate = (currentTime: number) => {
        if (startTime === null) startTime = currentTime
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / (duration * 1000), 1)
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        const currentCount = Math.floor(startValue + (endValue - startValue) * easeOutQuart)
        
        setCount(currentCount)
        
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      
      requestAnimationFrame(animate)
    }
  }, [isInView, value, duration])

  return (
    <Text
      ref={countRef}
      fontSize={{ base: "4xl", md: "5xl" }}
      fontWeight="800"
      color="primary.500"
      lineHeight="1"
      mb={2}
    >
      {count}{suffix}
    </Text>
  )
}

interface HeroSectionProps {
  onProjectClick?: (project: typeof portfolioImages[0]) => void
}

const HeroSection = ({ onProjectClick }: HeroSectionProps) => {
  const [selectedProduct, setSelectedProduct] = useState<typeof portfolioImages[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate()

  const handleProductClick = (product: typeof portfolioImages[0]) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
    // Call the optional prop if provided for backward compatibility
    onProjectClick?.(product)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  return (
    <Box position="relative" minHeight="100vh" overflow="hidden" pt={{ base: 24, md: 32 }} pb={{ base: 12, md: 20 }}>
      {/* Background gradient */}
      <Box
        position="absolute"
        inset={0}
        bgGradient="linear(135deg, gray.50, white, gray.50)"
        zIndex={0}
      />

      <Container maxW="7xl" position="relative" zIndex={1} px={{ base: 4, md: 6 }}>
        
        {/* 1. Hero Header Section */}
        <VStack gap={8} textAlign="center" mb={{ base: 16, md: 20 }} maxW="4xl" mx="auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Heading
              as="h1"
              fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
              fontWeight="800"
              lineHeight="1.2"
              color="text"
              mb={6}
            >
              Innovative Digital <Text as="span" color="primary.500">Solutions</Text> That Transform
            </Heading>
            
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color="muted"
              maxW="2xl"
              mx="auto"
              mb={8}
              lineHeight="1.6"
            >
              We craft exceptional digital experiences that drive growth and success. From cutting-edge web applications to innovative mobile solutions, we bring your vision to life with precision and creativity.
            </Text>

            <Stack 
              direction={{ base: "column", sm: "row" }} 
              gap={4} 
              justify="center"
              align="center"
            >
              <Button
              onClick={() => navigate('/contact')}
                size="lg"
                colorScheme="primary"
                px={8}
                h={14}
                fontSize="md"
              >
                Let's Meet <Icon as={HiArrowRight} ml={2} />
              </Button>
              <Button
                onClick={() => navigate('/products')}
                size="lg"
                variant="outline"
                px={8}
                h={14}
                fontSize="md"
                bg="white"
              >
                View Our Products <Icon as={HiPlay} ml={2} />
              </Button>
            </Stack>
          </motion.div>
        </VStack>

        {/* 2. Products Grid Section (3 items) */}
        {/* Reduced mb from { base: 20, md: 32 } to { base: 14, md: 26 } to reduce gap by ~24px */}
        <VStack gap={{ base: 8, md: 10 }} mb={{ base: 14, md: 16 }}>
          <SimpleGrid 
            columns={{ base: 1, md: 2, lg: 3 }} 
            gap={{ base: 6, md: 6, lg: 8 }} 
            w="full"
            maxW="7xl"
            mx="auto"
          >
            {portfolioImages.slice(0, 3).map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                style={{ height: '100%' }}
              >
                <Box
                  bg="rgba(255, 255, 255, 0.65)"
                  backdropFilter="blur(24px)"
                  borderRadius="2xl"
                  overflow="hidden"
                  boxShadow="0 4px 20px rgba(0, 0, 0, 0.06)"
                  border="1px solid rgba(255, 255, 255, 0.5)"
                  cursor="pointer"
                  onClick={() => handleProductClick(product)}
                  _hover={{ 
                    transform: "translateY(-6px)", 
                    boxShadow: "0 16px 40px rgba(0, 0, 0, 0.12)",
                    borderColor: "rgba(255, 255, 255, 0.8)"
                  }}
                  transition="all 0.35s cubic-bezier(0.4, 0, 0.2, 1)"
                  position="relative"
                  role="group"
                  display="flex"
                  flexDirection={{ base: 'column', md: 'row' }}
                  alignItems="stretch"
                  h={{ base: "auto", md: "200px", lg: "220px" }}
                >
                  {/* Content Side (Left) */}
                  <Box 
                    flex="1"
                    p={{ base: 5, md: 6 }} 
                    display="flex" 
                    flexDirection="column" 
                    justifyContent="center"
                    position="relative"
                    zIndex={1}
                    pr={{ md: 2 }}
                  >
                    {/* Category Badge - Top */}
                    <Text 
                      fontSize="xs" 
                      fontWeight="700" 
                      color="primary.600"
                      textTransform="uppercase"
                      letterSpacing="wider"
                      mb={2}
                    >
                      {product.category}
                    </Text>

                    <Heading 
                      size="md" 
                      mb={2} 
                      color="gray.900" 
                      lineHeight="1.3"
                      fontWeight="700"
                      lineClamp={2}
                    >
                      {product.title}
                    </Heading>
                    
                    <Text 
                      color="gray.700" 
                      fontSize="xs" 
                      lineHeight="1.6"
                      lineClamp={3}
                    >
                      {product.description}
                    </Text>
                  </Box>

                  {/* Image Side (Right) - Boxed */}
                  <Box 
                    w={{ base: "100%", md: "45%" }}
                    h={{ base: "200px", md: "auto" }}
                    position="relative" 
                    overflow="hidden"
                    bg="gray.100"
                    borderRadius="xl"
                    m={{ base: 2, md: 3 }}
                    mt={{ base: 0, md: 3 }}
                    flexShrink={0}
                  >
                    <Image 
                      src={product.url} 
                      alt={product.title} 
                      w="full" 
                      h="full" 
                      objectFit="cover" 
                      transition="all 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
                      _groupHover={{ transform: "scale(1.08)" }}
                    />
                    
                    {/* Hover Overlay with Blue Circle Button */}
                    <Box
                      position="absolute"
                      inset={0}
                      bg="rgba(0, 0, 0, 0.35)"
                      opacity={0}
                      _groupHover={{ opacity: 1 }}
                      transition="opacity 0.35s ease"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      backdropFilter="blur(1px)"
                    >
                      <Box
                        bg="primary.500"
                        color="white"
                        w="60px"
                        h="60px"
                        borderRadius="full"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        boxShadow="0 8px 24px rgba(0, 0, 0, 0.25)"
                        transform="scale(0.7) translateY(10px)"
                        opacity={0}
                        _groupHover={{ 
                          transform: "scale(1) translateY(0)", 
                          opacity: 1 
                        }}
                        transition="all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
                      >
                        <Icon as={HiArrowRight} boxSize={7} />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </motion.div>
            ))}
          </SimpleGrid>
        </VStack>

        {/* 3. Stats Section */}
        <Box>
            <SimpleGrid 
              columns={{ base: 1, sm: 3 }} 
              gap={{ base: 12, md: 16 }} 
              w="full" 
              maxW="5xl"
              mx="auto"
              textAlign="center"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <VStack gap={2}>
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    <Text 
                      fontSize={{ base: "sm", md: "xl" }} 
                      fontWeight="500" 
                      color="gray.600"
                    >
                      {stat.label}
                    </Text>
                  </VStack>
                </motion.div>
              ))}
            </SimpleGrid>
        </Box>

      </Container>

      {/* Product Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={closeModal}
        product={selectedProduct}
      />
    </Box>
  )
}

export default HeroSection