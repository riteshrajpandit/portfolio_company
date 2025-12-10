import { useState, useEffect } from "react"
import {
  Box,
  Button,
  Input,
  Textarea,
  VStack,
  HStack,
  Text,
  Heading,
  Field,
  Badge,
  Image,
  Spinner,
  Icon,
} from "@chakra-ui/react"
import {
  HiTrash,
  HiPencil,
  HiPlus,
  HiEye,
  HiXMark,
} from "react-icons/hi2"
import { toaster } from "@/components/ui/toaster"
import { apiService, API_BASE_URL } from "@/services/api"
import type { GalleryCategory, GalleryImage } from "@/services/api"
import { motion, AnimatePresence } from "framer-motion"

const MotionBox = motion(Box)

interface LocalGalleryImage {
  id?: number
  image?: File
  previewUrl: string
  caption: string
}

const GalleryManagement = () => {
  const [categories, setCategories] = useState<GalleryCategory[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  const getImageUrl = (path: string) => {
    if (!path) return ""
    if (path.startsWith("http") || path.startsWith("data:")) return path
    return `${API_BASE_URL}${path}`
  }
  
  // Modal/Form states
  const [isEditing, setIsEditing] = useState(false)
  const [editingCategory, setEditingCategory] = useState<GalleryCategory | null>(null)
  
  // Form Data
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  })
  const [formImages, setFormImages] = useState<LocalGalleryImage[]>([])

  // Preview State
  const [previewImage, setPreviewImage] = useState<GalleryImage | null>(null)

  const fetchCategories = async () => {
    try {
      setIsLoading(true)
      const response = await apiService.getGallery()
      if (response.success) {
        setCategories(response.data)
      }
    } catch (error) {
      toaster.create({
        title: "Error",
        description: "Failed to fetch gallery categories",
        type: "error",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const handleAddCategory = () => {
    setEditingCategory(null)
    setFormData({ title: "", description: "" })
    setFormImages([])
    setIsEditing(true)
  }

  const handleEditCategory = (category: GalleryCategory) => {
    setEditingCategory(category)
    setFormData({
      title: category.title,
      description: category.description,
    })
    // Convert existing images to LocalGalleryImage format
    setFormImages(category.uploaded_images.map(img => ({
      id: img.id,
      previewUrl: img.image,
      caption: img.caption
    })))
    setIsEditing(true)
  }

  const handleDeleteCategory = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return

    try {
      await apiService.deleteGallery(id)
      toaster.create({
        title: "Success",
        description: "Category deleted successfully",
        type: "success",
      })
      fetchCategories()
    } catch (error) {
      toaster.create({
        title: "Error",
        description: "Failed to delete category",
        type: "error",
      })
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toaster.create({ title: "Invalid File", description: "Please upload an image", type: "error" })
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      setFormImages([...formImages, {
        image: file,
        previewUrl: reader.result as string,
        caption: ""
      }])
    }
    reader.readAsDataURL(file)
    
    // Reset input
    e.target.value = ''
  }

  const handleRemoveFormImage = (index: number) => {
    const newImages = [...formImages]
    newImages.splice(index, 1)
    setFormImages(newImages)
  }

  const handleImageCaptionChange = (index: number, caption: string) => {
    const newImages = [...formImages]
    newImages[index].caption = caption
    setFormImages(newImages)
  }

  const handleSubmit = async () => {
    if (!formData.title || !formData.description) {
      toaster.create({ title: "Validation Error", description: "Title and Description are required", type: "error" })
      return
    }

    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        uploaded_images: formImages.map(img => ({
          id: img.id,
          image: img.image, // This will be undefined for existing images, which is fine
          caption: img.caption
        }))
      }

      if (editingCategory?.id) {
        await apiService.updateGallery(editingCategory.id, payload)
        toaster.create({ title: "Success", description: "Category updated successfully", type: "success" })
      } else {
        await apiService.createGallery(payload as any) // Type assertion needed as create expects image to be File
        toaster.create({ title: "Success", description: "Category created successfully", type: "success" })
      }
      
      setIsEditing(false)
      fetchCategories()
    } catch (error) {
      toaster.create({
        title: "Error",
        description: "Failed to save category",
        type: "error",
      })
    }
  }

  const openPreview = (image: GalleryImage) => {
    setPreviewImage(image)
  }

  const closePreview = () => {
    setPreviewImage(null)
  }

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" h="200px">
        <Spinner size="xl" />
      </Box>
    )
  }

  return (
    <Box>
      {/* Header */}
      <HStack justify="space-between" mb={6}>
        <Heading size="lg">Gallery Management</Heading>
        <Button colorScheme="blue" onClick={handleAddCategory}>
          <HiPlus /> Add Category
        </Button>
      </HStack>

      {/* Categories List */}
      <VStack gap={6} align="stretch">
        {categories.map((category) => (
          <Box key={category.id} p={6} borderWidth="1px" borderRadius="lg" bg="white">
            <HStack justify="space-between" mb={4}>
              <VStack align="start" gap={1}>
                <Heading size="md">{category.title}</Heading>
                <Text fontSize="sm" color="muted">{category.description}</Text>
                <Badge colorScheme="blue">
                  {category.uploaded_images.length} images
                </Badge>
              </VStack>
              <HStack gap={2}>
                <Button size="sm" variant="ghost" colorScheme="blue" onClick={() => handleEditCategory(category)}>
                  <HiPencil /> Edit
                </Button>
                <Button size="sm" variant="ghost" colorScheme="red" onClick={() => handleDeleteCategory(category.id!)}>
                  <HiTrash /> Delete
                </Button>
              </HStack>
            </HStack>

            {/* Images Grid Preview */}
            {category.uploaded_images.length > 0 && (
              <HStack gap={4} overflowX="auto" py={2}>
                {category.uploaded_images.map((img, idx) => (
                  <Box 
                    key={idx} 
                    position="relative" 
                    minW="120px" 
                    h="80px" 
                    borderRadius="md" 
                    overflow="hidden"
                    cursor="pointer"
                    onClick={() => openPreview(img)}
                    _hover={{ opacity: 0.8 }}
                  >
                    <Image src={getImageUrl(img.image)} w="full" h="full" objectFit="cover" />
                    <Box position="absolute" inset={0} bg="blackAlpha.300" display="flex" alignItems="center" justifyContent="center" opacity={0} _hover={{ opacity: 1 }}>
                      <Icon as={HiEye} color="white" />
                    </Box>
                  </Box>
                ))}
              </HStack>
            )}
          </Box>
        ))}
      </VStack>

      {/* Edit/Create Modal (Inline for now) */}
      {isEditing && (
        <Box position="fixed" inset={0} bg="blackAlpha.500" zIndex={1000} display="flex" alignItems="center" justifyContent="center" p={4}>
          <Box bg="white" w="full" maxW="3xl" maxH="90vh" overflowY="auto" borderRadius="xl" p={6}>
            <HStack justify="space-between" mb={6}>
              <Heading size="md">{editingCategory ? "Edit Category" : "New Category"}</Heading>
              <Button size="sm" variant="ghost" onClick={() => setIsEditing(false)}>
                <HiXMark />
              </Button>
            </HStack>

            <VStack gap={4} align="stretch">
              <Field.Root>
                <Field.Label>Title</Field.Label>
                <Input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              </Field.Root>
              <Field.Root>
                <Field.Label>Description</Field.Label>
                <Textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
              </Field.Root>

              <Box>
                <Text fontWeight="medium" mb={2}>Images</Text>
                <VStack gap={3} align="stretch">
                  {formImages.map((img, idx) => (
                    <HStack key={idx} p={3} borderWidth="1px" borderRadius="md" gap={4}>
                      <Image src={getImageUrl(img.previewUrl)} w="80px" h="60px" objectFit="cover" borderRadius="sm" />
                      <Input 
                        placeholder="Caption" 
                        value={img.caption} 
                        onChange={e => handleImageCaptionChange(idx, e.target.value)} 
                      />
                      <Button size="sm" colorScheme="red" variant="ghost" onClick={() => handleRemoveFormImage(idx)}>
                        <HiTrash />
                      </Button>
                    </HStack>
                  ))}
                  
                  <Button as="label" cursor="pointer" variant="outline" borderStyle="dashed" h="60px">
                    <HiPlus /> Add Image
                    <input type="file" hidden accept="image/*" onChange={handleFileUpload} />
                  </Button>
                </VStack>
              </Box>

              <HStack justify="flex-end" mt={4}>
                <Button variant="ghost" onClick={() => setIsEditing(false)}>Cancel</Button>
                <Button colorScheme="blue" onClick={handleSubmit}>Save Changes</Button>
              </HStack>
            </VStack>
          </Box>
        </Box>
      )}

      {/* Preview Modal */}
      <AnimatePresence>
        {previewImage && (
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
            onClick={closePreview}
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
                onClick={closePreview}
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
                src={getImageUrl(previewImage.image)}
                alt="Gallery image full view"
                w="full"
                h="full"
                maxH="90vh"
                objectFit="contain"
                borderRadius="xl"
              />
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
                  {previewImage.caption}
                </Text>
              </Box>
            </MotionBox>
          </MotionBox>
        )}
      </AnimatePresence>
    </Box>
  )
}

export { GalleryManagement }
