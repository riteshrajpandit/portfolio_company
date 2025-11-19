import { useState } from "react"
import {
  Box,
  Button,
  Input,
  Textarea,
  VStack,
  HStack,
  Text,
  Icon,
  Badge,
  Heading,
  Grid,
  Field,
  Table,
  Tabs,
  Image,
} from "@chakra-ui/react"
import {
  HiTrash,
  HiPencil,
  HiPlus,
  HiLightBulb,
  HiAcademicCap,
  HiCog,
  HiSparkles,
  HiCubeTransparent,
} from "react-icons/hi2"
import { toaster } from "@/components/ui/toaster"

// Define all the nested interfaces matching ServicesPage
interface ProcessPhase {
  phase: string
  description: string
}

interface AIService {
  title: string
  description: string
}

interface Program {
  title: string
  description: string
  duration: string
  participants: string
  format: string
}

interface Service {
  id: string
  title: string
  subtitle: string
  description: string
  icon: string // "HiLightBulb", "HiAcademicCap", etc.
  gradient: string
  image: string
  // Service-specific arrays (optional)
  keyFeatures?: string[]
  technologicalAdaptation?: string[]
  businessBenefits?: string[]
  process?: ProcessPhase[]
  weBring?: string[]
  steps?: string[]
  aiServices?: AIService[]
  weAssure?: string[]
  businessServices?: string[]
  topFeatures?: string[]
  programs?: Program[]
  features?: string[]
  outcomes?: string[]
}

// Icon mapping function
const getIconComponent = (iconName: string) => {
  const iconMap: Record<string, React.ElementType> = {
    HiLightBulb,
    HiAcademicCap,
    HiCog,
    HiSparkles,
    HiCubeTransparent,
  }
  return iconMap[iconName] || HiLightBulb
}

const ServicesManagement = () => {
  // Pre-populate with existing services from ServicesPage
  const [services, setServices] = useState<Service[]>([
    {
      id: "custom-software",
      title: "Custom Software Built for Your Business Needs",
      subtitle: "Custom AI Leveraged Software Development",
      description: "Innovative AI and software solutions tailored to your unique business challenges, enhance operational efficiency, and drive your digital transformation journey.",
      icon: "HiLightBulb",
      gradient: "linear(135deg, blue.500, indigo.600)",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop&auto=format",
      keyFeatures: [
        "Custom Software Development",
        "SaaS Product Development",
        "Mobile App Development",
        "CI/CD & Automation",
        "API Development & Integration",
        "Agile Product Development",
        "Cross-Platform & Native Mobile Apps",
        "Data-Driven Decision Systems"
      ],
      technologicalAdaptation: [
        "Machine Learning Models",
        "Natural Language Processing",
        "Computer Vision & Image Recognition"
      ],
      businessBenefits: [
        "Your solution for your problems",
        "Reduce operational costs",
        "Improve accuracy and consistency",
        "Improve operational visibility"
      ],
      process: [
        { phase: "Discovery", description: "Understanding your requirements and challenges" },
        { phase: "Design", description: "Creating user-centered solutions and architecture" },
        { phase: "Development", description: "Building with modern technologies and best practices" },
        { phase: "Deployment", description: "Smooth launch with comprehensive testing" },
        { phase: "Support", description: "Ongoing maintenance and enhancement" }
      ]
    },
    {
      id: "ai-strategy",
      title: "Enterprise AI Use Case Consulting and AI Transformation Consultancy",
      subtitle: "AI Strategy Consultancy",
      description: "We help you harness the full potential of AI and ML to scale, automate and forecast events through development of comprehensive AI roadmap and implementation strategy tailored to your business objectives.",
      icon: "HiSparkles",
      gradient: "linear(135deg, emerald.500, teal.600)",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&auto=format",
      weBring: [
        "Industry Expertise & Best Practices",
        "Cutting-Edge AI/ML Technology",
        "Proven Implementation Framework",
        "ROI-Focused Approach",
        "End-to-End Support"
      ],
      steps: [
        "Discovery & Assessment",
        "AI Readiness Evaluation",
        "Strategy Development",
        "Roadmap Creation",
        "Implementation Support",
        "Continuous Optimization"
      ],
      aiServices: [
        {
          title: "AI Strategy Consulting",
          description: "Identify the right opportunities and create a roadmap to implement AI effectively across your business."
        },
        {
          title: "Machine Learning Model Development",
          description: "Design, train, and deploy supervised, unsupervised, and reinforcement learning models."
        }
      ]
    },
    {
      id: "it-consulting",
      title: "Leverage IT as a Business Success Tool",
      subtitle: "IT Consultancy",
      description: "Our expertise will help you convert IT as your business success tool. We facilitate and integrate IT as a Business Success Tool to your Business Operation in an internationally accepted Practice.",
      icon: "HiCog",
      gradient: "linear(135deg, purple.500, pink.600)",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&auto=format",
      weAssure: [
        "Strategic IT Planning & Governance",
        "Technology Infrastructure Optimization",
        "Digital Transformation Roadmap",
        "IT Risk Management & Compliance"
      ],
      businessServices: [
        "IT Strategy & Planning",
        "Technology Assessment",
        "Infrastructure Modernization",
        "Cloud Migration & Management",
        "Cybersecurity Consulting"
      ]
    },
    {
      id: "blockchain",
      title: "Web3 and Blockchain Development",
      subtitle: "Web3 and Blockchain",
      description: "We streamline blockchain for enterprise by providing secure, scalable, ROI-driven, and future-ready solutions that effectively and transparently address actual business problems. We help you gain control on seamless integration and efficient processes for sustained success.",
      icon: "HiCubeTransparent",
      gradient: "linear(135deg, orange.500, red.600)",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop&auto=format",
      topFeatures: [
        "Smart Contract Development",
        "Decentralized Application (DApp) Development",
        "Blockchain Integration Services",
        "NFT Platform Development",
        "Cryptocurrency Wallet Development",
        "Blockchain Consulting & Strategy",
        "Private & Public Blockchain Solutions"
      ]
    },
    {
      id: "workshop-training",
      title: "Professional Development Through Tailored Workshops and Trainings",
      subtitle: "Empower Your HR",
      description: "Empower your team with cutting-edge skills and knowledge through our comprehensive training programs and hands-on workshops designed for modern business needs.",
      icon: "HiAcademicCap",
      gradient: "linear(135deg, blue.500, cyan.600)",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=600&fit=crop&auto=format",
      features: [
        "Customized curriculum for your industry",
        "Expert instructors with real-world experience",
        "Hands-on practical exercises",
        "Post-training support and resources",
        "Certification upon completion",
        "Flexible delivery options"
      ],
      outcomes: [
        "Increased team productivity and efficiency",
        "Improved technology adoption rates",
        "Enhanced problem-solving capabilities",
        "Better cross-team collaboration"
      ]
    }
  ])

  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  // Form state
  const [formData, setFormData] = useState<Partial<Service>>({
    id: "",
    title: "",
    subtitle: "",
    description: "",
    icon: "HiLightBulb",
    gradient: "",
    image: "",
  })

  // Additional fields as text inputs (one per line)
  const [keyFeaturesInput, setKeyFeaturesInput] = useState("")
  const [technologicalAdaptationInput, setTechnologicalAdaptationInput] = useState("")
  const [businessBenefitsInput, setBusinessBenefitsInput] = useState("")
  const [weBringInput, setWeBringInput] = useState("")
  const [stepsInput, setStepsInput] = useState("")
  const [weAssureInput, setWeAssureInput] = useState("")
  const [businessServicesInput, setBusinessServicesInput] = useState("")
  const [topFeaturesInput, setTopFeaturesInput] = useState("")
  const [featuresInput, setFeaturesInput] = useState("")
  const [outcomesInput, setOutcomesInput] = useState("")

  const handleAdd = () => {
    setIsAdding(true)
    setEditingId(null)
    setFormData({
      id: "",
      title: "",
      subtitle: "",
      description: "",
      icon: "HiLightBulb",
      gradient: "",
      image: "",
    })
    setKeyFeaturesInput("")
    setTechnologicalAdaptationInput("")
    setBusinessBenefitsInput("")
    setWeBringInput("")
    setStepsInput("")
    setWeAssureInput("")
    setBusinessServicesInput("")
    setTopFeaturesInput("")
    setFeaturesInput("")
    setOutcomesInput("")
  }

  const handleEdit = (service: Service) => {
    setEditingId(service.id)
    setIsAdding(false)
    setFormData(service)
    
    // Populate textarea inputs
    setKeyFeaturesInput(service.keyFeatures?.join("\n") || "")
    setTechnologicalAdaptationInput(service.technologicalAdaptation?.join("\n") || "")
    setBusinessBenefitsInput(service.businessBenefits?.join("\n") || "")
    setWeBringInput(service.weBring?.join("\n") || "")
    setStepsInput(service.steps?.join("\n") || "")
    setWeAssureInput(service.weAssure?.join("\n") || "")
    setBusinessServicesInput(service.businessServices?.join("\n") || "")
    setTopFeaturesInput(service.topFeatures?.join("\n") || "")
    setFeaturesInput(service.features?.join("\n") || "")
    setOutcomesInput(service.outcomes?.join("\n") || "")
  }

  const handleSave = () => {
    // Validation
    if (!formData.title || !formData.subtitle || !formData.description || !formData.image || !formData.gradient) {
      toaster.create({
        title: "Validation Error",
        description: "Please fill in all required fields (title, subtitle, description, image, gradient)",
        type: "error",
      })
      return
    }

    // Parse array inputs
    const newService: Service = {
      id: formData.id || formData.title.toLowerCase().replace(/\s+/g, "-"),
      title: formData.title,
      subtitle: formData.subtitle,
      description: formData.description,
      icon: formData.icon || "HiLightBulb",
      gradient: formData.gradient,
      image: formData.image,
    }

    // Add optional arrays if provided
    if (keyFeaturesInput.trim()) {
      newService.keyFeatures = keyFeaturesInput.split("\n").filter(line => line.trim())
    }
    if (technologicalAdaptationInput.trim()) {
      newService.technologicalAdaptation = technologicalAdaptationInput.split("\n").filter(line => line.trim())
    }
    if (businessBenefitsInput.trim()) {
      newService.businessBenefits = businessBenefitsInput.split("\n").filter(line => line.trim())
    }
    if (weBringInput.trim()) {
      newService.weBring = weBringInput.split("\n").filter(line => line.trim())
    }
    if (stepsInput.trim()) {
      newService.steps = stepsInput.split("\n").filter(line => line.trim())
    }
    if (weAssureInput.trim()) {
      newService.weAssure = weAssureInput.split("\n").filter(line => line.trim())
    }
    if (businessServicesInput.trim()) {
      newService.businessServices = businessServicesInput.split("\n").filter(line => line.trim())
    }
    if (topFeaturesInput.trim()) {
      newService.topFeatures = topFeaturesInput.split("\n").filter(line => line.trim())
    }
    if (featuresInput.trim()) {
      newService.features = featuresInput.split("\n").filter(line => line.trim())
    }
    if (outcomesInput.trim()) {
      newService.outcomes = outcomesInput.split("\n").filter(line => line.trim())
    }

    if (editingId) {
      // Update existing
      setServices(services.map(s => s.id === editingId ? newService : s))
      toaster.create({
        title: "Service Updated",
        description: "Service has been updated successfully",
        type: "success",
      })
    } else {
      // Add new
      setServices([...services, newService])
      toaster.create({
        title: "Service Added",
        description: "New service has been added successfully",
        type: "success",
      })
    }

    handleCancel()
  }

  const confirmDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this service? This action cannot be undone.")) {
      handleDelete(id)
    }
  }

  const handleDelete = (id: string) => {
    setServices(services.filter(s => s.id !== id))
    toaster.create({
      title: "Service Deleted",
      description: "Service has been removed successfully",
      type: "success",
    })
  }

  const handleCancel = () => {
    setIsAdding(false)
    setEditingId(null)
    setFormData({
      id: "",
      title: "",
      subtitle: "",
      description: "",
      icon: "HiLightBulb",
      gradient: "",
      image: "",
    })
    setKeyFeaturesInput("")
    setTechnologicalAdaptationInput("")
    setBusinessBenefitsInput("")
    setWeBringInput("")
    setStepsInput("")
    setWeAssureInput("")
    setBusinessServicesInput("")
    setTopFeaturesInput("")
    setFeaturesInput("")
    setOutcomesInput("")
  }

  return (
    <Box>
      {/* Add/Edit Form */}
      {(isAdding || editingId) && (
        <Box mb={8} p={6} bg="neutral.50" borderRadius="xl" borderWidth="1px">
          <Heading size="lg" mb={6}>
            {editingId ? "Edit Service" : "Add New Service"}
          </Heading>

          <Tabs.Root defaultValue="basic" variant="enclosed">
            <Tabs.List mb={4}>
              <Tabs.Trigger value="basic">Basic Info</Tabs.Trigger>
              <Tabs.Trigger value="features">Features & Lists</Tabs.Trigger>
              <Tabs.Trigger value="design">Design & Styling</Tabs.Trigger>
            </Tabs.List>

            {/* Tab 1: Basic Info */}
            <Tabs.Content value="basic">
              <VStack gap={4} align="stretch">
                <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
                  <Field.Root>
                    <Field.Label>Title *</Field.Label>
                    <Input
                      value={formData.title || ""}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g., Custom Software Built for Your Business Needs"
                    />
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>Subtitle *</Field.Label>
                    <Input
                      value={formData.subtitle || ""}
                      onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                      placeholder="e.g., Custom AI Leveraged Software Development"
                    />
                  </Field.Root>
                </Grid>

                <Field.Root>
                  <Field.Label>Description *</Field.Label>
                  <Textarea
                    value={formData.description || ""}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Comprehensive description of the service..."
                    rows={4}
                  />
                </Field.Root>

                <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
                  <Field.Root>
                    <Field.Label>Service ID</Field.Label>
                    <Input
                      value={formData.id || ""}
                      onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                      placeholder="Auto-generated from title"
                    />
                    <Field.HelperText>Leave blank to auto-generate</Field.HelperText>
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>Image URL *</Field.Label>
                    <Input
                      value={formData.image || ""}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="https://images.unsplash.com/..."
                    />
                  </Field.Root>
                </Grid>

                {formData.image && (
                  <Box>
                    <Text fontSize="sm" fontWeight="500" mb={2}>Image Preview:</Text>
                    <Image
                      src={formData.image}
                      alt="Preview"
                      maxH="200px"
                      borderRadius="md"
                      objectFit="cover"
                    />
                  </Box>
                )}
              </VStack>
            </Tabs.Content>

            {/* Tab 2: Features & Lists */}
            <Tabs.Content value="features">
              <VStack gap={4} align="stretch">
                <Text fontSize="sm" color="muted" mb={2}>
                  Enter each item on a new line. These fields are optional and service-specific.
                </Text>

                <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
                  <Field.Root>
                    <Field.Label>Key Features</Field.Label>
                    <Textarea
                      value={keyFeaturesInput}
                      onChange={(e) => setKeyFeaturesInput(e.target.value)}
                      placeholder="Custom Software Development&#10;SaaS Product Development&#10;Mobile App Development"
                      rows={6}
                    />
                    <Field.HelperText>
                      {keyFeaturesInput.split("\n").filter(l => l.trim()).length} items
                    </Field.HelperText>
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>Technological Adaptation</Field.Label>
                    <Textarea
                      value={technologicalAdaptationInput}
                      onChange={(e) => setTechnologicalAdaptationInput(e.target.value)}
                      placeholder="Machine Learning Models&#10;Natural Language Processing&#10;Computer Vision"
                      rows={6}
                    />
                    <Field.HelperText>
                      {technologicalAdaptationInput.split("\n").filter(l => l.trim()).length} items
                    </Field.HelperText>
                  </Field.Root>
                </Grid>

                <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
                  <Field.Root>
                    <Field.Label>Business Benefits</Field.Label>
                    <Textarea
                      value={businessBenefitsInput}
                      onChange={(e) => setBusinessBenefitsInput(e.target.value)}
                      placeholder="Reduce operational costs&#10;Improve accuracy&#10;Better visibility"
                      rows={5}
                    />
                    <Field.HelperText>
                      {businessBenefitsInput.split("\n").filter(l => l.trim()).length} items
                    </Field.HelperText>
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>We Bring</Field.Label>
                    <Textarea
                      value={weBringInput}
                      onChange={(e) => setWeBringInput(e.target.value)}
                      placeholder="Industry Expertise&#10;Best Practices&#10;Proven Framework"
                      rows={5}
                    />
                    <Field.HelperText>
                      {weBringInput.split("\n").filter(l => l.trim()).length} items
                    </Field.HelperText>
                  </Field.Root>
                </Grid>

                <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
                  <Field.Root>
                    <Field.Label>Steps</Field.Label>
                    <Textarea
                      value={stepsInput}
                      onChange={(e) => setStepsInput(e.target.value)}
                      placeholder="Discovery & Assessment&#10;Strategy Development&#10;Implementation"
                      rows={5}
                    />
                    <Field.HelperText>
                      {stepsInput.split("\n").filter(l => l.trim()).length} items
                    </Field.HelperText>
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>We Assure</Field.Label>
                    <Textarea
                      value={weAssureInput}
                      onChange={(e) => setWeAssureInput(e.target.value)}
                      placeholder="Strategic IT Planning&#10;Infrastructure Optimization&#10;Digital Transformation"
                      rows={5}
                    />
                    <Field.HelperText>
                      {weAssureInput.split("\n").filter(l => l.trim()).length} items
                    </Field.HelperText>
                  </Field.Root>
                </Grid>

                <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
                  <Field.Root>
                    <Field.Label>Business Services</Field.Label>
                    <Textarea
                      value={businessServicesInput}
                      onChange={(e) => setBusinessServicesInput(e.target.value)}
                      placeholder="IT Strategy & Planning&#10;Technology Assessment&#10;Cloud Migration"
                      rows={5}
                    />
                    <Field.HelperText>
                      {businessServicesInput.split("\n").filter(l => l.trim()).length} items
                    </Field.HelperText>
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>Top Features</Field.Label>
                    <Textarea
                      value={topFeaturesInput}
                      onChange={(e) => setTopFeaturesInput(e.target.value)}
                      placeholder="Smart Contract Development&#10;DApp Development&#10;NFT Platform"
                      rows={5}
                    />
                    <Field.HelperText>
                      {topFeaturesInput.split("\n").filter(l => l.trim()).length} items
                    </Field.HelperText>
                  </Field.Root>
                </Grid>

                <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
                  <Field.Root>
                    <Field.Label>Features (Training)</Field.Label>
                    <Textarea
                      value={featuresInput}
                      onChange={(e) => setFeaturesInput(e.target.value)}
                      placeholder="Customized curriculum&#10;Expert instructors&#10;Hands-on exercises"
                      rows={5}
                    />
                    <Field.HelperText>
                      {featuresInput.split("\n").filter(l => l.trim()).length} items
                    </Field.HelperText>
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>Outcomes</Field.Label>
                    <Textarea
                      value={outcomesInput}
                      onChange={(e) => setOutcomesInput(e.target.value)}
                      placeholder="Increased productivity&#10;Improved adoption rates&#10;Better collaboration"
                      rows={5}
                    />
                    <Field.HelperText>
                      {outcomesInput.split("\n").filter(l => l.trim()).length} items
                    </Field.HelperText>
                  </Field.Root>
                </Grid>
              </VStack>
            </Tabs.Content>

            {/* Tab 3: Design & Styling */}
            <Tabs.Content value="design">
              <VStack gap={4} align="stretch">
                <Field.Root>
                  <Field.Label>Icon *</Field.Label>
                  <select
                    value={formData.icon || "HiLightBulb"}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    style={{
                      padding: '8px',
                      borderWidth: '1px',
                      borderRadius: '6px',
                      backgroundColor: 'white',
                      width: '100%'
                    }}
                  >
                    <option value="HiLightBulb">HiLightBulb (Software/Innovation)</option>
                    <option value="HiSparkles">HiSparkles (AI/Technology)</option>
                    <option value="HiCog">HiCog (IT/Consulting)</option>
                    <option value="HiCubeTransparent">HiCubeTransparent (Blockchain)</option>
                    <option value="HiAcademicCap">HiAcademicCap (Training/Education)</option>
                  </select>
                  <Field.HelperText>Choose an icon that represents the service</Field.HelperText>
                </Field.Root>

                <Field.Root>
                  <Field.Label>Gradient *</Field.Label>
                  <Input
                    value={formData.gradient || ""}
                    onChange={(e) => setFormData({ ...formData, gradient: e.target.value })}
                    placeholder="linear(135deg, blue.500, indigo.600)"
                  />
                  <Field.HelperText>
                    Chakra UI gradient format. Examples: linear(135deg, blue.500, indigo.600), linear(135deg, emerald.500, teal.600), linear(135deg, orange.500, red.600)
                  </Field.HelperText>
                </Field.Root>

                {formData.gradient && formData.icon && (
                  <Box>
                    <Text fontSize="sm" fontWeight="500" mb={2}>Icon Preview:</Text>
                    <Box
                      p={4}
                      bg={formData.gradient}
                      borderRadius="xl"
                      display="inline-block"
                      color="white"
                      fontSize="2xl"
                    >
                      <Icon as={getIconComponent(formData.icon)} />
                    </Box>
                  </Box>
                )}
              </VStack>
            </Tabs.Content>
          </Tabs.Root>

          <HStack gap={3} mt={6}>
            <Button colorScheme="blue" onClick={handleSave}>
              {editingId ? "Update Service" : "Add Service"}
            </Button>
            <Button variant="ghost" onClick={handleCancel}>
              Cancel
            </Button>
          </HStack>
        </Box>
      )}

      {/* Services List */}
      {!isAdding && !editingId && (
        <Box>
          <Box display="flex" justifyContent="flex-end" mb={4}>
            <Button
              colorScheme="blue"
              onClick={handleAdd}
            >
              <HiPlus /> Add New Service
            </Button>
          </Box>

          <Box overflowX="auto" borderWidth="1px" borderRadius="lg">
            <Table.Root size="sm" variant="outline">
              <Table.Header>
                <Table.Row bg="neutral.50">
                  <Table.ColumnHeader>Service</Table.ColumnHeader>
                  <Table.ColumnHeader>Subtitle</Table.ColumnHeader>
                  <Table.ColumnHeader>Description</Table.ColumnHeader>
                  <Table.ColumnHeader>Features Count</Table.ColumnHeader>
                  <Table.ColumnHeader textAlign="right">Actions</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {services.length === 0 ? (
                  <Table.Row>
                    <Table.Cell colSpan={5}>
                      <Text textAlign="center" color="muted" py={4}>
                        No services yet. Add your first service!
                      </Text>
                    </Table.Cell>
                  </Table.Row>
                ) : (
                  services.map((service) => {
                    const IconComponent = getIconComponent(service.icon)
                    const totalFeatures = 
                      (service.keyFeatures?.length || 0) +
                      (service.technologicalAdaptation?.length || 0) +
                      (service.businessBenefits?.length || 0) +
                      (service.weBring?.length || 0) +
                      (service.steps?.length || 0) +
                      (service.weAssure?.length || 0) +
                      (service.businessServices?.length || 0) +
                      (service.topFeatures?.length || 0) +
                      (service.features?.length || 0) +
                      (service.outcomes?.length || 0)

                    return (
                      <Table.Row key={service.id}>
                        <Table.Cell>
                          <HStack gap={3}>
                            <Box
                              p={2}
                              bg="blue.500"
                              borderRadius="md"
                              color="white"
                              fontSize="lg"
                              flexShrink={0}
                            >
                              <Icon as={IconComponent} />
                            </Box>
                            <VStack align="start" gap={0}>
                              <Text fontWeight="600" fontSize="sm">
                                {service.title}
                              </Text>
                              <Text fontSize="xs" color="muted">
                                ID: {service.id}
                              </Text>
                            </VStack>
                          </HStack>
                        </Table.Cell>
                        <Table.Cell maxW="200px">
                          <Text fontSize="sm" lineClamp={2}>
                            {service.subtitle}
                          </Text>
                        </Table.Cell>
                        <Table.Cell maxW="300px">
                          <Text fontSize="sm" color="muted" lineClamp={2}>
                            {service.description}
                          </Text>
                        </Table.Cell>
                        <Table.Cell>
                          <Badge colorScheme={totalFeatures > 0 ? "blue" : "gray"}>
                            {totalFeatures} features
                          </Badge>
                        </Table.Cell>
                        <Table.Cell textAlign="right">
                          <HStack gap={2} justify="flex-end">
                            <Button
                              size="sm"
                              variant="ghost"
                              colorScheme="blue"
                              onClick={() => handleEdit(service)}
                            >
                              <HiPencil />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              colorScheme="red"
                              onClick={() => confirmDelete(service.id)}
                            >
                              <HiTrash />
                            </Button>
                          </HStack>
                        </Table.Cell>
                      </Table.Row>
                    )
                  })
                )}
              </Table.Body>
            </Table.Root>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export { ServicesManagement }
