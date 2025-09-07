import {
  Button,
  VStack,
  HStack,
  Text,
  Grid,
  Box,
  Portal,
  Input,
  Badge,
  Flex
} from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiX, HiCalculator, HiTrendingUp, HiCurrencyDollar } from 'react-icons/hi'
import { useState, useEffect } from 'react'

interface ROICalculatorModalProps {
  isOpen: boolean
  onClose: () => void
}

type ProductType = 'erp' | 'amigaa' | ''

interface ROIInputs {
  productType: ProductType
  companySize: string
  currentCosts: string
  timeSpent: string
  errorRate: string
  processes: string
}

interface ROIResults {
  annualSavings: number
  roiPercentage: number
  paybackMonths: number
  productivityGain: number
  costReduction: number
}

const MotionBox = motion(Box)

const ROICalculatorModal = ({ isOpen, onClose }: ROICalculatorModalProps) => {
  const [inputs, setInputs] = useState<ROIInputs>({
    productType: '',
    companySize: '',
    currentCosts: '',
    timeSpent: '',
    errorRate: '',
    processes: ''
  })

  const [results, setResults] = useState<ROIResults | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  // Close modal on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  const calculateROI = () => {
    setIsCalculating(true)
    
    // Simulate calculation delay for better UX
    setTimeout(() => {
      const currentCosts = parseFloat(inputs.currentCosts) || 0
      const timeSpent = parseFloat(inputs.timeSpent) || 0
      const errorRate = parseFloat(inputs.errorRate) || 0
      const processes = parseFloat(inputs.processes) || 0
      
      let calculationResults: ROIResults

      if (inputs.productType === 'erp') {
        // ERP-specific calculations
        const efficiencyGain = 0.35 // 35% efficiency improvement
        const errorReduction = 0.75 // 75% error reduction
        const processAutomation = 0.60 // 60% process automation
        
        const timeSavings = timeSpent * efficiencyGain * 52 * 40 // Weekly hours * efficiency * weeks * hourly rate
        const errorCostSavings = (currentCosts * (errorRate / 100)) * errorReduction
        const processSavings = (processes * 2000) * processAutomation // $2000 per process automated
        
        const annualSavings = timeSavings + errorCostSavings + processSavings
        const implementationCost = currentCosts * 0.3 // 30% of current costs
        
        calculationResults = {
          annualSavings: annualSavings,
          roiPercentage: ((annualSavings - implementationCost) / implementationCost) * 100,
          paybackMonths: (implementationCost / (annualSavings / 12)),
          productivityGain: efficiencyGain * 100,
          costReduction: ((annualSavings / currentCosts) * 100)
        }
      } else {
        // Amigaa-specific calculations
        const automationGain = 0.50 // 50% automation efficiency
        const decisionSpeed = 0.80 // 80% faster decision making
        const predictiveAccuracy = 0.25 // 25% cost reduction through predictions
        
        const automationSavings = timeSpent * automationGain * 52 * 45 // Higher hourly rate for AI work
        const decisionSavings = (currentCosts * 0.15) * decisionSpeed // 15% of costs related to delayed decisions
        const predictiveSavings = currentCosts * predictiveAccuracy
        
        const annualSavings = automationSavings + decisionSavings + predictiveSavings
        const implementationCost = currentCosts * 0.25 // 25% of current costs
        
        calculationResults = {
          annualSavings: annualSavings,
          roiPercentage: ((annualSavings - implementationCost) / implementationCost) * 100,
          paybackMonths: (implementationCost / (annualSavings / 12)),
          productivityGain: automationGain * 100,
          costReduction: ((annualSavings / currentCosts) * 100)
        }
      }

      setResults(calculationResults)
      setIsCalculating(false)
    }, 1500)
  }

  const resetCalculator = () => {
    setInputs({
      productType: '',
      companySize: '',
      currentCosts: '',
      timeSpent: '',
      errorRate: '',
      processes: ''
    })
    setResults(null)
  }

  const isFormValid = inputs.productType && inputs.companySize && inputs.currentCosts && inputs.timeSpent

  if (!isOpen) return null

  return (
    <Portal>
      <AnimatePresence>
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          position="fixed"
          inset={0}
          bg="blackAlpha.600"
          backdropFilter="blur(8px)"
          zIndex={9999}
          display="flex"
          alignItems="center"
          justifyContent="center"
          p={4}
          onClick={onClose}
        >
          <MotionBox
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            bg="white"
            borderRadius="2xl"
            shadow="2xl"
            maxW="4xl"
            w="full"
            maxH="90vh"
            overflowY="auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <Flex justify="space-between" align="center" p={6} borderBottom="1px" borderColor="gray.200">
              <HStack gap={3}>
                <Box p={2} bg="primary.50" borderRadius="lg" color="primary.500">
                  <HiCalculator size={20} />
                </Box>
                <VStack align="start" gap={0}>
                  <Text fontSize="xl" fontWeight="700" color="text">
                    ROI Calculator
                  </Text>
                  <Text fontSize="sm" color="muted">
                    Calculate your return on investment
                  </Text>
                </VStack>
              </HStack>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                borderRadius="full"
                _hover={{ bg: "gray.100" }}
                p={2}
                minW="auto"
              >
                <HiX size={16} />
              </Button>
            </Flex>

            <VStack gap={6} p={6} align="stretch">
              {!results ? (
                <>
                  {/* Product Selection */}
                  <VStack align="start" gap={2}>
                    <Text fontSize="sm" fontWeight="600" color="text">
                      Select Product/Service
                    </Text>
                    <select
                      value={inputs.productType}
                      onChange={(e) => setInputs({ ...inputs, productType: e.target.value as ProductType })}
                      style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: '8px',
                        border: '1px solid #E2E8F0',
                        background: 'white',
                        fontSize: '14px'
                      }}
                    >
                      <option value="">Choose a product to calculate ROI</option>
                      <option value="erp">ERP Solutions - Enterprise Resource Planning</option>
                      <option value="amigaa">Amigaa Platform - AI-Powered Automation</option>
                    </select>
                  </VStack>

                  {inputs.productType && (
                    <MotionBox
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
                        {/* Company Size */}
                        <VStack align="start" gap={2}>
                          <Text fontSize="sm" fontWeight="600" color="text">
                            Company Size
                          </Text>
                          <select
                            value={inputs.companySize}
                            onChange={(e) => setInputs({ ...inputs, companySize: e.target.value })}
                            style={{
                              width: '100%',
                              padding: '12px',
                              borderRadius: '8px',
                              border: '1px solid #E2E8F0',
                              background: 'white',
                              fontSize: '14px'
                            }}
                          >
                            <option value="">Select company size</option>
                            <option value="startup">Startup (1-10 employees)</option>
                            <option value="small">Small Business (11-50 employees)</option>
                            <option value="medium">Medium Business (51-200 employees)</option>
                            <option value="large">Large Enterprise (200+ employees)</option>
                          </select>
                        </VStack>

                        {/* Current Annual Costs */}
                        <VStack align="start" gap={2}>
                          <Text fontSize="sm" fontWeight="600" color="text">
                            Current Annual IT Costs ($)
                          </Text>
                          <Input
                            type="number"
                            value={inputs.currentCosts}
                            onChange={(e) => setInputs({ ...inputs, currentCosts: e.target.value })}
                            placeholder="e.g., 50000"
                            borderRadius="lg"
                          />
                        </VStack>

                        {/* Time Spent on Manual Processes */}
                        <VStack align="start" gap={2}>
                          <Text fontSize="sm" fontWeight="600" color="text">
                            Weekly Hours on Manual Processes
                          </Text>
                          <Input
                            type="number"
                            value={inputs.timeSpent}
                            onChange={(e) => setInputs({ ...inputs, timeSpent: e.target.value })}
                            placeholder="e.g., 20"
                            borderRadius="lg"
                          />
                        </VStack>

                        {inputs.productType === 'erp' ? (
                          <VStack align="start" gap={2}>
                            <Text fontSize="sm" fontWeight="600" color="text">
                              Current Error Rate (%)
                            </Text>
                            <Input
                              type="number"
                              value={inputs.errorRate}
                              onChange={(e) => setInputs({ ...inputs, errorRate: e.target.value })}
                              placeholder="e.g., 5"
                              borderRadius="lg"
                            />
                          </VStack>
                        ) : (
                          <VStack align="start" gap={2}>
                            <Text fontSize="sm" fontWeight="600" color="text">
                              Processes to Automate
                            </Text>
                            <Input
                              type="number"
                              value={inputs.processes}
                              onChange={(e) => setInputs({ ...inputs, processes: e.target.value })}
                              placeholder="e.g., 10"
                              borderRadius="lg"
                            />
                          </VStack>
                        )}
                      </Grid>

                      {/* Product-specific info */}
                      <Box bg="neutral.50" p={4} borderRadius="lg" mt={4}>
                        <Text fontSize="sm" fontWeight="600" color="text" mb={2}>
                          {inputs.productType === 'erp' ? 'ERP Solution Benefits:' : 'Amigaa Platform Benefits:'}
                        </Text>
                        <VStack align="start" gap={1}>
                          {inputs.productType === 'erp' ? (
                            <>
                              <Text fontSize="xs" color="muted">• 35% improvement in operational efficiency</Text>
                              <Text fontSize="xs" color="muted">• 75% reduction in data entry errors</Text>
                              <Text fontSize="xs" color="muted">• 60% automation of manual processes</Text>
                              <Text fontSize="xs" color="muted">• Real-time business intelligence and reporting</Text>
                            </>
                          ) : (
                            <>
                              <Text fontSize="xs" color="muted">• 50% reduction in manual tasks through AI automation</Text>
                              <Text fontSize="xs" color="muted">• 80% faster decision-making with predictive analytics</Text>
                              <Text fontSize="xs" color="muted">• 25% cost reduction through intelligent predictions</Text>
                              <Text fontSize="xs" color="muted">• Advanced machine learning capabilities</Text>
                            </>
                          )}
                        </VStack>
                      </Box>

                      {/* Calculate Button */}
                      <Button
                        colorScheme="primary"
                        size="lg"
                        onClick={calculateROI}
                        disabled={!isFormValid}
                        borderRadius="lg"
                        w="full"
                        mt={4}
                        _disabled={{ opacity: 0.6, cursor: "not-allowed" }}
                      >
                        <HiCalculator style={{ marginRight: '8px' }} />
                        {isCalculating ? 'Calculating ROI...' : 'Calculate ROI'}
                      </Button>
                    </MotionBox>
                  )}
                </>
              ) : (
                /* Results Display */
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <VStack gap={6}>
                    {/* Summary Card */}
                    <Box
                      bgGradient="linear(135deg, primary.500, primary.600)"
                      color="white"
                      p={6}
                      borderRadius="xl"
                      w="full"
                      textAlign="center"
                    >
                      <VStack gap={2}>
                        <Text fontSize="sm" opacity={0.9}>
                          Projected Annual Savings
                        </Text>
                        <Text fontSize="3xl" fontWeight="700">
                          ${results.annualSavings.toLocaleString()}
                        </Text>
                        <HStack gap={4} justify="center">
                          <Badge bg="whiteAlpha.200" color="white" px={3} py={1} borderRadius="full">
                            {results.roiPercentage.toFixed(0)}% ROI
                          </Badge>
                          <Badge bg="whiteAlpha.200" color="white" px={3} py={1} borderRadius="full">
                            {results.paybackMonths.toFixed(1)} months payback
                          </Badge>
                        </HStack>
                      </VStack>
                    </Box>

                    {/* Detailed Metrics */}
                    <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4} w="full">
                      <Box bg="neutral.50" p={4} borderRadius="lg">
                        <HStack gap={3} mb={3}>
                          <HiTrendingUp color="green" />
                          <Text fontSize="sm" fontWeight="600" color="text">
                            Productivity Gain
                          </Text>
                        </HStack>
                        <Text fontSize="2xl" fontWeight="700" color="green.500">
                          +{results.productivityGain.toFixed(0)}%
                        </Text>
                        <Box
                          bg="green.200"
                          borderRadius="full"
                          h={2}
                          mt={2}
                          position="relative"
                          overflow="hidden"
                        >
                          <Box
                            bg="green.500"
                            h="full"
                            borderRadius="full"
                            width={`${Math.min(results.productivityGain, 100)}%`}
                            transition="width 0.5s ease"
                          />
                        </Box>
                      </Box>

                      <Box bg="neutral.50" p={4} borderRadius="lg">
                        <HStack gap={3} mb={3}>
                          <HiCurrencyDollar color="blue" />
                          <Text fontSize="sm" fontWeight="600" color="text">
                            Cost Reduction
                          </Text>
                        </HStack>
                        <Text fontSize="2xl" fontWeight="700" color="blue.500">
                          {results.costReduction.toFixed(0)}%
                        </Text>
                        <Box
                          bg="blue.200"
                          borderRadius="full"
                          h={2}
                          mt={2}
                          position="relative"
                          overflow="hidden"
                        >
                          <Box
                            bg="blue.500"
                            h="full"
                            borderRadius="full"
                            width={`${Math.min(results.costReduction, 100)}%`}
                            transition="width 0.5s ease"
                          />
                        </Box>
                      </Box>
                    </Grid>

                    <Box h="1px" bg="gray.200" w="full" />

                    {/* Action Buttons */}
                    <HStack gap={4} justify="center" w="full">
                      <Button
                        variant="outline"
                        borderColor="primary.500"
                        color="primary.500"
                        onClick={resetCalculator}
                        borderRadius="lg"
                      >
                        Calculate Again
                      </Button>
                      <Button
                        colorScheme="primary"
                        onClick={onClose}
                        borderRadius="lg"
                      >
                        Get Started
                      </Button>
                    </HStack>

                    {/* Disclaimer */}
                    <Text fontSize="xs" color="muted" textAlign="center">
                      * Results are estimates based on industry averages and typical implementation scenarios. 
                      Actual results may vary based on specific business requirements and implementation approach.
                    </Text>
                  </VStack>
                </MotionBox>
              )}
            </VStack>
          </MotionBox>
        </MotionBox>
      </AnimatePresence>
    </Portal>
  )
}

export default ROICalculatorModal
