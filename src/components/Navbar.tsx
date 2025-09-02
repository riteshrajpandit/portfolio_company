import {
  Box,
  Flex,
  Button,
  useDisclosure,
  Text,
  Stack,
  IconButton,
  Container,
} from "@chakra-ui/react"
import { Link, useLocation } from "react-router-dom"
import { HiMenu, HiX, HiChevronDown } from "react-icons/hi"
import { useState } from "react"

interface NavItem {
  label: string
  href?: string
  children?: Array<NavItem>
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Our Story", href: "/about/story" },
      { label: "Mission & Vision", href: "/about/mission" },
      { label: "Team", href: "/about/team" },
      { label: "Careers", href: "/about/careers" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Web Development", href: "/services/web-development" },
      { label: "Mobile Apps", href: "/services/mobile-apps" },
      { label: "Consulting", href: "/services/consulting" },
      { label: "Support", href: "/services/support" },
    ],
  },
  {
    label: "Portfolio",
    href: "/portfolio",
    children: [
      { label: "Web Projects", href: "/portfolio/web" },
      { label: "Mobile Projects", href: "/portfolio/mobile" },
      { label: "Case Studies", href: "/portfolio/case-studies" },
    ],
  },
  {
    label: "Blog",
    href: "/blog",
  },
  {
    label: "Contact",
    href: "/contact",
  },
]

const DesktopNavItem = ({ navItem }: { navItem: NavItem }) => {
  const location = useLocation()
  const [isHovered, setIsHovered] = useState(false)

  const isActive = location.pathname === navItem.href || 
    (navItem.children && navItem.children.some(child => child.href === location.pathname))

  if (!navItem.children) {
    return (
      <Link to={navItem.href!} style={{ textDecoration: 'none' }}>
        <Text
          px={4}
          py={2}
          rounded="md"
          color={isActive ? "primary.500" : "neutral.700"}
          fontWeight="medium"
          fontSize="sm"
          _hover={{
            color: "primary.500",
          }}
          cursor="pointer"
          transition="all 0.2s"
        >
          {navItem.label}
        </Text>
      </Link>
    )
  }

  return (
    <Box
      position="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Flex align="center" cursor="pointer">
        <Text
          px={4}
          py={2}
          rounded="md"
          color={isActive ? "primary.500" : "neutral.700"}
          fontWeight="medium"
          fontSize="sm"
          _hover={{
            color: "primary.500",
          }}
          transition="all 0.2s"
        >
          {navItem.label}
        </Text>
        <HiChevronDown 
          style={{
            color: isActive ? "var(--chakra-colors-primary-500)" : "var(--chakra-colors-neutral-600)",
            transform: isHovered ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s",
            fontSize: "12px",
            marginLeft: "4px"
          }}
        />
      </Flex>
      
      {isHovered && (
        <Box
          position="absolute"
          top="100%"
          left={0}
          mt={2}
          bg="white"
          boxShadow="xl"
          rounded="lg"
          p={3}
          minW="220px"
          zIndex={1000}
          border="1px"
          borderColor="neutral.100"
        >
          <Stack gap={1}>
            {navItem.children.map((child) => (
              <Link key={child.label} to={child.href!} style={{ textDecoration: 'none' }}>
                <Text
                  px={3}
                  py={2}
                  rounded="md"
                  fontSize="sm"
                  color="neutral.600"
                  _hover={{
                    color: "primary.500",
                    bg: "neutral.50"
                  }}
                  transition="all 0.2s"
                >
                  {child.label}
                </Text>
              </Link>
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  )
}

const MobileNavItem = ({ navItem }: { navItem: NavItem }) => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const isActive = location.pathname === navItem.href

  if (!navItem.children) {
    return (
      <Link to={navItem.href!} style={{ textDecoration: 'none' }}>
        <Text
          py={2}
          px={4}
          color={isActive ? "primary.500" : "neutral.600"}
          fontWeight={isActive ? "semibold" : "medium"}
          _hover={{ color: "primary.500" }}
        >
          {navItem.label}
        </Text>
      </Link>
    )
  }

  return (
    <Box>
      <Flex
        align="center"
        justify="space-between"
        py={2}
        px={4}
        cursor="pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Text
          color={isActive ? "primary.500" : "neutral.600"}
          fontWeight={isActive ? "semibold" : "medium"}
        >
          {navItem.label}
        </Text>
        <HiChevronDown
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s"
          }}
        />
      </Flex>
      
      {isOpen && (
        <Stack ml={4} gap={1}>
          {navItem.children.map((child) => (
            <Link key={child.label} to={child.href!} style={{ textDecoration: 'none' }}>
              <Text
                py={2}
                px={4}
                fontSize="sm"
                color="neutral.500"
                _hover={{ color: "primary.500" }}
              >
                {child.label}
              </Text>
            </Link>
          ))}
        </Stack>
      )}
    </Box>
  )
}

export const Navbar = () => {
  const { open, onToggle } = useDisclosure()

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1000}
      bg="rgba(255, 255, 255, 0.95)"
      backdropFilter="blur(10px)"
      borderBottom="1px"
      borderColor="whiteAlpha.200"
      transition="all 0.3s ease"
    >
      <Container maxW="7xl" px={{ base: 4, md: 8 }}>
        <Flex
          h={16}
          align="center"
          justify="space-between"
        >
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Text
              fontSize="2xl"
              fontWeight="bold"
              color="neutral.900"
              fontFamily="heading"
            >
              sintra
            </Text>
          </Link>

          {/* Desktop Navigation */}
          <Flex
            display={{ base: "none", md: "flex" }}
            align="center"
            gap={8}
            flex={1}
            justify="center"
          >
            {NAV_ITEMS.map((navItem) => (
              <DesktopNavItem key={navItem.label} navItem={navItem} />
            ))}
          </Flex>

          {/* Desktop CTA */}
          <Flex display={{ base: "none", md: "flex" }} gap={4} align="center">
            <Text
              fontSize="sm"
              fontWeight="medium"
              color="neutral.600"
              cursor="pointer"
              _hover={{ color: "primary.500" }}
            >
              Log in
            </Text>
            <Button
              bg="primary.500"
              color="white"
              _hover={{ bg: "primary.600", transform: "translateY(-1px)" }}
              size="sm"
              borderRadius="lg"
              px={6}
              fontWeight="semibold"
              transition="all 0.2s ease"
            >
              Get Started
            </Button>
          </Flex>

          {/* Mobile Menu Button */}
          <IconButton
            display={{ md: "none" }}
            variant="ghost"
            aria-label="Open menu"
            onClick={onToggle}
            color="neutral.700"
            _hover={{ bg: "neutral.100" }}
          >
            {open ? <HiX /> : <HiMenu />}
          </IconButton>
        </Flex>
      </Container>

      {/* Mobile Navigation */}
      {open && (
        <Box
          display={{ md: "none" }}
          bg="white"
          borderTop="1px"
          borderColor="neutral.200"
          py={4}
          shadow="lg"
        >
          <Container maxW="7xl" px={{ base: 4 }}>
            <Stack gap={4}>
              {NAV_ITEMS.map((navItem) => (
                <MobileNavItem key={navItem.label} navItem={navItem} />
              ))}
              <Box pt={4} borderTop="1px" borderColor="neutral.200">
                <Stack gap={3}>
                  <Text
                    fontSize="sm"
                    fontWeight="medium"
                    color="neutral.600"
                    cursor="pointer"
                  >
                    Log in
                  </Text>
                  <Button
                    bg="primary.500"
                    color="white"
                    _hover={{ bg: "primary.600" }}
                    size="md"
                    w="full"
                    borderRadius="lg"
                  >
                    Get Started
                  </Button>
                </Stack>
              </Box>
            </Stack>
          </Container>
        </Box>
      )}
    </Box>
  )
}
