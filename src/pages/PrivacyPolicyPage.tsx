import {
  Box,
  Container,
  Text,
  
} from "@chakra-ui/react"
import { motion } from "framer-motion"

const MotionBox = motion(Box)

const PrivacyPolicyPage = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box bg="neutral.50" pt={40} pb={16}>
        <Container maxW="4xl">
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            textAlign="center"
          >
            <Text
              fontSize={{ base: "4xl", md: "5xl" }}
              fontWeight="700"
              lineHeight="1.1"
              color="text"
              mb={6}
            >
              Privacy Policy
            </Text>
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color="muted"
              lineHeight="1.7"
              maxW="2xl"
              mx="auto"
            >
              Your privacy is important to us. We will update our Privacy Policy soon to reflect our commitment to protecting your personal information.
            </Text>
            <Text fontSize="sm" color="muted" mt={20}>
              Last updated: {new Date().toLocaleDateString()}
            </Text>
          </MotionBox>
        </Container>
      </Box>

      {/* Content Section */}
      
    </Box>
  )
}

export default PrivacyPolicyPage
