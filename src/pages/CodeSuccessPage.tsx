import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Button,
  Icon,
  Card,
  CardBody,
} from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { HiCheckCircle, HiHome } from "react-icons/hi"
import SEO from "@/components/SEO"

const CodeSuccessPage = () => {
  const navigate = useNavigate()

  return (
    <>
      <SEO 
        title="Access Granted | IOXET Labs" 
        description="Access granted successfully."
      />
      <Box bg="background" minH="calc(100vh - 80px)" py={20} display="flex" alignItems="center">
        <Container maxW="container.sm">
          <Card.Root variant="elevated" bg="white" borderColor="neutral.200" textAlign="center" py={10}>
            <CardBody>
              <VStack gap={6}>
                <Icon as={HiCheckCircle} fontSize="6xl" color="green.500" />
                
                <VStack gap={2}>
                  <Heading size="2xl" color="neutral.900">
                    Hello User
                  </Heading>
                  <Text fontSize="lg" color="neutral.600">
                    Your code has been successfully validated.
                  </Text>
                </VStack>

                <Text color="neutral.500" maxW="md" mx="auto">
                  You now have access to the exclusive content. Enjoy your session!
                </Text>

                <Button
                  colorPalette="primary"
                  size="lg"
                  onClick={() => navigate("/")}
                  mt={4}
                >
                  <HiHome /> Return Home
                </Button>
              </VStack>
            </CardBody>
          </Card.Root>
        </Container>
      </Box>
    </>
  )
}

export default CodeSuccessPage
