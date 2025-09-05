import { Box } from "@chakra-ui/react"
import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import ScrollToTopButton from "./ScrollToTopButton"
import { Footer } from "./Footer"

export const Layout = () => {
  return (
    <Box minH="100vh" display="flex" flexDirection="column" bg="bg">
      <Navbar  />
      <ScrollToTopButton />
      <Box flex="1" pt="80px">
        <Outlet />
      </Box>
      <Footer />
    </Box>
  )
}
