require('dotenv').config();
import createDefaultConfig from '@open-wc/building-rollup/modern-and-legacy-config';
import replace from "rollup-plugin-replace";
import nodeResolve from 'rollup-plugin-node-resolve';
import builtins from 'rollup-plugin-node-builtins';
import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import litcss from 'rollup-plugin-lit-css';
import cpy from 'rollup-plugin-cpy';
import workbox from 'rollup-plugin-workbox-build';
import liveServer from 'rollup-plugin-live-server';

const inProd = process.env.BUILD === 'production';

const mapEnvVars = vars => vars.reduce((res, envVar) => {
    res[envVar] = process.env[envVar];
    return res;
}, {});

const configs = createDefaultConfig({
    input: './index.html',
    outputDir: 'dist',
});

const once = (index, plugins) => index === 0 ? plugins : [];

export default configs.map((config, i) => ({
    ...config,
    plugins: [
        replace(mapEnvVars([
            'CONTENTFUL_SPACE_ID',
            'CONTENTFUL_ACCESS_TOKEN',
            'CONTENTFUL_MANAGEMENT_TOKEN',
            'EVENTBRITE_ORG_ID',
            'EVENTBRITE_TOKEN',
        ])),
        config.plugins[0],
        config.plugins[1],
        builtins(),
        nodeResolve({
            browser: true,
        }),
        commonjs(),
        json(),
        litcss(),
        config.plugins[3],
        typescript(),
        config.plugins[4],
        ...once(i, [
            inProd && cpy({
                files: ['assets/**/*', 'manifest.json'],
                dest: 'dist/',
                options: {
                    parents: true,
                },
            }),
            inProd && workbox({
                mode: 'generateSW',
                options: require('./workbox.config'),
            }),
            !inProd && liveServer({
                port: 8200,
                host: 'localhost',
                root: 'dist',
                file: 'index.html',
                mount: [
                    ['/dist', './dist'],
                    ['/node_modules', './node_modules'],
                    ['/assets', './assets'],
                    ['/manifest.json', './manifest.json'],
                ],
                open: false,
                wait: 200,
            }),
        ]),
    ],
    watch: {
        clearScreen: false
    },
}));
