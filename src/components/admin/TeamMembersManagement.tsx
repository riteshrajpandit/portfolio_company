import { useState } from "react"
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
} from "@chakra-ui/react"
import { Field } from "@chakra-ui/react"
import { toaster } from "../ui/toaster"
import { HiPhoto } from "react-icons/hi2"

interface TeamMember {
  name: string
  role: string
  bio: string
  image: string
  social: {
    linkedin: string
    twitter: string
    github: string
  }
}

export const TeamMembersManagement = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      name: "Suresh Bhandari",
      role: "CEO & Founder",
      bio: "Suresh leads us from all frontiers, leveraging over two decades of expertise in IT and management to lead teams effectively.",
      image: "/teams/Suresh.png",
      social: {
        linkedin: "https://linkedin.com/in/sureshbhandari",
        twitter: "https://x.com/sureshbhandari2",
        github: "https://github.com"
      }
    },
    {
      name: "Divyendu Bhatt",
      role: "CTO & Security Advisor",
      bio: "Divyendu drives our security and compliances while implementing frameworks, managing vulnerabilities, and ensuring regulatory compliance.",
      image: "/teams/Divyendu.png",
      social: {
        linkedin: "https://linkedin.com/in/dm-bhatt-0bb8a48",
        twitter: "https://x.com",
        github: "https://github.com"
      }
    },
    {
      name: "Abiral Bhandari",
      role: "HR and Project Manager",
      bio: "Abiral leads our technical vision with expertise in modern web technologies and scalable architecture design.",
      image: "/teams/Abiral.png",
      social: {
        linkedin: "https://linkedin.com",
        twitter: "https://x.com",
        github: "https://github.com"
      }
    },
    {
      name: "Tejash Katuwal",
      role: "AI Engineer",
      bio: "Tejash builds AI models and data pipelines that help drive data-driven decisions across the organization.",
      image: "/teams/Tejash.jpg",
      social: {
        linkedin: "https://linkedin.com",
        twitter: "https://x.com",
        github: "https://github.com"
      }
    },
    {
      name: "Nibesh Suwal",
      role: "Lead Backend Developer",
      bio: "Nibesh manages our infrastructure and deployment pipelines, ensuring reliable and scalable cloud solutions.",
      image: "/teams/Nibesh.png",
      social: {
        linkedin: "https://linkedin.com",
        twitter: "https://x.com",
        github: "https://github.com"
      }
    },
    {
      name: "Ritesh Raj Pandit",
      role: "Lead Frontend Developer",
      bio: "Ritesh brings creative vision to life with user-centered design principles and a passion for beautiful, functional interfaces.",
      image: "/teams/Ritesh.png",
      social: {
        linkedin: "https://linkedin.com/in/riteshrajpandit",
        twitter: "https://x.com/riteshrajpandit",
        github: "https://github.com"
      }
    },
    {
      name: "Ashim Thapa Magar",
      role: "Frontend Developer",
      bio: "Ashim brings creative vision to life with user-centered design principles and a passion for beautiful, functional interfaces.",
      image: "/teams/ashim.jpeg",
      social: {
        linkedin: "https://linkedin.com",
        twitter: "https://x.com",
        github: "https://github.com"
      }
    },
    {
      name: "Dipak Bohara",
      role: "Backend Developer",
      bio: "Dipak is passionate about building scalable applications and implementing best practices in software development.",
      image: "/teams/dipakbohara.jpeg",
      social: {
        linkedin: "https://linkedin.com",
        twitter: "https://x.com",
        github: "https://github.com"
      }
    },
    {
      name: "Diwas Gauli",
      role: "Backend Developer",
      bio: "Diwas builds robust server-side solutions and ensures optimal performance and security of our applications.",
      image: "/teams/diwas.jpeg",
      social: {
        linkedin: "https://linkedin.com",
        twitter: "https://x.com",
        github: "https://github.com"
      }
    },
    {
      name: "Kaustuv Bastakoti",
      role: "Backend Developer",
      bio: "Kaustuv builds robust server-side solutions and ensures optimal performance and security of our applications.",
      image: "/teams/kaustuv.jpeg",
      social: {
        linkedin: "https://linkedin.com",
        twitter: "https://x.com",
        github: "https://github.com"
      }
    },
    {
      name: "Laxmi Regmi",
      role: "Frontend Developer",
      bio: "Laxmi crafts intuitive user experiences and beautiful interfaces that delight users and drive engagement.",
      image: "/teams/laxmi.jpeg",
      social: {
        linkedin: "https://linkedin.com",
        twitter: "https://x.com",
        github: "https://github.com"
      }
    },
    {
      name: "Shubham Ghimire",
      role: "Frontend Developer",
      bio: "Shubham works across the entire stack, bringing ideas from conception to deployment with modern technologies.",
      image: "/teams/shubham.jpeg",
      social: {
        linkedin: "https://linkedin.com",
        twitter: "https://x.com",
        github: "https://github.com"
      }
    },
    {
      name: "Suyog Bhattarai",
      role: "Frontend Developer",
      bio: "Suyog ensures our products meet the highest quality standards through comprehensive testing and quality processes.",
      image: "/teams/suyog.jpeg",
      social: {
        linkedin: "https://linkedin.com",
        twitter: "https://x.com",
        github: "https://github.com"
      }
    }
  ])

  const [isAdding, setIsAdding] = useState(false)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [formData, setFormData] = useState<TeamMember>({
    name: "",
    role: "",
    bio: "",
    image: "",
    social: {
      linkedin: "",
      twitter: "",
      github: ""
    }
  })

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

    // Convert to base64
    const reader = new FileReader()
    reader.onloadend = () => {
      const base64String = reader.result as string
      setFormData({ ...formData, image: base64String })
      toaster.create({
        title: "Image Uploaded",
        description: `${file.name} uploaded successfully`,
        type: "success",
        duration: 2000
      })
    }
    reader.readAsDataURL(file)
  }

  const handleAdd = () => {
    setIsAdding(true)
    setFormData({
      name: "",
      role: "",
      bio: "",
      image: "",
      social: {
        linkedin: "",
        twitter: "",
        github: ""
      }
    })
  }

  const handleEdit = (index: number) => {
    setEditingIndex(index)
    setFormData(teamMembers[index])
  }

  const handleSave = () => {
    if (!formData.name.trim() || !formData.role.trim() || !formData.bio.trim() || !formData.image.trim()) {
      toaster.create({
        title: "Missing Required Fields",
        description: "Please fill in name, role, bio, and image",
        type: "error",
        duration: 3000
      })
      return
    }

    if (isAdding) {
      setTeamMembers([...teamMembers, formData])
      toaster.create({
        title: "Team Member Added",
        description: `${formData.name} has been added to the team`,
        type: "success",
        duration: 3000
      })
    } else if (editingIndex !== null) {
      const updated = [...teamMembers]
      updated[editingIndex] = formData
      setTeamMembers(updated)
      toaster.create({
        title: "Team Member Updated",
        description: `${formData.name} has been updated`,
        type: "success",
        duration: 3000
      })
    }

    setIsAdding(false)
    setEditingIndex(null)
    setFormData({
      name: "",
      role: "",
      bio: "",
      image: "",
      social: {
        linkedin: "",
        twitter: "",
        github: ""
      }
    })
  }

  const handleDelete = (index: number) => {
    if (window.confirm(`Are you sure you want to delete ${teamMembers[index].name}?`)) {
      const updated = teamMembers.filter((_, i) => i !== index)
      setTeamMembers(updated)
      toaster.create({
        title: "Team Member Deleted",
        description: "Team member has been removed",
        type: "success",
        duration: 3000
      })
    }
  }

  const handleCancel = () => {
    setIsAdding(false)
    setEditingIndex(null)
    setFormData({
      name: "",
      role: "",
      bio: "",
      image: "",
      social: {
        linkedin: "",
        twitter: "",
        github: ""
      }
    })
  }

  return (
    <VStack align="stretch" gap={6}>
      <HStack justify="space-between">
        <Box>
          <Text fontSize="2xl" fontWeight="bold">Team Members Management</Text>
          <Text color="gray.600" fontSize="sm">
            Manage your team members displayed on the About page
          </Text>
        </Box>
        {!isAdding && editingIndex === null && (
          <Button colorScheme="blue" onClick={handleAdd}>
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

            <Field.Root>
              <Field.Label>LinkedIn URL</Field.Label>
              <Input
                value={formData.social.linkedin}
                onChange={(e) => setFormData({
                  ...formData,
                  social: { ...formData.social, linkedin: e.target.value }
                })}
                placeholder="https://linkedin.com/in/username"
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>Twitter/X URL</Field.Label>
              <Input
                value={formData.social.twitter}
                onChange={(e) => setFormData({
                  ...formData,
                  social: { ...formData.social, twitter: e.target.value }
                })}
                placeholder="https://x.com/username"
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>GitHub URL</Field.Label>
              <Input
                value={formData.social.github}
                onChange={(e) => setFormData({
                  ...formData,
                  social: { ...formData.social, github: e.target.value }
                })}
                placeholder="https://github.com/username"
              />
            </Field.Root>

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
              <Table.Row key={index}>
                <Table.Cell>
                  <Image
                    src={member.image}
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
                <Table.Cell maxW="300px" isTruncated>
                  {member.bio}
                </Table.Cell>
                <Table.Cell>
                  <VStack align="start" gap={1} fontSize="xs">
                    {member.social.linkedin && (
                      <Text color="blue.600" isTruncated maxW="150px">
                        LinkedIn: {member.social.linkedin}
                      </Text>
                    )}
                    {member.social.twitter && (
                      <Text color="gray.600" isTruncated maxW="150px">
                        Twitter: {member.social.twitter}
                      </Text>
                    )}
                    {member.social.github && (
                      <Text color="gray.600" isTruncated maxW="150px">
                        GitHub: {member.social.github}
                      </Text>
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
    </VStack>
  )
}
