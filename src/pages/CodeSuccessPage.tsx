import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { VStack, Text, Heading, Box, Table, Link, HStack, Slider, NumberInput } from "@chakra-ui/react"
import { useHideChatbot } from "@/hooks/useHideChatbot"
import { SecureLayout } from "@/components/secure/SecureLayout"
import { SecureSidebar } from "@/components/secure/SecureSidebar"
import { TopicSection } from "@/components/secure/TopicSection"
import { BulletList } from "@/components/secure/content/BulletList"
import { CompetitiveLandscapeTable } from "@/components/secure/content/CompetitiveLandscapeTable"
import { DataChart } from "@/components/secure/content/DataChart"

const TOPICS = [
  { id: "topic-1", title: "Executive Summary" },
  { id: "topic-2", title: "Problem Statement" },
  { id: "topic-3", title: <span>The Solution: Secode<sup style={{ fontSize: '0.6em' }}>TM</sup></span> },
  { id: "topic-4", title: "Product Overview" },
  { id: "topic-5", title: "Technology & Architecture" },
  { id: "topic-6", title: "Market Opportunity" },
  { id: "topic-7", title: "Competitive Landscape" },
  { id: "topic-8", title: "Business Model" },
  { id: "topic-9", title: "Go-To-Market Strategy" },
  { id: "topic-10", title: "Traction and Validation" },
  { id: "topic-11", title: "Team" },
  { id: "topic-12", title: "Financial Projections (3-Year Summary)" },
  { id: "topic-13", title: "Captital Requirements" },
  { id: "topic-14", title: "Exit Strategy" },
  { id: "topic-15", title: "Investment Proposition" },
  { id: "topic-16", title: "Fund Commitment" },
  { id: "topic-17", title: "Conclusion" },
]

export default function CodeSuccessPage() {
  useHideChatbot()
  const navigate = useNavigate()
  const location = useLocation()
  const [amount, setAmount] = useState(200000)

  useEffect(() => {
    if (!location.state?.verified) {
      navigate("/secode", { replace: true })
    }
  }, [navigate, location])

  if (!location.state?.verified) {
    return null
  }

  return (
    <SecureLayout
      sidebar={<SecureSidebar topics={TOPICS} />}
    >
      <VStack gap={12} align="stretch">
        <Box mb={8}>
          <Text fontSize="md" fontWeight={"bold"} color="gray.500">
            Investor Memorandum
          </Text>
          <Text fontSize="md" color="gray.600">
            Confidential – For Investor Review Only
          </Text>
          <Heading size="2xl" mt={4} mb={2} color={"blackAlpha.800"}>
            Secode<sup style={{ fontSize: '0.6em' }}>TM</sup> - Clean AI Security
          </Heading>
          <Text fontSize="md" color="gray.600">
            Stage: Proof of Concept Completed | Funding: Bootstrapped
          </Text>
        </Box>

        <TopicSection id="topic-1" title="1. Executive Summary">
          <Text color="gray.600" mb={4}>
            Secode<sup style={{ fontSize: '0.6em' }}>TM</sup> is the world’s first Pre-MLOps AI Security Platform, securing AI systems before they are built.
            AI failures such as hallucination, bias, privacy breaches, insecure code, and harmful datasets originate
            during the development process—not in production. Today’s AI safety market focuses almost entirely
            on runtime guardrails, model firewalls, and post-deployment monitoring.
          </Text>
          <Text color="blackAlpha.700" fontWeight="bold" fontSize="lg" mb={4}>
            Secode<sup style={{ fontSize: '0.6em' }}>TM</sup> introduces a new category: AI safety at the point of creation.
          </Text>
          <Text color="gray.600" mb={4}>
            By integrating directly into the developer’s workflow, Secode<sup style={{ fontSize: '0.6em' }}>TM</sup> enforces safety, security, fairness,
            privacy, and compliance as code, prompts, and datasets are being created—preventing unsafe artifacts
            from ever entering the MLOps pipeline.
          </Text>
          <Text color="gray.600">
            This memorandum outlines the market opportunity, product strategy, competitive position, team
            capability, and proposed investment structure.
          </Text>
        </TopicSection>

        <TopicSection id="topic-2" title="2. Problem Statement">
          <Text color="gray.700" mb={4}>
            As enterprises accelerate AI adoption, they face increasing risks:
          </Text>
          <BulletList
            items={[
              "Hallucinations → leading to financial, legal, and reputational loss",
              "Bias and fairness issues → regulatory penalties & discrimination risks",
              "Privacy/PII leaks → violations under DPDP , GDPR, HIPAA",
              "Insecure code → opens attack vectors within AI agents and pipelines",
              "Malicious/trapped datasets → compromise downstream models",
              "Lack of compliance traceability → regulatory nonconformity"
            ]}
          />
          <Text color="gray.600" mt={4}>
            Yet all mainstream AI safety tools activate after deployment or late in the MLOps lifecycle.
          </Text>

          <Heading size="md" color="blackAlpha.800" mt={8} mb={4}>
            Current Industry Gap
          </Heading>
          <VStack align="start" gap={2} mb={6}>
            <Text color="gray.600">✔ MLOps tools validate after training</Text>
            <Text color="gray.600">✔ Guardrails defend after inference</Text>
            <Text color="gray.600" mb={4}>✔ Monitoring tools alert after misuse</Text>
            <Text color="gray.600" fontWeight={"bold"}>❌ Nothing protects AI during creation — where 70% of AI risks actually originate.</Text>
          </VStack>
          <Text color="red.500" fontWeight="bold" fontSize="lg">
            The AI industry is missing the “DevSecOps for AI” layer.
          </Text>
        </TopicSection>

        <TopicSection id="topic-3" title={<span>3. The Solution: Secode<sup style={{ fontSize: '0.6em' }}>TM</sup></span>}>
          <Text color="gray.700" mb={6}>
            Secode<sup style={{ fontSize: '0.6em' }}>TM</sup> is a Secure Vibe Code Generator and Pre-MLOps AI Security Platform that enforces trusted AI
            development at the source.
          </Text>

          <Heading size="md" color="blackAlpha.800" mb={4}>
            How Secode<sup style={{ fontSize: '0.6em' }}>TM</sup> Works
          </Heading>
          <Text color="gray.700" mb={2}>Secode<sup style={{ fontSize: '0.6em' }}>TM</sup> plugs directly into:</Text>
          <BulletList
            items={[
              "Developer IDEs",
              "Prompt-building environments",
              "Data-pipeline creation tools",
              "Model experimentation interfaces"
            ]}
          />

          <Text color="gray.700" mt={4} mb={2}>It applies real-time checks for:</Text>
          <BulletList
            items={[
              "Hallucination prevention",
              "Bias and fairness scoring",
              "Prompt security & injection resistance",
              "Dataset anomaly detection & sanitization",
              "Secure code generation",
              "Compliance automation (ISO 42001, NIST AI, DPDP , GDPR)",
              "Governance & audit trails"
            ]}
          />

          <Heading size="md" color="blackAlpha.800" mt={8} mb={4}>
            Key Value Proposition
          </Heading>
          <Box borderLeft="4px solid" borderColor="blue.400" pl={4} py={2} mb={6} bg="whiteAlpha.50">
            <Text color="blackAlpha.800" fontSize="lg" fontStyle="italic">
              “Secode<sup style={{ fontSize: '0.6em' }}>TM</sup> prevents unsafe AI before it is built.”
            </Text>
          </Box>
          <Text color="gray.700" mb={2}>This makes it:</Text>
          <BulletList
            items={[
              "Preventive instead of corrective",
              "Scalable instead of reactive",
              "Compliance-ready by design"
            ]}
          />
        </TopicSection>

        <TopicSection id="topic-4" title="4. Product Overview">
          <Heading size="md" color="blackAlpha.800" mb={6}>
            Core Components
          </Heading>
          <Box display="grid" gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
            <Box bg="blackAlpha.50" p={6} borderRadius="lg">
              <Heading size="sm" color="blue.500" mb={4}>1. Secode<sup style={{ fontSize: '0.6em' }}>TM</sup> IDE Plug-in (Developer Integration)</Heading>
              <BulletList
                items={[
                  "Safe prompt generation",
                  "Secure code enforcement",
                  "Hallucination scoring",
                  "Real-time guardrails while coding"
                ]}
              />
            </Box>
            <Box bg="blackAlpha.50" p={6} borderRadius="lg">
              <Heading size="sm" color="blue.500" mb={4}>2. Dataset Guardian<sup style={{ fontSize: '0.6em' }}>TM</sup></Heading>
              <BulletList
                items={[
                  "Detects malicious or biased datasets",
                  "Identifies poisoning attempts",
                  "Enforces integrity before training"
                ]}
              />
            </Box>
            <Box bg="blackAlpha.50" p={6} borderRadius="lg">
              <Heading size="sm" color="blue.500" mb={4}>3. Compliance Engine</Heading>
              <BulletList
                items={[
                  "ISO 42001 AI Management",
                  "NIST AI Risk Management",
                  "DPDP / GDPR privacy enforcement",
                  "Auto-generated documentation & audit logs"
                ]}
              />
            </Box>
            <Box bg="blackAlpha.50" p={6} borderRadius="lg">
              <Heading size="sm" color="blue.500" mb={4}>4. Governance Dashboard</Heading>
              <BulletList
                items={[
                  "AI risk register",
                  "Compliance scoring",
                  "Development audit trails",
                  "Enterprise control center"
                ]}
              />
            </Box>
          </Box>
        </TopicSection>

        <TopicSection id="topic-5" title="5. Technology & Architecture">
          <Text color="gray.700" mb={4}>
            Secode<sup style={{ fontSize: '0.6em' }}>TM</sup> is built on:
          </Text>
          <BulletList
            items={[
              "Hybrid rule-based + LLM-driven safety engines",
              "Static and dynamic code analysis",
              "Prompt pattern recognition and injection detection",
              "Dataset anomaly detection",
              "Multi-policy compliance mapping",
              "Plugin architecture compatible with VS Code, JetBrains, Jupyter, etc."
            ]}
          />
          <Text color="gray.700" mt={4}>
            The architecture is modular and built for enterprise expansion, including on-premise deployments.
          </Text>
        </TopicSection>

        <TopicSection id="topic-6" title="6. Market Opportunity">
          <Text color="gray.700" mb={4}>
            AI development is accelerating globally:
          </Text>
          <BulletList
            items={[
              "20M+ AI/ML developers (growing ~18% YoY)",
              "Enterprises shifting to generative AI workflows",
              "Global AI regulations becoming mandatory"
            ]}
          />

          <Box display="grid" gap={4} my={6}>
            <Box bg="whiteAlpha.900" p={4} borderRadius="lg">
              <HStack gap={6} align="center">
                <Text
                  fontSize="5xl"
                  fontWeight="extrabold"
                  lineHeight="1"
                  letterSpacing="tight"
                  // The core technique:
                  // 1. Make the actual text color transparent so the background shows through.
                  color="transparent"
                  // 2. Define the white border (stroke).
                  css={{
                    WebkitTextStroke: "1px #000000ff",
                    // 3. Create the "Fold" effect using a hard-stop linear gradient.
                    // We go from White -> Transparent/Blue Shadow to mimic a fold line.
                    backgroundImage: "linear-gradient(75deg, white 0%, white 20%, #000000ff 45%, #000000ff 100%)",
                    // 4. Clip the background to the text shape.
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    // Optional: Add a subtle drop shadow to lift it off the page
                    // filter: "drop-shadow(0px 10px 20px rgba(0, 119, 255, 0.3))",
                  }}
                >
                  $ 12.50<Text as="span" fontSize="3xl">B</Text>
                </Text>
                <Box>
                  <Heading size="sm" color="blue.500" mb={1}>TAM (Total Addressable Market)</Heading>
                  <Text fontSize="sm" color="gray.600">AI developers, AI-first enterprises, regulated industries</Text>
                </Box>
              </HStack>
            </Box>

            <Box bg="whiteAlpha.900" p={4} borderRadius="lg">
              <HStack gap={6} align="center">
                <Text
                  fontSize="5xl"
                  fontWeight="extrabold"
                  lineHeight="1"
                  letterSpacing="tight"
                  // The core technique:
                  // 1. Make the actual text color transparent so the background shows through.
                  color="transparent"
                  // 2. Define the white border (stroke).
                  css={{
                    WebkitTextStroke: "1px #000000ff",
                    // 3. Create the "Fold" effect using a hard-stop linear gradient.
                    // We go from White -> Transparent/Blue Shadow to mimic a fold line.
                    backgroundImage: "linear-gradient(75deg, white 0%, white 20%, #000000ff 45%, #000000ff 100%)",
                    // 4. Clip the background to the text shape.
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    // Optional: Add a subtle drop shadow to lift it off the page
                    // filter: "drop-shadow(0px 10px 20px rgba(0, 119, 255, 0.3))",
                  }}
                >
                  $ 3.40<Text as="span" fontSize="3xl">B</Text>
                </Text>
                <Box>
                  <Heading size="sm" color="blue.500" mb={1}>SAM (Serviceable Available Market)</Heading>
                  <Text fontSize="sm" color="gray.600">Fintech, healthcare, autonomous systems, defense, GovTech</Text>
                </Box>
              </HStack>
            </Box>

            <Box bg="whiteAlpha.900" p={4} borderRadius="lg">
              <HStack gap={6} align="center">
                <Text
                  fontSize="5xl"
                  fontWeight="extrabold"
                  lineHeight="1"
                  letterSpacing="tight"
                  // The core technique:
                  // 1. Make the actual text color transparent so the background shows through.
                  color="transparent"
                  // 2. Define the white border (stroke).
                  css={{
                    WebkitTextStroke: "1px #000000ff",
                    // 3. Create the "Fold" effect using a hard-stop linear gradient.
                    // We go from White -> Transparent/Blue Shadow to mimic a fold line.
                    backgroundImage: "linear-gradient(75deg, white 0%, white 20%, #000000ff 45%, #000000ff 100%)",
                    // 4. Clip the background to the text shape.
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    // Optional: Add a subtle drop shadow to lift it off the page
                    // filter: "drop-shadow(0px 10px 20px rgba(0, 119, 255, 0.3))",
                  }}
                >
                  $ 150<Text as="span" fontSize="3xl">M</Text>
                </Text>
                <Box>
                  <Heading size="sm" color="blue.500" mb={1}>SOM (Serviceable Obtainable Market)</Heading>
                  <Text fontSize="sm" color="gray.600">in 3–5 years (5,000 enterprises → 500,000 developers)</Text>
                </Box>
              </HStack>
            </Box>
          </Box>

          <Text color="blue.400" fontWeight="bold" mb={6} fontSize="lg">
            <Text as="span" fontSize="4xl" color="blue.500" mr={1}
            css={{
              // WebkitTextStroke: "1px #000000",
            }}
            >

              Zero
              </Text> direct competitors in the Pre-MLOps category
          </Text>

          <Heading size="md" color="black" mb={4}>
            Market Timing
          </Heading>
          <BulletList
            items={[
              "ISO 42001 released globally",
              "EU AI Act phased rollout",
              "India DPDP Act in force",
              "USA NIST AI RMF adopted widely"
            ]}
          />
          <Text color="green" fontWeight="bold" mt={4}>
            The timing for Secode<sup style={{ fontSize: '0.6em' }}>TM</sup> is 
            <Text as="span" fontSize="2xl" color="green.700"> ideal</Text>.
          </Text>
        </TopicSection>

        <TopicSection id="topic-7" title="7. Competitive Landscape">
          <CompetitiveLandscapeTable
            data={[
              { category: "Runtime AI Safety", companies: "Guardrails, Shielding, LLM firewalls", gap: "Protect after deployment" },
              { category: "MLOps Safety", companies: "Weights & Biases, TruEra, Arthur", gap: "Validate models post-training" },
              { category: "Data Scanning", companies: "Snorkel, Cleanlab", gap: "Limited to dataset quality" },
              { category: "DevSecOps Tools", companies: "Snyk, GitGuardian", gap: "Not AI-specific" },
              { category: "Pre-MLOps AI Safety", companies: "None", gap: <span>Secode<sup style={{ fontSize: '0.6em' }}>TM</sup> is first mover</span>, highlight: true },
            ]}
          />

          <Text color="blackAlpha.900" fontWeight="bold" fontSize="lg" mt={6} mb={4}>
            Secode<sup style={{ fontSize: '0.6em' }}>TM</sup> is the only product securing AI before creation.
          </Text>
          <Text color="gray.600">
            This gives Secode<sup style={{ fontSize: '0.6em' }}>TM</sup> a defensible early-mover advantage and category ownership strategy.
          </Text>
        </TopicSection>

        <TopicSection id="topic-8" title="8. Business Model">
          <Heading size="md" color="black" mb={4}>
            SaaS + Enterprise Licensing
          </Heading>

          <Box overflowX="auto" mb={8} border="1px solid" borderColor="blackAlpha.200" borderRadius="xl" bg="whiteAlpha.50">
            <Table.Root variant="line">
              <Table.Header bg="transparent">
                <Table.Row bg="transparent">
                  <Table.ColumnHeader color="blue.400">Revenue Stream</Table.ColumnHeader>
                  <Table.ColumnHeader color="blue.400">Price</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row bg="transparent" _hover={{ bg: "whiteAlpha.50" }}>
                  <Table.Cell color="black">Developer Seat</Table.Cell>
                  <Table.Cell color="gray.600">$75 per user/month</Table.Cell>
                </Table.Row>
                <Table.Row bg="transparent" _hover={{ bg: "whiteAlpha.50" }}>
                  <Table.Cell color="black">Enterprise License(200+ seats)</Table.Cell>
                  <Table.Cell color="gray.600">$60k–$150k/year</Table.Cell>
                </Table.Row>
                <Table.Row bg="transparent" _hover={{ bg: "whiteAlpha.50" }}>
                  <Table.Cell color="black">Compliance Add-Ons</Table.Cell>
                  <Table.Cell color="gray.600">$20k/year</Table.Cell>
                </Table.Row>
                <Table.Row bg="transparent" _hover={{ bg: "whiteAlpha.50" }}>
                  <Table.Cell color="black">Dataset Guardian Pro</Table.Cell>
                  <Table.Cell color="gray.600">$30k/year</Table.Cell>
                </Table.Row>
                <Table.Row bg="transparent" _hover={{ bg: "whiteAlpha.50" }}>
                  <Table.Cell color="black">On-Premise Deployment</Table.Cell>
                  <Table.Cell color="gray.600">Starting $120k/year</Table.Cell>
                </Table.Row>
                <Table.Row bg="transparent" _hover={{ bg: "whiteAlpha.50" }}>
                  <Table.Cell color="black">Professional Services</Table.Cell>
                  <Table.Cell color="gray.600">$200/hour</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table.Root>
          </Box>

          <Heading size="md" color="black" mb={4}>
            Projected Revenue Mix (Year 3)
          </Heading>
          <BulletList
            items={[
              "65% recurring SaaS",
              "25% enterprise licensing",
              "10% compliance services"
            ]}
          />

          <Text color="black" fontWeight="bold" mt={6}>
            High predictability & enterprise appeal.
          </Text>
        </TopicSection>

        <TopicSection id="topic-9" title="9. Go-To-Market Strategy">
          <Heading size="md" color="black" mb={4}>
            Dual-Motion Strategy: PLG + Enterprise Sales
          </Heading>

          <Text color="gray.600" mb={4}>
            Secode<sup style={{ fontSize: '0.6em' }}>TM</sup> leverages a developer-first adoption model to build a user base, converting usage into enterprise contracts via CISO-level sales.
          </Text>

          <Box mb={6}>
            <Heading size="md" color="blue.500" mb={2}>
              Phase 1: Developer First
            </Heading>
            <BulletList
              items={[
                "Freemium version",
                "Plug-in marketplace distribution",
                "Developer communities & hackathons"
              ]}
            />
          </Box>

          <Box mb={6}>
            <Heading size="md" color="blue.500" mb={2}>
              Phase 2: Enterprise Sales
            </Heading>
            <BulletList
              items={[
                "Fintech, health, GovTech, AI agencies",
                "Compliance-driven mandates",
                "Partner with MLOps and cloud vendors"
              ]}
            />
          </Box>

          <Box>
            <Heading size="md" color="blue.500" mb={2}>
              Phase 3: Ecosystem Integration
            </Heading>
            <BulletList
              items={[
                "Full AI Safety Control Center",
                "Compatibility with LLMOps/MLOps platforms",
                "Expansion into autonomous & multi-agent systems"
              ]}
            />
          </Box>
        </TopicSection>

        <TopicSection id="topic-10" title="10. Traction & Validation">
          <BulletList
            items={[
              "Proof of Concept completed",
              "Working plug-in + dataset engine",
              "Early pilots lined up",
              "Positive feedback from regulated-sector CIOs",
              "Bootstrapped progress → high capital efficiency"
            ]}
          />
        </TopicSection>

        <TopicSection id="topic-11" title="11. Team">
          <Heading size="md" color="black" mb={6}>
            The Founding Team of Secode<sup style={{ fontSize: '0.6em' }}>TM</sup>
          </Heading>

          <Box display="grid" gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6} mb={8}>
            {/* Manoj Neupane */}
            <Box bg="blackAlpha.50" p={6} borderRadius="xl" border="1px solid" borderColor="blackAlpha.100">
              <Heading size="md" color="black" mb={1}>Mr. Manoj Neupane</Heading>
              <Text color="blue.500" fontWeight="bold" mb={3}>Founder Chairman & CFO
              </Text>
              <Text color="gray.600" fontSize="sm" mb={4}>
                Mr. Manoj Neupane is a highly respected banking and
                finance leader with over 20 years of experience in
                Nepal’s financial sector. He previously served as the
                Chief Executive Officer of a Class A Commercial
                Bank , where he led large-scale operations,
                regulatory compliance, risk governance, and
                balance-sheet management. As Chairman of the
                Board at Secode, he provides strategic oversight,
                institutional governance discipline, and deep insight
                into enterprise risk, regulatory expectations, and
                financial system security. His leadership anchors
                Secode’s credibility with regulators, financial
                institutions, and institutional investors.
              </Text>
              <Link href="https://www.linkedin.com/in/manoj-neupane-b87542b1/" target="_blank" color="blue.500" fontSize="sm" _hover={{ textDecoration: "underline" }}>
                LinkedIn Profile
              </Link>
            </Box>
            {/* Ramesh Bhandari */}
            <Box bg="blackAlpha.50" p={6} borderRadius="xl" border="1px solid" borderColor="blackAlpha.100">
              <Heading size="md" color="black" mb={1}>Mr. Ramesh Bhandari</Heading>
              <Text color="blue.500" fontWeight="bold" mb={3}>Founder & CEO</Text>
              <Text color="gray.600" fontSize="sm" mb={4}>
                Ramesh Bhandari is a serial entrepreneur with a
                strong track record of building and scaling
                technology-driven ventures across Nepal and the
                United States. He is the founder of multiple
                companies, including IOXET Labs (software and
                product engineering), Growstart (a venture
                ecosystem platform connecting founders, investors,
                and lenders), Mato Agro Inc. (USA), and Lumvini LLC.
                With deep experience in product strategy, business
                modeling, fundraising, and cross-border operations,
                Ramesh brings a founder-operator mindset to
                Secode. His current focus is on leveraging AI to solve
                enterprise-grade security and compliance
                challenges at scale, working closely with global tech
                and cybersecurity leaders.
              </Text>
              <Link href="https://www.linkedin.com/in/rameshbhandari1/" target="_blank" color="blue.500" fontSize="sm" _hover={{ textDecoration: "underline" }}>
                LinkedIn Profile
              </Link>
            </Box>



            {/* Divyendu Bhatt */}
            <Box bg="blackAlpha.50" p={6} borderRadius="xl" border="1px solid" borderColor="blackAlpha.100">
              <Heading size="md" color="black" mb={1}>Mr. Divyendu Bhatt</Heading>
              <Text color="blue.500" fontWeight="bold" mb={3}>Founder, CTO & CISO
              </Text>
              <Text color="gray.600" fontSize="sm" mb={4}>
                Mr. Divyendu Bhatt is a globally seasoned
                cybersecurity executive with over 25 years of
                experience securing large-scale enterprise and
                financial systems. His career includes senior
                leadership roles at BCG (Technology Security
                Advisor to the Group CTO), JP Morgan Chase
                (Director of Security), PayTM Money (CISO) , and
                Hewlett Packard Enterprise (Master-Level
                Consultant). He brings deep, hands-on expertise in
                application security, cloud security, enterprise risk
                management, and security product ecosystems. At
                Secode, he leads security architecture, threat
                modeling, and product trust, ensuring the platform
                is built with real-world attacker awareness and
                enterprise-grade rigor.
              </Text>
              <Link href="https://www.linkedin.com/in/dm-bhatt-0bb8a48/" target="_blank" color="blue.500" fontSize="sm" _hover={{ textDecoration: "underline" }}>
                LinkedIn Profile
              </Link>
            </Box>

            {/* Suresh Bhandari */}
            <Box bg="blackAlpha.50" p={6} borderRadius="xl" border="1px solid" borderColor="blackAlpha.100">
              <Heading size="md" color="black" mb={1}>Mr. Suresh Bhandari</Heading>
              <Text color="blue.500" fontWeight="bold" mb={3}>Founder & COO</Text>
              <Text color="gray.600" fontSize="sm" mb={4}>
                Mr. Suresh Bhandari brings over 25 years of
                experience across business consulting, ICT, and
                alternative energy sectors. He has advised and
                operated businesses across multiple industries, with
                strong expertise in financial management,
                accounting, and enterprise structuring. At Secode,
                he contributes strategic guidance on business
                scalability, financial discipline, and long-term value
                creation. His multi-sector operating perspective
                strengthens Secode’s ability to execute sustainably
                while navigating complex commercial environments.
              </Text>
              <Link href="https://www.linkedin.com/in/sureshbhandari/" target="_blank" color="blue.500" fontSize="sm" _hover={{ textDecoration: "underline" }}>
                LinkedIn Profile
              </Link>
            </Box>

            {/* Tejash Raj Katuwal */}
            <Box bg="blackAlpha.50" p={6} borderRadius="xl" border="1px solid" borderColor="blackAlpha.100">
              <Heading size="md" color="black" mb={1}>Mr. Tejash Raj Katuwal</Heading>
              <Text color="blue.500" fontWeight="bold" mb={3}>Founder & Engineer</Text>
              <Text color="gray.600" fontSize="sm" mb={4}>
                Mr. Tejash Raj Katuwal is an AI engineer focused on
                building practical, production-ready intelligence
                systems. He has developed multiple AI-driven
                products and proof-of-concepts, with hands-on
                experience in applying machine learning models to
                real-world use cases. At Secode, he is responsible
                for embedding AI into security workflows,
                transforming complex security signals into
                actionable intelligence. His strength lies in delivering
                high-impact AI capabilities under constrained
                resources, enabling Secode to innovate rapidly while
                maintaining engineering efficiency.
              </Text>
              <Link href="https://www.linkedin.com/in/tejash-katuwal/" target="_blank" color="blue.500" fontSize="sm" _hover={{ textDecoration: "underline" }}>
                LinkedIn Profile
              </Link>
            </Box>

            {/* Nibesh Suwal */}
            <Box bg="blackAlpha.50" p={6} borderRadius="xl" border="1px solid" borderColor="blackAlpha.100">
              <Heading size="md" color="black" mb={1}>Mr. Nibesh Suwal</Heading>
              <Text color="blue.500" fontWeight="bold" mb={3}>Founder & Engineer</Text>
              <Text color="gray.600" fontSize="sm" mb={4}>
                Mr. Nibesh Suwal is a backend-focused architecture
                engineer with deep involvement in designing secure,
                scalable system infrastructures. He combines
                architectural planning with hands-on backend
                development, ensuring design decisions are
                grounded in execution reality. At Secode, he is
                responsible for core platform architecture, backend
                reliability, and secure resource allocation. His
                disciplined approach to system accuracy,
                optimization, and security underpins Secode’s ability
                to operate as a trusted enterprise security platform.
              </Text>
              <Link href="https://www.linkedin.com/in/nibesh-suwal/" target="_blank" color="blue.500" fontSize="sm" _hover={{ textDecoration: "underline" }}>
                LinkedIn Profile
              </Link>
            </Box>

            {/* Ritesh Raj Pandit */}
            <Box bg="blackAlpha.50" p={6} borderRadius="xl" border="1px solid" borderColor="blackAlpha.100">
              <Heading size="md" color="black" mb={1}>Mr. Ritesh Raj Pandit</Heading>
              <Text color="blue.500" fontWeight="bold" mb={3}>Founder & Engineer</Text>
              <Text color="gray.600" fontSize="sm" mb={4}>
                Mr. Ritesh Raj Pandit leads product experience and
                interface design at Secode, bridging business logic
                with user-centered engineering. He specializes in
                translating complex security workflows into intuitive,
                functional, and visually refined interfaces. In addition
                to UI/UX execution, he plays a key role in defining
                business flows and product logic that guide
                engineering teams. His work ensures that Secode’s
                advanced security capabilities remain accessible,
                usable, and adoption-ready for enterprise customers.
              </Text>
              <Link href="https://www.linkedin.com/in/riteshrajpandit/" target="_blank" color="blue.500" fontSize="sm" _hover={{ textDecoration: "underline" }}>
                LinkedIn Profile
              </Link>
            </Box>

            {/* Abiral Bhandari */}
            <Box bg="blackAlpha.50" p={6} borderRadius="xl" border="1px solid" borderColor="blackAlpha.100">
              <Heading size="md" color="black" mb={1}>Mr. Abiral Bhandari</Heading>
              <Text color="blue.500" fontWeight="bold" mb={3}>Founder & Engineer</Text>
              <Text color="gray.600" fontSize="sm" mb={4}>
                Mr. Abiral Bhandari brings a strong background in
                system analysis, architecture planning, and project
                execution, complemented by early experience in
                robotics. He specializes in translating business and
                security requirements into scalable technical
                architectures and delivery plans. At Secode, he leads
                engineering coordination and execution, ensuring
                optimal utilization of both technical and human
                resources to build enterprise-grade security products
                that meet performance, reliability, and scalability
                standards.
              </Text>
              <Link href="https://www.linkedin.com/in/abiralbhandari/" target="_blank" color="blue.500" fontSize="sm" _hover={{ textDecoration: "underline" }}>
                LinkedIn Profile
              </Link>
            </Box>
          </Box>
          <Text color="black" fontWeight="bold" fontSize="lg">
            Augmented by advisors in cybersecurity and regulatory compliance.
          </Text>
        </TopicSection>

        <TopicSection id="topic-12" title="12. Financial Projections (3-Year Summary)">
          <Box overflowX="auto" mb={8} border="1px solid" borderColor="blackAlpha.200" borderRadius="xl" bg="whiteAlpha.50">
            <Table.Root variant="line">
              <Table.Header bg="transparent">
                <Table.Row bg="transparent">
                  <Table.ColumnHeader color="blue.500" fontWeight="bold">Metric</Table.ColumnHeader>
                  <Table.ColumnHeader color="blue.500" fontWeight="bold" textAlign="center">Development Duration</Table.ColumnHeader>
                  <Table.ColumnHeader color="blue.500" fontWeight="bold">Year 2</Table.ColumnHeader>
                  <Table.ColumnHeader color="blue.500" fontWeight="bold">Year 3</Table.ColumnHeader>
                  <Table.ColumnHeader color="blue.500" fontWeight="bold">Year 4</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row bg="transparent" _hover={{ bg: "whiteAlpha.50" }}>
                  <Table.Cell color="black" fontWeight="bold">Revenue (ARR)</Table.Cell>
                  <Table.Cell color="black" textAlign="center" rowSpan={4} verticalAlign="middle" borderRight="1px solid" borderLeft="1px solid" borderColor="blackAlpha.200" bg="whiteAlpha.100">1 Year</Table.Cell>
                  <Table.Cell color="gray.600">$1.8M</Table.Cell>
                  <Table.Cell color="gray.600">$5.6M</Table.Cell>
                  <Table.Cell color="gray.600">$10.8M</Table.Cell>
                </Table.Row>
                <Table.Row bg="transparent" _hover={{ bg: "whiteAlpha.50" }}>
                  <Table.Cell color="black" fontWeight="bold">Gross Margin</Table.Cell>
                  <Table.Cell color="gray.600">82%</Table.Cell>
                  <Table.Cell color="gray.600">84%</Table.Cell>
                  <Table.Cell color="gray.600">86%</Table.Cell>
                </Table.Row>
                <Table.Row bg="transparent" _hover={{ bg: "whiteAlpha.50" }}>
                  <Table.Cell color="black" fontWeight="bold">Enterprise Clients</Table.Cell>
                  <Table.Cell color="gray.600">12</Table.Cell>
                  <Table.Cell color="gray.600">60</Table.Cell>
                  <Table.Cell color="gray.600">220</Table.Cell>
                </Table.Row>
                <Table.Row bg="transparent" _hover={{ bg: "whiteAlpha.50" }}>
                  <Table.Cell color="black" fontWeight="bold">Developer Seats</Table.Cell>
                  <Table.Cell color="gray.600">6000</Table.Cell>
                  <Table.Cell color="gray.600">40000</Table.Cell>
                  <Table.Cell color="gray.600">150000</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table.Root>
          </Box>

          <Box mt={6}>
            <Text color="gray.600" mb={2}>
              Projected break-even: <strong>Month 26</strong>
            </Text>
            <Text color="gray.600">
              Revenue model validated by industry benchmarks.
            </Text>
          </Box>
        </TopicSection>

        <TopicSection id="topic-13" title="13. Capital Requirements">
          <Box display="grid" gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={8} mb={8}>
            <Box>
              <Box mb={8}>
                <Heading size="md" color="black" mb={2}>
                  Secode<sup style={{ fontSize: '0.6em' }}>TM</sup> is opening a Pre-Seed Round of $1.1M
                </Heading>
                <Text color="blue.500" fontSize="lg" fontWeight="bold">
                  Valuation: USD 5.5M, Pre-Money
                </Text>
              </Box>
              <Heading size="sm" color="black" mb={4}>Use of Funds</Heading>
              <BulletList
                items={[
                  "45% → Product development & engineering",
                  "25% → Compliance frameworks & certifications",
                  "20% → Go-to-market (sales, marketing)",
                  "10% → Legal, patenting, operations"
                ]}
              />
            </Box>
            <Box bg="blackAlpha.50" borderRadius="xl">
              <DataChart
                type="bar"
                data={{
                  labels: [''],
                  datasets: [
                    {
                      label: 'Product Development & Engineering',
                      data: [45],
                      backgroundColor: '#67e8f9',
                      borderColor: '#67e8f9',
                      borderWidth: 1,
                      barPercentage: 0.8,
                      categoryPercentage: 0.8
                    },
                    {
                      label: 'Compliance frameworks & certifications',
                      data: [25],
                      backgroundColor: '#22d3ee',
                      borderColor: '#22d3ee',
                      borderWidth: 1,
                      barPercentage: 0.8,
                      categoryPercentage: 0.8
                    },
                    {
                      label: 'Go-to-market (sales, marketing)',
                      data: [20],
                      backgroundColor: '#3b82f6',
                      borderColor: '#3b82f6',
                      borderWidth: 1,
                      barPercentage: 0.8,
                      categoryPercentage: 0.8
                    },
                    {
                      label: 'Legal, patenting, operations',
                      data: [10],
                      backgroundColor: '#1e3a8a',
                      borderColor: '#1e3a8a',
                      borderWidth: 1,
                      barPercentage: 0.8,
                      categoryPercentage: 0.8
                    }
                  ]
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom',
                      align: 'start',
                      labels: {
                        color: 'black',
                        usePointStyle: true,
                        boxWidth: 10,
                        padding: 15,
                        font: { size: 10 }
                      }
                    },
                    datalabels: {
                      display: true,
                      color: 'black',
                      anchor: 'end',
                      align: 'end',
                      offset: -5,
                      font: {
                        weight: 'bold',
                        size: 12
                      }
                    },
                    tooltip: {
                      callbacks: {
                        label: (context) => `${context.dataset.label}: ${context.raw}%`
                      }
                    }
                  },
                  scales: {
                    x: {
                      display: false,
                      grid: { display: false }
                    },
                    y: {
                      display: true,
                      grid: { color: 'rgba(0, 0, 0, 0.1)' },
                      ticks: { color: 'rgba(0, 0, 0, 0.7)' },
                      suggestedMax: 55
                    }
                  },
                  layout: {
                    padding: {
                      bottom: 0,
                    }
                  }
                }}
              />
            </Box>
          </Box>

          <Box>
            <Heading size="sm" color="black" mb={4}>Milestones Post-Funding</Heading>
            <BulletList
              items={[
                "Patent and IP protection activities",
                "Full v1.0 release",
                "10+ enterprise pilot deployments",
                "Launch of Compliance & Dataset products",
                "U.S., EU, and India regulatory alignment",
                "MLOps partner integrations"
              ]}
            />
          </Box>
        </TopicSection>

        <TopicSection id="topic-14" title="14. Exit Strategy">
          <Heading size="md" color="black" mb={4}>
            Potential exit paths include:
          </Heading>

          <Box mb={6}>
            <Heading size="md" color="blue.500" mb={2}>
              1. Acquisition by
            </Heading>
            <BulletList
              items={[
                "Cloud providers (AWS, Azure, GCP)",
                "MLOps platforms",
                "AI governance/enterprise security leaders",
                "Compliance tech platforms"
              ]}
            />
          </Box>

          <Box mb={6}>
            <Heading size="md" color="blue.500" mb={2}>
              2. Strategic Merger
            </Heading>
            <Text color="gray.600">
              With cybersecurity vendors expanding into AI safety.
            </Text>
          </Box>

          <Box mb={6}>
            <Heading size="md" color="blue.500" mb={2}>
              3. Long-term IPO
            </Heading>
            <Text color="gray.600">
              If category leadership is maintained.
            </Text>
          </Box>

          <Text color="black" fontWeight="bold">
            Given the regulatory tailwind, AI security is expected to consolidate significantly within 4–7 years.
          </Text>
        </TopicSection>

        <TopicSection id="topic-15" title="15. Investment Proposition">
          <Heading size="md" color="black" mb={4}>
            Investors in Secode<sup style={{ fontSize: '0.6em' }}>TM</sup> gain exposure to:
          </Heading>

          <BulletList
            items={[
              "A new and rapidly expanding category (Pre-MLOps AI Safety)",
              "First-mover advantage with high defensibility",
              "Recurring revenue and enterprise-grade margins",
              "Regulatory alignment and compliance-driven demand",
              "Scalable architecture and strong GTM strategy",
              "Team with cross-domain expertise in AI and security"
            ]}
          />

          <Text color="black" fontWeight="bold" mt={6}>
            Secode<sup style={{ fontSize: '0.6em' }}>TM</sup> is positioned to become the global standard for Trusted AI Development.
          </Text>
        </TopicSection>

        {/* Fund Commitment */}
        <TopicSection id="topic-16" title="16. Fund Commitment">
          <Text color="gray.600" mb={8}>
            USD {amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} has been committed to invest in Secode<sup style={{ fontSize: '0.6em' }}>TM</sup> on the terms outlined in this deck. We
            invite you to join us in this opportunity to lead the future of secure AI development.
          </Text>

          <Box
            p={{ base: 6, md: 8 }}
            bg="blackAlpha.50"
            borderRadius="xl"
            border="1px solid"
            borderColor="blackAlpha.100"
          >
            <VStack gap={2} align="stretch" mb={4}>
              <HStack justify="space-between" align="baseline">
                <Text color="gray.600" fontSize="sm">Committed</Text>
                <Text color="gray.600" fontSize="sm">Target</Text>
              </HStack>
              <HStack justify="space-between" align="baseline">
                <HStack>
                  <Text color="blue.500" fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold">$</Text>
                  <NumberInput.Root
                    value={amount.toString()}
                    min={0}
                    max={1100000}
                    step={1000}
                    onValueChange={(e) => setAmount(e.valueAsNumber || 0)}
                    width="180px"
                  >
                    <NumberInput.Input
                      color="blue.500"
                      fontSize={{ base: "xl", md: "2xl" }}
                      fontWeight="bold"
                      padding={0}
                      border="none"
                      _focus={{ boxShadow: "none" }}
                    />
                  </NumberInput.Root>
                </HStack>
                <Text color="gray.800" fontSize={{ base: "md", md: "lg" }} >$1,100,000</Text>
              </HStack>
            </VStack>

            <HStack gap={6} align="center" direction={{ base: "column", sm: "row" }}>
              <Slider.Root
                width="full"
                thumbAlignment="center"
                value={[amount]}
                min={0}
                max={1100000}
                step={1000}
                onValueChange={(e) => setAmount(e.value[0])}
                h="48px"
              >
                <Slider.Control h="48px">
                  <Slider.Track
                    h="48px"
                    borderRadius="full"
                    bg="blackAlpha.500"
                    overflow="hidden"
                    backgroundImage="linear-gradient(45deg,rgba(255,255,255,.05) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.05) 50%,rgba(255,255,255,.05) 75%,transparent 75%,transparent)"
                    backgroundSize="24px 24px"
                  >
                    <Slider.Range
                      bg={"gray.700"}
                      bgGradient="linear(to-r, blue.400, blue.500)"
                      boxShadow="0 0 20px rgba(59, 130, 246, 0.4)"
                    />
                  </Slider.Track>
                  <Slider.Thumb
                    index={0}
                    boxSize={8}
                    bg="white"
                    boxShadow="0 0 10px rgba(0,0,0,0.5)"
                    _focus={{ boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.6)" }}
                  />
                </Slider.Control>
              </Slider.Root>

              <Text
                fontSize={{ base: "3xl", md: "5xl" }}
                fontWeight="light"
                lineHeight="1"
                color="black"
                minW="fit-content"
              >
                {(amount / 1100000 * 100).toFixed(2)}%
              </Text>
            </HStack>

            <Text color="gray.600" fontSize="sm" mt={6} textAlign="center">
              Pre-Seed Round Progress
            </Text>
          </Box>
        </TopicSection>

        <TopicSection id="topic-17" title="Conclusion">
          <Text color="gray.600" mb={6}>
            AI safety is no longer optional—it is a regulatory and operational requirement. Secode<sup style={{ fontSize: '0.6em' }}>TM</sup> fills the most
            critical gap in the AI lifecycle by securing development itself. With increasing global mandates, strong
            technical validation, and zero competition in its category, Secode<sup style={{ fontSize: '0.6em' }}>TM</sup> is uniquely positioned for rapid
            adoption and scale.
          </Text>
          <Text color="gray.600" fontWeight={"bold"} mb={400}>
            Investing now provides early ownership in a category-defining platform at the moment the market is
            forming.
          </Text>
        </TopicSection>

      </VStack>
    </SecureLayout>
  )
}
