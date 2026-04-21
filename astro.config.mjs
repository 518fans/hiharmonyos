import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.hiharmonyos.com',
  output: 'static',
  build: {
    format: 'directory',
  },
});
