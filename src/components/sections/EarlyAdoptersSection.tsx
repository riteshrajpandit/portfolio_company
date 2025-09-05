import {
  Box,
  Container,
  Text,
  VStack,
  HStack,
  Grid,
  Image,
  Link as ChakraLink,
  Icon
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { HiExternalLink, HiStar } from 'react-icons/hi'

const earlyAdopters = [
  {
    name: "Shikhar Shoe Industries",
    website: "shikharshoe.com.np",
    url: "https://www.shikharshoe.com.np/",
    logo: "/shikhar_shoes.png",
    description: "Premium footwear brand delivering quality and style across Nepal",
    industry: "Fashion & Retail",
    gradient: "linear(135deg, blue.500, cyan.500)"
  },
  {
    name: "Growstart",
    website: "growstart.co",
    url: "https://www.growstart.co/",
    logo: "/growstart-logo.png",
    description: "Empowering startups with innovative growth solutions and strategies",
    industry: "Business Consulting",
    gradient: "linear(135deg, green.500, teal.500)"
  },
  {
    name: "Nature Works",
    website: "natureworks.com.np",
    url: "https://www.natureworks.com.np/",
    logo: "/nature_works.png", 
    description: "Sustainable solutions for environmental conservation and green technology",
    industry: "Environmental Tech",
    gradient: "linear(135deg, green.600, emerald.500)"
  }
]

const MotionBox = motion(Box)
const MotionContainer = motion(Container)

const EarlyAdoptersSection = () => {
  return (
    <Box py={{ base: 16, md: 20 }} bg="gray.50" position="relative" overflow="hidden">
      {/* Background Pattern */}
      <Box
        position="absolute"
        inset={0}
        opacity={0.03}
        backgroundImage="radial-gradient(circle at 1px 1px, primary.500 1px, transparent 0)"
        backgroundSize="20px 20px"
      />
      
      <Container maxW="7xl" position="relative">
        <MotionContainer
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          textAlign="center"
          mb={16}
          maxW="4xl"
          mx="auto"
        >
          <VStack gap={4}>
            <HStack gap={2} justify="center" mb={2}>
              <Icon as={HiStar} color="primary.500" />
              <Text
                fontSize="sm"
                fontWeight="600"
                color="primary.500"
                textTransform="uppercase"
                letterSpacing="wide"
              >
                Trusted Partners
              </Text>
              <Icon as={HiStar} color="primary.500" />
            </HStack>
            
            <Text
              fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
              fontWeight="700"
              lineHeight="1.2"
              color="text"
              mb={4}
            >
              Our{" "}
              <Text as="span" color="primary.500">
                Early Adopters
              </Text>
            </Text>
            
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color="muted"
              lineHeight="1.7"
              maxW="3xl"
            >
              Join the forward-thinking companies who trusted IOXET to transform their digital presence 
              and achieve remarkable growth through innovative solutions.
            </Text>
          </VStack>
        </MotionContainer>

        {/* Early Adopters Grid */}
        <Grid
          templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
          gap={8}
          alignItems="stretch"
        >
          {earlyAdopters.map((company, index) => (
            <MotionBox
              key={company.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <ChakraLink
                href={company.url}
                target="_blank"
                rel="noopener noreferrer"
                textDecoration="none"
                _hover={{ textDecoration: "none" }}
                _focus={{ 
                  textDecoration: "none",
                  outline: "none",
                  boxShadow: "none"
                }}
                _active={{
                  textDecoration: "none",
                  outline: "none",
                  boxShadow: "none"
                }}
              >
                <Box
                  bg="white"
                  borderRadius="2xl"
                  p={8}
                  border="1px solid"
                  borderColor="gray.200"
                  shadow="lg"
                  transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                  position="relative"
                  overflow="hidden"
                  height="full"
                  outline="none"
                  _hover={{
                    transform: "translateY(-8px)",
                    shadow: "2xl",
                    borderColor: "primary.200"
                  }}
                  _focus={{
                    outline: "none",
                    boxShadow: "none"
                  }}
                  _active={{
                    outline: "none",
                    boxShadow: "none"
                  }}
                >
                  {/* Gradient Background */}
                  <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    height="4px"
                    bgGradient={company.gradient}
                  />
                  
                  <VStack gap={6} align="start" height="full">
                    {/* Logo Section */}
                    <Box
                      bg="gray.50"
                      p={6}
                      borderRadius="xl"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      width="full"
                      height="120px"
                      transition="all 0.3s ease"
                      _groupHover={{ bg: "primary.50" }}
                    >
                      <Image
                        src={company.logo}
                        alt={`${company.name} logo`}
                        maxW="160px"
                        maxH="80px"
                        objectFit="contain"
                        filter="grayscale(20%)"
                        transition="all 0.3s ease"
                        _groupHover={{ 
                          filter: "grayscale(0%)",
                          transform: "scale(1.05)"
                        }}
                      />
                    </Box>

                    {/* Content */}
                    <VStack gap={3} align="start" flex={1}>
                      <VStack gap={1} align="start">
                        <HStack gap={2} align="center">
                          <Text
                            fontSize="xl"
                            fontWeight="700"
                            color="text"
                          >
                            {company.name}
                          </Text>
                          <Icon
                            as={HiExternalLink}
                            color="primary.500"
                            boxSize={4}
                            opacity={0.7}
                          />
                        </HStack>
                        
                        <Text
                          fontSize="sm"
                          color="primary.500"
                          fontWeight="500"
                        >
                          {company.website}
                        </Text>
                      </VStack>

                      <Text
                        fontSize="sm"
                        color="muted"
                        lineHeight="1.6"
                        flex={1}
                      >
                        {company.description}
                      </Text>

                      <Box
                        bg="gray.100"
                        px={3}
                        py={1}
                        borderRadius="full"
                        alignSelf="start"
                      >
                        <Text
                          fontSize="xs"
                          fontWeight="500"
                          color="muted"
                          textTransform="uppercase"
                          letterSpacing="wide"
                        >
                          {company.industry}
                        </Text>
                      </Box>
                    </VStack>
                  </VStack>
                </Box>
              </ChakraLink>
            </MotionBox>
          ))}
        </Grid>

        {/* Bottom CTA */}
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          textAlign="center"
          mt={16}
        >
          <VStack gap={4}>
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              fontWeight="600"
              color="text"
            >
              Ready to join our growing family of success stories?
            </Text>
            
            <ChakraLink
              href="/contact"
              textDecoration="none"
              _hover={{ textDecoration: "none" }}
              _focus={{ 
                textDecoration: "none",
                outline: "none",
                boxShadow: "none"
              }}
              _active={{
                textDecoration: "none",
                outline: "none",
                boxShadow: "none"
              }}
            >
              <Box
                as="button"
                bg="primary.500"
                color="white"
                px={8}
                py={4}
                borderRadius="full"
                fontWeight="600"
                fontSize="lg"
                border="none"
                cursor="pointer"
                outline="none"
                transition="all 0.3s ease"
                _hover={{
                  bg: "primary.600",
                  transform: "translateY(-2px)",
                  shadow: "lg"
                }}
                _focus={{
                  outline: "none",
                  boxShadow: "none"
                }}
                _active={{
                  outline: "none",
                  boxShadow: "none"
                }}
              >
                Become Our Next Success Story
              </Box>
            </ChakraLink>
          </VStack>
        </MotionBox>
      </Container>
    </Box>
  )
}

export default EarlyAdoptersSection
