import {
  Box,
  Container,
  Stack,
  Text,
  Flex,
  Grid,
  GridItem,
  IconButton,
} from "@chakra-ui/react"
import { Link as RouterLink } from "react-router-dom"
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa"

const footerLinks = {
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Our Team", href: "/about/team" },
    { label: "Careers", href: "/about/careers" },
    { label: "Contact", href: "/contact" },
  ],
  Services: [
    { label: "Web Development", href: "/services/web-development" },
    { label: "Mobile Apps", href: "/services/mobile-apps" },
    { label: "Consulting", href: "/services/consulting" },
    { label: "Support", href: "/services/support" },
  ],
  Resources: [
    { label: "Blog", href: "/blog" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Case Studies", href: "/portfolio/case-studies" },
    { label: "Documentation", href: "/docs" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "GDPR", href: "/gdpr" },
  ],
}

const socialLinks = [
  { icon: FaGithub, href: "https://github.com", label: "GitHub" },
  { icon: FaLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: FaTwitter, href: "https://twitter.com", label: "Twitter" },
  { icon: FaEnvelope, href: "mailto:contact@yourcompany.com", label: "Email" },
]

export const Footer = () => {
  return (
    <Box bg="neutral.900" color="white" mt="auto">
      <Container maxW="7xl" py={10}>
        <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={8}>
          {/* Company Info */}
          <GridItem colSpan={{ base: 1, md: 1 }}>
            <Text fontSize="2xl" fontWeight="bold" color="primary.400" mb={4}>
              YourCompany
            </Text>
            <Text fontSize="sm" color="neutral.300" mb={4}>
              Building innovative digital solutions that help businesses grow and succeed in the modern world.
            </Text>
            <Stack direction="row" gap={2}>
              {socialLinks.map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer">
                  <IconButton
                    aria-label={social.label}
                    variant="ghost"
                    color="neutral.400"
                    _hover={{ color: "primary.400" }}
                    size="sm"
                  >
                    <social.icon />
                  </IconButton>
                </a>
              ))}
            </Stack>
          </GridItem>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <GridItem key={category}>
              <Text fontWeight="semibold" fontSize="lg" mb={4} color="white">
                {category}
              </Text>
              <Stack gap={2}>
                {links.map((link) => (
                  <RouterLink
                    key={link.label}
                    to={link.href}
                    style={{ textDecoration: 'none' }}
                  >
                    <Text
                      fontSize="sm"
                      color="neutral.300"
                      _hover={{ color: "primary.400" }}
                      transition="color 0.2s"
                      cursor="pointer"
                    >
                      {link.label}
                    </Text>
                  </RouterLink>
                ))}
              </Stack>
            </GridItem>
          ))}
        </Grid>

        <Box h="1px" bg="neutral.700" my={8} />

        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align="center"
          gap={4}
        >
          <Text fontSize="sm" color="neutral.400">
            © {new Date().getFullYear()} YourCompany. All rights reserved.
          </Text>
          <Stack direction="row" gap={6}>
            <RouterLink to="/privacy" style={{ textDecoration: 'none' }}>
              <Text
                fontSize="sm"
                color="neutral.400"
                _hover={{ color: "primary.400" }}
                cursor="pointer"
              >
                Privacy Policy
              </Text>
            </RouterLink>
            <RouterLink to="/terms" style={{ textDecoration: 'none' }}>
              <Text
                fontSize="sm"
                color="neutral.400"
                _hover={{ color: "primary.400" }}
                cursor="pointer"
              >
                Terms of Service
              </Text>
            </RouterLink>
          </Stack>
        </Flex>
      </Container>
    </Box>
  )
}
export default Footer