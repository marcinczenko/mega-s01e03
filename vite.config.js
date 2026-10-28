import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import { fileURLToPath } from 'node:url';
export default defineConfig({
  plugins: [svelte({extensions:['.svelte','.svx'],preprocess:mdsvex({extensions:['.svx'],layout:{runbook:fileURLToPath(new URL('./src/lib/layouts/runbook.svelte',import.meta.url))}}),compilerOptions:{css:'injected'}})],
  resolve:{alias:{'#lib':fileURLToPath(new URL('./src/lib',import.meta.url))}},
  build:{ssr:'scripts/entry.js',outDir:'.build',rollupOptions:{output:{entryFileNames:'entry.js'}}}
});
