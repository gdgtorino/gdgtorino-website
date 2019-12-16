require('dotenv').config();
const {createClient} = require('contentful');
const {Sitemap} = require('sitemap');
const fs = require('fs');

const contentfulClient = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    managementToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
});

async function buildSitemap() {
    const pages = await contentfulClient.getEntries({
        content_type: 'page',
        order: 'fields.order',
    });
    const sm = new Sitemap({
        urls: pages.items.map(i => ({
            url: i.fields.slug || '/',
            lastmod: i.sys.updatedAt,
        })),
        hostname: 'https://gdgtorino.it',
        cacheTime: 0,
        level: 'warn',
        lastmodDateOnly: false,
    });
    fs.writeFileSync('./dist/sitemap.xml', sm.toString());
}

buildSitemap();
