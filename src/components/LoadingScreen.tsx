import { Box } from '@chakra-ui/react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'

const LoadingScreen = () => {
  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bg="background"
      display="flex"
      alignItems="center"
      justifyContent="center"
      zIndex={9999}
    >
      <Box
        width={{ base: '200px', md: '300px' }}
        height={{ base: '200px', md: '300px' }}
      >
        <DotLottieReact
          src="/animations/Loading.lottie"
          loop
          autoplay
          style={{ 
            width: '100%', 
            height: '100%',
          }}
        />
      </Box>
    </Box>
  )
}

export default LoadingScreen
