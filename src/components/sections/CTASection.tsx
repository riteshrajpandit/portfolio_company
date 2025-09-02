import { 
  Box, 
  Container, 
  Text, 
  Button, 
  VStack
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { HiArrowRight } from 'react-icons/hi'
import { motion } from 'framer-motion'

const CTASection = () => {
  return (
    <Container maxW="7xl" py={{ base: 16, md: 20 }}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
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
            <Text fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }} fontWeight="700">
              Ready to Start Your Project?
            </Text>
            <Text fontSize="xl" opacity={0.9} lineHeight="1.6">
              Let's work together to bring your vision to life. 
              Get in touch and discover how we can help your business grow.
            </Text>
            <Link to="/products" style={{ textDecoration: 'none' }}>
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
                Get Started Today <HiArrowRight style={{ marginLeft: '8px' }} />
              </Button>
            </Link>
          </VStack>
        </Box>
      </motion.div>
    </Container>
  )
}

export default CTASection
