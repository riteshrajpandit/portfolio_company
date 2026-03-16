import {
  Box,
  Button,
  VStack,
  HStack,
  Text,
  Icon,
  Badge,
  Tabs,
  Card,
  Heading,
} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { HiGlobe, HiPhotograph } from "react-icons/hi"
import { toaster } from "@/components/ui/toaster"
import { apiService, type Site } from "@/services/api"
import { SitesList, SiteEditor, AssetsManager } from "./siteGenerator"

export const SiteGeneratorManagement = () => {
  const [activeTab, setActiveTab] = useState("sites")
  const [sites, setSites] = useState<Site[]>([])
  const [selectedSite, setSelectedSite] = useState<Site | null>(null)
  const [isEditingSite, setIsEditingSite] = useState(false)
  const [isCreatingSite, setIsCreatingSite] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchSites()
  }, [])

  const fetchSites = async () => {
    setLoading(true)
    try {
      const response = await apiService.getSites()
      if (response.success) {
        setSites(response.data)
      }
    } catch (error) {
      console.error("Error fetching sites:", error)
      toaster.create({
        title: "Error",
        description: "Failed to load sites",
        type: "error",
        duration: 3000,
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCreateSite = () => {
    setIsCreatingSite(true)
    setSelectedSite(null)
    setActiveTab("sites")
  }

  const handleEditSite = (site: Site) => {
    setSelectedSite(site)
    setIsEditingSite(true)
    setActiveTab("sites")
  }

  const handleSelectSite = async (site: Site) => {
    try {
      const response = await apiService.getSiteById(site.id!)
      if (response.success) {
        setSelectedSite(response.data)
        setActiveTab("assets")
      }
    } catch (error) {
      console.error("Error fetching site details:", error)
      toaster.create({
        title: "Error",
        description: "Failed to load site details",
        type: "error",
        duration: 3000,
      })
    }
  }

  const handleSiteDeleted = () => {
    fetchSites()
    setSelectedSite(null)
    setIsEditingSite(false)
    setIsCreatingSite(false)
    setActiveTab("sites")
  }

  const handleSiteSaved = () => {
    fetchSites()
    setIsEditingSite(false)
    setIsCreatingSite(false)
  }

  const handleCancelEdit = () => {
    setIsEditingSite(false)
    setIsCreatingSite(false)
    setSelectedSite(null)
  }

  return (
    <VStack gap={6} align="stretch">
      {/* Header */}
      <Card.Root bg="white" p={6} rounded="lg" shadow="md" borderWidth="1px" borderColor="gray.200">
        <HStack justify="space-between" flexWrap="wrap" gap={4}>
          <VStack align="start" gap={1}>
            <Heading size="xl" color="gray.800">
              Site Generator
            </Heading>
            <Text color="neutral.600">Create and manage custom websites with HTML, CSS, and JavaScript</Text>
          </VStack>
          <Button
            colorScheme="blue"
            size="lg"
            onClick={handleCreateSite}
          >
            <Icon as={HiGlobe} />
            Create New Site
          </Button>
        </HStack>

        {/* Selected Site Info */}
        {selectedSite && !isCreatingSite && !isEditingSite && (
          <Box mt={4} p={4} bg="blue.50" borderRadius="md" borderWidth="1px" borderColor="blue.200">
            <HStack justify="space-between">
              <VStack align="start" gap={1}>
                <HStack>
                  <Text fontSize="lg" fontWeight="600" color="gray.800">
                    {selectedSite.title}
                  </Text>
                  {selectedSite.is_published ? (
                    <Badge colorScheme="green">Published</Badge>
                  ) : (
                    <Badge colorScheme="gray">Draft</Badge>
                  )}
                </HStack>
                <Text fontSize="sm" color="gray.600">
                  {selectedSite.description}
                </Text>
                <Text fontSize="xs" color="gray.500">
                  Slug: /{selectedSite.slug}
                </Text>
              </VStack>
              <HStack gap={2}>
                <Button size="sm" variant="outline" onClick={() => handleEditSite(selectedSite)}>
                  Edit Site
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  colorScheme="red"
                  onClick={() => {
                    setSelectedSite(null)
                    setActiveTab("sites")
                  }}
                >
                  Clear Selection
                </Button>
              </HStack>
            </HStack>
          </Box>
        )}
      </Card.Root>

      {/* Main Content */}
      {isCreatingSite || isEditingSite ? (
        <SiteEditor
          site={isEditingSite ? selectedSite : null}
          onSave={handleSiteSaved}
          onCancel={handleCancelEdit}
          onDelete={handleSiteDeleted}
        />
      ) : (
        <Tabs.Root value={activeTab} onValueChange={(e) => setActiveTab(e.value)}>
          <Tabs.List>
            <Tabs.Trigger value="sites">
              <Icon as={HiGlobe} mr={2} />
              All Sites
            </Tabs.Trigger>
            <Tabs.Trigger value="assets" disabled={!selectedSite}>
              <Icon as={HiPhotograph} mr={2} />
              Assets
              {selectedSite?.assets && (
                <Badge ml={2} colorScheme="purple" borderRadius="full">
                  {selectedSite.assets.length}
                </Badge>
              )}
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="sites">
            <SitesList
              sites={sites}
              loading={loading}
              onEdit={handleEditSite}
              onSelect={handleSelectSite}
              onDelete={handleSiteDeleted}
            />
          </Tabs.Content>

          <Tabs.Content value="assets">
            {selectedSite && (
              <AssetsManager
                siteId={selectedSite.id!}
                assets={selectedSite.assets || []}
                onAssetUploaded={async () => {
                  const response = await apiService.getSiteById(selectedSite.id!)
                  if (response.success) {
                    setSelectedSite(response.data)
                  }
                }}
              />
            )}
          </Tabs.Content>
        </Tabs.Root>
      )}
    </VStack>
  )
}
