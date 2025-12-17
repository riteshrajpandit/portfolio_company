import { Box, Container } from "@chakra-ui/react";
import { HeroBackground, HeroHeader } from "../hero";

const HeroSection = () => {
  return (
    <Box
      position="relative"
      minHeight="100vh"
      overflow="hidden"
      pt={{ base: 24, md: 32 }}
      bg="#c2e0f5"
    >
      <HeroBackground />

      <Container
        maxW="7xl"
        position="relative"
        zIndex={1}
        px={{ base: 4, md: 6 }}
      >
        <HeroHeader />
      </Container>
    </Box>
  );
};

export default HeroSection;
