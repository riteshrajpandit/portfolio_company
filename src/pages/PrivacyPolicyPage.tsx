import {
  Box,
  Container,
  Text,
  VStack,
  Heading,
} from "@chakra-ui/react"
import { motion } from "framer-motion"

const MotionBox = motion(Box)

const PrivacyPolicyPage = () => {
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
              Privacy Policy
            </Text>
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color="muted"
              lineHeight="1.7"
              maxW="2xl"
              mx="auto"
            >
              Your privacy is important to us. This policy explains how IOXET Labs collects, 
              uses, and protects your personal information.
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
            {/* Information We Collect */}
            <Box>
              <Heading size="lg" mb={6} color="text">
                1. Information We Collect
              </Heading>
              <VStack gap={4} align="stretch">
                <Box>
                  <Heading size="md" mb={3} color="text">
                    Personal Information
                  </Heading>
                  <Text color="muted" lineHeight="1.7" mb={3}>
                    We may collect the following personal information when you interact with our services:
                  </Text>
                  <VStack gap={2} align="start" color="muted" pl={4}>
                    <Text>• Name and contact information (email, phone number)</Text>
                    <Text>• Company name and job title</Text>
                    <Text>• Project requirements and preferences</Text>
                    <Text>• Communication preferences</Text>
                  </VStack>
                </Box>

                <Box>
                  <Heading size="md" mb={3} color="text">
                    Technical Information
                  </Heading>
                  <Text color="muted" lineHeight="1.7" mb={3}>
                    We automatically collect certain technical information:
                  </Text>
                  <VStack gap={2} align="start" color="muted" pl={4}>
                    <Text>• IP address and browser information</Text>
                    <Text>• Device type and operating system</Text>
                    <Text>• Website usage patterns and analytics</Text>
                    <Text>• Cookies and similar tracking technologies</Text>
                  </VStack>
                </Box>
              </VStack>
            </Box>

            <Box h="1px" bg="gray.200" w="full" />

            {/* How We Use Your Information */}
            <Box>
              <Heading size="lg" mb={6} color="text">
                2. How We Use Your Information
              </Heading>
              <Text color="muted" lineHeight="1.7" mb={4}>
                We use your information for the following purposes:
              </Text>
              <VStack gap={3} align="start" color="muted" pl={4}>
                <Text>
                  <Text as="span" fontWeight="600" color="text">Service Delivery:</Text> To provide, maintain, and improve our services
                </Text>
                <Text>
                  <Text as="span" fontWeight="600" color="text">Communication:</Text> To respond to inquiries and provide customer support
                </Text>
                <Text>
                  <Text as="span" fontWeight="600" color="text">Project Management:</Text> To understand your requirements and deliver customized solutions
                </Text>
                <Text>
                  <Text as="span" fontWeight="600" color="text">Marketing:</Text> To send relevant updates and promotional materials (with your consent)
                </Text>
                <Text>
                  <Text as="span" fontWeight="600" color="text">Analytics:</Text> To analyze website usage and improve user experience
                </Text>
                <Text>
                  <Text as="span" fontWeight="600" color="text">Legal Compliance:</Text> To comply with applicable laws and regulations
                </Text>
              </VStack>
            </Box>

            <Box h="1px" bg="gray.200" w="full" />

            {/* Information Sharing */}
            <Box>
              <Heading size="lg" mb={6} color="text">
                3. Information Sharing and Disclosure
              </Heading>
              <Text color="muted" lineHeight="1.7" mb={4}>
                We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
              </Text>
              <VStack gap={3} align="start" color="muted" pl={4}>
                <Text>
                  <Text as="span" fontWeight="600" color="text">Service Providers:</Text> With trusted third-party vendors who assist us in operating our business
                </Text>
                <Text>
                  <Text as="span" fontWeight="600" color="text">Legal Requirements:</Text> When required by law or to protect our rights and safety
                </Text>
                <Text>
                  <Text as="span" fontWeight="600" color="text">Business Transfers:</Text> In connection with a merger, acquisition, or sale of business assets
                </Text>
                <Text>
                  <Text as="span" fontWeight="600" color="text">Consent:</Text> With your explicit consent for specific purposes
                </Text>
              </VStack>
            </Box>

            <Box height="1px" bg="border" my={8} />

            {/* Data Security */}
            <Box>
              <Heading size="lg" mb={6} color="text">
                4. Data Security
              </Heading>
              <Text color="muted" lineHeight="1.7" mb={4}>
                We implement appropriate technical and organizational measures to protect your personal information:
              </Text>
              <VStack gap={2} align="start" color="muted" pl={4}>
                <Text>• Encryption of data in transit and at rest</Text>
                <Text>• Regular security assessments and updates</Text>
                <Text>• Access controls and authentication measures</Text>
                <Text>• Employee training on data protection practices</Text>
                <Text>• Secure backup and recovery procedures</Text>
              </VStack>
            </Box>

            <Box height="1px" bg="border" my={8} />

            {/* Your Rights */}
            <Box>
              <Heading size="lg" mb={6} color="text">
                5. Your Rights and Choices
              </Heading>
              <Text color="muted" lineHeight="1.7" mb={4}>
                You have the following rights regarding your personal information:
              </Text>
              <VStack gap={3} align="start" color="muted" pl={4}>
                <Text>
                  <Text as="span" fontWeight="600" color="text">Access:</Text> Request access to your personal information
                </Text>
                <Text>
                  <Text as="span" fontWeight="600" color="text">Correction:</Text> Request correction of inaccurate or incomplete information
                </Text>
                <Text>
                  <Text as="span" fontWeight="600" color="text">Deletion:</Text> Request deletion of your personal information
                </Text>
                <Text>
                  <Text as="span" fontWeight="600" color="text">Portability:</Text> Request a copy of your data in a structured format
                </Text>
                <Text>
                  <Text as="span" fontWeight="600" color="text">Opt-out:</Text> Unsubscribe from marketing communications at any time
                </Text>
              </VStack>
            </Box>

            <Box height="1px" bg="border" my={8} />

            {/* Cookies */}
            <Box>
              <Heading size="lg" mb={6} color="text">
                6. Cookies and Tracking Technologies
              </Heading>
              <Text color="muted" lineHeight="1.7" mb={4}>
                We use cookies and similar technologies to enhance your browsing experience:
              </Text>
              <VStack gap={2} align="start" color="muted" pl={4}>
                <Text>• Essential cookies for website functionality</Text>
                <Text>• Analytics cookies to understand user behavior</Text>
                <Text>• Performance cookies to optimize website speed</Text>
                <Text>• Marketing cookies for relevant advertising (with consent)</Text>
              </VStack>
              <Text color="muted" lineHeight="1.7" mt={4}>
                You can control cookie preferences through your browser settings.
              </Text>
            </Box>

            <Box height="1px" bg="border" my={8} />

            {/* Data Retention */}
            <Box>
              <Heading size="lg" mb={6} color="text">
                7. Data Retention
              </Heading>
              <Text color="muted" lineHeight="1.7">
                We retain your personal information only as long as necessary to fulfill the purposes outlined in this policy, 
                comply with legal obligations, resolve disputes, and enforce our agreements. When information is no longer needed, 
                we securely delete or anonymize it.
              </Text>
            </Box>

            <Box height="1px" bg="border" my={8} />

            {/* International Transfers */}
            <Box>
              <Heading size="lg" mb={6} color="text">
                8. International Data Transfers
              </Heading>
              <Text color="muted" lineHeight="1.7">
                Your information may be transferred to and processed in countries other than your own. We ensure that such 
                transfers comply with applicable data protection laws and implement appropriate safeguards to protect your information.
              </Text>
            </Box>

            <Box height="1px" bg="border" my={8} />

            {/* Updates */}
            <Box>
              <Heading size="lg" mb={6} color="text">
                9. Policy Updates
              </Heading>
              <Text color="muted" lineHeight="1.7">
                We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. 
                We will notify you of any material changes by posting the updated policy on our website and updating the "Last updated" date.
              </Text>
            </Box>

            <Box height="1px" bg="border" my={8} />

            {/* Contact */}
            <Box>
              <Heading size="lg" mb={6} color="text">
                10. Contact Us
              </Heading>
              <Text color="muted" lineHeight="1.7" mb={4}>
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </Text>
              <VStack gap={2} align="start" color="muted">
                <Text>
                  <Text as="span" fontWeight="600" color="text">Email:</Text> privacy@ioxetlabs.com
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

export default PrivacyPolicyPage
