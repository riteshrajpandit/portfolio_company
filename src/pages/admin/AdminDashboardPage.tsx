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
import { VisitorsChart, JobsApplicationsChart, MessagesChart } from "@/components/admin/charts"

const MotionBox = motion(Box)



const recentMessages = [
  { id: 1, name: "John Doe", email: "john@example.com", message: "Interested in your ERP solution...", time: "2 hours ago", status: "unread" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", message: "Need consultation for AI integration...", time: "5 hours ago", status: "unread" },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", message: "Request for demo of Amigaa platform...", time: "1 day ago", status: "read" },
]

const allMessages = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    company: "Tech Solutions Inc.",
    phoneNumber: "+1 555-0123",
    website: "https://techsolutions.com",
    meetingTool: "zoom",
    agenda: "erp-solutions",
    dateTime: "2024-03-20T10:00",
    message: "We are interested in implementing your ERP solution for our manufacturing business. We have about 200 employees and need a comprehensive system that can handle inventory, production planning, and financial management. Could we schedule a demo to discuss our specific requirements?",
    submittedDate: "2024-03-18T14:30:00",
    status: "unread"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@gmail.com",
    company: "Startup",
    phoneNumber: "+1 555-0456",
    website: "",
    meetingTool: "google-meet",
    agenda: "ai-consulting",
    dateTime: "2024-03-21T14:00",
    message: "I'm working on a startup idea that involves AI-powered customer service automation. I've heard great things about your Amigaa platform and would love to learn more about how it could fit into our tech stack. Looking forward to connecting!",
    submittedDate: "2024-03-18T09:15:00",
    status: "unread"
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.johnson@enterprise.com",
    company: "Enterprise Corp",
    phoneNumber: "+1 555-0789",
    website: "https://enterprisecorp.com",
    meetingTool: "microsoft-teams",
    agenda: "security-consulting",
    dateTime: "2024-03-19T16:00",
    message: "Our organization is looking to enhance our cybersecurity infrastructure. We need a comprehensive security audit and implementation of best practices. We have multiple offices and cloud infrastructure that needs to be secured. Can you help us with this?",
    submittedDate: "2024-03-17T11:45:00",
    status: "read"
  },
  {
    id: 4,
    name: "Sarah Williams",
    email: "sarah.williams@retail.com",
    company: "Retail Masters",
    phoneNumber: "+1 555-0321",
    website: "https://retailmasters.com",
    meetingTool: "zoom",
    agenda: "web-development",
    dateTime: "2024-03-22T11:00",
    message: "We need to revamp our e-commerce website with modern features including real-time inventory, personalized recommendations, and seamless checkout experience. Our current site is outdated and we're losing customers. What's your approach to e-commerce development?",
    submittedDate: "2024-03-17T08:20:00",
    status: "read"
  },
  {
    id: 5,
    name: "David Chen",
    email: "david.chen@mobile.com",
    company: "MobileFirst Solutions",
    phoneNumber: "+1 555-0654",
    website: "https://mobilefirstsolutions.com",
    meetingTool: "phone",
    agenda: "mobile-development",
    dateTime: "2024-03-23T15:30",
    message: "We're planning to launch a mobile app for our delivery service. Need both iOS and Android versions with features like real-time tracking, payment integration, and push notifications. What's your experience with similar projects?",
    submittedDate: "2024-03-16T16:00:00",
    status: "replied"
  },
  {
    id: 6,
    name: "Emily Rodriguez",
    email: "emily.r@consulting.com",
    company: "N/A",
    phoneNumber: "+1 555-0987",
    website: "",
    meetingTool: "in-person",
    agenda: "it-consulting",
    dateTime: "2024-03-25T10:00",
    message: "I'm an independent consultant looking to partner with your team for a large client project. They need IT infrastructure redesign and cloud migration. Would love to discuss collaboration opportunities.",
    submittedDate: "2024-03-16T13:30:00",
    status: "replied"
  },
]

const recentApplications = [
  { id: 1, name: "Sarah Wilson", position: "Senior Software Engineer", department: "Engineering", time: "1 hour ago", status: "new" },
  { id: 2, name: "Tom Brown", position: "UI/UX Designer", department: "Design", time: "3 hours ago", status: "reviewing" },
  { id: 3, name: "Lisa Anderson", position: "Product Manager", department: "Product", time: "1 day ago", status: "shortlisted" },
]



const AdminDashboardPage = () => {
  const navigate = useNavigate()
  const [activeMenu, setActiveMenu] = useState("dashboard")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [adminUser, setAdminUser] = useState("")
  const [analyticsPeriod, setAnalyticsPeriod] = useState("month")
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [applicationsCount, setApplicationsCount] = useState(0)

  // Menu items with dynamic applications count
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: HiHome, badge: null },
    { id: "analytics", label: "Analytics", icon: HiChartBar, badge: null },
    { id: "messages", label: "Messages", icon: HiMail, badge: 24 },
    { id: "jobs", label: "Manage Jobs", icon: HiBriefcase, badge: null },
    { id: "applications", label: "Job Applications", icon: HiBriefcase, badge: applicationsCount || null },
    { id: "testimonials", label: "Testimonials", icon: HiStar, badge: null },
    { id: "products", label: "Products", icon: HiCube, badge: null },
    { id: "services", label: "Services", icon: HiCog, badge: null },
    { id: "gallery", label: "Gallery", icon: HiPhotograph, badge: null },
    { id: "team", label: "Team Members", icon: HiUsers, badge: null },
  ]

  // Stats with dynamic applications count
  const stats = [
    { label: "Total Visitors", value: "12,456", change: "+12%", icon: HiChartBar, color: "blue" },
    { label: "New Messages", value: "24", change: "+5", icon: HiMail, color: "green" },
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
    
    fetchApplicationsCount()
    
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
                    recentMessages={recentMessages}
                    recentApplications={recentApplications}
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
                  <MessagesList messages={allMessages} />
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
              </MotionBox>
            </Container>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default AdminDashboardPage

