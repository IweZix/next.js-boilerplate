/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.monsite.xyz', // TODO: remplace par ton URL
  generateRobotsTxt: true, // génère automatiquement robots.txt
  sitemapSize: 5000, // nombre maximum d’URL par fichier sitemap
  changefreq: 'weekly',
  priority: 0.7,
};
