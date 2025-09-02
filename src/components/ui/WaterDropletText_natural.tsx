import { useState, useRef } from 'react'
import { Box, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'

interface WaterDropletTextProps {
  children: string
  fontSize?: string | object
  fontWeight?: string | number
  color?: string
}

const WaterDropletText = ({ 
  children, 
  fontSize = "sm", 
  fontWeight = "600",
  color = "primary.500"
}: WaterDropletTextProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const textRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (textRef.current) {
      const rect = textRef.current.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      })
    }
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  // Create a CSS style that applies magnification only in the circular area
  const magnificationStyle = isHovered ? {
    background: `
      radial-gradient(
        circle 40px at ${mousePosition.x}px ${mousePosition.y}px,
        transparent 0px,
        transparent 39px,
        rgba(0,0,0,0.01) 40px,
        rgba(0,0,0,0.01) 100%
      )
    `,
    WebkitMask: `
      radial-gradient(
        circle 40px at ${mousePosition.x}px ${mousePosition.y}px,
        black 0px,
        black 40px,
        transparent 41px
      )
    `,
    mask: `
      radial-gradient(
        circle 40px at ${mousePosition.x}px ${mousePosition.y}px,
        black 0px,
        black 40px,
        transparent 41px
      )
    `,
    transform: `scale(1.5)`,
    transformOrigin: `${mousePosition.x}px ${mousePosition.y}px`,
    filter: "brightness(1.2) contrast(1.1)"
  } : {}

  return (
    <Box
      ref={textRef}
      position="relative"
      display="inline-block"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      cursor="pointer"
      overflow="visible"
    >
      {/* Original text */}
      <Text
        fontSize={fontSize}
        fontWeight={fontWeight}
        color={color}
        userSelect="none"
        zIndex={1}
        position="relative"
      >
        {children}
      </Text>

      {/* Magnified overlay text - only visible in the circular area */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 2,
            pointerEvents: "none",
            ...magnificationStyle
          }}
        >
          <Text
            fontSize={fontSize}
            fontWeight={fontWeight}
            color={color}
            userSelect="none"
          >
            {children}
          </Text>
        </motion.div>
      )}

      {/* Realistic water droplet effect */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{
            position: "absolute",
            width: "84px",
            height: "84px",
            borderRadius: "50%",
            left: mousePosition.x - 42,
            top: mousePosition.y - 42,
            zIndex: 3,
            pointerEvents: "none",
            // Realistic water droplet appearance
            background: `
              radial-gradient(
                circle at 28% 28%,
                rgba(255, 255, 255, 0.5) 0%,
                rgba(255, 255, 255, 0.2) 20%,
                rgba(255, 255, 255, 0.1) 40%,
                rgba(0, 115, 230, 0.05) 60%,
                rgba(0, 115, 230, 0.1) 90%,
                rgba(0, 115, 230, 0.15) 100%
              )
            `,
            border: "1px solid rgba(255, 255, 255, 0.3)",
            boxShadow: `
              inset -5px -5px 12px rgba(0, 0, 0, 0.15),
              inset 5px 5px 12px rgba(255, 255, 255, 0.4),
              0 5px 20px rgba(0, 115, 230, 0.25),
              0 0 0 0.5px rgba(255, 255, 255, 0.2)
            `,
            backdropFilter: "blur(0.5px)"
          }}
        >
          {/* Primary highlight */}
          <Box
            position="absolute"
            top="22%"
            left="26%"
            width="16px"
            height="16px"
            borderRadius="50%"
            background="radial-gradient(circle at 40% 30%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.4) 60%, transparent 100%)"
            filter="blur(1.5px)"
          />
          
          {/* Sharp catchlight */}
          <Box
            position="absolute"
            top="20%"
            left="24%"
            width="6px"
            height="9px"
            borderRadius="50%"
            background="rgba(255, 255, 255, 0.95)"
            transform="rotate(-18deg)"
            filter="blur(0.3px)"
          />

          {/* Edge reflection */}
          <Box
            position="absolute"
            top="2px"
            left="2px"
            right="2px"
            bottom="2px"
            borderRadius="50%"
            background="radial-gradient(circle at 75% 75%, transparent 60%, rgba(255, 255, 255, 0.15) 80%, transparent 100%)"
          />

          {/* Inner shadow for depth */}
          <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            borderRadius="50%"
            border="1px solid rgba(255, 255, 255, 0.1)"
            background="radial-gradient(circle at 70% 70%, transparent 50%, rgba(0, 0, 0, 0.05) 80%, transparent 100%)"
          />
        </motion.div>
      )}

      {/* Concentric ripples for physics realism */}
      {isHovered && (
        <>
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 0.4, scale: 1.1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
              position: "absolute",
              width: "104px",
              height: "104px",
              borderRadius: "50%",
              left: mousePosition.x - 52,
              top: mousePosition.y - 52,
              border: "1px solid rgba(0, 115, 230, 0.4)",
              zIndex: 1,
              pointerEvents: "none"
            }}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 0.25, scale: 1.3 }}
            exit={{ opacity: 0, scale: 0.4 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            style={{
              position: "absolute",
              width: "124px",
              height: "124px",
              borderRadius: "50%",
              left: mousePosition.x - 62,
              top: mousePosition.y - 62,
              border: "1px solid rgba(0, 115, 230, 0.25)",
              zIndex: 1,
              pointerEvents: "none"
            }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.2 }}
            animate={{ opacity: 0.15, scale: 1.5 }}
            exit={{ opacity: 0, scale: 0.2 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            style={{
              position: "absolute",
              width: "144px",
              height: "144px",
              borderRadius: "50%",
              left: mousePosition.x - 72,
              top: mousePosition.y - 72,
              border: "1px solid rgba(0, 115, 230, 0.15)",
              zIndex: 1,
              pointerEvents: "none"
            }}
          />
        </>
      )}
    </Box>
  )
}

export default WaterDropletText
