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
    name: 'Products', 
    path: '/products',
    children: [
      { 
        name: 'ERP Solutions', 
        path: '/products#erp',
        description: 'Enterprise Resource Planning solutions for streamlined business operations'
      },
      { 
        name: 'Amigaa', 
        path: '/products#amigaa',
        description: 'Advanced AI-powered platform for intelligent automation'
      }
    ]
  },
  { 
    name: 'Services', 
    path: '/services',
    children: [
      { 
        name: 'IT Consulting', 
        path: '/services#it-consulting',
        description: 'Strategic technology guidance for digital transformation'
      },
      { 
        name: 'Workshop & Training', 
        path: '/services#workshop-training',
        description: 'Professional development and skill enhancement programs'
      }
    ]
  },
  { 
    name: 'Resources', 
    path: '/resources',
    children: [
      { 
        name: 'Trusted Center', 
        path: '/resources#trusted-center',
        description: 'Security certifications, compliance and trust information'
      },
      { 
        name: 'Tools', 
        path: '/resources#tools',
        description: 'Free tools and utilities to boost your productivity'
      }
    ]
  },
  { 
    name: 'About Us', 
    path: '/about',
    children: [
      { 
        name: 'Career', 
        path: '/about#career',
        description: 'Join our growing team and build the future together'
      }
    ]
  }
]

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()
  const isMobile = useBreakpointValue({ base: true, lg: false })

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

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
        Products: {
          'ERP Solutions': {
            title: 'Enterprise Resource Planning',
            description: 'Comprehensive ERP solutions that integrate all your business processes into a unified system for improved efficiency and data-driven decision making.',
            features: ['Financial Management', 'Supply Chain Integration', 'Human Resources', 'Real-time Analytics']
          },
          'Amigaa': {
            title: 'AI-Powered Automation Platform',
            description: 'Revolutionary AI platform that transforms how businesses operate through intelligent automation and advanced machine learning capabilities.',
            features: ['Machine Learning Models', 'Process Intelligence', 'Predictive Analytics', 'Automated Workflows']
          }
        },
        Services: {
          'IT Consulting': {
            title: 'Strategic IT Consulting',
            description: 'Expert guidance to help you navigate digital transformation, optimize your technology stack, and achieve your business objectives.',
            features: ['Digital Strategy', 'Technology Assessment', 'Architecture Design', 'Implementation Planning']
          },
          'Workshop & Training': {
            title: 'Professional Development',
            description: 'Comprehensive training programs and workshops designed to upskill your team and maximize the value of your technology investments.',
            features: ['Technical Workshops', 'Best Practices Training', 'Certification Programs', 'Ongoing Support']
          }
        },
        Resources: {
          'Trusted Center': {
            title: 'Security & Compliance Hub',
            description: 'Comprehensive security documentation, compliance certifications, and trust resources to ensure your confidence in our solutions.',
            features: ['Security Certifications', 'Compliance Documentation', 'Privacy Policies', 'Audit Reports']
          },
          'Tools': {
            title: 'Productivity Tools',
            description: 'Free tools and utilities designed to enhance your productivity and streamline your daily workflows.',
            features: ['Calculators & Converters', 'Planning Templates', 'Assessment Tools', 'Resource Libraries']
          }
        },
        'About Us': {
          'Career': {
            title: 'Join Our Team',
            description: 'Discover exciting career opportunities at IOXET. Be part of an innovative company that values creativity, collaboration, and professional growth.',
            features: ['Remote-first culture', 'Competitive compensation', 'Learning & development budget', 'Flexible working hours']
          }
        }
      }
      
      return details[parentName]?.[childName] || {
        title: childName,
        description: 'Learn more about this offering',
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
              <Link to="/products" style={{ textDecoration: 'none' }}>
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
                  Let's Meet
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
            
            <Link to="/products" style={{ textDecoration: 'none' }}>
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
                Let's Meet
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

export default Navbar
