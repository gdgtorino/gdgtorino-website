const {execSync} = require('child_process');
const config = require('./config');

const {space, managementToken} = config.contentful;
const cmd = `node_modules/.bin/contentful-ts-generator -d -o src/content-types/`;
console.log('Building content types in src/content-types...');
execSync(cmd, {
    env: {
        ...process.env,
        CONTENTFUL_MANAGEMENT_TOKEN: managementToken,
        CONTENTFUL_SPACE_ID: space,
    },
});
console.log('Content types built successfully');
