import {
  Box,
  Container,
  Text,
  Button,
  VStack,
  HStack,
  Flex,
  Grid,
  GridItem,
} from "@chakra-ui/react"
import { Link, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { HiArrowLeft, HiHome, HiStar, HiSparkles } from "react-icons/hi"
import { useState, useEffect } from "react"

const MotionBox = motion(Box)
const MotionFlex = motion(Flex)

const NotFoundPage = () => {
  const navigate = useNavigate()
  const [showSparkles, setShowSparkles] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowSparkles(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleGoBack = () => {
    navigate(-1)
  }

  const sparkleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.5 }
    },
    exit: { scale: 0, opacity: 0 }
  }

  return (
    <Box 
      minH="100vh" 
      bgGradient="linear(135deg, purple.50, blue.50, pink.50)"
      position="relative"
      overflow="hidden"
      display="flex" 
      alignItems="center"
    >
      {/* Animated Background Elements */}
      <Box position="absolute" inset={0} zIndex={0}>
        {/* Floating Shapes */}
        <MotionBox
          position="absolute"
          top="10%"
          left="10%"
          w="100px"
          h="100px"
          bg="purple.200"
          borderRadius="3xl"
          opacity={0.4}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <MotionBox
          position="absolute"
          top="20%"
          right="15%"
          w="60px"
          h="60px"
          bg="blue.200"
          borderRadius="full"
          opacity={0.3}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <MotionBox
          position="absolute"
          bottom="15%"
          left="20%"
          w="80px"
          h="80px"
          bg="pink.200"
          borderRadius="2xl"
          opacity={0.4}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <MotionBox
          position="absolute"
          bottom="25%"
          right="10%"
          w="120px"
          h="40px"
          bg="indigo.200"
          borderRadius="full"
          opacity={0.3}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />

        {/* Sparkles */}
        <AnimatePresence>
          {showSparkles && (
            <>
              <MotionBox
                position="absolute"
                top="30%"
                left="25%"
                color="yellow.400"
                fontSize="2xl"
                variants={sparkleVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                ✨
              </MotionBox>
              <MotionBox
                position="absolute"
                top="60%"
                right="30%"
                color="yellow.400"
                fontSize="xl"
                variants={sparkleVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ delay: 0.3 }}
              >
                ⭐
              </MotionBox>
              <MotionBox
                position="absolute"
                bottom="40%"
                left="15%"
                color="yellow.400"
                fontSize="lg"
                variants={sparkleVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ delay: 0.6 }}
              >
                ✨
              </MotionBox>
            </>
          )}
        </AnimatePresence>
      </Box>

      <Container maxW="6xl" position="relative" zIndex={1}>
        <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={12} alignItems="center">
          {/* Left Side - 404 Art */}
          <GridItem>
            <MotionFlex
              direction="column"
              align="center"
              justify="center"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Large 404 with Gradient */}
              <MotionBox
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.2, type: "spring", bounce: 0.4 }}
                textAlign="center"
                mb={8}
              >
                <Text
                  fontSize={{ base: "8xl", md: "12xl", lg: "14xl" }}
                  fontWeight="900"
                  bgGradient="linear(45deg, primary.500, purple.500, pink.500)"
                  bgClip="text"
                  lineHeight="0.8"
                  mb={4}
                  letterSpacing="-0.05em"
                >
                  404
                </Text>
                
                {/* Animated Underline */}
                <MotionBox
                  w="60%"
                  h="4px"
                  mx="auto"
                  bgGradient="linear(90deg, primary.500, purple.500)"
                  borderRadius="full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
              </MotionBox>

              {/* Animated Robot/Character */}
              <MotionBox
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                bg="white"
                p={8}
                borderRadius="3xl"
                shadow="2xl"
                border="3px solid"
                borderColor="primary.100"
                position="relative"
                _before={{
                  content: '""',
                  position: "absolute",
                  top: "-3px",
                  left: "-3px",
                  right: "-3px",
                  bottom: "-3px",
                  borderRadius: "3xl",
                  background: "linear-gradient(45deg, #667eea, #764ba2, #f093fb)",
                  zIndex: -1,
                }}
              >
                <VStack gap={4}>
                  <MotionBox
                    fontSize="6xl"
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    🤖
                  </MotionBox>
                  <Box textAlign="center">
                    <Text fontSize="lg" fontWeight="600" color="gray.700" mb={2}>
                      Beep Boop!
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      I'm searching the entire universe...
                    </Text>
                  </Box>
                </VStack>
              </MotionBox>
            </MotionFlex>
          </GridItem>

          {/* Right Side - Content */}
          <GridItem>
            <MotionBox
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <VStack align="start" gap={8} textAlign={{ base: "center", lg: "left" }}>
                {/* Main Heading */}
                <MotionBox
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <Text
                    fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                    fontWeight="800"
                    color="gray.800"
                    lineHeight="1.2"
                    mb={4}
                  >
                    Oops! Lost in
                    <Text as="span" color="primary.500" ml={2}>
                      Cyberspace
                    </Text>
                  </Text>
                  <Text
                    fontSize={{ base: "lg", md: "xl" }}
                    color="gray.600"
                    lineHeight="1.6"
                    maxW="lg"
                  >
                    The page you're looking for seems to have vanished into the digital void. 
                    But don't worry, we'll help you find your way back to the light!
                  </Text>
                </MotionBox>

                {/* Action Buttons */}
                <MotionBox
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  w="full"
                >
                  <VStack gap={4} align={{ base: "center", lg: "start" }}>
                    <HStack gap={4} wrap="wrap" justify={{ base: "center", lg: "start" }}>
                      <Link to="/" style={{ textDecoration: 'none' }}>
                        <Button
                          size="lg"
                          bg="primary.500"
                          color="white"
                          borderRadius="full"
                          px={8}
                          py={6}
                          fontSize="md"
                          fontWeight="600"
                          shadow="lg"
                          _hover={{ 
                            bg: "primary.600",
                            transform: "translateY(-3px)",
                            shadow: "xl"
                          }}
                          _active={{ transform: "translateY(-1px)" }}
                          transition="all 0.3s ease"
                        >
                          <HiHome style={{ marginRight: '8px' }} />
                          Take Me Home
                        </Button>
                      </Link>
                      
                      <Button
                        size="lg"
                        variant="outline"
                        borderColor="primary.500"
                        color="primary.500"
                        borderWidth="2px"
                        borderRadius="full"
                        px={8}
                        py={6}
                        fontSize="md"
                        fontWeight="600"
                        onClick={handleGoBack}
                        _hover={{ 
                          bg: "primary.50",
                          transform: "translateY(-3px)",
                          borderColor: "primary.600",
                          color: "primary.600"
                        }}
                        _active={{ transform: "translateY(-1px)" }}
                        transition="all 0.3s ease"
                      >
                        <HiArrowLeft style={{ marginRight: '8px' }} />
                        Go Back
                      </Button>
                    </HStack>

                    {/* Quick Links */}
                    <MotionBox
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.9 }}
                      mt={6}
                    >
                      <Text fontSize="sm" color="gray.500" mb={3} fontWeight="500">
                        Or explore these popular destinations:
                      </Text>
                      <Flex gap={4} wrap="wrap" justify={{ base: "center", lg: "start" }}>
                        {[
                          { name: "About Us", path: "/about" },
                          { name: "Products", path: "/products" },
                          { name: "Services", path: "/services" },
                          { name: "Contact", path: "/contact" }
                        ].map((link, index) => (
                          <MotionBox
                            key={link.name}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Link to={link.path} style={{ textDecoration: 'none' }}>
                              <Box
                                px={4}
                                py={2}
                                bg="white"
                                border="1px solid"
                                borderColor="gray.200"
                                borderRadius="full"
                                shadow="sm"
                                _hover={{ 
                                  shadow: "md",
                                  borderColor: "primary.300",
                                  bg: "primary.50"
                                }}
                                transition="all 0.2s ease"
                              >
                                <Text
                                  fontSize="sm"
                                  fontWeight="500"
                                  color="gray.700"
                                  _groupHover={{ color: "primary.600" }}
                                >
                                  {link.name}
                                </Text>
                              </Box>
                            </Link>
                          </MotionBox>
                        ))}
                      </Flex>
                    </MotionBox>
                  </VStack>
                </MotionBox>

                {/* Help Section */}
                <MotionBox
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.1 }}
                  bg="white"
                  p={6}
                  borderRadius="2xl"
                  border="1px solid"
                  borderColor="gray.200"
                  shadow="sm"
                  w="full"
                  maxW="md"
                >
                  <Flex align="center" gap={3} mb={3}>
                    <Box p={2} bg="primary.100" borderRadius="lg" color="primary.600">
                      <HiSparkles size="20px" />
                    </Box>
                    <Text fontSize="md" fontWeight="600" color="gray.800">
                      Still need help?
                    </Text>
                  </Flex>
                  <Text fontSize="sm" color="gray.600" mb={4} lineHeight="1.5">
                    Our support team is here to help you navigate back to where you need to be.
                  </Text>
                  <Link to="/contact" style={{ textDecoration: 'none' }}>
                    <Button
                      size="sm"
                      variant="ghost"
                      color="primary.600"
                      fontWeight="600"
                      _hover={{ bg: "primary.50" }}
                    >
                      <HiStar style={{ marginRight: '8px' }} />
                      Contact Support
                    </Button>
                  </Link>
                </MotionBox>
              </VStack>
            </MotionBox>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  )
}

export default NotFoundPage
