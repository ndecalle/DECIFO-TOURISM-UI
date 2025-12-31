/**
 * Accessibility utility functions
 */

/**
 * Announce a message to screen readers using ARIA live region
 * @param {string} message - Message to announce
 * @param {string} priority - 'polite' or 'assertive'
 */
export function announceToScreenReader(message, priority = "polite") {
  // Create or get the live region element
  let announcer = document.getElementById("a11y-announcer")

  if (!announcer) {
    announcer = document.createElement("div")
    announcer.id = "a11y-announcer"
    announcer.setAttribute("aria-live", priority)
    announcer.setAttribute("aria-atomic", "true")
    announcer.className = "sr-only"
    document.body.appendChild(announcer)
  }

  // Set the priority
  announcer.setAttribute("aria-live", priority)

  // Clear the announcer
  announcer.textContent = ""

  // Set the message (in a setTimeout to ensure it's announced)
  setTimeout(() => {
    announcer.textContent = message
  }, 50)
}

/**
 * Trap focus within an element (for modals, dialogs, etc.)
 * @param {HTMLElement} element - Element to trap focus within
 * @returns {Function} Cleanup function to remove trap
 */
export function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])',
  )

  if (focusableElements.length === 0) return () => {}

  const firstElement = focusableElements[0]
  const lastElement = focusableElements[focusableElements.length - 1]

  // Focus the first element
  firstElement.focus()

  // Handle tab key presses
  function handleKeyDown(e) {
    if (e.key !== "Tab") return

    if (e.shiftKey) {
      // Shift + Tab: If on first element, move to last
      if (document.activeElement === firstElement) {
        e.preventDefault()
        lastElement.focus()
      }
    } else {
      // Tab: If on last element, move to first
      if (document.activeElement === lastElement) {
        e.preventDefault()
        firstElement.focus()
      }
    }
  }

  // Add event listener
  element.addEventListener("keydown", handleKeyDown)

  // Return cleanup function
  return () => {
    element.removeEventListener("keydown", handleKeyDown)
  }
}

