import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Box } from '@chakra-ui/react'
import ModernNavbar from './components/ModernNavbar'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import ScrollToTopButton from './components/ScrollToTopButton'
import Footer from './components/Footer'

function App() {
  return (
    <Router>
      <Box minH="100vh" bg="background">
        <ModernNavbar />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about/*" element={<AboutPage />} />
          <Route path="/services/*" element={<div>Services Page</div>} />
          <Route path="/portfolio/*" element={<div>Portfolio Page</div>} />
          <Route path="/blog" element={<div>Blog Page</div>} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        
        <ScrollToTopButton />
        <Footer />
      </Box>
    </Router>
  )
}

export default App