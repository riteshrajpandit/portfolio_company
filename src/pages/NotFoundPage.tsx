import {
  Box,
  Container,
  Text,
  Button,
  VStack,
  HStack,
} from "@chakra-ui/react"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { HiArrowLeft, HiHome } from "react-icons/hi"

const MotionBox = motion(Box)

const NotFoundPage = () => {
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <Box minH="100vh" bg="neutral.50" display="flex" alignItems="center">
      <Container maxW="5xl">
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          textAlign="center"
        >
          <VStack gap={8}>
            {/* 404 Illustration */}
            <MotionBox
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Text
                fontSize={{ base: "8xl", md: "12xl" }}
                fontWeight="900"
                color="primary.500"
                lineHeight="1"
                mb={4}
              >
                404
              </Text>
            </MotionBox>

            {/* Error Message */}
            <VStack gap={4} maxW="2xl">
              <Text
                fontSize={{ base: "2xl", md: "3xl" }}
                fontWeight="700"
                color="text"
              >
                Oops! Page Not Found
              </Text>
              <Text
                fontSize={{ base: "lg", md: "xl" }}
                color="muted"
                lineHeight="1.7"
              >
                The page you're looking for doesn't exist or has been moved. 
                Don't worry, it happens to the best of us!
              </Text>
            </VStack>

            {/* Illustration/Icon */}
            <MotionBox
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              p={8}
              bg="white"
              borderRadius="2xl"
              shadow="lg"
              border="1px solid"
              borderColor="gray.200"
            >
              <Text fontSize="6xl" mb={4}>
                🔍
              </Text>
              <Text color="muted" fontSize="sm">
                Searching for the right path...
              </Text>
            </MotionBox>

            {/* Action Buttons */}
            <MotionBox
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <HStack gap={4} wrap="wrap" justify="center">
                <Link to="/" style={{ textDecoration: 'none' }}>
                  <Button
                    size="lg"
                    colorScheme="primary"
                    borderRadius="full"
                    px={8}
                    fontWeight="600"
                    _hover={{ transform: "translateY(-2px)", shadow: "lg" }}
                    transition="all 0.3s ease"
                  >
                    <HiHome style={{ marginRight: '8px' }} />
                    Go Home
                  </Button>
                </Link>
                
                <Button
                  size="lg"
                  variant="outline"
                  borderColor="primary.500"
                  color="primary.500"
                  borderRadius="full"
                  px={8}
                  fontWeight="600"
                  onClick={handleGoBack}
                  _hover={{ 
                    bg: "primary.50", 
                    transform: "translateY(-2px)",
                    borderColor: "primary.600",
                    color: "primary.600"
                  }}
                  transition="all 0.3s ease"
                >
                  <HiArrowLeft style={{ marginRight: '8px' }} />
                  Go Back
                </Button>
              </HStack>
            </MotionBox>

            {/* Helpful Links */}
            <MotionBox
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              mt={8}
            >
              <Text fontSize="md" color="muted" mb={4}>
                Maybe you're looking for one of these?
              </Text>
              <HStack gap={6} wrap="wrap" justify="center">
                <Link to="/about" style={{ textDecoration: 'none' }}>
                  <Text
                    color="primary.500"
                    fontWeight="500"
                    _hover={{ 
                      color: "primary.600",
                      textDecoration: "underline"
                    }}
                    transition="all 0.2s ease"
                  >
                    About Us
                  </Text>
                </Link>
                <Link to="/products" style={{ textDecoration: 'none' }}>
                  <Text
                    color="primary.500"
                    fontWeight="500"
                    _hover={{ 
                      color: "primary.600",
                      textDecoration: "underline"
                    }}
                    transition="all 0.2s ease"
                  >
                    Our Products
                  </Text>
                </Link>
                <Link to="/services" style={{ textDecoration: 'none' }}>
                  <Text
                    color="primary.500"
                    fontWeight="500"
                    _hover={{ 
                      color: "primary.600",
                      textDecoration: "underline"
                    }}
                    transition="all 0.2s ease"
                  >
                    Services
                  </Text>
                </Link>
                <Link to="/contact" style={{ textDecoration: 'none' }}>
                  <Text
                    color="primary.500"
                    fontWeight="500"
                    _hover={{ 
                      color: "primary.600",
                      textDecoration: "underline"
                    }}
                    transition="all 0.2s ease"
                  >
                    Contact
                  </Text>
                </Link>
              </HStack>
            </MotionBox>

            {/* Search Suggestion */}
            <MotionBox
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              mt={6}
            >
              <Box
                bg="white"
                p={6}
                borderRadius="xl"
                border="1px solid"
                borderColor="gray.200"
                maxW="md"
                mx="auto"
              >
                <Text fontSize="sm" color="muted" mb={3}>
                  Still can't find what you're looking for?
                </Text>
                <Link to="/contact" style={{ textDecoration: 'none' }}>
                  <Button
                    size="sm"
                    variant="ghost"
                    color="primary.500"
                    fontWeight="500"
                    _hover={{ bg: "primary.50" }}
                  >
                    Contact Support
                  </Button>
                </Link>
              </Box>
            </MotionBox>
          </VStack>
        </MotionBox>
      </Container>
    </Box>
  )
}

export default NotFoundPage
