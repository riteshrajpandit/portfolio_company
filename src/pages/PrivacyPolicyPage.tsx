import {
  Box,
  Container,
  Text,
  VStack,
  Heading,
  List,
  Stack,
  Link as ChakraLink,
} from "@chakra-ui/react"
import { motion } from "framer-motion"
import { Tooltip } from "../components/ui/tooltip"

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

const BulletPoint = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Box pl={4} borderLeft="3px solid" borderColor="primary.200" mb={3}>
    <Text fontSize="md" fontWeight="600" color="text" mb={1}>
      {title}
    </Text>
    <Text fontSize="md" color="muted" lineHeight="1.7">
      {children}
    </Text>
  </Box>
)

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
              Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
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
            <Section title="Introduction">
              <Text fontSize="md" color="muted" lineHeight="1.7">
                We, IOXET Labs Pvt. Ltd. (together with{" "}
                <Tooltip 
                  content="https://agent.amigaa.com"
                  openDelay={100}
                  closeDelay={200}
                  showArrow
                >
                  <ChakraLink 
                    href="https://agent.amigaa.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    color="primary.500"
                    fontWeight="600"
                    textDecoration="underline"
                    bg="primary.50"
                    px={1}
                    borderRadius="sm"
                    display="inline-block"
                    _hover={{
                      color: "primary.600",
                      bg: "primary.100"
                    }}
                  >
                    Amigaa
                  </ChakraLink>
                </Tooltip>
                ,{" "}
                <Tooltip 
                  content="https://oneerp.us"
                  openDelay={100}
                  closeDelay={200}
                  showArrow
                >
                  <ChakraLink 
                    href="https://oneerp.us" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    color="primary.500"
                    fontWeight="600"
                    textDecoration="underline"
                    bg="primary.50"
                    px={1}
                    borderRadius="sm"
                    display="inline-block"
                    _hover={{
                      color: "primary.600",
                      bg: "primary.100"
                    }}
                  >
                    ERP/E-commerce
                  </ChakraLink>
                </Tooltip>
                ,{" "}
                <Tooltip 
                  content="https://playto.fit"
                  openDelay={100}
                  closeDelay={200}
                  showArrow
                >
                  <ChakraLink 
                    href="https://playto.fit" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    color="primary.500"
                    fontWeight="600"
                    textDecoration="underline"
                    bg="primary.50"
                    px={1}
                    borderRadius="sm"
                    display="inline-block"
                    _hover={{
                      color: "primary.600",
                      bg: "primary.100"
                    }}
                  >
                    PlayToFit
                  </ChakraLink>
                </Tooltip>
                ,{" "}
                <Tooltip 
                  content="https://www.awiskar.com"
                  openDelay={100}
                  closeDelay={200}
                  showArrow
                >
                  <ChakraLink 
                    href="https://www.awiskar.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    color="primary.500"
                    fontWeight="600"
                    textDecoration="underline"
                    bg="primary.50"
                    px={1}
                    borderRadius="sm"
                    display="inline-block"
                    _hover={{
                      color: "primary.600",
                      bg: "primary.100"
                    }}
                  >
                    Awiskar
                  </ChakraLink>
                </Tooltip>
                , and "Company", "we", "us", or "our") respect your privacy and are committed to protecting it through our compliance with this Privacy Policy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Software as a Service (SaaS) platforms, including any related applications, services, or tools (collectively, the "Service").
              </Text>
              <Text fontSize="md" color="muted" lineHeight="1.7">
                This Privacy Policy does not apply to content that we process on behalf of our customers, such as our API, or the data that customer use to train the bots for their internal or external use purposes. Our use of that data is governed by our customer agreements covering access to and use of those offerings.
              </Text>
              <Text fontSize="md" color="muted" lineHeight="1.7">
                By accessing or using our Service, you signify that you have read, understood, and agreed to our collection, storage, use, and disclosure of your personal information as described in this Privacy Policy.
              </Text>
            </Section>

            {/* Information We Collect */}
            <Section title="1. Information We Collect">
              <Text fontSize="md" color="muted" lineHeight="1.7">
                We collect several types of information from and about users of our Service:
              </Text>

              <SubSection title="a) Information You Provide Directly or Indirectly:">
                <List.Root gap={3}>
                  <List.Item>
                    <BulletPoint title="Account Information:">
                      When you create an account with us, we will collect information associated with it including your name, contact information, email address, company name, billing address, payment information, and billing history. Some of these information may be collected through trusted partners, and oAuth providers.
                    </BulletPoint>
                  </List.Item>
                  <List.Item>
                    <BulletPoint title="User Content:">
                      This includes any data, files, or information you upload, submit, or store within the Service (e.g., project data, customer lists, documents). We process this data solely to provide the Service to you and in accordance with your instructions.
                    </BulletPoint>
                  </List.Item>
                  <List.Item>
                    <BulletPoint title="Communication Information:">
                      When you contact us for support or with inquiries, such as via email or our pages on social media sites, we may collect Personal Data like your name, contact information, and the contents of the messages you send.
                    </BulletPoint>
                  </List.Item>
                  <List.Item>
                    <BulletPoint title="Other Information You Provide:">
                      We collect other information that you may provide to us, such as when you participate in our events or surveys or provide us with information to establish your identity or age.
                    </BulletPoint>
                  </List.Item>
                </List.Root>
              </SubSection>

              <SubSection title="b) Information Collected Automatically:">
                <List.Root gap={3}>
                  <List.Item>
                    <BulletPoint title="Usage and Log Data:">
                      We automatically collect information about your interaction with the Service. This includes your IP address, browser type and settings, pages you visit, the date and time of your request, and other diagnostic data.
                    </BulletPoint>
                  </List.Item>
                  <List.Item>
                    <BulletPoint title="Device Information:">
                      We do not collect device information.
                    </BulletPoint>
                  </List.Item>
                  <List.Item>
                    <BulletPoint title="Location Information:">
                      We may determine the general area from which your device accesses our Services based on information like its IP address for security reasons and to make your product experience better, for example to protect your account by detecting unusual login activity or to provide more accurate responses.
                    </BulletPoint>
                  </List.Item>
                  <List.Item>
                    <BulletPoint title="Cookies and Similar Technologies:">
                      We use cookies and similar technologies (e.g., web beacons, pixels) to track your activities and to operate and administer our Services and improve your experience, such as to help maintain your preferences across browsing sessions. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
                    </BulletPoint>
                  </List.Item>
                </List.Root>
              </SubSection>

              <SubSection title="c) Information We Receive from Other Sources:">
                <Text fontSize="md" color="muted" lineHeight="1.7">
                  We receive information from our trusted partners, such as security partners, to protect against fraud, abuse, and other security threats to our Services, and from marketing vendors who provide us with information about potential customers of our business services.
                </Text>
                <Text fontSize="md" color="muted" lineHeight="1.7">
                  We also collect information from other sources, like information that is publicly available on the internet, to develop and train the models that power our Services. (amigaa)
                </Text>
              </SubSection>
            </Section>

            {/* How We Use Information */}
            <Section title="2. How We Use Your Personal and Business Information">
              <Text fontSize="md" color="muted" lineHeight="1.7">
                We use the information we collect for the following purposes:
              </Text>
              <List.Root gap={3}>
                <List.Item>
                  <BulletPoint title="To Provide and Maintain the Service:">
                    To create your account, process payments, manage subscriptions, and provide customer support.
                  </BulletPoint>
                </List.Item>
                <List.Item>
                  <BulletPoint title="To Improve and Personalize the Service:">
                    To understand how you use the Service so we can optimize features, develop new products, and personalize your experience.
                  </BulletPoint>
                </List.Item>
                <List.Item>
                  <BulletPoint title="To Communicate with You:">
                    To send you administrative messages, technical notices, updates, security alerts, and support and administrative messages. With your permission, we may also send you marketing and promotional communications. You can opt-out of these at any time.
                  </BulletPoint>
                </List.Item>
                <List.Item>
                  <BulletPoint title="To Ensure Security and Fraud Prevention:">
                    To monitor and protect the security of our Service, investigate suspicious activity, and protect against fraud.
                  </BulletPoint>
                </List.Item>
                <List.Item>
                  <BulletPoint title="To Comply with Legal Obligations:">
                    To comply with applicable laws, regulations, and legal processes.
                  </BulletPoint>
                </List.Item>
              </List.Root>
              <Text fontSize="md" color="muted" lineHeight="1.7" mt={4}>
                We may also aggregate or de-identify Personal Data so that it no longer identifies you and use this information for the purposes described above, such as to analyze the way our Services are being used, to improve and add features to them, and to conduct research. We will maintain and use de-identified information in de-identified form and not attempt to reidentify the information, unless required by law.
              </Text>
            </Section>

            {/* How We Share Information */}
            <Section title="3. How We Share Your Information">
              <Text fontSize="md" color="muted" lineHeight="1.7">
                We do not sell, rent, or trade your personal information to third parties. We may share your information in the following limited circumstances:
              </Text>
              <List.Root gap={3}>
                <List.Item>
                  <BulletPoint title="Service Providers:">
                    We employ third-party companies and individuals ("Data Processors") to facilitate our Service (e.g., cloud hosting providers like AWS or Google Cloud, payment processors like Stripe, customer support software, and analytics providers). These third parties have access to your information only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
                  </BulletPoint>
                </List.Item>
                <List.Item>
                  <BulletPoint title="Business Transfers:">
                    If we are involved in a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction.
                  </BulletPoint>
                </List.Item>
                <List.Item>
                  <BulletPoint title="Legal Requirements:">
                    We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court or a government agency).
                  </BulletPoint>
                </List.Item>
                <List.Item>
                  <BulletPoint title="To Protect Rights:">
                    To investigate potential violations of our Terms of Service, or to protect the rights, property, and safety of our company, our users, or the public.
                  </BulletPoint>
                </List.Item>
                <List.Item>
                  <BulletPoint title="Affiliates:">
                    We may disclose Personal Data to our affiliates, meaning an entity that controls, is controlled by, or is under common control with IOXET Labs, such as Amigaa, and ERP. Our affiliates may use this Personal Data in a manner consistent with this Privacy Policy.
                  </BulletPoint>
                </List.Item>
                <List.Item>
                  <BulletPoint title="Business Account Administrators:">
                    When you join our Service for your entire enterprise, the administrators of your account may access and control your business account, including being able to access your Content. In addition, if you create an account using an email address belonging to your employer or another organization, we may share the fact that you have an account and certain account information, such as your email address, with your employer or organization to, for example, enable you to be added to their business account.
                  </BulletPoint>
                </List.Item>
                <List.Item>
                  <BulletPoint title="Ownership Transfer:">
                    If you create an account for a business, and the business is transferred or claimed to be owned by others, we may temporarily freeze the Service until the dispute is resolved and transfer the underlying data to the rightful owner after verifying the ownership.
                  </BulletPoint>
                </List.Item>
                <List.Item>
                  <BulletPoint title="Other Users and Third Parties You Interact or Share Information With:">
                    As our Services have features that allow you to interact or share information, such as sharing conversations with Amigaa Agent, with other users or third parties, we are no longer in control of such share. In fact, information you share with third parties is governed by their own terms and privacy policies, and you should make sure you understand those terms and policies before sharing information with them.
                  </BulletPoint>
                </List.Item>
              </List.Root>
            </Section>

            {/* Data Retention */}
            <Section title="4. Data Retention">
              <Text fontSize="md" color="muted" lineHeight="1.7">
                We will retain your personal information for only as long as your account is active with us or is necessary for the purposes set out in this Privacy Policy, including to fulfill legal, accounting, or reporting requirements. We will also retain and use your information to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our agreements.
              </Text>
              <Text fontSize="md" color="muted" lineHeight="1.7">
                The period of data retention partly depends on:
              </Text>
              <List.Root gap={2} pl={6}>
                <List.Item>
                  <Text fontSize="md" color="muted" lineHeight="1.7">
                    The length of the Services you use;
                  </Text>
                </List.Item>
                <List.Item>
                  <Text fontSize="md" color="muted" lineHeight="1.7">
                    The nature, sensitivity and amount of the information;
                  </Text>
                </List.Item>
                <List.Item>
                  <Text fontSize="md" color="muted" lineHeight="1.7">
                    The potential risk of harm of data from unauthorized use or disclosure;
                  </Text>
                </List.Item>
                <List.Item>
                  <Text fontSize="md" color="muted" lineHeight="1.7">
                    Any legal requirements that we are subject to.
                  </Text>
                </List.Item>
              </List.Root>
              <Text fontSize="md" color="muted" lineHeight="1.7" mt={4}>
                Except in case of resolution of Ownership Transfer as defined in clause 3 above, you can request the deletion of your account and associated data through the Service or by contacting us.
              </Text>
            </Section>

            {/* Your Rights */}
            <Section title="5. Your Rights and Choices">
              <Text fontSize="md" color="muted" lineHeight="1.7">
                Depending on your location and jurisdiction, you may have the following statutory rights regarding your personal information:
              </Text>
              <List.Root gap={3}>
                <List.Item>
                  <BulletPoint title="Right to Access:">
                    The right to request copies of your personal data.
                  </BulletPoint>
                </List.Item>
                <List.Item>
                  <BulletPoint title="Right to Rectification:">
                    The right to request that we correct any information you believe is inaccurate or complete information you believe is incomplete.
                  </BulletPoint>
                </List.Item>
                <List.Item>
                  <BulletPoint title="Right to Delete:">
                    The right to request that we erase your personal data, under certain conditions.
                  </BulletPoint>
                </List.Item>
                <List.Item>
                  <BulletPoint title="Right to Restrict Processing:">
                    The right to request that we restrict the processing of your personal data, under certain conditions.
                  </BulletPoint>
                </List.Item>
                <List.Item>
                  <BulletPoint title="Right to Data Portability:">
                    The right to request that we transfer the data we have collected to another organization, or directly to you, under certain conditions.
                  </BulletPoint>
                </List.Item>
                <List.Item>
                  <BulletPoint title="Right to Object to Processing:">
                    The right to object to our processing of your personal data, under certain conditions.
                  </BulletPoint>
                </List.Item>
                <List.Item>
                  <BulletPoint title="Right to Opt-Out of Sale/Sharing (CCPA/CPRA):">
                    The right to withdraw your consent (where applicable) or direct a business that sells or shares personal data to stop doing so.
                  </BulletPoint>
                </List.Item>
              </List.Root>
              <Text fontSize="md" color="muted" lineHeight="1.7" mt={4}>
                To exercise any of these rights, please contact us using the details provided in the "Contact Us" form.
              </Text>
            </Section>

            {/* Data Security */}
            <Section title="6. Data Security">
              <Text fontSize="md" color="muted" lineHeight="1.7">
                We implement appropriate technical, administrative, and organizational security measures designed to protect the your information from unauthorized access, disclosure, alteration or destruction. These measures include encryption (in transit and at rest), regular security assessments, and access controls.
              </Text>
              <Text fontSize="md" color="muted" lineHeight="1.7">
                However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee its absolute security.
              </Text>
              <Text fontSize="md" color="muted" lineHeight="1.7">
                Additionally, if you are utilizing third-party APIs to enhance your experience with your data, we cannot guarantee data security for obvious reasons. Therefore, you should take special care in deciding information you share.
              </Text>
              <Text fontSize="md" color="muted" lineHeight="1.7">
                In addition, we are not responsible for circumvention of any privacy settings or security measures contained on the Service, or third-party websites.
              </Text>
            </Section>

            {/* International Transfers */}
            <Section title="7. International Data Transfers">
              <Text fontSize="md" color="muted" lineHeight="1.7">
                Your information may be transferred to — and maintained on — computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ from those of your jurisdiction. We will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy, including relying on approved legal mechanisms like Standard Contractual Clauses.
              </Text>
            </Section>

            {/* Accuracy */}
            <Section title="8. About Accuracy (for Amigaa)">
              <Text fontSize="md" color="muted" lineHeight="1.7">
                Our Services generate responses, from the data that you used to train them, against user's input requests and, in response, predicting the words most likely to appear next. In rare instances, the output might not be the most factually accurate, particularly in subjective answers. If you come into such situations, we request you to specifically update the training data from the particular Services' playground.
              </Text>
            </Section>

            {/* Children's Privacy */}
            <Section title="9. Children's Privacy">
              <Text fontSize="md" color="muted" lineHeight="1.7">
                Our Services are mostly intended to the businesses, and business owners, they are particularly not intended for children under 18. We do not knowingly collect personal information from children. We will investigate any notification and, if appropriate, delete the Data from our systems.
              </Text>
              <Text fontSize="md" color="muted" lineHeight="1.7">
                In specific and special cases, every user under 18 must have permission from their parent or guardian to use our Services.
              </Text>
            </Section>

            {/* Third-Party Services */}
            <Section title="10. Third-Party Services">
              <Text fontSize="md" color="muted" lineHeight="1.7">
                Our Service may contain links to or integrations with third-party services. This Privacy Policy does not apply to those third parties. Please review their privacy policies independently.
              </Text>
            </Section>

            {/* Changes to Policy */}
            <Section title="11. Changes to This Policy">
              <Text fontSize="md" color="muted" lineHeight="1.7">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. We will also provide a more prominent notice for significant changes by email or through the Service.
              </Text>
              <Text fontSize="md" color="muted" lineHeight="1.7">
                Your continued use of the Service after changes are made indicates your acceptance of the updated policy.
              </Text>
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
                Questions or Concerns?
              </Heading>
              <Text fontSize="md" color="muted" lineHeight="1.7" mb={4}>
                If you have any questions about this Privacy Policy or our data practices, please contact us through our Contact page or reach out to our support team.
              </Text>
              <Text fontSize="sm" color="muted" fontStyle="italic">
                IOXET Labs Pvt. Ltd. - Committed to protecting your privacy and data security.
              </Text>
            </Box>
          </Stack>
        </MotionBox>
      </Container>
    </Box>
  )
}

export default PrivacyPolicyPage
