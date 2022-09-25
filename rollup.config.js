import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import resolver from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';

import pkg from './package.json';

/** @type {import("rollup").RollupOptions} */
const options = {
	input: './src/index.ts',
	output: {
		file: pkg.main,
		exports: 'named',
		format: 'cjs',
	},
	external: [/node_modules/],
	plugins: [
		resolver({
			browser: false,
		}),
		typescript(),
		commonjs(),
		babel({
			babelHelpers: 'bundled',
		}),
	],
};

if (process.env.NODE_ENV === 'production') {
	options.plugins.push(
		terser({
			compress: true,
		})
	);
}

export default options;
