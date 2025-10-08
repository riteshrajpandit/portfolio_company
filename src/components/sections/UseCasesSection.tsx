import {
  Box,
  Container,
  Text,
  VStack,
  Grid,
} from "@chakra-ui/react"
import { motion } from "framer-motion"

const MotionBox = motion(Box)

interface UseCase {
  title: string
  description: string
}

interface UseCasesSectionProps {
  useCases: UseCase[]
}

const UseCasesSection = ({ useCases }: UseCasesSectionProps) => {
  return (
    <Container maxW="7xl" >
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <Text fontSize="2xl" fontWeight="700" color="text" textAlign="center" mb={10}>
          Real-World Applications
        </Text>
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
          {useCases.map((useCase, idx) => (
            <Box
              key={idx}
              bg="white"
              p={6}
              borderRadius="xl"
              border="1px solid"
              borderColor="gray.200"
              shadow="sm"
              _hover={{ shadow: "md", transform: "translateY(-2px)" }}
              transition="all 0.3s ease"
            >
              <VStack gap={3} align="start">
                <Text fontSize="lg" fontWeight="600" color="text">
                  {useCase.title}
                </Text>
                <Text fontSize="sm" color="muted" lineHeight="1.6">
                  {useCase.description}
                </Text>
              </VStack>
            </Box>
          ))}
        </Grid>
      </MotionBox>
    </Container>
  )
}

export default UseCasesSection
