import { Box, Text } from '@chakra-ui/react'
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion'
import { useState } from 'react'

const MotionBox = motion(Box)

interface WaterDropletTextProps {
  children?: React.ReactNode
  text?: string
  fontSize?: string
  fontWeight?: string
  color?: string
}

const WaterDropletText = ({ 
  children, 
  text, 
  fontSize = "4xl", 
  fontWeight = "bold", 
  color = "blue.400" 
}: WaterDropletTextProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const scale = useSpring(1, { stiffness: 300, damping: 30 })
  const x = useSpring(0, { stiffness: 300, damping: 30 })
  const y = useSpring(0, { stiffness: 300, damping: 30 })
  
  const handleMouseMove = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    mouseX.set(event.clientX - centerX)
    mouseY.set(event.clientY - centerY)
    
    x.set((event.clientX - centerX) * 0.1)
    y.set((event.clientY - centerY) * 0.1)
  }
  
  const handleMouseEnter = () => {
    setIsHovered(true)
    scale.set(1.05)
  }
  
  const handleMouseLeave = () => {
    setIsHovered(false)
    scale.set(1)
    x.set(0)
    y.set(0)
  }
  
  const displayText = children || text || ""
  
  return (
    <Box
      position="relative"
      display="inline-block"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      cursor="pointer"
    >
      <Text
        fontSize={fontSize}
        fontWeight={fontWeight}
        bgGradient="linear(to-r, blue.400, purple.500)"
        bgClip="text"
        position="relative"
        zIndex={2}
        color={color}
      >
        {displayText}
      </Text>
      
      <MotionBox
        position="absolute"
        top="50%"
        left="50%"
        w="120px"
        h="120px"
        borderRadius="50%"
        background="radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(147, 51, 234, 0.2) 50%, transparent 70%)"
        filter="blur(20px)"
        opacity={isHovered ? 1 : 0}
        style={{
          scale,
          x: useTransform(x, (value) => value - 60),
          y: useTransform(y, (value) => value - 60),
        }}
        transition={{ duration: 0.3 }}
      />
      
      <MotionBox
        position="absolute"
        top="50%"
        left="50%"
        w="60px"
        h="60px"
        borderRadius="50%"
        background="radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(59, 130, 246, 0.4) 100%)"
        filter="blur(10px)"
        opacity={isHovered ? 0.8 : 0}
        style={{
          scale: useTransform(scale, (value) => value * 0.8),
          x: useTransform(x, (value) => value - 30),
          y: useTransform(y, (value) => value - 30),
        }}
        transition={{ duration: 0.2, delay: 0.1 }}
      />
    </Box>
  )
}

export default WaterDropletText
