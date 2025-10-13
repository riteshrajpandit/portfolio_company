import {
  Box,
  Container,
  Text,
  Heading,
  Grid,
  GridItem,
  Stack,
} from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { HiArrowRight } from "react-icons/hi2"
import { siteMapURLs } from "../utils/sitemap"

const MotionBox = motion(Box)

const SitemapPage = () => {
  // Group pages by priority
  const primaryPages = siteMapURLs.filter(page => (page.priority ?? 0) >= 0.8)
  const secondaryPages = siteMapURLs.filter(page => (page.priority ?? 0) >= 0.5 && (page.priority ?? 0) < 0.8)
  const tertiaryPages = siteMapURLs.filter(page => (page.priority ?? 0) < 0.5)

  const PageLink = ({ url, changeFrequency }: { url: string; changeFrequency?: string }) => (
    <Link to={url} style={{ textDecoration: 'none', width: '100%' }}>
      <Box
        p={4}
        bg="white"
        borderRadius="lg"
        border="1px solid"
        borderColor="gray.200"
        transition="all 0.3s ease"
        _hover={{
          borderColor: "primary.500",
          transform: "translateX(4px)",
          shadow: "md"
        }}
      >
        <Stack direction="row" justify="space-between" align="center">
          <Box>
            <Text fontSize="lg" fontWeight="600" color="text" mb={1}>
              {url === '/' ? 'Home' : url.split('/').filter(Boolean).map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join(' ')}
            </Text>
            <Text fontSize="sm" color="muted">
              {url === '/' ? 'https://ioxet.com' : `https://ioxet.com${url}`}
            </Text>
            {changeFrequency && (
              <Text fontSize="xs" color="primary.500" mt={1}>
                Updated {changeFrequency}
              </Text>
            )}
          </Box>
          <HiArrowRight size={20} color="#165e96" />
        </Stack>
      </Box>
    </Link>
  )

  return (
    <Box>
      {/* Hero Section */}
      <Box bg="neutral.50" pt={40} pb={16}>
        <Container maxW="6xl">
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            textAlign="center"
          >
            <Text
              fontSize={{ base: "4xl", md: "5xl" }}
              fontWeight="700"
              lineHeight="1.1"
              color="text"
              mb={6}
            >
              Site Map
            </Text>
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color="muted"
              lineHeight="1.7"
              maxW="2xl"
              mx="auto"
            >
              Browse through all pages on our website. Find everything you need quickly and easily.
            </Text>
          </MotionBox>
        </Container>
      </Box>

      {/* Content Section */}
      <Container maxW="6xl" py={16}>
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Stack gap={12}>
            {/* Primary Pages */}
            <Box>
              <Heading
                as="h2"
                fontSize={{ base: "2xl", md: "3xl" }}
                fontWeight="700"
                color="text"
                mb={6}
                pb={3}
                borderBottom="2px solid"
                borderColor="primary.200"
              >
                Main Pages
              </Heading>
              <Grid
                templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                gap={4}
              >
                {primaryPages.map((page, index) => (
                  <GridItem key={index}>
                    <PageLink url={page.url} changeFrequency={page.changeFrequency} />
                  </GridItem>
                ))}
              </Grid>
            </Box>

            {/* Secondary Pages */}
            {secondaryPages.length > 0 && (
              <Box>
                <Heading
                  as="h2"
                  fontSize={{ base: "2xl", md: "3xl" }}
                  fontWeight="700"
                  color="text"
                  mb={6}
                  pb={3}
                  borderBottom="2px solid"
                  borderColor="primary.200"
                >
                  Additional Resources
                </Heading>
                <Grid
                  templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                  gap={4}
                >
                  {secondaryPages.map((page, index) => (
                    <GridItem key={index}>
                      <PageLink url={page.url} changeFrequency={page.changeFrequency} />
                    </GridItem>
                  ))}
                </Grid>
              </Box>
            )}

            {/* Tertiary Pages */}
            {tertiaryPages.length > 0 && (
              <Box>
                <Heading
                  as="h2"
                  fontSize={{ base: "2xl", md: "3xl" }}
                  fontWeight="700"
                  color="text"
                  mb={6}
                  pb={3}
                  borderBottom="2px solid"
                  borderColor="primary.200"
                >
                  Legal & Information
                </Heading>
                <Grid
                  templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                  gap={4}
                >
                  {tertiaryPages.map((page, index) => (
                    <GridItem key={index}>
                      <PageLink url={page.url} changeFrequency={page.changeFrequency} />
                    </GridItem>
                  ))}
                </Grid>
              </Box>
            )}

            {/* XML Sitemap Info */}
            <Box
              mt={12}
              p={8}
              bg="primary.50"
              borderRadius="2xl"
              borderLeft="4px solid"
              borderColor="primary.500"
            >
              <Heading as="h3" fontSize="xl" fontWeight="700" color="text" mb={3}>
                XML Sitemap
              </Heading>
              <Text fontSize="md" color="muted" lineHeight="1.7" mb={4}>
                For search engines and automated tools, you can access our XML sitemap at:
              </Text>
              <Text fontSize="md" color="primary.600" fontWeight="600" fontFamily="mono">
                https://ioxet.com/sitemap.xml
              </Text>
              <Text fontSize="sm" color="muted" mt={4} lineHeight="1.7">
                The XML sitemap helps search engines discover and index all pages on our website efficiently.
              </Text>
            </Box>

            {/* Website Statistics */}
            <Grid
              templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
              gap={6}
              mt={8}
            >
              <Box
                p={6}
                bg="white"
                borderRadius="xl"
                border="1px solid"
                borderColor="gray.200"
                textAlign="center"
              >
                <Text fontSize="3xl" fontWeight="700" color="primary.500" mb={2}>
                  {siteMapURLs.length}
                </Text>
                <Text fontSize="sm" color="muted" fontWeight="500">
                  Total Pages
                </Text>
              </Box>
              <Box
                p={6}
                bg="white"
                borderRadius="xl"
                border="1px solid"
                borderColor="gray.200"
                textAlign="center"
              >
                <Text fontSize="3xl" fontWeight="700" color="primary.500" mb={2}>
                  {primaryPages.length}
                </Text>
                <Text fontSize="sm" color="muted" fontWeight="500">
                  Main Pages
                </Text>
              </Box>
              <Box
                p={6}
                bg="white"
                borderRadius="xl"
                border="1px solid"
                borderColor="gray.200"
                textAlign="center"
              >
                <Text fontSize="3xl" fontWeight="700" color="primary.500" mb={2}>
                  Regular
                </Text>
                <Text fontSize="sm" color="muted" fontWeight="500">
                  Update Frequency
                </Text>
              </Box>
            </Grid>
          </Stack>
        </MotionBox>
      </Container>
    </Box>
  )
}

export default SitemapPage
