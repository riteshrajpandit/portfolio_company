import React, { Component } from 'react'
import type { ReactNode } from 'react'
import {
  Box,
  Container,
  Text,
  Button,
  VStack,
} from "@chakra-ui/react"

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
    // Here you could send the error to an error reporting service
  }

  handleReload = () => {
    window.location.reload()
  }

  handleGoHome = () => {
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box minH="100vh" bg="neutral.50" display="flex" alignItems="center">
          <Container maxW="4xl" textAlign="center">
            <VStack gap={8}>
              <Text
                fontSize={{ base: "6xl", md: "8xl" }}
                fontWeight="900"
                color="red.500"
                lineHeight="1"
              >
                ⚠️
              </Text>
              
              <VStack gap={4}>
                <Text
                  fontSize={{ base: "2xl", md: "3xl" }}
                  fontWeight="700"
                  color="text"
                >
                  Something went wrong
                </Text>
                <Text
                  fontSize={{ base: "lg", md: "xl" }}
                  color="muted"
                  lineHeight="1.7"
                  maxW="2xl"
                >
                  We're sorry, but something unexpected happened. 
                  Our team has been notified and we're working on a fix.
                </Text>
              </VStack>

              <VStack gap={4}>
                <Button
                  size="lg"
                  colorScheme="primary"
                  borderRadius="full"
                  px={8}
                  fontWeight="600"
                  onClick={this.handleReload}
                  _hover={{ transform: "translateY(-2px)", shadow: "lg" }}
                  transition="all 0.3s ease"
                >
                  Try Again
                </Button>
                
                <Button
                  size="md"
                  variant="outline"
                  borderColor="primary.500"
                  color="primary.500"
                  borderRadius="full"
                  px={6}
                  fontWeight="500"
                  onClick={this.handleGoHome}
                  _hover={{ 
                    bg: "primary.50", 
                    transform: "translateY(-2px)" 
                  }}
                  transition="all 0.3s ease"
                >
                  Go to Homepage
                </Button>
              </VStack>
            </VStack>
          </Container>
        </Box>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
