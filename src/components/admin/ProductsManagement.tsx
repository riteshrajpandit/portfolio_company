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
  Tabs,
} from "@chakra-ui/react"
import { useState } from "react"
import { HiPencil, HiTrash, HiPlus, HiX, HiCheck } from "react-icons/hi"
import { HiChartBar, HiSparkles } from "react-icons/hi2"
import { toaster } from "@/components/ui/toaster"

interface UseCase {
  title: string
  description: string
  animation: string
}

interface Pricing {
  starter: {
    price: string
    users: string
    features: string[]
  }
  professional: {
    price: string
    users: string
    features: string[]
  }
  enterprise: {
    price: string
    users: string
    features: string[]
  }
}

interface Product {
  id: string
  title: string
  subtitle: string
  description: string
  icon: string
  gradient: string
  image: string
  url: string
  features: string[]
  benefits: string[]
  useCases?: UseCase[]
  pricing?: Pricing
}

interface ProductsManagementProps {
  products?: Product[]
}

export const ProductsManagement = ({ products: initialProducts = [] }: ProductsManagementProps) => {
  const [products, setProducts] = useState<Product[]>(initialProducts.length > 0 ? initialProducts : [
    {
      id: "amigaa",
      title: "Amigaa Platform",
      subtitle: "AI-Powered Intelligent Automation",
      description: "Revolutionary AI platform that transforms business operations through intelligent automation, predictive analytics, and machine learning capabilities.",
      icon: "HiSparkles",
      gradient: "linear(135deg, orange.500, red.500)",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop&auto=format",
      url: "https://agent.amigaa.com",
      features: [
        "Machine Learning Models",
        "Natural Language Processing",
        "Computer Vision & Image Recognition",
        "Predictive Analytics",
        "Intelligent Process Automation",
        "Real-time Decision Making"
      ],
      benefits: [
        "Automate complex decision-making processes",
        "Reduce operational costs by up to 60%",
        "Improve accuracy and consistency",
        "24/7 intelligent monitoring and alerts"
      ],
      useCases: [
        {
          title: "Document Processing",
          description: "Automatically extract and process information from documents using advanced OCR & NLP technologies",
          animation: "/animations/services/documentOCR.lottie"
        },
        {
          title: "Quality Control",
          description: "AI-powered visual inspection and defect detection for manufacturing excellence",
          animation: "/animations/services/qualityControl.lottie"
        }
      ]
    },
    {
      id: "erp",
      title: "ERP Solutions",
      subtitle: "Enterprise Resource Planning",
      description: "Streamline your entire business operation with our comprehensive ERP system that integrates all departments and processes into a single, unified platform.",
      icon: "HiChartBar",
      gradient: "linear(135deg, blue.500, cyan.500)",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&auto=format",
      url: "https://oneerp.us",
      features: [
        "Financial Management & Accounting",
        "Supply Chain & Inventory Control",
        "Human Resources Management",
        "Customer Relationship Management",
        "Business Intelligence & Analytics",
        "Multi-location Support"
      ],
      benefits: [
        "Increased operational efficiency by 40%",
        "Real-time visibility across all departments",
        "Reduced manual processes and errors",
        "Improved compliance and reporting"
      ]
    }
  ])
  
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<Product>>({
    title: "",
    subtitle: "",
    description: "",
    icon: "HiSparkles",
    gradient: "",
    image: "",
    url: "",
    features: [],
    benefits: []
  })

  const [featuresInput, setFeaturesInput] = useState("")
  const [benefitsInput, setBenefitsInput] = useState("")

  const handleAdd = () => {
    setIsAdding(true)
    setEditingId(null)
    setFormData({
      title: "",
      subtitle: "",
      description: "",
      icon: "HiSparkles",
      gradient: "",
      image: "",
      url: "",
      features: [],
      benefits: []
    })
    setFeaturesInput("")
    setBenefitsInput("")
  }

  const handleEdit = (product: Product) => {
    setEditingId(product.id)
    setIsAdding(false)
    setFormData(product)
    setFeaturesInput(product.features.join("\n"))
    setBenefitsInput(product.benefits.join("\n"))
  }

  const handleSave = () => {
    if (!formData.title || !formData.subtitle || !formData.description || !formData.url) {
      toaster.create({
        title: "Validation Error",
        description: "Please fill in all required fields (title, subtitle, description, url)",
        type: "error",
        duration: 3000,
      })
      return
    }

    const features = featuresInput.split("\n").filter(f => f.trim() !== "")
    const benefits = benefitsInput.split("\n").filter(b => b.trim() !== "")

    if (features.length === 0 || benefits.length === 0) {
      toaster.create({
        title: "Validation Error",
        description: "Please add at least one feature and one benefit",
        type: "error",
        duration: 3000,
      })
      return
    }

    const productData: Product = {
      ...formData as Product,
      features,
      benefits,
    }

    if (isAdding) {
      productData.id = formData.title?.toLowerCase().replace(/\s+/g, '-') || Date.now().toString()
      setProducts([...products, productData])
      toaster.create({
        title: "Success",
        description: "Product added successfully",
        type: "success",
        duration: 3000,
      })
    } else if (editingId) {
      setProducts(products.map(p => p.id === editingId ? productData : p))
      toaster.create({
        title: "Success",
        description: "Product updated successfully",
        type: "success",
        duration: 3000,
      })
    }

    handleCancel()
  }

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter(p => p.id !== id))
      toaster.create({
        title: "Success",
        description: "Product deleted successfully",
        type: "success",
        duration: 3000,
      })
    }
  }

  const handleCancel = () => {
    setIsAdding(false)
    setEditingId(null)
    setFormData({
      title: "",
      subtitle: "",
      description: "",
      icon: "HiSparkles",
      gradient: "",
      image: "",
      url: "",
      features: [],
      benefits: []
    })
    setFeaturesInput("")
    setBenefitsInput("")
  }

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "HiChartBar":
        return HiChartBar
      case "HiSparkles":
        return HiSparkles
      default:
        return HiSparkles
    }
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
            Add New Product
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
                {isAdding ? "Add New Product" : "Edit Product"}
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

            <Tabs.Root defaultValue="basic" variant="enclosed">
              <Tabs.List>
                <Tabs.Trigger value="basic">Basic Info</Tabs.Trigger>
                <Tabs.Trigger value="details">Features & Benefits</Tabs.Trigger>
                <Tabs.Trigger value="design">Design & Styling</Tabs.Trigger>
              </Tabs.List>

              <Box pt={4}>
                <Tabs.Content value="basic">
                  <VStack align="stretch" gap={4}>
                    <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
                      <Field.Root>
                        <Field.Label fontSize="sm" fontWeight="600" color="gray.700">
                          Product Title *
                        </Field.Label>
                        <Input
                          placeholder="Enter product title"
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                      </Field.Root>

                      <Field.Root>
                        <Field.Label fontSize="sm" fontWeight="600" color="gray.700">
                          Subtitle *
                        </Field.Label>
                        <Input
                          placeholder="Enter subtitle"
                          value={formData.subtitle}
                          onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                        />
                      </Field.Root>
                    </Grid>

                    <Field.Root>
                      <Field.Label fontSize="sm" fontWeight="600" color="gray.700">
                        Description *
                      </Field.Label>
                      <Textarea
                        placeholder="Enter product description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={3}
                        resize="vertical"
                      />
                    </Field.Root>

                    <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
                      <Field.Root>
                        <Field.Label fontSize="sm" fontWeight="600" color="gray.700">
                          Product URL *
                        </Field.Label>
                        <Input
                          placeholder="https://example.com"
                          value={formData.url}
                          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                        />
                      </Field.Root>

                      <Field.Root>
                        <Field.Label fontSize="sm" fontWeight="600" color="gray.700">
                          Image URL
                        </Field.Label>
                        <Input
                          placeholder="https://example.com/image.jpg"
                          value={formData.image}
                          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        />
                      </Field.Root>
                    </Grid>

                    {formData.image && (
                      <Box>
                        <Image
                          src={formData.image}
                          alt="Preview"
                          maxW="300px"
                          borderRadius="lg"
                          objectFit="cover"
                        />
                      </Box>
                    )}
                  </VStack>
                </Tabs.Content>

                <Tabs.Content value="details">
                  <VStack align="stretch" gap={4}>
                    <Field.Root>
                      <Field.Label fontSize="sm" fontWeight="600" color="gray.700">
                        Features * (one per line)
                      </Field.Label>
                      <Textarea
                        placeholder="Enter features, one per line"
                        value={featuresInput}
                        onChange={(e) => setFeaturesInput(e.target.value)}
                        rows={6}
                        resize="vertical"
                      />
                      <Text fontSize="xs" color="gray.600" mt={1}>
                        Current count: {featuresInput.split("\n").filter(f => f.trim() !== "").length} features
                      </Text>
                    </Field.Root>

                    <Field.Root>
                      <Field.Label fontSize="sm" fontWeight="600" color="gray.700">
                        Benefits * (one per line)
                      </Field.Label>
                      <Textarea
                        placeholder="Enter benefits, one per line"
                        value={benefitsInput}
                        onChange={(e) => setBenefitsInput(e.target.value)}
                        rows={6}
                        resize="vertical"
                      />
                      <Text fontSize="xs" color="gray.600" mt={1}>
                        Current count: {benefitsInput.split("\n").filter(b => b.trim() !== "").length} benefits
                      </Text>
                    </Field.Root>
                  </VStack>
                </Tabs.Content>

                <Tabs.Content value="design">
                  <VStack align="stretch" gap={4}>
                    <Field.Root>
                      <Field.Label fontSize="sm" fontWeight="600" color="gray.700">
                        Icon
                      </Field.Label>
                      <select
                        value={formData.icon}
                        onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          borderRadius: '6px',
                          border: '1px solid #E2E8F0',
                          fontSize: '14px',
                          backgroundColor: 'white',
                          cursor: 'pointer'
                        }}
                      >
                        <option value="HiSparkles">Sparkles (AI/Innovation)</option>
                        <option value="HiChartBar">Chart Bar (Analytics/ERP)</option>
                      </select>
                    </Field.Root>

                    <Field.Root>
                      <Field.Label fontSize="sm" fontWeight="600" color="gray.700">
                        Gradient (Chakra UI format)
                      </Field.Label>
                      <Input
                        placeholder="linear(135deg, blue.500, cyan.500)"
                        value={formData.gradient}
                        onChange={(e) => setFormData({ ...formData, gradient: e.target.value })}
                      />
                      <Text fontSize="xs" color="gray.600" mt={1}>
                        Examples: linear(135deg, orange.500, red.500) or linear(135deg, purple.500, pink.500)
                      </Text>
                    </Field.Root>
                  </VStack>
                </Tabs.Content>
              </Box>
            </Tabs.Root>

            <HStack gap={3} pt={2}>
              <Button
                colorScheme="blue"
                onClick={handleSave}
              >
                <Icon fontSize="lg" mr={2}>
                  <HiCheck />
                </Icon>
                {isAdding ? "Add Product" : "Save Changes"}
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

      {/* Products List */}
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
              All Products
            </Text>
            <Badge colorScheme="blue" fontSize="sm" px={3} py={1} borderRadius="full">
              {products.length} Total
            </Badge>
          </HStack>
        </Box>

        <Box overflowX="auto">
          <Table.Root size="lg" variant="line">
            <Table.Header>
              <Table.Row bg="gray.50">
                <Table.ColumnHeader>Product</Table.ColumnHeader>
                <Table.ColumnHeader>Subtitle</Table.ColumnHeader>
                <Table.ColumnHeader>URL</Table.ColumnHeader>
                <Table.ColumnHeader>Features</Table.ColumnHeader>
                <Table.ColumnHeader textAlign="center">Actions</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {products.map((product) => {
                const IconComponent = getIconComponent(product.icon)
                return (
                  <Table.Row key={product.id}>
                    <Table.Cell>
                      <HStack gap={3}>
                        <Box
                          p={2}
                          bg={product.gradient || "blue.100"}
                          borderRadius="lg"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Icon fontSize="xl" color="white">
                            <IconComponent />
                          </Icon>
                        </Box>
                        <VStack align="start" gap={0}>
                          <Text fontWeight="600" color="gray.900">
                            {product.title}
                          </Text>
                          <Text fontSize="xs" color="gray.500">
                            ID: {product.id}
                          </Text>
                        </VStack>
                      </HStack>
                    </Table.Cell>
                    <Table.Cell>
                      <Text color="gray.700">{product.subtitle}</Text>
                    </Table.Cell>
                    <Table.Cell>
                      <Text
                        color="blue.600"
                        fontSize="sm"
                        maxW="200px"
                        lineClamp={1}
                        cursor="pointer"
                        _hover={{ textDecoration: "underline" }}
                        onClick={() => window.open(product.url, "_blank")}
                      >
                        {product.url}
                      </Text>
                    </Table.Cell>
                    <Table.Cell>
                      <Badge colorScheme="purple" variant="subtle">
                        {product.features.length} features
                      </Badge>
                    </Table.Cell>
                    <Table.Cell>
                      <HStack justify="center" gap={2}>
                        <Button
                          size="sm"
                          variant="outline"
                          colorScheme="blue"
                          onClick={() => handleEdit(product)}
                        >
                          <Icon fontSize="md">
                            <HiPencil />
                          </Icon>
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          colorScheme="red"
                          onClick={() => handleDelete(product.id)}
                        >
                          <Icon fontSize="md">
                            <HiTrash />
                          </Icon>
                        </Button>
                      </HStack>
                    </Table.Cell>
                  </Table.Row>
                )
              })}
              {products.length === 0 && (
                <Table.Row>
                  <Table.Cell colSpan={5}>
                    <Text textAlign="center" color="gray.500" py={8}>
                      No products yet. Add your first product above.
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
