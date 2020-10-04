/*
 * Original code by https://www.techhive.io/our-insights/how-to-build-a-powerful-blog-with-nextjs-and-contentful
 */

const path = require('path');
const fs = require('fs-extra');
const dotenv = require('dotenv');
const globby = require('globby');

dotenv.config();

// Format to the right date
const formatDate = (date) => `${date.toISOString().split('.')[0]}+0:00`;
// Priority is determined by path depth. Feel free to modify this if needed:
const getPriority = (url) =>
  url.includes('/our-insights') ? 0.9 : ((100 - (url.split('/').length - 2) * 10) / 100).toFixed(2);

// Just pick current date as last modified
const lastModified = formatDate(new Date());

// Set the header
const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
  xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
>`;

// Wrap all pages in <urlset> tags
const xmlUrlWrapper = (nodes) => `${xmlHeader}
  ${nodes}
</urlset>`;

// Determine and return the nodes for every page
const xmlUrlNode = (domain, pageUrl) => {
  const url = `${pageUrl}${pageUrl === '/' ? '' : '/'}`;
  const loc = `${domain}${url}`;
  const priority = getPriority(url);

  return `<url>
  <loc>${loc}</loc>
  <priority>${priority}</priority>
</url>`;
};

async function writeFile(fileLocation, sitemap) {
  return new Promise((resolve, reject) =>
    fs.writeFile(`${fileLocation}`, sitemap, (e) => {
      if (e) {
        reject(e);
        return;
      }

      resolve();
    }),
  );
}

async function main(domain, targetFolder) {
  const fileLocation = `./${targetFolder}`;
  const rawPaths = await globby([`${fileLocation}/**/*.html`, '!*/404.html']);
  const pages = rawPaths.map((filePath) =>
    filePath
      .replace(fileLocation, '')
      .replace(/index\.html$/, '')
      .replace(/\.html$/, ''),
  );
  const sitemap = xmlUrlWrapper(pages.map((page) => xmlUrlNode(domain, page, lastModified)).join('\n'));
  await writeFile(path.join(__dirname, '..', fileLocation, 'sitemap.xml'), sitemap);
}

main(process.env.SITE_URL, 'out')
  .then(() => console.log('ok'))
  .catch((e) => console.error(e));
