import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { trackPageView } from "../services/analytics"

// Analytics tracker component
function AnalyticsTracker() {
  const location = useLocation()

  useEffect(() => {
    trackPageView(location.pathname, document.title)
  }, [location])

  return null
}

export default AnalyticsTracker