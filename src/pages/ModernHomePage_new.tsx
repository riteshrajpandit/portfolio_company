import { Box, Badge, Text, Button, Grid, Flex } from '@chakra-ui/react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiX, HiArrowRight } from 'react-icons/hi'
import HeroSection from '../components/sections/HeroSection'
import FeaturesSection from '../components/sections/FeaturesSection'
import TestimonialsSection from '../components/sections/TestimonialsSection'
import CTASection from '../components/sections/CTASection'
import { portfolioImages } from '../data/portfolioData'

const ModernHomePage = () => {
  const [selectedProject, setSelectedProject] = useState<typeof portfolioImages[0] | null>(null)

  const handleProjectClick = (project: typeof portfolioImages[0]) => {
    setSelectedProject(project)
  }

  const closeModal = () => {
    setSelectedProject(null)
  }

  return (
    <Box>
      {/* Hero Section */}
      <HeroSection onProjectClick={handleProjectClick} />
      
      {/* Features Section */}
      <FeaturesSection />
      
      {/* Testimonials Section */}
      <TestimonialsSection />
      
      {/* CTA Section */}
      <CTASection />

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              backdropFilter: "blur(8px)",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px"
            }}
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: "white",
                borderRadius: "24px",
                maxWidth: "900px",
                width: "100%",
                maxHeight: "90vh",
                overflow: "auto",
                position: "relative",
                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.2)"
              }}
            >
              {/* Close Button */}
              <Box
                position="absolute"
                top={4}
                right={4}
                zIndex={10}
                cursor="pointer"
                onClick={closeModal}
                bg="whiteAlpha.200"
                backdropFilter="blur(10px)"
                borderRadius="full"
                p={2}
                color="white"
                _hover={{ bg: "whiteAlpha.300" }}
                transition="all 0.2s"
              >
                <HiX size={20} />
              </Box>

              {/* Project Content */}
              <Box>
                {/* Header Image */}
                <Box
                  height="300px"
                  backgroundImage={`url(${selectedProject.url})`}
                  backgroundSize="cover"
                  backgroundPosition="center"
                  borderTopRadius="24px"
                  position="relative"
                  _after={{
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    bgGradient: selectedProject.gradient,
                    opacity: 0.85,
                    borderTopRadius: "24px"
                  }}
                >
                  <Box
                    position="relative"
                    zIndex={2}
                    p={8}
                    color="white"
                    height="100%"
                    display="flex"
                    flexDirection="column"
                    justifyContent="end"
                  >
                    <Badge
                      bg="whiteAlpha.200"
                      color="white"
                      backdropFilter="blur(10px)"
                      px={3}
                      py={2}
                      borderRadius="full"
                      fontSize="sm"
                      fontWeight="600"
                      mb={4}
                      width="fit-content"
                    >
                      {selectedProject.category}
                    </Badge>
                    <Text fontSize="3xl" fontWeight="700" mb={2}>
                      {selectedProject.title}
                    </Text>
                    <Text fontSize="lg" opacity={0.9}>
                      {selectedProject.client}
                    </Text>
                  </Box>
                </Box>

                {/* Content */}
                <Box p={8}>
                  <Text fontSize="lg" color="gray.600" mb={6} lineHeight="1.7">
                    {selectedProject.description}
                  </Text>

                  {/* Technologies */}
                  <Box mb={6}>
                    <Text fontSize="xl" fontWeight="600" mb={3} color="gray.800">
                      Technologies Used
                    </Text>
                    <Flex gap={2} flexWrap="wrap">
                      {selectedProject.technologies.map((tech) => (
                        <Badge
                          key={tech}
                          colorScheme="primary"
                          variant="subtle"
                          px={3}
                          py={1}
                          borderRadius="full"
                          fontSize="sm"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </Flex>
                  </Box>

                  {/* Features */}
                  <Box mb={6}>
                    <Text fontSize="xl" fontWeight="600" mb={3} color="gray.800">
                      Key Features
                    </Text>
                    <Box>
                      {selectedProject.features.map((feature, index) => (
                        <Text
                          key={index}
                          fontSize="md"
                          color="gray.600"
                          mb={2}
                          pl={6}
                          position="relative"
                          _before={{
                            content: '"✓"',
                            position: "absolute",
                            left: 0,
                            color: "primary.500",
                            fontWeight: "bold"
                          }}
                        >
                          {feature}
                        </Text>
                      ))}
                    </Box>
                  </Box>

                  {/* Metrics */}
                  <Box mb={6}>
                    <Text fontSize="xl" fontWeight="600" mb={4} color="gray.800">
                      Project Metrics
                    </Text>
                    <Grid templateColumns="repeat(auto-fit, minmax(150px, 1fr))" gap={4}>
                      {Object.entries(selectedProject.metrics).map(([key, value]) => (
                        <Box key={key} textAlign="center" p={4} bg="gray.50" borderRadius="lg">
                          <Text fontSize="2xl" fontWeight="700" color="primary.500" mb={1}>
                            {value}
                          </Text>
                          <Text fontSize="sm" color="gray.600" textTransform="capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </Text>
                        </Box>
                      ))}
                    </Grid>
                  </Box>

                  {/* Status and CTA */}
                  <Flex justify="space-between" align="center" pt={4} borderTop="1px solid" borderColor="gray.200">
                    <Badge
                      colorScheme={selectedProject.status === "Live" ? "green" : "blue"}
                      variant="solid"
                      px={3}
                      py={2}
                      borderRadius="full"
                      fontSize="sm"
                    >
                      {selectedProject.status}
                    </Badge>
                    <Button
                      colorScheme="primary"
                      size="lg"
                      onClick={() => window.open(selectedProject.link, '_blank')}
                    >
                      View Project Details
                      <Box as="span" ml={2}>
                        <HiArrowRight />
                      </Box>
                    </Button>
                  </Flex>
                </Box>
              </Box>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  )
}

export default ModernHomePage
