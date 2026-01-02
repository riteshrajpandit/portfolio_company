import {
  Box,
  Container,
  Text,
  VStack,
  HStack,
  Icon,
  Button,
  Heading,
  Circle,
} from "@chakra-ui/react"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
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
  HiClock,
  HiKey,
} from "react-icons/hi"
import SEO from "@/components/SEO"
import { toaster } from "@/components/ui/toaster"
import { authUtils } from "@/utils/auth"
import { apiService } from "@/services/api"
import { AdminSidebar } from "@/components/admin/AdminSidebar"
import { DashboardOverview } from "@/components/admin/DashboardOverview"
import { MessagesList } from "@/components/admin/MessagesList"
import { JobsManagement } from "@/components/admin/JobsManagement"
import { ApplicationsManagement } from "@/components/admin/ApplicationsManagement"
import { TestimonialsManagement } from "@/components/admin/TestimonialsManagement"
import { ProductsManagement } from "@/components/admin/ProductsManagement"
import { ServicesManagement } from "@/components/admin/ServicesManagement"
import { GalleryManagement } from "@/components/admin/GalleryManagement"
import { TeamMembersManagement } from "@/components/admin/TeamMembersManagement"
import { CodesManagement } from "@/components/admin/CodesManagement"
import { VisitorsChart, JobsApplicationsChart, MessagesChart } from "@/components/admin/charts"

const MotionBox = motion(Box)

const AdminDashboardPage = () => {
  const navigate = useNavigate()
  const [activeMenu, setActiveMenu] = useState("dashboard")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [adminUser, setAdminUser] = useState("")
  const [analyticsPeriod, setAnalyticsPeriod] = useState("month")
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [applicationsCount, setApplicationsCount] = useState(0)
  const [messagesCount, setMessagesCount] = useState(0)

  // Menu items with dynamic applications count
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: HiHome, badge: null },
    { id: "analytics", label: "Analytics", icon: HiChartBar, badge: null },
    { id: "messages", label: "Messages", icon: HiMail, badge: messagesCount || null },
    { id: "jobs", label: "Manage Jobs", icon: HiBriefcase, badge: null },
    { id: "applications", label: "Job Applications", icon: HiBriefcase, badge: applicationsCount || null },
    { id: "testimonials", label: "Testimonials", icon: HiStar, badge: null },
    { id: "products", label: "Products", icon: HiCube, badge: null },
    { id: "services", label: "Services", icon: HiCog, badge: null },
    { id: "gallery", label: "Gallery", icon: HiPhotograph, badge: null },
    { id: "team", label: "Team Members", icon: HiUsers, badge: null },
    { id: "codes", label: "Codes", icon: HiKey, badge: null },
  ]

  // Stats with dynamic applications count
  const stats = [
    { label: "Total Visitors", value: "12,456", change: "+12%", icon: HiChartBar, color: "blue" },
    { label: "New Messages", value: messagesCount.toString(), change: "+5", icon: HiMail, color: "green" },
    { label: "Job Applications", value: applicationsCount.toString(), change: "+8", icon: HiBriefcase, color: "purple" },
    { label: "Pending Reviews", value: "6", change: "-2", icon: HiClock, color: "orange" },
  ]

  useEffect(() => {
    // Check if user is authenticated using secure auth utils
    if (!authUtils.isAuthenticated()) {
      navigate("/ioxet-labs-admin")
      return
    }
    
    const userData = authUtils.getUser()
    if (userData) {
      setAdminUser(userData.username)
    }
    
    // Fetch applications count
    const fetchApplicationsCount = async () => {
      try {
        const response = await apiService.getJobApplications()
        setApplicationsCount(response.data.length)
      } catch (error) {
        console.error("Failed to fetch applications count:", error)
      }
    }
    
    // Fetch messages count
    const fetchMessagesCount = async () => {
      try {
        const response = await apiService.getMessages()
        setMessagesCount(response.data.length)
      } catch (error) {
        console.error("Failed to fetch messages count:", error)
      }
    }
    
    fetchApplicationsCount()
    fetchMessagesCount()
    
    // Auto-refresh token expiry on activity
    const refreshInterval = setInterval(() => {
      if (authUtils.isAuthenticated()) {
        authUtils.refreshTokenExpiry()
      }
    }, 5 * 60 * 1000) // Refresh every 5 minutes
    
    return () => clearInterval(refreshInterval)
  }, [navigate])

  const handleLogout = () => {
    authUtils.clearAuth()
    toaster.create({
      title: "Logged Out",
      description: "You have been successfully logged out",
      type: "info",
      duration: 3000,
    })
    navigate("/ioxet-labs-admin")
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
          <AdminSidebar
            menuItems={menuItems}
            activeMenu={activeMenu}
            adminUser={adminUser}
            isSidebarOpen={isSidebarOpen}
            onMenuSelect={setActiveMenu}
            onLogout={handleLogout}
            onCloseSidebar={() => setIsSidebarOpen(false)}
          />

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
                      <Heading size="2xl" mb={2}>
                        {activeMenu === "dashboard" && `Welcome back, ${adminUser}! 👋`}
                        {activeMenu === "analytics" && "Analytics Dashboard"}
                        {activeMenu === "messages" && "Messages & Inquiries"}
                        {activeMenu === "jobs" && "Manage Job Postings"}
                        {activeMenu === "applications" && "Job Applications"}
                        {activeMenu === "testimonials" && "Manage Testimonials"}
                        {activeMenu === "products" && "Manage Products"}
                        {activeMenu === "services" && "Manage Services"}
                        {activeMenu === "gallery" && "Manage Gallery"}
                        {activeMenu === "team" && "Manage Team Members"}
                      </Heading>
                      <Text color="neutral.600">
                        {activeMenu === "dashboard" && "Here's what's happening with your platform today."}
                        {activeMenu === "analytics" && "Comprehensive insights into your platform performance"}
                        {activeMenu === "messages" && "Review and respond to customer inquiries"}
                        {activeMenu === "jobs" && "Create and manage job postings"}
                        {activeMenu === "applications" && "Review and manage candidate applications"}
                        {activeMenu === "testimonials" && "Add, edit, and manage client testimonials"}
                        {activeMenu === "products" && "Add, edit, and manage your product offerings"}
                        {activeMenu === "services" && "Add, edit, and manage your service offerings"}
                        {activeMenu === "gallery" && "Manage gallery categories and images"}
                        {activeMenu === "team" && "Add, edit, and manage your team members displayed on About page"}
                      </Text>
                    </VStack>
                    <Text fontSize="sm" color="neutral.500">
                      Last updated: {new Date().toLocaleString()}
                    </Text>
                  </HStack>
                </VStack>

                {/* Dashboard View */}
                {activeMenu === "dashboard" && (
                  <DashboardOverview
                    stats={stats}
                    onViewAllMessages={() => setActiveMenu("messages")}
                    onViewAllApplications={() => setActiveMenu("applications")}
                  />
                )}

                {/* Analytics View */}
                {activeMenu === "analytics" && (
                  <VStack gap={6} align="stretch">
                    {/* Time Period Filter */}
                    <Box bg="white" p={4} rounded="lg" shadow="sm" borderWidth="1px" borderColor="gray.200">
                      <VStack align="stretch" gap={4}>
                        <HStack wrap="wrap" gap={2}>
                          {[
                            { value: "week", label: "Week" },
                            { value: "month", label: "Month" },
                            { value: "3months", label: "3 Months" },
                            { value: "6months", label: "6 Months" },
                            { value: "year", label: "Year" }
                          ].map((period) => (
                            <Button
                              key={period.value}
                              size="sm"
                              variant={analyticsPeriod === period.value ? "solid" : "outline"}
                              colorScheme={analyticsPeriod === period.value ? "blue" : "gray"}
                              onClick={() => setAnalyticsPeriod(period.value)}
                            >
                              {period.label}
                            </Button>
                          ))}
                        </HStack>
                        
                        {/* Month and Year Selector */}
                        {analyticsPeriod === "month" && (
                          <HStack gap={3}>
                            <Box flex={1}>
                              <Text fontSize="xs" fontWeight="semibold" color="gray.600" mb={2}>
                                Month
                              </Text>
                              <select
                                value={selectedMonth}
                                onChange={(e) => setSelectedMonth(Number(e.target.value))}
                                style={{
                                  width: '100%',
                                  padding: '8px 12px',
                                  borderRadius: '6px',
                                  border: '1px solid #E2E8F0',
                                  fontSize: '14px',
                                  backgroundColor: 'white',
                                  cursor: 'pointer'
                                }}
                              >
                                {[
                                  'January', 'February', 'March', 'April', 'May', 'June',
                                  'July', 'August', 'September', 'October', 'November', 'December'
                                ].map((month, index) => (
                                  <option key={index} value={index}>{month}</option>
                                ))}
                              </select>
                            </Box>
                            <Box flex={1}>
                              <Text fontSize="xs" fontWeight="semibold" color="gray.600" mb={2}>
                                Year
                              </Text>
                              <select
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(Number(e.target.value))}
                                style={{
                                  width: '100%',
                                  padding: '8px 12px',
                                  borderRadius: '6px',
                                  border: '1px solid #E2E8F0',
                                  fontSize: '14px',
                                  backgroundColor: 'white',
                                  cursor: 'pointer'
                                }}
                              >
                                {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                                  <option key={year} value={year}>{year}</option>
                                ))}
                              </select>
                            </Box>
                          </HStack>
                        )}
                      </VStack>
                    </Box>                    {/* Website Traffic Chart */}
                    <Box bg="white" p={6} rounded="lg" shadow="md" borderWidth="1px" borderColor="gray.200">
                      <Heading size="md" color="gray.800" mb={4}>
                        Website Traffic
                      </Heading>
                      <VisitorsChart period={analyticsPeriod} month={selectedMonth} year={selectedYear} />
                    </Box>

                    {/* Jobs & Applications Chart */}
                    <Box bg="white" p={6} rounded="lg" shadow="md" borderWidth="1px" borderColor="gray.200">
                      <Heading size="md" color="gray.800" mb={4}>
                        Jobs & Applications
                      </Heading>
                      <JobsApplicationsChart period={analyticsPeriod} month={selectedMonth} year={selectedYear} />
                    </Box>

                    {/* Messages Chart */}
                    <Box bg="white" p={6} rounded="lg" shadow="md" borderWidth="1px" borderColor="gray.200">
                      <Heading size="md" color="gray.800" mb={4}>
                        Messages & Communications
                      </Heading>
                      <MessagesChart period={analyticsPeriod} month={selectedMonth} year={selectedYear} />
                    </Box>
                  </VStack>
                )}

                {/* Messages View */}
                {activeMenu === "messages" && (
                  <MessagesList />
                )}

                {/* Manage Jobs View */}
                {activeMenu === "jobs" && (
                  <JobsManagement />
                )}

                {/* Job Applications View */}
                {activeMenu === "applications" && (
                  <ApplicationsManagement />
                )}

                {/* Testimonials View */}
                {activeMenu === "testimonials" && (
                  <TestimonialsManagement />
                )}

                {/* Products View */}
                {activeMenu === "products" && (
                  <ProductsManagement />
                )}

                {/* Services View */}
                {activeMenu === "services" && (
                  <ServicesManagement />
                )}

                {/* Gallery View */}
                {activeMenu === "gallery" && (
                  <GalleryManagement />
                )}

                {/* Team Members View */}
                {activeMenu === "team" && (
                  <TeamMembersManagement />
                )}

                {/* Codes View */}
                {activeMenu === "codes" && (
                  <CodesManagement />
                )}
              </MotionBox>
            </Container>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default AdminDashboardPage

