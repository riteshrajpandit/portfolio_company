import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Input,
  Button,
  Card,
  CardBody,
  CardHeader,
  Stack,
  Icon,
} from "@chakra-ui/react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { HiLockClosed, HiShieldCheck, HiClock } from "react-icons/hi"
import { apiService } from "@/services/api"
import SEO from "@/components/SEO"
import { toaster } from "@/components/ui/toaster"
import { Field } from "@/components/ui/field"

interface CodeForm {
  code: string
}

const CodeEntryPage = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CodeForm>()

  const onSubmit = async (data: CodeForm) => {
    setIsLoading(true)
    setErrorMessage(null)
    try {
      const response = await apiService.useCode(data.code)
      if (response.success) {
        toaster.create({
          title: "Code Validated",
          description: "Access granted successfully.",
          type: "success",
        })
        navigate("/code-success")
      } else {
        setErrorMessage(response.message || "The code you entered is invalid or expired.")
      }
    } catch (error: any) {
      // Extract error message from the API error if possible
      const msg = error.message?.replace("API Error: ", "") || "An error occurred while validating the code."
      setErrorMessage(msg)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <SEO 
        title="Enter Access Code | IOXET Labs" 
        description="Enter your secure access code to unlock exclusive content."
      />
      <Box bg="background" minH="calc(100vh - 80px)" py={20}>
        <Container maxW="container.sm">
          <VStack gap={8} align="stretch">
            <VStack textAlign="center" gap={4}>
              <Heading size="2xl" color="neutral.900">
                Enter Access Code
              </Heading>
              <Text fontSize="lg" color="neutral.600" maxW="md" mx="auto">
                Please enter your 6-digit secure access code to proceed.
              </Text>
            </VStack>

            <Card.Root variant="elevated" bg="white" borderColor="neutral.200">
              <CardHeader>
                <VStack gap={2}>
                  <Icon as={HiLockClosed} fontSize="4xl" color="primary.500" />
                  <Heading size="md" textAlign="center">Secure Access</Heading>
                </VStack>
              </CardHeader>
              <CardBody>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <VStack gap={6}>
                    {errorMessage && (
                      <Box 
                        p={3} 
                        bg="red.50" 
                        border="1px solid" 
                        borderColor="red.200" 
                        borderRadius="md" 
                        width="full" 
                        textAlign="center"
                      >
                        <Text color="red.600" fontWeight="medium" fontSize="sm">
                          {errorMessage}
                        </Text>
                      </Box>
                    )}
                    <Field
                      label="Access Code"
                      invalid={!!errors.code}
                      errorText={errors.code?.message}
                      required
                    >
                      <Input
                        {...register("code", {
                          required: "Code is required",
                          pattern: {
                            value: /^\d{6}$/,
                            message: "Code must be exactly 6 digits",
                          },
                        })}
                        placeholder="Enter 6-digit code"
                        size="lg"
                        textAlign="center"
                        letterSpacing="widest"
                        fontSize="xl"
                        maxLength={6}
                      />
                    </Field>

                    <Button
                      type="submit"
                      colorPalette="primary"
                      size="lg"
                      width="full"
                      loading={isLoading}
                      loadingText="Validating..."
                    >
                      Validate Code
                    </Button>
                  </VStack>
                </form>
              </CardBody>
            </Card.Root>

            <Card.Root variant="outline" bg="neutral.50" borderColor="neutral.200">
              <CardBody>
                <Stack gap={4}>
                  <Heading size="sm" color="neutral.800">Important Information</Heading>
                  
                  <Stack direction="row" gap={3} align="start">
                    <Icon as={HiClock} color="orange.500" mt={1} />
                    <Box>
                      <Text fontWeight="medium" color="neutral.900">24-Hour Validity</Text>
                      <Text fontSize="sm" color="neutral.600">
                        Once activated, your access session remains valid for 24 hours.
                      </Text>
                    </Box>
                  </Stack>

                  <Stack direction="row" gap={3} align="start">
                    <Icon as={HiShieldCheck} color="green.500" mt={1} />
                    <Box>
                      <Text fontWeight="medium" color="neutral.900">One-Time Activation</Text>
                      <Text fontSize="sm" color="neutral.600">
                        Each code can only be activated once. Please ensure you are ready to use it.
                      </Text>
                    </Box>
                  </Stack>
                </Stack>
              </CardBody>
            </Card.Root>
          </VStack>
        </Container>
      </Box>
    </>
  )
}

export default CodeEntryPage
