const path = require('path');
const fs = require('fs-extra');
const dotenv = require('dotenv');
const globby = require('globby');

dotenv.config();

async function main(targetFolder) {
  const fileLocation = `./${targetFolder}`;
  const rawPaths = await globby([`${fileLocation}/**/*.html`, '!*/404.html', '!*/index.html', '!**/*/index.html']);
  rawPaths.forEach(async (from) => {
    const to = from.replace(/\/([^\/]+)\.html/, '/$1/index.html');
    const source = await fs.readFile(path.join(__dirname, '..', from));
    const savePath = path.join(__dirname, '..', to);
    const saveDir = path.dirname(savePath);

    // if (await fs.pathExists(saveDir)) {
    //   await fs.remove(saveDir);
    // }

    await fs.mkdirp(saveDir);
    await fs.writeFile(savePath, source.toString());
    await fs.remove(from);
  });
}

main('out')
  .then(() => console.log('ok'))
  .catch((e) => console.error(e));
