/**
 * Validates an email address
 * @param {string} email - Email to validate
 * @returns {boolean} Whether the email is valid
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validates a phone number
 * @param {string} phone - Phone number to validate
 * @returns {boolean} Whether the phone number is valid
 */
export function isValidPhone(phone) {
  // Basic validation for international phone numbers
  const phoneRegex = /^\+?[0-9\s\-()]{8,20}$/
  return phoneRegex.test(phone)
}

/**
 * Validates form data
 * @param {object} formData - Form data to validate
 * @returns {object} Object with isValid flag and errors object
 */
export function validateContactForm(formData) {
  const errors = {}

  if (!formData.name || formData.name.trim() === "") {
    errors.name = "Name is required"
  }

  if (!formData.email || !isValidEmail(formData.email)) {
    errors.email = "Valid email is required"
  }

  if (formData.phone && !isValidPhone(formData.phone)) {
    errors.phone = "Please enter a valid phone number"
  }

  if (!formData.message || formData.message.trim() === "") {
    errors.message = "Message is required"
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

