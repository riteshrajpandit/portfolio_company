import { Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)

const HeroBackground = () => {
  return (
    <>
      {/* Background gradient */}
      <Box
        position="absolute"
        inset={0}
        bgGradient="linear(135deg, gray.50, white, gray.50)"
        zIndex={0}
      />

      {/* Animated Background Blocks */}
      <Box position="absolute" inset={0} overflow="hidden" pointerEvents="none" zIndex={0}>
        {/* Top Left Block - Blue */}
        <MotionBox
          position="absolute"
          top="10%"
          left="5%"
          w="120px"
          h="120px"
          bg="blue.100"
          borderRadius="3xl"
          opacity={0.6}
          pointerEvents="auto"
          animate={{
            y: [0, 20, 0],
            rotate: [0, 10, 0],
          }}
          whileHover={{ 
            scale: 1.1, 
            rotate: 45,
            boxShadow: "0 0 25px rgba(66, 153, 225, 0.5)" 
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Top Right Block - Cyan (New) */}
        <MotionBox
          position="absolute"
          top="15%"
          right="10%"
          w="80px"
          h="80px"
          bg="cyan.100"
          borderRadius="full"
          opacity={0.5}
          pointerEvents="auto"
          animate={{
            y: [0, 15, 0],
            x: [0, -10, 0],
          }}
          whileHover={{ 
            scale: 1.2,
            boxShadow: "0 0 20px rgba(0, 181, 216, 0.5)" 
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />

        {/* Middle Right Block - Purple */}
        <MotionBox
          position="absolute"
          top="35%"
          right="5%"
          w="180px"
          h="180px"
          bg="purple.100"
          borderRadius="3xl"
          opacity={0.5}
          pointerEvents="auto"
          animate={{
            y: [0, -30, 0],
            rotate: [0, -5, 0],
          }}
          whileHover={{ 
            rotate: -15,
            scale: 1.05,
            boxShadow: "0 0 30px rgba(159, 122, 234, 0.5)" 
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        {/* Bottom Left Block - Pink */}
        <MotionBox
          position="absolute"
          bottom="20%"
          left="10%"
          w="150px"
          h="150px"
          bg="pink.100"
          borderRadius="full"
          opacity={0.4}
          pointerEvents="auto"
          animate={{
            y: [0, 25, 0],
            scale: [1, 1.1, 1],
          }}
          whileHover={{ 
            scale: 1.2,
            boxShadow: "0 0 25px rgba(237, 100, 166, 0.5)" 
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        {/* Bottom Right Block - Orange (New) */}
        <MotionBox
          position="absolute"
          bottom="10%"
          right="20%"
          w="100px"
          h="100px"
          bg="orange.100"
          borderRadius="2xl"
          opacity={0.5}
          pointerEvents="auto"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 15, 0],
          }}
          whileHover={{ 
            rotate: 90,
            scale: 1.1,
            boxShadow: "0 0 20px rgba(237, 137, 54, 0.5)" 
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
        />
      </Box>
    </>
  )
}

export default HeroBackground
