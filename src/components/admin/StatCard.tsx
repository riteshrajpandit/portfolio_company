import { Box, VStack, HStack, Icon, Text, Heading } from "@chakra-ui/react"
import { motion } from "framer-motion"
import type { IconType } from "react-icons"

const MotionBox = motion(Box)

interface StatCardProps {
  label: string
  value: string
  change: string
  icon: IconType
  color: string
  index?: number
}

export const StatCard = ({ label, value, change, icon, color, index = 0 }: StatCardProps) => {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Box
        p={6}
        bg="white"
        borderRadius="xl"
        border="1px solid"
        borderColor="neutral.200"
        _hover={{
          shadow: "md",
          borderColor: `${color}.200`
        }}
        transition="all 0.3s ease"
      >
        <VStack align="start" gap={3}>
          <HStack justify="space-between" w="full">
            <Box
              p={3}
              bg={`${color}.50`}
              borderRadius="lg"
            >
              <Icon as={icon} fontSize="2xl" color={`${color}.500`} />
            </Box>
            <Text
              fontSize="sm"
              fontWeight="600"
              color={change.startsWith("+") ? "green.600" : "red.600"}
            >
              {change}
            </Text>
          </HStack>
          <VStack align="start" gap={1} w="full">
            <Text fontSize="sm" color="neutral.600" fontWeight="500">
              {label}
            </Text>
            <Heading fontSize="2xl" fontWeight="700" color="neutral.900">
              {value}
            </Heading>
          </VStack>
        </VStack>
      </Box>
    </MotionBox>
  )
}
