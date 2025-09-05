import {
  Box,
  Container,
  Text,
  VStack,
  HStack,
  Flex,
  Icon,
} from "@chakra-ui/react";
import {
  HiLightBulb,
  HiClipboardDocumentList,
  HiCommandLine,
  HiBeaker,
  HiRocketLaunch,
  HiCheckCircle,
  HiShieldCheck,
  HiUsers,
} from "react-icons/hi2";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import { useRef } from "react";
import WaterDropletText from "../ui/WaterDropletText";

const developmentSteps = [
  {
    step: "01",
    title: "Idea",
    subtitle: "Innovation Begins Here",
    description:
      "Every great project starts with a spark of creativity. We collaborate with you to understand your vision, explore possibilities, and transform abstract concepts into concrete solutions that drive real business value.",
    icon: HiLightBulb,
    features: [
      "Brainstorming Sessions",
      "Market Research",
      "Feasibility Analysis",
      "Vision Alignment",
    ],
  },
  {
    step: "02",
    title: "Requirement Analysis",
    subtitle: "Strategic Foundation",
    description:
      "We dive deep into your business needs, user expectations, and technical requirements. Through careful analysis and stakeholder engagement, we create a comprehensive roadmap that ensures project success.",
    icon: HiClipboardDocumentList,
    features: [
      "Stakeholder Interviews",
      "User Story Mapping",
      "Technical Specifications",
      "Risk Assessment",
    ],
  },
  {
    step: "03",
    title: "Design & Develop",
    subtitle: "Crafting Excellence",
    description:
      "Our expert team brings your vision to life through cutting-edge design and robust development. We follow industry best practices, ensuring scalability, security, and exceptional user experience.",
    icon: HiCommandLine,
    features: [
      "UI/UX Design",
      "Agile Development",
      "Code Reviews",
      "Quality Assurance",
    ],
  },
  {
    step: "04",
    title: "Test & Release",
    subtitle: "Quality Assured",
    description:
      "Rigorous testing ensures your solution meets the highest standards. We conduct comprehensive testing across all platforms and scenarios before deploying to production environments.",
    icon: HiBeaker,
    features: [
      "Automated Testing",
      "Performance Optimization",
      "Security Audits",
      "User Acceptance Testing",
    ],
  },
  {
    step: "05",
    title: "Production",
    subtitle: "Live & Thriving",
    description:
      "Your solution goes live with confidence. We provide ongoing monitoring, maintenance, and support to ensure optimal performance, security compliance, and continuous improvement.",
    icon: HiRocketLaunch,
    features: [
      "Deployment Strategy",
      "Monitoring & Analytics",
      "24/7 Support",
      "Continuous Updates",
    ],
  },
];

// Configuration constants
const CARD_STACK_OFFSET = 24;
const SECTION_TOP_PADDING = 40;
const SECTION_BOTTOM_PADDING = 40;
const CARD_HEIGHT_VH = 85;

// Optimized animation configuration
const useCardAnimations = (
  index: number,
  totalCards: number,
  scrollYProgress: MotionValue<number>
) => {
  const cardDuration = 0.8 / totalCards;
  const bufferZone = 0.1;

  const cardStart = bufferZone + index * cardDuration;
  const cardPeak = cardStart + cardDuration * 0.3;
  const cardEnd = cardStart + cardDuration * 0.8;
  const scrollEnd = 1;

  const stickyTop = SECTION_TOP_PADDING + index * CARD_STACK_OFFSET;

  // Simplified Y transform for vertical stacking only
  const y = useTransform(
    scrollYProgress,
    [0, cardStart, cardPeak, cardEnd, scrollEnd],
    [0, 0, 0, -CARD_STACK_OFFSET * 0.8, -CARD_STACK_OFFSET * 1.2]
  );

  // Subtle scale effect for depth
  const scale = useTransform(
    scrollYProgress,
    [0, cardStart, cardPeak, cardEnd, scrollEnd],
    [1, 1, 1, 0.98 - index * 0.005, 0.96 - index * 0.008]
  );

  // Optimized spring configuration for 60fps
  const springConfig = { 
    stiffness: 120, 
    damping: 20, 
    mass: 0.9, 
    restDelta: 0.01 
  };

  return {
    stickyTop,
    y: useSpring(y, springConfig),
    scale: useSpring(scale, { ...springConfig, stiffness: 150, damping: 25 }),
  };
};

const StackedCard = ({
  step,
  index,
  totalSteps,
  scrollYProgress,
}: {
  step: (typeof developmentSteps)[0];
  index: number;
  totalSteps: number;
  scrollYProgress: MotionValue<number>;
}) => {
  const animations = useCardAnimations(index, totalSteps, scrollYProgress);

  return (
    <motion.div
      style={{
        position: "sticky",
        top: `${animations.stickyTop}px`,
        zIndex: totalSteps + index,
        y: animations.y,
        scale: animations.scale,
        willChange: "transform",
      }}
    >
      <Container maxW="7xl">
        <Box
          w="full"
          h={`${CARD_HEIGHT_VH}vh`}
          position="relative"
          borderRadius="3xl"
          overflow="hidden"
          bg="card"
          backdropFilter="blur(20px)"
          border="1px solid"
          borderColor="border"
          shadow="2xl"
          display="flex"
          alignItems="center"
        >
          <Flex
            direction={{ base: "column", lg: "row" }}
            align="center"
            justify="space-between"
            w="full"
            gap={{ base: 8, lg: 16 }}
            px={{ base: 6, md: 12 }}
            py={{ base: 8, md: 0 }}
          >
            {/* Content Side - Always on left for desktop */}
            <VStack
              flex="1"
              align={{ base: "center", lg: "flex-start" }}
              textAlign={{ base: "center", lg: "left" }}
              gap={6}
              maxW={{ base: "100%", lg: "500px" }}
            >
              {/* Step Number & Title */}
              <HStack
                gap={4}
                align="center"
                justify={{ base: "center", lg: "flex-start" }}
              >
                <Text
                  fontSize={{ base: "5xl", md: "6xl" }}
                  fontWeight="900"
                  color="primary.500"
                  opacity={0.3}
                  lineHeight="1"
                >
                  {step.step}
                </Text>
                <VStack
                  gap={2}
                  align={{ base: "center", lg: "flex-start" }}
                >
                  <Text
                    fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
                    fontWeight="700"
                    color="text"
                    lineHeight="1.2"
                  >
                    {step.title}
                  </Text>
                  <Text
                    fontSize={{ base: "md", md: "lg" }}
                    color="primary.500"
                    fontWeight="600"
                  >
                    {step.subtitle}
                  </Text>
                </VStack>
              </HStack>

              {/* Description */}
              <Text
                fontSize={{ base: "md", md: "lg" }}
                color="muted"
                lineHeight="1.7"
                textAlign={{ base: "center", lg: "left" }}
              >
                {step.description}
              </Text>

              {/* Features */}
              <VStack
                gap={3}
                align={{ base: "center", lg: "flex-start" }}
                mt={4}
              >
                {step.features.map((feature, idx) => (
                  <HStack
                    key={idx}
                    gap={3}
                    justify={{ base: "center", lg: "flex-start" }}
                  >
                    <Icon
                      as={HiCheckCircle}
                      color="primary.500"
                      fontSize="lg"
                    />
                    <Text
                      color="text"
                      fontWeight="500"
                      fontSize={{ base: "sm", md: "md" }}
                    >
                      {feature}
                    </Text>
                  </HStack>
                ))}
              </VStack>
            </VStack>

            {/* Icon Card Side - Always on right for desktop */}
            <Box
              flex="1"
              position="relative"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Box
                position="relative"
                w={{ base: "280px", md: "350px" }}
                h={{ base: "280px", md: "350px" }}
                borderRadius="3xl"
                bg="card"
                backdropFilter="blur(20px)"
                border="2px solid"
                borderColor="primary.200"
                overflow="hidden"
                shadow="xl"
                display="flex"
                alignItems="center"
                justifyContent="center"
                _before={{
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  bg: `linear-gradient(135deg, primary.50 0%, transparent 50%, primary.50 100%)`,
                  opacity: 0.1,
                  zIndex: 1,
                }}
              >
                {/* Background Pattern */}
                <Box
                  position="absolute"
                  top="0"
                  left="0"
                  right="0"
                  bottom="0"
                  opacity={0.03}
                  backgroundImage={`url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='7'/%3E%3Ccircle cx='53' cy='53' r='7'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`}
                  zIndex={1}
                />

                {/* Central Icon */}
                <VStack gap={6} zIndex={2}>
                  <motion.div
                    animate={{
                      rotateY: [0, 360],
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Box
                      p={{ base: 8, md: 10 }}
                      bg="primary.500"
                      color="white"
                      borderRadius="2xl"
                      fontSize={{ base: "4xl", md: "5xl" }}
                      shadow="xl"
                      position="relative"
                      _before={{
                        content: '""',
                        position: "absolute",
                        top: "-2px",
                        left: "-2px",
                        right: "-2px",
                        bottom: "-2px",
                        bg: "linear-gradient(45deg, primary.300, primary.600)",
                        borderRadius: "2xl",
                        zIndex: -1,
                      }}
                    >
                      <Icon as={step.icon} />
                    </Box>
                  </motion.div>

                  {/* Quality Badges */}
                  <HStack gap={4}>
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Box
                        p={3}
                        bg="green.500"
                        color="white"
                        borderRadius="lg"
                        fontSize="lg"
                        shadow="md"
                      >
                        <Icon as={HiShieldCheck} />
                      </Box>
                    </motion.div>
                    <motion.div
                      animate={{ y: [0, 5, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1,
                      }}
                    >
                      <Box
                        p={3}
                        bg="blue.500"
                        color="white"
                        borderRadius="lg"
                        fontSize="lg"
                        shadow="md"
                      >
                        <Icon as={HiUsers} />
                      </Box>
                    </motion.div>
                  </HStack>
                </VStack>

                {/* Subtle Floating Elements */}
                {Array.from({ length: 4 }, (_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      x: [0, 15, -15, 0],
                      y: [0, -15, 15, 0],
                      opacity: [0.2, 0.6, 0.2],
                    }}
                    transition={{
                      duration: 6 + i * 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 1.5,
                    }}
                    style={{
                      position: "absolute",
                      top: `${25 + i * 15}%`,
                      left: `${20 + i * 20}%`,
                      zIndex: 2,
                    }}
                  >
                    <Box
                      w={`${6 + i * 2}px`}
                      h={`${6 + i * 2}px`}
                      bg="primary.400"
                      borderRadius="full"
                      shadow="sm"
                      opacity={0.4}
                    />
                  </motion.div>
                ))}
              </Box>
            </Box>
          </Flex>
        </Box>
      </Container>
    </motion.div>
  );
};

const FeaturesSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const totalCards = developmentSteps.length;

  const totalSectionHeight = `calc(${totalCards * CARD_HEIGHT_VH}vh + ${SECTION_TOP_PADDING + SECTION_BOTTOM_PADDING}px)`;

  return (
    <Box position="relative">
      {/* Header Section */}
      <Container maxW="7xl" pt={{ base: 16, md: 20 }} pb={{ base: 3, md: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <VStack gap={4} maxW="4xl" mx="auto" textAlign="center">
            <Box py={2}>
              <WaterDropletText
                fontSize="sm"
                fontWeight="600"
                color="primary.500"
              >
                Development Process
              </WaterDropletText>
            </Box>
            <Text
              fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
              fontWeight="700"
              color="text"
            >
              From Idea to Production
            </Text>
            <Text fontSize="xl" color="muted" lineHeight="1.6" maxW="3xl">
              Experience our proven development process through an immersive
              journey. Each step builds upon the previous, creating a seamless
              path from concept to reality.
            </Text>
          </VStack>
        </motion.div>
      </Container>

      {/* Stacked Cards Container */}
      <Box
        ref={ref}
        position="relative"
        h={totalSectionHeight}
        pt={`${SECTION_TOP_PADDING}px`}
        pb={`${SECTION_BOTTOM_PADDING}px`}
      >
        {developmentSteps.map((step, index) => (
          <StackedCard
            key={index}
            step={step}
            index={index}
            totalSteps={totalCards}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </Box>
    </Box>
  );
};

export default FeaturesSection;