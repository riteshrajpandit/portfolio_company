import { Box, VStack, HStack, Text, Heading, Button, Badge, Icon, Circle } from "@chakra-ui/react"
import type { IconType } from "react-icons"

interface MenuItem {
  id: string
  label: string
  icon: IconType
  badge: number | null
}

interface AdminSidebarProps {
  menuItems: MenuItem[]
  activeMenu: string
  adminUser: string
  isSidebarOpen: boolean
  onMenuSelect: (id: string) => void
  onLogout: () => void
  onCloseSidebar: () => void
}

export const AdminSidebar = ({
  menuItems,
  activeMenu,
  adminUser,
  isSidebarOpen,
  onMenuSelect,
  onLogout,
  onCloseSidebar
}: AdminSidebarProps) => {
  const handleMenuClick = (id: string) => {
    onMenuSelect(id)
    onCloseSidebar()
  }

  return (
    <Box
      as="aside"
      position={{ base: "fixed", lg: "sticky" }}
      top={{ base: 0, lg: 0 }}
      left={0}
      h={{ base: "100vh", lg: "100vh" }}
      w={{ base: "280px", lg: "280px" }}
      bg="white"
      borderRight="1px solid"
      borderColor="neutral.200"
      transform={{
        base: isSidebarOpen ? "translateX(0)" : "translateX(-100%)",
        lg: "translateX(0)"
      }}
      transition="transform 0.3s ease"
      zIndex={20}
      overflowY="auto"
    >
      <VStack gap={0} align="stretch" h="full">
        {/* Logo Section */}
        <Box
          p={6}
          borderBottom="1px solid"
          borderColor="neutral.200"
          display={{ base: "none", lg: "block" }}
        >
          <HStack gap={3}>
            <Box
              w="40px"
              h="40px"
              bg="primary.500"
              borderRadius="lg"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Icon as={menuItems[0]?.icon} color="white" fontSize="xl" />
            </Box>
            <VStack align="start" gap={0}>
              <Heading fontSize="lg" fontWeight="700" color="neutral.900">
                IOXET Labs
              </Heading>
              <Text fontSize="xs" color="neutral.600">
                Admin Portal
              </Text>
            </VStack>
          </HStack>
        </Box>

        {/* Menu Items */}
        <VStack gap={1} p={4} flex={1} align="stretch">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={activeMenu === item.id ? "solid" : "ghost"}
              bg={activeMenu === item.id ? "primary.50" : "transparent"}
              color={activeMenu === item.id ? "primary.600" : "neutral.700"}
              justifyContent="start"
              size="md"
              fontWeight="600"
              onClick={() => handleMenuClick(item.id)}
              _hover={{
                bg: activeMenu === item.id ? "primary.100" : "neutral.50"
              }}
              position="relative"
            >
              <HStack gap={3} w="full">
                <Icon as={item.icon} fontSize="lg" />
                <Text flex={1} textAlign="left">{item.label}</Text>
                {item.badge && (
                  <Badge
                    colorScheme="red"
                    borderRadius="full"
                    px={2}
                    fontSize="xs"
                  >
                    {item.badge}
                  </Badge>
                )}
              </HStack>
            </Button>
          ))}
        </VStack>

        {/* User Profile & Logout */}
        <Box
          p={4}
          borderTop="1px solid"
          borderColor="neutral.200"
        >
          <HStack
            gap={3}
            p={3}
            bg="neutral.50"
            borderRadius="lg"
            mb={2}
          >
            <Circle size="32px" bg="primary.500" color="white" fontWeight="600" fontSize="sm">
              {adminUser.charAt(0).toUpperCase()}
            </Circle>
            <VStack align="start" gap={0} flex={1}>
              <Text fontSize="sm" fontWeight="600" color="neutral.900">
                {adminUser}
              </Text>
              <Text fontSize="xs" color="neutral.600">
                Administrator
              </Text>
            </VStack>
          </HStack>
          <Button
            variant="ghost"
            colorScheme="red"
            w="full"
            justifyContent="start"
            onClick={onLogout}
          >
            <Icon as={menuItems[0]?.icon} mr={2} />
            Logout
          </Button>
        </Box>
      </VStack>
    </Box>
  )
}
