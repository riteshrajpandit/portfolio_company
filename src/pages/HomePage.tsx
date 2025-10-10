import { useState, useEffect } from 'react'
import { Box } from '@chakra-ui/react'
import HeroSection from '../components/sections/HeroSection'
//import FeaturesSection from '../components/sections/FeaturesSection'
import ProductsShowcaseSection from '../components/sections/ProductsShowcaseSection'
import BrandsSection from '../components/sections/BrandsSection'
import EarlyAdoptersSection from '../components/sections/EarlyAdoptersSection'
import TestimonialsSection from '../components/sections/TestimonialsSection'
import CTASection from '../components/sections/CTASection'
import LoadingScreen from '../components/LoadingScreen'

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate page load with minimum display time for smooth UX
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000) // Show loading for at least 2 seconds

    // Cleanup timer
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <Box>
      <HeroSection />
      <ProductsShowcaseSection />
      <BrandsSection />
      {/* <FeaturesSection /> */}
      <EarlyAdoptersSection />
      <TestimonialsSection />
      <CTASection />
    </Box>
  )
}

export default HomePage