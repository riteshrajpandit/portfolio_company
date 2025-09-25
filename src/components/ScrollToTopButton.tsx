import { useState, useEffect } from 'react'
import { Box } from '@chakra-ui/react'
import { HiArrowUp } from 'react-icons/hi'
import { motion, AnimatePresence } from 'framer-motion'

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const toggleVisibility = () => {
      const scrolled = document.documentElement.scrollTop
      const maxHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const progress = (scrolled / maxHeight) * 100
      
      setScrollProgress(progress)
      setIsVisible(scrolled > 300)
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'fixed',
            bottom: '6rem',
            right: '1.7rem',
            zIndex: 1000,
          }}
        >
          <Box position="relative">
            {/* Background Circle */}
            <Box
              as="button"
              aria-label="Scroll to top"
              onClick={scrollToTop}
              display="flex"
              alignItems="center"
              justifyContent="center"
              width="56px"
              height="56px"
              borderRadius="full"
              bg="white"
              color="primary.600"
              shadow="lg"
              border="2px solid"
              borderColor="gray.100"
              cursor="pointer"
              fontSize="xl"
              transition="all 0.3s ease"
              _hover={{
                bg: "primary.50",
                transform: "translateY(-2px)",
                shadow: "xl"
              }}
            >
              <HiArrowUp />
            </Box>

            {/* Progress Ring */}
            <svg
              style={{
                position: 'absolute',
                top: '-2px',
                left: '-2px',
                width: '60px',
                height: '60px',
                transform: 'rotate(-90deg)',
                pointerEvents: 'none'
              }}
            >
              <circle
                cx="30"
                cy="30"
                r="28"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                opacity={0.1}
                color="gray.300"
              />
              <motion.circle
                cx="30"
                cy="30"
                r="28"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 28}`}
                strokeDashoffset={`${2 * Math.PI * 28 * (1 - scrollProgress / 100)}`}
                color="#0073e6"
                transition={{ duration: 0.1 }}
                style={{
                  filter: 'drop-shadow(0 0 4px rgba(0, 115, 230, 0.3))'
                }}
              />
            </svg>
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ScrollToTopButton
