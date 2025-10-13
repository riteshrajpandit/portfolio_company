// Sitemap generator utility for IOXET Labs website
// This can be used to generate sitemap.xml for SEO

interface SiteMapURL {
  url: string
  lastModified?: string
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority?: number
}

const baseURL = 'https://ioxet.com' // Replace with your actual domain

export const siteMapURLs: SiteMapURL[] = [
  {
    url: '/',
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'daily',
    priority: 1.0
  },
  {
    url: '/about',
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'monthly',
    priority: 0.9
  },
  {
    url: '/products',
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly',
    priority: 0.9
  },
  {
    url: '/services',
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly',
    priority: 0.8
  },
  {
    url: '/resources',
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly',
    priority: 0.7
  },
  {
    url: '/careers',
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly',
    priority: 0.8
  },
  {
    url: '/gallery',
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'monthly',
    priority: 0.7
  },
  {
    url: '/contact',
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'monthly',
    priority: 0.6
  },
  {
    url: '/sitemap',
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'monthly',
    priority: 0.4
  },
  {
    url: '/privacy',
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'yearly',
    priority: 0.3
  },
  {
    url: '/terms',
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'yearly',
    priority: 0.3
  }
]

export const generateSitemap = (): string => {
  const urls = siteMapURLs.map(({ url, lastModified, changeFrequency, priority }) => {
    return `  <url>
    <loc>${baseURL}${url}</loc>
    ${lastModified ? `<lastmod>${lastModified}</lastmod>` : ''}
    ${changeFrequency ? `<changefreq>${changeFrequency}</changefreq>` : ''}
    ${priority ? `<priority>${priority}</priority>` : ''}
  </url>`
  }).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`
}

export const generateRobotsTxt = (): string => {
  return `User-agent: *
Allow: /

# Disallow admin or private pages if any
# Disallow: /admin/
# Disallow: /private/

# Sitemap location
Sitemap: ${baseURL}/sitemap.xml

# Crawl delay (optional)
Crawl-delay: 1`
}

// Function to download sitemap content (client-side)
export const downloadSitemap = () => {
  const sitemapContent = generateSitemap()
  const blob = new Blob([sitemapContent], { type: 'application/xml' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'sitemap.xml'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

// Function to download robots.txt content (client-side)
export const downloadRobotsTxt = () => {
  const robotsContent = generateRobotsTxt()
  const blob = new Blob([robotsContent], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'robots.txt'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

// Meta tags generator for each page
export const getPageMeta = (page: string) => {
  const metaData: { [key: string]: { title: string; description: string; keywords: string } } = {
    '/': {
      title: 'IOXET Labs - Innovative Software Solutions & Technology Services',
      description: 'Leading software development company specializing in ERP solutions, AI automation (Amigaa), web development, and IT consulting services.',
      keywords: 'software development, ERP solutions, AI automation, web development, IT consulting, IOXET Labs'
    },
    '/about': {
      title: 'About IOXET Labs - Our Team & Company Story',
      description: 'Learn about IOXET Labs team, our mission to deliver innovative technology solutions, and how we help businesses transform digitally.',
      keywords: 'about IOXET Labs, software development team, company story, technology experts'
    },
    '/products': {
      title: 'Our Products - ERP Solutions & Amigaa AI Platform | IOXET Labs',
      description: 'Discover our flagship products: comprehensive ERP solutions for business management and Amigaa AI platform for intelligent automation.',
      keywords: 'ERP solutions, Amigaa AI platform, business software, automation tools, enterprise software'
    },
    '/services': {
      title: 'Technology Services - Development, Consulting & Training | IOXET Labs',
      description: 'Professional software development, IT consulting, training, and technical support services to accelerate your digital transformation.',
      keywords: 'software development services, IT consulting, technical training, digital transformation'
    },
    '/resources': {
      title: 'Resources & Tools - ROI Calculator, Documentation | IOXET Labs',
      description: 'Access our business tools, ROI calculators, documentation, and resources to maximize your technology investments.',
      keywords: 'business tools, ROI calculator, technical documentation, software resources'
    },
    '/careers': {
      title: 'Careers at IOXET Labs - Join Our Technology Team',
      description: 'Explore exciting career opportunities at IOXET Labs. Join our team of innovative developers, designers, and technology experts.',
      keywords: 'IOXET Labs careers, software developer jobs, technology careers, remote work opportunities'
    },
    '/contact': {
      title: 'Contact IOXET Labs - Get in Touch for Your Project',
      description: 'Ready to start your project? Contact IOXET Labs for professional software development and technology consulting services.',
      keywords: 'contact IOXET Labs, software development inquiry, project consultation, get quote'
    },
    '/privacy': {
      title: 'Privacy Policy - IOXET Labs Data Protection & Privacy',
      description: 'Read our privacy policy to understand how IOXET Labs collects, uses, and protects your personal information.',
      keywords: 'privacy policy, data protection, personal information, IOXET Labs privacy'
    },
    '/terms': {
      title: 'Terms of Service - IOXET Labs Service Agreement',
      description: 'Review our terms of service outlining the conditions for using IOXET Labs services and website.',
      keywords: 'terms of service, service agreement, legal terms, IOXET Labs terms'
    },
    '/sitemap': {
      title: 'Sitemap - Browse All Pages | IOXET Labs',
      description: 'Browse through all pages on IOXET Labs website. Find products, services, resources, and information quickly and easily.',
      keywords: 'sitemap, site navigation, website map, all pages, IOXET Labs sitemap'
    },
    '/gallery': {
      title: 'Gallery - Company Photos & Events | IOXET Labs',
      description: 'Explore photos from IOXET Labs events, team activities, and our workplace culture.',
      keywords: 'company gallery, team photos, events, IOXET Labs gallery, workplace culture'
    }
  }

  return metaData[page] || metaData['/']
}

export default {
  siteMapURLs,
  generateSitemap,
  generateRobotsTxt,
  downloadSitemap,
  downloadRobotsTxt,
  getPageMeta
}
