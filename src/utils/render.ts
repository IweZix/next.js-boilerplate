/**
 * This function sets the document title for the page.
 * @param {string} title - The title to set for the page.
 */
const renderPageTitle = (title: string): void => {
  if (typeof window !== 'undefined') {
    document.title = title;
  }
};

export default renderPageTitle;
