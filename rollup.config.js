import {default as createProdConfig} from '@open-wc/building-rollup/modern-and-legacy-config';
import {default as createDevConfig} from '@open-wc/building-rollup/modern-config';
import typescript from 'rollup-plugin-typescript2';
import json from 'rollup-plugin-json';
import litcss from 'rollup-plugin-lit-css';
import cpy from 'rollup-plugin-cpy';
import liveServer from 'rollup-plugin-live-server';

const inProd = process.env.BUILD === 'production';

const configs = inProd
    ? createProdConfig({
        input: './index.html',
    })
    : [createDevConfig({
        input: './index.html',
    })];

export default configs.map((config, index) => ({
    ...config,
    plugins: [
        ...config.plugins,
        json(),
        litcss(),
        typescript(),
        index === 0 && inProd ? cpy({
            files: 'assets/**/*',
            dest: 'dist/',
            options: {
                parents: true,
            },
        }) : null,
        index === 0 && !inProd ? liveServer({
            port: 8200,
            host: 'localhost',
            root: 'dist',
            file: 'index.html',
            mount: [['/dist', './dist'], ['/node_modules', './node_modules'], ['/assets', './assets']],
            open: false,
            wait: 500,
        }) : null,
    ],
    watch: {
        clearScreen: false
    },
}));
