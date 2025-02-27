// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';


import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import { loadEnv } from "vite";
const { WEB_URL } = loadEnv(process.env.NODE_ENV ?? '', process.cwd(), "");

// https://astro.build/config
export default defineConfig({
  output: 'server',

  site: WEB_URL,

  vite: {
    plugins: [tailwindcss()]
  },

  adapter: vercel(),

  integrations: [sitemap()],

});