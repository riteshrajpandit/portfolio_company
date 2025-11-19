import { useState } from "react"
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
  Table,
  Badge,
  Image,
} from "@chakra-ui/react"
import {
  HiTrash,
  HiPencil,
  HiPlus,
  HiPhoto,
} from "react-icons/hi2"
import { toaster } from "@/components/ui/toaster"

interface GalleryImage {
  src: string
  caption: string
}

interface GalleryCategory {
  title: string
  description: string
  images: GalleryImage[]
}

const GalleryManagement = () => {
  // Pre-populate with existing gallery data
  const [categories, setCategories] = useState<GalleryCategory[]>([
    {
      title: "Interviewing at BroadwayInfosys",
      description: "Hiring backend and frontend developers for IOXET Labs",
      images: [
        {
          src: "/ioxet-gallery/image1.jpg",
          caption: "Technical interview session with senior backend developer candidates discussing system architecture and scalability challenges"
        },
        {
          src: "/ioxet-gallery/image2.jpg",
          caption: "Frontend developer coding challenge - Building responsive UI components with React and TypeScript"
        },
        {
          src: "/ioxet-gallery/image3.jpg",
          caption: "Team collaboration round where candidates present their problem-solving approach and code review practices"
        },
        {
          src: "/ioxet-gallery/image4.jpg",
          caption: "Final round discussion about project experience, team dynamics, and career goals with IOXET Labs leadership"
        },
      ]
    }
  ])

  const [isAddingCategory, setIsAddingCategory] = useState(false)
  const [editingCategoryIndex, setEditingCategoryIndex] = useState<number | null>(null)
  const [isAddingImage, setIsAddingImage] = useState(false)
  const [editingImageIndex, setEditingImageIndex] = useState<number | null>(null)
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number | null>(null)

  // Category form state
  const [categoryFormData, setCategoryFormData] = useState({
    title: "",
    description: "",
  })

  // Image form state
  const [imageFormData, setImageFormData] = useState({
    src: "",
    caption: "",
  })

  // File upload handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toaster.create({
        title: "Invalid File Type",
        description: "Please upload an image file (JPG, PNG)",
        type: "error",
      })
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toaster.create({
        title: "File Too Large",
        description: "Please upload an image smaller than 5MB",
        type: "error",
      })
      return
    }

    // Create a local URL for preview
    const reader = new FileReader()
    reader.onloadend = () => {
      const base64String = reader.result as string
      setImageFormData({ ...imageFormData, src: base64String })
      toaster.create({
        title: "Image Uploaded",
        description: `${file.name} uploaded successfully`,
        type: "success",
      })
    }
    reader.readAsDataURL(file)
  }

  // Category handlers
  const handleAddCategory = () => {
    setIsAddingCategory(true)
    setEditingCategoryIndex(null)
    setCategoryFormData({
      title: "",
      description: "",
    })
  }

  const handleEditCategory = (index: number) => {
    setEditingCategoryIndex(index)
    setIsAddingCategory(false)
    const category = categories[index]
    setCategoryFormData({
      title: category.title,
      description: category.description,
    })
  }

  const handleSaveCategory = () => {
    if (!categoryFormData.title || !categoryFormData.description) {
      toaster.create({
        title: "Validation Error",
        description: "Please fill in all required fields (title, description)",
        type: "error",
      })
      return
    }

    if (editingCategoryIndex !== null) {
      // Update existing category
      const updatedCategories = [...categories]
      updatedCategories[editingCategoryIndex] = {
        ...updatedCategories[editingCategoryIndex],
        title: categoryFormData.title,
        description: categoryFormData.description,
      }
      setCategories(updatedCategories)
      toaster.create({
        title: "Category Updated",
        description: "Gallery category has been updated successfully",
        type: "success",
      })
    } else {
      // Add new category
      setCategories([...categories, {
        ...categoryFormData,
        images: []
      }])
      toaster.create({
        title: "Category Added",
        description: "New gallery category has been added successfully",
        type: "success",
      })
    }

    handleCancelCategory()
  }

  const handleDeleteCategory = (index: number) => {
    if (window.confirm("Are you sure you want to delete this category and all its images? This action cannot be undone.")) {
      setCategories(categories.filter((_, i) => i !== index))
      toaster.create({
        title: "Category Deleted",
        description: "Gallery category has been removed successfully",
        type: "success",
      })
    }
  }

  const handleCancelCategory = () => {
    setIsAddingCategory(false)
    setEditingCategoryIndex(null)
    setCategoryFormData({
      title: "",
      description: "",
    })
  }

  // Image handlers
  const handleAddImage = (categoryIndex: number) => {
    setIsAddingImage(true)
    setEditingImageIndex(null)
    setSelectedCategoryIndex(categoryIndex)
    setImageFormData({
      src: "",
      caption: "",
    })
  }

  const handleEditImage = (categoryIndex: number, imageIndex: number) => {
    setEditingImageIndex(imageIndex)
    setIsAddingImage(false)
    setSelectedCategoryIndex(categoryIndex)
    const image = categories[categoryIndex].images[imageIndex]
    setImageFormData({
      src: image.src,
      caption: image.caption,
    })
  }

  const handleSaveImage = () => {
    if (!imageFormData.src || !imageFormData.caption) {
      toaster.create({
        title: "Validation Error",
        description: "Please fill in all required fields (image URL, caption)",
        type: "error",
      })
      return
    }

    if (selectedCategoryIndex === null) return

    const updatedCategories = [...categories]

    if (editingImageIndex !== null) {
      // Update existing image
      updatedCategories[selectedCategoryIndex].images[editingImageIndex] = {
        src: imageFormData.src,
        caption: imageFormData.caption,
      }
      toaster.create({
        title: "Image Updated",
        description: "Gallery image has been updated successfully",
        type: "success",
      })
    } else {
      // Add new image
      updatedCategories[selectedCategoryIndex].images.push({
        src: imageFormData.src,
        caption: imageFormData.caption,
      })
      toaster.create({
        title: "Image Added",
        description: "New gallery image has been added successfully",
        type: "success",
      })
    }

    setCategories(updatedCategories)
    handleCancelImage()
  }

  const handleDeleteImage = (categoryIndex: number, imageIndex: number) => {
    if (window.confirm("Are you sure you want to delete this image? This action cannot be undone.")) {
      const updatedCategories = [...categories]
      updatedCategories[categoryIndex].images = updatedCategories[categoryIndex].images.filter((_, i) => i !== imageIndex)
      setCategories(updatedCategories)
      toaster.create({
        title: "Image Deleted",
        description: "Gallery image has been removed successfully",
        type: "success",
      })
    }
  }

  const handleCancelImage = () => {
    setIsAddingImage(false)
    setEditingImageIndex(null)
    setSelectedCategoryIndex(null)
    setImageFormData({
      src: "",
      caption: "",
    })
  }

  return (
    <Box>
      {/* Category Form */}
      {(isAddingCategory || editingCategoryIndex !== null) && (
        <Box mb={8} p={6} bg="neutral.50" borderRadius="xl" borderWidth="1px">
          <Heading size="lg" mb={6}>
            {editingCategoryIndex !== null ? "Edit Category" : "Add New Category"}
          </Heading>

          <VStack gap={4} align="stretch">
            <Field.Root>
              <Field.Label>Category Title *</Field.Label>
              <Input
                value={categoryFormData.title}
                onChange={(e) => setCategoryFormData({ ...categoryFormData, title: e.target.value })}
                placeholder="e.g., Interviewing at BroadwayInfosys"
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>Description *</Field.Label>
              <Textarea
                value={categoryFormData.description}
                onChange={(e) => setCategoryFormData({ ...categoryFormData, description: e.target.value })}
                placeholder="Brief description of this gallery category..."
                rows={3}
              />
            </Field.Root>
          </VStack>

          <HStack gap={3} mt={6}>
            <Button colorScheme="blue" onClick={handleSaveCategory}>
              {editingCategoryIndex !== null ? "Update Category" : "Add Category"}
            </Button>
            <Button variant="ghost" onClick={handleCancelCategory}>
              Cancel
            </Button>
          </HStack>
        </Box>
      )}

      {/* Image Form */}
      {(isAddingImage || editingImageIndex !== null) && selectedCategoryIndex !== null && (
        <Box mb={8} p={6} bg="blue.50" borderRadius="xl" borderWidth="1px">
          <Heading size="md" mb={6}>
            {editingImageIndex !== null ? "Edit Image" : "Add New Image"} - {categories[selectedCategoryIndex].title}
          </Heading>

          <VStack gap={4} align="stretch">
            <Field.Root>
              <Field.Label>Upload Image *</Field.Label>
              <Box
                position="relative"
                borderWidth="2px"
                borderStyle="dashed"
                borderColor="blue.300"
                borderRadius="lg"
                p={8}
                textAlign="center"
                bg="blue.50"
                cursor="pointer"
                transition="all 0.2s"
                _hover={{
                  borderColor: "blue.500",
                  bg: "blue.100"
                }}
                onClick={() => document.getElementById('image-upload-input')?.click()}
              >
                <VStack gap={3}>
                  <Box
                    p={4}
                    bg="blue.500"
                    borderRadius="full"
                    color="white"
                    fontSize="3xl"
                  >
                    <HiPhoto />
                  </Box>
                  <VStack gap={1}>
                    <Text fontWeight="600" color="blue.700">
                      Click to upload or drag and drop
                    </Text>
                    <Text fontSize="sm" color="muted">
                      JPG or PNG (max 5MB)
                    </Text>
                  </VStack>
                </VStack>
                <Input
                  id="image-upload-input"
                  type="file"
                  accept="image/jpeg,image/png,image/jpg"
                  onChange={handleFileUpload}
                  display="none"
                />
              </Box>
              <Field.HelperText>
                Upload JPG or PNG image (max 5MB). Image will be stored as base64.
              </Field.HelperText>
            </Field.Root>

            <HStack gap={4} align="center">
              <Box flex="1" h="1px" bg="gray.300" />
              <Text fontSize="sm" fontWeight="600" color="gray.500">OR</Text>
              <Box flex="1" h="1px" bg="gray.300" />
            </HStack>

            <Field.Root>
              <Field.Label>Image URL (Alternative)</Field.Label>
              <Input
                value={imageFormData.src}
                onChange={(e) => setImageFormData({ ...imageFormData, src: e.target.value })}
                placeholder="/ioxet-gallery/image1.jpg"
                size="lg"
              />
              <Field.HelperText>
                Enter an image URL if you prefer not to upload a file
              </Field.HelperText>
            </Field.Root>

            <Field.Root>
              <Field.Label>Caption *</Field.Label>
              <Textarea
                value={imageFormData.caption}
                onChange={(e) => setImageFormData({ ...imageFormData, caption: e.target.value })}
                placeholder="Detailed description of what's happening in this image..."
                rows={3}
              />
            </Field.Root>

            {imageFormData.src && (
              <Box>
                <Text fontSize="sm" fontWeight="500" mb={2}>Image Preview:</Text>
                <Image
                  src={imageFormData.src}
                  alt="Preview"
                  maxH="200px"
                  borderRadius="md"
                  objectFit="cover"
                />
              </Box>
            )}
          </VStack>

          <HStack gap={3} mt={6}>
            <Button colorScheme="blue" onClick={handleSaveImage}>
              {editingImageIndex !== null ? "Update Image" : "Add Image"}
            </Button>
            <Button variant="ghost" onClick={handleCancelImage}>
              Cancel
            </Button>
          </HStack>
        </Box>
      )}

      {/* Categories List */}
      {!isAddingCategory && editingCategoryIndex === null && (
        <Box>
          <Box display="flex" justifyContent="flex-end" mb={4}>
            <Button
              colorScheme="blue"
              onClick={handleAddCategory}
            >
              <HiPlus /> Add New Category
            </Button>
          </Box>

          {categories.length === 0 ? (
            <Box p={8} textAlign="center" borderWidth="1px" borderRadius="lg" bg="neutral.50">
              <Text color="muted">No gallery categories yet. Add your first category!</Text>
            </Box>
          ) : (
            <VStack gap={6} align="stretch">
              {categories.map((category, categoryIndex) => (
                <Box key={categoryIndex} p={6} borderWidth="1px" borderRadius="lg" bg="white">
                  {/* Category Header */}
                  <HStack justify="space-between" mb={4}>
                    <VStack align="start" gap={1}>
                      <Heading size="md">{category.title}</Heading>
                      <Text fontSize="sm" color="muted">{category.description}</Text>
                      <Badge colorScheme="blue">
                        {category.images.length} {category.images.length === 1 ? 'image' : 'images'}
                      </Badge>
                    </VStack>
                    <HStack gap={2}>
                      <Button
                        size="sm"
                        colorScheme="blue"
                        onClick={() => handleAddImage(categoryIndex)}
                      >
                        <HiPhoto /> Add Image
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        colorScheme="blue"
                        onClick={() => handleEditCategory(categoryIndex)}
                      >
                        <HiPencil />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        colorScheme="red"
                        onClick={() => handleDeleteCategory(categoryIndex)}
                      >
                        <HiTrash />
                      </Button>
                    </HStack>
                  </HStack>

                  {/* Images Table */}
                  {category.images.length > 0 && (
                    <Box overflowX="auto" borderWidth="1px" borderRadius="md" mt={4}>
                      <Table.Root size="sm" variant="outline">
                        <Table.Header>
                          <Table.Row bg="neutral.50">
                            <Table.ColumnHeader>Preview</Table.ColumnHeader>
                            <Table.ColumnHeader>Image URL</Table.ColumnHeader>
                            <Table.ColumnHeader>Caption</Table.ColumnHeader>
                            <Table.ColumnHeader textAlign="right">Actions</Table.ColumnHeader>
                          </Table.Row>
                        </Table.Header>
                        <Table.Body>
                          {category.images.map((image, imageIndex) => (
                            <Table.Row key={imageIndex}>
                              <Table.Cell>
                                <Image
                                  src={image.src}
                                  alt={`Image ${imageIndex + 1}`}
                                  w="80px"
                                  h="60px"
                                  objectFit="cover"
                                  borderRadius="md"
                                />
                              </Table.Cell>
                              <Table.Cell>
                                <Text fontSize="xs" color="muted" maxW="200px" lineClamp={1}>
                                  {image.src}
                                </Text>
                              </Table.Cell>
                              <Table.Cell maxW="400px">
                                <Text fontSize="sm" lineClamp={2}>
                                  {image.caption}
                                </Text>
                              </Table.Cell>
                              <Table.Cell textAlign="right">
                                <HStack gap={2} justify="flex-end">
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    colorScheme="blue"
                                    onClick={() => handleEditImage(categoryIndex, imageIndex)}
                                  >
                                    <HiPencil />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    colorScheme="red"
                                    onClick={() => handleDeleteImage(categoryIndex, imageIndex)}
                                  >
                                    <HiTrash />
                                  </Button>
                                </HStack>
                              </Table.Cell>
                            </Table.Row>
                          ))}
                        </Table.Body>
                      </Table.Root>
                    </Box>
                  )}

                  {category.images.length === 0 && (
                    <Box p={4} textAlign="center" borderWidth="1px" borderRadius="md" bg="neutral.50" mt={4}>
                      <Text fontSize="sm" color="muted">
                        No images in this category. Click "Add Image" to get started.
                      </Text>
                    </Box>
                  )}
                </Box>
              ))}
            </VStack>
          )}
        </Box>
      )}
    </Box>
  )
}

export { GalleryManagement }
