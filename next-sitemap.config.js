/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://traffic-sign-quiz.vercel.app', // update with your real domain
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
