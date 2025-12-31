/**
 * Formats a number as currency in USD or specified currency
 * @param {number} amount - The amount to format
 * @param {string} currency - Currency code (default: 'USD')
 * @param {string} locale - Locale for formatting (default: 'en-US')
 * @returns {string} Formatted currency string
 */
export function formatCurrency(amount, currency = "USD", locale = "en-US") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(amount)
}

/**
 * Formats a number as currency in Rwandan Francs
 * @param {number} amount - The amount to format
 * @returns {string} Formatted currency string
 */
export function formatRwandanFranc(amount) {
  return new Intl.NumberFormat("en-RW", {
    style: "currency",
    currency: "RWF",
    minimumFractionDigits: 0,
  }).format(amount)
}

