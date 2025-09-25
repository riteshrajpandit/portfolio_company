import { 
  Box, 
  Container, 
  Text, 
  Button, 
  VStack, 
  Grid,
  Badge,
  Flex,
  GridItem
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { HiArrowRight, HiPlay } from 'react-icons/hi'
import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { portfolioImages } from '../../data/portfolioData'
import ProductModal from '../ui/ProductModal'

const stats = [
  { value: 100, suffix: "+", label: "Collective Experience" },
  { value: 3, suffix: "+", label: "Successful Projects" },
  { value: 3, suffix: "+", label: "Brands" },
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
      fontSize={{ base: "xl", md: "2xl" }}
      fontWeight="700"
      color="primary.500"
      lineHeight="1"
    >
      {count}{suffix}
    </Text>
  )
}

interface HeroSectionProps {
  onProjectClick?: (project: typeof portfolioImages[0]) => void
}

const HeroSection = ({ onProjectClick }: HeroSectionProps) => {
  const [activeGridItem, setActiveGridItem] = useState(0)
  const [selectedProduct, setSelectedProduct] = useState<typeof portfolioImages[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveGridItem((prev) => (prev + 1) % portfolioImages.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

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

  // Bento grid layout configuration
  const gridAreas = [
    { gridArea: "1 / 1 / 3 / 3" }, // Large top-left (2x2)
    { gridArea: "1 / 3 / 2 / 4" }, // Top-right
    { gridArea: "2 / 3 / 3 / 4" }, // Middle-right
    { gridArea: "3 / 1 / 4 / 2" }, // Bottom-left
    { gridArea: "3 / 2 / 4 / 4" }, // Bottom-right wide (1x2)
    { gridArea: "4 / 1 / 5 / 3" }  // Bottom wide (1x2)
  ]

  return (
    <Box position="relative" minHeight="100vh" overflow="hidden" pt={{ base: 16, md: 0 }}>
      {/* Background gradient */}
      <Box
        position="absolute"
        inset={0}
        bgGradient="linear(135deg, gray.50, white, gray.50)"
      />

      <Container maxW="7xl" position="relative" zIndex={2} px={{ base: 4, md: 6 }}>
        <Grid 
          templateColumns={{ base: "1fr", lg: "1fr 1fr" }} 
          minHeight="calc(100vh - 6rem)" 
          gap={{ base: 8, lg: 8 }} 
          alignItems="center"
        >
          {/* Left Half - Content */}
          <VStack align="start" gap={{ base: 2, md: 3 }} py={{ base: 8, lg: 20 }}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <Text
                fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
                fontWeight="700"
                lineHeight="1.15"
                color="text"
                mb={{ base: 2, md: 3 }}
              >
                Innovative{" "}
                <Text as="span" color="primary.500">
                  Digital
                </Text>{" "}
                Solutions That{" "}
                <Text 
                  as="span" 
                  bgGradient="to-r" gradientFrom="primary.600" gradientTo="primary.200"
                  bgClip="text"
                >
                  Transform
                </Text>
              </Text>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              <Text
                fontSize={{ base: "md", md: "lg", lg: "xl" }}
                color="muted"
                lineHeight="1.7"
                maxW={{ base: "full", lg: "500px" }}
                mb={{ base: 6, md: 7 }}
              >
                We craft exceptional digital experiences that drive growth and success. 
                From cutting-edge web applications to innovative mobile solutions, 
                we bring your vision to life with precision and creativity.
              </Text>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            >
              <Flex 
                direction={{ base: "column", sm: "row" }} 
                gap={4} 
                mb={{ base: 6, md: 8 }}
                width="full"
              >
                <Link to="/contact" style={{ textDecoration: 'none', width: '100%' }}>
                  <Button
                    size={{ base: "md", md: "lg" }}
                    bg="primary.500"
                    colorScheme="primary"
                    borderRadius="full"
                    px={{ base: 6, md: 8 }}
                    py={{ base: 4, md: 6 }}
                    fontSize={{ base: "md", md: "lg" }}
                    fontWeight="600"
                    shadow="lg"
                    width={{ base: "full", sm: "auto" }}
                    _hover={{
                      transform: "translateY(-2px)",
                      shadow: "xl"
                    }}
                    transition="all 0.3s ease"
                  >
                    Let's Meet <HiArrowRight style={{ marginLeft: '8px' }} />
                  </Button>
                </Link>
                
                <Link to="/products" style={{ textDecoration: 'none', width: '100%' }}>
                  <Button
                    size={{ base: "md", md: "lg" }}
                    variant="outline"
                    borderColor="primary.500"
                    color="primary.500"
                    borderRadius="full"
                    px={{ base: 6, md: 8 }}
                    py={{ base: 4, md: 6 }}
                    fontSize={{ base: "md", md: "lg" }}
                    fontWeight="600"
                    width={{ base: "full", sm: "auto" }}
                    _hover={{
                      bg: "primary.50",
                      transform: "translateY(-2px)"
                    }}
                    transition="all 0.3s ease"
                  >
                    View Our Products
                  </Button>
                </Link>
              </Flex>
            </motion.div>
          </VStack>

          {/* Right Half - Animated Bento Grid */}
          <Box 
            position="relative" 
            height={{ base: "60vh", md: "70vh", lg: "80vh" }} 
            py={{ base: 4, lg: 24 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              style={{ height: '100%' }}
            >
              {/* Desktop Bento Grid */}
              <Box display={{ base: "none", lg: "block" }} height="100%">
                <Grid
                  templateColumns="repeat(3, 1fr)"
                  templateRows="repeat(4, 1fr)"
                  gap={4}
                  height="100%"
                  position="relative"
                >
                  {portfolioImages.map((item, index) => (
                    <GridItem
                      key={index}
                      gridArea={gridAreas[index]?.gridArea}
                    >
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ 
                          opacity: 1, 
                          scale: activeGridItem === index ? 1.02 : 1,
                        }}
                        transition={{ 
                          duration: 0.6, 
                          delay: index * 0.1,
                          ease: "easeOut"
                        }}
                        style={{ height: '100%' }}
                      >
                        <Box
                          position="relative"
                          height="100%"
                          borderRadius="2xl"
                          overflow="hidden"
                          cursor="pointer"
                          transition="all 0.3s ease"
                          onClick={() => handleProductClick(item)}
                          _hover={{
                            transform: "translateY(-4px)",
                            shadow: "2xl"
                          }}
                        >
                          {/* Background Image */}
                          <Box
                            position="absolute"
                            inset={0}
                            backgroundImage={`url(${item.url})`}
                            backgroundSize="cover"
                            backgroundPosition="center"
                            filter={activeGridItem === index ? "brightness(1.1)" : "brightness(0.8)"}
                            transition="all 0.5s ease"
                          />
                          
                          {/* Gradient Overlay */}
                          <Box
                            position="absolute"
                            inset={0}
                            bgGradient={item.gradient}
                            opacity={activeGridItem === index ? 0.85 : 0.7}
                            mixBlendMode="multiply"
                            transition="all 0.5s ease"
                          />

                          {/* Content Overlay */}
                          <Flex
                            position="absolute"
                            inset={0}
                            p={6}
                            direction="column"
                            justify="flex-end"
                            align="start"
                            color="white"
                          >
                            <AnimatePresence>
                              {activeGridItem === index && (
                                <motion.div
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: 20 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <Badge
                                    bg="whiteAlpha.200"
                                    color="white"
                                    borderRadius="full"
                                    px={3}
                                    py={1}
                                    fontSize="xs"
                                    fontWeight="600"
                                    mb={2}
                                    backdropFilter="blur(10px)"
                                  >
                                    {item.category}
                                  </Badge>
                                </motion.div>
                              )}
                            </AnimatePresence>
                            
                            <Text
                              fontSize={index === 0 ? "xl" : "lg"}
                              fontWeight="700"
                              textShadow="2px 2px 4px rgba(0,0,0,0.5)"
                              opacity={activeGridItem === index ? 1 : 0.9}
                              transition="all 0.3s ease"
                            >
                              {item.title}
                            </Text>

                            {/* Play button for active item */}
                            <AnimatePresence>
                              {activeGridItem === index && index === 0 && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.5 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.5 }}
                                  transition={{ duration: 0.3, delay: 0.1 }}
                                >
                                  <Box
                                    position="absolute"
                                    top="50%"
                                    left="50%"
                                    transform="translate(-50%, -50%)"
                                    bg="whiteAlpha.200"
                                    borderRadius="full"
                                    p={4}
                                    backdropFilter="blur(10px)"
                                    cursor="pointer"
                                    _hover={{ bg: "whiteAlpha.300", transform: "translate(-50%, -50%) scale(1.1)" }}
                                    transition="all 0.3s ease"
                                  >
                                    <HiPlay size="24px" />
                                  </Box>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </Flex>
                        </Box>
                      </motion.div>
                    </GridItem>
                  ))}
                </Grid>
              </Box>

              {/* Mobile/Tablet Grid - Clean 2x2 Layout */}
              <Box display={{ base: "block", lg: "none" }} height="100%">
                <Grid
                  templateColumns="repeat(2, 1fr)"
                  templateRows="repeat(2, 1fr)"
                  gap={3}
                  height="100%"
                  position="relative"
                >
                  {portfolioImages.slice(0, 4).map((item, index) => (
                    <GridItem key={index}>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ 
                          opacity: 1, 
                          scale: activeGridItem === index ? 1.02 : 1,
                        }}
                        transition={{ 
                          duration: 0.6, 
                          delay: index * 0.1,
                          ease: "easeOut"
                        }}
                        style={{ height: '100%' }}
                      >
                        <Box
                          position="relative"
                          height="100%"
                          minHeight="150px"
                          borderRadius="xl"
                          overflow="hidden"
                          cursor="pointer"
                          transition="all 0.3s ease"
                          onClick={() => handleProductClick(item)}
                          _hover={{
                            transform: "translateY(-2px)",
                            shadow: "lg"
                          }}
                        >
                          {/* Background Image */}
                          <Box
                            position="absolute"
                            inset={0}
                            backgroundImage={`url(${item.url})`}
                            backgroundSize="cover"
                            backgroundPosition="center"
                            filter={activeGridItem === index ? "brightness(1.1)" : "brightness(0.8)"}
                            transition="all 0.5s ease"
                          />
                          
                          {/* Gradient Overlay */}
                          <Box
                            position="absolute"
                            inset={0}
                            bgGradient={item.gradient}
                            opacity={activeGridItem === index ? 0.85 : 0.7}
                            mixBlendMode="multiply"
                            transition="all 0.5s ease"
                          />

                          {/* Content Overlay */}
                          <Flex
                            position="absolute"
                            inset={0}
                            p={3}
                            direction="column"
                            justify="flex-end"
                            align="start"
                            color="white"
                          >
                            <AnimatePresence>
                              {activeGridItem === index && (
                                <motion.div
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: 10 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <Badge
                                    bg="whiteAlpha.200"
                                    color="white"
                                    borderRadius="full"
                                    px={2}
                                    py={1}
                                    fontSize="xs"
                                    fontWeight="600"
                                    mb={1}
                                    backdropFilter="blur(10px)"
                                  >
                                    {item.category}
                                  </Badge>
                                </motion.div>
                              )}
                            </AnimatePresence>
                            
                            <Text
                              fontSize="sm"
                              fontWeight="700"
                              textShadow="2px 2px 4px rgba(0,0,0,0.5)"
                              opacity={activeGridItem === index ? 1 : 0.9}
                              transition="all 0.3s ease"
                              overflow="hidden"
                              textOverflow="ellipsis"
                              whiteSpace="nowrap"
                            >
                              {item.title}
                            </Text>

                            {/* Play button for first item only */}
                            <AnimatePresence>
                              {activeGridItem === index && index === 0 && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.5 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.5 }}
                                  transition={{ duration: 0.3, delay: 0.1 }}
                                >
                                  <Box
                                    position="absolute"
                                    top="50%"
                                    left="50%"
                                    transform="translate(-50%, -50%)"
                                    bg="whiteAlpha.200"
                                    borderRadius="full"
                                    p={2}
                                    backdropFilter="blur(10px)"
                                    cursor="pointer"
                                    _hover={{ bg: "whiteAlpha.300", transform: "translate(-50%, -50%) scale(1.1)" }}
                                    transition="all 0.3s ease"
                                  >
                                    <HiPlay size="16px" />
                                  </Box>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </Flex>
                        </Box>
                      </motion.div>
                    </GridItem>
                  ))}
                </Grid>
              </Box>
            </motion.div>

            {/* Floating elements for extra visual appeal - Desktop only */}
            <Box display={{ base: "none", lg: "block" }}>
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  position: "absolute",
                  top: "10%",
                  right: "-5%",
                  zIndex: -1
                }}
              >
                <Box
                  width="120px"
                  height="120px"
                  bg="primary.100"
                  borderRadius="2xl"
                  opacity={0.6}
                />
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 30, 0],
                  rotate: [0, -10, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
                style={{
                  position: "absolute",
                  bottom: "20%",
                  left: "-8%",
                  zIndex: -1
                }}
              >
                <Box
                  width="80px"
                  height="80px"
                  bg="purple.100"
                  borderRadius="full"
                  opacity={0.4}
                />
              </motion.div>
            </Box>
          </Box>
        </Grid>

        {/* Stats Section - Centered below both boxes */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
        >
          <Box 
            py={{ base: 6, md: 8 }}
            borderTop="1px solid"
            borderColor="gray.200"
            mt={{ base: -4, md: -2 }}
          >
            {/* Title and Subtitle */}
            <VStack gap={2} mb={{ base: 6, md: 8 }} textAlign="center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1, ease: "easeOut" }}
              >
                <Text
                  fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
                  fontWeight="700"
                  color="text"
                  lineHeight="1.2"
                >
                  Our Impact in Numbers
                </Text>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
              >
                <Text
                  fontSize={{ base: "md", md: "lg" }}
                  color="muted"
                  maxW="500px"
                  mx="auto"
                  lineHeight="1.6"
                >
                  Quantifiable results that demonstrate our success
                </Text>
              </motion.div>
            </VStack>

            {/* Stats Grid */}
            <Grid 
              templateColumns={{ base: "repeat(3, 1fr)" }} 
              gap={{ base: 8, md: 16 }} 
              maxW="600px"
              mx="auto"
              textAlign="center"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.4 + index * 0.1, ease: "easeOut" }}
                >
                  <VStack gap={2}>
                    <AnimatedCounter 
                      value={stat.value} 
                      suffix={stat.suffix} 
                      duration={2.5 + index * 0.2}
                    />
                    <Text
                      fontSize={{ base: "sm", md: "md" }}
                      color="muted"
                      fontWeight="500"
                      textAlign="center"
                    >
                      {stat.label}
                    </Text>
                  </VStack>
                </motion.div>
              ))}
            </Grid>
          </Box>
        </motion.div>
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
