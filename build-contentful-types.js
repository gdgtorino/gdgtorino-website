require('dotenv').config();
const {execSync} = require('child_process');

const cmd = `node_modules/.bin/contentful-ts-generator -d -o src/content-types/`;
console.log('Building content types in src/content-types...');
execSync(cmd, {
    env: {
        ...process.env,
    },
});
console.log('Content types built successfully');
