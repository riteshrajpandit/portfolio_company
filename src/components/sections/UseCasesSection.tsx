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
    <Box bg="white" py={{ base: 12, md: 16, lg: 20 }}>
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
            fontSize={{ base: "3xl", md: "4xl", lg: "4xl" }}
            fontWeight="700"
            color="primary.500"
            mb={4}
          >
            Real-World{" "}
            <Text as="span" color="black">
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

// Separate component for each use case card with interactive states
const UseCaseCard = ({ useCase, index }: { useCase: UseCase; index: number }) => {
  const [isHovered, setIsHovered] = useState(false)

  // Define color schemes for each card
  const colorSchemes = [
    {
      bg: "linear(to-br, #FFE5F0, #FFD4E5)",
      iconBg: "#FF6B9D",
      accentColor: "#FF1744"
    },
    {
      bg: "linear(to-br, #E3F2FD, #BBDEFB)",
      iconBg: "#42A5F5",
      accentColor: "#1976D2"
    },
    {
      bg: "linear(to-br, #F3E5F5, #E1BEE7)",
      iconBg: "#AB47BC",
      accentColor: "#7B1FA2"
    },
    {
      bg: "linear(to-br, #FFF9C4, #FFF59D)",
      iconBg: "#FFA726",
      accentColor: "#F57C00"
    }
  ]

  const scheme = colorSchemes[index % colorSchemes.length]

  return (
    <MotionBox
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <Box
        position="relative"
        overflow="hidden"
        borderRadius="2xl"
        cursor="pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        h={{ base: "420px", md: "450px" }}
        bg="white"
        border="1px solid"
        borderColor={isHovered ? "primary.200" : "gray.100"}
        boxShadow={isHovered ? "xl" : "md"}
        transitionProperty="all"
        transitionDuration="0.4s"
        transitionTimingFunction="cubic-bezier(0.4, 0, 0.2, 1)"
        _hover={{
          transform: "translateY(-8px)",
        }}
      >
        {/* Animated gradient background that appears on hover */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          h="60%"
          bgGradient={scheme.bg}
          opacity={isHovered ? 0.8 : 0.6}
          transitionProperty="opacity"
          transitionDuration="0.5s"
          borderRadius="2xl"
        />

        {/* Accent bar at the bottom */}
        <Box
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          h="4px"
          bg={scheme.accentColor}
          transform={isHovered ? "scaleX(1)" : "scaleX(0)"}
          transformOrigin="left"
          transitionProperty="transform"
          transitionDuration="0.4s"
          transitionTimingFunction="cubic-bezier(0.4, 0, 0.2, 1)"
        />

        {/* Main Content */}
        <Box
          position="relative"
          w="full"
          h="full"
          display="flex"
          flexDirection="column"
          p={{ base: 6, md: 7 }}
        >
          {/* Animation Container with colored background circle */}
          <Box
            position="relative"
            w="full"
            h="200px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            mb={6}
          >
            {/* Decorative circle background */}
            <Box
              position="absolute"
              w="160px"
              h="160px"
              borderRadius="full"
              bg={scheme.iconBg}
              opacity={isHovered ? 0.2 : 0.15}
              transform={isHovered ? "scale(1.1)" : "scale(1)"}
              transitionProperty="all"
              transitionDuration="0.5s"
              transitionTimingFunction="cubic-bezier(0.4, 0, 0.2, 1)"
            />
            
            {/* Lottie Animation */}
            {useCase.animation && (
              <Box
                position="relative"
                w="180px"
                h="180px"
                transform={isHovered ? "scale(1.05)" : "scale(1)"}
                transitionProperty="transform"
                transitionDuration="0.5s"
                transitionTimingFunction="cubic-bezier(0.4, 0, 0.2, 1)"
                filter={isHovered ? "none" : "grayscale(0%)"}
              >
                <DotLottieReact
                  src={useCase.animation}
                  loop
                  autoplay
                  speed={isHovered ? 1.3 : 1}
                  style={{ 
                    width: '100%', 
                    height: '100%',
                  }}
                />
              </Box>
            )}

            {/* Sparkle effects on hover */}
            {isHovered && (
              <>
                <MotionBox
                  position="absolute"
                  top="20px"
                  right="30px"
                  w="8px"
                  h="8px"
                  borderRadius="full"
                  bg={scheme.accentColor}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 0.5
                  }}
                />
                <MotionBox
                  position="absolute"
                  bottom="30px"
                  left="20px"
                  w="6px"
                  h="6px"
                  borderRadius="full"
                  bg={scheme.accentColor}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: 0.3,
                    repeatDelay: 0.5
                  }}
                />
              </>
            )}
          </Box>

          {/* Text Content - Static, no hover effects */}
          <VStack 
            spacing={3}
            align="flex-start"
            w="full"
            flex={1}
          >
            <Heading
              as="h3"
              fontSize={{ base: "xl", md: "xl" }}
              fontWeight="700"
              color="primary.500"
              lineHeight="1.3"
            >
              {useCase.title}
            </Heading>
            <Text 
              fontSize={{ base: "sm", md: "sm" }}
              color="gray.600"
              lineHeight="1.6"
              textAlign={"justify"}
            >

    
              {useCase.description}
            </Text>
          </VStack>
        </Box>

        {/* Subtle corner accent */}
        <Box
          position="absolute"
          top={0}
          right={0}
          w="60px"
          h="60px"
          opacity={isHovered ? 0.15 : 0}
          transitionProperty="opacity"
          transitionDuration="0.3s"
          bgGradient={`radial(circle at top right, ${scheme.accentColor}, transparent)`}
          pointerEvents="none"
        />
      </Box>
    </MotionBox>
  )
}

export default UseCasesSection