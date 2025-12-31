/**
 * Formats a date string into a readable format
 * @param {string|Date} date - Date to format
 * @param {object} options - Intl.DateTimeFormat options
 * @returns {string} Formatted date string
 */
export function formatDate(date, options = {}) {
  const defaultOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }

  const mergedOptions = { ...defaultOptions, ...options }

  return new Intl.DateTimeFormat("en-US", mergedOptions).format(typeof date === "string" ? new Date(date) : date)
}

/**
 * Returns a relative time string (e.g., "2 days ago")
 * @param {string|Date} date - Date to format
 * @returns {string} Relative time string
 */
export function getRelativeTimeString(date) {
  const now = new Date()
  const targetDate = typeof date === "string" ? new Date(date) : date
  const diffInMs = now - targetDate
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

  if (diffInDays === 0) {
    return "Today"
  } else if (diffInDays === 1) {
    return "Yesterday"
  } else if (diffInDays < 30) {
    return `${diffInDays} days ago`
  } else if (diffInDays < 365) {
    const months = Math.floor(diffInDays / 30)
    return `${months} ${months === 1 ? "month" : "months"} ago`
  } else {
    const years = Math.floor(diffInDays / 365)
    return `${years} ${years === 1 ? "year" : "years"} ago`
  }
}

