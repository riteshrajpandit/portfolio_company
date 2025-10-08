import {
  Box,
  Container,
  Stack,
  Text,
  Flex,
  Grid,
  GridItem,
  IconButton,
  Image,
} from "@chakra-ui/react"
import { Link as RouterLink } from "react-router-dom"
import {  FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa"


const navItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
]

const socialLinks = [
  { icon: FaFacebook, href: "https://www.facebook.com/ioxet", label: "Facebook" },
  { icon: FaLinkedin, href: "https://www.linkedin.com/company/ioxet/", label: "LinkedIn" },
  { icon: FaTwitter, href: "https://x.com/ioxetlabs", label: "X" },
  
]

export const Footer = () => {
  return (
    <Box bg="primary.300" color="white" mt="auto">
      {/* Top Section */}
      <Container maxW="7xl" py={{ base: 8, md: 6 }} px={{ base: 4, md: 6 }}>
        <Grid templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }} gap={{ base: 6, md: 8 }} textAlign={{ base: "center", md: "left" }}>
          {/* Need Help Section */}
          <GridItem>
            <Text fontSize="sm" color="white" mb={2} opacity={0.9}>
              Need Help?
            </Text>
            <RouterLink to="/contact" style={{ textDecoration: 'none' }}>
              <Text 
                fontSize="xl" 
                fontWeight="bold" 
                color="white"
                _hover={{ opacity: 0.8 }}
                transition="opacity 0.2s ease"
                cursor="pointer"
              >
                Contact Us 
              </Text>
            </RouterLink>
          </GridItem>

          {/* Call Us Section */}
          <GridItem>
            <Text fontSize="sm" color="white" mb={2} opacity={0.9}>
              Call Us :
            </Text>
            <a href="tel:+977-9861190705" style={{ textDecoration: 'none' }}>
              <Text 
                fontSize="xl" 
                fontWeight="bold" 
                color="white"
                _hover={{ opacity: 0.8 }}
                transition="opacity 0.2s ease"
                cursor="pointer"
              >
                +977-9861190705
              </Text>
            </a>
          </GridItem>

          {/* Send Email Section */}
          <GridItem>
            <Text fontSize="sm" color="white" mb={2} opacity={0.9}>
            Message Us :
            </Text>
            <a href="mailto:info@ioxet.com" style={{ textDecoration: 'none' }}>
              <Text 
                fontSize="xl" 
                fontWeight="bold" 
                color="white"
                _hover={{ opacity: 0.8 }}
                transition="opacity 0.2s ease"
                cursor="pointer"
              >
                info@ioxet.com
              </Text>
            </a>
          </GridItem>

          {/* Follow Us Section */}
          <GridItem colSpan={{ base: 1, sm: 2, md: 1 }}>
            <Text fontSize="sm" color="white" mb={4} opacity={0.9}>
              Follow Us :
            </Text>
            <Stack direction="row" gap={3} justify={{ base: "center", md: "flex-start" }} flexWrap="wrap">
              {socialLinks.map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer">
                  <IconButton
                    aria-label={social.label}
                    variant="ghost"
                    color="white"
                    _hover={{ 
                      bg: "rgba(255,255,255,0.1)",
                      transform: "translateY(-2px)"
                    }}
                    transition="all 0.2s ease"
                    size="md"
                    borderRadius="lg"
                  >
                    <social.icon />
                  </IconButton>
                </a>
              ))}
            </Stack>
          </GridItem>
        </Grid>
      </Container>

      {/* Divider */}
      <Box h="1px" bg="rgba(255,255,255,0.2)" />

      {/* Bottom Section */}
      <Container maxW="7xl" py={4} px={{ base: 4, md: 6 }}>
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align="center"
          gap={{ base: 6, md: 4 }}
        >
          {/* Company Logo/Name */}
          <Flex align="center" gap={3}>
            <Image 
              src="/ioxet-labs-white.svg" 
              alt="IOXET Labs" 
              height="50px" 
              width="auto"
            />
          </Flex>

          {/* Navigation Items */}
          <Flex gap={{ base: 3, md: 4 }} wrap="wrap" align="center" justify={{ base: "center", md: "flex-start" }}>
           {navItems.map((item, index) => (
             <Flex key={item.label} align="center" gap={4}>
                <RouterLink
                  to={item.href}
                  style={{ textDecoration: 'none' }}
                >
                  <Text
                    fontSize="sm"
                    color="white"
                    _hover={{ 
                      opacity: 0.8
                    }}
                    transition="all 0.2s ease"
                    cursor="pointer"
                    whiteSpace="nowrap"
                  >
                    {item.label}
                  </Text>
                </RouterLink>
                 {index < navItems.length - 1 && (
                  <Box
                    w="4px"
                    h="4px"
                    bg="white"
                    borderRadius="full"
                    opacity={0.6}
                  />
                )}
              </Flex>
            ))}
          </Flex>
        </Flex>
      </Container>

      {/* Copyright and Legal Links Section - Metal Gray */}
      <Box bg="gray.700" py={4}>
        <Container maxW="7xl" px={{ base: 4, md: 6 }}>
          <Flex
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            align="center"
            gap={{ base: 4, md: 4 }}
          >
            {/* Copyright */}
            <Text fontSize="sm" color="gray.300" textAlign={{ base: "center", md: "left" }}>
              © {new Date().getFullYear()} IOXET Labs Pvt. Ltd. All rights reserved.
            </Text>

            {/* Legal Links */}
            <Flex gap={{ base: 4, md: 6 }} align="center" wrap="wrap" justify={{ base: "center", md: "flex-start" }}>
              <RouterLink to="/terms" style={{ textDecoration: 'none' }}>
                <Text
                  fontSize="sm"
                  color="gray.300"
                  _hover={{ 
                    color: "white"
                  }}
                  transition="color 0.2s ease"
                  cursor="pointer"
                >
                  Terms of Use
                </Text>
              </RouterLink>
              
              <Box w="4px" h="4px" bg="gray.400" borderRadius="full" />
              
              <RouterLink to="/privacy" style={{ textDecoration: 'none' }}>
                <Text
                  fontSize="sm"
                  color="gray.300"
                  _hover={{ 
                    color: "white"
                  }}
                  transition="color 0.2s ease"
                  cursor="pointer"
                >
                  Privacy Policy
                </Text>
              </RouterLink>
              
              <Box w="4px" h="4px" bg="gray.400" borderRadius="full" />
              
              <RouterLink to="/sitemap" style={{ textDecoration: 'none' }}>
                <Text
                  fontSize="sm"
                  color="gray.300"
                  _hover={{ 
                    color: "white"
                  }}
                  transition="color 0.2s ease"
                  cursor="pointer"
                >
                  Sitemap
                </Text>
              </RouterLink>
            </Flex>
          </Flex>
        </Container>
      </Box>
    </Box>
  )
}
export default Footer