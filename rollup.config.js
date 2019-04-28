import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import builtins from 'rollup-plugin-node-builtins';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import modernWeb from '@open-wc/building-rollup//plugins/rollup-plugin-modern-web/rollup-plugin-modern-web';
import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import litcss from 'rollup-plugin-lit-css';
import cpy from 'rollup-plugin-cpy';
import workbox from 'rollup-plugin-workbox-build';
import liveServer from 'rollup-plugin-live-server';
import {terser} from 'rollup-plugin-terser';

const inProd = process.env.BUILD === 'production';

export default {
    input: './index.html',
    treeshake: inProd,
    output: {
        dir: 'dist',
        format: 'esm',
        sourcemap: true,
    },
    plugins: [
        inProd && minifyHTML({
            failOnError: true,
        }),
        modernWeb(),
        builtins(),
        nodeResolve({
            browser: true,
        }),
        commonjs(),
        babel({
            plugins: [
                '@babel/plugin-syntax-dynamic-import',
                '@babel/plugin-syntax-import-meta',
                'bundled-import-meta',
            ],
            presets: [
                [
                    '@babel/env',
                    {
                        targets: [
                            'last 2 Chrome major versions',
                            'last 2 ChromeAndroid major versions',
                            'last 2 Edge major versions',
                            'last 2 Firefox major versions',
                            'last 2 Safari major versions',
                            'last 2 iOS major versions',
                        ],
                        useBuiltIns: false,
                    },
                ],
            ],
        }),
        json(),
        litcss(),
        typescript(),
        inProd && terser(),
        inProd && cpy({
            files: ['assets/**/*', 'manifest.json'],
            dest: 'dist/',
            options: {
                parents: true,
            },
        }),
        inProd && workbox({
            mode: 'generateSW',
            options: require('./workbox-config'),
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
    ],
    watch: {
        clearScreen: false
    },
};
