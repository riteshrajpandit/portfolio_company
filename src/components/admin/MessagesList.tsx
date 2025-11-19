import { Box, VStack, HStack, Icon, Text, Badge, Circle, Button, Grid } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { useState } from "react"
import { HiMail, HiX, HiClock } from "react-icons/hi"
import { toaster } from "@/components/ui/toaster"
import { MessageModal } from "@/components/ui/MessageModal"

const MotionBox = motion(Box)

interface Message {
  id: number
  name: string
  email: string
  company: string
  phoneNumber: string
  website: string
  meetingTool: string
  agenda: string
  dateTime: string
  message: string
  submittedDate: string
  status: string
}

interface MessagesListProps {
  messages: Message[]
}

export const MessagesList = ({ messages }: MessagesListProps) => {
  const [messageStatusFilter, setMessageStatusFilter] = useState("all")
  const [expandedMessageId, setExpandedMessageId] = useState<number | null>(null)
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)

  const filteredMessages = messages.filter(
    msg => messageStatusFilter === "all" || msg.status === messageStatusFilter
  )

  return (
    <>
      <VStack gap={6} align="stretch">
        {/* Status Filter */}
        <HStack gap={3} flexWrap="wrap">
          {["all", "unread", "read", "replied"].map((filter) => (
            <Badge
              key={filter}
              px={4}
              py={2}
              borderRadius="full"
              cursor="pointer"
              bg={messageStatusFilter === filter ? "primary.500" : "neutral.100"}
              color={messageStatusFilter === filter ? "white" : "neutral.700"}
              fontWeight="600"
              fontSize="sm"
              textTransform="capitalize"
              onClick={() => setMessageStatusFilter(filter)}
              _hover={{
                bg: messageStatusFilter === filter ? "primary.600" : "neutral.200"
              }}
              transition="all 0.2s ease"
            >
              {filter} ({filter === "all" ? messages.length : messages.filter(m => m.status === filter).length})
            </Badge>
          ))}
        </HStack>

        {/* Messages List */}
        <VStack gap={4} align="stretch">
          {filteredMessages.map((message) => {
            const isExpanded = expandedMessageId === message.id
            
            return (
              <Box
                key={message.id}
                bg="white"
                borderRadius="xl"
                border="1px solid"
                borderColor={message.status === "unread" ? "blue.200" : "neutral.200"}
                overflow="hidden"
                transition="all 0.2s ease"
              >
                {/* Collapsed View */}
                <Box
                  p={4}
                  cursor="pointer"
                  onClick={() => setExpandedMessageId(isExpanded ? null : message.id)}
                  _hover={{ bg: "neutral.50" }}
                  transition="background 0.2s ease"
                >
                  <HStack justify="space-between" gap={3}>
                    <HStack gap={3} flex={1} minW={0}>
                      <Circle size="40px" bg="primary.100" color="primary.600" fontWeight="600" fontSize="md">
                        {message.name.charAt(0).toUpperCase()}
                      </Circle>
                      <VStack align="start" gap={1} flex={1} minW={0}>
                        <HStack gap={2} flexWrap="wrap">
                          <Text fontSize="md" fontWeight="700" color="neutral.900">
                            {message.name}
                          </Text>
                          <Text fontSize="sm" color="neutral.600">
                            • {message.company}
                          </Text>
                        </HStack>
                        <HStack gap={3} flexWrap="wrap" fontSize="sm" color="neutral.600">
                          <HStack gap={1}>
                            <Icon as={HiMail} fontSize="sm" />
                            <Text truncate>{message.email}</Text>
                          </HStack>
                          {message.phoneNumber && (
                            <HStack gap={1}>
                              <Text>•</Text>
                              <Text>{message.phoneNumber}</Text>
                            </HStack>
                          )}
                        </HStack>
                      </VStack>
                    </HStack>
                    <HStack gap={2} flexShrink={0}>
                      <Badge
                        colorScheme={
                          message.status === "unread" ? "blue" :
                          message.status === "read" ? "gray" :
                          "green"
                        }
                        fontSize="xs"
                        px={2}
                        py={1}
                      >
                        {message.status}
                      </Badge>
                      <Icon
                        as={HiX}
                        fontSize="lg"
                        color="neutral.500"
                        transform={isExpanded ? "rotate(0deg)" : "rotate(45deg)"}
                        transition="transform 0.2s ease"
                      />
                    </HStack>
                  </HStack>
                </Box>

                {/* Expanded View */}
                {isExpanded && (
                  <MotionBox
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Box p={6} borderTop="1px solid" borderColor="neutral.100">
                      <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={6}>
                        {/* Left Side - Message Details */}
                        <VStack align="stretch" gap={4}>
                          

                          {/* Full Message */}
                          <Box>
                            <Text fontSize="xs" fontWeight="700" color="neutral.600" mb={2} textTransform="uppercase">
                              Message
                            </Text>
                            <Box
                              p={4}
                              bg="neutral.50"
                              borderRadius="lg"
                              border="1px solid"
                              borderColor="neutral.200"
                            >
                              <Text fontSize="sm" color="neutral.700" lineHeight="1.7">
                                {message.message}
                              </Text>
                            </Box>
                          </Box>
                          {/* Contact Info */}
                          <Box>
                            <Text fontSize="xs" fontWeight="700" color="neutral.600" mb={2} textTransform="uppercase">
                              Contact Information
                            </Text>
                            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={3}>
                              <HStack gap={2}>
                                <Icon as={HiMail} color="primary.500" fontSize="lg" />
                                <VStack align="start" gap={0}>
                                  <Text fontSize="xs" color="neutral.600">Email</Text>
                                  <Text fontSize="sm" fontWeight="600" color="neutral.900">
                                    {message.email}
                                  </Text>
                                </VStack>
                              </HStack>
                              {message.phoneNumber && (
                                <HStack gap={2}>
                                  <Icon as={HiClock} color="primary.500" fontSize="lg" />
                                  <VStack align="start" gap={0}>
                                    <Text fontSize="xs" color="neutral.600">Phone</Text>
                                    <Text fontSize="sm" fontWeight="600" color="neutral.900">
                                      {message.phoneNumber}
                                    </Text>
                                  </VStack>
                                </HStack>
                              )}
                            </Grid>
                          </Box>
                        </VStack>

                        {/* Right Side - Meeting Details & Actions */}
                        <VStack align="stretch" gap={4}>
                          <Box>
                            <Text fontSize="xs" fontWeight="700" color="neutral.600" mb={2} textTransform="uppercase">
                              Meeting Details
                            </Text>
                            <VStack align="stretch" gap={2}>
                              <Box>
                                <Text fontSize="xs" color="neutral.600" mb={1}>Meeting Tool</Text>
                                <Badge colorScheme="purple" fontSize="xs">
                                  {message.meetingTool.replace("-", " ").toUpperCase()}
                                </Badge>
                              </Box>
                              <Box>
                                <Text fontSize="xs" color="neutral.600" mb={1}>Agenda</Text>
                                <Badge colorScheme="blue" fontSize="xs">
                                  {message.agenda.replace("-", " ").toUpperCase()}
                                </Badge>
                              </Box>
                              <Box>
                                <Text fontSize="xs" color="neutral.600" mb={1}>Requested Time</Text>
                                <Text fontSize="sm" fontWeight="600" color="neutral.900">
                                  {new Date(message.dateTime).toLocaleString()}
                                </Text>
                              </Box>
                              <Box>
                                <Text fontSize="xs" color="neutral.600" mb={1}>Submitted</Text>
                                <Text fontSize="sm" fontWeight="600" color="neutral.900">
                                  {new Date(message.submittedDate).toLocaleString()}
                                </Text>
                              </Box>
                              {message.website && (
                                <Box>
                                  <Text fontSize="xs" color="neutral.600" mb={1}>Website</Text>
                                  <Button
                                    size="xs"
                                    variant="outline"
                                    colorScheme="blue"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      window.open(message.website, "_blank")
                                    }}
                                  >
                                    Visit Website
                                  </Button>
                                </Box>
                              )}
                            </VStack>
                          </Box>

                          <VStack align="stretch" gap={2}>
                            <Button
                              size="sm"
                              colorScheme="primary"
                              onClick={(e) => {
                                e.stopPropagation()
                                setSelectedMessage(message)
                              }}
                            >
                              View Full Details
                            </Button>
                            <HStack gap={2}>
                              <Button
                                size="sm"
                                variant="outline"
                                colorScheme="green"
                                flex={1}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  window.location.href = `mailto:${message.email}?subject=Re: ${message.agenda.replace("-", " ")}`
                                }}
                              >
                                Reply
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                colorScheme="blue"
                                flex={1}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  toaster.create({
                                    title: "Marked as Read",
                                    description: `Message from ${message.name} marked as read`,
                                    type: "success",
                                    duration: 3000,
                                  })
                                }}
                              >
                                Mark Read
                              </Button>
                            </HStack>
                          </VStack>
                        </VStack>
                      </Grid>
                    </Box>
                  </MotionBox>
                )}
              </Box>
            )
          })}
        </VStack>
      </VStack>

      {/* Message Modal */}
      <MessageModal
        isOpen={selectedMessage !== null}
        onClose={() => setSelectedMessage(null)}
        message={selectedMessage}
      />
    </>
  )
}
