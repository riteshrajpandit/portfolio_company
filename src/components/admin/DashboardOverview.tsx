import { Box, VStack, HStack, Text, Heading, Button, Badge, Grid, GridItem, Icon, Circle, Spinner, Center } from "@chakra-ui/react"
import { HiMail, HiBriefcase } from "react-icons/hi"
import { useState, useEffect } from "react"
import { StatCard } from "./StatCard"
import { apiService, type Message, type JobApplication } from "@/services/api"
import { toaster } from "@/components/ui/toaster"
import type { IconType } from "react-icons"

interface Stat {
  label: string
  value: string
  change: string
  icon: IconType
  color: string
}

interface DashboardOverviewProps {
  stats: Stat[]
  onViewAllMessages: () => void
  onViewAllApplications: () => void
}

export const DashboardOverview = ({
  stats,
  onViewAllMessages,
  onViewAllApplications
}: DashboardOverviewProps) => {
  const [recentMessages, setRecentMessages] = useState<Message[]>([])
  const [recentApplications, setRecentApplications] = useState<JobApplication[]>([])
  const [isLoadingMessages, setIsLoadingMessages] = useState(true)
  const [isLoadingApplications, setIsLoadingApplications] = useState(true)

  useEffect(() => {
    fetchRecentMessages()
    fetchRecentApplications()
  }, [])

  const fetchRecentMessages = async () => {
    try {
      setIsLoadingMessages(true)
      const response = await apiService.getMessages()
      // Get only the 3 most recent messages
      const recent = response.data.slice(0, 3)
      setRecentMessages(recent)
    } catch (error) {
      console.error("Failed to fetch messages:", error)
      toaster.create({
        title: "Error",
        description: "Failed to load recent messages",
        type: "error",
        duration: 3000,
      })
    } finally {
      setIsLoadingMessages(false)
    }
  }

  const fetchRecentApplications = async () => {
    try {
      setIsLoadingApplications(true)
      const response = await apiService.getJobApplications()
      // Get only the 3 most recent applications
      const recent = response.data.slice(0, 3)
      setRecentApplications(recent)
    } catch (error) {
      console.error("Failed to fetch applications:", error)
      toaster.create({
        title: "Error",
        description: "Failed to load recent applications",
        type: "error",
        duration: 3000,
      })
    } finally {
      setIsLoadingApplications(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`
    if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <>
      {/* Stats Grid */}
      <Grid
        templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
        gap={6}
        mb={8}
      >
        {stats.map((stat, index) => (
          <StatCard
            key={stat.label}
            {...stat}
            index={index}
          />
        ))}
      </Grid>

      {/* Content Grid */}
      <Grid
        templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }}
        gap={6}
      >
        {/* Recent Messages */}
        <GridItem>
          <Box
            p={6}
            bg="white"
            borderRadius="xl"
            border="1px solid"
            borderColor="neutral.200"
            h="full"
          >
            <HStack justify="space-between" mb={6}>
              <HStack gap={2}>
                <Icon as={HiMail} fontSize="xl" color="green.500" />
                <Heading fontSize="lg" fontWeight="700">
                  Recent Messages
                </Heading>
              </HStack>
              <Button size="sm" variant="ghost" colorScheme="primary" onClick={onViewAllMessages}>
                View All
              </Button>
            </HStack>

            {isLoadingMessages ? (
              <Center py={8}>
                <Spinner size="md" color="primary.500" />
              </Center>
            ) : recentMessages.length === 0 ? (
              <Box py={8} textAlign="center">
                <Text fontSize="sm" color="neutral.500">No messages yet</Text>
              </Box>
            ) : (
              <VStack gap={4} align="stretch">
                {recentMessages.map((msg) => (
                  <Box
                    key={msg.id}
                    p={4}
                    bg="blue.50"
                    borderRadius="lg"
                    border="1px solid"
                    borderColor="blue.200"
                    cursor="pointer"
                    _hover={{ shadow: "sm", borderColor: "primary.300" }}
                    transition="all 0.2s ease"
                    onClick={onViewAllMessages}
                  >
                    <HStack justify="space-between" mb={2}>
                      <HStack gap={2}>
                        <Circle size="24px" bg="primary.100" color="primary.600" fontWeight="600" fontSize="xs">
                          {msg.name.charAt(0).toUpperCase()}
                        </Circle>
                        <Text fontSize="sm" fontWeight="600" color="neutral.900">
                          {msg.name}
                        </Text>
                      </HStack>
                      <Badge colorScheme="blue" fontSize="xs">
                        New
                      </Badge>
                    </HStack>
                    <Text 
                      fontSize="sm" 
                      color="neutral.700" 
                      mb={2}
                      css={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {msg.message}
                    </Text>
                    <HStack justify="space-between">
                      <Text fontSize="xs" color="neutral.500">
                        {msg.email}
                      </Text>
                      <Text fontSize="xs" color="neutral.500">
                        {msg.created_at ? formatDate(msg.created_at) : 'Just now'}
                      </Text>
                    </HStack>
                  </Box>
                ))}
              </VStack>
            )}
          </Box>
        </GridItem>

        {/* Recent Applications */}
        <GridItem>
          <Box
            p={6}
            bg="white"
            borderRadius="xl"
            border="1px solid"
            borderColor="neutral.200"
            h="full"
          >
            <HStack justify="space-between" mb={6}>
              <HStack gap={2}>
                <Icon as={HiBriefcase} fontSize="xl" color="purple.500" />
                <Heading fontSize="lg" fontWeight="700">
                  Recent Job Applications
                </Heading>
              </HStack>
              <Button size="sm" variant="ghost" colorScheme="primary" onClick={onViewAllApplications}>
                View All
              </Button>
            </HStack>

            {isLoadingApplications ? (
              <Center py={8}>
                <Spinner size="md" color="primary.500" />
              </Center>
            ) : recentApplications.length === 0 ? (
              <Box py={8} textAlign="center">
                <Text fontSize="sm" color="neutral.500">No applications yet</Text>
              </Box>
            ) : (
              <VStack gap={4} align="stretch">
                {recentApplications.map((app) => (
                  <Box
                    key={app.id}
                    p={4}
                    bg="neutral.50"
                    borderRadius="lg"
                    border="1px solid"
                    borderColor="neutral.200"
                    cursor="pointer"
                    _hover={{ shadow: "sm", borderColor: "primary.300" }}
                    transition="all 0.2s ease"
                    onClick={onViewAllApplications}
                  >
                    <HStack justify="space-between" mb={2}>
                      <HStack gap={2}>
                        <Circle size="24px" bg="purple.100" color="purple.600" fontWeight="600" fontSize="xs">
                          {app.first_name.charAt(0).toUpperCase()}
                        </Circle>
                        <Text fontSize="sm" fontWeight="600" color="neutral.900">
                          {app.first_name} {app.last_name}
                        </Text>
                      </HStack>
                      <Badge colorScheme="green" fontSize="xs">
                        New
                      </Badge>
                    </HStack>
                    <Text fontSize="sm" color="neutral.700" fontWeight="600" mb={1}>
                      Applied via Career Page
                    </Text>
                    <HStack justify="space-between">
                      <Text fontSize="xs" color="neutral.600">
                        {app.email}
                      </Text>
                      <Text fontSize="xs" color="neutral.500">
                        {app.created_at ? formatDate(app.created_at) : 'Just now'}
                      </Text>
                    </HStack>
                  </Box>
                ))}
              </VStack>
            )}
          </Box>
        </GridItem>
      </Grid>

      {/* Quick Actions */}
      <Box
        mt={6}
        p={6}
        bg="gradient-to-r"
        bgGradient="linear(135deg, primary.500, primary.600)"
        borderRadius="xl"
        color="white"
      >
        <HStack justify="space-between" flexWrap="wrap" gap={4}>
          <VStack align="start" gap={2}>
            <Heading fontSize="xl" fontWeight="700">
              Need Help?
            </Heading>
            <Text fontSize="sm" opacity={0.9}>
              Check out our documentation or contact support
            </Text>
          </VStack>
          <HStack gap={3}>
            <Button
              bg="white"
              color="primary.600"
              _hover={{ bg: "whiteAlpha.900" }}
            >
              Documentation
            </Button>
            <Button
              variant="outline"
              borderColor="white"
              color="white"
              _hover={{ bg: "whiteAlpha.200" }}
            >
              Contact Support
            </Button>
          </HStack>
        </HStack>
      </Box>
    </>
  )
}
