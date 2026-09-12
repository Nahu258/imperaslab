// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';

import { SITE } from './src/lib/site-config.js';

// https://astro.build/config
export default defineConfig({
  site: SITE.url,
  trailingSlash: 'ignore',
  build: {
    // Gera /politica-de-privacidade.html em vez de /politica-de-privacidade/index.html
    // -> mais simples de servir com Nginx estatico.
    format: 'file',
  },
  integrations: [icon(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
    server: {
      proxy: {
        // Em desenvolvimento o formulario posta em /api/contato e o Vite
        // encaminha para o n8n. Em producao quem faz isso e o Nginx.
        '/api/contato': {
          target: SITE.leadWebhookOrigin,
          changeOrigin: true,
          secure: true,
          rewrite: () => SITE.leadWebhookPath,
        },
      },
    },
  },
});
