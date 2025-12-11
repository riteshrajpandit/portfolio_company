import { 
  VStack, 
  Heading, 
  Text, 
  Stack, 
  Button, 
  Icon 
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { HiArrowRight, HiPlay } from 'react-icons/hi2'
import { motion } from 'framer-motion'

const HeroHeader = () => {
  const navigate = useNavigate()

  return (
    <VStack gap={8} textAlign="center" mb={{ base: 16, md: 20 }} maxW="4xl" mx="auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Heading
          as="h1"
          fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
          fontWeight="800"
          lineHeight="1.2"
          color="text"
          mb={6}
        >
          Innovative Digital <Text as="span" color="primary.500">Solutions</Text> That Transform
        </Heading>
        
        <Text
          fontSize={{ base: "lg", md: "xl" }}
          color="muted"
          maxW="2xl"
          mx="auto"
          mb={8}
          lineHeight="1.6"
        >
          We craft exceptional digital experiences that drive growth and success. From cutting-edge web applications to innovative mobile solutions, we bring your vision to life with precision and creativity.
        </Text>

        <Stack 
          direction={{ base: "column", sm: "row" }} 
          gap={4} 
          justify="center"
          align="center"
        >
          <Button
            onClick={() => navigate('/contact')}
            size="lg"
            colorScheme="primary"
            px={8}
            h={14}
            fontSize="md"
          >
            Let's Meet <Icon as={HiArrowRight} ml={2} />
          </Button>
          <Button
            onClick={() => navigate('/products')}
            size="lg"
            variant="outline"
            px={8}
            h={14}
            fontSize="md"
            bg="white"
          >
            View Our Products <Icon as={HiPlay} ml={2} />
          </Button>
        </Stack>
      </motion.div>
    </VStack>
  )
}

export default HeroHeader
