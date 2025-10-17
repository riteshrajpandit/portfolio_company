import {
  Box,
  Container,
  Text,
  VStack,
  Heading,
  List,
  Stack,
  LinkBox, 
  LinkOverlay

} from "@chakra-ui/react"
import { motion } from "framer-motion"

const MotionBox = motion(Box)

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Box mb={12}>
    <Heading
      as="h2"
      fontSize={{ base: "2xl", md: "3xl" }}
      fontWeight="700"
      color="text"
      mb={4}
      pb={3}
      borderBottom="2px solid"
      borderColor="primary.200"
    >
      {title}
    </Heading>
    <VStack align="start" gap={4}>
      {children}
    </VStack>
  </Box>
)

const SubSection = ({ title, children }: { title?: string; children: React.ReactNode }) => (
  <Box>
    {title && (
      <Text fontSize="lg" fontWeight="600" color="text" mb={2}>
        {title}
      </Text>
    )}
    {children}
  </Box>
)

const BulletPoint = ({ title, children }: { title?: string; children: React.ReactNode }) => (
  <Box pl={4} borderLeft="3px solid" borderColor="primary.200" mb={3}>
    {title && (
      <Text fontSize="md" fontWeight="600" color="text" mb={1}>
        {title}
      </Text>
    )}
    <Text fontSize="md" color="muted" lineHeight="1.7">
      {children}
    </Text>
  </Box>
)

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
              Please read these terms carefully before using our services. By accessing or using our Service, you agree to be bound by these Terms.
            </Text>
            <Text fontSize="sm" color="muted" mt={8}>
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </Text>
          </MotionBox>
        </Container>
      </Box>

      {/* Content Section */}
      <Container maxW="4xl" py={16}>
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Stack gap={8}>
            {/* Introduction */}
            <Section title="Agreement Overview">
              <Text fontSize="md" color="muted" lineHeight="1.7">
                This Terms of Use Agreement (the "Agreement") is a legal agreement between you ("User," "You," or "Your") and Ioxet Labs Pvt. Ltd., a corporation with its principal place of business at Hattiban, Lalitpur (the "Company," "We," "Us," or "Our"). This Agreement governs Your access to and use of Our software-as-a-service (SaaS) platform and products (the "Service"), including Amigaa (amigaa.com), ERP/E-commerce (oneerp.us), PlayToFit (playto.fit), Awiskar (awiskar.com), and any and all current and future products, any other related websites, applications, features, content, or documentation provided by Us.
              </Text>
              <Text fontSize="md" color="muted" lineHeight="1.7">
                By accessing or using the Service, You agree to be bound by this Agreement. If You are entering into this Agreement on behalf of a company or other legal entity, You represent that You have the authority to bind such entity to these terms. If You do not agree to this Agreement, You must not access or use the Service.
              </Text>
            </Section>

            {/* Definitions */}
            <Section title="1. Definitions">
              <List.Root gap={3}>
                <List.Item>
                  <BulletPoint title="Account:">
                    A unique user account created for You to access the Service.
                  </BulletPoint>
                </List.Item>
                <List.Item>
                  <BulletPoint title="Affiliate:">
                    An entity that controls, is controlled by, or is under common control with a party, where "control" means ownership of 50% or more of the shares or voting rights.
                  </BulletPoint>
                </List.Item>
                <List.Item>
                  <BulletPoint title="Authorized User:">
                    Your employees, contractors, or agents authorized to use the Service under Your Account.
                  </BulletPoint>
                </List.Item>
                <List.Item>
                  <BulletPoint title="Content:">
                    Any text, images, data, or other information uploaded, posted, or transmitted through the Service by You or on Your behalf.
                  </BulletPoint>
                </List.Item>
                <List.Item>
                  <BulletPoint title="Your Data/Customer Data:">
                    Data and information, including content, and information, submitted by You or Authorized Users through the Service.
                  </BulletPoint>
                </List.Item>
                <List.Item>
                  <BulletPoint title="Documentation:">
                    User manuals, guides, and other materials provided by Us related to the Service.
                  </BulletPoint>
                </List.Item>
                <List.Item>
                  <BulletPoint title="Fees:">
                    The charges payable by You for use of the Service, as specified in Your subscription plan.
                  </BulletPoint>
                </List.Item>
                <List.Item>
                  <BulletPoint title="Service:">
                    The SaaS platforms, portals, apps, and products provided by the Company, including all features, functionalities, and related services.
                  </BulletPoint>
                </List.Item>
                <List.Item>
                  <BulletPoint title="Subscription Term:">
                    The period during which You have subscribed to access the Service.
                  </BulletPoint>
                </List.Item>
                <List.Item>
                  <BulletPoint title="Third-Party Services:">
                    Any products, services, or content provided by third parties that may be integrated with or accessed through the Service.
                  </BulletPoint>
                </List.Item>
              </List.Root>
            </Section>

            {/* Access and Use */}
            <Section title="2. Access and Use of the Service">
              <Text fontSize="md" color="muted" lineHeight="1.7">
                By accessing or using our Service, you agree to be bound by these Terms of Use ("Terms"). If you do not agree to all of these Terms, you are not permitted to use the Service. These Terms apply to all visitors, users, and others who access or use the Service.
              </Text>

              <SubSection title="2.1 Grant of Access">
                <Text fontSize="md" color="muted" lineHeight="1.7">
                  Subject to Your compliance with this Agreement and payment of applicable Fees, We grant You a limited, non-exclusive, non-transferable, non-sublicensable right to access and use the Service during the Subscription Term solely for Your internal business purposes. The number of Authorized Users is limited to the number specified in Your subscription plan.
                </Text>
              </SubSection>

              <SubSection title="2.2 Account Registration">
                <Text fontSize="md" color="muted" lineHeight="1.7" mb={2}>
                  To use the Service, you must register for an account. When you create an account, you agree to:
                </Text>
                <List.Root gap={2} pl={6}>
                  <List.Item>
                    <Text fontSize="md" color="muted" lineHeight="1.7">
                      Provide accurate, complete, and current information.
                    </Text>
                  </List.Item>
                  <List.Item>
                    <Text fontSize="md" color="muted" lineHeight="1.7">
                      Maintain the confidentiality of Your Account credentials, and security of your password and accept all risks of unauthorized access to Your account.
                    </Text>
                  </List.Item>
                  <List.Item>
                    <Text fontSize="md" color="muted" lineHeight="1.7">
                      Notify us immediately if you discover or otherwise suspect any unauthorized use or security breaches related to your account.
                    </Text>
                  </List.Item>
                </List.Root>
                <Text fontSize="md" color="muted" lineHeight="1.7" mt={2}>
                  You are responsible for all activities that occur under your account.
                </Text>
              </SubSection>

              <SubSection title="2.3 User Obligations and Prohibited Conduct">
                <Text fontSize="md" color="muted" lineHeight="1.7" mb={2}>
                  You agree to use the Service only for lawful purposes and in a way that does not infringe on the rights of others or restrict their use and enjoyment of the Service. You shall not, and shall not permit any Authorized User to:
                </Text>
                <List.Root gap={2} pl={6}>
                  <List.Item>
                    <Text fontSize="md" color="muted" lineHeight="1.7">
                      Use the Service for any illegal, unauthorized, or prohibited purpose.
                    </Text>
                  </List.Item>
                  <List.Item>
                    <Text fontSize="md" color="muted" lineHeight="1.7">
                      Attempt to gain unauthorized access to our systems or other user accounts.
                    </Text>
                  </List.Item>
                  <List.Item>
                    <Text fontSize="md" color="muted" lineHeight="1.7">
                      Reproduce, duplicate, copy, modify, exploit, or create derivative works of any part of the Service or Documentation without our express written permission.
                    </Text>
                  </List.Item>
                  <List.Item>
                    <Text fontSize="md" color="muted" lineHeight="1.7">
                      Reverse engineer, decompile, or attempt to extract the source code of the Service.
                    </Text>
                  </List.Item>
                  <List.Item>
                    <Text fontSize="md" color="muted" lineHeight="1.7">
                      Rent, lease, sell, sublicense, or otherwise transfer rights to the Service.
                    </Text>
                  </List.Item>
                  <List.Item>
                    <Text fontSize="md" color="muted" lineHeight="1.7">
                      Upload or transmit viruses, malware, or any malicious codes.
                    </Text>
                  </List.Item>
                  <List.Item>
                    <Text fontSize="md" color="muted" lineHeight="1.7">
                      Engage in any activities that Interfere with or disrupt the integrity or performance of the Service or our servers.
                    </Text>
                  </List.Item>
                  <List.Item>
                    <Text fontSize="md" color="muted" lineHeight="1.7">
                      Access the Service in a way that infringes on third-party rights or violates applicable laws.
                    </Text>
                  </List.Item>
                  <List.Item>
                    <Text fontSize="md" color="muted" lineHeight="1.7">
                      Exceed the usage limits specified in Your subscription plan.
                    </Text>
                  </List.Item>
                </List.Root>
                <Text fontSize="md" color="muted" lineHeight="1.7" mt={2}>
                  We reserve the right to monitor use of the Service and to suspend or terminate access if We suspect a violation of this Agreement.
                </Text>
              </SubSection>

              <SubSection title="2.4 Documentation License">
                <Text fontSize="md" color="muted" lineHeight="1.7">
                  We grant You a limited license to use the Documentation solely in connection with Your use of the Service.
                </Text>
              </SubSection>
            </Section>

            {/* Fees and Payment */}
            <Section title="3. Fees and Payment">
              <SubSection title="3.1 Subscription Fees">
                <Text fontSize="md" color="muted" lineHeight="1.7">
                  You agree to pay all Fees associated with Your subscription plan. Fees are non-refundable, except as required by law, and are based on the subscription tier and number of Authorized Users selected.
                </Text>
              </SubSection>

              <SubSection title="3.2 Payment Terms">
                <Text fontSize="md" color="muted" lineHeight="1.7">
                  Fees are billed monthly or annually, based on the subscribed plan, in advance and are due within 7 days of the invoice date. You must provide valid payment information. Late payments may incur interest at 1.5% per month or the maximum rate permitted by law.
                </Text>
              </SubSection>

              <SubSection title="3.3 Taxes">
                <Text fontSize="md" color="muted" lineHeight="1.7">
                  All Fees exclude applicable taxes, which You are responsible for paying.
                </Text>
              </SubSection>

              <SubSection title="3.4 Payment Processing">
                <Text fontSize="md" color="muted" lineHeight="1.7">
                  All payments are processed through a secure third-party payment processor.
                </Text>
              </SubSection>

              <SubSection title="3.5 Fee Changes">
                <Text fontSize="md" color="muted" lineHeight="1.7">
                  We reserve the right to change our pricing at any time, but we will provide you with prior notice. Your continued use of the Service after a price change constitutes your agreement to pay the new amount.
                </Text>
              </SubSection>

              <SubSection title="3.6 Additional Users">
                <Text fontSize="md" color="muted" lineHeight="1.7">
                  You may add Authorized Users during the Subscription Term by paying additional pro-rated Fees.
                </Text>
              </SubSection>
            </Section>

            {/* Intellectual Property */}
            <Section title="4. Intellectual Property Rights">
              <SubSection title="4.1 Ownership">
                <Text fontSize="md" color="muted" lineHeight="1.7">
                  The Service, Documentation, and all related intellectual property rights, including all software, text, graphics, logos, and all other content, are owned by Us or Our licensors. They are protected by copyright, trademark, and other intellectual property laws. This Agreement does not transfer any ownership rights to You.
                </Text>
              </SubSection>

              <SubSection title="4.2 Customer Data">
                <Text fontSize="md" color="muted" lineHeight="1.7">
                  You retain ownership of Your Customer Data. You grant Us a worldwide, royalty-free, non-exclusive license to use, store, process, reproduce, modify, and display Customer Data as necessary for the purpose of providing and improving the Service.
                </Text>
              </SubSection>

              <SubSection title="4.3 Feedback">
                <Text fontSize="md" color="muted" lineHeight="1.7">
                  Any suggestions or feedback You provide regarding the Service becomes Our property, and We may use it without compensation to You.
                </Text>
              </SubSection>

              <SubSection title="4.4 Aggregated Statistics">
                <Text fontSize="md" color="muted" lineHeight="1.7">
                  We may compile and use Aggregated Statistics (anonymous, aggregated data derived from Your use) for any purpose, provided it does not identify You or Your Confidential Information.
                </Text>
              </SubSection>
            </Section>

            {/* Data Privacy */}
            <Section title="5. Data Privacy and Security">
              <SubSection title="5.1 Privacy Policy">
                <Text fontSize="md" color="muted" lineHeight="1.7">
                  Your use of the Service is subject to Our Privacy Policy, available{" "}
                  <LinkBox display="inline">
                    <LinkOverlay 
                      href="/privacy"
                      color="primary.500"
                      // textDecoration="underline"
                      _hover={{
                        color: "primary.600",
                        textDecoration: "underline"
                      }}
                    >
                      here
                    </LinkOverlay>
                  </LinkBox>
                  , which describes how We collect, use, and protect Your data.
                </Text>
              </SubSection>

              <SubSection title="5.2 Security">
                <Text fontSize="md" color="muted" lineHeight="1.7">
                  We will implement reasonable security measures to protect Customer Data. However, You are responsible for securing Your Account and any data You transmit.
                </Text>
              </SubSection>

              <SubSection title="5.3 Compliance">
                <Text fontSize="md" color="muted" lineHeight="1.7">
                  Both parties will comply with applicable data protection laws, including GDPR, CCPA if applicable.
                </Text>
              </SubSection>
            </Section>

            {/* Confidentiality */}
            <Section title="6. Confidentiality">
              <Text fontSize="md" color="muted" lineHeight="1.7">
                Each party agrees to keep confidential any non-public information disclosed by the other party and to use it only as necessary to perform under this Agreement. This obligation survives termination for 3 years.
              </Text>
            </Section>

            {/* Warranties */}
            <Section title="7. Warranties and Disclaimers">
              <SubSection title="7.1 Our Warranties">
                <Text fontSize="md" color="muted" lineHeight="1.7">
                  We warrant that the Service will perform substantially as described in the Documentation and that We will provide the Service in a professional manner.
                </Text>
              </SubSection>

              <SubSection title="7.2 Your Warranties">
                <Text fontSize="md" color="muted" lineHeight="1.7">
                  You warrant that You have the right to provide Customer Data and that Your use of the Service complies with applicable laws.
                </Text>
              </SubSection>

              <SubSection title="7.3 Disclaimer">
                <Box bg="orange.50" p={4} borderRadius="lg" borderLeft="4px solid" borderColor="orange.500">
                  <Text fontSize="md" color="text" lineHeight="1.7" fontWeight="600">
                    EXCEPT AS EXPRESSLY PROVIDED, THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, REGARDING THE SERVICE, INCLUDING BUT NOT LIMITED TO ANY IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. WE DO NOT GUARANTEE THE SERVICE WILL BE ERROR-FREE OR UNINTERRUPTED.
                  </Text>
                </Box>
              </SubSection>
            </Section>

            {/* Limitation of Liability */}
            <Section title="8. Limitation of Liability">
              <Box bg="red.50" p={6} borderRadius="lg" borderLeft="4px solid" borderColor="red.500">
                <Text fontSize="md" color="text" lineHeight="1.7" fontWeight="600" mb={3}>
                  TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL IOXET LABS PVT. LTD., ITS AFFILIATES, OFFICERS, DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE FOR ANY INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES, INCLUDING WITHOUT LIMITATION, DAMAGES FOR LOSS OF PROFITS, GOODWILL, USE, DATA, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR RELATING TO YOUR USE OF OR INABILITY TO USE THE SERVICE.
                </Text>
                <Text fontSize="md" color="text" lineHeight="1.7" fontWeight="600">
                  OUR TOTAL LIABILITY TO YOU FOR ALL CLAIMS RELATING TO THE SERVICE SHALL NOT EXCEED THE AMOUNT PAID BY YOU TO US FOR THE USE OF THE SERVICE DURING THE TWELVE (12) MONTHS PRECEDING THE CLAIM.
                </Text>
              </Box>
            </Section>

            {/* Indemnification */}
            <Section title="9. Indemnification">
              <SubSection title="9.1 Our Indemnification">
                <Text fontSize="md" color="muted" lineHeight="1.7">
                  We will indemnify You against third-party claims that the Service infringes their intellectual property rights, subject to conditions such as prompt notice and Our control of defense.
                </Text>
              </SubSection>

              <SubSection title="9.2 Your Indemnification">
                <Text fontSize="md" color="muted" lineHeight="1.7">
                  You agree to indemnify, defend, and hold harmless Ioxet Labs Pvt. Ltd. and its affiliates, officers, directors, and employees from any and all claims, liabilities, damages, costs, and expenses (including reasonable attorneys' fees) arising out of or in any way connected with your use of the Service or your breach of these Terms.
                </Text>
              </SubSection>
            </Section>

            {/* Termination */}
            <Section title="10. Termination">
              <SubSection title="10.1 Term">
                <Text fontSize="md" color="muted" lineHeight="1.7">
                  This Agreement begins on the Effective Date and continues for the initial Subscription Term, renewing automatically unless terminated.
                </Text>
              </SubSection>

              <SubSection title="10.2 Termination for Cause">
                <Text fontSize="md" color="muted" lineHeight="1.7">
                  Either party may terminate for material breach with 30 days' notice if the breach is not cured. You may terminate your account at any time by contacting us. We may terminate or suspend your account and access to the Service at our sole discretion, without prior notice or liability, for any reason, including if you breach these Terms.
                </Text>
              </SubSection>

              <SubSection title="10.3 Effect of Termination">
                <Text fontSize="md" color="muted" lineHeight="1.7">
                  Upon termination, Your access to the Service will immediately cease, and We may delete Your data after 30 days. Accrued Fees remain payable.
                </Text>
              </SubSection>

              <SubSection title="10.4 Survival">
                <Text fontSize="md" color="muted" lineHeight="1.7">
                  Sections regarding ownership, confidentiality, indemnification, limitation of liability, and governing law survive termination.
                </Text>
              </SubSection>
            </Section>

            {/* Governing Law */}
            <Section title="11. Governing Law and Jurisdiction">
              <Text fontSize="md" color="muted" lineHeight="1.7">
                These Terms shall be governed and construed in accordance with the laws of the government of Nepal, without regard to its conflict of law provisions. You agree to submit to the personal and exclusive jurisdiction of the courts located in Lalitpur, Bagmati, Nepal to resolve any dispute or claim arising from these Terms.
              </Text>
            </Section>

            {/* Miscellaneous */}
            <Section title="12. Miscellaneous">
              <SubSection title="12.1 Entire Agreement">
                <Text fontSize="md" color="muted" lineHeight="1.7">
                  This Agreement constitutes the entire understanding between the parties and supersedes all prior agreements.
                </Text>
              </SubSection>

              <SubSection title="12.2 Amendments">
                <Text fontSize="md" color="muted" lineHeight="1.7">
                  We reserve the right to modify or replace these Terms at any time at our sole discretion. We will notify you of any changes by posting the new Terms on this page and updating the "Last Updated" date. Your continued use of the Service after any such changes constitutes your acceptance of the new Terms.
                </Text>
              </SubSection>

              <SubSection title="12.3 Severability">
                <Text fontSize="md" color="muted" lineHeight="1.7">
                  If any provision is invalid, the remainder remains enforceable.
                </Text>
              </SubSection>

              <SubSection title="12.4 Force Majeure">
                <Text fontSize="md" color="muted" lineHeight="1.7">
                  Neither party is liable for delays due to events beyond reasonable control.
                </Text>
              </SubSection>

              <SubSection title="12.5 Assignment">
                <Text fontSize="md" color="muted" lineHeight="1.7">
                  You may not assign this Agreement without Our consent; We may assign freely.
                </Text>
              </SubSection>

              <SubSection title="12.6 Notices">
                <Text fontSize="md" color="muted" lineHeight="1.7" mb={2}>
                  Questions and Notices must be in writing and sent to the addresses provided:
                </Text>
                <List.Root gap={2} pl={6}>
                  <List.Item>
                    <Text fontSize="md" color="muted" lineHeight="1.7">
                      By email: hello@ioxet.com
                    </Text>
                  </List.Item>
                  <List.Item>
                    <Text fontSize="md" color="muted" lineHeight="1.7">
                      By mail: Hattiban, Lalitpur, Nepal
                    </Text>
                  </List.Item>
                </List.Root>
              </SubSection>
            </Section>

            {/* Contact Section */}
            <Box 
              mt={12} 
              p={8} 
              bg="primary.50" 
              borderRadius="2xl"
              borderLeft="4px solid"
              borderColor="primary.500"
            >
              <Heading as="h3" fontSize="xl" fontWeight="700" color="text" mb={3}>
                Questions About These Terms?
              </Heading>
              <Text fontSize="md" color="muted" lineHeight="1.7" mb={4}>
                If you have any questions about these Terms of Service, please contact us through our Contact page or email us at hello@ioxet.com.
              </Text>
              <Text fontSize="sm" color="muted" fontStyle="italic">
                Ioxet Labs Pvt. Ltd. - Building the future of digital solutions.
              </Text>
            </Box>
          </Stack>
        </MotionBox>
      </Container>
    </Box>
  )
}

export default TermsOfServicePage
