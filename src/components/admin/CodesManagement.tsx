import {
  Box,
  Button,
  VStack,
  HStack,
  Text,
  Table,
  Badge,
  Heading,
  Spinner,
} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { HiRefresh, HiPlus } from "react-icons/hi"
import { toaster } from "@/components/ui/toaster"
import { apiService } from "@/services/api"
import type { Code } from "@/services/api"

export const CodesManagement = () => {
  const [codes, setCodes] = useState<Code[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  const fetchCodes = async () => {
    setIsLoading(true)
    try {
      const response = await apiService.getCodes()
      if (response.success) {
        setCodes(response.data)
      } else {
        toaster.create({
          title: "Error fetching codes",
          description: response.message,
          type: "error",
        })
      }
    } catch (error) {
      toaster.create({
        title: "Error fetching codes",
        description: "An unexpected error occurred",
        type: "error",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGenerateCodes = async () => {
    setIsGenerating(true)
    try {
      const response = await apiService.generateCodes()
      if (response.success) {
        toaster.create({
          title: "Codes generated",
          description: "100 new codes have been generated successfully",
          type: "success",
        })
        fetchCodes()
      } else {
        toaster.create({
          title: "Generation failed",
          description: response.message,
          type: "error",
        })
      }
    } catch (error) {
      toaster.create({
        title: "Generation failed",
        description: "An unexpected error occurred",
        type: "error",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  useEffect(() => {
    fetchCodes()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "green"
      case "Expired":
        return "red"
      default:
        return "gray"
    }
  }

  return (
    <Box>
      <HStack justify="space-between" mb={6}>
        <VStack align="start" gap={0}>
          <Heading size="lg" color="neutral.900">
            Access Codes
          </Heading>
          <Text color="neutral.600">
            Manage and monitor access codes
          </Text>
        </VStack>
        <HStack>
          <Button
            variant="outline"
            onClick={fetchCodes}
            disabled={isLoading}
          >
            <HiRefresh /> Refresh
          </Button>
          <Button
            colorPalette="primary"
            onClick={handleGenerateCodes}
            loading={isGenerating}
            disabled={isLoading}
          >
            <HiPlus /> Generate Codes
          </Button>
        </HStack>
      </HStack>

      {isLoading ? (
        <Box display="flex" justifyContent="center" py={10}>
          <Spinner size="xl" color="primary.500" />
        </Box>
      ) : (
        <Box
          bg="white"
          borderRadius="xl"
          border="1px solid"
          borderColor="neutral.200"
          overflow="hidden"
        >
          <Table.Root>
            <Table.Header bg="neutral.50">
              <Table.Row>
                <Table.ColumnHeader>Code</Table.ColumnHeader>
                <Table.ColumnHeader>Status</Table.ColumnHeader>
                <Table.ColumnHeader>Created At</Table.ColumnHeader>
                <Table.ColumnHeader>Used At</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {codes.length === 0 ? (
                <Table.Row>
                  <Table.Cell colSpan={4} textAlign="center" py={8}>
                    <Text color="neutral.500">No codes found. Generate some!</Text>
                  </Table.Cell>
                </Table.Row>
              ) : (
                codes.map((code) => (
                  <Table.Row key={code.id}>
                    <Table.Cell fontWeight="medium">{code.code}</Table.Cell>
                    <Table.Cell>
                      <Badge colorPalette={getStatusColor(code.status)}>
                        {code.status}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell>
                      {new Date(code.created_at).toLocaleDateString()} {new Date(code.created_at).toLocaleTimeString()}
                    </Table.Cell>
                    <Table.Cell>
                      {code.used_at ? (
                        <>
                          {new Date(code.used_at).toLocaleDateString()} {new Date(code.used_at).toLocaleTimeString()}
                        </>
                      ) : (
                        "-"
                      )}
                    </Table.Cell>
                  </Table.Row>
                ))
              )}
            </Table.Body>
          </Table.Root>
        </Box>
      )}
    </Box>
  )
}
