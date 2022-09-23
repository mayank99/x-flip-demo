import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import linaria from '@linaria/rollup';

// https://astro.build/config
export default defineConfig({
	integrations: [preact()],
	vite: {
		plugins: [linaria()],
	},
});
