import { useState, useEffect } from 'react'
import { 
  Box, 
  Flex, 
  Text, 
  Button, 
  VStack,
  HStack,
  useBreakpointValue,
  Container,
  Image,
  Grid
} from '@chakra-ui/react'
import { Link, useLocation } from 'react-router-dom'
import { HiMenu, HiX, HiChevronDown } from 'react-icons/hi'
import { 
  FaCode, 
  FaRocket, 
  FaCog, 
  FaUsers, 
  FaShieldAlt, 
  FaGraduationCap,
  FaTools,
  FaAward,
  FaBriefcase,
  FaInfoCircle,
  FaHome
} from 'react-icons/fa'
import { AnimatePresence } from 'framer-motion'

interface NavLink {
  name: string
  path: string
  description?: string
  icon?: React.ComponentType<{ size?: number }>
  children?: NavLink[]
  featured?: boolean
  isNew?: boolean
}

interface MegaMenuSection {
  title: string
  items: NavLink[]
}

interface MegaMenuItem {
  name: string
  path: string
  sections: MegaMenuSection[]
  featured?: {
    title: string
    description: string
    image?: string
    cta: string
    link: string
  }
}

const megaMenuItems: MegaMenuItem[] = [
  {
    name: 'Products',
    path: '/products',
    sections: [
      {
        title: 'Core Products',
        items: [
          { 
            name: 'ERP Solutions', 
            path: '/products#erp',
            description: 'Enterprise Resource Planning solutions for streamlined business operations',
            icon: FaCog,
            featured: false
          },
          { 
            name: 'Amigaa Platform', 
            path: '/products#amigaa',
            description: 'Advanced AI-powered platform for intelligent automation',
            icon: FaRocket,
            isNew: false
          }
        ]
      }
    ],
    featured: {
      title: 'New: AI-Powered ERP',
      description: 'Experience the future of business management with our AI-enhanced ERP platform.',
      cta: 'Learn More',
      link: '/products#ai-erp'
    }
  },
  {
    name: 'Services',
    path: '/services',
    sections: [
      {
        title: 'Consulting Services',
        items: [
          { 
            name: 'IT Consulting', 
            path: '/services#it-consulting',
            description: 'Strategic technology guidance for digital transformation',
            icon: FaBriefcase
          },
          { 
            name: 'Security Consulting', 
            path: '/services#security',
            description: 'Comprehensive cybersecurity assessment and implementation',
            icon: FaShieldAlt
          }
        ]
      },
      {
        title: 'Training & Support',
        items: [
          { 
            name: 'Workshop & Training', 
            path: '/services#workshop-training',
            description: 'Professional development and skill enhancement programs',
            icon: FaGraduationCap
          },
          { 
            name: '24/7 Support', 
            path: '/services#support',
            description: 'Round-the-clock technical support and maintenance',
            icon: FaUsers
          }
        ]
      }
    ],
    featured: {
      title: 'Free Consultation',
      description: 'Get expert advice on your digital transformation journey. Book a free 30-minute consultation.',
      cta: 'Book Now',
      link: '/contact'
    }
  },
  {
    name: 'Resources',
    path: '/resources',
    sections: [
      {
        title: 'Trust & Security',
        items: [
          { 
            name: 'FAQs', 
            path: '/resources#faqs',
            description: 'Security certifications, compliance and trust information',
            icon: FaShieldAlt
          },
          { 
            name: 'Documentation/Wiki', 
            path: '/resources#documentation',
            description: 'Industry compliance documentation',
            icon: FaAward
          },
          { 
            name: 'End User Training', 
            path: '/resources#end-user-training',
            description: 'Training resources for end users and administrators',
            icon: FaAward
          }
        ]
      },
      {
        title: 'Tools & Utilities',
        items: [
          { 
            name: 'IOXET Gallery', 
            path: '/resources#ioxet-gallery',
            description: 'Showcase of IOXET solutions and customer success stories',
            icon: FaTools
          },
          { 
            name: 'Case Studies', 
            path: '/resources#case-studies',
            description: 'Comprehensive guides and technical documentation',
            icon: FaCode
          },
          { 
            name: 'Whitepapers', 
            path: '/resources#whitepapers',
            description: 'In-depth research and analysis on industry trends',
            icon: FaCode
          }
        ]
      }
    ],
    featured: {
      title: 'Trust Center',
      description: 'Access whitepapers, case studies, and implementation guides.',
      cta: 'Explore',
      link: '/resources'
    }
  },
  {
    name: 'About Us',
    path: '/about',
    sections: [
      {
        title: 'Company',
        items: [
          { 
            name: 'IOXET Overview', 
            path: '/about',
            description: 'Learn about our mission, vision, and company values',
            icon: FaInfoCircle
          },
          { 
            name: 'Leadership Team', 
            path: '/about#team',
            description: 'Meet our experienced leadership and advisory board',
            icon: FaUsers
          }
        ]
      },
      {
        title: 'Careers',
        items: [
          { 
            name: 'Open Positions', 
            path: '/careers',
            description: 'Join our growing team and build the future together',
            icon: FaBriefcase
          },
          { 
            name: 'Culture & Benefits', 
            path: '/careers#culture',
            description: 'Learn about our work culture and employee benefits',
            icon: FaUsers
          }
        ]
      }
    ],
    featured: {
      title: 'Join Our Team',
      description: 'We\'re hiring talented individuals to join our mission of transforming businesses.',
      cta: 'View Jobs',
      link: '/careers'
    }
  }
]

const simpleNavLinks: NavLink[] = [
  { name: 'Home', path: '/' }
]

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openMobileMenus, setOpenMobileMenus] = useState<string[]>([])
  const location = useLocation()
  const isMobile = useBreakpointValue({ base: true, lg: false })

  // Close mobile menu and reset submenus when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
    setOpenMobileMenus([])
    // Auto-expand parent menu if current page is a submenu item
    const activeParentMenu = megaMenuItems.find(item => 
      item.sections.some(section => 
        section.items.some(navItem => location.pathname === navItem.path)
      )
    )
    if (activeParentMenu) {
      setOpenMobileMenus([activeParentMenu.name])
    }
  }, [location.pathname])

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Prevent scrolling
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = '0px' // Prevent layout shift
    } else {
      // Restore scrolling and close all expanded menus
      document.body.style.overflow = 'unset'
      document.body.style.paddingRight = '0px'
      setOpenMobileMenus([])
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = 'unset'
      document.body.style.paddingRight = '0px'
    }
  }, [isMobileMenuOpen])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Show/hide navbar based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      
      // Add background when scrolled
      setScrolled(currentScrollY > 20)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const toggleMobileMenu = (name: string) => {
    setOpenMobileMenus(prev => {
      // If the clicked menu is already open, close it
      if (prev.includes(name)) {
        return []
      }
      // Otherwise, close all others and open only the clicked one
      return [name]
    })
  }

  const MegaMenuDropdown = ({ item }: { item: MegaMenuItem }) => {
    const [isHovered, setIsHovered] = useState(false)
    const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/')

    const handleMouseEnter = () => setIsHovered(true)
    const handleMouseLeave = () => setIsHovered(false)

    return (
      <Box
        position="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <HStack
          gap={1}
          py={3}
          px={4}
          color={isActive ? "primary.500" : "text"}
          fontWeight={isActive ? "600" : "500"}
          cursor="pointer"
          transition="all 0.2s ease"
          borderBottom="2px solid transparent"
          _hover={{ 
            color: "primary.500",
            borderBottomColor: "primary.500"
          }}
          borderBottomColor={isActive ? "primary.500" : "transparent"}
        >
          <Text fontSize="sm">{item.name}</Text>
          <HiChevronDown 
            size={14} 
            style={{
              transform: isHovered ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease'
            }}
          />
        </HStack>

        {/* Mega Menu Panel */}
        <AnimatePresence>
          {isHovered && (
            <Box
              position="absolute"
              top="100%"
              left="50%"
              transform="translateX(-50%)"
              zIndex={1000}
              marginTop="0px"
              minW="auto"
              maxW="1000px"
            >
              <Box
                bg="white"
                shadow="2xl"
                border="1px solid"
                borderColor="gray.200"
                overflow="hidden"
                position="relative"
              >
                  {/* Remove arrow pointer */}

                  <Flex>
                    {/* Main Content */}
                    <Box flex="1" p={8}>
                      <Grid templateColumns="repeat(2, 1fr)" gap={8}>
                        {item.sections.map((section) => (
                          <Box key={section.title}>
                            <Text
                              fontSize="sm"
                              fontWeight="700"
                              color="gray.900"
                              mb={4}
                              textTransform="uppercase"
                              letterSpacing="wide"
                            >
                              {section.title}
                            </Text>
                            <VStack align="start" gap={3}>
                              {section.items.map((navItem) => (
                                <Link key={navItem.path} to={navItem.path} style={{ textDecoration: 'none', width: '100%' }}>
                                  <HStack
                                    gap={3}
                                    p={3}
                                    transition="all 0.2s ease"
                                    _hover={{ 
                                      bg: "primary.50",
                                      transform: "translateX(4px)"
                                    }}
                                    cursor="pointer"
                                    align="start"
                                  >
                                    {navItem.icon && (
                                      <Box
                                        p={2}
                                        bg="primary.100"
                                        color="primary.500"
                                        flexShrink={0}
                                      >
                                        <navItem.icon size={16} />
                                      </Box>
                                    )}
                                    <Box flex="1">
                                      <HStack gap={2} align="center" mb={1}>
                                        <Text
                                          fontSize="sm"
                                          fontWeight="600"
                                          color="gray.900"
                                        >
                                          {navItem.name}
                                        </Text>
                                        {navItem.isNew && (
                                          <Box
                                            px={2}
                                            py={0.5}
                                            bg="green.100"
                                            color="green.600"
                                            fontSize="xs"
                                            fontWeight="600"
                                          >
                                            NEW
                                          </Box>
                                        )}
                                        {navItem.featured && (
                                          <Box
                                            px={2}
                                            py={0.5}
                                            bg="orange.100"
                                            color="orange.600"
                                            fontSize="xs"
                                            fontWeight="600"
                                          >
                                            FEATURED
                                          </Box>
                                        )}
                                      </HStack>
                                      <Text
                                        fontSize="xs"
                                        color="gray.600"
                                        lineHeight="1.4"
                                        minW="160px"
                                      >
                                        {navItem.description}
                                      </Text>
                                    </Box>
                                  </HStack>
                                </Link>
                              ))}
                            </VStack>
                          </Box>
                        ))}
                      </Grid>
                    </Box>

                    {/* Featured Section */}
                    {item.featured && (
                      <Box
                        w="300px"
                        bg="gradient-to-br from-primary-50 to-primary-100"
                        p={6}
                        borderLeft="1px solid"
                        borderColor="gray.100"
                      >
                        <VStack align="start" gap={4} h="full">
                          <Box>
                            <Text
                              fontSize="lg"
                              fontWeight="700"
                              color="primary.600"
                              mb={2}
                            >
                              {item.featured.title}
                            </Text>
                            <Text
                              fontSize="sm"
                              color="gray.700"
                              lineHeight="1.5"
                            >
                              {item.featured.description}
                            </Text>
                          </Box>
                          <Link to={item.featured.link} style={{ textDecoration: 'none' }}>
                            <Button
                              size="sm"
                              colorScheme="primary"
                              fontWeight="600"
                              _hover={{
                                transform: "translateY(-1px)"
                              }}
                              transition="all 0.2s ease"
                            >
                              {item.featured.cta} →
                            </Button>
                          </Link>
                        </VStack>
                      </Box>
                    )}
                  </Flex>
                </Box>
            </Box>
          )}
        </AnimatePresence>
      </Box>
    )
  }

  const SimpleNavItem = ({ link }: { link: NavLink }) => {
    const isActive = location.pathname === link.path || location.pathname.startsWith(link.path + '/')

    return (
      <Link to={link.path} style={{ textDecoration: 'none' }}>
        <Text
          py={3}
          px={4}
          color={isActive ? "primary.500" : "text"}
          fontWeight={isActive ? "600" : "500"}
          fontSize="sm"
          transition="all 0.2s ease"
          borderBottom="2px solid transparent"
          borderBottomColor={isActive ? "primary.500" : "transparent"}
          _hover={{ 
            color: "primary.500",
            borderBottomColor: "primary.500"
          }}
        >
          {link.name}
        </Text>
      </Link>
    )
  }

  return (
    <>
      <Box
        as="nav"
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={1000}
        transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
        transform={isVisible ? "translateY(0)" : "translateY(-100%)"}
        bg={scrolled ? "card" : "transparent"}
        backdropFilter={scrolled ? "blur(20px)" : "none"}
        borderBottom={scrolled ? "1px solid" : "none"}
        borderColor="border"
        shadow={scrolled ? "xl" : "none"}
      >
        <Container maxW="7xl">
          <Flex
            align="center"
            justify="space-between"
            py={4}
          >
            {/* Logo */}
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                transition="all 0.2s ease"
                _hover={{ 
                  transform: "scale(1.02)"
                }}
              >
                <Image
                  src="/ioxet-labs.svg"
                  alt="IOXET Labs"
                  width="150px"
                  height="40px"
                  bg="transparent"
                />
              </Box>
            </Link>

            {/* Desktop Navigation */}
            {!isMobile && (
              <HStack gap={2}>
                {simpleNavLinks.map((link) => (
                  <SimpleNavItem key={link.path} link={link} />
                ))}
                {megaMenuItems.map((item) => (
                  <MegaMenuDropdown key={item.path} item={item} />
                ))}
              </HStack>
            )}

            {/* Right side controls */}
            <HStack gap={3}>
              <Link to="/contact" style={{ textDecoration: 'none' }}>
                <Button
                  variant="solid"
                  bg="primary.500"
                  colorScheme="primary"
                  size="sm"
                  px={6}
                  fontWeight="600"
                  display={{ base: 'none', md: 'flex' }}
                  _hover={{ 
                    bg: "primary.600",
                    transform: "translateY(-1px)"
                  }}
                  transition="all 0.2s ease"
                >
                  Let's Meet
                </Button>
              </Link>

              {isMobile && (
                <Button
                  aria-label="Open menu"
                  variant="ghost"
                  color="text"
                  size="sm"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  _hover={{ 
                    bg: "primary.50",
                    color: "primary.500"
                  }}
                  transition="all 0.2s ease"
                  minW="auto"
                  px={2}
                >
                  {isMobileMenuOpen ? <HiX size={20} /> : <HiMenu size={20} />}
                </Button>
              )}
            </HStack>
          </Flex>
        </Container>
      </Box>

      {/* Mobile Sidebar Overlay */}
      {isMobile && isMobileMenuOpen && (
        <Box
          position="fixed"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="blackAlpha.600"
          zIndex={999}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar Menu */}
      {isMobile && (
        <Box
          position="fixed"
          top={0}
          right={0}
          bottom={0}
          w={{ base: "85vw", sm: "320px" }}
          maxW="320px"
          bg={scrolled ? "card" : "white"}
          backdropFilter="blur(20px)"
          border="1px solid"
          borderColor="border"
          shadow="xl"
          transform={isMobileMenuOpen ? "translateX(0)" : "translateX(100%)"}
          transition="transform 0.3s ease"
          zIndex={1000}
          overflowY="auto"
          display="flex"
          flexDirection="column"
        >
          {/* Header */}
          <Box p={6} borderBottom="1px solid" borderColor="border" flexShrink={0}>
            <HStack justify="space-between" align="center">
              <Image
                src="/ioxet-labs.svg"
                alt="IOXET Labs"
                width="120px"
                height="32px"
                bg="transparent"
              />
              <Button
                aria-label="Close menu"
                variant="ghost"
                color="text"
                size="sm"
                onClick={() => setIsMobileMenuOpen(false)}
                _hover={{ 
                  bg: "primary.50",
                  color: "primary.500"
                }}
                transition="all 0.2s ease"
                minW="auto"
                px={2}
              >
                <HiX size={20} />
              </Button>
            </HStack>
          </Box>

          {/* Navigation Items */}
          <VStack align="stretch" gap={0} p={4} flex="1" overflowY="auto">
            {/* Home */}
            {simpleNavLinks.map((link) => {
              const isActive = location.pathname === link.path
              return (
                <Link key={link.path} to={link.path} style={{ textDecoration: 'none' }}>
                  <HStack
                    gap={4}
                    py={3}
                    px={4}
                    cursor="pointer"
                    onClick={() => setIsMobileMenuOpen(false)}
                    bg={isActive ? "primary.50" : "transparent"}
                    color={isActive ? "primary.500" : "text"}
                    _hover={{ 
                      bg: "primary.50",
                      color: "primary.500"
                    }}
                    transition="all 0.2s ease"
                  >
                    <Box>
                      <FaHome size={18} />
                    </Box>
                    <Text fontWeight="500">{link.name}</Text>
                  </HStack>
                </Link>
              )
            })}

            {/* Mega menu items as collapsible sections */}
            {megaMenuItems.map((item) => {
              const isItemActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/')
              const hasActiveSubItem = item.sections.some(section => 
                section.items.some(navItem => location.pathname === navItem.path)
              )
              const isExpanded = openMobileMenus.includes(item.name)
              
              return (
                <Box key={item.path}>
                  <HStack
                    gap={4}
                    py={4}
                    px={4}
                    cursor="pointer"
                    onClick={() => toggleMobileMenu(item.name)}
                    bg={(isItemActive || hasActiveSubItem) ? "primary.50" : "transparent"}
                    color={(isItemActive || hasActiveSubItem) ? "primary.500" : "text"}
                    _hover={{ 
                      bg: "primary.50",
                      color: "primary.500"
                    }}
                    transition="all 0.2s ease"
                    borderLeft={(isItemActive || hasActiveSubItem) ? "4px solid" : "4px solid transparent"}
                    borderColor={(isItemActive || hasActiveSubItem) ? "primary.500" : "transparent"}
                    fontWeight={(isItemActive || hasActiveSubItem) ? "600" : "500"}
                  >
                    <Box>
                      {item.name === 'Products' && <FaCog size={18} />}
                      {item.name === 'Services' && <FaTools size={18} />}
                      {item.name === 'Resources' && <FaAward size={18} />}
                      {item.name === 'About Us' && <FaInfoCircle size={18} />}
                    </Box>
                    <Text flex="1" fontWeight="inherit">
                      {item.name}
                    </Text>
                    <Box 
                      p={1}
                      bg={(isItemActive || hasActiveSubItem) ? "primary.500" : "gray.100"}
                      color={(isItemActive || hasActiveSubItem) ? "white" : "gray.500"}
                      borderRadius="md"
                      transition="all 0.2s ease"
                    >
                      <HiChevronDown 
                        size={14} 
                        style={{
                          transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.2s ease'
                        }}
                      />
                    </Box>
                  </HStack>
                  
                  {isExpanded && (
                    <Box
                      overflow="hidden"
                      transition="all 0.3s ease"
                    >
                      <VStack align="stretch" pl={8} gap={0} py={2}>
                        {item.sections.map((section) => (
                          <Box key={section.title}>
                            <Text
                              fontSize="xs"
                              fontWeight="700"
                              color="muted"
                              py={3}
                              px={4}
                              textTransform="uppercase"
                              letterSpacing="wide"
                              bg="gray.50"
                            >
                              {section.title}
                            </Text>
                            {section.items.map((navItem) => {
                              const isSubItemActive = location.pathname === navItem.path
                              return (
                                <Link key={navItem.path} to={navItem.path} style={{ textDecoration: 'none' }}>
                                  <HStack
                                    gap={3}
                                    py={3}
                                    px={4}
                                    cursor="pointer"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    bg={isSubItemActive ? "primary.100" : "transparent"}
                                    color={isSubItemActive ? "primary.600" : "muted"}
                                    _hover={{ 
                                      bg: "primary.50",
                                      color: "primary.500",
                                      transform: "translateX(4px)"
                                    }}
                                    transition="all 0.2s ease"
                                    borderLeft={isSubItemActive ? "3px solid" : "3px solid transparent"}
                                    borderColor={isSubItemActive ? "primary.500" : "transparent"}
                                  >
                                    {navItem.icon && (
                                      <Box
                                        p={1.5}
                                        bg={isSubItemActive ? "primary.500" : "gray.100"}
                                        color={isSubItemActive ? "white" : "gray.600"}
                                        borderRadius="md"
                                        transition="all 0.2s ease"
                                      >
                                        <navItem.icon size={14} />
                                      </Box>
                                    )}
                                    <Box flex="1">
                                      <Text fontSize="sm" fontWeight="500">
                                        {navItem.name}
                                      </Text>
                                      {navItem.description && (
                                        <Text fontSize="xs" color="gray.500" mt={0.5} lineHeight="1.3">
                                          {navItem.description}
                                        </Text>
                                      )}
                                    </Box>
                                    <HStack gap={1}>
                                      {navItem.isNew && (
                                        <Box
                                          px={2}
                                          py={0.5}
                                          bg="green.100"
                                          color="green.600"
                                          fontSize="xs"
                                          fontWeight="600"
                                          borderRadius="full"
                                        >
                                          NEW
                                        </Box>
                                      )}
                                      {navItem.featured && (
                                        <Box
                                          px={2}
                                          py={0.5}
                                          bg="orange.100"
                                          color="orange.600"
                                          fontSize="xs"
                                          fontWeight="600"
                                          borderRadius="full"
                                        >
                                          ★
                                        </Box>
                                      )}
                                    </HStack>
                                  </HStack>
                                </Link>
                              )
                            })}
                          </Box>
                        ))}
                      </VStack>
                    </Box>
                  )}
                </Box>
              )
            })}
          </VStack>

          {/* Bottom CTA Section */}
          <Box p={4} borderTop="1px solid" borderColor="border" flexShrink={0}>
            <Link to="/contact" style={{ textDecoration: 'none' }}>
              <Button
                bg="primary.500"
                color="white"
                w="full"
                py={3}
                fontWeight="600"
                onClick={() => setIsMobileMenuOpen(false)}
                _hover={{ 
                  bg: "primary.600",
                  transform: "translateY(-1px)"
                }}
                transition="all 0.2s ease"
              >
                Let's Meet
              </Button>
            </Link>
          </Box>
        </Box>
      )}
    </>
  )
}

export default Navbar