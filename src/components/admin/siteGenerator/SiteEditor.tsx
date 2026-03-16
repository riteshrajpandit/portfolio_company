import {
  Box,
  Button,
  VStack,
  HStack,
  Text,
  Input,
  Textarea,
  Card,
  Icon,
  Tabs,
} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { HiSave, HiX, HiTrash, HiEye, HiCode } from "react-icons/hi"
import { toaster } from "@/components/ui/toaster"
import { Field } from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"
import { apiService, type Site, type SiteCreateData, type SiteUpdateData } from "@/services/api"

interface SiteEditorProps {
  site: Site | null
  onSave: () => void
  onCancel: () => void
  onDelete: () => void
}

export const SiteEditor = ({ site, onSave, onCancel, onDelete }: SiteEditorProps) => {
  const [formData, setFormData] = useState<SiteCreateData>({
    slug: "",
    title: "",
    description: "",
    is_public: true,
    is_published: false,
    html_content: "<h1>Welcome!</h1>\n<p>Start building your site here.</p>",
    css_content: "body {\n  font-family: Arial, sans-serif;\n  margin: 0;\n  padding: 2rem;\n}\n\nh1 {\n  color: #2c3e50;\n}",
    js_content: "console.log('Site loaded');",
  })
  const [saving, setSaving] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)

  useEffect(() => {
    if (site) {
      setFormData({
        slug: site.slug,
        title: site.title,
        description: site.description,
        is_public: site.is_public,
        is_published: site.is_published,
        html_content: site.html_content || "",
        css_content: site.css_content || "",
        js_content: site.js_content || "",
      })
    }
  }, [site])

  const handleSubmit = async () => {
    if (!formData.title || !formData.slug) {
      toaster.create({
        title: "Validation Error",
        description: "Title and slug are required",
        type: "error",
        duration: 3000,
      })
      return
    }

    setSaving(true)

    try {
      if (site) {
        const updateData: SiteUpdateData = {
          title: formData.title,
          description: formData.description,
          is_public: formData.is_public,
          is_published: formData.is_published,
          html_content: formData.html_content,
          css_content: formData.css_content,
          js_content: formData.js_content,
        }
        const response = await apiService.updateSite(site.id!, updateData)
        if (response.success) {
          toaster.create({
            title: "Success",
            description: "Site updated successfully",
            type: "success",
            duration: 3000,
          })
          onSave()
        }
      } else {
        const response = await apiService.createSite(formData)
        if (response.success) {
          toaster.create({
            title: "Success",
            description: "Site created successfully",
            type: "success",
            duration: 3000,
          })
          onSave()
        }
      }
    } catch (error) {
      console.error("Error saving site:", error)
      toaster.create({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save site",
        type: "error",
        duration: 3000,
      })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!site) return
    if (!confirm(`Are you sure you want to delete "${site.title}" and all its assets?`)) return

    try {
      await apiService.deleteSite(site.id!)
      toaster.create({
        title: "Success",
        description: "Site deleted successfully",
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

  const renderPreview = () => (
    <Box
      w="full"
      h="600px"
      border="1px solid"
      borderColor="gray.300"
      borderRadius="md"
      overflow="hidden"
      bg="white"
    >
      <iframe
        srcDoc={`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${formData.title}</title>
  <style>${formData.css_content}</style>
</head>
<body>
  ${formData.html_content}
  <script>${formData.js_content}</script>
</body>
</html>`}
        style={{ width: "100%", height: "100%", border: "none" }}
        title="Site Preview"
      />
    </Box>
  )

  return (
    <Card.Root bg="white" p={6} rounded="lg" shadow="md" borderWidth="1px" borderColor="gray.200">
      <VStack gap={6} align="stretch">
        {/* Header */}
        <HStack justify="space-between" flexWrap="wrap" gap={2}>
          <Text fontSize="xl" fontWeight="600" color="gray.800">
            {site ? "Edit Site" : "Create New Site"}
          </Text>
          <HStack gap={2}>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setPreviewMode(!previewMode)}
              leftIcon={<Icon as={previewMode ? HiCode : HiEye} />}
            >
              {previewMode ? "Edit" : "Preview"}
            </Button>
            {site && (
              <Button
                size="sm"
                variant="ghost"
                colorScheme="red"
                onClick={handleDelete}
                leftIcon={<Icon as={HiTrash} />}
              >
                Delete Site
              </Button>
            )}
            <Button size="sm" variant="outline" onClick={onCancel} leftIcon={<Icon as={HiX} />}>
              Cancel
            </Button>
            <Button
              size="sm"
              colorScheme="blue"
              onClick={handleSubmit}
              loading={saving}
              leftIcon={<Icon as={HiSave} />}
            >
              {site ? "Update" : "Create"}
            </Button>
          </HStack>
        </HStack>

        {previewMode ? (
          <VStack gap={4} align="stretch">
            <Text fontSize="lg" fontWeight="600" color="gray.700">
              Site Preview
            </Text>
            {renderPreview()}
          </VStack>
        ) : (
          <VStack gap={4} align="stretch">
            {/* Site Title */}
            <Field label="Site Title" helperText="The main title of your website">
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="My Portfolio"
                size="lg"
              />
            </Field>

            {/* Slug */}
            <Field
              label="Slug"
              helperText={`URL-friendly identifier${site ? " — cannot be changed after creation." : " (e.g. my-portfolio → /my-portfolio/)"}`}
            >
              <Input
                value={formData.slug}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"),
                  })
                }
                placeholder="my-portfolio"
                size="lg"
                disabled={!!site}
              />
            </Field>

            {/* Description */}
            <Field label="Description">
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="A brief description of your website"
                rows={2}
              />
            </Field>

            {/* Code Editors */}
            <Tabs.Root defaultValue="html">
              <Tabs.List>
                <Tabs.Trigger value="html">HTML</Tabs.Trigger>
                <Tabs.Trigger value="css">CSS</Tabs.Trigger>
                <Tabs.Trigger value="js">JavaScript</Tabs.Trigger>
              </Tabs.List>

              <Tabs.Content value="html">
                <Field label="HTML Content" helperText="The full HTML body content for your site">
                  <Textarea
                    value={formData.html_content}
                    onChange={(e) => setFormData({ ...formData, html_content: e.target.value })}
                    placeholder="<h1>Welcome!</h1>"
                    rows={18}
                    fontFamily="monospace"
                    fontSize="sm"
                  />
                </Field>
              </Tabs.Content>

              <Tabs.Content value="css">
                <Field label="CSS Styles" helperText="Styles applied to this site">
                  <Textarea
                    value={formData.css_content}
                    onChange={(e) => setFormData({ ...formData, css_content: e.target.value })}
                    placeholder="body { font-family: Arial, sans-serif; }"
                    rows={18}
                    fontFamily="monospace"
                    fontSize="sm"
                  />
                </Field>
              </Tabs.Content>

              <Tabs.Content value="js">
                <Field label="JavaScript" helperText="Scripts for this site">
                  <Textarea
                    value={formData.js_content}
                    onChange={(e) => setFormData({ ...formData, js_content: e.target.value })}
                    placeholder="console.log('Site loaded');"
                    rows={18}
                    fontFamily="monospace"
                    fontSize="sm"
                  />
                </Field>
              </Tabs.Content>
            </Tabs.Root>

            {/* Visibility Settings */}
            <Card.Root bg="gray.50" p={4}>
              <VStack gap={3} align="stretch">
                <Text fontWeight="600" color="gray.700">
                  Visibility Settings
                </Text>
                <HStack justify="space-between">
                  <VStack align="start" gap={0}>
                    <Text fontWeight="500">Public</Text>
                    <Text fontSize="sm" color="gray.600">
                      Make this site visible to everyone
                    </Text>
                  </VStack>
                  <Switch
                    checked={formData.is_public}
                    onCheckedChange={(e) => setFormData({ ...formData, is_public: e.checked })}
                    colorScheme="blue"
                  />
                </HStack>
                <HStack justify="space-between">
                  <VStack align="start" gap={0}>
                    <Text fontWeight="500">Published</Text>
                    <Text fontSize="sm" color="gray.600">
                      Publish this site to make it live
                    </Text>
                  </VStack>
                  <Switch
                    checked={formData.is_published}
                    onCheckedChange={(e) => setFormData({ ...formData, is_published: e.checked })}
                    colorScheme="green"
                  />
                </HStack>
              </VStack>
            </Card.Root>
          </VStack>
        )}
      </VStack>
    </Card.Root>
  )
}
