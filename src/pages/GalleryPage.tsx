import {
  Box,
  Container,
  Text,
  SimpleGrid,
  Image,
  Icon,
  VStack,
  Heading,
  Spinner,
} from "@chakra-ui/react"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { HiXMark } from "react-icons/hi2"
import { apiService, API_BASE_URL } from "@/services/api"
import type { GalleryCategory, GalleryImage } from "@/services/api"

const MotionBox = motion(Box)

const GalleryPage = () => {
  const [categories, setCategories] = useState<GalleryCategory[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  const getImageUrl = (path: string) => {
    if (!path) return ""
    if (path.startsWith("http")) return path
    return `${API_BASE_URL}${path}`
  }

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await apiService.getGallery()
        if (response.success) {
          setCategories(response.data)
        }
      } catch (error) {
        console.error("Failed to fetch gallery", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchGallery()
  }, [])

  const handleImageClick = (image: GalleryImage) => {
    setSelectedImage(image)
  }

  const closeModal = () => {
    setSelectedImage(null)
  }

  if (isLoading) {
    return (
      <Box pt={{ base: 28, md: 32 }} pb={{ base: 12, md: 16 }} display="flex" justifyContent="center">
        <Spinner size="xl" />
      </Box>
    )
  }

  return (
    <Box pt={{ base: 28, md: 32 }} pb={{ base: 12, md: 16 }}>
      {/* Gallery Categories */}
      {categories.map((category, categoryIndex) => (
        <Box 
          key={category.id || categoryIndex}
          py={{ base: 12, md: 16 }}
          bg={categoryIndex % 2 === 0 ? "white" : "neutral.50"}
        >
          <Container maxW="7xl" px={{ base: 4, md: 6 }}>
            {/* Category Header */}
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              mb={8}
            >
              <VStack align="start" gap={2}>
                <Heading
                  as="h2"
                  fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
                  fontWeight="700"
                  color="text"
                >
                  {category.title}
                </Heading>
                <Text
                  fontSize={{ base: "md", md: "lg" }}
                  color="muted"
                  lineHeight="1.6"
                >
                  {category.description}
                </Text>
              </VStack>
            </MotionBox>

            {/* Gallery Grid */}
            <SimpleGrid
              columns={{ base: 1, sm: 2, lg: 3, xl: 4 }}
              gap={{ base: 4, md: 6 }}
            >
              {category.uploaded_images.map((image, index) => (
                <MotionBox
                  key={image.id || index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Box
                    position="relative"
                    borderRadius="xl"
                    overflow="hidden"
                    cursor="pointer"
                    onClick={() => handleImageClick(image)}
                    _hover={{
                      transform: "translateY(-4px)",
                      shadow: "2xl",
                    }}
                    transition="all 0.3s ease"
                    bg="gray.100"
                    shadow="md"
                  >
                    <Image
                      src={getImageUrl(image.image)}
                      alt={`${category.title} - Image ${index + 1}`}
                      w="full"
                      h={{ base: "250px", md: "300px" }}
                      objectFit="cover"
                      loading="lazy"
                    />
                    <Box
                      position="absolute"
                      inset={0}
                      bg="blackAlpha.300"
                      opacity={0}
                      _hover={{ opacity: 1 }}
                      transition="opacity 0.3s ease"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Text
                        color="white"
                        fontSize="lg"
                        fontWeight="600"
                        textAlign="center"
                        px={4}
                      >
                        Click to view
                      </Text>
                    </Box>
                  </Box>
                </MotionBox>
              ))}
            </SimpleGrid>
          </Container>
        </Box>
      ))}

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <MotionBox
            position="fixed"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bg="blackAlpha.900"
            zIndex={9999}
            display="flex"
            alignItems="center"
            justifyContent="center"
            p={{ base: 4, md: 8 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeModal}
          >
            <Box
              position="absolute"
              top={{ base: 4, md: 6 }}
              right={{ base: 4, md: 6 }}
              zIndex={10000}
            >
              <Box
                as="button"
                p={3}
                bg="whiteAlpha.200"
                borderRadius="full"
                color="white"
                _hover={{ bg: "whiteAlpha.300" }}
                transition="all 0.2s"
                onClick={closeModal}
              >
                <Icon as={HiXMark} boxSize={6} />
              </Box>
            </Box>
            <MotionBox
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              maxW="90vw"
              maxH="90vh"
              position="relative"
            >
              <Image
                src={getImageUrl(selectedImage.image)}
                alt="Gallery image full view"
                w="full"
                h="full"
                maxH="90vh"
                objectFit="contain"
                borderRadius="xl"
              />
              {/* Caption Overlay */}
              <Box
                position="absolute"
                bottom={0}
                left={0}
                right={0}
                bg="blackAlpha.800"
                backdropFilter="blur(10px)"
                p={{ base: 4, md: 6 }}
                borderBottomRadius="xl"
              >
                <Text
                  color="white"
                  fontSize={{ base: "sm", md: "md" }}
                  lineHeight="1.6"
                  textAlign="center"
                >
                  {selectedImage.caption}
                </Text>
              </Box>
            </MotionBox>
          </MotionBox>
        )}
      </AnimatePresence>
    </Box>
  )
}

export default GalleryPage
