import {
  Box,
  Container,
  Text,
  Button,
  VStack,
  HStack,
  Input,
  Heading,
  Icon,
} from "@chakra-ui/react"
import { useState, type FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { HiLockClosed, HiUser, HiEye, HiEyeOff } from "react-icons/hi"
import { toaster } from "@/components/ui/toaster"
import SEO from "@/components/SEO"
import { apiService } from "@/services/api"
import { authUtils } from "@/utils/auth"

const MotionBox = motion(Box)

const AdminLoginPage = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  })
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    general: ""
  })

  const validateForm = (): boolean => {
    const newErrors = {
      username: "",
      password: "",
      general: ""
    }
    let isValid = true

    if (!formData.username.trim()) {
      newErrors.username = "Username is required"
      isValid = false
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
      isValid = false
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    // Clear previous errors
    setErrors({ username: "", password: "", general: "" })
    
    // Validate form
    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // Call the actual login API
      const response = await apiService.login({
        username: formData.username.trim(),
        password: formData.password
      })

      if (response.success && response.data) {
        // Store authentication data securely
        authUtils.setAuth({
          token: response.data.token,
          user_id: response.data.user_id,
          username: response.data.username
        })
        
        toaster.create({
          title: "Login Successful",
          description: `Welcome back, ${response.data.username}!`,
          type: "success",
          duration: 3000,
        })
        
        // Navigate to dashboard
        navigate("/ioxet-labs-admin/dashboard")
      } else {
        throw new Error(response.message || "Login failed")
      }
    } catch (error) {
      console.error("Login error:", error)
      
      const errorMessage = error instanceof Error 
        ? error.message 
        : "An unexpected error occurred. Please try again."
      
      setErrors({
        ...errors,
        general: errorMessage
      })
      
      toaster.create({
        title: "Login Failed",
        description: errorMessage,
        type: "error",
        duration: 5000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    
    setFormData({
      ...formData,
      [name]: value
    })
    
    // Clear error for this field when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: ""
      })
    }
  }

  return (
    <>
      <SEO 
        title="Admin Login - IOXET Labs"
        description="Secure admin portal for IOXET content management"
      />
      
      <Box
        minH="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="linear-gradient(135deg, #165e96 0%, #1b75bb 100%)"
        position="relative"
        overflow="hidden"
      >
        {/* Animated Background Elements */}
        <Box
          position="absolute"
          top="-10%"
          right="-5%"
          w="400px"
          h="400px"
          bg="rgba(255, 255, 255, 0.05)"
          borderRadius="50%"
          filter="blur(80px)"
          animation="float 20s ease-in-out infinite"
        />
        <Box
          position="absolute"
          bottom="-10%"
          left="-5%"
          w="300px"
          h="300px"
          bg="rgba(255, 255, 255, 0.05)"
          borderRadius="50%"
          filter="blur(80px)"
          animation="float 15s ease-in-out infinite reverse"
        />

        <Container maxW="md" position="relative" zIndex={1}>
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Box
              bg="white"
              borderRadius="2xl"
              p={{ base: 8, md: 10 }}
              shadow="2xl"
              border="1px solid"
              borderColor="gray.100"
            >
              {/* Logo/Header */}
              <VStack gap={6} mb={8}>
                <Box
                  w="80px"
                  h="80px"
                  bg="primary.50"
                  borderRadius="xl"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  mb={2}
                >
                  <Icon as={HiLockClosed} fontSize="3xl" color="primary.500" />
                </Box>
                
                <VStack gap={2}>
                  <Heading
                    fontSize={{ base: "2xl", md: "3xl" }}
                    fontWeight="700"
                    color="neutral.900"
                    textAlign="center"
                  >
                    Admin Portal
                  </Heading>
                  <Text
                    fontSize="md"
                    color="neutral.600"
                    textAlign="center"
                  >
                    Sign in to manage your content
                  </Text>
                </VStack>
              </VStack>

              {/* Login Form */}
              <form onSubmit={handleSubmit}>
                <VStack gap={5} align="stretch">
                  {/* General Error Message */}
                  {errors.general && (
                    <Box
                      p={3}
                      bg="red.50"
                      borderRadius="lg"
                      border="1px solid"
                      borderColor="red.200"
                    >
                      <Text fontSize="sm" color="red.700" fontWeight="500">
                        {errors.general}
                      </Text>
                    </Box>
                  )}

                  {/* Username Field */}
                  <Box>
                    <Text
                      mb={2}
                      fontSize="sm"
                      fontWeight="600"
                      color="neutral.700"
                    >
                      Username
                    </Text>
                    <Box position="relative">
                      <Icon
                        as={HiUser}
                        position="absolute"
                        left="14px"
                        top="50%"
                        transform="translateY(-50%)"
                        color="neutral.400"
                        fontSize="lg"
                        zIndex={1}
                      />
                      <Input
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        placeholder="Enter your username"
                        size="lg"
                        pl="44px"
                        bg="neutral.50"
                        border="1px solid"
                        borderColor={errors.username ? "red.500" : "neutral.300"}
                        _hover={{ borderColor: errors.username ? "red.600" : "neutral.400" }}
                        _focus={{
                          borderColor: errors.username ? "red.500" : "primary.500",
                          boxShadow: errors.username 
                            ? "0 0 0 1px var(--chakra-colors-red-500)" 
                            : "0 0 0 1px var(--chakra-colors-primary-500)",
                          bg: "white"
                        }}
                        required
                        autoComplete="username"
                      />
                    </Box>
                    {errors.username && (
                      <Text fontSize="xs" color="red.500" mt={1} ml={1}>
                        {errors.username}
                      </Text>
                    )}
                  </Box>

                  {/* Password Field */}
                  <Box>
                    <Text
                      mb={2}
                      fontSize="sm"
                      fontWeight="600"
                      color="neutral.700"
                    >
                      Password
                    </Text>
                    <Box position="relative">
                      <Icon
                        as={HiLockClosed}
                        position="absolute"
                        left="14px"
                        top="50%"
                        transform="translateY(-50%)"
                        color="neutral.400"
                        fontSize="lg"
                        zIndex={1}
                      />
                      <Input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Enter your password"
                        size="lg"
                        pl="44px"
                        pr="44px"
                        bg="neutral.50"
                        border="1px solid"
                        borderColor={errors.password ? "red.500" : "neutral.300"}
                        _hover={{ borderColor: errors.password ? "red.600" : "neutral.400" }}
                        _focus={{
                          borderColor: errors.password ? "red.500" : "primary.500",
                          boxShadow: errors.password 
                            ? "0 0 0 1px var(--chakra-colors-red-500)" 
                            : "0 0 0 1px var(--chakra-colors-primary-500)",
                          bg: "white"
                        }}
                        required
                        autoComplete="current-password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        position="absolute"
                        right="4px"
                        top="50%"
                        transform="translateY(-50%)"
                        onClick={() => setShowPassword(!showPassword)}
                        size="sm"
                        minW="auto"
                        h="auto"
                        p={2}
                        _hover={{ bg: "transparent" }}
                      >
                        <Icon
                          as={showPassword ? HiEyeOff : HiEye}
                          color="neutral.500"
                          fontSize="lg"
                        />
                      </Button>
                    </Box>
                    {errors.password && (
                      <Text fontSize="xs" color="red.500" mt={1} ml={1}>
                        {errors.password}
                      </Text>
                    )}
                  </Box>

                  {/* Remember Me & Forgot Password */}
                  <HStack justify="space-between" fontSize="sm">
                    <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                      <input
                        type="checkbox"
                        style={{
                          width: "16px",
                          height: "16px",
                          accentColor: "#165e96",
                          cursor: "pointer"
                        }}
                      />
                      <Text color="neutral.600" fontWeight="500">Remember me</Text>
                    </label>
                    <Text
                      color="primary.500"
                      fontWeight="600"
                      cursor="pointer"
                      _hover={{ color: "primary.600", textDecoration: "underline" }}
                    >
                      Forgot password?
                    </Text>
                  </HStack>

                  {/* Login Button */}
                  <Button
                    type="submit"
                    size="lg"
                    w="full"
                    bg="primary.500"
                    color="white"
                    fontWeight="600"
                    loading={isLoading}
                    loadingText="Signing in..."
                    _hover={{
                      bg: "primary.600",
                      transform: "translateY(-2px)",
                      shadow: "lg"
                    }}
                    _active={{
                      transform: "translateY(0)",
                    }}
                    transition="all 0.3s ease"
                    mt={2}
                  >
                    Sign In
                  </Button>

                  {/* Divider */}
                  <HStack gap={4} my={2}>
                    <Box flex={1} h="1px" bg="neutral.200" />
                    <Text fontSize="sm" color="neutral.500" fontWeight="500">
                      OR
                    </Text>
                    <Box flex={1} h="1px" bg="neutral.200" />
                  </HStack>

                  {/* Demo Credentials */}
                  <Box
                    p={4}
                    bg="blue.50"
                    borderRadius="lg"
                    border="1px solid"
                    borderColor="blue.200"
                  >
                    <Text fontSize="sm" color="blue.900" fontWeight="600" mb={2}>
                      🔑 Demo Credentials
                    </Text>
                    <VStack gap={1} align="start">
                      <Text fontSize="xs" color="blue.800">
                        <strong>Username:</strong> admin
                      </Text>
                      <Text fontSize="xs" color="blue.800">
                        <strong>Password:</strong> admin123
                      </Text>
                    </VStack>
                  </Box>
                </VStack>
              </form>
            </Box>

            {/* Footer Text */}
            <Text
              mt={6}
              textAlign="center"
              fontSize="sm"
              color="white"
              opacity={0.9}
            >
              © {new Date().getFullYear()} IOXET Labs. All rights reserved.
            </Text>
          </MotionBox>
        </Container>
      </Box>

      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
        `}
      </style>
    </>
  )
}

export default AdminLoginPage
