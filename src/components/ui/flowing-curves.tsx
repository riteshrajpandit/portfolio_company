import { Box } from "@chakra-ui/react"
import { motion } from "framer-motion"

const Curve = ({ delay, yStart, yEnd, amplitude }: { delay: number, yStart: number, yEnd: number, amplitude: number }) => {
  // Create a curved path using cubic bezier
  // M 0 yStart C 30 (yStart+amp) 70 (yEnd-amp) 100 yEnd
  const path = `M -10 ${yStart} C 30 ${yStart + amplitude} 70 ${yEnd - amplitude} 110 ${yEnd}`

  return (
    <motion.path
      d={path}
      fill="none"
      stroke="white"
      strokeWidth="0.2"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ 
        pathLength: [0, 1, 1], 
        opacity: [0, 0.5, 0],
        pathOffset: [0, 0, 1]
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay,
        times: [0, 0.8, 1]
      }}
    />
  )
}

export const FlowingCurvesBackground = () => {
  // Generate a set of curves
  const curves = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    yStart: 20 + Math.random() * 60, // Start between 20% and 80% height
    yEnd: 20 + Math.random() * 60,   // End between 20% and 80% height
    amplitude: (Math.random() - 0.5) * 40, // Random curve amplitude
    delay: Math.random() * 5 // Random delay
  }))

  return (
    <Box
      position="absolute"
      inset={0}
      overflow="hidden"
      pointerEvents="none"
      zIndex={0}
      opacity={0.4}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {curves.map((curve) => (
          <Curve 
            key={curve.id} 
            delay={curve.delay} 
            yStart={curve.yStart} 
            yEnd={curve.yEnd} 
            amplitude={curve.amplitude} 
          />
        ))}
      </svg>
    </Box>
  )
}
