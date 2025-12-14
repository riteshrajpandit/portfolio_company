import { Box, Spinner } from '@chakra-ui/react'

/**
 * Simple page loader for route transitions and lazy-loaded components.
 * Uses a minimal spinner design without branding.
 */
const PageLoader = () => {
  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bg="white"
      display="flex"
      alignItems="center"
      justifyContent="center"
      zIndex={9999}
    >
      <Spinner
        size="xl"
        color="primary.500"
        borderWidth="3px"
      />
    </Box>
  )
}

export default PageLoader
