const fs = require(`fs`);
const pathToEntry = `./build/index.html`;
const pathStaticFiles = `./static/media/`;
const systemPathStaticFiles = `./build/${pathStaticFiles}`;
const splitBy = `</title>`;

const builtHTMLContent = fs.readFileSync(pathToEntry).toString();
const parts = builtHTMLContent.split(splitBy);

const fonts = fs.readdirSync(systemPathStaticFiles)
  .filter((fileName) => fileName.endsWith(`.woff2`))
  .map((fileName) => {
    return `<link rel="preload" href="${pathStaticFiles}${fileName}" as="font" type="font/woff2" crossorigin="anonymous">`;
  });

const fileWithPreload = [
  parts[0],
  splitBy,
  ...fonts,
  parts[1],
];

fs.writeFileSync(pathToEntry, fileWithPreload.join(``));
