"use client"

import { useState, useEffect } from "react"

/**
 * Custom hook for responsive design with media queries
 * @param {string} query - Media query string
 * @returns {boolean} Whether the media query matches
 */
function useMediaQuery(query) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    setMatches(mediaQuery.matches)

    const handler = (event) => setMatches(event.matches)
    mediaQuery.addEventListener("change", handler)

    return () => mediaQuery.removeEventListener("change", handler)
  }, [query])

  return matches
}

export default useMediaQuery

