import { Box, VStack, HStack, Text, Heading, Button, Badge, Grid, Circle, Icon } from "@chakra-ui/react"
import { useState } from "react"
import { HiBriefcase, HiClock } from "react-icons/hi"
import { toaster } from "@/components/ui/toaster"
import { ApplicationModal } from "@/components/ui/ApplicationModal"

interface Application {
  id: number
  name: string
  email: string
  phone: string
  location: string
  position: string
  department: string
  experience: string
  appliedDate: string
  status: string
  resume: string
  coverLetter: string
  linkedIn: string
  portfolio?: string
  noticePeriod?: string
  expectedSalary?: string
}

interface ApplicationsListProps {
  applications: Application[]
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "new":
      return "red"
    case "reviewing":
      return "blue"
    case "shortlisted":
      return "green"
    default:
      return "gray"
  }
}

export const ApplicationsList = ({ applications }: ApplicationsListProps) => {
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)

  return (
    <>
      <VStack gap={6} align="stretch">
        {/* Filters */}
        <HStack gap={3} flexWrap="wrap">
          <Badge colorScheme="blue" px={3} py={1} cursor="pointer">
            All ({applications.length})
          </Badge>
          <Badge colorScheme="red" px={3} py={1} cursor="pointer">
            New ({applications.filter(a => a.status === "new").length})
          </Badge>
          <Badge colorScheme="orange" px={3} py={1} cursor="pointer">
            Reviewing ({applications.filter(a => a.status === "reviewing").length})
          </Badge>
          <Badge colorScheme="green" px={3} py={1} cursor="pointer">
            Shortlisted ({applications.filter(a => a.status === "shortlisted").length})
          </Badge>
          <Badge colorScheme="gray" px={3} py={1} cursor="pointer">
            Rejected ({applications.filter(a => a.status === "rejected").length})
          </Badge>
        </HStack>

        {/* Applications List */}
        <VStack gap={4} align="stretch">
          {applications.map((application) => (
            <Box
              key={application.id}
              p={6}
              bg="white"
              borderRadius="xl"
              border="1px solid"
              borderColor="neutral.200"
              _hover={{ shadow: "md" }}
              transition="all 0.3s ease"
            >
              <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={6}>
                <VStack align="stretch" gap={3}>
                  <HStack justify="space-between">
                    <HStack gap={3}>
                      <Circle size="48px" bg="primary.100" color="primary.600" fontWeight="600" fontSize="lg">
                        {application.name.charAt(0).toUpperCase()}
                      </Circle>
                      <VStack align="start" gap={0}>
                        <Heading fontSize="lg" fontWeight="700" color="neutral.900">
                          {application.name}
                        </Heading>
                        <Text fontSize="sm" color="neutral.600">
                          {application.email}
                        </Text>
                      </VStack>
                    </HStack>
                    <Badge colorScheme={getStatusColor(application.status)} fontSize="sm">
                      {application.status}
                    </Badge>
                  </HStack>
                  
                  <VStack align="stretch" gap={2} pl={15}>
                    <HStack gap={2}>
                      <Icon as={HiBriefcase} color="neutral.500" fontSize="sm" />
                      <Text fontSize="sm" color="neutral.700">
                        <Text as="span" fontWeight="600">{application.position}</Text> • {application.department}
                      </Text>
                    </HStack>
                    <HStack gap={2}>
                      <Icon as={HiClock} color="neutral.500" fontSize="sm" />
                      <Text fontSize="sm" color="neutral.600">
                        Applied: {new Date(application.appliedDate).toLocaleDateString()}
                      </Text>
                    </HStack>
                    <HStack gap={2}>
                      <Text fontSize="sm" color="neutral.600">
                        Experience: {application.experience}
                      </Text>
                    </HStack>
                  </VStack>

                  <Box pl={15}>
                    <Text fontSize="sm" color="neutral.700" lineClamp={2}>
                      {application.coverLetter}
                    </Text>
                  </Box>
                </VStack>

                <VStack align="stretch" gap={3} justify="center">
                  <Button
                    size="sm"
                    colorScheme="primary"
                    onClick={() => setSelectedApplication(application)}
                  >
                    View Full Application
                  </Button>
                  <HStack gap={2}>
                    <Button
                      size="sm"
                      variant="outline"
                      colorScheme="green"
                      flex={1}
                      onClick={() => {
                        toaster.create({
                          title: "Application Shortlisted",
                          description: `${application.name} has been shortlisted`,
                          type: "success",
                          duration: 3000,
                        })
                      }}
                    >
                      Shortlist
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      colorScheme="red"
                      flex={1}
                      onClick={() => {
                        toaster.create({
                          title: "Application Rejected",
                          description: `${application.name}'s application has been rejected`,
                          type: "info",
                          duration: 3000,
                        })
                      }}
                    >
                      Reject
                    </Button>
                  </HStack>
                  <Button
                    size="sm"
                    variant="ghost"
                    colorScheme="blue"
                    onClick={() => window.open(application.linkedIn, "_blank")}
                  >
                    View LinkedIn
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      toaster.create({
                        title: "Resume Downloaded",
                        description: application.resume,
                        type: "info",
                        duration: 3000,
                      })
                    }}
                  >
                    Download Resume
                  </Button>
                </VStack>
              </Grid>
            </Box>
          ))}
        </VStack>
      </VStack>

      {/* Application Modal */}
      <ApplicationModal
        isOpen={selectedApplication !== null}
        onClose={() => setSelectedApplication(null)}
        application={selectedApplication}
      />
    </>
  )
}
