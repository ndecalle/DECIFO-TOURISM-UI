/**
 * Analytics service for tracking user interactions
 */

// Initialize analytics (placeholder for actual implementation)
export function initAnalytics() {
  if (typeof window === "undefined") return

  // Example implementation with Google Analytics
  if (import.meta.env.VITE_GA_MEASUREMENT_ID) {
    // Load Google Analytics script
    const script = document.createElement("script")
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${import.meta.env.VITE_GA_MEASUREMENT_ID}`
    document.head.appendChild(script)

    window.dataLayer = window.dataLayer || []
    function gtag() {
      window.dataLayer.push(arguments)
    }
    gtag("js", new Date())
    gtag("config", import.meta.env.VITE_GA_MEASUREMENT_ID)

    window.gtag = gtag
  }
}

/**
 * Track page view
 * @param {string} path - Page path
 * @param {string} title - Page title
 */
export function trackPageView(path, title) {
  if (typeof window === "undefined" || !window.gtag) return

  window.gtag("event", "page_view", {
    page_path: path,
    page_title: title,
  })
}

/**
 * Track event
 * @param {string} category - Event category
 * @param {string} action - Event action
 * @param {object} params - Additional parameters
 */
export function trackEvent(category, action, params = {}) {
  if (typeof window === "undefined" || !window.gtag) return

  window.gtag("event", action, {
    event_category: category,
    ...params,
  })
}

/**
 * Track tour view
 * @param {object} tour - Tour data
 */
export function trackTourView(tour) {
  trackEvent("tour", "view", {
    tour_id: tour.id,
    tour_name: tour.title,
  })
}

/**
 * Track tour booking
 * @param {object} tour - Tour data
 * @param {number} value - Booking value
 */
export function trackTourBooking(tour, value) {
  trackEvent("tour", "booking", {
    tour_id: tour.id,
    tour_name: tour.title,
    value: value,
  })
}

