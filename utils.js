/**
 * Creates a URL for a page based on its name
 * @param {string} pageName - The name of the page
 * @returns {string} The URL for the page
 */
export function createPageUrl(pageName) {
  if (pageName === 'Download') return '/';
  return `/${pageName.toLowerCase()}`;
}