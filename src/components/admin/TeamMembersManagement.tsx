import { useState, useEffect } from "react"
import {
  Box,
  Button,
  VStack,
  HStack,
  Text,
  Input,
  Textarea,
  Table,
  Image,
  Badge,
  Spinner,
} from "@chakra-ui/react"
import { Field } from "@chakra-ui/react"
import { toaster } from "../ui/toaster"
import { DeleteConfirmDialog } from "../ui/DeleteConfirmDialog"
import { HiPhoto } from "react-icons/hi2"
import { apiService, type TeamMember as ApiTeamMember } from "@/services/api"

interface TeamMember {
  id?: number
  name: string
  role: string
  bio: string
  image: string
  social: string[]
}

export const TeamMembersManagement = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAdding, setIsAdding] = useState(false)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [formData, setFormData] = useState<TeamMember>({
    name: "",
    role: "",
    bio: "",
    image: "",
    social: []
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; member: TeamMember | null; index: number | null }>({
    isOpen: false,
    member: null,
    index: null
  })
  const [isDeleting, setIsDeleting] = useState(false)

  // Fetch team members on component mount
  useEffect(() => {
    fetchTeamMembers()
  }, [])

  const fetchTeamMembers = async () => {
    try {
      setIsLoading(true)
      const response = await apiService.getTeamMembers()
      const formattedMembers = response.data.map((member: ApiTeamMember) => ({
        id: member.id,
        name: member.name,
        role: member.position,
        bio: member.bio,
        image: member.image,
        social: member.uploaded_links.map(link => link.url)
      }))
      setTeamMembers(formattedMembers)
    } catch (error) {
      console.error("Failed to fetch team members:", error)
      toaster.create({
        title: "Error",
        description: "Failed to load team members",
        type: "error",
        duration: 3000
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toaster.create({
        title: "Invalid File Type",
        description: "Please upload an image file (JPG or PNG)",
        type: "error",
        duration: 3000
      })
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toaster.create({
        title: "File Too Large",
        description: "Image size must be less than 5MB",
        type: "error",
        duration: 3000
      })
      return
    }

    // Store file for later upload
    setImageFile(file)
    
    // Create preview URL
    const reader = new FileReader()
    reader.onloadend = () => {
      const base64String = reader.result as string
      setFormData({ ...formData, image: base64String })
      toaster.create({
        title: "Image Selected",
        description: `${file.name} ready to upload`,
        type: "success",
        duration: 2000
      })
    }
    reader.readAsDataURL(file)
  }

  const handleAdd = () => {
    setIsAdding(true)
    setEditingIndex(null)
    setImageFile(null)
    setFormData({
      name: "",
      role: "",
      bio: "",
      image: "",
      social: []
    })
  }

  const handleEdit = (index: number) => {
    setEditingIndex(index)
    setIsAdding(false)
    setImageFile(null)
    const member = teamMembers[index]
    setFormData({
      id: member.id,
      name: member.name,
      role: member.role,
      bio: member.bio,
      image: member.image,
      social: [...member.social]
    })
  }

  const handleSave = async () => {
    if (!formData.name.trim() || !formData.role.trim() || !formData.bio.trim()) {
      toaster.create({
        title: "Missing Required Fields",
        description: "Please fill in name, role, and bio",
        type: "error",
        duration: 3000
      })
      return
    }

    if (isAdding && !imageFile) {
      toaster.create({
        title: "Missing Image",
        description: "Please upload an image",
        type: "error",
        duration: 3000
      })
      return
    }

    try {
      if (isAdding) {
        // Create new team member
        const formDataToSend = new FormData()
        formDataToSend.append('name', formData.name)
        formDataToSend.append('position', formData.role)
        formDataToSend.append('bio', formData.bio)
        if (imageFile) {
          formDataToSend.append('image', imageFile)
        }
        formData.social.forEach(link => {
          if (link.trim()) {
            formDataToSend.append('social_links[]', link)
          }
        })

        await apiService.createTeamMember(formDataToSend)
        toaster.create({
          title: "Team Member Added",
          description: `${formData.name} has been added to the team`,
          type: "success",
          duration: 3000
        })
      } else if (editingIndex !== null && formData.id) {
        // Update existing team member
        const updateData: {
          name: string
          position: string
          bio: string
          social_links: string[]
          image?: File
        } = {
          name: formData.name,
          position: formData.role,
          bio: formData.bio,
          social_links: formData.social.filter(link => link.trim())
        }

        if (imageFile) {
          updateData.image = imageFile
        }

        await apiService.updateTeamMember(formData.id, updateData)
        toaster.create({
          title: "Team Member Updated",
          description: `${formData.name} has been updated`,
          type: "success",
          duration: 3000
        })
      }

      // Refresh the list
      await fetchTeamMembers()
      handleCancel()
    } catch (error) {
      console.error("Failed to save team member:", error)
      toaster.create({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save team member",
        type: "error",
        duration: 3000
      })
    }
  }

  const handleDelete = (index: number) => {
    const member = teamMembers[index]
    if (!member.id) return
    
    setDeleteDialog({
      isOpen: true,
      member,
      index
    })
  }

  const confirmDelete = async () => {
    if (!deleteDialog.member?.id) return

    try {
      setIsDeleting(true)
      await apiService.deleteTeamMember(deleteDialog.member.id)
      
      // Immediately update local state to remove the deleted member
      setTeamMembers(prevMembers => 
        prevMembers.filter(m => m.id !== deleteDialog.member?.id)
      )
      
      toaster.create({
        title: "Team Member Deleted",
        description: "Team member has been removed",
        type: "success",
        duration: 3000
      })
      
      setDeleteDialog({ isOpen: false, member: null, index: null })
    } catch (error) {
      console.error("Failed to delete team member:", error)
      toaster.create({
        title: "Error",
        description: "Failed to delete team member",
        type: "error",
        duration: 3000
      })
    } finally {
      setIsDeleting(false)
    }
  }

  const handleCancel = () => {
    setIsAdding(false)
    setEditingIndex(null)
    setImageFile(null)
    setFormData({
      name: "",
      role: "",
      bio: "",
      image: "",
      social: []
    })
  }

  const addSocialLink = () => {
    setFormData({ ...formData, social: [...formData.social, ""] })
  }

  const updateSocialLink = (index: number, value: string) => {
    const newSocial = [...formData.social]
    newSocial[index] = value
    setFormData({ ...formData, social: newSocial })
  }

  const removeSocialLink = (index: number) => {
    const newSocial = formData.social.filter((_, i) => i !== index)
    setFormData({ ...formData, social: newSocial })
  }

  if (isLoading) {
    return (
      <Box textAlign="center" py={8}>
        <Spinner size="xl" color="blue.500" />
        <Text mt={4} color="gray.600">Loading team members...</Text>
      </Box>
    )
  }

  return (
    <VStack align="stretch" gap={6}>
      <HStack justify="flex-end">
        {!isAdding && editingIndex === null && (
          <Button colorScheme="blue" onClick={handleAdd} >
            Add New Member
          </Button>
        )}
      </HStack>

      {/* Add/Edit Form */}
      {(isAdding || editingIndex !== null) && (
        <Box bg="gray.50" p={6} borderRadius="lg" borderWidth="1px">
          <VStack align="stretch" gap={4}>
            <Text fontSize="lg" fontWeight="bold">
              {isAdding ? "Add New Team Member" : "Edit Team Member"}
            </Text>

            <Field.Root>
              <Field.Label>Name *</Field.Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter full name"
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>Role *</Field.Label>
              <Input
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                placeholder="e.g., CEO & Founder, Frontend Developer"
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>Bio *</Field.Label>
              <Textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Brief description about the team member"
                rows={3}
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>Profile Image *</Field.Label>
              
              {/* Custom Upload Box */}
              <Box
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
                onClick={() => document.getElementById('team-image-upload')?.click()}
              >
                <VStack gap={2}>
                  <Box
                    p={4}
                    borderRadius="full"
                    bg="blue.500"
                    color="white"
                  >
                    <HiPhoto fontSize="3xl" />
                  </Box>
                  <Text fontWeight="600" color="blue.700">
                    Click to upload or drag and drop
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    JPG or PNG (max 5MB)
                  </Text>
                </VStack>
              </Box>
              
              <Input
                id="team-image-upload"
                type="file"
                accept="image/jpeg,image/png,image/jpg"
                onChange={handleFileUpload}
                display="none"
              />

              <HStack my={4} align="center">
                <Box flex={1} h="1px" bg="gray.300" />
                <Text fontSize="sm" color="gray.500" px={4}>OR</Text>
                <Box flex={1} h="1px" bg="gray.300" />
              </HStack>

              <Input
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="Enter image URL"
                size="lg"
              />

              {formData.image && (
                <Box mt={2}>
                  <Text fontSize="sm" fontWeight="600" mb={2}>Image Preview:</Text>
                  <Image
                    src={formData.image}
                    alt="Preview"
                    maxH="200px"
                    maxW="200px"
                    objectFit="cover"
                    borderRadius="lg"
                  />
                </Box>
              )}
            </Field.Root>

            <Text fontSize="md" fontWeight="bold" mt={4}>Social Links</Text>

            <VStack align="stretch" gap={3}>
              {formData.social.map((link, index) => (
                <HStack key={index} gap={2}>
                  <Input
                    value={link}
                    onChange={(e) => updateSocialLink(index, e.target.value)}
                    placeholder="https://linkedin.com/in/username or https://x.com/username"
                    flex={1}
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    colorScheme="red"
                    onClick={() => removeSocialLink(index)}
                  >
                    Remove
                  </Button>
                </HStack>
              ))}
              <Button
                size="sm"
                variant="outline"
                colorScheme="blue"
                onClick={addSocialLink}
              >
                + Add Social Link
              </Button>
            </VStack>

            <HStack gap={3} mt={4}>
              <Button colorScheme="blue" onClick={handleSave}>
                {isAdding ? "Add Member" : "Save Changes"}
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </HStack>
          </VStack>
        </Box>
      )}

      {/* Team Members Table */}
      <Box overflowX="auto" borderWidth="1px" borderRadius="lg">
        <Table.Root size="sm">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Image</Table.ColumnHeader>
              <Table.ColumnHeader>Name</Table.ColumnHeader>
              <Table.ColumnHeader>Role</Table.ColumnHeader>
              <Table.ColumnHeader>Bio</Table.ColumnHeader>
              <Table.ColumnHeader>Social Links</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="right">Actions</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {teamMembers.map((member, index) => (
              <Table.Row key={member.id || index}>
                <Table.Cell>
                  <Image
                    src={member.image.startsWith('http') ? member.image : `${import.meta.env.VITE_API_ENDPOINT || 'http://localhost:8000'}${member.image}`}
                    alt={member.name}
                    boxSize="50px"
                    objectFit="cover"
                    borderRadius="md"
                  />
                </Table.Cell>
                <Table.Cell fontWeight="600">{member.name}</Table.Cell>
                <Table.Cell>
                  <Badge colorScheme="blue">{member.role}</Badge>
                </Table.Cell>
                <Table.Cell maxW="300px" truncate>
                  {member.bio}
                </Table.Cell>
                <Table.Cell>
                  <VStack align="start" gap={1} fontSize="xs">
                    {member.social.length > 0 ? (
                      member.social.map((link, idx) => (
                        <Text key={idx} color="blue.600" truncate maxW="150px">
                          {link}
                        </Text>
                      ))
                    ) : (
                      <Text color="gray.400">No social links</Text>
                    )}
                  </VStack>
                </Table.Cell>
                <Table.Cell textAlign="right">
                  <HStack gap={2} justify="flex-end">
                    <Button
                      size="sm"
                      variant="outline"
                      colorScheme="blue"
                      onClick={() => handleEdit(index)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      colorScheme="red"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </Button>
                  </HStack>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>

      {teamMembers.length === 0 && (
        <Box textAlign="center" py={8} color="gray.500">
          <Text>No team members yet. Add your first team member to get started.</Text>
        </Box>
      )}

      <DeleteConfirmDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, member: null, index: null })}
        onConfirm={confirmDelete}
        title="Delete Team Member"
        message={`Are you sure you want to delete ${deleteDialog.member?.name}? This action cannot be undone.`}
        isLoading={isDeleting}
      />
    </VStack>
  )
}
