import { 
  Box, 
  Container, 
  Text, 
  VStack, 
  HStack,
  Grid,
  Badge,
  Image
} from '@chakra-ui/react'
import { motion } from 'framer-motion'

const testimonials = [
  {
    quote: "TechCorp delivered an exceptional product that exceeded our expectations. Their attention to detail and technical expertise is unmatched.",
    author: "Sarah Johnson",
    company: "InnovateCorp",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612d7dd?w=60&h=60&fit=crop&auto=format"
  },
  {
    quote: "Working with TechCorp was a game-changer for our business. They transformed our vision into reality with remarkable precision.",
    author: "Michael Chen",
    company: "FutureTech",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&auto=format"
  },
  {
    quote: "The team's dedication to quality and innovation made our project a tremendous success. Highly recommended!",
    author: "Emily Rodriguez",
    company: "NextGen Solutions",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&auto=format"
  }
]

const TestimonialsSection = () => {
  return (
    <Box bg="neutral.50" py={{ base: 16, md: 20 }}>
      <Container maxW="7xl">
        <VStack gap={{ base: 12, md: 16 }} textAlign="center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <VStack gap={4} maxW="3xl">
              <Badge colorScheme="primary" variant="outline" px={4} py={1} borderRadius="full">
                Client Success
              </Badge>
              <Text fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }} fontWeight="700" color="text">
                Trusted by Industry Leaders
              </Text>
            </VStack>
          </motion.div>

          <Grid
            templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
            gap={8}
            w="full"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
              >
                <Box
                  p={8}
                  bg="card"
                  backdropFilter="blur(20px)"
                  border="1px solid"
                  borderColor="border"
                  borderRadius="2xl"
                  transition="all 0.3s ease"
                  _hover={{
                    transform: "translateY(-4px)",
                    shadow: "xl"
                  }}
                  height="100%"
                >
                  <VStack gap={6} align="start">
                    <Text
                      fontSize="lg"
                      color="text"
                      lineHeight="1.6"
                      fontStyle="italic"
                    >
                      "{testimonial.quote}"
                    </Text>
                    
                    <HStack gap={4}>
                      <Image
                        src={testimonial.image}
                        alt={testimonial.author}
                        width="50px"
                        height="50px"
                        borderRadius="full"
                        objectFit="cover"
                      />
                      <VStack align="start" gap={0}>
                        <Text fontWeight="600" color="text">
                          {testimonial.author}
                        </Text>
                        <Text fontSize="sm" color="muted">
                          {testimonial.company}
                        </Text>
                      </VStack>
                    </HStack>
                  </VStack>
                </Box>
              </motion.div>
            ))}
          </Grid>
        </VStack>
      </Container>
    </Box>
  )
}

export default TestimonialsSection
