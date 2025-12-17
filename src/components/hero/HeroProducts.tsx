import { 
  VStack, 
  SimpleGrid, 
  Box, 
  Text, 
  Heading, 
  Image, 
  Icon 
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { HiArrowRight } from 'react-icons/hi2'
import { portfolioImages } from '../../data/portfolioData'

interface HeroProductsProps {
  onProductClick: (product: typeof portfolioImages[0]) => void
}

const HeroProducts = ({ onProductClick }: HeroProductsProps) => {
  return (
    <VStack gap={{ base: 8, md: 10 }} mb={{ base: 14, md: 8 }} py={20}>
      <SimpleGrid 
        columns={{ base: 1, md: 2, lg: 3 }} 
        gap={{ base: 6, md: 6, lg: 8 }} 
        w="full"
        maxW="7xl"
        mx="auto"
      >
        {portfolioImages.slice(0, 3).map((product, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            style={{ height: '100%' }}
          >
            <Box
              bg="rgba(255, 255, 255, 0.65)"
              backdropFilter="blur(24px)"
              borderRadius="2xl"
              overflow="hidden"
              boxShadow="0 4px 20px rgba(0, 0, 0, 0.06)"
              border="1px solid rgba(255, 255, 255, 0.5)"
              cursor="pointer"
              onClick={() => onProductClick(product)}
              _hover={{ 
                transform: "translateY(-6px)", 
                boxShadow: "0 16px 40px rgba(0, 0, 0, 0.12)",
                borderColor: "rgba(255, 255, 255, 0.8)"
              }}
              transition="all 0.35s cubic-bezier(0.4, 0, 0.2, 1)"
              position="relative"
              role="group"
              display="flex"
              flexDirection={{ base: 'column', md: 'row' }}
              alignItems="stretch"
              h={{ base: "auto", md: "200px", lg: "220px" }}
            >
              {/* Content Side (Left) */}
              <Box 
                flex="1"
                p={{ base: 5, md: 6 }} 
                display="flex" 
                flexDirection="column" 
                justifyContent="center"
                position="relative"
                zIndex={1}
                pr={{ md: 2 }}
              >
                {/* Category Badge - Top */}
                <Text 
                  fontSize="xs" 
                  fontWeight="700" 
                  color="primary.600"
                  textTransform="uppercase"
                  letterSpacing="wider"
                  mb={2}
                >
                  {product.category}
                </Text>

                <Heading 
                  size="md" 
                  mb={2} 
                  color="gray.900" 
                  lineHeight="1.3"
                  fontWeight="700"
                  lineClamp={2}
                >
                  {product.title}
                </Heading>
                
                <Text 
                  color="gray.700" 
                  fontSize="xs" 
                  lineHeight="1.6"
                  lineClamp={3}
                >
                  {product.description}
                </Text>
              </Box>

              {/* Image Side (Right) - Boxed */}
              <Box 
                w={{ base: "100%", md: "45%" }}
                h={{ base: "200px", md: "auto" }}
                position="relative" 
                overflow="hidden"
                bg="gray.100"
                borderRadius="xl"
                m={{ base: 2, md: 3 }}
                mt={{ base: 0, md: 3 }}
                flexShrink={0}
              >
                <Image 
                  src={product.url} 
                  alt={product.title} 
                  w="full" 
                  h="full" 
                  objectFit="cover" 
                  transition="all 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
                  _groupHover={{ transform: "scale(1.08)" }}
                />
                
                {/* Hover Overlay with Blue Circle Button */}
                <Box
                  position="absolute"
                  inset={0}
                  bg="rgba(0, 0, 0, 0.35)"
                  opacity={0}
                  _groupHover={{ opacity: 1 }}
                  transition="opacity 0.35s ease"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  backdropFilter="blur(1px)"
                >
                  <Box
                    bg="primary.500"
                    color="white"
                    w="60px"
                    h="60px"
                    borderRadius="full"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    boxShadow="0 8px 24px rgba(0, 0, 0, 0.25)"
                    transform="scale(0.7) translateY(10px)"
                    opacity={0}
                    _groupHover={{ 
                      transform: "scale(1) translateY(0)", 
                      opacity: 1 
                    }}
                    transition="all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
                  >
                    <Icon as={HiArrowRight} boxSize={7} />
                  </Box>
                </Box>
              </Box>
            </Box>
          </motion.div>
        ))}
      </SimpleGrid>
    </VStack>
  )
}

export default HeroProducts
