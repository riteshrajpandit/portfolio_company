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
import { motion, useAnimationFrame } from "framer-motion"
import { useState, useRef } from "react"
import { 
  FaLinkedin, 
  FaXTwitter,
} from "react-icons/fa6"
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
    name: "Suresh Bhandari",
    role: "CEO & Founder",
    bio: "Suresh leads us from all frontiers, leveraging over two decades of expertise in IT and management to lead teams effectively.",
    image: "/teams/Suresh.png",
    social: {
      linkedin: "https://linkedin.com/in/sureshbhandari",
      twitter: "https://x.com/sureshbhandari2",
      github: "https://github.com"
    }
  },
  {
    name: "Divyendu Bhatt",
    role: "CTO & Security Advisor",
    bio: "Divyendu drives our security and compliances while implementing frameworks, managing vulnerabilities, and ensuring regulatory compliance.",
    image: "/teams/Divyendu.png",
    social: {
      linkedin: "https://linkedin.com/in/dm-bhatt-0bb8a48",
      twitter: "https://x.com",
      github: "https://github.com"
    }
  },
    {
    name: "Abiral Bhandari",
    role: "HR and Project Manager",
    bio: "Abiral leads our technical vision with expertise in modern web technologies and scalable architecture design.",
    image: "/teams/Abiral.png",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://x.com",
      github: "https://github.com"
    }
  },
      {
    name: "Tejash Katuwal",
    role: "AI Engineer",
    bio: "Tejash builds AI models and data pipelines that help drive data-driven decisions across the organization.",
    image: "/teams/Tejash.jpg",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://x.com",
      github: "https://github.com"
    }
  },
  {
    name: "Nibesh Suwal",
    role: "Lead Backend Developer",
    bio: "Nibesh manages our infrastructure and deployment pipelines, ensuring reliable and scalable cloud solutions.",
    image: "/teams/Nibesh.png",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://x.com",
      github: "https://github.com"
    }
  },
  {
    name: "Ritesh Raj Pandit",
    role: "Lead Frontend Developer",
    bio: "Ritesh brings creative vision to life with user-centered design principles and a passion for beautiful, functional interfaces.",
    image: "/teams/Ritesh.png",
    social: {
      linkedin: "https://linkedin.com/in/riteshrajpandit",
      twitter: "https://x.com/riteshrajpandit",
      github: "https://github.com"
    }
  },

  {
    name: "Ashim Thapa Magar",
    role: "Frontend Developer",
    bio: "Ashim brings creative vision to life with user-centered design principles and a passion for beautiful, functional interfaces.",
    image: "/teams/ashim.jpeg",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://x.com",
      github: "https://github.com"
    }
  },
  
  {
    name: "Dipak Bohara",
    role: "Backend Developer",
    bio: "Dipak is passionate about building scalable applications and implementing best practices in software development.",
    image: "/teams/dipakbohara.jpeg",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://x.com",
      github: "https://github.com"
    }
  },
  {
    name: "Diwas Gauli",
    role: "Backend Developer",
    bio: "Diwas builds robust server-side solutions and ensures optimal performance and security of our applications.",
    image: "/teams/diwas.jpeg",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://x.com",
      github: "https://github.com"
    }
  },
  {
    name: "Kaustuv Bastakoti",
    role: "Backend Developer",
    bio: "Kaustuv builds robust server-side solutions and ensures optimal performance and security of our applications.",
    image: "/teams/kaustuv.jpeg",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://x.com",
      github: "https://github.com"
    }
  },
  {
    name: "Laxmi Regmi",
    role: "Frontend Developer",
    bio: "Laxmi crafts intuitive user experiences and beautiful interfaces that delight users and drive engagement.",
    image: "/teams/laxmi.jpeg",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://x.com",
      github: "https://github.com"
    }
  },

  {
    name: "Shubham Ghimire",
    role: "Frontend Developer",
    bio: "Shubham works across the entire stack, bringing ideas from conception to deployment with modern technologies.",
    image: "/teams/shubham.jpeg",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://x.com",
      github: "https://github.com"
    }
  },
  {
    name: "Suyog Bhattarai",
    role: "Frontend Developer",
    bio: "Suyog ensures our products meet the highest quality standards through comprehensive testing and quality processes.",
    image: "/teams/suyog.jpeg",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://x.com",
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
  { label: "Team Members", value: "13+", icon: HiUserGroup },
  { label: "Years of Collective Experience", value: "100+", icon: HiTrophy },
  { label: "Concurrent Projects", value: "3+", icon: HiBriefcase },
  { label: "Client Satisfaction", value: "99.9%", icon: HiHeart }
]

const MotionBox = motion(Box)
const MotionContainer = motion(Container)

// Carousel component with auto-play, hover pause, and manual controls
const DevelopmentTeamCarousel = ({ members }: { members: typeof teamMembers }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [offset, setOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const constraintsRef = useRef<HTMLDivElement>(null)
  
  const developmentTeam = members.slice(6)
  const itemWidth = 184 // 160px + 24px gap
  const totalWidth = developmentTeam.length * itemWidth
  
  // Auto-scroll animation - continuous marquee
  useAnimationFrame((_t, delta) => {
    if (!isHovered && !isDragging) {
      setOffset(prev => {
        const newOffset = prev + (-30 / 1000) * delta
        // Use modulo to wrap seamlessly - when we scroll one full width, reset to 0
        // This creates the illusion because we render the items multiple times
        return newOffset <= -totalWidth ? newOffset + totalWidth : newOffset
      })
    }
  })
  
  // Touch/Mouse drag handlers
  const handleDragStart = (clientX: number) => {
    setIsDragging(true)
    setDragStart(clientX)
    setDragOffset(0)
  }
  
  const handleDragMove = (clientX: number) => {
    if (isDragging) {
      const diff = clientX - dragStart
      setDragOffset(diff)
    }
  }
  
  const handleDragEnd = () => {
    if (isDragging) {
      setOffset(prev => {
        const newOffset = prev + dragOffset
        // Wrap seamlessly
        if (newOffset <= -totalWidth) {
          return newOffset + totalWidth
        } else if (newOffset >= 0) {
          return newOffset - totalWidth
        }
        return newOffset
      })
      setIsDragging(false)
      setDragOffset(0)
    }
  }
  
  return (
    <Box 
      position="relative"
      w="full"
      overflow="hidden"
      py={4}
      ref={constraintsRef}
      cursor={isDragging ? "grabbing" : "grab"}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        handleDragEnd()
      }}
      onMouseDown={(e) => handleDragStart(e.clientX)}
      onMouseMove={(e) => handleDragMove(e.clientX)}
      onMouseUp={handleDragEnd}
      onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
      onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
      onTouchEnd={handleDragEnd}
    >
      {/* Gradient Overlays for fade effect */}
      <Box
        position="absolute"
        left={0}
        top={0}
        bottom={0}
        w={{ base: "60px", md: "100px" }}
        bgGradient="linear(to-r, white, transparent)"
        zIndex={2}
        pointerEvents="none"
      />
      <Box
        position="absolute"
        right={0}
        top={0}
        bottom={0}
        w={{ base: "60px", md: "100px" }}
        bgGradient="linear(to-l, white, transparent)"
        zIndex={2}
        pointerEvents="none"
      />
      
      {/* Carousel Container - Infinite loop with CSS transform */}
      <Box
        display="flex"
        gap="24px"
        userSelect="none"
        style={{
          transform: `translateX(${offset + dragOffset}px)`,
          transition: 'none', // No transition for smooth 60fps animation
          willChange: "transform"
        }}
      >
        {/* Render items three times for seamless infinite scroll - like stones in a circle */}
        {[...developmentTeam, ...developmentTeam, ...developmentTeam].map((member, index) => (
          <Box
            key={`team-${index}`}
            minW={{ base: "140px", md: "160px" }}
            flexShrink={0}
            textAlign="center"
          >
            <VStack gap={3}>
              <Box
                position="relative"
                _hover={{ transform: "scale(1.05)" }}
                transition="all 0.3s ease"
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  borderRadius="xl"
                  boxSize={{ base: "120px", md: "140px" }}
                  objectFit="cover"
                  shadow="md"
                  draggable={false}
                />
              </Box>
              <VStack gap={1}>
                <Text 
                  fontSize={{ base: "sm", md: "md" }} 
                  fontWeight="700" 
                  color="text"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                  w={{ base: "130px", md: "150px" }}
                >
                  {member.name}
                </Text>
                <Text 
                  color="primary.500" 
                  fontWeight="600" 
                  fontSize="xs"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                  w={{ base: "130px", md: "150px" }}
                >
                  {member.role}
                </Text>
                <Text 
                  fontSize="xs" 
                  color="muted" 
                  lineHeight="1.4" 
                  textAlign="center"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  w={{ base: "130px", md: "150px" }}
                  h="32px"
                  css={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {member.bio}
                </Text>
              </VStack>
              <HStack gap={2} justify="center">
                <a 
                  href={member.social.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Box
                    p={1}
                    color="muted"
                    _hover={{ color: "primary.500" }}
                    cursor="pointer"
                    transition="color 0.2s"
                  >
                    <FaLinkedin size={14} />
                  </Box>
                </a>
                <a 
                  href={member.social.twitter} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Box
                    p={1}
                    color="muted"
                    _hover={{ color: "#000000" }}
                    cursor="pointer"
                    transition="color 0.2s"
                  >
                    <FaXTwitter size={14} />
                  </Box>
                </a>
              </HStack>
            </VStack>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export const AboutPage = () => {
  return (
    <Box overflowX="hidden">
      {/* Hero Section */}
      <Box bg="neutral.50" pt={{ base: 28, md: 40 }} pb={{ base: 12, md: 16 }}>
        <Container maxW="7xl" px={{ base: 4, md: 6 }}>
          <MotionContainer
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            textAlign="center"
            maxW="4xl"
            mx="auto"
          >
            <Text
              fontSize={{ base: "2xl", sm: "3xl", md: "5xl", lg: "6xl" }}
              fontWeight="700"
              lineHeight="1.2"
              color="text"
              mb={{ base: 4, md: 6 }}
            >
              Building the{" "}
              <Text as="span" color="primary.500">
                Future
              </Text>{" "}
              Together
            </Text>
            <Text
              fontSize={{ base: "md", md: "xl" }}
              color="muted"
              lineHeight="1.6"
              maxW="3xl"
              mx="auto"
              mb={{ base: 6, md: 8 }}
            >
              Founded in 2025, we've been at the forefront of digital innovation, helping businesses 
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
              <Link to="/contact" style={{ textDecoration: 'none' }}>
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
      <Container maxW="7xl" py={{ base: 12, md: 16 }} px={{ base: 4, md: 6 }}>
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
      <Box py={{ base: 12, md: 20 }} bg="white">
        <Container maxW="7xl" px={{ base: 4, md: 6 }}>
          <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={{ base: 8, lg: 12 }} alignItems="center">
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
      <Box py={{ base: 12, md: 20 }} bg="neutral.50">
        <Container maxW="7xl" px={{ base: 4, md: 6 }}>
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            textAlign="center"
            mb={12}
          >
            <Text fontSize={{ base: "2xl", md: "4xl" }} fontWeight="700" mb={4} color="text">
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
      <Box id="team" py={{ base: 12, md: 20 }} bg="white">
        <Container maxW="7xl" px={{ base: 4, md: 6 }}>
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            textAlign="center"
            mb={12}
          >
            <Text fontSize={{ base: "2xl", md: "4xl" }} fontWeight="700" mb={4} color="text">
              Meet Our Team
            </Text>
            <Text fontSize={{ base: "md", md: "xl" }} color="muted" maxW="2xl" mx="auto">
              Our diverse team of experts brings together years of experience and a passion for innovation.
            </Text>
          </MotionBox>
          
          {/* Leadership Team - First 6 members */}
          <VStack gap={12} overflow={"hidden"}>
            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={12}>
              {teamMembers.slice(0, 6).map((member, index) => (
                <MotionBox
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  textAlign="center"
                >
                  <VStack gap={6}>
                    <Box position="relative">
                      <Image
                        src={member.image}
                        alt={member.name}
                        borderRadius="2xl"
                        w="280px"
                        h="360px"
                        objectFit="cover"
                        shadow="xl"
                        _hover={{ transform: "scale(1.02)" }}
                        transition="all 0.3s ease"
                      />
                      <Box
                        position="absolute"
                        inset={0}
                        bg="linear-gradient(180deg, transparent 60%, blackAlpha.700)"
                        borderRadius="2xl"
                      />
                    </Box>
                    <VStack gap={3} maxW="280px">
                      <Text fontSize="xl" fontWeight="700" color="text">
                        {member.name}
                      </Text>
                      <Text color="primary.500" fontWeight="600" fontSize="md">
                        {member.role}
                      </Text>
                      <Text fontSize="sm" color="muted" lineHeight="1.6" textAlign="center">
                        {member.bio}
                      </Text>
                    </VStack>
                    <HStack gap={4} justify="center">
                      <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                        <Box
                          p={3}
                          bg="gray.100"
                          borderRadius="lg"
                          color="muted"
                          _hover={{ color: "primary.500", bg: "primary.50" }}
                          cursor="pointer"
                          transition="all 0.2s"
                        >
                          <FaLinkedin size={20} />
                        </Box>
                      </a>
                      <a href={member.social.twitter} target="_blank" rel="noopener noreferrer">
                        <Box
                          p={3}
                          bg="gray.100"
                          borderRadius="lg"
                          color="muted"
                          _hover={{ color: "#000000", bg: "gray.200" }}
                          cursor="pointer"
                          transition="all 0.2s"
                        >
                          <FaXTwitter size={20} />
                        </Box>
                      </a>
                    </HStack>
                  </VStack>
                </MotionBox>
              ))}
            </Grid>

            {/* Development Team - Remaining members */}
            {teamMembers.length > 6 && (
              <VStack gap={8} w="full">
                <Box textAlign="center">
                  <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="700" mb={2} color="text">
                    Our Development Team
                  </Text>
                  <Text fontSize="md" color="muted" maxW="xl" mx="auto">
                    Talented developers and designers who bring our vision to life.
                  </Text>
                </Box>
                
                {/* Infinite Auto-play Carousel with Hover Pause */}
                <DevelopmentTeamCarousel members={teamMembers} />
              </VStack>
            )}
          </VStack>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container maxW="7xl" py={{ base: 12, md: 20 }} px={{ base: 4, md: 6 }}>
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
                <Link to="/contact" style={{ textDecoration: 'none' }}>
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