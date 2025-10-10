import {
  Box,
  Container,
  Text,
  SimpleGrid,
  Image,
  Icon,
  VStack,
  Heading,
} from "@chakra-ui/react"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { HiXMark } from "react-icons/hi2"

const MotionBox = motion(Box)

interface GalleryCategory {
  title: string
  description: string
  images: string[]
}

const galleryCategories: GalleryCategory[] = [
  {
    title: "Interviewing at BroadwayInfosys",
    description: "Hiring backend and frontend developers for IOXET Labs",
    images: [
      "/ioxet-gallery/image1.jpg",
      "/ioxet-gallery/image2.jpg",
      "/ioxet-gallery/image3.jpg",
      "/ioxet-gallery/image4.jpg",
    ]
  }
//  {
//     title: "Conference",
//     description: "Our team at industry conferences and networking events",
//     images: [
//       "/ioxet-gallery/conference/image5.jpg",
//       "/ioxet-gallery/conference/image6.jpg",
//       "/ioxet-gallery/conference/image7.jpg",
//       "/ioxet-gallery/conference/image8.jpg",
//       "/ioxet-gallery/conference/image9.jpg",
//     ]
//   }
]

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const handleImageClick = (image: string) => {
    setSelectedImage(image)
  }

  const closeModal = () => {
    setSelectedImage(null)
  }

  return (
    <Box pt={{ base: 28, md: 32 }} pb={{ base: 12, md: 16 }}>
      {/* Gallery Categories */}
      {galleryCategories.map((category, categoryIndex) => (
        <Box 
          key={categoryIndex}
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
              {category.images.map((image, index) => (
                <MotionBox
                  key={index}
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
                      src={image}
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
            >
              <Image
                src={selectedImage}
                alt="Gallery image full view"
                w="full"
                h="full"
                maxH="90vh"
                objectFit="contain"
                borderRadius="xl"
              />
            </MotionBox>
          </MotionBox>
        )}
      </AnimatePresence>
    </Box>
  )
}

export default GalleryPage
