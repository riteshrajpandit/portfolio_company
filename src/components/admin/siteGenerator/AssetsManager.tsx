import {
  Box,
  Button,
  VStack,
  HStack,
  Text,
  Card,
  Icon,
  Grid,
  Image,
  Input,
  Badge,
} from "@chakra-ui/react"
import { useState, useRef } from "react"
import { HiUpload, HiPhotograph, HiDocumentText, HiClipboardCopy } from "react-icons/hi"
import { toaster } from "@/components/ui/toaster"
import { apiService, type Asset } from "@/services/api"
import { API_BASE_URL } from "@/services/api"

interface AssetsManagerProps {
  siteId: number
  assets: Asset[]
  onAssetUploaded: () => void
}

export const AssetsManager = ({ siteId, assets, onAssetUploaded }: AssetsManagerProps) => {
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)

    try {
      for (const file of Array.from(files)) {
        await apiService.uploadAsset(siteId, file)
      }

      toaster.create({
        title: "Success",
        description: `${files.length} file(s) uploaded successfully`,
        type: "success",
        duration: 3000,
      })

      onAssetUploaded()

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    } catch (error) {
      console.error("Error uploading assets:", error)
      toaster.create({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to upload assets",
        type: "error",
        duration: 3000,
      })
    } finally {
      setUploading(false)
    }
  }

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(`${API_BASE_URL}${url}`)
    toaster.create({
      title: "Copied!",
      description: "Asset URL copied to clipboard",
      type: "success",
      duration: 2000,
    })
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i]
  }

  const getFileIcon = (fileType: string) => {
    if (fileType === "image") return HiPhotograph
    return HiDocumentText
  }

  return (
    <VStack gap={4} align="stretch">
      {/* Upload Section */}
      <Card.Root bg="white" p={6} rounded="lg" shadow="md" borderWidth="1px" borderColor="gray.200">
        <VStack gap={4} align="stretch">
          <HStack justify="space-between">
            <Text fontSize="lg" fontWeight="600" color="gray.800">
              Upload Assets
            </Text>
            <Button
              colorScheme="blue"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              loading={uploading}
            >
              <Icon as={HiUpload} />
              Upload Files
            </Button>
          </HStack>

          <Input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,.pdf,.doc,.docx,.txt"
            onChange={handleFileSelect}
            display="none"
          />

          <Box
            p={8}
            border="2px dashed"
            borderColor="gray.300"
            borderRadius="md"
            textAlign="center"
            cursor="pointer"
            _hover={{ borderColor: "blue.400", bg: "blue.50" }}
            onClick={() => fileInputRef.current?.click()}
          >
            <VStack gap={3}>
              <Icon as={HiUpload} fontSize="4xl" color="gray.400" />
              <Text color="gray.600" fontWeight="500">
                Click to upload or drag and drop
              </Text>
              <Text fontSize="sm" color="gray.500">
                Images, PDFs, documents (Max 10MB)
              </Text>
            </VStack>
          </Box>
        </VStack>
      </Card.Root>

      {/* Assets List */}
      <Card.Root bg="white" p={6} rounded="lg" shadow="md" borderWidth="1px" borderColor="gray.200">
        <VStack gap={4} align="stretch">
          <Text fontSize="lg" fontWeight="600" color="gray.800">
            Uploaded Assets ({assets.length})
          </Text>

          {assets.length === 0 ? (
            <Box p={8} textAlign="center">
              <VStack gap={3}>
                <Icon as={HiPhotograph} fontSize="5xl" color="gray.400" />
                <Text color="gray.600" fontWeight="500">
                  No assets uploaded yet
                </Text>
                <Text fontSize="sm" color="gray.500">
                  Upload images and files to use in your pages
                </Text>
              </VStack>
            </Box>
          ) : (
            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={4}>
              {assets.map((asset) => (
                <Card.Root key={asset.id} borderWidth="1px" borderColor="gray.200" overflow="hidden">
                  <Box position="relative" h="150px" bg="gray.100">
                    {asset.file_type === "image" ? (
                      <Image
                        src={`${API_BASE_URL}${asset.url}`}
                        alt={asset.original_filename}
                        objectFit="cover"
                        w="full"
                        h="full"
                      />
                    ) : (
                      <VStack justify="center" h="full">
                        <Icon as={getFileIcon(asset.file_type)} fontSize="4xl" color="gray.400" />
                      </VStack>
                    )}
                    <Badge
                      position="absolute"
                      top={2}
                      right={2}
                      colorScheme={asset.file_type === "image" ? "green" : "blue"}
                    >
                      {asset.file_type}
                    </Badge>
                  </Box>

                  <Box p={3}>
                    <VStack align="stretch" gap={2}>
                      <Text fontSize="sm" fontWeight="600" color="gray.800" lineClamp={1}>
                        {asset.original_filename}
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        {formatFileSize(asset.file_size)}
                      </Text>
                      <Button
                        size="xs"
                        variant="outline"
                        colorScheme="blue"
                        onClick={() => copyToClipboard(asset.url)}
                      >
                        <Icon as={HiClipboardCopy} />
                        Copy URL
                      </Button>
                    </VStack>
                  </Box>
                </Card.Root>
              ))}
            </Grid>
          )}
        </VStack>
      </Card.Root>

      {/* Usage Instructions */}
      <Card.Root bg="blue.50" p={4} rounded="lg" borderWidth="1px" borderColor="blue.200">
        <VStack align="start" gap={2}>
          <Text fontSize="sm" fontWeight="600" color="blue.800">
            How to use assets in your pages:
          </Text>
          <Text fontSize="sm" color="blue.700">
            • Copy the asset URL using the "Copy URL" button
          </Text>
          <Text fontSize="sm" color="blue.700">
            • In your HTML, use: <code>&lt;img src="ASSET_URL" /&gt;</code>
          </Text>
          <Text fontSize="sm" color="blue.700">
            • In your CSS, use: <code>background-image: url('ASSET_URL');</code>
          </Text>
        </VStack>
      </Card.Root>
    </VStack>
  )
}
