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

  return (
    <Box
      ref={textRef}
      position="relative"
      display="inline-block"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      cursor="pointer"
    >
      {/* Base text */}
      <Text
        fontSize={fontSize}
        fontWeight={fontWeight}
        color={color}
        position="relative"
        zIndex={1}
        userSelect="none"
      >
        {children}
      </Text>

      {/* Magnified text layer with circular mask */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 2,
            pointerEvents: "none",
            // Create a circular mask that follows the mouse
            WebkitMask: `radial-gradient(circle 40px at ${mousePosition.x}px ${mousePosition.y}px, black 100%, transparent 100%)`,
            mask: `radial-gradient(circle 40px at ${mousePosition.x}px ${mousePosition.y}px, black 100%, transparent 100%)`
          }}
        >
          <Box
            style={{
              transform: `scale(1.6)`,
              transformOrigin: `${mousePosition.x}px ${mousePosition.y}px`
            }}
          >
            <Text
              fontSize={fontSize}
              fontWeight={fontWeight}
              color={color}
              userSelect="none"
              style={{
                filter: "brightness(1.3) contrast(1.2) saturate(1.1)"
              }}
            >
              {children}
            </Text>
          </Box>
        </motion.div>
      )}

      {/* Water droplet visual effect */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{
            position: "absolute",
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            left: mousePosition.x - 40,
            top: mousePosition.y - 40,
            zIndex: 3,
            pointerEvents: "none",
            // Water droplet styling - purely visual, doesn't affect the text
            background: `
              radial-gradient(
                circle at 25% 25%,
                rgba(255, 255, 255, 0.4) 0%,
                rgba(255, 255, 255, 0.1) 30%,
                rgba(0, 115, 230, 0.05) 60%,
                transparent 100%
              )
            `,
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: `
              inset -3px -3px 6px rgba(0, 0, 0, 0.1),
              inset 3px 3px 6px rgba(255, 255, 255, 0.2),
              0 2px 8px rgba(0, 115, 230, 0.15)
            `
          }}
        >
          {/* Water droplet highlight */}
          <Box
            position="absolute"
            top="18%"
            left="22%"
            width="12px"
            height="12px"
            borderRadius="50%"
            background="radial-gradient(circle, rgba(255, 255, 255, 0.7) 0%, transparent 70%)"
            filter="blur(1px)"
          />
          
          <Box
            position="absolute"
            top="15%"
            left="18%"
            width="5px"
            height="7px"
            borderRadius="50%"
            background="rgba(255, 255, 255, 0.9)"
            transform="rotate(-15deg)"
          />
        </motion.div>
      )}

      {/* Subtle ripple effect */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.2, scale: 1.2 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{
            position: "absolute",
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            left: mousePosition.x - 50,
            top: mousePosition.y - 50,
            border: "1px solid rgba(0, 115, 230, 0.3)",
            zIndex: 1,
            pointerEvents: "none"
          }}
        />
      )}
    </Box>
  )
}

export default WaterDropletText
