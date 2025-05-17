/**
 * Format a number as currency
 * @param amount - The amount to format
 * @param currencyCode - The currency code (default: PKR)
 * @returns Formatted currency string
 */
export const formatCurrency = (amount: number, currencyCode = 'PKR'): string => {
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Format a date string
 * @param dateString - The date string to format
 * @returns Formatted date string
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

/**
 * Truncate text to a certain length
 * @param text - The text to truncate
 * @param maxLength - Maximum length before truncation
 * @returns Truncated text with ellipsis if needed
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Generate a random string ID
 * @returns Random string ID
 */
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};