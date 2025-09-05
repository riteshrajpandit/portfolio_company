import {
  Button,
  VStack,
  HStack,
  Text,
  Badge,
  Grid,
  Box,
  Flex,
  Image,
  Icon,
  Portal,
  IconButton
} from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiArrowRight, HiCheckCircle, HiClock, HiExternalLink, HiX } from 'react-icons/hi'
import { Link, useNavigate } from 'react-router-dom'
import { portfolioImages } from '../../data/portfolioData'
import { useEffect } from 'react'

interface ProductModalProps {
  isOpen: boolean
  onClose: () => void
  product: typeof portfolioImages[0] | null
}

const MotionBox = motion(Box)

const ProductModal = ({ isOpen, onClose, product }: ProductModalProps) => {
  const navigate = useNavigate()

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'auto'
    }
  }, [isOpen, onClose])

  if (!product) return null

  const handleViewProduct = () => {
    if (product.status === 'Live' && product.link && product.link !== '#') {
      navigate(product.link)
      onClose()
    }
  }

  const isComingSoon = product.status === 'Coming Soon'

  return (
    <Portal>
      <AnimatePresence>
        {isOpen && (
          <Box
            position="fixed"
            top={0}
            left={0}
            right={0}
            bottom={0}
            zIndex={9999}
            display="flex"
            alignItems="center"
            justifyContent="center"
            p={4}
          >
            {/* Backdrop */}
            <MotionBox
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              bg="blackAlpha.600"
              backdropFilter="blur(10px)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />

            {/* Modal Content */}
            <MotionBox
              position="relative"
              zIndex={1}
              w="full"
              maxW={{ base: "95vw", sm: "90vw", md: "4xl" }}
              maxH={{ base: "85vh", md: "90vh" }}
              overflow="hidden"
              bg="white"
              borderRadius="2xl"
              border="1px solid"
              borderColor="gray.100"
              shadow="2xl"
              mx="auto"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {/* Close Button */}
              <IconButton
                aria-label="Close modal"
                position="absolute"
                top={4}
                right={4}
                zIndex={2}
                color="white"
                bg="blackAlpha.500"
                borderRadius="full"
                size="sm"
                _hover={{ bg: "blackAlpha.700" }}
                onClick={onClose}
              >
                <HiX />
              </IconButton>

              {/* Scrollable Content */}
              <Box maxH="90vh" overflowY="auto">
                {/* Hero Image Section */}
                <Box position="relative" height="250px" overflow="hidden">
                  <Image
                    src={product.url}
                    alt={product.title}
                    w="full"
                    h="full"
                    objectFit="cover"
                    filter="brightness(0.7)"
                  />
                  <Box
                    position="absolute"
                    inset={0}
                    bgGradient={product.gradient}
                    opacity={0.8}
                    mixBlendMode="multiply"
                  />
                  
                  {/* Header Content Overlay */}
                  <VStack
                    position="absolute"
                    inset={0}
                    justify="center"
                    align="center"
                    color="white"
                    textAlign="center"
                    px={8}
                  >
                    <Badge
                      colorScheme={isComingSoon ? "orange" : "green"}
                      variant="solid"
                      px={3}
                      py={1}
                      borderRadius="full"
                      fontSize="sm"
                      fontWeight="600"
                      mb={2}
                    >
                      {isComingSoon ? (
                        <HStack gap={1}>
                          <HiClock size={14} />
                          <Text>Coming Soon</Text>
                        </HStack>
                      ) : (
                        <HStack gap={1}>
                          <HiCheckCircle size={14} />
                          <Text>Live Product</Text>
                        </HStack>
                      )}
                    </Badge>
                    
                    <Text
                      fontSize={{ base: "2xl", md: "3xl" }}
                      fontWeight="700"
                      textShadow="2px 2px 4px rgba(0,0,0,0.5)"
                      mb={2}
                    >
                      {product.title}
                    </Text>
                    
                    <Text
                      fontSize={{ base: "md", md: "lg" }}
                      fontWeight="500"
                      opacity={0.9}
                      textShadow="1px 1px 2px rgba(0,0,0,0.5)"
                    >
                      {product.category}
                    </Text>
                  </VStack>
                </Box>

                {/* Body Content */}
                <VStack gap={6} p={8} align="stretch">
                  {/* Description */}
                  <Box>
                    <Text
                      fontSize={{ base: "md", md: "lg" }}
                      color="muted"
                      lineHeight="1.7"
                      textAlign="center"
                    >
                      {product.description}
                    </Text>
                  </Box>

                  {/* Metrics */}
                  <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                    {Object.entries(product.metrics).map(([key, value]) => (
                      <MotionBox
                        key={key}
                        bg="gray.50"
                        p={4}
                        borderRadius="xl"
                        textAlign="center"
                        whileHover={{ y: -2 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Text
                          fontSize={{ base: "lg", md: "2xl" }}
                          fontWeight="700"
                          color="primary.500"
                          mb={1}
                        >
                          {value}
                        </Text>
                        <Text
                          fontSize="sm"
                          color="muted"
                          fontWeight="500"
                          textTransform="capitalize"
                        >
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </Text>
                      </MotionBox>
                    ))}
                  </Grid>

                  {/* Divider */}
                  <Box height="1px" bg="gray.200" />

                  {/* Features */}
                  <Box>
                    <Text fontSize="xl" fontWeight="600" color="text" mb={4}>
                      Key Features
                    </Text>
                    <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={3}>
                      {product.features.map((feature, index) => (
                        <MotionBox
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <HStack gap={3} align="start">
                            <Icon
                              as={HiCheckCircle}
                              color="primary.500"
                              mt={0.5}
                              flexShrink={0}
                            />
                            <Text
                              fontSize="sm"
                              color="text"
                              lineHeight="1.5"
                            >
                              {feature}
                            </Text>
                          </HStack>
                        </MotionBox>
                      ))}
                    </Grid>
                  </Box>

                  {/* Divider */}
                  <Box height="1px" bg="gray.200" />

                  {/* Technologies */}
                  <Box>
                    <Text fontSize="xl" fontWeight="600" color="text" mb={4}>
                      Technologies Used
                    </Text>
                    <Flex wrap="wrap" gap={2}>
                      {product.technologies.map((tech, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          colorScheme="primary"
                          px={3}
                          py={1}
                          borderRadius="full"
                          fontSize="xs"
                          fontWeight="500"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </Flex>
                  </Box>

                  {/* Footer Actions */}
                  <HStack gap={4} pt={4} justify="center" wrap="wrap">
                    {isComingSoon ? (
                      <>
                        <Button
                          variant="outline"
                          borderColor="gray.300"
                          color="muted"
                          borderRadius="full"
                          px={6}
                          py={4}
                          fontSize="md"
                          fontWeight="600"
                          cursor="not-allowed"
                          opacity={0.6}
                          size={{ base: "md", md: "lg" }}
                        >
                          <HiClock style={{ marginRight: '8px' }} />
                          Coming Soon
                        </Button>
                        <Link to="/contact" style={{ textDecoration: 'none' }}>
                          <Button
                            colorScheme="primary"
                            borderRadius="full"
                            px={6}
                            py={4}
                            fontSize="md"
                            fontWeight="600"
                            _hover={{
                              transform: "translateY(-2px)",
                              shadow: "lg"
                            }}
                            transition="all 0.3s ease"
                            onClick={onClose}
                            size={{ base: "md", md: "lg" }}
                          >
                            Get Notified
                            <HiArrowRight style={{ marginLeft: '8px' }} />
                          </Button>
                        </Link>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="outline"
                          borderColor="primary.500"
                          color="primary.500"
                          borderRadius="full"
                          px={6}
                          py={4}
                          fontSize="md"
                          fontWeight="600"
                          onClick={onClose}
                          _hover={{
                            bg: "primary.50"
                          }}
                          transition="all 0.3s ease"
                          size={{ base: "md", md: "lg" }}
                        >
                          Close
                        </Button>
                        <Button
                          colorScheme="primary"
                          borderRadius="full"
                          px={6}
                          py={4}
                          fontSize="md"
                          fontWeight="600"
                          onClick={handleViewProduct}
                          _hover={{
                            transform: "translateY(-2px)",
                            shadow: "lg"
                          }}
                          transition="all 0.3s ease"
                          size={{ base: "md", md: "lg" }}
                        >
                          View Product
                          <HiExternalLink style={{ marginLeft: '8px' }} />
                        </Button>
                      </>
                    )}
                  </HStack>
                </VStack>
              </Box>
            </MotionBox>
          </Box>
        )}
      </AnimatePresence>
    </Portal>
  )
}

export default ProductModal
