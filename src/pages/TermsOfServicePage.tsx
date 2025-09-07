import {
  Box,
  Container,
  Text,
  VStack,
  Heading,
} from "@chakra-ui/react"
import { motion } from "framer-motion"

const MotionBox = motion(Box)

const TermsOfServicePage = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box bg="neutral.50" pt={40} pb={16}>
        <Container maxW="4xl">
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            textAlign="center"
          >
            <Text
              fontSize={{ base: "4xl", md: "5xl" }}
              fontWeight="700"
              lineHeight="1.1"
              color="text"
              mb={6}
            >
              Terms of Service
            </Text>
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color="muted"
              lineHeight="1.7"
              maxW="2xl"
              mx="auto"
            >
              Please read these Terms of Service carefully before using IOXET Labs services.
            </Text>
            <Text fontSize="sm" color="muted" mt={4}>
              Last updated: {new Date().toLocaleDateString()}
            </Text>
          </MotionBox>
        </Container>
      </Box>

      {/* Content Section */}
      <Container maxW="4xl" py={16}>
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <VStack gap={12} align="stretch">
            {/* Acceptance of Terms */}
            <Box>
              <Heading size="lg" mb={6} color="text">
                1. Acceptance of Terms
              </Heading>
              <Text color="muted" lineHeight="1.7" mb={4}>
                By accessing and using IOXET Labs services, you accept and agree to be bound by the terms and 
                provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </Text>
              <Text color="muted" lineHeight="1.7">
                These Terms of Service ("Terms") apply to all users of the website located at ioxetlabs.com 
                and all associated services provided by IOXET Labs ("Company", "we", "us", or "our").
              </Text>
            </Box>

            {/* Services Description */}
            <Box>
              <Heading size="lg" mb={6} color="text">
                2. Services Description
              </Heading>
              <Text color="muted" lineHeight="1.7" mb={4}>
                IOXET Labs provides software development, consulting, and technology services including but not limited to:
              </Text>
              <VStack gap={2} align="start" color="muted" pl={4}>
                <Text>• Web and mobile application development</Text>
                <Text>• Enterprise Resource Planning (ERP) solutions</Text>
                <Text>• AI-powered automation platforms (Amigaa)</Text>
                <Text>• IT consulting and training services</Text>
                <Text>• Technical support and maintenance</Text>
              </VStack>
            </Box>

            {/* User Obligations */}
            <Box>
              <Heading size="lg" mb={6} color="text">
                3. User Obligations
              </Heading>
              <Text color="muted" lineHeight="1.7" mb={4}>
                As a user of our services, you agree to:
              </Text>
              <VStack gap={3} align="start" color="muted" pl={4}>
                <Text>
                  <Text as="span" fontWeight="600" color="text">Provide Accurate Information:</Text> 
                  Supply truthful and accurate information during registration and project discussions
                </Text>
                <Text>
                  <Text as="span" fontWeight="600" color="text">Comply with Laws:</Text> 
                  Use our services in compliance with all applicable laws and regulations
                </Text>
                <Text>
                  <Text as="span" fontWeight="600" color="text">Respect Intellectual Property:</Text> 
                  Not infringe upon the intellectual property rights of others
                </Text>
                <Text>
                  <Text as="span" fontWeight="600" color="text">Maintain Security:</Text> 
                  Keep your account credentials secure and confidential
                </Text>
                <Text>
                  <Text as="span" fontWeight="600" color="text">Professional Conduct:</Text> 
                  Maintain professional and respectful communication with our team
                </Text>
              </VStack>
            </Box>

            {/* Payment Terms */}
            <Box>
              <Heading size="lg" mb={6} color="text">
                4. Payment Terms
              </Heading>
              <VStack gap={4} align="stretch">
                <Box>
                  <Heading size="md" mb={3} color="text">
                    Project Fees
                  </Heading>
                  <Text color="muted" lineHeight="1.7">
                    All project fees are agreed upon before work begins and are outlined in individual project contracts. 
                    Payment schedules and milestones will be clearly defined in your project agreement.
                  </Text>
                </Box>
                <Box>
                  <Heading size="md" mb={3} color="text">
                    Payment Methods
                  </Heading>
                  <Text color="muted" lineHeight="1.7">
                    We accept various payment methods including bank transfers, credit cards, and digital payment platforms. 
                    All payments must be made in USD unless otherwise agreed upon.
                  </Text>
                </Box>
                <Box>
                  <Heading size="md" mb={3} color="text">
                    Late Payments
                  </Heading>
                  <Text color="muted" lineHeight="1.7">
                    Late payments may result in project delays or suspension of services. Interest may be charged on 
                    overdue amounts as specified in individual contracts.
                  </Text>
                </Box>
              </VStack>
            </Box>

            {/* Intellectual Property */}
            <Box>
              <Heading size="lg" mb={6} color="text">
                5. Intellectual Property Rights
              </Heading>
              <VStack gap={4} align="stretch">
                <Box>
                  <Heading size="md" mb={3} color="text">
                    Client-Owned Content
                  </Heading>
                  <Text color="muted" lineHeight="1.7">
                    You retain all rights to content, data, and materials you provide to us. We will not use your 
                    proprietary information for any purpose other than delivering the agreed-upon services.
                  </Text>
                </Box>
                <Box>
                  <Heading size="md" mb={3} color="text">
                    Developed Solutions
                  </Heading>
                  <Text color="muted" lineHeight="1.7">
                    Upon full payment, you will own the custom solutions we develop specifically for your project, 
                    excluding any pre-existing IOXET Labs intellectual property or third-party components.
                  </Text>
                </Box>
                <Box>
                  <Heading size="md" mb={3} color="text">
                    IOXET Labs Property
                  </Heading>
                  <Text color="muted" lineHeight="1.7">
                    We retain all rights to our proprietary methodologies, frameworks, tools, and general knowledge 
                    gained during the provision of services.
                  </Text>
                </Box>
              </VStack>
            </Box>

            {/* Service Limitations */}
            <Box>
              <Heading size="lg" mb={6} color="text">
                6. Service Limitations and Availability
              </Heading>
              <Text color="muted" lineHeight="1.7" mb={4}>
                While we strive to provide reliable services, we cannot guarantee:
              </Text>
              <VStack gap={2} align="start" color="muted" pl={4}>
                <Text>• 100% uptime for web-based services</Text>
                <Text>• Compatibility with all third-party systems</Text>
                <Text>• Specific response times unless outlined in service agreements</Text>
                <Text>• Resolution of issues beyond our technical control</Text>
              </VStack>
            </Box>

            {/* Limitation of Liability */}
            <Box>
              <Heading size="lg" mb={6} color="text">
                7. Limitation of Liability
              </Heading>
              <Text color="muted" lineHeight="1.7" mb={4}>
                To the maximum extent permitted by law, IOXET Labs shall not be liable for:
              </Text>
              <VStack gap={2} align="start" color="muted" pl={4}>
                <Text>• Indirect, incidental, or consequential damages</Text>
                <Text>• Loss of profits, data, or business opportunities</Text>
                <Text>• Damages resulting from third-party actions or software</Text>
                <Text>• Issues arising from client-provided content or requirements</Text>
              </VStack>
              <Text color="muted" lineHeight="1.7" mt={4}>
                Our total liability shall not exceed the amount paid by you for the specific service in question.
              </Text>
            </Box>

            {/* Termination */}
            <Box>
              <Heading size="lg" mb={6} color="text">
                8. Termination
              </Heading>
              <Text color="muted" lineHeight="1.7" mb={4}>
                Either party may terminate services under the following conditions:
              </Text>
              <VStack gap={3} align="start" color="muted" pl={4}>
                <Text>
                  <Text as="span" fontWeight="600" color="text">By Client:</Text> 
                  With 30 days written notice, subject to payment for work completed
                </Text>
                <Text>
                  <Text as="span" fontWeight="600" color="text">By IOXET Labs:</Text> 
                  With 30 days notice for convenience, or immediately for breach of terms
                </Text>
                <Text>
                  <Text as="span" fontWeight="600" color="text">Immediate Termination:</Text> 
                  For material breach, non-payment, or illegal activities
                </Text>
              </VStack>
            </Box>

            {/* Privacy and Data Protection */}
            <Box>
              <Heading size="lg" mb={6} color="text">
                9. Privacy and Data Protection
              </Heading>
              <Text color="muted" lineHeight="1.7">
                Your privacy is important to us. Our collection, use, and protection of your personal information 
                is governed by our Privacy Policy, which is incorporated into these Terms by reference. 
                Please review our Privacy Policy to understand our data practices.
              </Text>
            </Box>

            {/* Governing Law */}
            <Box>
              <Heading size="lg" mb={6} color="text">
                10. Governing Law and Dispute Resolution
              </Heading>
              <Text color="muted" lineHeight="1.7" mb={4}>
                These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], 
                without regard to its conflict of law provisions.
              </Text>
              <Text color="muted" lineHeight="1.7">
                Any disputes arising from these Terms or our services shall be resolved through binding arbitration 
                or in the courts of [Your Jurisdiction], as specified in individual service agreements.
              </Text>
            </Box>

            {/* Changes to Terms */}
            <Box>
              <Heading size="lg" mb={6} color="text">
                11. Changes to Terms
              </Heading>
              <Text color="muted" lineHeight="1.7">
                We reserve the right to modify these Terms at any time. Changes will be effective immediately upon 
                posting on our website. Your continued use of our services after changes are posted constitutes 
                acceptance of the modified Terms. We encourage you to review these Terms periodically.
              </Text>
            </Box>

            {/* Contact Information */}
            <Box>
              <Heading size="lg" mb={6} color="text">
                12. Contact Information
              </Heading>
              <Text color="muted" lineHeight="1.7" mb={4}>
                If you have any questions about these Terms of Service, please contact us:
              </Text>
              <VStack gap={2} align="start" color="muted">
                <Text>
                  <Text as="span" fontWeight="600" color="text">Email:</Text> legal@ioxetlabs.com
                </Text>
                <Text>
                  <Text as="span" fontWeight="600" color="text">Phone:</Text> +1 (555) 123-4567
                </Text>
                <Text>
                  <Text as="span" fontWeight="600" color="text">Address:</Text> IOXET Labs, 123 Innovation Street, Tech City, TC 12345
                </Text>
              </VStack>
            </Box>
          </VStack>
        </MotionBox>
      </Container>
    </Box>
  )
}

export default TermsOfServicePage
