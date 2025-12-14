import React from 'react'
import { Box, Flex, Text, VStack } from '@chakra-ui/react'
import { keyframes } from '@emotion/react'

// CSS Keyframe animations
const fadeSlideUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(40px);
    filter: blur(8px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
`

const scaleIn = keyframes`
  0% {
    transform: scaleX(0);
    opacity: 0;
  }
  100% {
    transform: scaleX(1);
    opacity: 1;
  }
`

const progressMove = keyframes`
  0% {
    width: 0%;
    left: 0%;
    opacity: 0;
  }
  50% {
    width: 100%;
    left: 0%;
    opacity: 1;
  }
  100% {
    width: 0%;
    left: 100%;
    opacity: 0;
  }
`

const dotMove = keyframes`
  0% {
    left: 0%;
  }
  50% {
    left: calc(100% - 8px);
  }
  100% {
    left: 0%;
  }
`

const fadeInOut = keyframes`
  0%, 100% {
    opacity: 0;
    transform: translateY(10px);
  }
  25%, 75% {
    opacity: 1;
    transform: translateY(0);
  }
`

const pulseGlow = keyframes`
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.2);
  }
`

const LoadingScreen: React.FC = () => {
  const brandName = "IOXET"
  const labsText = "Labs"

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bg="white"
      display="flex"
      alignItems="center"
      justifyContent="center"
      zIndex={9999}
      overflow="hidden"
    >
      {/* Ambient Background Orbs */}
      <Box
        position="absolute"
        width="700px"
        height="700px"
        bgGradient="radial(circle, primary.100 0%, transparent 70%)"
        filter="blur(80px)"
        animation={`${pulseGlow} 6s ease-in-out infinite`}
        zIndex={-2}
      />
      
      <Box
        position="absolute"
        width="500px"
        height="500px"
        right="-100px"
        bottom="-100px"
        bgGradient="radial(circle, primary.200 0%, transparent 60%)"
        filter="blur(70px)"
        animation={`${pulseGlow} 5s ease-in-out infinite 0.5s`}
        zIndex={-2}
      />

      <VStack gap={8} zIndex={1}>
        {/* Main Brand Text Container */}
        <Flex
          alignItems="baseline"
          overflow="visible"
          p={2}
        >
          {/* Brand Name: IOXET */}
          <Flex>
            {brandName.split('').map((letter, index) => (
              <Text
                key={`brand-${index}`}
                fontSize={{ base: "5xl", md: "7xl", lg: "8xl" }}
                fontWeight="900"
                fontFamily="Urbanist, sans-serif"
                color="primary.500"
                lineHeight="1"
                letterSpacing="-0.04em"
                textShadow="0px 15px 30px rgba(0,0,0,0.08)"
                opacity={0}
                animation={`${fadeSlideUp} 0.6s ease-out forwards`}
                animationDelay={`${0.3 + index * 0.06}s`}
                style={{
                  animationDelay: `${0.3 + index * 0.06}s`,
                }}
              >
                {letter}
              </Text>
            ))}
          </Flex>
          
          {/* Spacer */}
          <Box w={{ base: 3, md: 5 }} />
          
          {/* Sub Brand: Labs */}
          <Flex>
            {labsText.split('').map((letter, index) => (
              <Text
                key={`labs-${index}`}
                fontSize={{ base: "5xl", md: "7xl", lg: "8xl" }}
                fontWeight="200"
                fontFamily="Urbanist, sans-serif"
                color="gray.500"
                lineHeight="1"
                letterSpacing="-0.04em"
                opacity={0}
                animation={`${fadeSlideUp} 0.6s ease-out forwards`}
                style={{
                  animationDelay: `${0.3 + (brandName.length + index) * 0.06}s`,
                }}
              >
                {letter}
              </Text>
            ))}
          </Flex>
        </Flex>

        {/* Elegant Accent Line */}
        <Box
          h="2px"
          w={{ base: "180px", md: "260px" }}
          bgGradient="linear(to-r, transparent, primary.400, primary.600, transparent)"
          transformOrigin="center"
          mt={-2}
          opacity={0}
          animation={`${scaleIn} 0.8s ease-out forwards`}
          style={{
            animationDelay: '1s',
          }}
        />

        {/* Modern Progress Loader */}
        <Box 
          w={{ base: "160px", md: "220px" }} 
          position="relative"
          h="3px"
          mt={4}
        >
          {/* Background Line */}
          <Box 
            position="absolute" 
            w="100%" 
            h="100%" 
            bg="gray.100" 
            borderRadius="full" 
          />
          
          {/* Animated Fill Line */}
          <Box
            position="absolute"
            top={0}
            bottom={0}
            bgGradient="linear(to-r, primary.300, primary.500, primary.600)"
            borderRadius="full"
            boxShadow="0px 0px 16px rgba(66, 153, 225, 0.7)"
            animation={`${progressMove} 2s ease-in-out infinite`}
          />
          
          {/* Glow Dot */}
          <Box
            position="absolute"
            width="8px"
            height="8px"
            bg="primary.400"
            borderRadius="full"
            boxShadow="0px 0px 20px rgba(66, 153, 225, 0.9)"
            top="-2.5px"
            animation={`${dotMove} 2s ease-in-out infinite`}
          />
        </Box>

        {/* Loading Text */}
        <Text
          fontSize="sm"
          color="gray.400"
          fontFamily="Urbanist, sans-serif"
          fontWeight="500"
          letterSpacing="0.05em"
          textTransform="uppercase"
          animation={`${fadeInOut} 2.5s ease-in-out infinite`}
        >
          Crafting Excellence
        </Text>
      </VStack>
    </Box>
  )
}

export default LoadingScreen