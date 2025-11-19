import {
  Box,
  Button,
  VStack,
  HStack,
  Text,
  Input,
  Textarea,
  Table,
  Icon,
  Badge,
  Image,
  Grid,
  Field,
} from "@chakra-ui/react"
import { useState } from "react"
import { HiPencil, HiTrash, HiPlus, HiX, HiCheck } from "react-icons/hi"
import { toaster } from "@/components/ui/toaster"

interface Testimonial {
  id: string
  quote: string
  author: string
  company: string
  image: string
}

interface TestimonialsManagementProps {
  testimonials?: Testimonial[]
}

export const TestimonialsManagement = ({ testimonials: initialTestimonials = [] }: TestimonialsManagementProps) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials.length > 0 ? initialTestimonials : [
    {
      id: "1",
      quote: "IOXET delivered an exceptional product that exceeded our expectations. Their attention to detail and technical expertise is unmatched.",
      author: "Subash Bhandari",
      company: "Nature Works Pvt. Ltd.",
      image: "https://www.natureworks.com.np/web/image/2767-bc14c0a2/netra-prasad-bhandari.webp"
    },
    {
      id: "2",
      quote: "Working with IOXET was a game-changer for our business. They transformed our vision into reality with remarkable precision.",
      author: "Ram Krishna Prasai",
      company: "Shikhar Shoe Industries",
      image: "/profile.png"
    },
    {
      id: "3",
      quote: "The team's dedication to quality and innovation made our project a tremendous success. Highly recommended!",
      author: "Janardan Tripathi",
      company: "Pratyusha Enterprises",
      image: "/profile.png"
    }
  ])
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    quote: "",
    author: "",
    company: "",
    image: ""
  })

  const handleAdd = () => {
    setIsAdding(true)
    setEditingId(null)
    setFormData({ quote: "", author: "", company: "", image: "" })
  }

  const handleEdit = (testimonial: Testimonial) => {
    setEditingId(testimonial.id)
    setIsAdding(false)
    setFormData({
      quote: testimonial.quote,
      author: testimonial.author,
      company: testimonial.company,
      image: testimonial.image
    })
  }

  const handleSave = () => {
    if (!formData.quote || !formData.author || !formData.company) {
      toaster.create({
        title: "Validation Error",
        description: "Please fill in all required fields (quote, author, company)",
        type: "error",
        duration: 3000,
      })
      return
    }

    if (isAdding) {
      const newTestimonial: Testimonial = {
        id: Date.now().toString(),
        ...formData,
        image: formData.image || "/profile.png"
      }
      setTestimonials([...testimonials, newTestimonial])
      toaster.create({
        title: "Success",
        description: "Testimonial added successfully",
        type: "success",
        duration: 3000,
      })
    } else if (editingId) {
      setTestimonials(testimonials.map(t => 
        t.id === editingId ? { ...t, ...formData, image: formData.image || "/profile.png" } : t
      ))
      toaster.create({
        title: "Success",
        description: "Testimonial updated successfully",
        type: "success",
        duration: 3000,
      })
    }

    handleCancel()
  }

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this testimonial?")) {
      setTestimonials(testimonials.filter(t => t.id !== id))
      toaster.create({
        title: "Success",
        description: "Testimonial deleted successfully",
        type: "success",
        duration: 3000,
      })
    }
  }

  const handleCancel = () => {
    setIsAdding(false)
    setEditingId(null)
    setFormData({ quote: "", author: "", company: "", image: "" })
  }

  return (
    <VStack align="stretch" gap={6}>
      {/* Add New Button */}
      {!isAdding && !editingId && (
        <Box display="flex" justifyContent="flex-end">
          <Button
            colorScheme="blue"
            size="md"
            onClick={handleAdd}
          >
            <Icon fontSize="lg" mr={2}>
              <HiPlus />
            </Icon>
            Add New Testimonial
          </Button>
        </Box>
      )}

      {/* Add/Edit Form */}
      {(isAdding || editingId) && (
        <Box
          p={6}
          bg="white"
          borderRadius="lg"
          borderWidth="1px"
          borderColor="gray.200"
          shadow="sm"
        >
          <VStack align="stretch" gap={4}>
            <HStack justify="space-between" mb={2}>
              <Text fontSize="lg" fontWeight="600" color="gray.900">
                {isAdding ? "Add New Testimonial" : "Edit Testimonial"}
              </Text>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCancel}
              >
                <Icon fontSize="lg">
                  <HiX />
                </Icon>
              </Button>
            </HStack>

            <Field.Root>
              <Field.Label fontSize="sm" fontWeight="600" color="gray.700">
                Testimonial Quote *
              </Field.Label>
              <Textarea
                placeholder="Enter the testimonial quote..."
                value={formData.quote}
                onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                rows={4}
                resize="vertical"
              />
            </Field.Root>

            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
              <Field.Root>
                <Field.Label fontSize="sm" fontWeight="600" color="gray.700">
                  Author Name *
                </Field.Label>
                <Input
                  placeholder="Enter author name"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                />
              </Field.Root>

              <Field.Root>
                <Field.Label fontSize="sm" fontWeight="600" color="gray.700">
                  Company Name *
                </Field.Label>
                <Input
                  placeholder="Enter company name"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </Field.Root>
            </Grid>

            <Field.Root>
              <Field.Label fontSize="sm" fontWeight="600" color="gray.700">
                Profile Image URL
              </Field.Label>
              <Input
                placeholder="Enter image URL (optional, defaults to /profile.png)"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              />
              {formData.image && (
                <Box mt={2}>
                  <Image
                    src={formData.image}
                    alt="Preview"
                    width="60px"
                    height="60px"
                    borderRadius="full"
                    objectFit="cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "/profile.png"
                    }}
                  />
                </Box>
              )}
            </Field.Root>

            <HStack gap={3} pt={2}>
              <Button
                colorScheme="blue"
                onClick={handleSave}
              >
                <Icon fontSize="lg" mr={2}>
                  <HiCheck />
                </Icon>
                {isAdding ? "Add Testimonial" : "Save Changes"}
              </Button>
              <Button
                variant="outline"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </HStack>
          </VStack>
        </Box>
      )}

      {/* Testimonials List */}
      <Box
        bg="white"
        borderRadius="lg"
        borderWidth="1px"
        borderColor="gray.200"
        overflow="hidden"
      >
        <Box p={4} borderBottomWidth="1px" borderColor="gray.200">
          <HStack justify="space-between">
            <Text fontSize="lg" fontWeight="600" color="gray.900">
              All Testimonials
            </Text>
            <Badge colorScheme="blue" fontSize="sm" px={3} py={1} borderRadius="full">
              {testimonials.length} Total
            </Badge>
          </HStack>
        </Box>

        <Box overflowX="auto">
          <Table.Root size="lg" variant="line">
            <Table.Header>
              <Table.Row bg="gray.50">
                <Table.ColumnHeader>Author</Table.ColumnHeader>
                <Table.ColumnHeader>Company</Table.ColumnHeader>
                <Table.ColumnHeader>Quote Preview</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="center">Actions</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {testimonials.map((testimonial) => (
                <Table.Row key={testimonial.id}>
                  <Table.Cell>
                    <HStack gap={3}>
                      <Image
                        src={testimonial.image || "/profile.png"}
                        alt={testimonial.author}
                        width="40px"
                        height="40px"
                        borderRadius="full"
                        objectFit="cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = "/profile.png"
                        }}
                      />
                      <Text fontWeight="600" color="gray.900">
                        {testimonial.author}
                      </Text>
                    </HStack>
                  </Table.Cell>
                  <Table.Cell>
                    <Text color="gray.700">{testimonial.company}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text
                      color="gray.600"
                      fontSize="sm"
                      noOfLines={2}
                      maxW="400px"
                    >
                      "{testimonial.quote}"
                    </Text>
                  </Table.Cell>
                  <Table.Cell>
                    <HStack justify="center" gap={2}>
                      <Button
                        size="sm"
                        variant="outline"
                        colorScheme="blue"
                        onClick={() => handleEdit(testimonial)}
                      >
                        <Icon fontSize="md">
                          <HiPencil />
                        </Icon>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        colorScheme="red"
                        onClick={() => handleDelete(testimonial.id)}
                      >
                        <Icon fontSize="md">
                          <HiTrash />
                        </Icon>
                      </Button>
                    </HStack>
                  </Table.Cell>
                </Table.Row>
              ))}
              {testimonials.length === 0 && (
                <Table.Row>
                  <Table.Cell colSpan={4}>
                    <Text textAlign="center" color="gray.500" py={8}>
                      No testimonials yet. Add your first testimonial above.
                    </Text>
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table.Root>
        </Box>
      </Box>
    </VStack>
  )
}
