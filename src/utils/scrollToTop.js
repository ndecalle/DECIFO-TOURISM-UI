"use client"

import { useEffect } from "react"
import { useLocation } from "react-router-dom"

// Component to scroll to top when navigating between pages
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default ScrollToTop

