import { Box, Container, Heading, Text, VStack, HStack, Button, Grid, Input, Flex, Badge } from "@chakra-ui/react"
import { useState } from "react"
import { motion } from "framer-motion"
import { HiCalculator, HiUsers, HiCurrencyDollar, HiShieldCheck, HiTrendingDown, HiCheckCircle } from "react-icons/hi"
import { HiSparkles } from "react-icons/hi2"
import SEO from "@/components/SEO"
import { Link } from "react-router-dom"
import { Field } from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"

const MotionBox = motion(Box)

interface CalculatorInputs {
  numberOfEmployees: number
  monthlySalary: number
  basePercentile: number
  ssfEnabled: boolean
  medicalInsurance: number
  medicalPremiumRate: number
  accidentInsurance: number
  accidentPremiumRate: number
}

const ROICalculatorPage = () => {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    numberOfEmployees: 3,
    monthlySalary: 20000,
    basePercentile: 62.25,
    ssfEnabled: true,
    medicalInsurance: 100000,
    medicalPremiumRate: 2.45,
    accidentInsurance: 100000,
    accidentPremiumRate: 0.25
  })
  const [showResults, setShowResults] = useState(false)

  const handleInputChange = (field: keyof CalculatorInputs, value: number | boolean) => {
    setInputs(prev => ({ ...prev, [field]: value }))
    setShowResults(false)
  }

  const calculateROI = () => {
    // Per Employee Annual Cost Calculation
    const annualBaseSalary = inputs.monthlySalary * 12
    const bonusAmount = inputs.monthlySalary * (inputs.basePercentile / 100)
    const totalSalary = annualBaseSalary + bonusAmount // 13 months
    
    const ssfCost = inputs.ssfEnabled 
      ? (inputs.monthlySalary * (inputs.basePercentile / 100) * 0.20 * 12) 
      : 0
    
    const medicalPremium = inputs.medicalInsurance * (inputs.medicalPremiumRate / 100)
    const accidentPremium = inputs.accidentInsurance * (inputs.accidentPremiumRate / 100)
    const totalInsurance = medicalPremium + accidentPremium
    
    const costPerEmployee = totalSalary + ssfCost + totalInsurance
    const totalHumanCost = costPerEmployee * inputs.numberOfEmployees
    
    // Amigaa AI Annual Cost
    const amigaaAnnualCost = 10000 * 12 // Rs. 10,000/month
    
    // Savings
    const annualSavings = totalHumanCost - amigaaAnnualCost
    const savingsMultiplier = totalHumanCost / amigaaAnnualCost
    const monthlySavings = annualSavings / 12
    
    return {
      costPerEmployee,
      totalHumanCost,
      amigaaAnnualCost,
      annualSavings,
      monthlySavings,
      savingsMultiplier,
      breakdown: {
        salary: totalSalary,
        ssf: ssfCost,
        insurance: totalInsurance
      }
    }
  }

  const results = calculateROI()

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-NP', {
      style: 'currency',
      currency: 'NPR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  return (
    <>
      <SEO 
        title="ROI Calculator - Amigaa AI | IOXET Labs"
        description="Calculate your potential savings with Amigaa AI. See how much you can save by switching to AI automation."
      />

      <Box minH="100vh" bg="white">
        {/* Hero Section */}
        <Box bg="neutral.50" pt={{ base: 32, md: 40 }} pb={{ base: 12, md: 16 }}>
          <Container maxW="7xl">
            <MotionBox
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              textAlign="center"
              maxW="4xl"
              mx="auto"
            >
              <HStack justify="center" mb={4}>
                <Box color="primary.500">
                  <HiCalculator size={48} />
                </Box>
              </HStack>
              <Heading
                fontSize={{ base: "3xl", md: "5xl", lg: "6xl" }}
                fontWeight="700"
                lineHeight="1.1"
                color="text"
                mb={6}
              >
                Employee Cost vs{" "}
                <Text as="span" color="primary.500">
                  Amigaa AI
                </Text>
              </Heading>
              <Text
                fontSize={{ base: "md", md: "lg", lg: "xl" }}
                color="muted"
                lineHeight="1.7"
                maxW="3xl"
                mx="auto"
              >
                Calculate your annual savings by replacing traditional employee costs with Amigaa AI automation
              </Text>
            </MotionBox>
          </Container>
        </Box>

        <Container maxW="7xl" py={{ base: 12, md: 16 }}>
          <Grid templateColumns={{ base: "1fr", lg: "1fr 1.2fr" }} gap={{ base: 8, lg: 12 }}>
            {/* Input Section */}
            <Box>
              <VStack gap={6} align="stretch">
                {/* Number of Employees */}
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <Box
                    bg="white"
                    p={6}
                    borderRadius="xl"
                    border="1px solid"
                    borderColor="neutral.200"
                    shadow="sm"
                  >
                    <HStack mb={4}>
                      <HiUsers color="var(--chakra-colors-primary-500)" size={24} />
                      <Heading fontSize="lg" fontWeight="700" color="text">
                        Number of Employees
                      </Heading>
                    </HStack>
                    <Field label={`${inputs.numberOfEmployees} Employee${inputs.numberOfEmployees !== 1 ? 's' : ''}`}>
                      <Input
                        type="number"
                        value={inputs.numberOfEmployees}
                        onChange={(e) => handleInputChange('numberOfEmployees', Number(e.target.value))}
                        min={1}
                        max={50}
                        h="56px"
                        fontSize="lg"
                        fontWeight="600"
                        textAlign="center"
                        bg="neutral.50"
                        border="2px solid"
                        borderColor="primary.200"
                        borderRadius="lg"
                        _focus={{ borderColor: "primary.500", boxShadow: "0 0 0 3px var(--chakra-colors-primary-100)" }}
                      />
                    </Field>
                  </Box>
                </MotionBox>

                {/* Salary Details */}
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <Box
                    bg="white"
                    p={6}
                    borderRadius="xl"
                    border="1px solid"
                    borderColor="neutral.200"
                    shadow="sm"
                  >
                    <HStack mb={4}>
                      <HiCurrencyDollar color="var(--chakra-colors-primary-500)" size={24} />
                      <Heading fontSize="lg" fontWeight="700" color="text">
                        Salary Details
                      </Heading>
                    </HStack>
                    <VStack gap={4} align="stretch">
                      <Field label="Monthly Salary (Rs.)">
                        <Input
                          type="number"
                          value={inputs.monthlySalary}
                          onChange={(e) => handleInputChange('monthlySalary', Number(e.target.value))}
                          min={20000}
                          step={1000}
                          h="48px"
                          bg="neutral.50"
                          border="1px solid"
                          borderColor="neutral.200"
                          borderRadius="lg"
                          _focus={{ borderColor: "primary.500", boxShadow: "0 0 0 1px var(--chakra-colors-primary-500)" }}
                        />
                      </Field>

                      <Field 
                        label={`Base Percentile: ${inputs.basePercentile.toFixed(2)}%`}
                        helperText="13th month salary bonus"
                      >
                        <input
                          type="range"
                          value={inputs.basePercentile}
                          onChange={(e) => handleInputChange('basePercentile', Number(e.target.value))}
                          min={0}
                          max={100}
                          step={0.25}
                          style={{
                            width: '100%',
                            height: '8px',
                            borderRadius: '4px',
                            background: `linear-gradient(to right, var(--chakra-colors-primary-500) 0%, var(--chakra-colors-primary-500) ${inputs.basePercentile}%, var(--chakra-colors-neutral-200) ${inputs.basePercentile}%, var(--chakra-colors-neutral-200) 100%)`,
                            outline: 'none',
                            cursor: 'pointer',
                            marginTop: '8px'
                          }}
                        />
                      </Field>
                    </VStack>
                  </Box>
                </MotionBox>

                {/* SSF Contribution */}
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  viewport={{ once: true }}
                >
                  <Box
                    bg="white"
                    p={6}
                    borderRadius="xl"
                    border="1px solid"
                    borderColor="neutral.200"
                    shadow="sm"
                  >
                    <HStack justify="space-between" mb={2}>
                      <HStack>
                        <HiShieldCheck color="var(--chakra-colors-primary-500)" size={24} />
                        <Heading fontSize="lg" fontWeight="700" color="text">
                          SSF Contribution
                        </Heading>
                      </HStack>
                      <Switch
                        checked={inputs.ssfEnabled}
                        onCheckedChange={(e: { checked: boolean }) => handleInputChange('ssfEnabled', e.checked)}
                        colorScheme="primary"
                      />
                    </HStack>
                    <Text fontSize="sm" color="muted">
                      Social Security Fund (20% of base percentile amount)
                    </Text>
                    {inputs.ssfEnabled && (
                      <Box mt={3} p={3} bg="primary.50" borderRadius="md">
                        <Text fontSize="sm" fontWeight="600" color="primary.700">
                          Annual SSF: {formatCurrency((inputs.monthlySalary * (inputs.basePercentile / 100) * 0.20 * 12))}
                        </Text>
                      </Box>
                    )}
                  </Box>
                </MotionBox>

                {/* Insurance Details */}
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <Box
                    bg="white"
                    p={6}
                    borderRadius="xl"
                    border="1px solid"
                    borderColor="neutral.200"
                    shadow="sm"
                  >
                    <HStack mb={4}>
                      <HiShieldCheck color="var(--chakra-colors-primary-500)" size={24} />
                      <Heading fontSize="lg" fontWeight="700" color="text">
                        Insurance Coverage
                      </Heading>
                    </HStack>
                    <VStack gap={4} align="stretch">
                      <Box>
                        <Field label="Medical Insurance Coverage (Rs.)">
                          <Input
                            type="number"
                            value={inputs.medicalInsurance}
                            onChange={(e) => handleInputChange('medicalInsurance', Number(e.target.value))}
                            min={0}
                            step={10000}
                            h="48px"
                            bg="neutral.50"
                            border="1px solid"
                            borderColor="neutral.200"
                            borderRadius="lg"
                            _focus={{ borderColor: "primary.500", boxShadow: "0 0 0 1px var(--chakra-colors-primary-500)" }}
                          />
                        </Field>
                        <Field 
                          label={`Premium Rate: ${inputs.medicalPremiumRate.toFixed(2)}%`}
                          helperText="Range: 1.5% - 3.0%"
                        >
                          <input
                            type="range"
                            value={inputs.medicalPremiumRate}
                            onChange={(e) => handleInputChange('medicalPremiumRate', Number(e.target.value))}
                            min={1.5}
                            max={3.0}
                            step={0.05}
                            style={{
                              width: '100%',
                              height: '8px',
                              borderRadius: '4px',
                              background: `linear-gradient(to right, var(--chakra-colors-primary-500) 0%, var(--chakra-colors-primary-500) ${((inputs.medicalPremiumRate - 1.5) / (3.0 - 1.5)) * 100}%, var(--chakra-colors-neutral-200) ${((inputs.medicalPremiumRate - 1.5) / (3.0 - 1.5)) * 100}%, var(--chakra-colors-neutral-200) 100%)`,
                              outline: 'none',
                              cursor: 'pointer',
                              marginTop: '8px'
                            }}
                          />
                        </Field>
                      </Box>

                      <Box>
                        <Field label="Accident Insurance Coverage (Rs.)">
                          <Input
                            type="number"
                            value={inputs.accidentInsurance}
                            onChange={(e) => handleInputChange('accidentInsurance', Number(e.target.value))}
                            min={0}
                            step={10000}
                            h="48px"
                            bg="neutral.50"
                            border="1px solid"
                            borderColor="neutral.200"
                            borderRadius="lg"
                            _focus={{ borderColor: "primary.500", boxShadow: "0 0 0 1px var(--chakra-colors-primary-500)" }}
                          />
                        </Field>
                        <Field 
                          label={`Premium Rate: ${inputs.accidentPremiumRate.toFixed(2)}%`}
                          helperText="Range: 0.1% - 0.5%"
                        >
                          <input
                            type="range"
                            value={inputs.accidentPremiumRate}
                            onChange={(e) => handleInputChange('accidentPremiumRate', Number(e.target.value))}
                            min={0.1}
                            max={0.5}
                            step={0.05}
                            style={{
                              width: '100%',
                              height: '8px',
                              borderRadius: '4px',
                              background: `linear-gradient(to right, var(--chakra-colors-primary-500) 0%, var(--chakra-colors-primary-500) ${((inputs.accidentPremiumRate - 0.1) / (0.5 - 0.1)) * 100}%, var(--chakra-colors-neutral-200) ${((inputs.accidentPremiumRate - 0.1) / (0.5 - 0.1)) * 100}%, var(--chakra-colors-neutral-200) 100%)`,
                              outline: 'none',
                              cursor: 'pointer',
                              marginTop: '8px'
                            }}
                          />
                        </Field>
                      </Box>
                    </VStack>
                  </Box>
                </MotionBox>

                {/* Calculate Button */}
                <Button
                  colorScheme="primary"
                  size="lg"
                  w="full"
                  onClick={() => setShowResults(true)}
                  fontSize="md"
                  fontWeight="700"
                  h="56px"
                  borderRadius="full"
                  _hover={{ transform: "translateY(-2px)", shadow: "lg" }}
                  transition="all 0.3s ease"
                >
                  <HiCalculator size={20} style={{ marginRight: '8px' }} />
                  Calculate Savings
                </Button>
              </VStack>
            </Box>

            {/* Results Section */}
            <Box position="sticky" top="100px" h="fit-content">
              {showResults ? (
                <VStack gap={6} align="stretch">
                  {/* Main Savings Card */}
                  <MotionBox
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Box
                      bg="gradient-to-br"
                      bgGradient="linear(to-br, primary.500, primary.600)"
                      p={8}
                      borderRadius="2xl"
                      shadow="2xl"
                      color="white"
                      position="relative"
                      overflow="hidden"
                    >
                      <Box position="absolute" top="-50px" right="-50px" opacity={0.1}>
                        <HiSparkles size={200} />
                      </Box>
                      <VStack align="start" gap={3} position="relative" zIndex={1}>
                        <HStack>
                          <HiTrendingDown size={28} />
                          <Text fontSize="sm" fontWeight="600" textTransform="uppercase" letterSpacing="wider">
                            Annual Savings
                          </Text>
                        </HStack>
                        <Heading fontSize={{ base: "4xl", md: "5xl" }} fontWeight="900">
                          {formatCurrency(results.annualSavings)}
                        </Heading>
                        <HStack gap={3} wrap="wrap">
                          <Badge colorScheme="yellow" fontSize="md" px={4} py={2} borderRadius="full">
                            <HStack gap={2}>
                              <HiCheckCircle />
                              <Text>{results.savingsMultiplier.toFixed(1)}x cheaper</Text>
                            </HStack>
                          </Badge>
                          <Badge colorScheme="green" fontSize="md" px={4} py={2} borderRadius="full">
                            {formatCurrency(results.monthlySavings)}/month
                          </Badge>
                        </HStack>
                      </VStack>
                    </Box>
                  </MotionBox>

                  {/* Cost Comparison Chart */}
                  <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <Box bg="white" p={6} borderRadius="xl" border="1px solid" borderColor="neutral.200" shadow="sm">
                      <Text fontSize="md" fontWeight="700" mb={4} color="text">Annual Cost Comparison</Text>
                      <VStack gap={4} align="stretch">
                        <Box>
                          <Flex justify="space-between" mb={2}>
                            <HStack>
                              <HiUsers color="var(--chakra-colors-red-500)" />
                              <Text fontSize="sm" color="muted" fontWeight="600">Human Employees</Text>
                            </HStack>
                            <Text fontSize="md" fontWeight="700" color="red.600">{formatCurrency(results.totalHumanCost)}</Text>
                          </Flex>
                          <Box h="24px" bg="neutral.100" borderRadius="full" position="relative" overflow="hidden">
                            <Box
                              h="full"
                              bg="red.500"
                              w="100%"
                              borderRadius="full"
                              display="flex"
                              alignItems="center"
                              justifyContent="end"
                              pr={4}
                            >
                              <Text fontSize="xs" fontWeight="700" color="white">
                                {inputs.numberOfEmployees} employees
                              </Text>
                            </Box>
                          </Box>
                        </Box>
                        <Box>
                          <Flex justify="space-between" mb={2}>
                            <HStack>
                              <HiSparkles color="var(--chakra-colors-primary-500)" />
                              <Text fontSize="sm" color="muted" fontWeight="600">Amigaa AI</Text>
                            </HStack>
                            <Text fontSize="md" fontWeight="700" color="primary.600">{formatCurrency(results.amigaaAnnualCost)}</Text>
                          </Flex>
                          <Box h="24px" bg="neutral.100" borderRadius="full" position="relative" overflow="hidden">
                            <Box
                              h="full"
                              bg="primary.500"
                              w={`${Math.min((results.amigaaAnnualCost / results.totalHumanCost) * 100, 100)}%`}
                              borderRadius="full"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              transition="width 0.5s ease"
                            >
                              <Text fontSize="xs" fontWeight="700" color="white">
                                Rs. 10k/month
                              </Text>
                            </Box>
                          </Box>
                        </Box>
                      </VStack>
                    </Box>
                  </MotionBox>

                  {/* Cost Breakdown */}
                  <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                  >
                    <Box bg="white" p={6} borderRadius="xl" border="1px solid" borderColor="neutral.200" shadow="sm">
                      <Text fontSize="md" fontWeight="700" mb={4} color="text">Employee Cost Breakdown</Text>
                      <VStack gap={3} align="stretch">
                        <Flex justify="space-between" align="center">
                          <Text fontSize="sm" color="muted">Base + Bonus Salary</Text>
                          <Text fontSize="sm" fontWeight="700" color="text">{formatCurrency(results.breakdown.salary * inputs.numberOfEmployees)}</Text>
                        </Flex>
                        {inputs.ssfEnabled && (
                          <Flex justify="space-between" align="center">
                            <Text fontSize="sm" color="muted">SSF Contribution</Text>
                            <Text fontSize="sm" fontWeight="700" color="text">{formatCurrency(results.breakdown.ssf * inputs.numberOfEmployees)}</Text>
                          </Flex>
                        )}
                        <Flex justify="space-between" align="center">
                          <Text fontSize="sm" color="muted">Insurance Premium</Text>
                          <Text fontSize="sm" fontWeight="700" color="text">{formatCurrency(results.breakdown.insurance * inputs.numberOfEmployees)}</Text>
                        </Flex>
                        <Box h="1px" bg="neutral.200" />
                        <Flex justify="space-between" align="center">
                          <Text fontSize="sm" fontWeight="700" color="text">Total Annual Cost</Text>
                          <Text fontSize="md" fontWeight="900" color="primary.600">{formatCurrency(results.totalHumanCost)}</Text>
                        </Flex>
                        <Box mt={2} p={3} bg="neutral.50" borderRadius="md">
                          <Text fontSize="xs" color="muted" textAlign="center">
                            Per employee: {formatCurrency(results.costPerEmployee)}
                          </Text>
                        </Box>
                      </VStack>
                    </Box>
                  </MotionBox>

                  {/* CTAs */}
                  <VStack gap={3}>
                    <Link to="/contact" style={{ width: '100%', textDecoration: 'none' }}>
                      <Button
                        colorScheme="primary"
                        size="lg"
                        w="full"
                        borderRadius="full"
                        fontWeight="700"
                        h="56px"
                        _hover={{ transform: "translateY(-2px)", shadow: "lg" }}
                        transition="all 0.3s ease"
                      >
                        📞 Get Started with Amigaa AI
                      </Button>
                    </Link>
                  </VStack>

                  {/* Key Features */}
                  <Box bg="primary.50" p={6} borderRadius="xl" border="1px solid" borderColor="primary.200">
                    <Text fontSize="sm" fontWeight="700" color="text" mb={3}>
                      Why Amigaa AI?
                    </Text>
                    <VStack align="start" gap={2}>
                      <HStack gap={2} align="start">
                        <Box color="primary.500" mt={1}><HiCheckCircle size={16} /></Box>
                        <Text fontSize="sm" color="text">Available 24/7 with instant responses</Text>
                      </HStack>
                      <HStack gap={2} align="start">
                        <Box color="primary.500" mt={1}><HiCheckCircle size={16} /></Box>
                        <Text fontSize="sm" color="text">No hiring, training, or overhead costs</Text>
                      </HStack>
                      <HStack gap={2} align="start">
                        <Box color="primary.500" mt={1}><HiCheckCircle size={16} /></Box>
                        <Text fontSize="sm" color="text">Handles unlimited conversations simultaneously</Text>
                      </HStack>
                      <HStack gap={2} align="start">
                        <Box color="primary.500" mt={1}><HiCheckCircle size={16} /></Box>
                        <Text fontSize="sm" color="text">Consistent quality and performance</Text>
                      </HStack>
                      <HStack gap={2} align="start">
                        <Box color="primary.500" mt={1}><HiCheckCircle size={16} /></Box>
                        <Text fontSize="sm" color="text">Easy integration with existing systems</Text>
                      </HStack>
                    </VStack>
                  </Box>
                </VStack>
              ) : (
                <Box
                  bg="white"
                  p={12}
                  borderRadius="2xl"
                  border="1px solid"
                  borderColor="neutral.200"
                  textAlign="center"
                  shadow="sm"
                >
                  <Box color="neutral.300" mb={4}>
                    <HiCalculator size={64} style={{ margin: '0 auto' }} />
                  </Box>
                  <Text color="muted" fontSize="lg" lineHeight="1.7" mb={4}>
                    Enter your employee details and click "Calculate Savings" to see your potential cost reduction
                  </Text>
                  <VStack gap={2} mt={6}>
                    <HStack>
                      <Box color="primary.500"><HiCheckCircle /></Box>
                      <Text fontSize="sm" color="muted">Based on Nepal government minimum wage</Text>
                    </HStack>
                    <HStack>
                      <Box color="primary.500"><HiCheckCircle /></Box>
                      <Text fontSize="sm" color="muted">Includes SSF and insurance costs</Text>
                    </HStack>
                    <HStack>
                      <Box color="primary.500"><HiCheckCircle /></Box>
                      <Text fontSize="sm" color="muted">Real-time accurate calculations</Text>
                    </HStack>
                  </VStack>
                </Box>
              )}
            </Box>
          </Grid>
        </Container>
      </Box>
    </>
  )
}

export default ROICalculatorPage
