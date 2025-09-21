import {
  Box,
  Container,
  Text,
  Button,
  VStack,
  HStack,
  Grid,
  Badge,
  Icon,
} from "@chakra-ui/react"
import { motion } from "framer-motion"
import { HiCheckCircle } from "react-icons/hi2"

const MotionBox = motion(Box)

interface PricingPlan {
  price: string
  users: string
  features: string[]
}

interface PricingData {
  starter: PricingPlan
  professional: PricingPlan
  enterprise: PricingPlan
}

interface ERPPricingSectionProps {
  pricing: PricingData
}

const ERPPricingSection = ({ pricing }: ERPPricingSectionProps) => {
  return (
    <Container maxW="7xl" mt={16}>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <Text fontSize="2xl" fontWeight="700" color="text" textAlign="center" mb={10}>
          Choose Your ERP Plan
        </Text>
        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
          {Object.entries(pricing).map(([planName, plan]) => (
            <Box
              key={planName}
              bg="white"
              p={8}
              borderRadius="2xl"
              border="2px solid"
              borderColor={planName === "professional" ? "primary.500" : "gray.200"}
              shadow="lg"
              position="relative"
              _hover={{ transform: "translateY(-4px)", shadow: "xl" }}
              transition="all 0.3s ease"
            >
              {planName === "professional" && (
                <Badge
                  position="absolute"
                  top={-3}
                  left="50%"
                  transform="translateX(-50%)"
                  colorScheme="primary"
                  px={4}
                  py={1}
                  borderRadius="full"
                  fontSize="xs"
                  fontWeight="600"
                >
                  Most Popular
                </Badge>
              )}
              
              <VStack gap={4} align="start">
                <Text fontSize="xl" fontWeight="700" color="text" textTransform="capitalize">
                  {planName}
                </Text>
                <HStack gap={1} align="baseline">
                  <Text fontSize="3xl" fontWeight="700" color="primary.500">
                    {plan.price}
                  </Text>
                  {plan.price !== "Custom" && (
                    <Text fontSize="sm" color="muted">
                      /month
                    </Text>
                  )}
                </HStack>
                <Text fontSize="sm" color="muted" fontWeight="500">
                  {plan.users}
                </Text>
                
                <VStack gap={2} align="start" w="full">
                  {plan.features.map((feature: string, idx: number) => (
                    <HStack key={idx} gap={2} align="start">
                      <Icon as={HiCheckCircle} color="green.500" fontSize="sm" mt={1} />
                      <Text fontSize="sm" color="text">
                        {feature}
                      </Text>
                    </HStack>
                  ))}
                </VStack>
                
                <Button
                  w="full"
                  colorScheme={planName === "professional" ? "primary" : undefined}
                  variant={planName === "professional" ? "solid" : "outline"}
                  borderRadius="full"
                  fontWeight="600"
                  _hover={{ transform: "translateY(-1px)" }}
                  transition="all 0.3s ease"
                >
                  {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
                </Button>
              </VStack>
            </Box>
          ))}
        </Grid>
      </MotionBox>
    </Container>
  )
}

export default ERPPricingSection
