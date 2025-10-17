import {
  Box,
  Container,
  Text,
  Image,
  VStack
} from '@chakra-ui/react'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)

interface Brand {
  name: string
  logo: string
}

const brands: Brand[] = [
  {
    name: 'IOXET Labs',
    logo: '/brands/IoxetLabs.svg'
  },
  {
    name: 'One ERP',
    logo: '/brands/OneERP.svg'
  },
  {
    name: 'Amigaa',
    logo: '/brands/Amigaa.svg'
  },
  {
    name: 'PlayToFit',
    logo: '/brands/playtofit.svg'
  }
]

const BrandsSection = () => {
  return (
    <Container maxW="7xl" py={{ base: 16, md: 20 }}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Box
          bg="primary.500"
          color="white"
          p={{ base: 8, md: 12 }}
          borderRadius="3xl"
          textAlign="center"
          bgGradient="linear(135deg, primary.500, primary.600)"
          position="relative"
          overflow="hidden"
        >
          {/* Background Pattern */}
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            opacity={0.1}
            backgroundImage="radial-gradient(circle at 25% 25%, white 2px, transparent 2px)"
            backgroundSize="50px 50px"
          />

          <VStack gap={{ base: 6, md: 8 }} maxW="6xl" mx="auto" position="relative" zIndex={1}>
            {/* Section Header */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Text
                fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                fontWeight="bold"
                color="white"
                lineHeight="1.2"
              >
                Our
                <Text as="span" color="whiteAlpha.800" ml={2}>
                  Brands
                </Text>
              </Text>
            </MotionBox>

            {/* Brands Display */}
            <MotionBox
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Box
                display="flex"
                flexWrap="wrap"
                justifyContent="center"
                alignItems="center"
                gap={{ base: 8, md: 12, lg: 12 }}
                mt={{ base: 4, md: 6 }}
              >
                {brands.map((brand, index) => (
                  <MotionBox
                    key={brand.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.6, 
                      delay: index * 0.1
                    }}
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      w={{ base: "160px", md: "200px", lg: "240px" }}
                      h={{ base: "80px", md: "100px", lg: "120px" }}
                      transition="all 0.3s ease"
                      cursor="pointer"
                      role="group"
                      p={3}
                      title={brand.name}
                      aria-label={`${brand.name} brand logo`}
                      _hover={{
                        transform: "scale(1.1)"
                      }}
                    >
                      <Image
                        src={brand.logo}
                        alt={`${brand.name} logo`}
                        maxW="150%"
                        maxH="150%"
                        objectFit="contain"
                        transition="all 0.3s ease"
                        _groupHover={{
                          filter: "drop-shadow(0 4px 12px rgba(255,255,255,0.5))",
                          transform: "scale(1.05)"
                        }}
                      />
                    </Box>
                  </MotionBox>
                ))}
              </Box>
            </MotionBox>
          </VStack>
        </Box>
      </motion.div>
    </Container>
  )
}

export default BrandsSection