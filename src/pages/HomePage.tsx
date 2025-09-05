import { Box } from '@chakra-ui/react'
import HeroSection from '../components/sections/HeroSection'
import FeaturesSection from '../components/sections/FeaturesSection'
import EarlyAdoptersSection from '../components/sections/EarlyAdoptersSection'
import TestimonialsSection from '../components/sections/TestimonialsSection'
import CTASection from '../components/sections/CTASection'

const HomePage = () => {
  return (
    <Box>
      <HeroSection />
      <FeaturesSection />
      <EarlyAdoptersSection />
      <TestimonialsSection />
      <CTASection />
    </Box>
  )
}

export default HomePage