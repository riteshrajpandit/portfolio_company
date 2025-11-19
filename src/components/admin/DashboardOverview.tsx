import { Box, VStack, HStack, Text, Heading, Button, Badge, Grid, GridItem, Icon, Circle } from "@chakra-ui/react"
import { HiMail, HiBriefcase } from "react-icons/hi"
import { StatCard } from "./StatCard"
import type { IconType } from "react-icons"

interface Stat {
  label: string
  value: string
  change: string
  icon: IconType
  color: string
}

interface RecentMessage {
  id: number
  name: string
  email: string
  message: string
  time: string
  status: string
}

interface RecentApplication {
  id: number
  name: string
  position: string
  department: string
  time: string
  status: string
}

interface DashboardOverviewProps {
  stats: Stat[]
  recentMessages: RecentMessage[]
  recentApplications: RecentApplication[]
  onViewAllMessages: () => void
  onViewAllApplications: () => void
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "unread":
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

export const DashboardOverview = ({
  stats,
  recentMessages,
  recentApplications,
  onViewAllMessages,
  onViewAllApplications
}: DashboardOverviewProps) => {
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

            <VStack gap={4} align="stretch">
              {recentMessages.map((msg) => (
                <Box
                  key={msg.id}
                  p={4}
                  bg={msg.status === "unread" ? "blue.50" : "neutral.50"}
                  borderRadius="lg"
                  border="1px solid"
                  borderColor={msg.status === "unread" ? "blue.200" : "neutral.200"}
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
                    <Badge colorScheme={getStatusColor(msg.status)} fontSize="xs">
                      {msg.status}
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
                      {msg.time}
                    </Text>
                  </HStack>
                </Box>
              ))}
            </VStack>
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
                        {app.name.charAt(0).toUpperCase()}
                      </Circle>
                      <Text fontSize="sm" fontWeight="600" color="neutral.900">
                        {app.name}
                      </Text>
                    </HStack>
                    <Badge colorScheme={getStatusColor(app.status)} fontSize="xs">
                      {app.status}
                    </Badge>
                  </HStack>
                  <Text fontSize="sm" color="neutral.700" fontWeight="600" mb={1}>
                    {app.position}
                  </Text>
                  <HStack justify="space-between">
                    <Text fontSize="xs" color="neutral.600">
                      {app.department}
                    </Text>
                    <Text fontSize="xs" color="neutral.500">
                      {app.time}
                    </Text>
                  </HStack>
                </Box>
              ))}
            </VStack>
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
