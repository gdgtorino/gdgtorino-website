import createDefaultConfig from '@open-wc/building-rollup/modern-and-legacy-config';
import typescript from 'rollup-plugin-typescript2';
import json from 'rollup-plugin-json';
import litcss from 'rollup-plugin-lit-css';
import cpy from 'rollup-plugin-cpy';
import liveServer from 'rollup-plugin-live-server';

const configs = createDefaultConfig({
    input: './index.html',
});

export default configs.map((config, index) => ({
    ...config,
    plugins: [
        ...config.plugins,
        json(),
        litcss(),
        typescript(),
        index === 0 ? cpy({
            files: 'assets/**/*',
            dest: 'dist/',
            options: {
                parents: true,
            },
        }) : null,
        index === 0 ? liveServer({
            port: 8200,
            host: "localhost",
            root: "dist",
            file: "index.html",
            mount: [['/dist', './dist'], ['/src', './src'], ['/node_modules', './node_modules']],
            open: false,
            wait: 1000
        }) : null,
    ],
    watch: {
        clearScreen: false
    },
}));
