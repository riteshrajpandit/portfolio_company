import {
  Box,
  Container,
  Text,
  VStack,
  HStack,
  Grid,
  GridItem,
  Icon,
  Button,
  Heading,
  Badge,
  Circle,
} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import {
  HiHome,
  HiChartBar,
  HiMail,
  HiBriefcase,
  HiStar,
  HiCube,
  HiCog,
  HiPhotograph,
  HiUsers,
  HiMenu,
  HiX,
  HiLogout,
  HiClock,
} from "react-icons/hi"
import SEO from "@/components/SEO"
import { toaster } from "@/components/ui/toaster"

const MotionBox = motion(Box)

// Dummy Data
const stats = [
  { label: "Total Visitors", value: "12,456", change: "+12%", icon: HiChartBar, color: "blue" },
  { label: "New Messages", value: "24", change: "+5", icon: HiMail, color: "green" },
  { label: "Job Applications", value: "38", change: "+8", icon: HiBriefcase, color: "purple" },
  { label: "Pending Reviews", value: "6", change: "-2", icon: HiClock, color: "orange" },
]

const recentMessages = [
  { id: 1, name: "John Doe", email: "john@example.com", message: "Interested in your ERP solution...", time: "2 hours ago", status: "unread" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", message: "Need consultation for AI integration...", time: "5 hours ago", status: "unread" },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", message: "Request for demo of Amigaa platform...", time: "1 day ago", status: "read" },
]

const recentApplications = [
  { id: 1, name: "Sarah Wilson", position: "Senior Software Engineer", department: "Engineering", time: "1 hour ago", status: "new" },
  { id: 2, name: "Tom Brown", position: "UI/UX Designer", department: "Design", time: "3 hours ago", status: "reviewing" },
  { id: 3, name: "Lisa Anderson", position: "Product Manager", department: "Product", time: "1 day ago", status: "shortlisted" },
]

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: HiHome, badge: null },
  { id: "analytics", label: "Analytics", icon: HiChartBar, badge: null },
  { id: "messages", label: "Messages", icon: HiMail, badge: 24 },
  { id: "applications", label: "Job Applications", icon: HiBriefcase, badge: 38 },
  { id: "testimonials", label: "Testimonials", icon: HiStar, badge: null },
  { id: "products", label: "Products", icon: HiCube, badge: null },
  { id: "services", label: "Services", icon: HiCog, badge: null },
  { id: "gallery", label: "Gallery", icon: HiPhotograph, badge: null },
  { id: "team", label: "Team Members", icon: HiUsers, badge: null },
]

const AdminDashboardPage = () => {
  const navigate = useNavigate()
  const [activeMenu, setActiveMenu] = useState("dashboard")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [adminUser, setAdminUser] = useState("")

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("admin_token")
    const user = localStorage.getItem("admin_user")
    
    if (!token) {
      navigate("/ioxet-labs-admin")
      return
    }
    
    if (user) {
      setAdminUser(user)
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem("admin_token")
    localStorage.removeItem("admin_user")
    toaster.create({
      title: "Logged Out",
      description: "You have been successfully logged out",
      type: "info",
      duration: 3000,
    })
    navigate("/ioxet-labs-admin")
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

  return (
    <>
      <SEO 
        title="Admin Dashboard - IOXET Labs"
        description="Manage your IOXET content and applications"
      />

      <Box minH="100vh" bg="neutral.50">
        {/* Mobile Header */}
        <Box
          display={{ base: "block", lg: "none" }}
          position="sticky"
          top={0}
          bg="white"
          borderBottom="1px solid"
          borderColor="neutral.200"
          px={4}
          py={3}
          zIndex={10}
        >
          <HStack justify="space-between">
            <HStack gap={3}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                <Icon as={isSidebarOpen ? HiX : HiMenu} fontSize="xl" />
              </Button>
              <Heading fontSize="lg" fontWeight="700" color="primary.500">
                IOXET Admin
              </Heading>
            </HStack>
            <Circle size="32px" bg="primary.500" color="white" fontWeight="600" fontSize="sm">
              {adminUser.charAt(0).toUpperCase()}
            </Circle>
          </HStack>
        </Box>

        <Box display="flex">
          {/* Sidebar */}
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
                    <Icon as={HiHome} color="white" fontSize="xl" />
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
                    onClick={() => {
                      setActiveMenu(item.id)
                      setIsSidebarOpen(false)
                    }}
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
                  onClick={handleLogout}
                >
                  <Icon as={HiLogout} mr={2} />
                  Logout
                </Button>
              </Box>
            </VStack>
          </Box>

          {/* Overlay for mobile */}
          {isSidebarOpen && (
            <Box
              position="fixed"
              top={0}
              left={0}
              right={0}
              bottom={0}
              bg="blackAlpha.600"
              zIndex={15}
              display={{ base: "block", lg: "none" }}
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* Main Content */}
          <Box flex={1} minH="100vh">
            <Container maxW="7xl" py={8}>
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Header */}
                <VStack gap={6} align="stretch" mb={8}>
                  <HStack justify="space-between" flexWrap="wrap" gap={4}>
                    <VStack align="start" gap={1}>
                      <Heading fontSize={{ base: "2xl", md: "3xl" }} fontWeight="700" color="neutral.900">
                        Welcome back, {adminUser}! 👋
                      </Heading>
                      <Text color="neutral.600">
                        Here's what's happening with your platform today.
                      </Text>
                    </VStack>
                    <Text fontSize="sm" color="neutral.500">
                      Last updated: {new Date().toLocaleString()}
                    </Text>
                  </HStack>
                </VStack>

                {/* Stats Grid */}
                <Grid
                  templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
                  gap={6}
                  mb={8}
                >
                  {stats.map((stat, index) => (
                    <MotionBox
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Box
                        p={6}
                        bg="white"
                        borderRadius="xl"
                        border="1px solid"
                        borderColor="neutral.200"
                        _hover={{
                          shadow: "md",
                          borderColor: `${stat.color}.200`
                        }}
                        transition="all 0.3s ease"
                      >
                        <VStack align="start" gap={3}>
                          <HStack justify="space-between" w="full">
                            <Box
                              p={2}
                              bg={`${stat.color}.50`}
                              borderRadius="lg"
                            >
                              <Icon as={stat.icon} fontSize="xl" color={`${stat.color}.500`} />
                            </Box>
                            <Badge
                              colorScheme={stat.change.startsWith("+") ? "green" : "red"}
                              fontSize="xs"
                            >
                              {stat.change}
                            </Badge>
                          </HStack>
                          <VStack align="start" gap={0}>
                            <Text fontSize="2xl" fontWeight="700" color="neutral.900">
                              {stat.value}
                            </Text>
                            <Text fontSize="sm" color="neutral.600">
                              {stat.label}
                            </Text>
                          </VStack>
                        </VStack>
                      </Box>
                    </MotionBox>
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
                        <Button size="sm" variant="ghost" colorScheme="primary">
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
                        <Button size="sm" variant="ghost" colorScheme="primary">
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
              </MotionBox>
            </Container>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default AdminDashboardPage
