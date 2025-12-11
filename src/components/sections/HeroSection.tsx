import { Box, Container } from '@chakra-ui/react'
import { useState } from 'react'
import { portfolioImages } from '../../data/portfolioData'
import ProductModal from '../ui/ProductModal'
import { 
  HeroBackground, 
  HeroHeader, 
  HeroProducts, 
  HeroStats 
} from '../hero'

interface HeroSectionProps {
  onProjectClick?: (project: typeof portfolioImages[0]) => void
}

const HeroSection = ({ onProjectClick }: HeroSectionProps) => {
  const [selectedProduct, setSelectedProduct] = useState<typeof portfolioImages[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleProductClick = (product: typeof portfolioImages[0]) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
    // Call the optional prop if provided for backward compatibility
    onProjectClick?.(product)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  return (
    <Box position="relative" minHeight="100vh" overflow="hidden" pt={{ base: 24, md: 32 }} pb={{ base: 12, md: 20 }}>
      <HeroBackground />

      <Container maxW="7xl" position="relative" zIndex={1} px={{ base: 4, md: 6 }}>
        <HeroHeader />
        <HeroProducts onProductClick={handleProductClick} />
        <HeroStats />
      </Container>

      {/* Product Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={closeModal}
        product={selectedProduct}
      />
    </Box>
  )
}

export default HeroSection