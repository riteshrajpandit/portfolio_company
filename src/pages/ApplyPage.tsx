import {
  Box,
  Container,
  Text,
  Button,
  VStack,
  HStack,
  Input,
  Textarea,
  Grid,
  Icon,
  Badge,
  Link as ChakraLink,
  Spinner,
  Center,
} from "@chakra-ui/react"
import { Link, useSearchParams, useNavigate, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import {
  HiArrowLeft,
  HiBriefcase,
  HiMapPin,
  HiClock,
  HiAcademicCap,
  HiCheckCircle,
  HiCloudArrowUp,
  HiDocumentText,
  HiXCircle,
} from "react-icons/hi2"
import { Field } from "@/components/ui/field"
import { Toaster, toaster } from "@/components/ui/toaster"
import { trackCareerApplication } from "@/utils/analytics"
import { apiService, type Career } from "@/services/api"

const MotionBox = motion(Box)

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  location: string
  linkedIn: string
  portfolio: string
  coverLetter: string
  experience: string
  noticePeriod: string
  expectedSalary: string
}

export const ApplyPage = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()
  const positionId = searchParams.get("position")
  const positionTitle = searchParams.get("title")
  
  // State for job details
  const [job, setJob] = useState<Career | null>(() => {
    if (location.state?.job && location.state.job.id.toString() === positionId) {
      return location.state.job
    }
    return null
  })
  const [isLoadingJob, setIsLoadingJob] = useState(!job)

  // Fetch job details on component mount
  useEffect(() => {
    const fetchJob = async () => {
      if (!positionId) {
        setIsLoadingJob(false)
        return
      }

      // If we already have the job from state, don't fetch
      if (job && job.id.toString() === positionId) {
        setIsLoadingJob(false)
        return
      }

      try {
        setIsLoadingJob(true)
        const response = await apiService.getCareers()
        const foundJob = response.data.find((j: Career) => j.id === parseInt(positionId))
        setJob(foundJob || null)
      } catch (error) {
        toaster.create({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to fetch job details",
          type: "error",
          duration: 3000,
        })
      } finally {
        setIsLoadingJob(false)
      }
    }

    fetchJob()
  }, [positionId])

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    linkedIn: "",
    portfolio: "",
    coverLetter: "",
    experience: "",
    noticePeriod: "",
    expectedSalary: "",
  })

  const [resume, setResume] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Partial<FormData>>({})

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ]
      
      if (!allowedTypes.includes(file.type)) {
        toaster.create({
          title: "Invalid file type",
          description: "Please upload a PDF or Word document",
          type: "error",
          duration: 5000,
        })
        return
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toaster.create({
          title: "File too large",
          description: "Please upload a file smaller than 5MB",
          type: "error",
          duration: 5000,
        })
        return
      }

      setResume(file)
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}

    // First Name validation - only letters, spaces, hyphens
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required"
    } else if (!/^[a-zA-Z\s-]+$/.test(formData.firstName.trim())) {
      newErrors.firstName = "First name should only contain letters"
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = "First name must be at least 2 characters"
    } else if (formData.firstName.trim().length > 50) {
      newErrors.firstName = "First name must be less than 50 characters"
    }

    // Last Name validation - only letters, spaces, hyphens
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required"
    } else if (!/^[a-zA-Z\s-]+$/.test(formData.lastName.trim())) {
      newErrors.lastName = "Last name should only contain letters"
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters"
    } else if (formData.lastName.trim().length > 50) {
      newErrors.lastName = "Last name must be less than 50 characters"
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address"
    } else if (formData.email.trim().length > 254) {
      newErrors.email = "Email address is too long"
    }

    // Phone Number validation - flexible format but must contain digits
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else {
      // Remove all non-digit characters for validation
      const digitsOnly = formData.phone.replace(/\D/g, '')
      if (digitsOnly.length < 10) {
        newErrors.phone = "Phone number must have at least 10 digits"
      } else if (digitsOnly.length > 15) {
        newErrors.phone = "Phone number must have at most 15 digits"
      } else if (!/^[0-9+\s()-]+$/.test(formData.phone.trim())) {
        newErrors.phone = "Phone number contains invalid characters"
      }
    }

    // Location validation
    if (!formData.location.trim()) {
      newErrors.location = "Location is required"
    } else if (formData.location.trim().length < 3) {
      newErrors.location = "Location must be at least 3 characters"
    } else if (formData.location.trim().length > 100) {
      newErrors.location = "Location must be less than 100 characters"
    } else if (!/^[a-zA-Z\s,.-]+$/.test(formData.location.trim())) {
      newErrors.location = "Location should only contain letters, spaces, and basic punctuation"
    }

    // LinkedIn Profile validation (optional)
    if (formData.linkedIn.trim()) {
      const linkedInPattern = /^(https?:\/\/)?(www\.)?(linkedin\.com\/in\/[a-zA-Z0-9_-]+|linkedin\.com\/company\/[a-zA-Z0-9_-]+)\/?$/
      if (!linkedInPattern.test(formData.linkedIn.trim())) {
        newErrors.linkedIn = "Please enter a valid LinkedIn profile URL (e.g., https://linkedin.com/in/username)"
      }
    }

    // Portfolio/Website validation (optional)
    if (formData.portfolio.trim()) {
      try {
        const url = new URL(formData.portfolio.trim())
        if (!['http:', 'https:'].includes(url.protocol)) {
          newErrors.portfolio = "Portfolio URL must use http:// or https://"
        }
      } catch {
        newErrors.portfolio = "Please enter a valid URL (e.g., https://yourportfolio.com)"
      }
    }

    // Years of Experience validation (optional, must be integer if provided)
    if (formData.experience.trim()) {
      const experienceNum = parseInt(formData.experience.trim(), 10)
      if (isNaN(experienceNum)) {
        newErrors.experience = "Experience must be a number"
      } else if (experienceNum < 0) {
        newErrors.experience = "Experience cannot be negative"
      } else if (experienceNum > 50) {
        newErrors.experience = "Experience seems unrealistic (max 50 years)"
      } else if (formData.experience.trim() !== experienceNum.toString()) {
        newErrors.experience = "Experience must be a whole number (e.g., 5)"
      }
    }

    // Notice Period validation (optional)
    if (formData.noticePeriod.trim() && formData.noticePeriod.trim().length > 50) {
      newErrors.noticePeriod = "Notice period must be less than 50 characters"
    }

    // Expected Salary validation (optional)
    if (formData.expectedSalary.trim()) {
      // Remove currency symbols and commas for validation
      const salaryText = formData.expectedSalary.trim().replace(/[Rs.,\s]/g, '')
      if (!/^\d+$/.test(salaryText)) {
        newErrors.expectedSalary = "Salary should contain only numbers (e.g., Rs.80,000 or 80000)"
      } else if (formData.expectedSalary.trim().length > 20) {
        newErrors.expectedSalary = "Salary format is too long"
      }
    }

    // Cover Letter validation
    if (!formData.coverLetter.trim()) {
      newErrors.coverLetter = "Cover letter is required"
    } else if (formData.coverLetter.trim().length < 50) {
      newErrors.coverLetter = "Cover letter must be at least 50 characters"
    } else if (formData.coverLetter.trim().length > 2000) {
      newErrors.coverLetter = "Cover letter must be less than 2000 characters"
    }

    // Resume validation
    if (!resume) {
      toaster.create({
        title: "Resume required",
        description: "Please upload your resume to continue",
        type: "error",
        duration: 5000,
      })
      setErrors(newErrors)
      return false
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Create FormData for file upload
      const applicationData = new FormData()
      applicationData.append('first_name', formData.firstName)
      applicationData.append('last_name', formData.lastName)
      applicationData.append('email', formData.email)
      applicationData.append('phone_number', formData.phone)
      applicationData.append('current_location', formData.location)
      applicationData.append('cover_letter', formData.coverLetter)
      
      // Optional fields
      if (formData.linkedIn) applicationData.append('linkedin_profile', formData.linkedIn)
      if (formData.portfolio) applicationData.append('portfolio_website', formData.portfolio)
      if (formData.experience) applicationData.append('years_of_experience', formData.experience)
      if (formData.noticePeriod) applicationData.append('notice_period', formData.noticePeriod)
      if (formData.expectedSalary) applicationData.append('expected_salary', formData.expectedSalary)
      
      // Resume file
      if (resume) {
        applicationData.append('resume', resume)
      }

      // Submit to backend
      await apiService.applyForJob(applicationData)
      
      // Track application submission in Google Analytics
      trackCareerApplication(job?.job_name || positionTitle || "Unknown Position")

      toaster.create({
        title: "Application submitted successfully!",
        description: "We'll review your application and get back to you soon.",
        type: "success",
        duration: 5000,
      })

      // Redirect to careers page after successful submission
      setTimeout(() => {
        navigate("/careers")
      }, 2000)
    } catch (error) {
      toaster.create({
        title: "Submission failed",
        description: error instanceof Error ? error.message : "Please try again later or contact us directly.",
        type: "error",
        duration: 5000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Box>
      <Toaster />
      
      {/* Loading State */}
      {isLoadingJob ? (
        <Center minH="100vh">
          <Spinner size="xl" color="primary.500" />
        </Center>
      ) : (
        <>
          {/* Hero Section */}
          <Box bg="neutral.50" pt={40} pb={12}>
            <Container maxW="5xl">
              <MotionBox
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* Back Button */}
                <Link to="/careers" style={{ textDecoration: 'none' }}>
                  <HStack
                    gap={2}
                    color="primary.500"
                    mb={6}
                    _hover={{ color: "primary.600" }}
                    transition="color 0.2s ease"
                    cursor="pointer"
                    w="fit-content"
                  >
                    <Icon as={HiArrowLeft} fontSize="lg" />
                    <Text fontSize="sm" fontWeight="600">Back to Careers</Text>
                  </HStack>
                </Link>

                {/* Job Header */}
                <VStack align="start" gap={4} mb={6}>
                  <Text
                    fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                    fontWeight="700"
                    lineHeight="1.1"
                    color="text"
                  >
                    Apply for {positionTitle || job?.job_name || "Position"}
                  </Text>
                  
                  {job && (
                    <HStack gap={4} wrap="wrap">
                  <Badge
                    colorScheme="blue"
                    px={3}
                    py={1}
                    borderRadius="full"
                    fontSize="sm"
                  >
                    <HStack gap={1}>
                      <Icon as={HiBriefcase} fontSize="sm" />
                      <Text>{job.department_name}</Text>
                    </HStack>
                  </Badge>
                  <Badge
                    colorScheme="green"
                    px={3}
                    py={1}
                    borderRadius="full"
                    fontSize="sm"
                  >
                    <HStack gap={1}>
                      <Icon as={HiMapPin} fontSize="sm" />
                      <Text>{job.location || (job.job_type === 'remote' ? 'Remote' : 'On-site')}</Text>
                    </HStack>
                  </Badge>
                  <Badge
                    colorScheme="purple"
                    px={3}
                    py={1}
                    borderRadius="full"
                    fontSize="sm"
                  >
                    <HStack gap={1}>
                      <Icon as={HiClock} fontSize="sm" />
                      <Text>{job.job_type === 'full_time' ? 'Full-time' : job.job_type === 'part_time' ? 'Part-time' : job.job_type === 'freelance' ? 'Freelance' : 'Remote'}</Text>
                    </HStack>
                  </Badge>
                  <Badge
                    colorScheme="orange"
                    px={3}
                    py={1}
                    borderRadius="full"
                    fontSize="sm"
                  >
                    <HStack gap={1}>
                      <Icon as={HiAcademicCap} fontSize="sm" />
                      <Text>{job.experience_level}</Text>
                    </HStack>
                  </Badge>
                </HStack>
              )}
            </VStack>
          </MotionBox>
        </Container>
      </Box>

      {/* Application Form Section */}
      <Container maxW="5xl" py={{ base: 12, md: 16 }}>
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit}>
            <VStack gap={8} align="stretch">
              {/* Personal Information */}
              <Box
                p={8}
                bg="white"
                borderRadius="2xl"
                border="1px solid"
                borderColor="gray.200"
                shadow="sm"
              >
                <Text fontSize="2xl" fontWeight="700" color="text" mb={6}>
                  Personal Information
                </Text>
                
                <Grid
                  templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                  gap={6}
                >
                  <Field
                    label="First Name"
                    required
                    invalid={!!errors.firstName}
                    errorText={errors.firstName}
                  >
                    <Input
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      size="lg"
                      borderRadius="lg"
                    />
                  </Field>

                  <Field
                    label="Last Name"
                    required
                    invalid={!!errors.lastName}
                    errorText={errors.lastName}
                  >
                    <Input
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      size="lg"
                      borderRadius="lg"
                    />
                  </Field>

                  <Field
                    label="Email Address"
                    required
                    invalid={!!errors.email}
                    errorText={errors.email}
                  >
                    <Input
                      type="email"
                      placeholder="john.doe@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      size="lg"
                      borderRadius="lg"
                    />
                  </Field>

                  <Field
                    label="Phone Number"
                    required
                    invalid={!!errors.phone}
                    errorText={errors.phone}
                  >
                    <Input
                      type="tel"
                      placeholder="+977 9851161116"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      size="lg"
                      borderRadius="lg"
                    />
                  </Field>

                  <Field
                    label="Current Location"
                    required
                    invalid={!!errors.location}
                    errorText={errors.location}
                  >
                    <Input
                      placeholder="City, Country"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      size="lg"
                      borderRadius="lg"
                    />
                  </Field>

                  <Field
                    label="LinkedIn Profile"
                    helperText="Optional - Enter full URL"
                    invalid={!!errors.linkedIn}
                    errorText={errors.linkedIn}
                  >
                    <Input
                      placeholder="https://linkedin.com/in/yourprofile"
                      value={formData.linkedIn}
                      onChange={(e) => handleInputChange("linkedIn", e.target.value)}
                      size="lg"
                      borderRadius="lg"
                    />
                  </Field>
                </Grid>
              </Box>

              {/* Professional Information */}
              <Box
                p={8}
                bg="white"
                borderRadius="2xl"
                border="1px solid"
                borderColor="gray.200"
                shadow="sm"
              >
                <Text fontSize="2xl" fontWeight="700" color="text" mb={6}>
                  Professional Information
                </Text>
                
                <VStack gap={6} align="stretch">
                  <Field
                    label="Portfolio/Website"
                    helperText="Optional - Link to your portfolio, GitHub, or personal website"
                    invalid={!!errors.portfolio}
                    errorText={errors.portfolio}
                  >
                    <Input
                      placeholder="https://yourportfolio.com"
                      value={formData.portfolio}
                      onChange={(e) => handleInputChange("portfolio", e.target.value)}
                      size="lg"
                      borderRadius="lg"
                    />
                  </Field>

                  <Grid
                    templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
                    gap={6}
                  >
                    <Field
                      label="Years of Experience"
                      helperText="Enter number only (e.g., 5)"
                      invalid={!!errors.experience}
                      errorText={errors.experience}
                    >
                      <Input
                        type="number"
                        placeholder="e.g., 5"
                        value={formData.experience}
                        onChange={(e) => handleInputChange("experience", e.target.value)}
                        size="lg"
                        borderRadius="lg"
                        min="0"
                        max="50"
                      />
                    </Field>

                    <Field
                      label="Notice Period"
                      helperText="Optional"
                      invalid={!!errors.noticePeriod}
                      errorText={errors.noticePeriod}
                    >
                      <Input
                        placeholder="e.g., 2 weeks"
                        value={formData.noticePeriod}
                        onChange={(e) => handleInputChange("noticePeriod", e.target.value)}
                        size="lg"
                        borderRadius="lg"
                      />
                    </Field>

                    <Field
                      label="Expected Salary"
                      helperText="Optional - in NPR (e.g., Rs.80,000)"
                      invalid={!!errors.expectedSalary}
                      errorText={errors.expectedSalary}
                    >
                      <Input
                        placeholder="e.g., Rs.80,000 or 80000"
                        value={formData.expectedSalary}
                        onChange={(e) => handleInputChange("expectedSalary", e.target.value)}
                        size="lg"
                        borderRadius="lg"
                      />
                    </Field>
                  </Grid>

                  <Field
                    label="Cover Letter"
                    required
                    invalid={!!errors.coverLetter}
                    errorText={errors.coverLetter}
                    helperText="Tell us why you're a great fit for this position"
                  >
                    <Textarea
                      placeholder="I am writing to express my interest in..."
                      value={formData.coverLetter}
                      onChange={(e) => handleInputChange("coverLetter", e.target.value)}
                      rows={8}
                      size="lg"
                      borderRadius="lg"
                    />
                  </Field>
                </VStack>
              </Box>

              {/* Resume Upload */}
              <Box
                p={8}
                bg="white"
                borderRadius="2xl"
                border="1px solid"
                borderColor="gray.200"
                shadow="sm"
              >
                <Text fontSize="2xl" fontWeight="700" color="text" mb={6}>
                  Resume/CV
                </Text>
                
                <VStack gap={4} align="stretch">
                  <Box
                    position="relative"
                    border="2px dashed"
                    borderColor={resume ? "primary.300" : "gray.300"}
                    borderRadius="xl"
                    p={8}
                    bg={resume ? "primary.50" : "gray.50"}
                    transition="all 0.3s ease"
                    _hover={{
                      borderColor: "primary.400",
                      bg: resume ? "primary.100" : "gray.100"
                    }}
                  >
                    <Input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      position="absolute"
                      top={0}
                      left={0}
                      w="full"
                      h="full"
                      opacity={0}
                      cursor="pointer"
                    />
                    
                    <VStack gap={3}>
                      <Icon
                        as={resume ? HiCheckCircle : HiCloudArrowUp}
                        fontSize="4xl"
                        color={resume ? "primary.500" : "gray.400"}
                      />
                      {resume ? (
                        <>
                          <Text fontSize="lg" fontWeight="600" color="text">
                            {resume.name}
                          </Text>
                          <Text fontSize="sm" color="muted">
                            {(resume.size / 1024).toFixed(2)} KB
                          </Text>
                          <Button
                            size="sm"
                            variant="outline"
                            colorScheme="red"
                            onClick={(e) => {
                              e.stopPropagation()
                              setResume(null)
                            }}
                          >
                            <Icon as={HiXCircle} mr={2} />
                            Remove File
                          </Button>
                        </>
                      ) : (
                        <>
                          <Text fontSize="lg" fontWeight="600" color="text">
                            Click to upload or drag and drop
                          </Text>
                          <Text fontSize="sm" color="muted">
                            PDF, DOC, or DOCX (max 5MB)
                          </Text>
                        </>
                      )}
                    </VStack>
                  </Box>

                  <HStack
                    gap={2}
                    p={3}
                    bg="blue.50"
                    borderRadius="lg"
                    borderLeft="4px solid"
                    borderColor="blue.400"
                  >
                    <Icon as={HiDocumentText} color="blue.600" fontSize="lg" />
                    <Text fontSize="sm" color="blue.800" lineHeight="1.6">
                      <strong>Tip:</strong> Make sure your resume is up-to-date and highlights relevant experience for this position.
                    </Text>
                  </HStack>
                </VStack>
              </Box>

              {/* Submit Section */}
              <Box
                p={8}
                bg="primary.50"
                borderRadius="2xl"
                border="1px solid"
                borderColor="primary.200"
              >
                <VStack gap={6}>
                  <VStack gap={2} textAlign="center">
                    <Text fontSize="lg" fontWeight="600" color="text">
                      Ready to join our team?
                    </Text>
                    <Text fontSize="sm" color="muted" maxW="2xl">
                      By submitting this application, you agree to our{" "}
                      <Link to="/privacy" style={{ display: 'inline' }}>
                        <ChakraLink
                          color="primary.500"
                          fontWeight="600"
                          textDecoration="underline"
                          _hover={{ color: "primary.600" }}
                        >
                          Privacy Policy
                        </ChakraLink>
                      </Link>
                      {" "}and{" "}
                      <Link to="/terms" style={{ display: 'inline' }}>
                        <ChakraLink
                          color="primary.500"
                          fontWeight="600"
                          textDecoration="underline"
                          _hover={{ color: "primary.600" }}
                        >
                          Terms of Service
                        </ChakraLink>
                      </Link>
                      .
                    </Text>
                  </VStack>

                  <HStack gap={4} justify="center" wrap="wrap">
                    <Button
                      type="submit"
                      size="lg"
                      colorScheme="primary"
                      bg="primary.500"
                      px={8}
                      py={6}
                      fontSize="lg"
                      fontWeight="600"
                      loading={isSubmitting}
                      loadingText="Submitting..."
                      _hover={{
                        transform: "translateY(-2px)",
                        shadow: "lg",
                        bg: "primary.600"
                      }}
                      transition="all 0.3s ease"
                    >
                      Submit Application
                    </Button>

                    <Link to="/careers" style={{ textDecoration: 'none' }}>
                      <Button
                        size="lg"
                        variant="outline"
                        borderColor="gray.300"
                        px={8}
                        py={6}
                        fontSize="lg"
                        fontWeight="600"
                        disabled={isSubmitting}
                        _hover={{
                          bg: "gray.50",
                          transform: "translateY(-2px)"
                        }}
                        transition="all 0.3s ease"
                      >
                        Cancel
                      </Button>
                    </Link>
                  </HStack>
                </VStack>
              </Box>
            </VStack>
          </form>
        </MotionBox>
      </Container>

      {/* Help Section */}
      <Box bg="neutral.50" py={{ base: 12, md: 16 }}>
        <Container maxW="5xl">
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Box
              p={8}
              bg="white"
              borderRadius="2xl"
              textAlign="center"
              shadow="sm"
            >
              <VStack gap={4}>
                <Text fontSize="2xl" fontWeight="700" color="text">
                  Need Help?
                </Text>
                <Text fontSize="md" color="muted" maxW="2xl" lineHeight="1.7">
                  If you have any questions about the application process or the position, 
                  feel free to reach out to our HR team.
                </Text>
                <Link to="/contact" style={{ textDecoration: 'none' }}>
                  <Button
                    size="lg"
                    variant="outline"
                    colorScheme="primary"
                    borderRadius="full"
                    px={8}
                    _hover={{
                      bg: "primary.50",
                      transform: "translateY(-2px)"
                    }}
                    transition="all 0.3s ease"
                  >
                    Contact HR Team
                  </Button>
                </Link>
              </VStack>
            </Box>
          </MotionBox>
        </Container>
      </Box>
        </>
      )}
    </Box>
  )
}

export default ApplyPage
