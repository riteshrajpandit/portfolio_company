import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getPageMeta } from '../utils/sitemap'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
}

export const SEO = ({ title, description, keywords }: SEOProps) => {
  const location = useLocation()
  
  useEffect(() => {
    // Get page-specific meta data
    const pageMeta = getPageMeta(location.pathname)
    
    // Use provided props or fall back to page defaults
    const finalTitle = title || pageMeta.title
    const finalDescription = description || pageMeta.description
    const finalKeywords = keywords || pageMeta.keywords
    
    // Update document title
    document.title = finalTitle
    
    // Update or create meta tags
    const updateMetaTag = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`)
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('name', name)
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', content)
    }
    
    const updatePropertyTag = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`)
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('property', property)
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', content)
    }
    
    // Update meta tags
    updateMetaTag('description', finalDescription)
    updateMetaTag('keywords', finalKeywords)
    updateMetaTag('robots', 'index, follow')
    updateMetaTag('author', 'IOXET Labs')
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0')
    
    // Open Graph tags
    updatePropertyTag('og:title', finalTitle)
    updatePropertyTag('og:description', finalDescription)
    updatePropertyTag('og:type', 'website')
    updatePropertyTag('og:url', `https://ioxet.com${location.pathname}`)
    updatePropertyTag('og:site_name', 'IOXET Labs')
    
    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image')
    updateMetaTag('twitter:title', finalTitle)
    updateMetaTag('twitter:description', finalDescription)
    
    // Structured data for organization
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "IOXET Labs",
      "url": "https://ioxet.com",
      "description": "Leading software development company specializing in ERP solutions, AI automation, web development, and IT consulting services.",
      "founder": {
        "@type": "Person",
        "name": "IOXET Labs Team"
      },
      "areaServed": "Worldwide",
      "knowsAbout": ["Software Development", "ERP Solutions", "AI Automation", "Web Development", "IT Consulting"],
      "sameAs": [
        "https://linkedin.com/company/ioxet-labs",
        "https://x.com/ioxetlabs"
      ]
    }
    
    // Update or create structured data script
    let structuredDataScript = document.querySelector('script[type="application/ld+json"]')
    if (!structuredDataScript) {
      structuredDataScript = document.createElement('script')
      structuredDataScript.setAttribute('type', 'application/ld+json')
      document.head.appendChild(structuredDataScript)
    }
    structuredDataScript.textContent = JSON.stringify(structuredData)
    
  }, [location.pathname, title, description, keywords])
  
  return null // This component doesn't render anything
}

export default SEO
