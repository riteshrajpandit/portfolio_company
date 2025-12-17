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
import { usePageTracking } from '../utils/usePageTracking'
import HeroProducts from '@/components/hero/HeroProducts'
import { HeroStats } from '@/components/hero'
import ProductModal from '@/components/ui/ProductModal'
import { portfolioImages } from '../data/portfolioData'

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState<typeof portfolioImages[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  // Track page views, scroll depth, and time on page
  usePageTracking('Home')

  useEffect(() => {
    // Simulate page load with minimum display time for smooth UX
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000) // Show loading for at least 2 seconds

    // Cleanup timer
    return () => clearTimeout(timer)
  }, [])

  const handleProductClick = (product: typeof portfolioImages[0]) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <Box>
      <HeroSection />
      <HeroProducts onProductClick={handleProductClick} />
      <HeroStats />
      {/* Product Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={closeModal}
        product={selectedProduct}
      />      
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