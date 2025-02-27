// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';


import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  output: 'server',

  vite: {
    plugins: [tailwindcss()]
  },

  adapter: vercel(),

  integrations: [sitemap()],

});