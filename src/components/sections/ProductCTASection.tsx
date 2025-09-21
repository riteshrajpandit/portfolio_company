import {
  Box,
  Container,
  Text,
  Button,
  VStack,
  HStack,
} from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { HiArrowRight } from "react-icons/hi2"

const MotionBox = motion(Box)

const ProductCTASection = () => {
  return (
    <Container maxW="7xl" py={{ base: 16, md: 20 }}>
      <MotionBox
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
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
  )
}

export default ProductCTASection
