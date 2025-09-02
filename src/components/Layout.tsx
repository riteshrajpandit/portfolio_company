import { Box } from "@chakra-ui/react"
import { Outlet } from "react-router-dom"
import ModernNavbar from "./ModernNavbar"
import ScrollToTopButton from "./ScrollToTopButton"
import { Footer } from "./Footer"

export const Layout = () => {
  return (
    <Box minH="100vh" display="flex" flexDirection="column" bg="bg">
      <ModernNavbar />
      <ScrollToTopButton />
      <Box flex="1" pt="80px">
        <Outlet />
      </Box>
      <Footer />
    </Box>
  )
}
