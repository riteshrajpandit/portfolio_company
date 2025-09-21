import {
  Box,
  Container,
  Text,
  Button,
  HStack,
} from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { HiArrowRight } from "react-icons/hi2"

const MotionContainer = motion(Container)

const ProductHeroSection = () => {
  return (
    <Box bg="neutral.50" pt={40} pb={16}>
      <Container maxW="7xl">
        <MotionContainer
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          textAlign="center"
          maxW="4xl"
          mx="auto"
        >
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
  )
}

export default ProductHeroSection
