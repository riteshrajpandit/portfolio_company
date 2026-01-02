import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Button,
  Icon,
} from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { HiCheckCircle, HiHome } from "react-icons/hi"
import SEO from "@/components/SEO"
import { FlowingCurvesBackground } from "@/components/ui/flowing-curves"
import { useHideChatbot } from "@/hooks/useHideChatbot"

const CodeSuccessPage = () => {
  useHideChatbot()
  const navigate = useNavigate()

  return (
    <>
      <SEO 
        title="Access Granted | IOXET Labs" 
        description="Access granted successfully."
      />
      
      {/* Main Container with Flowing Line Background - Matching CodeEntryPage */}
      <Box 
        position="relative"
        minH="100vh" 
        bg="#050505" 
        overflow="hidden"
        display="flex"
        alignItems="center"
      >
        <FlowingCurvesBackground />

        <Container maxW="container.sm" position="relative" zIndex={1} px={4}>
          <Box
            p={{ base: 8, md: 12 }}
            borderRadius="3xl"
            bg="rgba(0, 0, 0, 0.4)"
            backdropFilter="blur(24px)"
            border="1px solid rgba(255, 255, 255, 0.08)"
            boxShadow="0 25px 50px -12px rgba(0, 0, 0, 0.5)"
            position="relative"
            overflow="hidden"
            _before={{
              content: '""',
              position: "absolute",
              top: 0, left: 0, right: 0, height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
            }}
          >
          <VStack gap={10} align="stretch">
            
            {/* Success Content Section */}
            <VStack textAlign="center" gap={6}>
              <Box 
                p={4} 
                borderRadius="full" 
                bg="rgba(72, 187, 120, 0.1)" 
                border="1px solid rgba(72, 187, 120, 0.2)"
                boxShadow="0 0 30px rgba(72, 187, 120, 0.15)"
                mb={2}
                animation="pulse 2s infinite"
              >
                <Icon as={HiCheckCircle} fontSize="5xl" color="green.400" />
              </Box>
              
              <style dangerouslySetInnerHTML={{ __html: `
                @keyframes pulse {
                  0% { box-shadow: 0 0 0 0 rgba(72, 187, 120, 0.4); }
                  70% { box-shadow: 0 0 0 10px rgba(72, 187, 120, 0); }
                  100% { box-shadow: 0 0 0 0 rgba(72, 187, 120, 0); }
                }
              `}} />

              <VStack gap={2}>
                <Heading 
                  size="2xl" 
                  fontWeight="bold" 
                  letterSpacing="tight"
                  color="white"
                >
                  Access Granted
                </Heading>
                <Text fontSize="xl" color="white" fontWeight="medium">
                  Hello User
                </Text>
              </VStack>

              <Text fontSize="lg" color="gray.400" maxW="sm" mx="auto" lineHeight="relaxed">
                Your code has been successfully validated. You now have access to the exclusive content.
              </Text>

              <Button
                onClick={() => navigate("/")}
                variant="solid"
                bg="white"
                color="black"
                _hover={{ bg: "gray.200", transform: "translateY(-1px)" }}
                _active={{ transform: "translateY(0)" }}
                size="xl"
                px={10}
                fontWeight="bold"
                borderRadius="full"
                transition="all 0.2s"
                mt={6}
              >
                <HiHome style={{ marginRight: "8px" }} /> Return Home
              </Button>
            </VStack>
          </VStack>
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default CodeSuccessPage
