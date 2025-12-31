/**
 * Base API service for making HTTP requests
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://api.example.com"

/**
 * Generic fetch wrapper with error handling
 * @param {string} endpoint - API endpoint
 * @param {object} options - Fetch options
 * @returns {Promise} Response data
 */
async function fetchAPI(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`

  const defaultHeaders = {
    "Content-Type": "application/json",
  }

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  }

  try {
    const response = await fetch(url, config)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("API request failed:", error)
    throw error
  }
}

/**
 * Tour-related API methods
 */
export const tourService = {
  /**
   * Get all tours
   * @returns {Promise} Tours data
   */
  getAllTours: () => fetchAPI("/tours"),

  /**
   * Get tour by ID
   * @param {string|number} id - Tour ID
   * @returns {Promise} Tour data
   */
  getTourById: (id) => fetchAPI(`/tours/${id}`),

  /**
   * Submit tour booking
   * @param {object} bookingData - Booking information
   * @returns {Promise} Booking confirmation
   */
  bookTour: (bookingData) =>
    fetchAPI("/bookings", {
      method: "POST",
      body: JSON.stringify(bookingData),
    }),
}

/**
 * Contact-related API methods
 */
export const contactService = {
  /**
   * Submit contact form
   * @param {object} formData - Contact form data
   * @returns {Promise} Submission confirmation
   */
  submitContactForm: (formData) =>
    fetchAPI("/contact", {
      method: "POST",
      body: JSON.stringify(formData),
    }),
}

/**
 * Blog-related API methods
 */
export const blogService = {
  /**
   * Get all blog posts
   * @param {object} params - Query parameters
   * @returns {Promise} Blog posts data
   */
  getAllPosts: (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return fetchAPI(`/blog?${queryString}`)
  },

  /**
   * Get blog post by ID
   * @param {string|number} id - Post ID
   * @returns {Promise} Blog post data
   */
  getPostById: (id) => fetchAPI(`/blog/${id}`),
}

