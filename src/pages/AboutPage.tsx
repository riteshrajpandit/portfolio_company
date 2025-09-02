import {
  Box,
  Container,
  Text,
  Button,
  Stack,
  Grid,
  Image,
  Heading,
} from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa"

const teamMembers = [
  {
    name: "John Smith",
    role: "CEO & Founder",
    bio: "With 15 years of experience in tech leadership, John founded YourCompany to bridge the gap between innovative ideas and practical solutions.",
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
    description: "We stay at the forefront of technology, constantly exploring new solutions and methodologies to deliver cutting-edge results."
  },
  {
    title: "Quality",
    description: "Every project we undertake meets the highest standards of quality, performance, and reliability."
  },
  {
    title: "Collaboration",
    description: "We believe in working closely with our clients as partners, ensuring transparency and alignment throughout the process."
  },
  {
    title: "Growth",
    description: "We're committed to continuous learning and improvement, both for our team and our clients' businesses."
  }
]

export const AboutPage = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box py={20} bg="neutral.50">
        <Container maxW="7xl">
          <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={12} alignItems="center">
            <Box>
              <Text fontSize="5xl" fontWeight="bold" lineHeight="shorter" mb={6} color="neutral.800">
                About <Text as="span" color="primary.500">YourCompany</Text>
              </Text>
              <Text fontSize="xl" color="neutral.600" mb={8} lineHeight="tall">
                Founded in 2014, YourCompany has been at the forefront of digital innovation, 
                helping businesses transform their ideas into powerful digital solutions. 
                We combine technical expertise with creative thinking to deliver exceptional results.
              </Text>
              <Link to="/contact" style={{ textDecoration: 'none' }}>
                <Button
                  size="lg"
                  bg="primary.500"
                  color="white"
                  _hover={{ bg: "primary.600" }}
                >
                  Get In Touch
                </Button>
              </Link>
            </Box>
            <Box>
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Our team"
                borderRadius="lg"
                shadow="2xl"
              />
            </Box>
          </Grid>
        </Container>
      </Box>

      {/* Mission & Vision */}
      <Box py={20} bg="white">
        <Container maxW="7xl">
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={12}>
            <Box>
              <Heading size="xl" mb={6} color="primary.500">
                Our Mission
              </Heading>
              <Text fontSize="lg" color="neutral.600" lineHeight="tall">
                To empower businesses with innovative digital solutions that drive growth, 
                enhance user experiences, and create lasting value. We strive to be the 
                trusted partner that transforms ideas into reality through exceptional 
                technology and design.
              </Text>
            </Box>
            <Box>
              <Heading size="xl" mb={6} color="primary.500">
                Our Vision
              </Heading>
              <Text fontSize="lg" color="neutral.600" lineHeight="tall">
                To be recognized as a leading digital innovation company that shapes the 
                future of how businesses operate and connect with their customers. We envision 
                a world where technology serves as a bridge to unlimited possibilities.
              </Text>
            </Box>
          </Grid>
        </Container>
      </Box>

      {/* Values Section */}
      <Box py={20} bg="neutral.50">
        <Container maxW="7xl">
          <Box textAlign="center" mb={16}>
            <Text fontSize="4xl" fontWeight="bold" mb={4} color="neutral.800">
              Our Values
            </Text>
            <Text fontSize="xl" color="neutral.600" maxW="2xl" mx="auto">
              These core principles guide everything we do and shape how we work with our clients and each other.
            </Text>
          </Box>
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={8}>
            {values.map((value, index) => (
              <Box key={index} bg="white" p={8} borderRadius="lg" shadow="md" border="1px" borderColor="neutral.200">
                <Heading size="lg" mb={4} color="primary.500">
                  {value.title}
                </Heading>
                <Text color="neutral.600" lineHeight="tall">
                  {value.description}
                </Text>
              </Box>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Team Section */}
      <Box py={20} bg="white">
        <Container maxW="7xl">
          <Box textAlign="center" mb={16}>
            <Text fontSize="4xl" fontWeight="bold" mb={4} color="neutral.800">
              Meet Our Team
            </Text>
            <Text fontSize="xl" color="neutral.600" maxW="2xl" mx="auto">
              Our diverse team of experts brings together years of experience and a passion for innovation.
            </Text>
          </Box>
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={8}>
            {teamMembers.map((member, index) => (
              <Box key={index} textAlign="center">
                <Image
                  src={member.image}
                  alt={member.name}
                  borderRadius="full"
                  boxSize="200px"
                  mx="auto"
                  mb={4}
                  objectFit="cover"
                />
                <Heading size="md" mb={2} color="neutral.800">
                  {member.name}
                </Heading>
                <Text color="primary.500" fontWeight="semibold" mb={4}>
                  {member.role}
                </Text>
                <Text fontSize="sm" color="neutral.600" mb={4} lineHeight="tall">
                  {member.bio}
                </Text>
                <Stack direction="row" justify="center" gap={3}>
                  <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                    <Box
                      p={2}
                      color="neutral.400"
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
                      color="neutral.400"
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
                      color="neutral.400"
                      _hover={{ color: "primary.500" }}
                      cursor="pointer"
                      transition="color 0.2s"
                    >
                      <FaGithub size={20} />
                    </Box>
                  </a>
                </Stack>
              </Box>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box py={20} bg="primary.500" color="white">
        <Container maxW="7xl" textAlign="center">
          <Text fontSize="4xl" fontWeight="bold" mb={6}>
            Ready to Work with Us?
          </Text>
          <Text fontSize="xl" mb={8} opacity={0.9}>
            Let's discuss how our team can help bring your vision to life.
          </Text>
          <Stack direction={{ base: "column", sm: "row" }} gap={4} justify="center">
            <Link to="/contact" style={{ textDecoration: 'none' }}>
              <Button
                size="lg"
                bg="white"
                color="primary.500"
                _hover={{ bg: "neutral.100" }}
              >
                Start a Project
              </Button>
            </Link>
            <Link to="/portfolio" style={{ textDecoration: 'none' }}>
              <Button
                size="lg"
                variant="outline"
                borderColor="white"
                color="white"
                _hover={{ bg: "whiteAlpha.200" }}
              >
                View Our Work
              </Button>
            </Link>
          </Stack>
        </Container>
      </Box>
    </Box>
  )
}
export default AboutPage