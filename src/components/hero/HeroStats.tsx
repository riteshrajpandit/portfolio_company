import { 
  Box, 
  SimpleGrid, 
  VStack, 
  Text 
} from '@chakra-ui/react'
import { motion, useInView } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'

const stats = [
  { value: 100, suffix: "+", label: "Years of Collective Experience" },
  { value: 3, suffix: "+", label: "Concurrent Projects" },
  { value: 4, suffix: "", label: "Brands" },
]

// Animated Counter Component
const AnimatedCounter = ({ value, suffix = "", duration = 2 }: { value: number; suffix?: string; duration?: number }) => {
  const [count, setCount] = useState(0)
  const countRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(countRef, { once: true })

  useEffect(() => {
    if (isInView) {
      let startTime: number | null = null
      const startValue = 0
      const endValue = value

      const animate = (currentTime: number) => {
        if (startTime === null) startTime = currentTime
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / (duration * 1000), 1)
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        const currentCount = Math.floor(startValue + (endValue - startValue) * easeOutQuart)
        
        setCount(currentCount)
        
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      
      requestAnimationFrame(animate)
    }
  }, [isInView, value, duration])

  return (
    <Text
      ref={countRef}
      fontSize={{ base: "4xl", md: "5xl" }}
      fontWeight="800"
      color="primary.500"
      lineHeight="1"
      mb={2}
    >
      {count}{suffix}
    </Text>
  )
}

const HeroStats = () => {
  return (
    <Box>
        <SimpleGrid 
          columns={{ base: 1, sm: 3 }} 
          gap={{ base: 12, md: 16 }} 
          w="full" 
          maxW="5xl"
          mx="auto"
          textAlign="center"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <VStack gap={2}>
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <Text 
                  fontSize={{ base: "sm", md: "xl" }} 
                  fontWeight="500" 
                  color="gray.600"
                >
                  {stat.label}
                </Text>
              </VStack>
            </motion.div>
          ))}
        </SimpleGrid>
    </Box>
  )
}

export default HeroStats
