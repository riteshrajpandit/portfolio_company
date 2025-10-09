import {
  Box,
  Container,
  Text,
  VStack,
  HStack,
  Grid,
  Icon,
  Link as ChakraLink,
} from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import {
  HiCog,
  HiCommandLine,
 
  HiArrowTopRightOnSquare,
} from "react-icons/hi2"

const MotionBox = motion(Box)

interface Product {
  name: string
  description: string
  icon: React.ComponentType<{ size?: number }>
  link: string
  displayUrl: string
  isExternal?: boolean
  category: string
}

const products: Product[] = [
  {
    name: "ERP Solutions",
    description: "Enterprise Resource Planning solutions for streamlined business operations",
    icon: HiCog,
    link: "https://ss.awiskar.com/",
    displayUrl: "ss.awiskar.com",
    isExternal: true,
    category: "Enterprise"
  },
  {
    name: "Amigaa Platform",
    description: "Advanced AI-powered platform for intelligent automation",
    icon: HiCommandLine,
    link: "https://agent.amigaa.com/",
    displayUrl: "agent.amigaa.com",
    isExternal: true,
    category: "AI Platform"
  }
]

export const DocumentationSection = () => {
  return (
    <Box py={{ base: 16, md: 20 }} bg="white">
      <Container maxW="6xl">
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
            Product Documentation
          </Text>
          <Text
            fontSize={{ base: "md", md: "lg" }}
            color="muted"
            maxW="2xl"
            mx="auto"
            lineHeight="1.7"
          >
            Access comprehensive documentation, guides, and resources for all our products and services.
          </Text>
        </MotionBox>

        <Grid
          templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(2, 1fr)" }}
          gap={6}
        >
          {products.map((product, index) => (
            <MotionBox
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {product.isExternal ? (
                <ChakraLink href={product.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                  <Box
                    p={6}
                    border="1px solid"
                    borderColor="gray.100"
                    borderRadius="lg"
                    transition="all 0.3s ease"
                    cursor="pointer"
                    _hover={{
                      borderColor: "primary.300",
                      transform: "translateY(-2px)",
                      shadow: "md"
                    }}
                    h="full"
                  >
                    <VStack align="start" gap={4} h="full">
                      <HStack justify="space-between" w="full" align="start">
                        <Box
                          p={3}
                          bg="primary.50"
                          borderRadius="lg"
                          color="primary.500"
                        >
                          <Icon as={product.icon} fontSize="xl" />
                        </Box>
                        
                        <Text
                          fontSize="xs"
                          color="muted"
                          fontWeight="500"
                          bg="gray.50"
                          px={2}
                          py={1}
                          borderRadius="md"
                        >
                          {product.category}
                        </Text>
                      </HStack>
                      
                      <VStack align="start" gap={2} flex="1">
                        <HStack justify="space-between" w="full" align="center">
                          <Text
                            fontSize="lg"
                            fontWeight="600"
                            color="text"
                            lineHeight="1.4"
                          >
                            {product.name}
                          </Text>
                          
                          <Icon
                            as={HiArrowTopRightOnSquare}
                            fontSize="sm"
                            color="gray.400"
                            transition="all 0.3s ease"
                            _groupHover={{ color: "primary.500" }}
                          />
                        </HStack>
                        
                        <Text
                          fontSize="sm"
                          color="muted"
                          lineHeight="1.6"
                        >
                          {product.description}
                        </Text>
                        
                        {/* Display URL */}
                        <Text
                          fontSize="xs"
                          color="primary.500"
                          fontWeight="500"
                          bg="primary.50"
                          px={2}
                          py={1}
                          borderRadius="md"
                          alignSelf="start"
                        >
                          🔗 {product.displayUrl}
                        </Text>
                      </VStack>
                      
                      <Box pt={2}>
                        <Text
                          fontSize="sm"
                          color="primary.500"
                          fontWeight="500"
                          transition="all 0.3s ease"
                          _groupHover={{ color: "primary.600" }}
                        >
                          Visit Website →
                        </Text>
                      </Box>
                    </VStack>
                  </Box>
                </ChakraLink>
              ) : (
                <Link to={product.link} style={{ textDecoration: 'none' }}>
                  <Box
                    p={6}
                    border="1px solid"
                    borderColor="gray.100"
                    borderRadius="lg"
                    transition="all 0.3s ease"
                    cursor="pointer"
                    _hover={{
                      borderColor: "primary.300",
                      transform: "translateY(-2px)",
                      shadow: "md"
                    }}
                    h="full"
                  >
                    <VStack align="start" gap={4} h="full">
                      <HStack justify="space-between" w="full" align="start">
                        <Box
                          p={3}
                          bg="primary.50"
                          borderRadius="lg"
                          color="primary.500"
                        >
                          <Icon as={product.icon} fontSize="xl" />
                        </Box>
                        
                        <Text
                          fontSize="xs"
                          color="muted"
                          fontWeight="500"
                          bg="gray.50"
                          px={2}
                          py={1}
                          borderRadius="md"
                        >
                          {product.category}
                        </Text>
                      </HStack>
                      
                      <VStack align="start" gap={2} flex="1">
                        <HStack justify="space-between" w="full" align="center">
                          <Text
                            fontSize="lg"
                            fontWeight="600"
                            color="text"
                            lineHeight="1.4"
                          >
                            {product.name}
                          </Text>
                          
                          <Icon
                            as={HiArrowTopRightOnSquare}
                            fontSize="sm"
                            color="gray.400"
                            transition="all 0.3s ease"
                            _groupHover={{ color: "primary.500" }}
                          />
                        </HStack>
                        
                        <Text
                          fontSize="sm"
                          color="muted"
                          lineHeight="1.6"
                        >
                          {product.description}
                        </Text>
                      </VStack>
                      
                      <Box pt={2}>
                        <Text
                          fontSize="sm"
                          color="primary.500"
                          fontWeight="500"
                          transition="all 0.3s ease"
                          _groupHover={{ color: "primary.600" }}
                        >
                          View Documentation →
                        </Text>
                      </Box>
                    </VStack>
                  </Box>
                </Link>
              )}
            </MotionBox>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default DocumentationSection
