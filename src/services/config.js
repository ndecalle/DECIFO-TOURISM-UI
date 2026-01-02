// Normalize API base URL from environment variable
const rawBase = import.meta.env.VITE_API_BASE_URL || ''

function normalizeBase(url) {
  if (!url) return ''
  let u = String(url).trim()
  if (!/^https?:\/\//i.test(u)) u = 'https://' + u
  return u.replace(/\/+$/g, '')
}

export const API_BASE = normalizeBase(rawBase)

export default API_BASE
