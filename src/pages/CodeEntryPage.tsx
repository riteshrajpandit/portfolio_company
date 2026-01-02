import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Button,
  Icon,
  HStack,
  Center,
} from "@chakra-ui/react"
import { useState, useCallback, memo, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { Controller, useForm } from "react-hook-form"
import { HiLockClosed, HiShieldCheck, HiClock } from "react-icons/hi"
import { apiService } from "@/services/api"
import SEO from "@/components/SEO"
import { toaster } from "@/components/ui/toaster"
import { PinInput } from "@/components/ui/pin-input"
import { FlowingCurvesBackground } from "@/components/ui/flowing-curves"

// Memoized background component
const MemoizedBackground = memo(FlowingCurvesBackground)
MemoizedBackground.displayName = "MemoizedBackground"

// Security badge component - memoized to prevent re-renders
const SecurityBadge = memo(({ icon, label }: { icon: any; label: string }) => (
  <HStack gap={2}>
    <Icon as={icon} color="gray.500" />
    <Text
      fontSize="xs"
      color="gray.500"
      fontWeight="medium"
      textTransform="uppercase"
      letterSpacing="widest"
    >
      {label}
    </Text>
  </HStack>
))
SecurityBadge.displayName = "SecurityBadge"

// Error message component - extracted for better separation of concerns
const ErrorMessage = memo(({ message }: { message: string | null }) => (
  <Box
    width="100%"
    transition="all 0.3s ease-in-out"
    opacity={message ? 1 : 0}
    transform={message ? "translateY(0)" : "translateY(-10px)"}
    maxHeight={message ? "100px" : "0px"}
    overflow="hidden"
  >
    {message && (
      <Box
        role="alert"
        aria-live="polite"
        px={4}
        py={2}
        bg="red.900/20"
        border="1px solid"
        borderColor="red.500/30"
        borderRadius="lg"
        width="auto"
        mx="auto"
        textAlign="center"
      >
        <Text color="red.300" fontWeight="medium" fontSize="sm">
          {message}
        </Text>
      </Box>
    )}
  </Box>
))
ErrorMessage.displayName = "ErrorMessage"

interface CodeForm {
  code: string
}

// Pin input style configuration - extracted as constant
const PIN_INPUT_STYLES = {
  width: "64px",
  height: "72px",
  fontSize: "2xl",
  fontWeight: "semibold",
  borderRadius: "2xl",
  bg: "whiteAlpha.50",
  border: "2px solid",
  borderColor: "whiteAlpha.100",
  color: "white",
  transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
  _focus: {
    borderColor: "whiteAlpha.400",
    bg: "whiteAlpha.100",
    boxShadow: "0 0 20px rgba(255, 255, 255, 0.05)",
    transform: "scale(1.05)",
    outline: "none",
  },
  _hover: {
    borderColor: "whiteAlpha.200",
  },
  _placeholder: { color: "gray.500" },
} as const

const CodeEntryPage = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const { handleSubmit, control } = useForm<CodeForm>({
    defaultValues: { code: "" },
    mode: "onSubmit",
  })

  // Optimized submit handler with proper error handling
  const onSubmit = useCallback(
    async (data: CodeForm) => {
      setIsLoading(true)
      setErrorMessage(null)

      try {
        const response = await apiService.useCode(data.code)
        if (response.success) {
          toaster.create({
            title: "Access Granted",
            description: "Your secure session is now active.",
            type: "success",
          })
          navigate("/code-success")
        } else {
          setErrorMessage(response.message || "Invalid or expired code.")
        }
      } catch (error: any) {
        const msg =
          error.message?.replace("API Error: ", "") || "Validation failed."
        setErrorMessage(msg)
      } finally {
        setIsLoading(false)
      }
    },
    [navigate]
  )

  // Memoize pin indices to prevent array recreation
  const pinIndices = useMemo(() => [0, 1, 2, 3, 4, 5], [])

  return (
    <>
      <SEO
        title="Secure Access | IOXET Labs"
        description="Enter your secure access code to unlock exclusive content."
      />

      <Box
        position="relative"
        minH="100vh"
        bg="gray.950"
        overflow="hidden"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <MemoizedBackground />

        <Container maxW="600px" position="relative" zIndex={1} px={4}>
          <Box
            p={{ base: 8, md: 10 }}
            borderRadius="3xl"
            bg="whiteAlpha.100"
            backdropFilter="blur(12px)"
            border="1px solid"
            borderColor="whiteAlpha.100"
            boxShadow="2xl"
            position="relative"
            overflow="hidden"
            _before={{
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "1px",
              bgGradient: "linear(to-r, transparent, blue.500, transparent)",
              opacity: 0.4,
            }}
          >
            <VStack gap={10} align="stretch">
              {/* Header Section */}
              <VStack textAlign="center" gap={3}>
                <Center
                  p={3}
                  borderRadius="full"
                  bg="whiteAlpha.50"
                  border="1px solid"
                  borderColor="whiteAlpha.200"
                  mb={2}
                >
                  <Icon as={HiLockClosed} fontSize="2xl" color="blue.400" />
                </Center>
                <Heading
                  size="2xl"
                  fontWeight="bold"
                  letterSpacing="tight"
                  color="white"
                >
                  Verification Required
                </Heading>
                <Text fontSize="lg" color="gray.400" maxW="xs" mx="auto">
                  Enter the 6-digit security code sent to your authorized
                  device.
                </Text>
              </VStack>

              {/* Input Section */}
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <VStack gap={8}>
                  <Controller
                    control={control}
                    name="code"
                    rules={{ required: true, minLength: 6 }}
                    render={({ field }) => (
                      <PinInput
                        value={Array.from(
                          { length: 6 },
                          (_, i) => (field.value || "")[i] || ""
                        )}
                        onValueChange={(e) => field.onChange(e.value.join(""))}
                        count={6}
                        size="xl"
                        otp
                        attached={false}
                      >
                        <HStack gap={3} justify="center">
                          {pinIndices.map((id) => (
                            <PinInput.Input
                              key={id}
                              index={id}
                              {...PIN_INPUT_STYLES}
                            />
                          ))}
                        </HStack>
                      </PinInput>
                    )}
                  />

                  <ErrorMessage message={errorMessage} />

                  <Button
                    type="submit"
                    variant="solid"
                    bg="white"
                    color="black"
                    size="xl"
                    px={12}
                    borderRadius="full"
                    fontWeight="bold"
                    loading={isLoading}
                    loadingText="Verifying..."
                    transition="all 0.2s"
                    _hover={{
                      bg: "gray.100",
                      transform: "translateY(-1px)",
                      boxShadow: "lg",
                    }}
                    _active={{
                      transform: "translateY(0)",
                      bg: "gray.200",
                    }}
                  >
                    Verify Access
                  </Button>
                </VStack>
              </form>

              {/* Security Info */}
              <HStack
                justify="center"
                gap={8}
                pt={8}
                borderTop="1px solid"
                borderColor="whiteAlpha.100"
              >
                <SecurityBadge icon={HiClock} label="Valid 24h" />
                <SecurityBadge icon={HiShieldCheck} label="End-to-End Secure" />
              </HStack>
            </VStack>
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default CodeEntryPage