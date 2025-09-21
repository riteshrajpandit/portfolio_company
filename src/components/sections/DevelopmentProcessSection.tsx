import {
  Box,
  Container,
  Text,
  VStack,
  Grid,
} from "@chakra-ui/react"
import { motion } from "framer-motion"

const MotionBox = motion(Box)

interface ProcessStep {
  step: string
  description: string
}

interface DevelopmentProcessSectionProps {
  process: ProcessStep[]
}

const DevelopmentProcessSection = ({ process }: DevelopmentProcessSectionProps) => {
  return (
    <Container maxW="7xl" mt={16}>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <Text fontSize="2xl" fontWeight="700" color="text" textAlign="center" mb={10}>
          Our Development Process
        </Text>
        <Grid templateColumns={{ base: "1fr", md: "repeat(5, 1fr)" }} gap={6}>
          {process.map((step, idx) => (
            <VStack key={idx} gap={4} textAlign="center">
              <Box
                w="60px"
                h="60px"
                bg="primary.500"
                color="white"
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize="xl"
                fontWeight="700"
              >
                {idx + 1}
              </Box>
              <VStack gap={2}>
                <Text fontSize="md" fontWeight="600" color="text">
                  {step.step}
                </Text>
                <Text fontSize="sm" color="muted" textAlign="center">
                  {step.description}
                </Text>
              </VStack>
            </VStack>
          ))}
        </Grid>
      </MotionBox>
    </Container>
  )
}

export default DevelopmentProcessSection
