/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://drivetestpk.com',
    generateRobotsTxt: true,
    generateIndexSitemap: false,
    changefreq: 'monthly',
    priority: 0.7,
    robotsTxtOptions: {
        policies: [
            { userAgent: '*', allow: '/' },
        ],
        additionalSitemaps: [],
    },
};
