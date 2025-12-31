// Simple global scroll reveal initializer.
// Adds the `revealed` class to elements with `data-reveal` when they enter the viewport.
const createObserver = () => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed')
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.12 })

  document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el))
}

// Re-run on DOMContentLoaded and when new nodes may be added.
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', createObserver)
  // small mutation observer to catch route swaps (SPA)
  const mo = new MutationObserver(() => createObserver())
  mo.observe(document.body, { childList: true, subtree: true })
}

export default createObserver
