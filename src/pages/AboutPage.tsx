import {
  Box,
  Container,
  Text,
  Button,
  VStack,
  HStack,
  Grid,
  GridItem,
  Image,
  Icon,
  SimpleGrid,
} from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { 
  FaLinkedin, 
  FaTwitter, 
  FaGithub,
} from "react-icons/fa"
import {
  HiArrowRight,
  HiHeart,
  HiLightBulb,
  HiUserGroup,
  HiTrophy,
  HiBriefcase,
} from "react-icons/hi2"

const teamMembers = [
  {
    name: "John Smith",
    role: "CEO & Founder",
    bio: "With 15 years of experience in tech leadership, John founded our company to bridge the gap between innovative ideas and practical solutions.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      github: "https://github.com"
    }
  },
  {
    name: "Sarah Davis",
    role: "CTO",
    bio: "Sarah leads our technical vision with expertise in modern web technologies and scalable architecture design.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      github: "https://github.com"
    }
  },
  {
    name: "Michael Chen",
    role: "Lead Designer",
    bio: "Michael brings creative vision to life with user-centered design principles and a passion for beautiful, functional interfaces.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      github: "https://github.com"
    }
  },
  {
    name: "Emily Johnson",
    role: "Senior Developer",
    bio: "Emily specializes in full-stack development and has a talent for turning complex requirements into elegant solutions.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      github: "https://github.com"
    }
  }
]

const values = [
  {
    title: "Innovation",
    icon: HiLightBulb,
    description: "We stay at the forefront of technology, constantly exploring new solutions and methodologies to deliver cutting-edge results."
  },
  {
    title: "Quality",
    icon: HiTrophy,
    description: "Every project we undertake meets the highest standards of quality, performance, and reliability."
  },
  {
    title: "Collaboration",
    icon: HiUserGroup,
    description: "We believe in working closely with our clients as partners, ensuring transparency and alignment throughout the process."
  },
  {
    title: "Growth",
    icon: HiHeart,
    description: "We're committed to continuous learning and improvement, both for our team and our clients' businesses."
  }
]

const stats = [
  { label: "Team Members", value: "50+", icon: HiUserGroup },
  { label: "Years of Experience", value: "10+", icon: HiTrophy },
  { label: "Projects Delivered", value: "500+", icon: HiBriefcase },
  { label: "Client Satisfaction", value: "99%", icon: HiHeart }
]

const MotionBox = motion(Box)
const MotionContainer = motion(Container)

export const AboutPage = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box bg="neutral.50" pt={40} pb={16}>
        <Container maxW="7xl">
          <MotionContainer
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            textAlign="center"
            maxW="4xl"
            mx="auto"
          >
            <Text
              fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
              fontWeight="700"
              lineHeight="1.1"
              color="text"
              mb={6}
            >
              Building the{" "}
              <Text as="span" color="primary.500">
                Future
              </Text>{" "}
              Together
            </Text>
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color="muted"
              lineHeight="1.7"
              maxW="3xl"
              mx="auto"
              mb={8}
            >
              Founded in 2014, we've been at the forefront of digital innovation, helping businesses 
              transform their ideas into powerful digital solutions that drive growth and success.
            </Text>
            <HStack justify="center" gap={4} wrap="wrap">
              <Link to="/careers" style={{ textDecoration: 'none' }}>
                <Button
                  size="lg"
                  colorScheme="primary"
                  borderRadius="full"
                  px={8}
                  fontWeight="600"
                  _hover={{ transform: "translateY(-2px)", shadow: "lg" }}
                  transition="all 0.3s ease"
                >
                  Join Our Team <HiArrowRight style={{ marginLeft: '8px' }} />
                </Button>
              </Link>
              <Link to="/services" style={{ textDecoration: 'none' }}>
                <Button
                  size="lg"
                  variant="outline"
                  borderColor="primary.500"
                  color="primary.500"
                  borderRadius="full"
                  px={8}
                  fontWeight="600"
                  _hover={{ bg: "primary.50", transform: "translateY(-2px)" }}
                  transition="all 0.3s ease"
                >
                  Work With Us
                </Button>
              </Link>
            </HStack>
          </MotionContainer>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container maxW="7xl" py={16}>
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <SimpleGrid columns={{ base: 2, md: 4 }} gap={8}>
            {stats.map((stat, index) => (
              <VStack key={index} gap={3} textAlign="center">
                <Box
                  p={4}
                  bg="primary.50"
                  borderRadius="xl"
                  color="primary.500"
                  fontSize="2xl"
                >
                  <Icon as={stat.icon} />
                </Box>
                <VStack gap={1}>
                  <Text fontSize="3xl" fontWeight="700" color="primary.500">
                    {stat.value}
                  </Text>
                  <Text fontSize="sm" color="muted" fontWeight="500">
                    {stat.label}
                  </Text>
                </VStack>
              </VStack>
            ))}
          </SimpleGrid>
        </MotionBox>
      </Container>

      {/* Mission & Vision */}
      <Box py={{ base: 16, md: 20 }} bg="white">
        <Container maxW="7xl">
          <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={12} alignItems="center">
            <GridItem>
              <MotionBox
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <VStack align="start" gap={8}>
                  <VStack align="start" gap={4}>
                    <Text fontSize="sm" color="primary.500" fontWeight="600" textTransform="uppercase">
                      Our Mission
                    </Text>
                    <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="700" color="text">
                      Empowering Digital Innovation
                    </Text>
                    <Text fontSize={{ base: "md", md: "lg" }} color="muted" lineHeight="1.7">
                      To empower businesses with innovative digital solutions that drive growth, 
                      enhance user experiences, and create lasting value. We strive to be the 
                      trusted partner that transforms ideas into reality through exceptional 
                      technology and design.
                    </Text>
                  </VStack>
                  
                  <VStack align="start" gap={4}>
                    <Text fontSize="sm" color="primary.500" fontWeight="600" textTransform="uppercase">
                      Our Vision
                    </Text>
                    <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="700" color="text">
                      Shaping Tomorrow's Technology
                    </Text>
                    <Text fontSize={{ base: "md", md: "lg" }} color="muted" lineHeight="1.7">
                      To be recognized as a leading digital innovation company that shapes the 
                      future of how businesses operate and connect with their customers. We envision 
                      a world where technology serves as a bridge to unlimited possibilities.
                    </Text>
                  </VStack>
                </VStack>
              </MotionBox>
            </GridItem>
            
            <GridItem>
              <MotionBox
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Box
                  position="relative"
                  borderRadius="2xl"
                  overflow="hidden"
                  shadow="2xl"
                  _hover={{ transform: "translateY(-4px)", shadow: "3xl" }}
                  transition="all 0.4s ease"
                >
                  <Image
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                    alt="Our team working together"
                    w="full"
                    h={{ base: "300px", md: "400px" }}
                    objectFit="cover"
                  />
                  <Box
                    position="absolute"
                    inset={0}
                    bg="linear-gradient(135deg, primary.500, primary.600)"
                    opacity={0.1}
                  />
                </Box>
              </MotionBox>
            </GridItem>
          </Grid>
        </Container>
      </Box>

      {/* Values Section */}
      <Box py={{ base: 16, md: 20 }} bg="neutral.50">
        <Container maxW="7xl">
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            textAlign="center"
            mb={12}
          >
            <Text fontSize={{ base: "3xl", md: "4xl" }} fontWeight="700" mb={4} color="text">
              Our Core Values
            </Text>
            <Text fontSize={{ base: "md", md: "xl" }} color="muted" maxW="2xl" mx="auto">
              These principles guide everything we do and shape how we work with our clients and each other.
            </Text>
          </MotionBox>
          
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
            {values.map((value, index) => (
              <MotionBox
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Box 
                  bg="white" 
                  p={8} 
                  borderRadius="xl" 
                  shadow="sm" 
                  border="1px" 
                  borderColor="gray.200"
                  _hover={{ shadow: "md", transform: "translateY(-2px)" }}
                  transition="all 0.3s ease"
                  h="full"
                >
                  <VStack align="start" gap={4}>
                    <Box
                      p={3}
                      bg="primary.50"
                      borderRadius="lg"
                      color="primary.500"
                      fontSize="xl"
                    >
                      <Icon as={value.icon} />
                    </Box>
                    <Text fontSize="xl" fontWeight="700" color="text">
                      {value.title}
                    </Text>
                    <Text color="muted" lineHeight="1.7">
                      {value.description}
                    </Text>
                  </VStack>
                </Box>
              </MotionBox>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Team Section */}
      <Box py={{ base: 16, md: 20 }} bg="white">
        <Container maxW="7xl">
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            textAlign="center"
            mb={12}
          >
            <Text fontSize={{ base: "3xl", md: "4xl" }} fontWeight="700" mb={4} color="text">
              Meet Our Team
            </Text>
            <Text fontSize={{ base: "md", md: "xl" }} color="muted" maxW="2xl" mx="auto">
              Our diverse team of experts brings together years of experience and a passion for innovation.
            </Text>
          </MotionBox>
          
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={8}>
            {teamMembers.map((member, index) => (
              <MotionBox
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                textAlign="center"
              >
                <VStack gap={4}>
                  <Image
                    src={member.image}
                    alt={member.name}
                    borderRadius="full"
                    boxSize="200px"
                    objectFit="cover"
                    shadow="lg"
                    _hover={{ transform: "scale(1.05)" }}
                    transition="all 0.3s ease"
                  />
                  <VStack gap={2}>
                    <Text fontSize="lg" fontWeight="700" color="text">
                      {member.name}
                    </Text>
                    <Text color="primary.500" fontWeight="600">
                      {member.role}
                    </Text>
                    <Text fontSize="sm" color="muted" lineHeight="1.6" textAlign="center">
                      {member.bio}
                    </Text>
                  </VStack>
                  <HStack gap={3} justify="center">
                    <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                      <Box
                        p={2}
                        color="muted"
                        _hover={{ color: "primary.500" }}
                        cursor="pointer"
                        transition="color 0.2s"
                      >
                        <FaLinkedin size={20} />
                      </Box>
                    </a>
                    <a href={member.social.twitter} target="_blank" rel="noopener noreferrer">
                      <Box
                        p={2}
                        color="muted"
                        _hover={{ color: "primary.500" }}
                        cursor="pointer"
                        transition="color 0.2s"
                      >
                        <FaTwitter size={20} />
                      </Box>
                    </a>
                    <a href={member.social.github} target="_blank" rel="noopener noreferrer">
                      <Box
                        p={2}
                        color="muted"
                        _hover={{ color: "primary.500" }}
                        cursor="pointer"
                        transition="color 0.2s"
                      >
                        <FaGithub size={20} />
                      </Box>
                    </a>
                  </HStack>
                </VStack>
              </MotionBox>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container maxW="7xl" py={{ base: 16, md: 20 }}>
        <MotionBox
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Box
            bg="primary.500"
            color="white"
            p={12}
            borderRadius="3xl"
            textAlign="center"
            bgGradient="linear(135deg, primary.500, primary.600)"
          >
            <VStack gap={6} maxW="3xl" mx="auto">
              <Text fontSize={{ base: "3xl", md: "4xl" }} fontWeight="700">
                Ready to Work with Us?
              </Text>
              <Text fontSize="xl" opacity={0.9} lineHeight="1.6">
                Whether you're looking to join our team or start a project, we'd love to hear from you. 
                Let's create something amazing together.
              </Text>
              <HStack gap={4} wrap="wrap" justify="center">
                <Link to="/services" style={{ textDecoration: 'none' }}>
                  <Button
                    size="lg"
                    bg="white"
                    color="primary.600"
                    borderRadius="full"
                    px={8}
                    py={6}
                    fontSize="lg"
                    fontWeight="600"
                    _hover={{
                      transform: "translateY(-2px)",
                      shadow: "xl"
                    }}
                    transition="all 0.3s ease"
                  >
                    Start a Project <HiArrowRight style={{ marginLeft: '8px' }} />
                  </Button>
                </Link>
                <Link to="/resources" style={{ textDecoration: 'none' }}>
                  <Button
                    size="lg"
                    variant="outline"
                    borderColor="white"
                    color="white"
                    borderRadius="full"
                    px={8}
                    py={6}
                    fontSize="lg"
                    fontWeight="600"
                    _hover={{
                      bg: "whiteAlpha.200",
                      transform: "translateY(-2px)"
                    }}
                    transition="all 0.3s ease"
                  >
                    View Resources
                  </Button>
                </Link>
              </HStack>
            </VStack>
          </Box>
        </MotionBox>
      </Container>
    </Box>
  )
}
export default AboutPage