import { Box, Container, Flex } from "@chakra-ui/react"
import type { ReactNode } from "react"

interface SecureLayoutProps {
  sidebar: ReactNode
  children: ReactNode
}

export const SecureLayout = ({ sidebar, children }: SecureLayoutProps) => {
  return (
    <Box minH="100vh" bg="gray.950" position="relative">
      <Container maxW="container.xl" position="relative" zIndex={1} px={{ base: 4, md: 8 }}>
        <Flex direction={{ base: "column", lg: "row" }} gap={{ base: 8, lg: 16 }} py={8}>
          {/* Sidebar Area */}
          <Box flexShrink={0}>
            {sidebar}
          </Box>

          {/* Main Content Area */}
          <Box flex={1} minW={0}>
            <Box
              bg="rgba(0, 0, 0, 0.4)"
              backdropFilter="blur(20px)"
              borderRadius="3xl"
              border="1px solid rgba(255, 255, 255, 0.08)"
              p={{ base: 6, md: 10 }}
              boxShadow="0 25px 50px -12px rgba(0, 0, 0, 0.5)"
            >
              {children}
            </Box>
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}
