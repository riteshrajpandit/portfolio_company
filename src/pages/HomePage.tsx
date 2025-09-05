import { Box } from '@chakra-ui/react'
import HeroSection from '../components/sections/HeroSection'
import FeaturesSection from '../components/sections/FeaturesSection'
import TestimonialsSection from '../components/sections/TestimonialsSection'
import CTASection from '../components/sections/CTASection'

const HomePage = () => {
  return (
    <Box  >
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
    </Box>
  )
}

export default HomePage