import { useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { VStack, Text, Heading, Box } from "@chakra-ui/react"
import { useHideChatbot } from "@/hooks/useHideChatbot"
import { SecureLayout } from "@/components/secure/SecureLayout"
import { SecureSidebar } from "@/components/secure/SecureSidebar"
import { TopicSection } from "@/components/secure/TopicSection"
import { BulletList } from "@/components/secure/content/BulletList"
import { ComparisonTable } from "@/components/secure/content/ComparisonTable"
import { RevenueTable } from "@/components/secure/content/RevenueTable"
import { DataChart } from "@/components/secure/content/DataChart"

const TOPICS = [
  { id: "topic-1", title: "Executive Summary" },
  { id: "topic-2", title: "Market Analysis" },
  { id: "topic-3", title: "Revenue Projections" },
  { id: "topic-4", title: "Competitor Comparison" },
  { id: "topic-5", title: "User Growth Strategy" },
  { id: "topic-6", title: "Product Roadmap" },
  { id: "topic-7", title: "Technical Architecture" },
  { id: "topic-8", title: "Security & Compliance" },
  { id: "topic-9", title: "Team Structure" },
  { id: "topic-10", title: "Funding History" },
  { id: "topic-11", title: "Strategic Partnerships" },
  { id: "topic-12", title: "Risk Assessment" },
  { id: "topic-13", title: "Marketing Channels" },
  { id: "topic-14", title: "Sales Funnel Metrics" },
  { id: "topic-15", title: "Customer Feedback" },
  { id: "topic-16", title: "Future Outlook" },
]

export default function CodeSuccessPage() {
  useHideChatbot()
  const navigate = useNavigate()
  const location = useLocation()

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
          <Heading size="2xl" mb={4} bgGradient="linear(to-r, blue.400, purple.500)" bgClip="text">
            Confidential Information Memorandum
          </Heading>
          <Text fontSize="xl" color="gray.400">
            Strictly confidential. For authorized eyes only.
          </Text>
        </Box>

        <TopicSection id="topic-1" title="1. Executive Summary">
          <Text color="gray.300" mb={6}>
            This document outlines the strategic vision and operational metrics for the next fiscal year. 
            Our primary focus is on scaling our enterprise solutions while maintaining robust security standards.
          </Text>
          <BulletList 
            items={[
              "Accelerate enterprise adoption by 200%",
              "Launch 3 new core product features in Q2",
              "Expand into APAC and EMEA markets",
              "Achieve SOC2 Type II compliance"
            ]} 
          />
        </TopicSection>

        <TopicSection id="topic-2" title="2. Market Analysis">
          <Text color="gray.300" mb={6}>
            The total addressable market (TAM) has grown significantly. Our penetration in the mid-market segment shows promising upward trends.
          </Text>
          <DataChart 
            type="bar"
            data={{
              labels: ['2021', '2022', '2023', '2024', '2025 (Proj)'],
              datasets: [{
                label: 'Market Size (Billions)',
                data: [12, 19, 25, 32, 45],
                backgroundColor: 'rgba(66, 153, 225, 0.6)',
                borderColor: 'rgba(66, 153, 225, 1)',
                borderWidth: 1
              }]
            }}
          />
        </TopicSection>

        <TopicSection id="topic-3" title="3. Revenue Projections">
          <Text color="gray.300" mb={6}>
            Projected revenue breakdown by quarter for the upcoming fiscal year, highlighting seasonal adjustments.
          </Text>
          <RevenueTable 
            data={[
              { period: "Q1 2024", revenue: "$2.4M", growth: "+15%", status: "Actual" },
              { period: "Q2 2024", revenue: "$2.9M", growth: "+21%", status: "Projected" },
              { period: "Q3 2024", revenue: "$3.5M", growth: "+20%", status: "Projected" },
              { period: "Q4 2024", revenue: "$4.2M", growth: "+20%", status: "Projected" },
            ]}
          />
        </TopicSection>

        <TopicSection id="topic-4" title="4. Competitor Comparison">
          <Text color="gray.300" mb={6}>
            A direct comparison of feature sets against key market competitors.
          </Text>
          <ComparisonTable 
            features={[
              { name: "Real-time Analytics", us: true, competitorA: true, competitorB: false },
              { name: "AI-Driven Insights", us: true, competitorA: false, competitorB: false },
              { name: "24/7 Support", us: true, competitorA: true, competitorB: true },
              { name: "Custom Integrations", us: true, competitorA: false, competitorB: true },
              { name: "On-premise Deployment", us: true, competitorA: false, competitorB: false },
            ]}
          />
        </TopicSection>

        <TopicSection id="topic-5" title="5. User Growth Strategy">
          <Text color="gray.300" mb={6}>
            User acquisition channels are performing above expectations. Organic search remains our strongest driver.
          </Text>
          <DataChart 
            type="line"
            data={{
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
              datasets: [{
                label: 'Active Users (k)',
                data: [65, 78, 90, 105, 125, 150],
                borderColor: 'rgba(159, 122, 234, 1)',
                backgroundColor: 'rgba(159, 122, 234, 0.2)',
                tension: 0.4,
                fill: true
              }]
            }}
          />
        </TopicSection>

        <TopicSection id="topic-6" title="6. Product Roadmap">
          <Text color="gray.300" mb={6}>
            Key milestones for product development over the next 12 months.
          </Text>
          <BulletList 
            items={[
              "Q1: Mobile App Beta Launch",
              "Q2: Advanced Reporting Suite",
              "Q3: API V2.0 Release",
              "Q4: Machine Learning Module Integration"
            ]} 
          />
        </TopicSection>

        <TopicSection id="topic-7" title="7. Technical Architecture">
          <Text color="gray.300" mb={6}>
            Our microservices architecture ensures high availability and scalability. We are migrating legacy services to Kubernetes clusters to improve orchestration.
            Database sharding is implemented for high-volume transaction tables.
          </Text>
        </TopicSection>

        <TopicSection id="topic-8" title="8. Security & Compliance">
          <Text color="gray.300" mb={6}>
            We adhere to the strictest industry standards to protect customer data.
          </Text>
          <BulletList 
            items={[
              "End-to-end encryption for all data in transit and at rest",
              "Regular third-party penetration testing",
              "GDPR and CCPA compliance",
              "Role-Based Access Control (RBAC) implementation"
            ]} 
          />
        </TopicSection>

        <TopicSection id="topic-9" title="9. Team Structure">
          <Text color="gray.300" mb={6}>
            Our team is organized into cross-functional squads focused on specific product verticals.
            Engineering comprises 45% of the workforce, with Sales and Marketing at 30%.
          </Text>
        </TopicSection>

        <TopicSection id="topic-10" title="10. Funding History">
          <Text color="gray.300" mb={6}>
            Overview of capital raised to date and valuation milestones.
          </Text>
          <RevenueTable 
            data={[
              { period: "Seed Round", revenue: "$1.5M", growth: "-", status: "Closed" },
              { period: "Series A", revenue: "$8.0M", growth: "5.3x Val", status: "Closed" },
              { period: "Series B", revenue: "$25.0M", growth: "3.1x Val", status: "Closed" },
            ]}
          />
        </TopicSection>

        <TopicSection id="topic-11" title="11. Strategic Partnerships">
          <Text color="gray.300" mb={6}>
            Key alliances that drive distribution and technology integration.
          </Text>
          <BulletList 
            items={[
              "Cloud Infrastructure Partner: AWS",
              "Payment Processing: Stripe",
              "CRM Integration: Salesforce",
              "Identity Management: Auth0"
            ]} 
          />
        </TopicSection>

        <TopicSection id="topic-12" title="12. Risk Assessment">
          <Text color="gray.300" mb={6}>
            Evaluation of potential risks and mitigation strategies.
          </Text>
          <ComparisonTable 
            features={[
              { name: "Data Breach", us: true, competitorA: true, competitorB: true },
              { name: "Service Downtime", us: true, competitorA: true, competitorB: true },
              { name: "Regulatory Changes", us: true, competitorA: true, competitorB: true },
            ]}
          />
          <Text color="gray.400" fontSize="sm" mt={4}>
            *Table indicates areas where mitigation plans are fully active.
          </Text>
        </TopicSection>

        <TopicSection id="topic-13" title="13. Marketing Channels">
          <Text color="gray.300" mb={6}>
            We are diversifying our marketing mix to reduce dependency on paid acquisition.
            Content marketing and community building are becoming primary drivers.
          </Text>
        </TopicSection>

        <TopicSection id="topic-14" title="14. Sales Funnel Metrics">
          <Text color="gray.300" mb={6}>
            Conversion rates at each stage of the sales funnel.
          </Text>
          <DataChart 
            type="bar"
            data={{
              labels: ['Leads', 'MQL', 'SQL', 'Opportunity', 'Closed Won'],
              datasets: [{
                label: 'Conversion Count',
                data: [1000, 450, 200, 80, 35],
                backgroundColor: [
                  'rgba(255, 99, 132, 0.6)',
                  'rgba(255, 159, 64, 0.6)',
                  'rgba(255, 205, 86, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                ],
                borderWidth: 0
              }]
            }}
          />
        </TopicSection>

        <TopicSection id="topic-15" title="15. Customer Feedback">
          <Text color="gray.300" mb={6}>
            Recent feedback from enterprise clients highlights ease of use and support quality.
          </Text>
          <BulletList 
            items={[
              "\"The best platform we've used for data consolidation.\"",
              "\"Support team is incredibly responsive.\"",
              "\"Feature set is robust, though reporting could be more flexible.\"",
              "\"Security features gave our compliance team peace of mind.\""
            ]} 
          />
        </TopicSection>

        <TopicSection id="topic-16" title="16. Future Outlook">
          <Text color="gray.300" mb={6}>
            We are positioned to become the market leader in the next 24 months. 
            Continued investment in R&D and customer success will drive this growth.
          </Text>
          <Text color="gray.300">
            End of confidential memorandum.
          </Text>
        </TopicSection>

      </VStack>
    </SecureLayout>
  )
}
