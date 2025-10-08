import { Box } from "@chakra-ui/react"
import {
  HiChartBar,
  HiSparkles,
} from "react-icons/hi2"

// Import new components
import ProductHeroSection from "../components/sections/ProductHeroSection"
import ProductCard from "../components/sections/ProductCard"
//import ERPPricingSection from "../components/sections/ERPPricingSection"
import UseCasesSection from "../components/sections/UseCasesSection"
import ProductCTASection from "../components/sections/ProductCTASection"
import ProductsIntegrationEcosystem from "../components/sections/ProductsIntegrationEcosystem"

const products = [
  {
    id: "amigaa",
    title: "Amigaa Platform",
    subtitle: "AI-Powered Intelligent Automation",
    description: "Revolutionary AI platform that transforms business operations through intelligent automation, predictive analytics, and machine learning capabilities.",
    icon: HiSparkles,
    gradient: "linear(135deg, orange.500, red.500)",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop&auto=format",
    features: [
      "Machine Learning Models",
      "Natural Language Processing",
      "Computer Vision & Image Recognition",
      "Predictive Analytics",
      "Intelligent Process Automation",
      "Real-time Decision Making"
    ],
    benefits: [
      "Automate complex decision-making processes",
      "Reduce operational costs by up to 60%",
      "Improve accuracy and consistency",
      "24/7 intelligent monitoring and alerts"
    ],
    useCases: [
      { title: "Document Processing", description: "Automatically extract and process information from documents" },
      { title: "Quality Control", description: "AI-powered visual inspection and defect detection" },
      { title: "Customer Service", description: "Intelligent chatbots and automated support systems" },
      { title: "Fraud Detection", description: "Real-time transaction monitoring and risk assessment" }
    ]
  },
  {
    id: "erp",
    title: "ERP Solutions",
    subtitle: "Enterprise Resource Planning",
    description: "Streamline your entire business operation with our comprehensive ERP system that integrates all departments and processes into a single, unified platform.",
    icon: HiChartBar,
    gradient: "linear(135deg, blue.500, cyan.500)",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&auto=format",
    features: [
      "Financial Management & Accounting",
      "Supply Chain & Inventory Control",
      "Human Resources Management",
      "Customer Relationship Management",
      "Business Intelligence & Analytics",
      "Multi-location Support"
    ],
    benefits: [
      "Increased operational efficiency by 40%",
      "Real-time visibility across all departments",
      "Reduced manual processes and errors",
      "Improved compliance and reporting"
    ],
    pricing: {
      starter: { price: "$299", users: "Up to 10 users", features: ["Core ERP modules", "Basic reporting", "Email support"] },
      professional: { price: "$599", users: "Up to 50 users", features: ["All ERP modules", "Advanced analytics", "Priority support", "API access"] },
      enterprise: { price: "Custom", users: "Unlimited users", features: ["Full customization", "Dedicated support", "On-premise option", "Advanced integrations"] }
    }
  }
  // {
  //   id: "solutions",
  //   title: "Custom Solutions",
  //   subtitle: "Tailored Business Applications",
  //   description: "Get bespoke software solutions designed specifically for your unique business requirements and industry-specific challenges.",
  //   icon: HiCog,
  //   gradient: "linear(135deg, purple.500, pink.500)",
  //   image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&auto=format",
  //   features: [
  //     "Custom Application Development",
  //     "Legacy System Modernization",
  //     "Third-party Integrations",
  //     "Mobile & Web Applications",
  //     "Database Design & Optimization",
  //     "API Development & Management"
  //   ],
  //   benefits: [
  //     "Perfect fit for your business processes",
  //     "Scalable architecture for future growth",
  //     "Seamless integration with existing systems",
  //     "Competitive advantage through innovation"
  //   ],
  //   process: [
  //     { step: "Discovery", description: "Understanding your requirements and challenges" },
  //     { step: "Design", description: "Creating user-centered solutions and architecture" },
  //     { step: "Development", description: "Building with modern technologies and best practices" },
  //     { step: "Deployment", description: "Smooth launch with comprehensive testing" },
  //     { step: "Support", description: "Ongoing maintenance and enhancement" }
  //   ]
  // },
  
]

const ProductsPage = () => {
  return (
    <Box>
      {/* Hero Section */}
      <ProductHeroSection />

      {/* Products Sections */}
      {products.map((product, index) => (
        <Box key={product.id}>
          <ProductCard product={product} index={index} />
          
          {/* Additional Content for specific products */}
          {/* {product.id === "erp" && product.pricing && (
            <ERPPricingSection pricing={product.pricing} />
          )} */}

          {product.id === "amigaa" && product.useCases && (
            <>
              <UseCasesSection useCases={product.useCases} />
              <ProductsIntegrationEcosystem />
            </>
          )}
        </Box>
      ))}

      {/* CTA Section */}
      <ProductCTASection />
    </Box>
  )
}

export default ProductsPage
