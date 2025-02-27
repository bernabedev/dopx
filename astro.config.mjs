// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import node from '@astrojs/node';

import sitemap from '@astrojs/sitemap';
import { loadEnv } from "vite";
const { PORT } = loadEnv(process.env.NODE_ENV ?? '', process.cwd(), "");

// https://astro.build/config
export default defineConfig({
  output: 'server',

  vite: {
    plugins: [tailwindcss()]
  },

  adapter: node({
    mode: 'standalone'
  }),

  integrations: [sitemap()],

  server: {
    port: PORT ? +PORT : 4321
  }
});