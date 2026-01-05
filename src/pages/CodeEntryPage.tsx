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
import { useHideChatbot } from "@/hooks/useHideChatbot"

// Memoized background component
const MemoizedBackground = memo(FlowingCurvesBackground)
MemoizedBackground.displayName = "MemoizedBackground"

// Security badge component - memoized
const SecurityBadge = memo(({ icon, label, description }: { icon: any; label: string; description: string }) => (
  <HStack gap={2} align="flex-start">
    <Icon as={icon} color="gray.500" flexShrink={0} mt={0.5} />
    <VStack align="flex-start" gap={0.5}>
      <Text
        fontSize="xs"
        color="gray.500"
        fontWeight="medium"
        textTransform="uppercase"
        letterSpacing="widest"
      >
        {label}
      </Text>
      <Text fontSize="xs" color="gray.400" lineHeight="short">
        {description}
      </Text>
    </VStack>
  </HStack>
))
SecurityBadge.displayName = "SecurityBadge"

interface CodeForm {
  code: string
}

// Pin input style configuration
const PIN_INPUT_STYLES = {
  width: { base: "48px", sm: "56px", md: "64px" },
  height: { base: "56px", sm: "64px", md: "72px" },
  fontSize: { base: "xl", md: "2xl" },
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
  useHideChatbot()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const { handleSubmit, control, reset, watch } = useForm<CodeForm>({
    defaultValues: { code: "" },
    mode: "onSubmit",
  })

  const code = watch("code")

  // Optimized submit handler with toast notifications
  const onSubmit = useCallback(
    async (data: CodeForm) => {
      // Validate code length
      if (!data.code || data.code.length !== 6) {
        toaster.create({
          title: "Invalid Code",
          description: "Please enter all 6 digits of your security code.",
          type: "error",
          duration: 4000,
        })
        return
      }

      setIsLoading(true)

      try {
        const response = await apiService.useCode(data.code)

        if (response.success) {
          toaster.create({
            title: "Access Granted",
            description: "Your secure session is now active.",
            type: "success",
            duration: 3000,
          })
          navigate("/code-success", { state: { verified: true }, replace: true })
        } else {
          // Show error as toast for wrong or used codes
          toaster.create({
            title: "Verification Failed",
            description: response.message || "Invalid or expired code. Please check and try again.",
            type: "error",
            duration: 5000,
          })
          // Clear the form after error
          setTimeout(() => reset(), 100)
        }
      } catch (error: any) {
        // Handle API errors
        const errorMsg = error.message?.replace("API Error: ", "") || "Validation failed. Please try again."
        toaster.create({
          title: "Error",
          description: errorMsg,
          type: "error",
          duration: 5000,
        })
        // Clear the form after error
        setTimeout(() => reset(), 100)
      } finally {
        setIsLoading(false)
      }
    },
    [navigate, reset]
  )

  // Memoize pin indices
  const pinIndices = useMemo(() => [0, 1, 2, 3, 4, 5], [])

  // Handle keyboard enter key
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !isLoading) {
        e.preventDefault()
        handleSubmit(onSubmit)()
      }
    },
    [handleSubmit, onSubmit, isLoading]
  )

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
        py={{ base: 6, md: 8 }}
      >
        <MemoizedBackground />

        <Container maxW="700px" position="relative" zIndex={1} px={{ base: 4, sm: 6 }}>
          <Box
            p={{ base: 6, sm: 8, md: 10 }}
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
            <VStack gap={{ base: 6, md: 10 }} align="stretch">
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
                  size={{ base: "xl", md: "2xl" }}
                  fontWeight="bold"
                  letterSpacing="tight"
                  color="white"
                >
                  Welcome to Secode
                </Heading>
                <Text
                  fontSize={{ base: "md", md: "lg" }}
                  color="gray.400"
                  maxW="sm"
                  mx="auto"
                  px={{ base: 2, sm: 0 }}
                >
                  {/* Input your 6-digit access code. */}
                  Please enter your 6-digit secure PIN to unlock the confidential business pitch and financial data. 
                </Text>
              </VStack>

              {/* Input Section */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                onKeyDown={handleKeyDown}
                noValidate
              >
                <VStack gap={8}>
                  <Controller
                    control={control}
                    name="code"
                    rules={{ required: true, minLength: 6, maxLength: 6 }}
                    render={({ field }) => (
                      <PinInput
                        value={Array.from(
                          { length: 6 },
                          (_, i) => (field.value || "")[i] || ""
                        )}
                        onValueChange={(e) => {
                          const newValue = e.value.join("")
                          const currentValue = field.value || ""

                          // Prevent overwriting if already full
                          if (currentValue.length === 6 && newValue.length === 6 && currentValue !== newValue) {
                            return
                          }

                          field.onChange(newValue)
                        }}
                        count={6}
                        size="xl"
                        otp
                        attached={false}
                      >
                        <HStack
                          gap={{ base: 2, sm: 3 }}
                          justify="center"
                          flexWrap="wrap"
                        >
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

                  <Button
                    type="submit"
                    variant="solid"
                    bg="white"
                    color="black"
                    size={{ base: "lg", md: "xl" }}
                    px={{ base: 8, md: 12 }}
                    borderRadius="full"
                    fontWeight="bold"
                    loading={isLoading}
                    loadingText="Verifying..."
                    transition="all 0.2s"
                    w={{ base: "100%", sm: "auto" }}
                    _hover={{
                      bg: "gray.100",
                      transform: "translateY(-1px)",
                      boxShadow: "lg",
                    }}
                    _active={{
                      transform: "translateY(0)",
                      bg: "gray.200",
                    }}
                    disabled={isLoading || !code || code.length !== 6}
                  >
                    Verify Access
                  </Button>
                </VStack>
              </form>

              {/* Security Info - Updated with descriptions */}
              <VStack
                gap={4}
                pt={{ base: 6, md: 8 }}
                borderTop="1px solid"
                borderColor="whiteAlpha.100"
                align="stretch"
              >
                <SecurityBadge
                  icon={HiClock}
                  label="24-Hour Validity"
                  description="Once activated, your access session remains valid for 24 hours."
                />
                <SecurityBadge
                  icon={HiShieldCheck}
                  label="One-Time Activation"
                  description="Each code can only be activated once. Please ensure you are ready to use it."
                />
              </VStack>
            </VStack>
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default CodeEntryPage