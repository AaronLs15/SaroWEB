/**
 * Formats a price in cents to MXN currency format
 * @param priceCents - Price in cents (e.g., 250000 = $2,500.00)
 * @returns Formatted string like "MXN $2,500.00"
 */
export function formatCurrency(priceCents: number): string {
    const price = priceCents / 100;
    return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(price);
}

/**
 * Truncates text to a specified length
 * @param text - Text to truncate
 * @param maxLength - Maximum length before truncation
 * @returns Truncated text with ellipsis if needed
 */
export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
}

/**
 * Gets the first image URL from a property or returns a placeholder
 * @param images - Array of images
 * @returns Image URL or placeholder
 */
export function getFirstImageUrl(images: Array<{ url: string }> | undefined): string {
    if (images && images.length > 0) {
        return images[0].url;
    }
    return '/placeholder-property.jpg';
}

/**
 * Formats a number with thousand separators
 * @param num - Number to format
 * @returns Formatted string like "1,234"
 */
export function formatNumber(num: number): string {
    return new Intl.NumberFormat('es-MX').format(num);
}
