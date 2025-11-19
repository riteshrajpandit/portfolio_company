import { Box, VStack, HStack, Text, Heading, Button, Badge, Grid, Input } from "@chakra-ui/react"
import { useState } from "react"
import { toaster } from "@/components/ui/toaster"

interface Job {
  id: number
  title: string
  department: string
  applicants: number
  status: string
  postedDate: string
}

interface JobsManagementProps {
  jobs: Job[]
}

export const JobsManagement = ({ jobs }: JobsManagementProps) => {
  const [isCreatingJob, setIsCreatingJob] = useState(false)
  const [newJob, setNewJob] = useState({
    title: "",
    department: "technical",
    location: "On-Site",
    type: "Full-time",
    experience: "",
    description: "",
    requirements: [""]
  })

  const handlePostJob = () => {
    toaster.create({
      title: "Job Posted Successfully",
      description: `${newJob.title} has been posted`,
      type: "success",
      duration: 3000,
    })
    setIsCreatingJob(false)
    setNewJob({
      title: "",
      department: "technical",
      location: "On-Site",
      type: "Full-time",
      experience: "",
      description: "",
      requirements: [""]
    })
  }

  return (
    <VStack gap={6} align="stretch">
      {/* Create New Job Button */}
      <HStack justify="space-between">
        <Text fontSize="lg" fontWeight="600" color="neutral.700">
          Posted Jobs ({jobs.length})
        </Text>
        <Button
          colorScheme="primary"
          onClick={() => setIsCreatingJob(!isCreatingJob)}
        >
          {isCreatingJob ? "Cancel" : "+ Create New Job"}
        </Button>
      </HStack>

      {/* Create Job Form */}
      {isCreatingJob && (
        <Box
          p={6}
          bg="white"
          borderRadius="xl"
          border="1px solid"
          borderColor="neutral.200"
        >
          <Heading fontSize="lg" fontWeight="700" mb={6}>
            Create New Job Posting
          </Heading>
          <VStack gap={4} align="stretch">
            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
              <VStack align="stretch" gap={2}>
                <Text fontSize="sm" fontWeight="600">Job Title *</Text>
                <Input
                  placeholder="e.g., Senior Full Stack Developer"
                  value={newJob.title}
                  onChange={(e) => setNewJob({...newJob, title: e.target.value})}
                />
              </VStack>
              <VStack align="stretch" gap={2}>
                <Text fontSize="sm" fontWeight="600">Department *</Text>
                <select
                  value={newJob.department}
                  onChange={(e) => setNewJob({...newJob, department: e.target.value})}
                  style={{
                    padding: "8px 12px",
                    borderRadius: "6px",
                    border: "1px solid #E2E8F0",
                    fontSize: "14px"
                  }}
                >
                  <option value="technical">Technical</option>
                  <option value="admin-hr">Admin/HR</option>
                  <option value="sales-marketing">Sales/Marketing</option>
                </select>
              </VStack>
              <VStack align="stretch" gap={2}>
                <Text fontSize="sm" fontWeight="600">Location *</Text>
                <Input
                  placeholder="e.g., On-Site, Remote, Hybrid"
                  value={newJob.location}
                  onChange={(e) => setNewJob({...newJob, location: e.target.value})}
                />
              </VStack>
              <VStack align="stretch" gap={2}>
                <Text fontSize="sm" fontWeight="600">Job Type *</Text>
                <select
                  value={newJob.type}
                  onChange={(e) => setNewJob({...newJob, type: e.target.value})}
                  style={{
                    padding: "8px 12px",
                    borderRadius: "6px",
                    border: "1px solid #E2E8F0",
                    fontSize: "14px"
                  }}
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </VStack>
              <VStack align="stretch" gap={2}>
                <Text fontSize="sm" fontWeight="600">Experience Required *</Text>
                <Input
                  placeholder="e.g., 2-5 years"
                  value={newJob.experience}
                  onChange={(e) => setNewJob({...newJob, experience: e.target.value})}
                />
              </VStack>
            </Grid>
            <VStack align="stretch" gap={2}>
              <Text fontSize="sm" fontWeight="600">Job Description *</Text>
              <textarea
                placeholder="Describe the role, responsibilities, and what you're looking for..."
                value={newJob.description}
                onChange={(e) => setNewJob({...newJob, description: e.target.value})}
                rows={4}
                style={{
                  padding: "8px 12px",
                  borderRadius: "6px",
                  border: "1px solid #E2E8F0",
                  fontSize: "14px",
                  fontFamily: "inherit"
                }}
              />
            </VStack>
            <VStack align="stretch" gap={2}>
              <Text fontSize="sm" fontWeight="600">Requirements</Text>
              {newJob.requirements.map((req, index) => (
                <HStack key={index} gap={2}>
                  <Input
                    placeholder="Add a requirement"
                    value={req}
                    onChange={(e) => {
                      const updated = [...newJob.requirements]
                      updated[index] = e.target.value
                      setNewJob({...newJob, requirements: updated})
                    }}
                  />
                  {index > 0 && (
                    <Button
                      size="sm"
                      colorScheme="red"
                      variant="ghost"
                      onClick={() => {
                        const updated = newJob.requirements.filter((_, i) => i !== index)
                        setNewJob({...newJob, requirements: updated})
                      }}
                    >
                      Remove
                    </Button>
                  )}
                </HStack>
              ))}
              <Button
                size="sm"
                variant="outline"
                onClick={() => setNewJob({...newJob, requirements: [...newJob.requirements, ""]})}
              >
                + Add Requirement
              </Button>
            </VStack>
            <HStack gap={3} pt={4}>
              <Button
                colorScheme="primary"
                onClick={handlePostJob}
              >
                Post Job
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsCreatingJob(false)}
              >
                Cancel
              </Button>
            </HStack>
          </VStack>
        </Box>
      )}

      {/* Posted Jobs List */}
      <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap={4}>
        {jobs.map((job) => (
          <Box
            key={job.id}
            p={6}
            bg="white"
            borderRadius="xl"
            border="1px solid"
            borderColor="neutral.200"
            _hover={{ shadow: "md" }}
            transition="all 0.3s ease"
          >
            <VStack align="stretch" gap={4}>
              <HStack justify="space-between">
                <VStack align="start" gap={1}>
                  <Heading fontSize="lg" fontWeight="700" color="neutral.900">
                    {job.title}
                  </Heading>
                  <Text fontSize="sm" color="neutral.600">
                    {job.department}
                  </Text>
                </VStack>
                <Badge
                  colorScheme={job.status === "active" ? "green" : "gray"}
                  fontSize="xs"
                >
                  {job.status}
                </Badge>
              </HStack>
              <HStack gap={6} flexWrap="wrap">
                <VStack align="start" gap={0}>
                  <Text fontSize="2xl" fontWeight="700" color="primary.500">
                    {job.applicants}
                  </Text>
                  <Text fontSize="xs" color="neutral.600">
                    Applicants
                  </Text>
                </VStack>
                <VStack align="start" gap={0}>
                  <Text fontSize="sm" fontWeight="600" color="neutral.700">
                    Posted
                  </Text>
                  <Text fontSize="xs" color="neutral.600">
                    {new Date(job.postedDate).toLocaleDateString()}
                  </Text>
                </VStack>
              </HStack>
              <HStack gap={2}>
                <Button size="sm" variant="outline" colorScheme="primary" flex={1}>
                  Edit
                </Button>
                <Button size="sm" variant="outline" colorScheme="blue" flex={1}>
                  View Applicants
                </Button>
                <Button size="sm" variant="ghost" colorScheme="red">
                  Delete
                </Button>
              </HStack>
            </VStack>
          </Box>
        ))}
      </Grid>
    </VStack>
  )
}
