import {
  Box,
  Container,
  Text,
  VStack,
  SimpleGrid,
  Heading,
} from "@chakra-ui/react"
import { motion } from "framer-motion"
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { useState } from "react"

const MotionBox = motion(Box)

interface UseCase {
  title: string
  description: string
  animation?: string
}

interface UseCasesSectionProps {
  useCases: UseCase[]
}

const UseCasesSection = ({ useCases }: UseCasesSectionProps) => {
  return (
    <Box py={{ base: 16, md: 24 }} bg="white">
      <Container maxW="7xl" px={{ base: 4, md: 6 }}>
        {/* Section Header */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          textAlign="center"
          mb={16}
        >
          <Heading
            as="h2"
            fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
            fontWeight="700"
            color="primary.500"
            mb={4}
          >
            Real-World{" "}
            <Text as="span" color="black" >
              Applications
            </Text>
          </Heading>
          <Text
            fontSize={{ base: "md", md: "lg" }}
            color="gray.400"
            maxW="3xl"
            mx="auto"
            lineHeight="1.7"
          >
            Discover how Amigaa transforms businesses across industries with intelligent automation
          </Text>
        </MotionBox>

        {/* Use Cases Grid */}
        <SimpleGrid
          columns={{ base: 1, sm: 2, lg: 4 }}
          gap={{ base: 6, md: 8 }}
        >
          {useCases.map((useCase, idx) => (
            <UseCaseCard key={idx} useCase={useCase} index={idx} />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}

// Separate component for each use case card
const UseCaseCard = ({ useCase, index }: { useCase: UseCase; index: number }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <MotionBox
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      viewport={{ once: true }}
    >
      <Box
        bg="gray.300"
        borderRadius="3xl"
        overflow="hidden"
        // border="1px solid"
        // borderColor="gray.800"
        shadow="2xl"
        _hover={{ 
          transform: "translateY(-8px)",
          borderColor: "gray.700",
          shadow: "dark-lg"
        }}
        transition="all 0.4s ease"
        h="full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Animation Container with gradient background */}
        <Box
          position="relative"
          bgGradient={
            index === 0 ? "linear(to-br, pink.400, orange.300)" :
            index === 1 ? "linear(to-br, blue.300, cyan.300)" :
            index === 2 ? "linear(to-br, blue.400, purple.400)" :
            "linear(to-br, purple.400, pink.400)"
          }
          p={8}
          display="flex"
          alignItems="center"
          justifyContent="center"
          h={{ base: "300px", md: "350px", lg: "400px" }}
        >
          {useCase.animation && (
            <Box
              w="full"
              h="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
              transform={isHovered ? "scale(1.05)" : "scale(1)"}
              transition="transform 0.4s ease"
            >
              <DotLottieReact
                src={useCase.animation}
                loop
                autoplay
                style={{ 
                  width: '100%', 
                  height: '100%',
                  maxWidth: '280px',
                  maxHeight: '280px',
                }}
              />
            </Box>
          )}
        </Box>

        {/* Content */}
        <VStack 
          gap={3} 
          align="start" 
          p={{ base: 6, md: 8 }}
          bg="white"
        >
          <Heading
            as="h3"
            fontSize={{ base: "lg", md: "xl" }}
            fontWeight="700"
            color="primary.500"
            lineHeight="1.3"
          >
            {useCase.title}
          </Heading>
          <Text 
            fontSize={{ base: "sm", md: "sm" }}
            color="gray.400" 
            lineHeight="1.6"
            overflow="hidden"
            textOverflow="ellipsis"
            display="-webkit-box"
            style={{
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
            }}
          >
            {useCase.description}
          </Text>
        </VStack>
      </Box>
    </MotionBox>
  )
}

export default UseCasesSection
