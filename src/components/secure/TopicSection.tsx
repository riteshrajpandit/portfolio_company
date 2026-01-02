import { Box, Heading, Text, VStack } from "@chakra-ui/react"
import type { ReactNode } from "react"

interface TopicSectionProps {
  id: string
  title: string
  description?: string
  children: ReactNode
}

export const TopicSection = ({ id, title, description, children }: TopicSectionProps) => {
  return (
    <Box
      id={id}
      as="section"
      py={12}
      borderBottom="1px solid"
      borderColor="whiteAlpha.100"
      _last={{ borderBottom: "none" }}
    >
      <VStack align="stretch" gap={6}>
        <Box>
          <Heading size="2xl" color="white" mb={3}>
            {title}
          </Heading>
          {description && (
            <Text fontSize="lg" color="gray.400" lineHeight="relaxed">
              {description}
            </Text>
          )}
        </Box>
        <Box mt={4}>
          {children}
        </Box>
      </VStack>
    </Box>
  )
}
