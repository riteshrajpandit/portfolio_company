import { useState, useEffect } from 'react'
import {
  Box,
  Container,
  Text,
  Button,
  Flex,
  Stack,
  VStack,
  HStack,
  IconButton,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { HiX, HiCog } from 'react-icons/hi'
import { motion, AnimatePresence } from 'framer-motion'
import {
  hasConsent,
  acceptAllCookies,
  rejectNonEssentialCookies,
  saveConsentPreferences,
  getConsentPreferences,
  COOKIE_CATEGORIES,
  DEFAULT_PREFERENCES,
} from '../utils/cookieConsent'
import type { CookiePreferences } from '../utils/cookieConsent'

const MotionBox = motion.create(Box)

interface CookieToggleProps {
  label: string
  description: string
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
}

const CookieToggle = ({ label, description, checked, onChange, disabled }: CookieToggleProps) => {
  return (
    <Flex 
      justify="space-between" 
      align="flex-start" 
      py={3}
      borderBottom="1px solid"
      borderColor="neutral.200"
      _last={{ borderBottom: 'none' }}
    >
      <Box flex="1" pr={4}>
        <Text fontWeight="600" color="neutral.800" fontSize="sm">
          {label}
        </Text>
        <Text fontSize="xs" color="neutral.500" mt={1}>
          {description}
        </Text>
      </Box>
      <Box
        as="button"
        onClick={() => !disabled && onChange(!checked)}
        cursor={disabled ? 'not-allowed' : 'pointer'}
        opacity={disabled ? 0.6 : 1}
        position="relative"
        width="44px"
        height="24px"
        borderRadius="full"
        bg={checked ? 'primary.500' : 'neutral.300'}
        transition="background-color 0.2s ease"
        flexShrink={0}
        mt={1}
      >
        <Box
          position="absolute"
          top="2px"
          left={checked ? '22px' : '2px'}
          width="20px"
          height="20px"
          borderRadius="full"
          bg="white"
          boxShadow="sm"
          transition="left 0.2s ease"
        />
      </Box>
    </Flex>
  )
}

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>(DEFAULT_PREFERENCES)

  useEffect(() => {
    // Check if consent has been given
    if (!hasConsent()) {
      // Small delay to ensure smooth page load
      const timer = setTimeout(() => setIsVisible(true), 1000)
      return () => clearTimeout(timer)
    } else {
      const saved = getConsentPreferences()
      if (saved) setPreferences(saved)
    }
  }, [])

  const handleAcceptAll = () => {
    acceptAllCookies()
    setIsVisible(false)
  }

  const handleRejectNonEssential = () => {
    rejectNonEssentialCookies()
    setIsVisible(false)
  }

  const handleSavePreferences = () => {
    saveConsentPreferences(preferences)
    setIsVisible(false)
    setShowPreferences(false)
  }

  const updatePreference = (key: keyof CookiePreferences, value: boolean) => {
    setPreferences(prev => ({ ...prev, [key]: value }))
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <MotionBox
          position="fixed"
          bottom={0}
          left={0}
          right={0}
          zIndex={9999}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        >
          <Box
            bg="white"
            borderTop="1px solid"
            borderColor="neutral.200"
            boxShadow="0 -4px 20px rgba(0, 0, 0, 0.1)"
          >
            <Container maxW="7xl" py={4} px={{ base: 4, md: 6 }}>
              {!showPreferences ? (
                // Main Banner View
                <Flex
                  direction={{ base: 'column', md: 'row' }}
                  align={{ base: 'stretch', md: 'center' }}
                  justify="space-between"
                  gap={4}
                >
                  <Box flex="1" pr={{ base: 0, md: 8 }}>
                    <Flex align="center" gap={2} mb={2}>
                      <Text fontSize="lg" fontWeight="700" color="neutral.900">
                        🍪 Cookie Preferences
                      </Text>
                    </Flex>
                    <Text fontSize="sm" color="neutral.600" lineHeight="1.6">
                      We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
                      By clicking "Accept All", you consent to our use of cookies.{' '}
                      <Link to="/privacy" style={{ color: '#1b75bb', textDecoration: 'underline' }}>
                        Learn more
                      </Link>
                    </Text>
                  </Box>
                  
                  <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    gap={3}
                    flexShrink={0}
                    align="stretch"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      borderRadius="full"
                      borderColor="neutral.300"
                      color="neutral.600"
                      fontWeight="500"
                      onClick={() => setShowPreferences(true)}
                      _hover={{ 
                        bg: 'neutral.50',
                        borderColor: 'neutral.400'
                      }}
                      px={4}
                    >
                      <HiCog style={{ marginRight: '6px' }} />
                      Customize
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      borderRadius="full"
                      borderColor="neutral.300"
                      color="neutral.700"
                      fontWeight="500"
                      onClick={handleRejectNonEssential}
                      _hover={{ 
                        bg: 'neutral.100',
                        borderColor: 'neutral.400'
                      }}
                      px={4}
                    >
                      Reject Non-Essential
                    </Button>
                    <Button
                      size="sm"
                      borderRadius="full"
                      bg="primary.500"
                      color="white"
                      fontWeight="600"
                      onClick={handleAcceptAll}
                      _hover={{ 
                        bg: 'primary.600',
                        transform: 'translateY(-1px)'
                      }}
                      transition="all 0.2s ease"
                      px={6}
                    >
                      Accept All
                    </Button>
                  </Stack>
                </Flex>
              ) : (
                // Preferences Panel
                <VStack align="stretch" gap={4}>
                  <Flex justify="space-between" align="center">
                    <Text fontSize="lg" fontWeight="700" color="neutral.900">
                      Cookie Preferences
                    </Text>
                    <IconButton
                      aria-label="Close preferences"
                      size="sm"
                      variant="ghost"
                      borderRadius="full"
                      onClick={() => setShowPreferences(false)}
                    >
                      <HiX size={18} />
                    </IconButton>
                  </Flex>
                  
                  <Text fontSize="sm" color="neutral.600">
                    Manage your cookie preferences below. Some cookies are necessary for the website to function properly.
                  </Text>

                  <Box 
                    bg="neutral.50" 
                    borderRadius="xl" 
                    p={4}
                    border="1px solid"
                    borderColor="neutral.200"
                  >
                    <CookieToggle
                      label={COOKIE_CATEGORIES.necessary.title}
                      description={COOKIE_CATEGORIES.necessary.description}
                      checked={true}
                      onChange={() => {}}
                      disabled
                    />
                    <CookieToggle
                      label={COOKIE_CATEGORIES.analytics.title}
                      description={COOKIE_CATEGORIES.analytics.description}
                      checked={preferences.analytics}
                      onChange={(v) => updatePreference('analytics', v)}
                    />
                    <CookieToggle
                      label={COOKIE_CATEGORIES.marketing.title}
                      description={COOKIE_CATEGORIES.marketing.description}
                      checked={preferences.marketing}
                      onChange={(v) => updatePreference('marketing', v)}
                    />
                    <CookieToggle
                      label={COOKIE_CATEGORIES.preferences.title}
                      description={COOKIE_CATEGORIES.preferences.description}
                      checked={preferences.preferences}
                      onChange={(v) => updatePreference('preferences', v)}
                    />
                  </Box>

                  <HStack justify="flex-end" gap={3}>
                    <Button
                      variant="outline"
                      size="sm"
                      borderRadius="full"
                      borderColor="neutral.300"
                      color="neutral.700"
                      fontWeight="500"
                      onClick={handleRejectNonEssential}
                      _hover={{ 
                        bg: 'neutral.100',
                        borderColor: 'neutral.400'
                      }}
                      px={4}
                    >
                      Reject All
                    </Button>
                    <Button
                      size="sm"
                      borderRadius="full"
                      bg="primary.500"
                      color="white"
                      fontWeight="600"
                      onClick={handleSavePreferences}
                      _hover={{ 
                        bg: 'primary.600',
                        transform: 'translateY(-1px)'
                      }}
                      transition="all 0.2s ease"
                      px={6}
                    >
                      Save Preferences
                    </Button>
                  </HStack>
                </VStack>
              )}
            </Container>
          </Box>
        </MotionBox>
      )}
    </AnimatePresence>
  )
}

export default CookieConsent
