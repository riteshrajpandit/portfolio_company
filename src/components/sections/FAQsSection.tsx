import {
  Box,
  Container,
  Text,
  VStack,
  HStack,
  Icon,
  Button,
} from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { useState } from "react"
import { HiChevronDown, HiArrowRight } from "react-icons/hi2"

const MotionBox = motion(Box)

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: "What services does our company provide?",
    answer: "We specialize in crafting digital experiences, including custom web applications, mobile app development, UI/UX design, enterprise software solutions, and cloud-based platforms tailored to your business needs."
  },
  {
    question: "Do we work with startups, enterprises, or both?",
    answer: "Both! We collaborate with startups looking to launch innovative products and enterprises seeking scalable, future-ready digital solutions."
  },
  {
    question: "How do we ensure the quality of our projects?",
    answer: "We follow industry best practices, agile methodologies, and rigorous testing standards to deliver secure, high-performing, and user-friendly solutions."
  },
  {
    question: "What technologies do we use?",
    answer: "Our expertise spans modern frameworks and tools such as React, Next.js, Angular, Flutter, Node.js, Python, .NET, cloud services (AWS, Azure, GCP), and more—always choosing the right stack for your project."
  },
  {
    question: "Can we customize solutions for your specific business needs?",
    answer: "Absolutely. Every solution we create is tailored to your goals, workflows, and growth plans. We believe in building technology that works for you, not the other way around."
  },
  {
    question: "How do we manage project timelines and budgets?",
    answer: "We use agile project management, clear communication, and transparent pricing models to ensure projects stay on track and within budget."
  },
  {
    question: "Do we offer ongoing support and maintenance?",
    answer: "Yes. We provide end-to-end lifecycle support, including updates, performance monitoring, bug fixes, security patches, and feature enhancements."
  },
  {
    question: "How secure are our solutions?",
    answer: "Security is a top priority. We adhere to best practices in application security, encryption, compliance standards (ISO, GDPR, etc.), and continuous monitoring to safeguard your data and systems."
  },
  {
    question: "What makes our company different from others?",
    answer: "We combine technical expertise with creativity, ensuring not only functional but also visually stunning and intuitive digital experiences that drive business growth."
  },
  {
    question: "How can you get started with us?",
    answer: "Simply reach out to us through our contact page, and we'll schedule a consultation to discuss your vision, goals, and how we can bring them to life."
  }
]

export const FAQsSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <Box py={{ base: 16, md: 20 }} bg="white">
        
      <Container maxW="4xl">
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          textAlign="center"
          mb={12}
        >
          <Text
            fontSize={{ base: "3xl", md: "4xl" }}
            fontWeight="700"
            color="text"
            mb={4}
          >
            Frequently Asked Questions
          </Text>
          <Text
            fontSize={{ base: "md", md: "lg" }}
            color="muted"
            maxW="2xl"
            mx="auto"
            lineHeight="1.7"
          >
            Find answers to common questions about our services, processes, and how we can help transform your business.
          </Text>
        </MotionBox>

        <VStack gap={3} align="stretch">
          {faqs.map((faq, index) => (
            <MotionBox
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Box
                position="relative"
                borderBottom="2px solid"
                borderColor="gray.100"
                _last={{ borderBottom: "none" }}
                transition="all 0.3s ease"
                cursor="pointer"
                onClick={() => toggleFAQ(index)}
                role="button"
                aria-expanded={openIndex === index}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    toggleFAQ(index)
                  }
                }}
                _hover={{
                  bg: "gray.50"
                }}
              >
                <Box py={5} px={2}>
                  <HStack justify="space-between" align="center" mb={0}>
                    <Text
                      fontSize={{ base: "md", md: "lg" }}
                      fontWeight="600"
                      color={openIndex === index ? "primary.600" : "text"}
                      lineHeight="1.5"
                      transition="color 0.3s ease"
                      flex="1"
                    >
                      {faq.question}
                    </Text>
                    
                    {/* Chevron Icon to indicate expandable/collapsible */}
                    <Icon
                      as={HiChevronDown}
                      fontSize="lg"
                      color={openIndex === index ? "primary.500" : "gray.400"}
                      transition="all 0.3s ease"
                      transform={openIndex === index ? "rotate(180deg)" : "rotate(0deg)"}
                      ml={3}
                      flexShrink={0}
                    />
                  </HStack>
                  
                  {/* Answer - Visible when clicked */}
                  <Box
                    opacity={openIndex === index ? 1 : 0}
                    maxHeight={openIndex === index ? "400px" : "0"}
                    overflow="hidden"
                    transition="all 0.4s ease"
                    mt={openIndex === index ? 4 : 0}
                  >
                    <Text
                      fontSize="md"
                      color="muted"
                      lineHeight="1.7"
                      pl={4}
                      borderLeft="3px solid"
                      borderColor="primary.200"
                      bg="white"
                      p={4}
                      borderRadius="md"
                      shadow="sm"
                    >
                      {faq.answer}
                    </Text>
                  </Box>
                </Box>
              </Box>
            </MotionBox>
          ))}
        </VStack>

        {/* CTA Section */}
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          mt={12}
        >
          <Box
            bg="primary.50"
            border="1px solid"
            borderColor="primary.200"
            borderRadius="xl"
            p={8}
            textAlign="center"
          >
            <VStack gap={4}>
              <Text
                fontSize={{ base: "lg", md: "xl" }}
                fontWeight="600"
                color="text"
                lineHeight="1.6"
              >
                Do you have more questions and want to discuss with us?
              </Text>
              <Text
                fontSize="md"
                color="muted"
                lineHeight="1.6"
                maxW="md"
              >
                Our team is here to help you find the perfect solution for your business needs.
              </Text>
              <Link to="/contact" style={{ textDecoration: 'none' }}>
                <Button
                  colorScheme="primary"
                  bg="primary.500"
                  size="lg"
                  fontWeight="600"
                  px={8}
                  py={6}
                  _hover={{
                    transform: "translateY(-2px)",
                    shadow: "lg"
                  }}
                  transition="all 0.3s ease"
                >
                  Connect with Us <Icon as={HiArrowRight} ml={2} />
                </Button>
              </Link>
            </VStack>
          </Box>
        </MotionBox>
      </Container>
    </Box>
  )
}

export default FAQsSection