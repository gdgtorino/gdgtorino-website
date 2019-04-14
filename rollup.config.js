import createDefaultConfig from '@open-wc/building-rollup/modern-and-legacy-config';
import typescript from 'rollup-plugin-typescript2';
import json from 'rollup-plugin-json';
import litcss from 'rollup-plugin-lit-css';
import cpy from 'rollup-plugin-cpy';

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
    ],
}));
