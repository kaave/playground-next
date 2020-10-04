const path = require('path');
const fs = require('fs-extra');
const dotenv = require('dotenv');

dotenv.config();

const url = process.env.SITE_URL;

const robotsTxt = `
User-agent: *
Allow: /
Sitemap: ${url}/sitemap.xml
Host: ${url}
`.trim();

async function writeFile(fileLocation) {
  return new Promise((resolve, reject) =>
    fs.writeFile(`${fileLocation}`, robotsTxt, (e) => {
      if (e) {
        reject(e);
        return;
      }

      resolve();
    }),
  );
}

async function main(fileLocation) {
  await writeFile(path.join(__dirname, '..', fileLocation, 'robots.txt'));
}

main('out')
  .then(() => console.log('ok'))
  .catch((e) => console.error(e));
