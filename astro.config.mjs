// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://hhpage.com',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/404') && !page.endsWith('.md/'),
      changefreq: 'monthly',
    }),
  ],
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
});
