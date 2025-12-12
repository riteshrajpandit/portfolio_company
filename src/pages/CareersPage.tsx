import {
  Box,
  Container,
  Text,
  Button,
  VStack,
  HStack,
  Grid,
  Badge,
  Icon,
  Flex,
  Wrap,
  WrapItem,
  Spinner,
  Center,
} from "@chakra-ui/react"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { useState, useEffect, useMemo } from "react"
import {
  HiArrowRight,
  HiMapPin,
  HiCurrencyDollar,
  HiAcademicCap,
  HiCalendarDays,
  HiBriefcase,
  HiComputerDesktop,
  HiUserGroup,
  HiChartBar
} from "react-icons/hi2"
import { apiService, type Career } from "@/services/api"
import { toaster } from "@/components/ui/toaster"

// Department configuration for styling
const departmentConfig: Record<string, { icon: any, color: string }> = {
  "Engineering": { icon: HiComputerDesktop, color: "blue" },
  "Design": { icon: HiComputerDesktop, color: "pink" },
  "Product": { icon: HiComputerDesktop, color: "orange" },
  "Sales": { icon: HiChartBar, color: "purple" },
  "Marketing": { icon: HiChartBar, color: "cyan" },
  "HR": { icon: HiUserGroup, color: "green" },
  "Finance": { icon: HiUserGroup, color: "teal" },
  "Operations": { icon: HiUserGroup, color: "yellow" }
}

const getDepartmentStyle = (name: string) => {
  return departmentConfig[name] || { icon: HiBriefcase, color: "gray" }
}

const benefits = [
  {
    icon: HiCurrencyDollar,
    title: "Competitive Salary",
    description: "Market-leading compensation packages with equity options"
  },
  {
    icon: HiAcademicCap,
    title: "Learning & Development",
    description: "Annual learning budget and conference attendance"
  },
  {
    icon: HiCalendarDays,
    title: "Flexible PTO",
    description: "Unlimited vacation policy and flexible working hours"
  },
  {
    icon: HiMapPin,
    title: "Remote First",
    description: "Work from anywhere with optional office access"
  }
]

const MotionBox = motion(Box)
const MotionContainer = motion(Container)

// Helper function to get job type label
const getJobTypeLabel = (type: string): string => {
  const types: Record<string, string> = {
    full_time: "Full-time",
    part_time: "Part-time",
    freelance: "Freelance",
    remote: "Remote",
  }
  return types[type] || type
}

// Helper function to get remote mode label
const getRemoteModeLabel = (mode: string | null | undefined): string => {
  if (!mode) return "Onsite"
  const modes: Record<string, string> = {
    onsite: "Onsite",
    hybrid: "Hybrid",
  }
  return modes[mode] || mode
}

export const CareersPage = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [jobs, setJobs] = useState<Career[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Fetch jobs on component mount
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true)
        const response = await apiService.getCareers()
        // Filter out expired jobs
        const activeJobs = response.data.filter((job: Career) => !job.expire)
        setJobs(activeJobs)
      } catch (error) {
        toaster.create({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to fetch jobs",
          type: "error",
          duration: 3000,
        })
        setJobs([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchJobs()
  }, [])

  // Derive unique departments from jobs
  const uniqueDepartments = useMemo(() => {
    const depts = new Set(jobs.map(job => job.department_name))
    return Array.from(depts).sort()
  }, [jobs])

  const filteredPositions = selectedDepartment === "all" 
    ? jobs 
    : jobs.filter(job => job.department_name === selectedDepartment)

  const navigate = useNavigate()

  const handleApplyClick = (job: Career) => {
    // Redirect to apply page with job details
    navigate(`/apply?position=${job.id}&title=${encodeURIComponent(job.job_name)}`, {
      state: { job }
    })
  }
  return (
    <Box>
      {/* Hero Section */}
      <Box bg="neutral.50" pt={40} pb={16}>
        <Container maxW="7xl">
          <MotionContainer
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            textAlign="center"
            maxW="4xl"
            mx="auto"
          >
            <Text
              fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
              fontWeight="700"
              lineHeight="1.1"
              color="text"
              mb={6}
            >
              Join Our{" "}
              <Text as="span" color="primary.500">
                Growing Team
              </Text>
            </Text>
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color="muted"
              lineHeight="1.7"
              maxW="3xl"
              mx="auto"
              mb={8}
            >
              We're always looking for talented individuals who share our passion for innovation and excellence. 
              Be part of a team that's shaping the future of digital solutions.
            </Text>
            <HStack justify="center" gap={4} wrap="wrap">
              <Link to="#open-positions" style={{ textDecoration: 'none' }}>
                <Button
                  size="lg"
                  colorScheme="primary"
                  borderRadius="full"
                  px={8}
                  fontWeight="600"
                  _hover={{ transform: "translateY(-2px)", shadow: "lg" }}
                  transition="all 0.3s ease"
                >
                  View Open Positions <HiArrowRight style={{ marginLeft: '8px' }} />
                </Button>
              </Link>
              <Link to="/about" style={{ textDecoration: 'none' }}>
                <Button
                  size="lg"
                  variant="outline"
                  borderColor="primary.500"
                  color="primary.500"
                  borderRadius="full"
                  px={8}
                  fontWeight="600"
                  _hover={{ bg: "primary.50", transform: "translateY(-2px)" }}
                  transition="all 0.3s ease"
                >
                  Learn About Us
                </Button>
              </Link>
            </HStack>
          </MotionContainer>
        </Container>
      </Box>



      {/* Open Positions Section */}
      <Box id="open-positions" py={{ base: 16, md: 20 }} bg="neutral.100">
        <Container maxW="7xl">
          {/* Header with Department Filter Tags */}
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            mb={12}
          >
            <Flex 
              direction={{ base: "column", lg: "row" }} 
              justify="space-between" 
              align={{ base: "center", lg: "flex-start" }}
              gap={6}
              mb={8}
            >
              {/* Left side - Title and Description */}
              <VStack align={{ base: "center", lg: "start" }} gap={4} flex={1}>
                <Text 
                  fontSize={{ base: "3xl", md: "4xl" }} 
                  fontWeight="700" 
                  color="text"
                  textAlign={{ base: "center", lg: "left" }}
                >
                  Open Positions
                </Text>
                <Text 
                  fontSize={{ base: "md", md: "lg" }} 
                  color="muted" 
                  textAlign={{ base: "center", lg: "left" }}
                  maxW="500px"
                >
                  Find the perfect role to advance your career and make an impact with cutting-edge technologies.
                </Text>
              </VStack>

              {/* Right side - Department Filter Tags */}
              <VStack align={{ base: "center", lg: "end" }} gap={4}>
                <Text 
                  fontSize="sm" 
                  fontWeight="600" 
                  color="muted" 
                  textTransform="uppercase" 
                  letterSpacing="wide"
                >
                  Filter by Department
                </Text>
                <Wrap justify={{ base: "center", lg: "end" }} gap={3}>
                  {/* All Positions Button */}
                  <WrapItem>
                    <Button
                      size="sm"
                      variant={selectedDepartment === "all" ? "solid" : "outline"}
                      colorScheme={selectedDepartment === "all" ? "gray" : "gray"}
                      borderRadius="full"
                      onClick={() => setSelectedDepartment("all")}
                      fontWeight="600"
                      transition="all 0.3s ease"
                      _hover={{
                        transform: "translateY(-1px)",
                        shadow: "sm"
                      }}
                    >
                      <HStack gap={2}>
                        <Icon as={HiBriefcase} fontSize="sm" />
                        <Text>All Positions</Text>
                      </HStack>
                    </Button>
                  </WrapItem>

                  {/* Dynamic Department Buttons */}
                  {uniqueDepartments.map((deptName) => {
                    const style = getDepartmentStyle(deptName)
                    return (
                      <WrapItem key={deptName}>
                        <Button
                          size="sm"
                          variant={selectedDepartment === deptName ? "solid" : "outline"}
                          colorScheme={selectedDepartment === deptName ? style.color : "gray"}
                          borderRadius="full"
                          onClick={() => setSelectedDepartment(deptName)}
                          fontWeight="600"
                          transition="all 0.3s ease"
                          _hover={{
                            transform: "translateY(-1px)",
                            shadow: "sm"
                          }}
                        >
                          <HStack gap={2}>
                            <Icon as={style.icon} fontSize="sm" />
                            <Text>{deptName}</Text>
                          </HStack>
                        </Button>
                      </WrapItem>
                    )
                  })}
                </Wrap>
                
                {/* Positions Count */}
                <Text fontSize="sm" color="muted" textAlign={{ base: "center", lg: "right" }}>
                  Showing <Text as="span" fontWeight="600" color="primary.500">
                    {filteredPositions.length}
                  </Text> position{filteredPositions.length !== 1 ? 's' : ''} 
                  {selectedDepartment !== "all" && (
                    <Text as="span">
                      {" "}in <Text as="span" fontWeight="600" color="primary.500">
                        {selectedDepartment}
                      </Text>
                    </Text>
                  )}
                </Text>
              </VStack>
            </Flex>
          </MotionBox>

          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {isLoading ? (
              <Center py={20}>
                <Spinner size="xl" color="primary.500" />
              </Center>
            ) : filteredPositions.length > 0 ? (
              <VStack gap={6} align="stretch">
                {filteredPositions.map((position, index) => (
                  <MotionBox
                    key={position.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Box
                      bg="white"
                      p={8}
                      borderRadius="xl"
                      shadow="sm"
                      border="1px"
                      borderColor="gray.200"
                      _hover={{ shadow: "md", transform: "translateY(-2px)" }}
                      transition="all 0.3s ease"
                    >
                      <VStack align="start" gap={6}>
                        <VStack align="start" gap={3} w="full">
                          <HStack justify="space-between" w="full" align="start">
                            <VStack align="start" gap={1}>
                              <Text fontSize="xl" fontWeight="700" color="text">
                                {position.job_name}
                              </Text>
                              <HStack gap={3} wrap="wrap">
                                <Badge 
                                  colorScheme={getDepartmentStyle(position.department_name).color} 
                                  variant="subtle" 
                                  px={3} 
                                  py={1} 
                                  borderRadius="full"
                                >
                                  {position.department_name}
                                </Badge>
                                <Badge colorScheme="gray" variant="subtle" px={3} py={1} borderRadius="full">
                                  {getJobTypeLabel(position.job_type)}
                                </Badge>
                                {position.location && (
                                  <HStack gap={1}>
                                    <Icon as={HiMapPin} color="muted" fontSize="sm" />
                                    <Text fontSize="sm" color="muted">
                                      {position.location}
                                    </Text>
                                  </HStack>
                                )}
                                {position.job_type === 'remote' && position.remote_mode && (
                                  <Badge colorScheme="purple" variant="subtle" px={3} py={1} borderRadius="full">
                                    {getRemoteModeLabel(position.remote_mode)}
                                  </Badge>
                                )}
                                <HStack gap={1}>
                                  <Icon as={HiBriefcase} color="muted" fontSize="sm" />
                                  <Text fontSize="sm" color="muted">
                                    {position.experience_level}
                                  </Text>
                                </HStack>
                              </HStack>
                            </VStack>
                            <Button
                              colorScheme="primary"
                              variant="outline"
                              size="sm"
                              borderRadius="full"
                              _hover={{ bg: "primary.50" }}
                              onClick={() => handleApplyClick(position)}
                            >
                              Apply Now
                            </Button>
                          </HStack>
                          
                          <Text color="muted" lineHeight="1.6">
                            {position.description}
                          </Text>
                          
                          {position.requirements && (
                            <VStack align="start" gap={2} w="full">
                              <Text fontSize="sm" fontWeight="600" color="text">
                                Requirements:
                              </Text>
                              <VStack align="start" gap={1} pl={4}>
                                {position.requirements.split('\n').filter(req => req.trim()).map((req, reqIndex) => (
                                  <HStack key={reqIndex} gap={2} align="start">
                                    <Box w={1} h={1} bg="primary.500" borderRadius="full" mt={2} />
                                    <Text fontSize="sm" color="muted">
                                      {req.trim()}
                                    </Text>
                                  </HStack>
                                ))}
                              </VStack>
                            </VStack>
                          )}
                        </VStack>
                      </VStack>
                    </Box>
                  </MotionBox>
                ))}
              </VStack>
            ) : (
              <Box
                bg="white"
                p={12}
                borderRadius="xl"
                shadow="sm"
                border="1px"
                borderColor="gray.200"
                textAlign="center"
              >
                <VStack gap={6}>
                  <Text fontSize="6xl">😔</Text>
                  <VStack gap={3}>
                    <Text fontSize="2xl" fontWeight="700" color="text">
                      Sorry, No Vacancies Available
                    </Text>
                    <Text fontSize="lg" color="muted" maxW="md" lineHeight="1.6">
                      {selectedDepartment !== "all" 
                        ? `Currently, we don't have any open positions in ${departments.find(d => d.id === selectedDepartment)?.name}.`
                        : "We currently don't have any open positions."
                      } However, we're always looking for talented individuals to join our team.
                    </Text>
                  </VStack>
                  <Link to="/contact" style={{ textDecoration: 'none' }}>
                    <Button
                      colorScheme="primary"
                      size="lg"
                      borderRadius="full"
                      px={8}
                      py={6}
                      fontSize="md"
                      fontWeight="600"
                      _hover={{
                        transform: "translateY(-2px)",
                        shadow: "lg"
                      }}
                      transition="all 0.3s ease"
                    >
                      Get in Touch <HiArrowRight style={{ marginLeft: '8px' }} />
                    </Button>
                  </Link>
                  <Text fontSize="sm" color="muted">
                    Send us your resume and we'll keep you in mind for future opportunities
                  </Text>
                </VStack>
              </Box>
            )}
          </MotionBox>
        </Container>
      </Box>

            {/* Why Work With Us Section */}
      <Container maxW="7xl" py={{ base: 16, md: 20 }}>
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          textAlign="center"
          mb={12}
        >
          <Text fontSize={{ base: "3xl", md: "4xl" }} fontWeight="700" mb={4} color="text">
            Why Work With Us?
          </Text>
          <Text fontSize={{ base: "md", md: "xl" }} color="muted" maxW="2xl" mx="auto">
            We believe in creating an environment where our team can thrive, grow, and make a meaningful impact.
          </Text>
        </MotionBox>

        {/* Benefits */}
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={6}>
          {benefits.map((benefit, index) => (
            <MotionBox
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <VStack
                gap={4}
                p={6}
                bg="white"
                borderRadius="xl"
                shadow="sm"
                border="1px"
                borderColor="gray.200"
                textAlign="center"
                _hover={{ shadow: "md", transform: "translateY(-2px)" }}
                transition="all 0.3s ease"
                h="full"
              >
                <Box
                  p={3}
                  bg="primary.50"
                  borderRadius="lg"
                  color="primary.500"
                  fontSize="xl"
                >
                  <Icon as={benefit.icon} />
                </Box>
                <VStack gap={2}>
                  <Text fontSize="lg" fontWeight="600" color="text">
                    {benefit.title}
                  </Text>
                  <Text fontSize="sm" color="muted" lineHeight="1.6">
                    {benefit.description}
                  </Text>
                </VStack>
              </VStack>
            </MotionBox>
          ))}
        </Grid>
      </Container>

      {/* Company Culture Section */}
      <Container maxW="7xl" py={{ base: 16, md: 20 }}>
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={12} alignItems="center">
            <VStack align="start" gap={6}>
              <VStack align="start" gap={4}>
                <Text fontSize="sm" color="primary.500" fontWeight="600" textTransform="uppercase">
                  Our Culture
                </Text>
                <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="700" color="text">
                  Innovation Meets Collaboration
                </Text>
                <Text fontSize={{ base: "md", md: "lg" }} color="muted" lineHeight="1.7">
                  At IOXET, we foster a culture of continuous learning, open communication, and creative problem-solving. 
                  Our team is our greatest asset, and we invest in creating an environment where everyone can do their best work.
                </Text>
              </VStack>
              
              <VStack align="start" gap={3}>
                <HStack gap={2}>
                  <Box w={2} h={2} bg="primary.500" borderRadius="full" />
                  <Text fontSize="md" color="text" fontWeight="500">
                    Remote-first with flexible working arrangements
                  </Text>
                </HStack>
                <HStack gap={2}>
                  <Box w={2} h={2} bg="primary.500" borderRadius="full" />
                  <Text fontSize="md" color="text" fontWeight="500">
                    Opportunities for professional growth and skill development
                  </Text>
                </HStack>
                <HStack gap={2}>
                  <Box w={2} h={2} bg="primary.500" borderRadius="full" />
                  <Text fontSize="md" color="text" fontWeight="500">
                    Collaborative environment with cutting-edge technologies
                  </Text>
                </HStack>
                <HStack gap={2}>
                  <Box w={2} h={2} bg="primary.500" borderRadius="full" />
                  <Text fontSize="md" color="text" fontWeight="500">
                    Work-life balance with unlimited PTO policy
                  </Text>
                </HStack>
              </VStack>
            </VStack>

            <Box
              bg="primary.50"
              p={8}
              borderRadius="2xl"
              textAlign="center"
            >
              <VStack gap={6}>
                <Text fontSize="6xl">🚀</Text>
                <VStack gap={2}>
                  <Text fontSize="xl" fontWeight="700" color="text">
                    Ready to Launch Your Career?
                  </Text>
                  <Text color="muted" lineHeight="1.6">
                    Join a team that values innovation, creativity, and personal growth. 
                    Let's build something amazing together.
                  </Text>
                </VStack>
                <Button
                  colorScheme="primary"
                  size="lg"
                  borderRadius="full"
                  fontWeight="600"
                  _hover={{ transform: "translateY(-2px)", shadow: "lg" }}
                  transition="all 0.3s ease"
                >
                  Apply Now
                </Button>
              </VStack>
            </Box>
          </Grid>
        </MotionBox>
      </Container>

      {/* CTA Section */}
      <Box py={{ base: 16, md: 20 }} bg="neutral.50">
        <Container maxW="7xl">
          <MotionBox
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Box
              bg="primary.500"
              color="white"
              p={12}
              borderRadius="3xl"
              textAlign="center"
              bgGradient="linear(135deg, primary.500, primary.600)"
            >
              <VStack gap={6} maxW="3xl" mx="auto">
                <Text fontSize={{ base: "3xl", md: "4xl" }} fontWeight="700">
                  Don't See the Perfect Role?
                </Text>
                <Text fontSize="xl" opacity={0.9} lineHeight="1.6">
                  We're always interested in connecting with talented individuals. 
                  Send us your resume and let us know how you'd like to contribute to our mission.
                </Text>
                <HStack gap={4} wrap="wrap" justify="center">
                  <Link to="/contact" style={{ textDecoration: 'none' }}>
                    <Button
                      size="lg"
                      bg="white"
                      color="primary.600"
                      borderRadius="full"
                      px={8}
                      py={6}
                      fontSize="lg"
                      fontWeight="600"
                      _hover={{
                        transform: "translateY(-2px)",
                        shadow: "xl"
                      }}
                      transition="all 0.3s ease"
                    >
                      Get in Touch <HiArrowRight style={{ marginLeft: '8px' }} />
                    </Button>
                  </Link>
                  <Link to="/about" style={{ textDecoration: 'none' }}>
                    <Button
                      size="lg"
                      variant="outline"
                      borderColor="white"
                      color="white"
                      borderRadius="full"
                      px={8}
                      py={6}
                      fontSize="lg"
                      fontWeight="600"
                      _hover={{
                        bg: "whiteAlpha.200",
                        transform: "translateY(-2px)"
                      }}
                      transition="all 0.3s ease"
                    >
                      Learn More About Us
                    </Button>
                  </Link>
                </HStack>
              </VStack>
            </Box>
          </MotionBox>
        </Container>
      </Box>
    </Box>
  )
}

export default CareersPage
