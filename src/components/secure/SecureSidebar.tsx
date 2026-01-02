import { Box, VStack, Text, Button, Drawer } from "@chakra-ui/react"
import { Link as ScrollLink } from "react-scroll"
import { useState } from "react"
import { HiMenu } from "react-icons/hi"

interface Topic {
  id: string
  title: string
}

interface SecureSidebarProps {
  topics: Topic[]
}

export const SecureSidebar = ({ topics }: SecureSidebarProps) => {
  const [activeId, setActiveId] = useState<string>("")
  const [open, setOpen] = useState(false)

  const LinksList = ({ onItemClick }: { onItemClick?: () => void }) => (
    <VStack align="stretch" gap={1}>
      {topics.map((topic) => (
        <ScrollLink
          key={topic.id}
          to={topic.id}
          spy={true}
          smooth={true}
          offset={-100}
          duration={500}
          onSetActive={() => setActiveId(topic.id)}
          onClick={onItemClick}
        >
          <Button
            variant="ghost"
            justifyContent="flex-start"
            w="full"
            size="sm"
            color={activeId === topic.id ? "blue.400" : "gray.400"}
            bg={activeId === topic.id ? "blue.400/10" : "transparent"}
            _hover={{
              color: "blue.300",
              bg: "blue.400/5",
            }}
            fontWeight={activeId === topic.id ? "semibold" : "medium"}
            borderRadius="lg"
            px={4}
          >
            {topic.title}
          </Button>
        </ScrollLink>
      ))}
    </VStack>
  )

  return (
    <Box
      w={{ base: "full", lg: "300px" }}
      h={{ base: "auto", lg: "calc(100vh - 4rem)" }}
      position={{ base: "relative", lg: "sticky" }}
      top={{ base: 0, lg: "2rem" }}
      pr={{ base: 0, lg: 4 }}
    >
      {/* Desktop View */}
      <Box display={{ base: "none", lg: "block" }} h="full" overflowY="auto" className="custom-scrollbar">
        <Text
          fontSize="xs"
          fontWeight="bold"
          textTransform="uppercase"
          letterSpacing="wider"
          color="gray.500"
          mb={4}
          px={4}
        >
          Contents
        </Text>
        <LinksList />
      </Box>

      {/* Mobile View */}
      <Box 
        display={{ base: "block", lg: "none" }} 
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={50}
        bg="gray.950/80"
        backdropFilter="blur(12px)"
        borderBottom="1px solid"
        borderColor="whiteAlpha.100"
        px={4}
        py={3}
      >
        <Drawer.Root open={open} onOpenChange={(e) => setOpen(e.open)} placement="start">
          <Drawer.Trigger asChild>
            <Button 
              variant="ghost" 
              color="gray.300"
              gap={2}
              px={0}
              _hover={{ color: "white", bg: "transparent" }}
            >
              <HiMenu size={20} />
              Contents
            </Button>
          </Drawer.Trigger>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content bg="gray.900" borderRight="1px solid" borderColor="whiteAlpha.200">
              <Drawer.Header>
                <Drawer.Title color="white">Table of Contents</Drawer.Title>
                <Drawer.CloseTrigger color="gray.400" />
              </Drawer.Header>
              <Drawer.Body>
                <LinksList onItemClick={() => setOpen(false)} />
              </Drawer.Body>
            </Drawer.Content>
          </Drawer.Positioner>
        </Drawer.Root>
      </Box>
      
      {/* Mobile Spacer */}
      <Box display={{ base: "block", lg: "none" }} h="60px" />
    </Box>
  )
}
