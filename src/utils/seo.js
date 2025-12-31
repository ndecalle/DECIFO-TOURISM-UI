/**
 * SEO utility functions for managing document head
 */

/**
 * Set page title and meta tags
 * @param {object} options - SEO options
 */
export function updateSEO({
  title,
  description,
  keywords,
  ogImage,
  ogType = "website",
  twitterCard = "summary_large_image",
}) {
  // Update document title
  document.title = title ? `${title} | NGWINO UREBE URWANDA RWIZA` : "NGWINO UREBE URWANDA RWIZA | Rwanda Tourism"

  // Update meta tags
  updateMetaTag("description", description)
  updateMetaTag("keywords", keywords)

  // Open Graph tags
  updateMetaTag("og:title", title)
  updateMetaTag("og:description", description)
  updateMetaTag("og:image", ogImage)
  updateMetaTag("og:type", ogType)

  // Twitter Card tags
  updateMetaTag("twitter:card", twitterCard)
  updateMetaTag("twitter:title", title)
  updateMetaTag("twitter:description", description)
  updateMetaTag("twitter:image", ogImage)
}

/**
 * Update or create a meta tag
 * @param {string} name - Meta tag name or property
 * @param {string} content - Meta tag content
 */
function updateMetaTag(name, content) {
  if (!content) return

  // Check if the meta tag exists
  let metaTag = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`)

  if (metaTag) {
    // Update existing tag
    metaTag.setAttribute("content", content)
  } else {
    // Create new tag
    metaTag = document.createElement("meta")

    // Determine if it's a name or property attribute
    if (name.startsWith("og:") || name.startsWith("twitter:")) {
      metaTag.setAttribute("property", name)
    } else {
      metaTag.setAttribute("name", name)
    }

    metaTag.setAttribute("content", content)
    document.head.appendChild(metaTag)
  }
}

