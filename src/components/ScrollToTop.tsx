import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = () => {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      // If there's a hash, scroll to that element with offset for fixed navbar
      const element = document.getElementById(hash.slice(1))
      if (element) {
        // Wait a bit for the page to load
        setTimeout(() => {
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
          const offsetPosition = elementPosition - 100 // 100px offset for fixed navbar
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        }, 100)
      }
    } else {
      // If no hash, scroll to top
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    }
  }, [pathname, hash])

  // This component doesn't render anything
  return null
}

export default ScrollToTop
