import {
  Box,
  Button,
  VStack,
  HStack,
  Text,
  Card,
  Icon,
  Badge,
  Table,
} from "@chakra-ui/react"
import { HiPencil, HiTrash, HiGlobe, HiExternalLink } from "react-icons/hi"
import { toaster } from "@/components/ui/toaster"
import { apiService, type Site } from "@/services/api"
import { API_BASE_URL } from "@/services/api"

interface SitesListProps {
  sites: Site[]
  loading: boolean
  onEdit: (site: Site) => void
  onSelect: (site: Site) => void
  onDelete: () => void
}

export const SitesList = ({ sites, loading, onEdit, onSelect, onDelete }: SitesListProps) => {
  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}" and all its pages?`)) return

    try {
      await apiService.deleteSite(id)
      toaster.create({
        title: "Success",
        description: `Site "${title}" deleted successfully`,
        type: "success",
        duration: 3000,
      })
      onDelete()
    } catch (error) {
      console.error("Error deleting site:", error)
      toaster.create({
        title: "Error",
        description: "Failed to delete site",
        type: "error",
        duration: 3000,
      })
    }
  }

  const handlePublishToggle = async (site: Site) => {
    try {
      const response = await apiService.updateSite(site.id!, {
        is_published: !site.is_published,
      })

      if (response.success) {
        toaster.create({
          title: "Success",
          description: `Site ${response.data.is_published ? "published" : "unpublished"} successfully`,
          type: "success",
          duration: 3000,
        })
        onDelete() // Refresh the list
      }
    } catch (error) {
      console.error("Error updating site:", error)
      toaster.create({
        title: "Error",
        description: "Failed to update site status",
        type: "error",
        duration: 3000,
      })
    }
  }

  if (loading) {
    return (
      <Card.Root bg="white" p={6} rounded="lg" shadow="md" borderWidth="1px" borderColor="gray.200">
        <Text textAlign="center" color="gray.600">
          Loading sites...
        </Text>
      </Card.Root>
    )
  }

  if (sites.length === 0) {
    return (
      <Card.Root bg="white" p={12} rounded="lg" shadow="md" borderWidth="1px" borderColor="gray.200">
        <VStack gap={4}>
          <Icon as={HiGlobe} fontSize="6xl" color="gray.400" />
          <Text fontSize="xl" fontWeight="600" color="gray.600">
            No sites yet
          </Text>
          <Text color="gray.500" textAlign="center">
            Create your first custom website to get started
          </Text>
        </VStack>
      </Card.Root>
    )
  }

  return (
    <Card.Root bg="white" rounded="lg" shadow="md" borderWidth="1px" borderColor="gray.200" overflow="hidden">
      <Box overflowX="auto">
        <Table.Root>
          <Table.Header>
            <Table.Row bg="gray.50">
              <Table.ColumnHeader fontWeight="600" color="gray.700">
                Site
              </Table.ColumnHeader>
              <Table.ColumnHeader fontWeight="600" color="gray.700">
                Status
              </Table.ColumnHeader>
              <Table.ColumnHeader fontWeight="600" color="gray.700">
                URL
              </Table.ColumnHeader>
              <Table.ColumnHeader fontWeight="600" color="gray.700" textAlign="right">
                Actions
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {sites.map((site) => (
              <Table.Row key={site.id} _hover={{ bg: "gray.50" }} cursor="pointer">
                <Table.Cell onClick={() => onSelect(site)}>
                  <VStack align="start" gap={1}>
                    <Text fontWeight="600" color="gray.800">
                      {site.title}
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      {site.description}
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      /{site.slug}
                    </Text>
                  </VStack>
                </Table.Cell>
                <Table.Cell onClick={() => onSelect(site)}>
                  <VStack align="start" gap={1}>
                    {site.is_published ? (
                      <Badge colorScheme="green">Published</Badge>
                    ) : (
                      <Badge colorScheme="gray">Draft</Badge>
                    )}
                    {site.is_public && <Badge colorScheme="blue">Public</Badge>}
                  </VStack>
                </Table.Cell>
                <Table.Cell onClick={() => onSelect(site)}>
                  {site.is_published && (
                    <HStack gap={1}>
                      <Icon as={HiExternalLink} color="blue.500" fontSize="sm" />
                      <Text
                        fontSize="sm"
                        color="blue.500"
                        _hover={{ textDecoration: "underline" }}
                        onClick={(e) => {
                          e.stopPropagation()
                          window.open(`${API_BASE_URL}${site.url}`, "_blank")
                        }}
                      >
                        {site.url}
                      </Text>
                    </HStack>
                  )}
                </Table.Cell>
                <Table.Cell>
                  <HStack gap={2} justify="flex-end">
                    <Button
                      size="sm"
                      variant="ghost"
                      colorScheme={site.is_published ? "gray" : "green"}
                      onClick={(e) => {
                        e.stopPropagation()
                        handlePublishToggle(site)
                      }}
                    >
                      {site.is_published ? "Unpublish" : "Publish"}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      colorScheme="blue"
                      onClick={(e) => {
                        e.stopPropagation()
                        onEdit(site)
                      }}
                    >
                      <Icon as={HiPencil} />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      colorScheme="red"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDelete(site.id!, site.title)
                      }}
                    >
                      <Icon as={HiTrash} />
                    </Button>
                  </HStack>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
    </Card.Root>
  )
}
