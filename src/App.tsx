import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { Box } from '@chakra-ui/react'
import ErrorBoundary from './components/ErrorBoundary'
import SEO from './components/SEO'
import Navbar from './components/Navbar'
import LoadingScreen from './components/LoadingScreen'
import ScrollToTopButton from './components/ScrollToTopButton'
import ScrollToTop from './components/ScrollToTop'
import Footer from './components/Footer'
import { trackPageView } from './utils/analytics'

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/HomePage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ProductsPage = lazy(() => import('./pages/ProductsPage'))
const ServicesPage = lazy(() => import('./pages/ServicesPage'))
const ResourcesPage = lazy(() => import('./pages/ResourcesPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const CareersPage = lazy(() => import('./pages/CareersPage'))
const ApplyPage = lazy(() => import('./pages/ApplyPage'))
const GalleryPage = lazy(() => import('./pages/GalleryPage'))
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'))
const TermsOfServicePage = lazy(() => import('./pages/TermsOfServicePage'))
const SitemapPage = lazy(() => import('./pages/SitemapPage'))
const ROICalculatorPage = lazy(() => import('./pages/ROICalculatorPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

// Admin pages
const AdminLoginPage = lazy(() => import('./pages/admin/AdminLoginPage'))
const AdminDashboardPage = lazy(() => import('./pages/admin/AdminDashboardPage'))

// Analytics page tracker
const AnalyticsTracker = () => {
  const location = useLocation()

  useEffect(() => {
    // Track page view on route change
    trackPageView(location.pathname + location.search)
  }, [location])

  return null
}

// Layout wrapper for public pages
const PublicLayout = () => (
  <Box minH="100vh" bg="background">
    <Navbar />
    <Box>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/apply" element={<ApplyPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsOfServicePage />} />
          <Route path="/roi-calculator" element={<ROICalculatorPage />} />
          <Route path="/sitemap" element={<SitemapPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Box>
    <ScrollToTopButton />
    <Footer />
  </Box>
)

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <SEO />
        <ScrollToTop />
        <AnalyticsTracker />
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            {/* Admin Routes - No Navbar/Footer */}
            <Route path="/ioxet-labs-admin" element={<AdminLoginPage />} />
            <Route path="/ioxet-labs-admin/dashboard" element={<AdminDashboardPage />} />
            
            {/* Public Routes - With Navbar/Footer */}
            <Route path="/*" element={<PublicLayout />} />
          </Routes>
        </Suspense>
      </Router>
    </ErrorBoundary>
  )
}

export default App