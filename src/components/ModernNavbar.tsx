import { useState, useEffect } from 'react'
import { 
  Box, 
  Flex, 
  Text, 
  Button, 
  VStack,
  HStack,
  useBreakpointValue,
  Container
} from '@chakra-ui/react'
import { Link, useLocation } from 'react-router-dom'
import { HiMenu, HiX, HiChevronDown } from 'react-icons/hi'
import { motion, AnimatePresence } from 'framer-motion'

interface NavLink {
  name: string
  path: string
  description?: string
  children?: NavLink[]
}

const navLinks: NavLink[] = [
  { name: 'Home', path: '/' },
  { 
    name: 'About', 
    path: '/about',
    children: [
      { 
        name: 'Our Story', 
        path: '/about/story',
        description: 'Discover our journey and mission to transform digital experiences'
      },
      { 
        name: 'Team', 
        path: '/about/team',
        description: 'Meet the talented professionals behind our success'
      },
      { 
        name: 'Careers', 
        path: '/about/careers',
        description: 'Join our growing team and build the future together'
      }
    ]
  },
  { 
    name: 'Services', 
    path: '/services',
    children: [
      { 
        name: 'Web Development', 
        path: '/services/web',
        description: 'Modern, responsive websites that drive business growth'
      },
      { 
        name: 'Mobile Apps', 
        path: '/services/mobile',
        description: 'Native and cross-platform mobile solutions'
      },
      { 
        name: 'Consulting', 
        path: '/services/consulting',
        description: 'Strategic technology guidance for digital transformation'
      },
      { 
        name: 'Support', 
        path: '/services/support',
        description: '24/7 technical support and maintenance services'
      }
    ]
  },
  { 
    name: 'Portfolio', 
    path: '/portfolio',
    children: [
      { 
        name: 'Web Projects', 
        path: '/portfolio/web',
        description: 'Showcase of our most impactful web applications'
      },
      { 
        name: 'Mobile Apps', 
        path: '/portfolio/mobile',
        description: 'Mobile solutions that delight users and drive engagement'
      },
      { 
        name: 'Case Studies', 
        path: '/portfolio/cases',
        description: 'Deep dives into our most successful project outcomes'
      }
    ]
  },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' }
]

const ModernNavbar = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [expandedMobileItems, setExpandedMobileItems] = useState<string[]>([])
  const location = useLocation()
  const isMobile = useBreakpointValue({ base: true, lg: false })

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
    setExpandedMobileItems([])
  }, [location.pathname])

  // Handle mobile submenu toggle
  const toggleMobileSubmenu = (itemName: string) => {
    setExpandedMobileItems(prev => 
      prev.includes(itemName) 
        ? prev.filter(item => item !== itemName)
        : [...prev, itemName]
    )
  }

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

  const NavItem = ({ link, isMobile = false }: { link: NavLink; isMobile?: boolean }) => {
    const [isHovered, setIsHovered] = useState(false)
    const [hoveredChild, setHoveredChild] = useState<string | null>(null)
    const [globalTimeout, setGlobalTimeout] = useState<number | null>(null)
    const isActive = location.pathname === link.path || location.pathname.startsWith(link.path + '/')
    const isExpanded = expandedMobileItems.includes(link.name)

    // Mobile menu item click handler
    const handleMobileClick = () => {
      if (link.children && isMobile) {
        toggleMobileSubmenu(link.name)
      } else {
        setIsMobileMenuOpen(false)
      }
    }

    // Universal hover management - keeps everything connected
    const handleEnterHoverZone = () => {
      if (globalTimeout) {
        clearTimeout(globalTimeout)
        setGlobalTimeout(null)
      }
      setIsHovered(true)
    }

    const handleLeaveHoverZone = () => {
      const timeout = setTimeout(() => {
        setIsHovered(false)
        setHoveredChild(null)
      }, 150)
      setGlobalTimeout(timeout)
    }

    // Child-specific hover (for showing detail panels)
    const handleChildHover = (childName: string) => {
      if (globalTimeout) {
        clearTimeout(globalTimeout)
        setGlobalTimeout(null)
      }
      setIsHovered(true) // Keep main menu open
      setHoveredChild(childName)
    }

    // Get detailed content for each submenu item
    const getChildDetails = (childName: string, parentName: string) => {
      const details: { [key: string]: { [key: string]: { title: string; description: string; features: string[] } } } = {
        About: {
          'Our Story': {
            title: 'Our Journey & Mission',
            description: 'Founded with a vision to transform digital experiences, IOXET has been at the forefront of innovation, helping businesses navigate the digital landscape with cutting-edge solutions.',
            features: ['Founded in 2020', 'Global reach across 15+ countries', 'Award-winning design team', 'ISO certified processes']
          },
          'Team': {
            title: 'Meet Our Experts',
            description: 'Our diverse team of talented professionals brings together years of experience in design, development, and digital strategy to deliver exceptional results.',
            features: ['50+ skilled professionals', 'Average 8+ years experience', 'Cross-functional expertise', 'Continuous learning culture']
          },
          'Careers': {
            title: 'Join Our Growing Team',
            description: 'Be part of an innovative company that values creativity, collaboration, and growth. We offer exciting opportunities to work on cutting-edge projects.',
            features: ['Remote-first culture', 'Competitive compensation', 'Learning & development budget', 'Flexible working hours']
          }
        },
        Services: {
          'Web Development': {
            title: 'Custom Web Solutions',
            description: 'From responsive websites to complex web applications, we create digital experiences that engage users and drive business growth.',
            features: ['React, Vue, Angular expertise', 'Full-stack development', 'Performance optimization', 'SEO-friendly architecture']
          },
          'Mobile Apps': {
            title: 'Native & Cross-Platform',
            description: 'Build powerful mobile applications that deliver seamless user experiences across iOS and Android platforms.',
            features: ['React Native & Flutter', 'Native iOS & Android', 'App Store optimization', 'Push notifications & analytics']
          },
          'UI/UX Design': {
            title: 'User-Centered Design',
            description: 'Create intuitive and beautiful interfaces that users love, backed by research and data-driven design decisions.',
            features: ['User research & testing', 'Prototyping & wireframing', 'Design systems', 'Accessibility compliance']
          }
        },
        Portfolio: {
          'Web Projects': {
            title: 'Web Development Showcase',
            description: 'Explore our latest web development projects featuring modern technologies and innovative design approaches.',
            features: ['E-commerce platforms', 'SaaS applications', 'Corporate websites', 'Progressive web apps']
          },
          'Mobile Apps': {
            title: 'Mobile App Portfolio',
            description: 'Discover our mobile applications that have transformed user experiences and driven business success.',
            features: ['iOS & Android apps', 'Cross-platform solutions', 'Enterprise mobility', 'Consumer applications']
          },
          'Case Studies': {
            title: 'Success Stories',
            description: 'In-depth case studies showcasing our problem-solving approach and the impact of our solutions on client businesses.',
            features: ['Detailed project breakdowns', 'Challenge & solution analysis', 'Results & metrics', 'Client testimonials']
          }
        }
      }
      
      return details[parentName]?.[childName] || {
        title: childName,
        description: 'Learn more about this service',
        features: []
      }
    }

    if (link.children && !isMobile) {
      return (
        <Box
          position="relative"
          onMouseEnter={handleEnterHoverZone}
          onMouseLeave={handleLeaveHoverZone}
        >
          <HStack
            gap={1}
            py={2}
            px={4}
            borderRadius="full"
            color={isActive ? "primary.500" : "text"}
            fontWeight={isActive ? "600" : "500"}
            cursor="pointer"
            transition="all 0.3s ease"
            _hover={{ 
              bg: "primary.50",
              color: "primary.500"
            }}
          >
            <Text fontSize="sm">{link.name}</Text>
            <motion.div
              animate={{ rotate: isHovered ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <HiChevronDown size={14} />
            </motion.div>
          </HStack>

          {/* Complete Hover Zone Container */}
          <AnimatePresence>
            {isHovered && (
              <Box
                position="absolute"
                top="100%"
                left="0"
                zIndex={1000}
                marginTop="8px"
                onMouseEnter={handleEnterHoverZone}
                onMouseLeave={handleLeaveHoverZone}
              >
                <Flex align="start" gap={3}>
                  {/* Primary Submenu Panel */}
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <Box
                      bg="white"
                      borderRadius="xl"
                      shadow="xl"
                      border="1px solid"
                      borderColor="gray.100"
                      backdropFilter="blur(20px)"
                      overflow="hidden"
                      minW="200px"
                      position="relative"
                    >
                      {/* Arrow pointer - positioned relative to the menu button */}
                      <Box
                        position="absolute"
                        top="-6px"
                        left="32px"
                        width="12px"
                        height="12px"
                        bg="white"
                        borderTop="1px solid"
                        borderLeft="1px solid"
                        borderColor="gray.100"
                        borderRadius="2px"
                        style={{ rotate: '45deg' }}
                      />

                      {/* Menu Items */}
                      <VStack gap={0} p={2}>
                        {link.children.map((child, index) => (
                          <motion.div
                            key={child.path}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ 
                              duration: 0.3, 
                              delay: index * 0.05,
                              ease: "easeOut"
                            }}
                            style={{ width: '100%' }}
                          >
                            <Box
                              px={4}
                              py={3}
                              borderRadius="lg"
                              transition="all 0.2s ease"
                              bg={hoveredChild === child.name ? "primary.50" : "transparent"}
                              _hover={{ 
                                bg: "primary.50",
                                transform: "translateX(4px)"
                              }}
                              cursor="pointer"
                              width="100%"
                              onMouseEnter={() => handleChildHover(child.name)}
                            >
                              <Link to={child.path} style={{ textDecoration: 'none', width: '100%' }}>
                                <Text
                                  fontSize="sm"
                                  fontWeight="600"
                                  color="text"
                                >
                                  {child.name}
                                </Text>
                              </Link>
                            </Box>
                          </motion.div>
                        ))}
                      </VStack>
                    </Box>
                  </motion.div>

                  {/* Detailed Content Panel */}
                  <AnimatePresence mode="wait">
                    {hoveredChild && (
                      <motion.div
                        key={hoveredChild}
                        initial={{ opacity: 0, x: 20, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 20, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                      >
                        <Box
                          bg="white"
                          borderRadius="2xl"
                          shadow="2xl"
                          border="1px solid"
                          borderColor="gray.100"
                          backdropFilter="blur(20px)"
                          overflow="hidden"
                          w="350px"
                        >
                          {(() => {
                            const details = getChildDetails(hoveredChild, link.name)
                            return (
                              <>
                                {/* Header */}
                                <Box
                                  px={6}
                                  py={4}
                                  bg="primary.50"
                                  borderBottom="1px solid"
                                  borderColor="gray.100"
                                >
                                  <Text
                                    fontSize="lg"
                                    fontWeight="700"
                                    color="primary.600"
                                    mb={1}
                                  >
                                    {details.title}
                                  </Text>
                                </Box>

                                {/* Content */}
                                <VStack align="start" p={6} gap={4}>
                                  <Text
                                    fontSize="sm"
                                    color="muted"
                                    lineHeight="1.6"
                                  >
                                    {details.description}
                                  </Text>

                                  {details.features.length > 0 && (
                                    <Box>
                                      <Text
                                        fontSize="xs"
                                        fontWeight="600"
                                        color="text"
                                        mb={2}
                                        textTransform="uppercase"
                                        letterSpacing="wide"
                                      >
                                        Key Features
                                      </Text>
                                      <VStack align="start" gap={1}>
                                        {details.features.map((feature, idx) => (
                                          <HStack key={idx} gap={2} align="start">
                                            <Box
                                              width="4px"
                                              height="4px"
                                              bg="primary.500"
                                              borderRadius="full"
                                              mt="6px"
                                              flexShrink={0}
                                            />
                                            <Text
                                              fontSize="xs"
                                              color="muted"
                                              lineHeight="1.4"
                                            >
                                              {feature}
                                            </Text>
                                          </HStack>
                                        ))}
                                      </VStack>
                                    </Box>
                                  )}

                                  {/* CTA */}
                                  <Link to={link.children?.find(c => c.name === hoveredChild)?.path || '#'} style={{ textDecoration: 'none' }}>
                                    <Button
                                      size="sm"
                                      colorScheme="primary"
                                      variant="ghost"
                                      _hover={{
                                        bg: "primary.50"
                                      }}
                                    >
                                      Learn More →
                                    </Button>
                                  </Link>
                                </VStack>
                              </>
                            )
                          })()}
                        </Box>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Flex>
              </Box>
            )}
          </AnimatePresence>
        </Box>
      )
    }

    return (
      <Link to={link.path} style={{ textDecoration: 'none' }}>
        <Text
          py={2}
          px={4}
          borderRadius="full"
          color={isActive ? "primary.500" : "text"}
          fontWeight={isActive ? "600" : "500"}
          fontSize="sm"
          transition="all 0.3s ease"
          _hover={{ 
            color: "primary.500",
            bg: "primary.50",
            transform: "translateY(-1px)"
          }}
          onClick={isMobile ? () => setIsMobileMenuOpen(false) : undefined}
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
              <HStack gap={3} alignItems="center">
                <Box
                  width="40px"
                  height="40px"
                  bg="primary.500"
                  borderRadius="lg"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  color="white"
                  fontWeight="800"
                  fontSize="lg"
                  transition="all 0.3s ease"
                  _hover={{ 
                    transform: "scale(1.05)",
                    shadow: "lg"
                  }}
                >
                  IO
                </Box>
                <Text
                  fontSize="xl"
                  fontWeight="700"
                  color="text"
                  _hover={{ 
                    color: "primary.500"
                  }}
                  transition="all 0.3s ease"
                >
                  IOXET
                </Text>
              </HStack>
            </Link>

            {/* Desktop Navigation */}
            {!isMobile && (
              <HStack gap={2}>
                {navLinks.map((link) => (
                  <NavItem key={link.path} link={link} />
                ))}
              </HStack>
            )}

            {/* Right side controls */}
            <HStack gap={3}>
              <Link to="/contact" style={{ textDecoration: 'none' }}>
                <Button
                  variant="solid"
                  colorScheme="primary"
                  size="sm"
                  borderRadius="full"
                  px={6}
                  fontWeight="600"
                  display={{ base: 'none', md: 'flex' }}
                  _hover={{ 
                    transform: "translateY(-2px)",
                    shadow: "lg"
                  }}
                  transition="all 0.3s ease"
                >
                  Get Started
                </Button>
              </Link>

              {isMobile && (
                <Button
                  aria-label="Open menu"
                  variant="ghost"
                  color="text"
                  size="sm"
                  borderRadius="full"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  _hover={{ 
                    bg: "primary.50",
                    color: "primary.500"
                  }}
                  transition="all 0.3s ease"
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

      {/* Mobile Menu */}
      {isMobile && isMobileMenuOpen && (
        <Box
          position="fixed"
          top="80px"
          left={0}
          right={0}
          bg="card"
          backdropFilter="blur(20px)"
          border="1px solid"
          borderColor="border"
          borderRadius="0 0 xl xl"
          shadow="xl"
          zIndex={999}
          p={6}
          transition="all 0.3s ease"
        >
          <VStack align="stretch" gap={2}>
            {navLinks.map((link) => (
              <Box key={link.path}>
                <NavItem link={link} isMobile />
                {link.children && (
                  <VStack align="stretch" pl={4} mt={2} gap={1}>
                    {link.children.map((child) => (
                      <Link key={child.path} to={child.path} style={{ textDecoration: 'none' }}>
                        <Text
                          py={2}
                          px={4}
                          borderRadius="lg"
                          fontSize="sm"
                          color="muted"
                          fontWeight="500"
                          transition="all 0.2s ease"
                          _hover={{ 
                            color: "primary.500", 
                            bg: "primary.50",
                            transform: "translateX(4px)"
                          }}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {child.name}
                        </Text>
                      </Link>
                    ))}
                  </VStack>
                )}
              </Box>
            ))}
            
            <Link to="/contact" style={{ textDecoration: 'none' }}>
              <Button
                variant="solid"
                colorScheme="primary"
                mt={6}
                borderRadius="full"
                fontWeight="600"
                w="full"
                onClick={() => setIsMobileMenuOpen(false)}
                _hover={{ transform: "translateY(-2px)" }}
                transition="all 0.3s ease"
              >
                Get Started
              </Button>
            </Link>
          </VStack>
        </Box>
      )}

      {/* Animation keyframes */}
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </>
  )
}

export default ModernNavbar
